// BitmapData drawn on the GPU checked against the same drawing on the CPU: each case runs its operations once with
// the renderer registered (copyPixels, draw and fillRect go to render textures) and once without (canvases only), then
// reads both back and compares the pixels, premultiplied.
import { RenderTexture, type Renderer } from 'pixi.js';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { setBitmapRenderer } from '@habbo-pixi/runtime/display/gpuSurface';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

/** A premultiplied channel may be off by this much (the GPU rounds once per draw, the canvas its own way). */
const TOLERANCE = 3;

export interface BitmapResult { name: string; maxDiff: number; over: number; pixels: number; ok: boolean; ms: number; onGpu: boolean }

/** A source like an avatar part: opaque shapes, partial alpha, a hard transparent edge. */
function part(image: HTMLCanvasElement, w: number, h: number): BitmapData {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d')!.drawImage(image, -40, -40);
    return BitmapData.fromImage(c);
}

type Case = [string, (image: HTMLCanvasElement) => BitmapData];

/** The bitmap rendered on the GPU (an alpha-to-alpha copyChannel: a pass that changes nothing), so what follows
 * runs there rather than on the canvas its queued copies would replay on. */
function rendered(b: BitmapData): BitmapData {
    b.copyChannel(b, b.rect, new Point(), 8, 8);
    return b;
}

