// The runtime's GPU paths checked against its CPU paths, in a real browser: each case runs a filter both ways on
// the same image and compares the pixels. Results go to window.__results (and the page), for gpu-tests/run.ts.
import { Application, BlurFilter as PixiBlurFilter, RendererType, RenderTexture, Sprite, Texture, type Filter } from 'pixi.js';
import { DropShadowFilter as PixiDropShadowFilter, GlowFilter as PixiGlowFilter } from 'pixi-filters';
import { FILTER_PIXELS } from '@habbo-pixi/runtime/display/filterHooks';
import type { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { BlurFilter } from '@habbo-pixi/runtime/filters/BlurFilter';
import { DropShadowFilter } from '@habbo-pixi/runtime/filters/DropShadowFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { runBitmapCases } from './bitmapCases';

/** Transparent margin around the test image: wider than any blur and shadow here reaches. */
const PAD = 48;
const W = 96, H = 64;
/** A premultiplied channel may be off by this much (8-bit rounding between passes, which the CPU does not do). */
const TOLERANCE = 3;

interface Result { name: string; maxDiff: number; over: number; pixels: number; ok: boolean; ms: number; bestShift?: string }

/** Shapes, a soft edge, partial alpha and text: what the client's glows and shadows sit on. */
function testImage(): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = W + PAD * 2;
    c.height = H + PAD * 2;
    const g = c.getContext('2d')!;
    g.translate(PAD, PAD);
    g.fillStyle = '#e8b030';
    g.fillRect(4, 6, 30, 22);
    g.fillStyle = 'rgba(40, 120, 220, 0.6)';
    g.beginPath(); g.arc(58, 22, 16, 0, Math.PI * 2); g.fill();
    const grad = g.createLinearGradient(0, 40, W, 40);
    grad.addColorStop(0, 'rgba(255,255,255,0)'); grad.addColorStop(1, 'rgba(255,40,80,1)');
    g.fillStyle = grad;
    g.fillRect(2, 38, W - 4, 10);
    g.fillStyle = '#ffffff';
    g.font = 'bold 13px sans-serif';
    g.fillText('Habbo', 8, 62);
    return c;
}

function premultiplied(px: Uint8ClampedArray | Uint8Array): Float32Array {
    const out = new Float32Array(px.length);
    for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3] / 255;
        out[i] = px[i] * a; out[i + 1] = px[i + 1] * a; out[i + 2] = px[i + 2] * a; out[i + 3] = px[i + 3];
    }
    return out;
}

/**
 * ?baseline=pixi: what the filters showed on screen before FlashFilter (PIXI's own blur and pixi-filters' glow and
 * shadow, set up as the runtime set them up), to see how far that was from Flash.
 */
function pixiApproximation(f: BitmapFilter): Filter {
    if (f instanceof BlurFilter) {
        const sigma = (b: number) => b * Math.sqrt(Math.max(1, f.quality) / 12);
        return new PixiBlurFilter({ strengthX: sigma(f.blurX), strengthY: sigma(f.blurY), quality: Math.max(1, f.quality) * 2 });
    }
    if (f instanceof GlowFilter) {
        return new PixiGlowFilter({
            distance: Math.max(1, Math.round(Math.max(f.blurX, f.blurY) / 2)), outerStrength: f.inner ? 0 : f.strength,
            innerStrength: f.inner ? f.strength : 0, color: f.color, alpha: f.alpha, knockout: f.knockout, quality: 0.1 * Math.max(1, f.quality),
        });
    }
    const s = f as DropShadowFilter;
    if (s.inner) {
        return new PixiGlowFilter({ distance: Math.max(1, Math.round(Math.max(s.blurX, s.blurY) / 2)), outerStrength: 0, innerStrength: s.strength, color: s.color, alpha: s.alpha, knockout: s.knockout });
    }
    const a = s.angle * Math.PI / 180;
    return new PixiDropShadowFilter({
        offset: { x: Math.cos(a) * s.distance, y: Math.sin(a) * s.distance }, color: s.color, alpha: Math.min(1, s.alpha * s.strength),
        blur: Math.max(s.blurX, s.blurY) / 4, quality: Math.max(1, s.quality) * 2, shadowOnly: s.hideObject || s.knockout,
    });
}

function straight(px: Uint8ClampedArray | Uint8Array): Uint8ClampedArray {
    const out = new Uint8ClampedArray(px.length);
    for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3];
        out[i + 3] = a;
        if (a > 0) for (let c = 0; c < 3; c++) out[i + c] = px[i + c] * 255 / a;
    }
    return out;
}

