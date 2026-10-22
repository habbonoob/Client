// Pixel building blocks for the filters: box blur (the blur is a box filter of the given size,
// repeated `quality` times, which approaches a Gaussian), alpha masks and compositing, all on
// straight (non-premultiplied) RGBA.

/** Blur premultiplied channels in place: `passes` box blurs of `sizeX` × `sizeY` pixels. */
export function boxBlur(data: Float32Array, w: number, h: number, sizeX: number, sizeY: number, passes: number): void {
    const tmp = new Float32Array(data.length);
    for (let p = 0; p < passes; p++) {
        if (sizeX > 1) { blurAxis(data, tmp, w, h, Math.round(sizeX), true); data.set(tmp); }
        if (sizeY > 1) { blurAxis(data, tmp, w, h, Math.round(sizeY), false); data.set(tmp); }
    }
}

function blurAxis(src: Float32Array, dst: Float32Array, w: number, h: number, size: number, horizontal: boolean): void {
    const half = Math.floor(size / 2);
    const lines = horizontal ? h : w, len = horizontal ? w : h;
    const idx = (line: number, i: number) => (horizontal ? line * w + i : i * w + line) * 4;
    for (let line = 0; line < lines; line++) {
        for (let c = 0; c < 4; c++) {
            let sum = 0;
            for (let i = -half; i < size - half; i++) if (i >= 0 && i < len) sum += src[idx(line, i) + c];
            for (let i = 0; i < len; i++) {
                dst[idx(line, i) + c] = sum / size;
                const out = i - half, inn = i + size - half;
                if (out >= 0 && out < len) sum -= src[idx(line, out) + c];
                if (inn >= 0 && inn < len) sum += src[idx(line, inn) + c];
            }
        }
    }
}

/** Straight RGBA bytes → premultiplied floats (0-255). */
export function premultiply(px: Uint8ClampedArray): Float32Array {
    const out = new Float32Array(px.length);
    for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3] / 255;
        out[i] = px[i] * a; out[i + 1] = px[i + 1] * a; out[i + 2] = px[i + 2] * a; out[i + 3] = px[i + 3];
    }
    return out;
}

/** Premultiplied floats → straight RGBA ImageData. */
export function unpremultiply(data: Float32Array, w: number, h: number): ImageData {
    const img = new ImageData(w, h);
    const px = img.data;
    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        px[i + 3] = a;
        if (a > 0) {
            const k = 255 / a;
            px[i] = data[i] * k; px[i + 1] = data[i + 1] * k; px[i + 2] = data[i + 2] * k;
        }
    }
    return img;
}

/**
 * A glow or shadow: the source alpha (offset by dx, dy), blurred, scaled by `strength`, in `color`.
 * `inner` puts it inside the shape (the inverted alpha), `knockout` leaves out the source, and
 * `hideObject` drops the source from the result.
 */
export function shadowPass(source: ImageData, opts: {
    dx: number; dy: number; color: number; alpha: number; blurX: number; blurY: number; strength: number;
    quality: number; inner: boolean; knockout: boolean; hideObject: boolean;
}): ImageData {
    const { width: w, height: h, data: s } = source;
    const mask = new Float32Array(w * h * 4);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const sx = x - Math.round(opts.dx), sy = y - Math.round(opts.dy);
            const a = sx >= 0 && sy >= 0 && sx < w && sy < h ? s[(sy * w + sx) * 4 + 3] : 0;
            mask[(y * w + x) * 4 + 3] = opts.inner ? 255 - a : a;
        }
    }
    boxBlur(mask, w, h, opts.blurX, opts.blurY, Math.max(1, opts.quality));
    const r = (opts.color >> 16) & 255, g = (opts.color >> 8) & 255, b = opts.color & 255;
    const out = new ImageData(w, h);
    const o = out.data;
    for (let i = 0; i < w * h; i++) {
        const k = i * 4;
        const sa = s[k + 3] / 255;
        let ga = Math.min(1, (mask[k + 3] / 255) * opts.strength) * opts.alpha;
        if (opts.inner) ga *= sa;                                   // inner glow stays inside the shape
        const showSource = !opts.knockout && !opts.hideObject;
        let rr: number, gg: number, bb: number, aa: number;
        if (opts.inner) {
            // the glow (already limited to the shape) laid over the source, or alone for knockout
            if (showSource) {
                aa = sa;
                const t = sa > 0 ? ga / sa : 0;
                rr = s[k] * (1 - t) + r * t;
                gg = s[k + 1] * (1 - t) + g * t;
                bb = s[k + 2] * (1 - t) + b * t;
            } else {
                aa = ga; rr = r; gg = g; bb = b;
            }
        } else {
            // glow behind the source (or the glow alone, cut out by the source for knockout)
            const glowA = opts.knockout ? ga * (1 - sa) : ga;
            if (showSource) {
                aa = sa + glowA * (1 - sa);
                rr = aa > 0 ? (s[k] * sa + r * glowA * (1 - sa)) / aa : 0;
                gg = aa > 0 ? (s[k + 1] * sa + g * glowA * (1 - sa)) / aa : 0;
                bb = aa > 0 ? (s[k + 2] * sa + b * glowA * (1 - sa)) / aa : 0;
            } else {
                aa = glowA; rr = r; gg = g; bb = b;
            }
        }
        o[k] = rr; o[k + 1] = gg; o[k + 2] = bb; o[k + 3] = aa * 255;
    }
    return out;
}