const cases: Case[] = [
    ['new transparent', () => new BitmapData(40, 30, true, 0)],
    ['new filled', () => new BitmapData(40, 30, true, 0x80ff8000)],
    ['new opaque', () => new BitmapData(40, 30, false, 0x123456)],
    ['copyPixels replace', image => {
        const b = new BitmapData(60, 50, true, 0xff2040c0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(5, 4));
        return b;
    }],
    ['copyPixels mergeAlpha', image => {
        const b = new BitmapData(60, 50, true, 0xff2040c0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(5, 4), null, null, true);
        return b;
    }],
    ['copyPixels clipped both sides', image => {
        const b = new BitmapData(30, 30, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(-5, 10, 50, 40), new Point(-8, 3), null, null, true);
        return b;
    }],
    ['copyPixels into opaque', image => {
        const b = new BitmapData(60, 50, false, 0x406080);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(5, 4));
        return b;
    }],
    ['avatar compose', image => {
        // what the avatar renderer does: a canvas, parts merged in, some flipped, one coloured
        const body = part(image, 64, 48);
        const b = new BitmapData(80, 70, true, 0);
        b.copyPixels(body, body.rect, new Point(8, 2), null, null, true);
        b.draw(body, new Matrix(-1, 0, 0, 1, 72, 20), null, null, null, false);
        const tint = new ColorTransform(0.8, 0.4, 1, 1);
        b.draw(body, new Matrix(1, 0, 0, 1, 2, 30), tint, null, null, false);
        b.draw(body, new Matrix(1, 0, 0, -1, 10, 60), new ColorTransform(1, 1, 1, 0.5), null, new Rectangle(0, 0, 80, 40), false);
        return b;
    }],
    ['fillRect partial', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point());
        b.fillRect(new Rectangle(10, 5, 20, 12), 0x80ffffff);
        b.fillRect(new Rectangle(-4, 30, 100, 30), 0);
        return b;
    }],
    ['fill then copy', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.fillRect(b.rect, 0xff00ff00);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        return b;
    }],
    ['chain (GPU source into GPU)', image => {
        const a = new BitmapData(50, 40, true, 0);
        a.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        const b = new BitmapData(50, 40, true, 0xff000080);
        b.copyPixels(a, a.rect, new Point(3, 3), null, null, true);
        // the source changes after b queued it: b must have read it first
        a.fillRect(a.rect, 0xffff0000);
        a.dispose();
        return b;
    }],
    ['clone', image => {
        const a = new BitmapData(50, 40, true, 0);
        a.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        return a.clone();
    }],
    ['GPU then CPU write', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.setPixel32(3, 3, 0xff00ff00);
        b.colorTransform(new Rectangle(0, 0, 25, 40), new ColorTransform(1, 0.5, 0.5, 1, 20, 0, 0, 0));
        b.copyPixels(part(image, 20, 20), new Rectangle(0, 0, 20, 20), new Point(25, 10), null, null, true);
        return b;
    }],
    ['colorTransform (furni colouring)', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(b.rect, new ColorTransform(0x99 / 255, 0xcc / 255, 0x33 / 255, 1));
        return b;
    }],
    ['colorTransform alpha, part rect', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(new Rectangle(10, 5, 30, 20), new ColorTransform(1, 0.2, 0.6, 0.5));
        b.copyPixels(part(image, 20, 20), new Rectangle(0, 0, 20, 20), new Point(25, 15), null, null, true);
        return b;
    }],
    ['colorTransform opaque', image => {
        const b = new BitmapData(50, 40, false, 0x808080);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(b.rect, new ColorTransform(0.4, 1, 0.8, 0.3));
        return b;
    }],
    ['colorTransform offset (pass)', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(b.rect, new ColorTransform(1, 1, 1, 1, 30, 0, 0, 0));
        return b;
    }],
    ['colorTransform quarter, opaque (modal backdrop)', image => {
        // ModalDialog darkens the screen with 0.25: not a whole 255th, so not a tint
        const b = new BitmapData(50, 40, false, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(b.rect, new ColorTransform(0.25, 0.25, 0.25));
        return b;
    }],
    ['colorTransform offsets and fractions, part rect', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.colorTransform(new Rectangle(5, 3, 33, 29), new ColorTransform(0.33, 1.5, 0.7, 0.9, -40, 25, 10, -20));
        return b;
    }],
    ['colorTransform (furni colouring), rendered', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(b.rect, new ColorTransform(0x99 / 255, 0xcc / 255, 0x33 / 255, 1));
        return b;
    }],
    ['colorTransform alpha, part rect, rendered', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(new Rectangle(10, 5, 30, 20), new ColorTransform(1, 0.2, 0.6, 0.5));
        b.copyPixels(part(image, 20, 20), new Rectangle(0, 0, 20, 20), new Point(25, 15), null, null, true);
        return b;
    }],
    ['colorTransform opaque, rendered', image => {
        const b = new BitmapData(50, 40, false, 0x808080);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(b.rect, new ColorTransform(0.4, 1, 0.8, 0.3));
        return b;
    }],
    ['colorTransform offset (pass), rendered', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(b.rect, new ColorTransform(1, 1, 1, 1, 30, 0, 0, 0));
        return b;
    }],
    ['colorTransform quarter, opaque (modal backdrop), rendered', image => {
        // ModalDialog darkens the screen with 0.25: not a whole 255th, so not a tint
        const b = new BitmapData(50, 40, false, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(b.rect, new ColorTransform(0.25, 0.25, 0.25));
        return b;
    }],
    ['colorTransform offsets and fractions, part rect, rendered', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        rendered(b).colorTransform(new Rectangle(5, 3, 33, 29), new ColorTransform(0.33, 1.5, 0.7, 0.9, -40, 25, 10, -20));
        return b;
    }],
    ['avatar chain (queued copies)', image => {
        // AvatarImage: parts into an image, its top cropped off into a second, that one cloned
        const parts = [part(image, 30, 30), part(image, 24, 40), part(image, 40, 20)];
        const union = new BitmapData(64, 70, true, 0);
        union.fillRect(union.rect, 0);
        parts.forEach((p, i) => union.copyPixels(p, p.rect, new Point(4 + i * 9, 6 + i * 11), null, null, true));
        const cropped = new BitmapData(64, 55, true, 0);
        cropped.copyPixels(union, new Rectangle(0, 15, 64, 55), new Point(), null, null, true);
        const out = cropped.clone();
        // the parts change afterwards: the copies must have read them first
        parts[0].fillRect(parts[0].rect, 0xffff0000);
        union.dispose();
        cropped.dispose();
        return out;
    }],
    ['skin piece cloned, coloured, copied onto a canvas bitmap (window skin)', image => {
        // BitmapSkinRenderer: a piece cut out of the skin sheet is cloned and coloured at every draw, then copied into
        // the window's bitmap, which is on the canvas: the tint goes into the clone's queued copy, which the copy replays
        // on the canvas rather than reading the clone back
        const piece = new BitmapData(30, 20, true, 0);
        piece.copyPixels(part(image, 60, 50), new Rectangle(10, 10, 30, 20), new Point());
        const coloured = piece.clone();
        coloured.colorTransform(coloured.rect, new ColorTransform(0x80 / 255, 0xc0 / 255, 1, 0x99 / 255));
        const window = rendered(new BitmapData(50, 40, true, 0xff204060));
        window.setPixel32(0, 0, 0xff204060);   // written on the canvas after the GPU: it stays on the canvas
        window.copyPixels(coloured, coloured.rect, new Point(8, 6), null, null, true);
        return window;
    }],
    ['queued copy over content, replace', image => {
        const a = new BitmapData(50, 40, true, 0);
        a.copyPixels(part(image, 30, 30), new Rectangle(0, 0, 30, 30), new Point(10, 5), null, null, true);
        const b = new BitmapData(50, 40, true, 0xff3060a0);
        b.copyPixels(a, new Rectangle(5, 5, 30, 30), new Point(12, 4));
        b.draw(a, new Matrix(1, 0, 0, 1, -20, 15));
        return b;
    }],
    ['blank source copies', () => {
        const blank = new BitmapData(20, 20, true, 0x80ff0000);
        const b = new BitmapData(50, 40, true, 0xff00ff00);
        b.copyPixels(blank, blank.rect, new Point(3, 3));
        b.copyPixels(blank, blank.rect, new Point(26, 16), null, null, true);
        return b;
    }],
    ['copyChannel green to alpha, self (avatar sprite data)', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        b.copyChannel(b, b.rect, new Point(), 2, 8);
        return b;
    }],
    ['copyChannel alpha to red and back (room plane mask)', image => {
        const plane = new BitmapData(50, 40, true, 0);
        plane.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        const mask = new BitmapData(50, 40, true, 0xff000000);
        mask.copyChannel(plane, plane.rect, new Point(), 8, 1);
        mask.fillRect(new Rectangle(10, 10, 20, 12), 0xff000000);
        plane.copyChannel(mask, mask.rect, new Point(), 1, 8);
        return plane;
    }],
    ['copyChannel offset, into opaque', image => {
        const b = new BitmapData(50, 40, false, 0x336699);
        const src = part(image, 30, 30);
        b.copyChannel(src, new Rectangle(-4, 5, 30, 30), new Point(12, -3), 8, 4);
        return b;
    }],
    ['paletteMap grayscale reds (avatar)', image => {
        const b = new BitmapData(50, 40, true, 0);
        b.copyPixels(part(image, 50, 40), new Rectangle(0, 0, 50, 40), new Point(), null, null, true);
        const reds: number[] = [];
        for (let i = 0; i < 256; i++) reds.push(((i >> 1) << 16) | ((i >> 2) << 8) | (255 - i));
        b.paletteMap(b, b.rect, new Point(), reds, [], []);
        return b;
    }],
    ['paletteMap green table, carry (furni palette)', image => {
        const b = new BitmapData(50, 40, true, 0);
        const src = part(image, 50, 40);
        const greens: number[] = [];
        for (let i = 0; i < 256; i++) greens.push((0xff << 24) | (i << 16) | ((i * 3) & 0xffff));
        b.paletteMap(src, src.rect, new Point(), null, greens, null, null);
        return b;
    }],
    ['alpha bitmap copy, replace', image => {
        const b = new BitmapData(50, 40, true, 0xff2040c0);
        const mask = new BitmapData(30, 30, true, 0);
        mask.fillRect(new Rectangle(5, 5, 15, 25), 0x80000000);
        mask.fillRect(new Rectangle(0, 0, 8, 8), 0xff000000);
        b.copyPixels(part(image, 40, 35), new Rectangle(0, 0, 40, 35), new Point(5, 2), mask, new Point(2, 3), false);
        return b;
    }],
    ['alpha bitmap copy, merge (plane material)', image => {
        const b = new BitmapData(50, 40, true, 0x8040a020);
        const src = part(image, 40, 35);
        b.copyPixels(src, src.rect, new Point(4, 4), src, new Point(0, 0), true);
        return b;
    }],
    ['alpha bitmap copy into opaque', image => {
        const b = new BitmapData(50, 40, false, 0x808080);
        const mask = new BitmapData(50, 40, true, 0x60000000);
        b.copyPixels(part(image, 40, 35), new Rectangle(0, 0, 40, 35), new Point(0, 0), mask, null, false);
        return b;
    }],
    ['scaled draw (CPU fallback)', image => {
        const b = new BitmapData(60, 50, true, 0);
        b.draw(part(image, 30, 25), new Matrix(2, 0, 0, 2, 0, 0));
        return b;
    }],
];

