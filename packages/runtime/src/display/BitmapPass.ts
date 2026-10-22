import { Filter, GlProgram, GpuProgram, Texture, UniformGroup, type TextureSource } from 'pixi.js';
import { GL_PIXELS, GL_VERTEX, GPU_COMMON } from '@habbo-pixi/runtime/filters/gpu/filterShaderParts';

// Every texture here is the size of the rectangle being worked on (the input, the destination's pixels there, is
// too), so one pixel position addresses all of them. Pixels are premultiplied in the textures and worked on as
// Flash does, straight and in whole 0-255 values.

const GL_FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform sampler2D uSourceTexture;
uniform sampler2D uMaskTexture;
uniform sampler2D uPaletteTexture;
uniform vec4 uMultiplier;
uniform vec4 uOffset;
uniform float uMode;
uniform float uSourceChannel;
uniform float uDestChannel;
uniform float uMerge;
uniform float uOpaque;
${GL_PIXELS}
uvec4 bytesOf(vec4 c)
{
    if (c.a <= 0.0) return uvec4(0u);
    return uvec4(round(clamp(vec4(c.rgb / c.a, c.a), 0.0, 1.0) * 255.0));
}

vec4 premultiplied(uvec4 b)
{
    vec4 c = vec4(b) / 255.0;
    return vec4(c.rgb * c.a, c.a);
}

// one row of the palette per channel; an entry is a 0xAARRGGBB word kept as its four bytes
uint entry(int row, uint index)
{
    uvec4 e = uvec4(round(texelFetch(uPaletteTexture, ivec2(int(index), row), 0) * 255.0));
    return (e.a << 24) | (e.r << 16) | (e.g << 8) | e.b;
}

void main(void)
{
    ivec2 p = pixelOf(vTextureCoord);
    vec4 dest = texelFetch(uTexture, p, 0);
    vec4 src = texelFetch(uSourceTexture, p, 0);
    if (uMode < 0.5) {
        // copyChannel: one channel of the source into one of the destination (indices 0 red .. 3 alpha)
        uvec4 d = bytesOf(dest);
        uvec4 s = bytesOf(src);
        d[int(uDestChannel)] = s[int(uSourceChannel)];
        if (uOpaque > 0.5) d.a = 255u;
        finalColor = premultiplied(d);
    } else if (uMode < 1.5) {
        // paletteMap: the four channels' entries summed as words (carrying from one channel into the next)
        uvec4 s = bytesOf(src);
        uint v = entry(0, s.r) + entry(1, s.g) + entry(2, s.b) + entry(3, s.a);
        uvec4 o = uvec4((v >> 16) & 255u, (v >> 8) & 255u, v & 255u, v >> 24);
        if (uOpaque > 0.5) o.a = 255u;
        finalColor = premultiplied(o);
    } else if (uMode < 2.5) {
        // copyPixels through an alpha bitmap: the source's alpha times the mask's, over the destination or instead
        vec4 m = src * texelFetch(uMaskTexture, p, 0).a;
        finalColor = uMerge > 0.5 ? m + dest * (1.0 - m.a) : m;
        if (uOpaque > 0.5) finalColor.a = 1.0;
    } else {
        // colorTransform: each channel times its multiplier plus its offset, clamped and rounded as a byte array
        // stores it (half to even)
        vec4 v = clamp(vec4(bytesOf(dest)) * uMultiplier + uOffset, 0.0, 255.0);
        uvec4 o = uvec4(roundEven(v));
        if (uOpaque > 0.5) o.a = 255u;
        finalColor = premultiplied(o);
    }
}
`;

const GPU_SOURCE = `${GPU_COMMON}
struct PassUniforms {
  uMultiplier: vec4<f32>,
  uOffset: vec4<f32>,
  uMode: f32,
  uSourceChannel: f32,
  uDestChannel: f32,
  uMerge: f32,
  uOpaque: f32,
};
@group(1) @binding(0) var<uniform> passUniforms: PassUniforms;
@group(1) @binding(1) var uSourceTexture: texture_2d<f32>;
@group(1) @binding(2) var uMaskTexture: texture_2d<f32>;
@group(1) @binding(3) var uPaletteTexture: texture_2d<f32>;

fn bytesOf(c: vec4<f32>) -> vec4<u32> {
  if (c.a <= 0.0) { return vec4<u32>(0u); }
  return vec4<u32>(round(clamp(vec4<f32>(c.rgb / c.a, c.a), vec4<f32>(0.0), vec4<f32>(1.0)) * 255.0));
}

fn premultiplied(b: vec4<u32>) -> vec4<f32> {
  let c = vec4<f32>(b) / 255.0;
  return vec4<f32>(c.rgb * c.a, c.a);
}

