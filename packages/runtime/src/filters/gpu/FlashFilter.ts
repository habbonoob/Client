import { Filter, GlProgram, GpuProgram, TexturePool, type FilterSystem, type RenderSurface, type Texture } from 'pixi.js';
import { BoxBlurPass } from './BoxBlurPass';
import { GL_VERTEX, GPU_COMMON } from './filterShaderParts';
import { ShadowCompositePass } from './ShadowCompositePass';
import { ShadowMaskPass } from './ShadowMaskPass';

/** What the filter does: blur the object, or put a glow or shadow of its shape behind, inside or instead of it. */
export interface FlashFilterOptions {
    blurX: number;
    blurY: number;
    /** Box passes (Flash's quality: 1 low, 2 medium, 3 high). */
    quality: number;
    /** A glow or shadow, rather than a plain blur. */
    shadow?: {
        dx: number;
        dy: number;
        color: number;
        alpha: number;
        strength: number;
        inner: boolean;
        knockout: boolean;
        hideObject: boolean;
    };
}

// never drawn with: apply() runs the passes instead
const passthroughFragment = `in vec2 vTextureCoord; out vec4 finalColor; uniform sampler2D uTexture;
void main(void) { finalColor = texture(uTexture, vTextureCoord); }`;
const passthroughSource = `${GPU_COMMON}
@fragment fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> { return textureSample(uTexture, uSampler, uv); }`;

/**
 * Flash's BlurFilter, GlowFilter and DropShadowFilter on the GPU, computed as Flash computes them (and as the CPU
 * path, pixelOps, does for bitmaps): box blurs repeated `quality` times, and for a glow or shadow the object's
 * alpha, offset, blurred, scaled by the strength and coloured, composited with the object. So an effect looks the
 * same on screen as drawn into a bitmap, and as in the original client.
 */
export class FlashFilter extends Filter {
    readonly #options: FlashFilterOptions;
    readonly #horizontal = new BoxBlurPass(true);
    readonly #vertical = new BoxBlurPass(false);
    readonly #mask = new ShadowMaskPass();
    readonly #composite = new ShadowCompositePass();

    constructor(options: FlashFilterOptions) {
        const quality = Math.max(1, Math.round(options.quality));
        const reach = Math.ceil(Math.max(options.blurX, options.blurY) / 2) * quality;
        const offset = options.shadow ? Math.ceil(Math.hypot(options.shadow.dx, options.shadow.dy)) : 0;
        super({
            glProgram: GlProgram.from({ vertex: GL_VERTEX, fragment: passthroughFragment, name: 'flash-filter' }),
            gpuProgram: GpuProgram.from({
                vertex: { source: passthroughSource, entryPoint: 'mainVertex' },
                fragment: { source: passthroughSource, entryPoint: 'mainFragment' },
            }),
            resources: {},
            padding: reach + offset + 1,
        });
        this.#options = { ...options, quality };
        this.#horizontal.size = options.blurX;
        this.#vertical.size = options.blurY;
        const s = options.shadow;
        if (s) {
            this.#mask.configure(s.dx, s.dy, s.inner);
            this.#composite.configure(s.color, s.alpha, s.strength, s.inner, s.knockout, s.hideObject);
        }
    }

    override apply(filterManager: FilterSystem, input: Texture, output: RenderSurface, clearMode: boolean): void {
        const shadow = this.#options.shadow;
        if (!shadow) {
            this.#blur(filterManager, input, output, clearMode);
            return;
        }

        const mask = TexturePool.getSameSizeTexture(input);
        const blurred = TexturePool.getSameSizeTexture(input);
        filterManager.applyFilter(this.#mask, input, mask, true);
        this.#blur(filterManager, mask, blurred, true);
        this.#composite.sourceTexture = input.source;
        filterManager.applyFilter(this.#composite, blurred, output, clearMode);
        TexturePool.returnTexture(mask);
        TexturePool.returnTexture(blurred);
    }

    /** `quality` rounds of a horizontal and a vertical box blur, from `input` into `output`. */
    #blur(filterManager: FilterSystem, input: Texture, output: RenderSurface, clearMode: boolean): void {
        const passes: BoxBlurPass[] = [];
        for (let q = 0; q < this.#options.quality; q++) {
            if (this.#horizontal.size > 1) passes.push(this.#horizontal);
            if (this.#vertical.size > 1) passes.push(this.#vertical);
        }
        if (passes.length === 0) {
            filterManager.applyFilter(this.#horizontal, input, output, clearMode);   // size 1: a copy
            return;
        }

        let from = input;
        const temps = [TexturePool.getSameSizeTexture(input), TexturePool.getSameSizeTexture(input)];
        passes.forEach((pass, i) => {
            if (i === passes.length - 1) {
                filterManager.applyFilter(pass, from, output, clearMode);
            } else {
                const to = temps[i % 2];
                filterManager.applyFilter(pass, from, to, true);
                from = to;
            }
        });
        temps.forEach(t => TexturePool.returnTexture(t));
    }
}
