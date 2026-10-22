// Perlin noise for BitmapData.perlinNoise: gradient noise summed over octaves, each octave twice the
// frequency and half the amplitude of the previous one; `stitch` makes it tile at the bitmap size;
// fractal noise maps [-1, 1] to [0, 255], turbulence uses the absolute value.

/** A deterministic generator seeded like the rest of the runtime (Park–Miller). */
function prng(seed: number): () => number {
    let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

class Noise {
    readonly #perm: Uint8Array;

    constructor(seed: number) {
        const rand = prng(seed);
        const p = Array.from({ length: 256 }, (_, i) => i);
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [p[i], p[j]] = [p[j], p[i]];
        }
        this.#perm = new Uint8Array(512);
        for (let i = 0; i < 512; i++) this.#perm[i] = p[i & 255];
    }

    /** Noise in [-1, 1] at (x, y); with periods > 0 the lattice wraps (tiling). */
    at(x: number, y: number, periodX: number, periodY: number): number {
        const xi = Math.floor(x), yi = Math.floor(y);
        const xf = x - xi, yf = y - yi;
        const wrap = (v: number, period: number) => (period > 0 ? ((v % period) + period) % period : v) & 255;
        const x0 = wrap(xi, periodX), x1 = wrap(xi + 1, periodX), y0 = wrap(yi, periodY), y1 = wrap(yi + 1, periodY);
        const p = this.#perm;
        const grad = (h: number, dx: number, dy: number) => {
            switch (h & 7) {
                case 0: return dx + dy; case 1: return -dx + dy; case 2: return dx - dy; case 3: return -dx - dy;
                case 4: return dx; case 5: return -dx; case 6: return dy; default: return -dy;
            }
        };
        const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
        const u = fade(xf), v = fade(yf);
        const aa = grad(p[p[x0] + y0], xf, yf), ba = grad(p[p[x1] + y0], xf - 1, yf);
        const ab = grad(p[p[x0] + y1], xf, yf - 1), bb = grad(p[p[x1] + y1], xf - 1, yf - 1);
        const lerp = (a: number, b: number, t: number) => a + t * (b - a);
        return lerp(lerp(aa, ba, u), lerp(ab, bb, u), v);
    }
}

export interface PerlinOptions {
    baseX: number; baseY: number; numOctaves: number; randomSeed: number; stitch: boolean; fractalNoise: boolean;
    channelOptions: number; grayScale: boolean; offsets: { x: number; y: number }[] | null;
}

/** Fill straight RGBA pixels (w × h) with noise; channels not selected keep 0 (alpha 255 unless selected). */
export function perlinNoise(pixels: Uint8ClampedArray, w: number, h: number, o: PerlinOptions): void {
    const channels = o.grayScale ? [0] : [0, 1, 2, 3].filter(c => o.channelOptions & (1 << c));
    const noises = [0, 1, 2, 3].map(c => new Noise(o.randomSeed + c * 7919));
    const bx = o.baseX || 1, by = o.baseY || 1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const values = [0, 0, 0, 0];
            for (const c of channels) {
                let sum = 0, amp = 1, freqX = 1 / bx, freqY = 1 / by, total = 0;
                for (let oct = 0; oct < Math.max(1, o.numOctaves); oct++) {
                    const off = o.offsets?.[oct];
                    const px = (x + (off?.x ?? 0)) * freqX, py = (y + (off?.y ?? 0)) * freqY;
                    const periodX = o.stitch ? Math.max(1, Math.round(w * freqX)) : 0;
                    const periodY = o.stitch ? Math.max(1, Math.round(h * freqY)) : 0;
                    const n = noises[c].at(px, py, periodX, periodY);
                    sum += (o.fractalNoise ? n : Math.abs(n)) * amp;
                    total += amp;
                    amp /= 2;
                    freqX *= 2;
                    freqY *= 2;
                }
                const v = sum / total;
                values[c] = Math.round(o.fractalNoise ? (v + 1) * 127.5 : v * 255);
            }
            if (o.grayScale) values[1] = values[2] = values[0];
            pixels[i] = values[0];
            pixels[i + 1] = values[1];
            pixels[i + 2] = values[2];
            pixels[i + 3] = o.channelOptions & 8 ? values[3] : 255;
        }
    }
}