async function run(): Promise<Result[]> {
    const requested = new URLSearchParams(location.search).get('renderer');
    const app = new Application();
    await app.init({ preference: requested === 'webgpu' ? 'webgpu' : 'webgl', width: 64, height: 64, antialias: false, background: '#000', backgroundAlpha: 0 });
    const renderer = app.renderer;
    const image = testImage();
    const source = image.getContext('2d')!.getImageData(0, 0, image.width, image.height);
    const texture = Texture.from(image);

    const cases: [string, BitmapFilter | null][] = [
        ['no filter (harness check)', null],
        ['copy (blur 1x1)', new BlurFilter(1, 1, 1)],
        ['blur 4x4 q1', new BlurFilter(4, 4, 1)],
        ['blur 8x3 q2', new BlurFilter(8, 3, 2)],
        ['blur 5x5 q3', new BlurFilter(5, 5, 3)],
        ['blur 16x16 q1', new BlurFilter(16, 16, 1)],
        ['glow default', new GlowFilter()],
        ['glow white strength 3', new GlowFilter(0xffffff, 1, 8, 8, 3, 2)],
        ['glow inner', new GlowFilter(0x00ff00, 0.8, 6, 6, 2, 1, true)],
        ['glow knockout', new GlowFilter(0x0000ff, 1, 6, 6, 2, 1, false, true)],
        ['glow inner knockout', new GlowFilter(0xff00ff, 1, 4, 4, 2, 1, true, true)],
        ['shadow default', new DropShadowFilter()],
        ['shadow far soft', new DropShadowFilter(10, 135, 0x202020, 0.7, 10, 10, 1.5, 2)],
        ['shadow inner', new DropShadowFilter(4, 45, 0, 1, 4, 4, 1, 1, true)],
        ['shadow hide object', new DropShadowFilter(5, 60, 0x3366ff, 1, 6, 6, 1, 1, false, false, true)],
        ['shadow knockout', new DropShadowFilter(5, 60, 0x3366ff, 1, 6, 6, 1, 1, false, true)],
    ];

    const results: Result[] = [];
    for (const [name, filter] of cases) {
        const cpuPixels = filter ? filter[FILTER_PIXELS](source).data : source.data;
        const cpu = premultiplied(cpuPixels);

        const sprite = new Sprite(texture);
        const baseline = new URLSearchParams(location.search).get('baseline') === 'pixi';
        sprite.filters = filter ? [baseline ? pixiApproximation(filter) : filter.createRenderFilter()!] : [];
        const target = RenderTexture.create({ width: image.width, height: image.height });
        const started = performance.now();
        renderer.render({ container: sprite, target, clear: true });
        const { pixels } = renderer.extract.pixels(target);
        const ms = performance.now() - started;
        // WebGL hands a render texture's pixels back premultiplied, as they are held; WebGPU reads them through a
        // 2D canvas, which unpremultiplies
        const webgpu = renderer.type === RendererType.WEBGPU;
        const gpu = webgpu ? premultiplied(pixels) : Float32Array.from(pixels);

        let maxDiff = 0, over = 0;
        for (let i = 0; i < cpu.length; i++) {
            const d = Math.abs(cpu[i] - gpu[i]);
            if (d > maxDiff) maxDiff = d;
            if (d > TOLERANCE) over++;
        }
        // when it does not match: whether it would, moved by a few pixels (a misplaced frame, not wrong arithmetic)
        let bestShift: string | undefined;
        if (over > 0) {
            const w = image.width, h = image.height;
            let best = Infinity;
            for (let sy = -3; sy <= 3; sy++) {
                for (let sx = -3; sx <= 3; sx++) {
                    let m = 0;
                    for (let y = 4; y < h - 4; y++) for (let x = 4; x < w - 4; x++) {
                        const i = (y * w + x) * 4, j = ((y + sy) * w + (x + sx)) * 4;
                        for (let c = 0; c < 4; c++) m = Math.max(m, Math.abs(cpu[i + c] - gpu[j + c]));
                    }
                    if (m < best) { best = m; bestShift = `${sx},${sy} -> max ${Math.round(m * 10) / 10}`; }
                }
            }
        }
        results.push({ name, maxDiff: Math.round(maxDiff * 10) / 10, over, pixels: cpu.length / 4, ok: over === 0, ms: Math.round(ms * 10) / 10, bestShift });

        // side by side for a look: CPU, GPU
        for (const px of [cpuPixels, webgpu ? pixels : straight(pixels)]) {
            const c = document.createElement('canvas');
            c.width = image.width; c.height = image.height;
            c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(px), image.width, image.height), 0, 0);
            c.title = name;
            document.body.appendChild(c);
        }
        target.destroy(true);
        sprite.destroy();
    }
    results.push(...runBitmapCases(renderer, image));
    return results;
}

const log = document.getElementById('log')!;
run().then(results => {
    (window as unknown as { __results: Result[] }).__results = results;
    log.textContent = results.map(r => `${r.ok ? 'ok  ' : 'FAIL'} ${r.name.padEnd(40)} max ${r.maxDiff}  over ${r.over}/${r.pixels}  ${r.ms} ms${'onGpu' in r ? (r.onGpu ? '  [gpu]' : '  [cpu]') : ''}`).join('\n');
}, error => {
    (window as unknown as { __results: unknown }).__results = { error: String(error?.stack ?? error) };
    log.textContent = String(error?.stack ?? error);
});