fn entry(row: i32, index: u32) -> u32 {
  let e = vec4<u32>(round(textureLoad(uPaletteTexture, vec2<i32>(i32(index), row), 0) * 255.0));
  return (e.a << 24u) | (e.r << 16u) | (e.g << 8u) | e.b;
}

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let p = pixelOf(uv);
  let dest = textureLoad(uTexture, p, 0);
  let src = textureLoad(uSourceTexture, p, 0);
  let opaque = passUniforms.uOpaque > 0.5;
  if (passUniforms.uMode < 0.5) {
    var d = bytesOf(dest);
    let s = bytesOf(src);
    d[i32(passUniforms.uDestChannel)] = s[i32(passUniforms.uSourceChannel)];
    if (opaque) { d.a = 255u; }
    return premultiplied(d);
  }
  if (passUniforms.uMode < 1.5) {
    let s = bytesOf(src);
    let v = entry(0, s.r) + entry(1, s.g) + entry(2, s.b) + entry(3, s.a);
    var o = vec4<u32>((v >> 16u) & 255u, (v >> 8u) & 255u, v & 255u, v >> 24u);
    if (opaque) { o.a = 255u; }
    return premultiplied(o);
  }
  if (passUniforms.uMode < 2.5) {
    let m = src * textureLoad(uMaskTexture, p, 0).a;
    var out = m;
    if (passUniforms.uMerge > 0.5) { out = m + dest * (1.0 - m.a); }
    if (opaque) { out.a = 1.0; }
    return out;
  }
  // round() rounds half to even, as a byte array stores
  let v = clamp(vec4<f32>(bytesOf(dest)) * passUniforms.uMultiplier + passUniforms.uOffset, vec4<f32>(0.0), vec4<f32>(255.0));
  var o = vec4<u32>(round(v));
  if (opaque) { o.a = 255u; }
  return premultiplied(o);
}
`;

interface PassValues { uMultiplier: Float32Array; uOffset: Float32Array; uMode: number; uSourceChannel: number; uDestChannel: number; uMerge: number; uOpaque: number }

/**
 * The BitmapData operations that read the destination's own pixels, on the GPU: copyChannel, paletteMap,
 * copyPixels through an alpha bitmap, and a colorTransform a tint cannot do (offsets, multipliers finer than 1/255). Run over a rectangle by GpuSurface.applyPass, whose input is the destination's
 * pixels there; the source, mask and palette are set here. Exact, in whole 0-255 values, as the CPU paths compute.
 */
export class BitmapPass extends Filter {
    readonly #values: PassValues;

    constructor() {
        const passUniforms = new UniformGroup({
            uMultiplier: { value: new Float32Array(4), type: 'vec4<f32>' },
            uOffset: { value: new Float32Array(4), type: 'vec4<f32>' },
            uMode: { value: 0, type: 'f32' },
            uSourceChannel: { value: 0, type: 'f32' },
            uDestChannel: { value: 0, type: 'f32' },
            uMerge: { value: 0, type: 'f32' },
            uOpaque: { value: 0, type: 'f32' },
        });
        super({
            glProgram: GlProgram.from({ vertex: GL_VERTEX, fragment: GL_FRAGMENT, name: 'bitmap-pass' }),
            gpuProgram: GpuProgram.from({ vertex: { source: GPU_SOURCE, entryPoint: 'mainVertex' }, fragment: { source: GPU_SOURCE, entryPoint: 'mainFragment' } }),
            resources: {
                passUniforms,
                uSourceTexture: Texture.EMPTY.source,
                uMaskTexture: Texture.EMPTY.source,
                uPaletteTexture: Texture.EMPTY.source,
            },
            padding: 0,
            resolution: 1,
            antialias: 'off',
            blendMode: 'none',
        });
        this.#values = passUniforms.uniforms as PassValues;
    }

    /** copyChannel: channel indices 0 red, 1 green, 2 blue, 3 alpha. */
    channelCopy(source: TextureSource, sourceChannel: number, destChannel: number, opaque: boolean): this {
        this.#set(0, opaque);
        this.#values.uSourceChannel = sourceChannel;
        this.#values.uDestChannel = destChannel;
        this.resources.uSourceTexture = source;
        return this;
    }

    /** paletteMap: `palette` is 256 x 4, a row of 0xAARRGGBB entries (as bytes R, G, B, A) per channel R, G, B, A. */
    paletteMap(source: TextureSource, palette: TextureSource, opaque: boolean): this {
        this.#set(1, opaque);
        this.resources.uSourceTexture = source;
        this.resources.uPaletteTexture = palette;
        return this;
    }

    /** copyPixels through an alpha bitmap (`mask`, whose alpha multiplies the source's). */
    alphaCopy(source: TextureSource, mask: TextureSource, merge: boolean, opaque: boolean): this {
        this.#set(2, opaque);
        this.#values.uMerge = merge ? 1 : 0;
        this.resources.uSourceTexture = source;
        this.resources.uMaskTexture = mask;
        return this;
    }

    /** colorTransform of the destination's own pixels: multipliers and offsets, red, green, blue, alpha. */
    colorTransform(multipliers: readonly number[], offsets: readonly number[], opaque: boolean): this {
        this.#set(3, opaque);
        this.#values.uMultiplier.set(multipliers);
        this.#values.uOffset.set(offsets);
        return this;
    }

    #set(mode: number, opaque: boolean): void {
        this.#values.uMode = mode;
        this.#values.uOpaque = opaque ? 1 : 0;
    }
}
