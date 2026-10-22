import { ColorMatrixFilter as PixiColorMatrixFilter, type Filter } from 'pixi.js';
import { BitmapFilter } from './BitmapFilter';

const IDENTITY = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

/**
 * A 4×5 colour matrix: each output channel is a weighted sum of the input red, green, blue and
 * alpha plus an offset (0-255 units), computed on unmultiplied colour and clamped to 0-255.
 */
export class ColorMatrixFilter extends BitmapFilter {
    #matrix: number[];

    constructor(matrix: any[] = null) {
        super();
        this.#matrix = matrix ? matrix.slice(0, 20).map(Number) : [...IDENTITY];
    }

    /** A copy; assign a changed array back to apply it. */
    get matrix(): number[] {
        return [...this.#matrix];
    }

    set matrix(value: any[]) {
        this.#matrix = value ? value.slice(0, 20).map(Number) : [...IDENTITY];
    }

    override sameAs(other: unknown): boolean {
        return other instanceof ColorMatrixFilter && other.#matrix.every((v, i) => v === this.#matrix[i]);
    }

    clone(): ColorMatrixFilter {
        return new ColorMatrixFilter(this.#matrix);
    }

    createRenderFilter(): Filter {
        const f = new PixiColorMatrixFilter();
        const m = this.#matrix;
        f.matrix = [
            m[0], m[1], m[2], m[3], m[4] / 255,
            m[5], m[6], m[7], m[8], m[9] / 255,
            m[10], m[11], m[12], m[13], m[14] / 255,
            m[15], m[16], m[17], m[18], m[19] / 255,
        ];
        return f;
    }

    protected filterPixels(source: ImageData): ImageData {
        const out = new ImageData(source.width, source.height);
        const s = source.data, o = out.data, m = this.#matrix;
        for (let i = 0; i < s.length; i += 4) {
            const r = s[i], g = s[i + 1], b = s[i + 2], a = s[i + 3];
            o[i] = m[0] * r + m[1] * g + m[2] * b + m[3] * a + m[4];
            o[i + 1] = m[5] * r + m[6] * g + m[7] * b + m[8] * a + m[9];
            o[i + 2] = m[10] * r + m[11] * g + m[12] * b + m[13] * a + m[14];
            o[i + 3] = m[15] * r + m[16] * g + m[17] * b + m[18] * a + m[19];
        }
        return out;
    }
}
