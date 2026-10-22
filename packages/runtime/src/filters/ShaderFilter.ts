import { Filter, GlProgram } from 'pixi.js';
import type { Shader } from '@habbo-pixi/runtime/display/Shader';
import { BitmapFilter } from './BitmapFilter';

/**
 * Hand ports of the Pixel Bender kernels the client ships, keyed by 'namespace::name'.
 *
 * com.sulake.filters::NewFilter — "Wired Furniture Border filter": a pixel whose red is exactly
 * 116/255 and green exactly 141/255 becomes white (alpha kept). It runs after a colour matrix
 * that maps pure black to (116, 141, 141), so the object's black outline turns white.
 */
const KERNELS: Record<string, { glsl: string; pixel(r: number, g: number, b: number, a: number): [number, number, number, number] }> = {
    'com.sulake.filters::NewFilter': {
        glsl: `
            in vec2 vTextureCoord;
            out vec4 finalColor;
            uniform sampler2D uTexture;
            void main(void) {
                vec4 c = texture(uTexture, vTextureCoord);
                // straight colour from premultiplied, compared at 8-bit precision
                vec3 rgb = c.a > 0.0 ? c.rgb / c.a : vec3(0.0);
                ivec2 rg = ivec2(floor(rgb.rg * 255.0 + 0.5));
                if (rg.x == 116 && rg.y == 141) rgb = vec3(1.0);
                finalColor = vec4(rgb * c.a, c.a);
            }`,
        pixel: (r, g, b, a) => (r === 116 && g === 141 ? [255, 255, 255, a] : [r, g, b, a]),
    },
};

const VERTEX = `
    in vec2 aPosition;
    out vec2 vTextureCoord;
    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;
    vec4 filterVertexPosition(void) {
        vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
        position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
        position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
        return vec4(position, 0.0, 1.0);
    }
    vec2 filterTextureCoord(void) {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }
    void main(void) {
        gl_Position = filterVertexPosition();
        vTextureCoord = filterTextureCoord();
    }`;

/** Applies a shader's kernel as a filter. Kernels without a port are rejected by name. */
export class ShaderFilter extends BitmapFilter {
    shader: Shader | null;

    constructor(shader: Shader = null) {
        super();
        this.shader = shader;
    }

    clone(): ShaderFilter {
        return new ShaderFilter(this.shader);
    }

    #kernel() {
        const id = this.shader?.id ?? '(none)';
        const k = KERNELS[id];
        if (!k) throw new Error(`No port of the Pixel Bender kernel ${id} exists; it has to be written by hand (filters/ShaderFilter.ts).`);
        return k;
    }

    createRenderFilter(): Filter {
        return new Filter({ glProgram: GlProgram.from({ vertex: VERTEX, fragment: this.#kernel().glsl, name: 'shader-filter' }) });
    }

    protected filterPixels(source: ImageData): ImageData {
        const k = this.#kernel();
        const out = new ImageData(source.width, source.height);
        const s = source.data, o = out.data;
        for (let i = 0; i < s.length; i += 4) {
            const [r, g, b, a] = k.pixel(s[i], s[i + 1], s[i + 2], s[i + 3]);
            o[i] = r; o[i + 1] = g; o[i + 2] = b; o[i + 3] = a;
        }
        return out;
    }
}