function premultipliedWords(b: BitmapData): Float32Array {
    const words = b.getVector(b.rect);
    const out = new Float32Array(words.length * 4);
    for (let i = 0; i < words.length; i++) {
        const v = words[i], a = (v >>> 24) / 255;
        out[i * 4] = ((v >> 16) & 255) * a; out[i * 4 + 1] = ((v >> 8) & 255) * a; out[i * 4 + 2] = (v & 255) * a; out[i * 4 + 3] = v >>> 24;
    }
    return out;
}

function show(b: BitmapData, name: string): void {
    const c = document.createElement('canvas');
    c.width = b.width; c.height = b.height;
    const img = new ImageData(b.width, b.height);
    const words = b.getVector(b.rect);
    for (let i = 0; i < words.length; i++) {
        const v = words[i];
        img.data[i * 4] = (v >> 16) & 255; img.data[i * 4 + 1] = (v >> 8) & 255; img.data[i * 4 + 2] = v & 255; img.data[i * 4 + 3] = v >>> 24;
    }
    c.getContext('2d')!.putImageData(img, 0, 0);
    c.title = name;
    document.body.appendChild(c);
}

export function runBitmapCases(renderer: Renderer, image: HTMLCanvasElement): BitmapResult[] {
    const results: BitmapResult[] = [];
    for (const [name, build] of cases) {
        setBitmapRenderer(null);
        const cpuBitmap = build(image);
        const cpu = premultipliedWords(cpuBitmap);
        setBitmapRenderer(renderer);
        const started = performance.now();
        const gpuBitmap = build(image);
        const onGpu = gpuBitmap.texture() instanceof RenderTexture;
        const gpu = premultipliedWords(gpuBitmap);
        const ms = performance.now() - started;
        setBitmapRenderer(null);

        let maxDiff = 0, over = 0;
        for (let i = 0; i < cpu.length; i++) {
            const d = Math.abs(cpu[i] - gpu[i]);
            if (d > maxDiff) maxDiff = d;
            if (d > TOLERANCE) over++;
        }
        let pixelMisses = 0;
        // getPixel32 straight from the GPU (one pixel read back), against the CPU's pixel
        for (let i = 0; i < 40; i++) {
            const x = (i * 7919) % gpuBitmap.width, y = (i * 104729) % gpuBitmap.height;
            setBitmapRenderer(renderer);
            const fresh = build(image);
            const c = cpuBitmap.getPixel32(x, y), g = fresh.getPixel32(x, y);
            fresh.dispose();
            setBitmapRenderer(null);
            for (const shift of [24, 16, 8, 0]) {
                const ca = (c >>> 24) / 255, ga = (g >>> 24) / 255;
                const cv = shift === 24 ? c >>> 24 : ((c >>> shift) & 255) * ca, gv = shift === 24 ? g >>> 24 : ((g >>> shift) & 255) * ga;
                if (Math.abs(cv - gv) > TOLERANCE) { pixelMisses++; if (pixelMisses < 3) console.error(`${name} pixel ${x},${y}: cpu ${c.toString(16)} gpu ${g.toString(16)}`); }
            }
        }
        results.push({ name: `bitmap: ${name}${pixelMisses ? ` (${pixelMisses} getPixel32 misses)` : ''}`, maxDiff: Math.round(maxDiff * 10) / 10, over: over + pixelMisses, pixels: cpu.length / 4, ok: over === 0, ms: Math.round(ms * 10) / 10, onGpu });
        show(cpuBitmap, `${name} (CPU)`);
        show(gpuBitmap, `${name} (GPU)`);
        cpuBitmap.dispose();
        gpuBitmap.dispose();
    }
    return results;
}
