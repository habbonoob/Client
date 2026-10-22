// Text drawn as AIR 32 drew it, for the fonts it has runtime glyph records for (js-client's native
// text engine): Ubuntu (regular, bold, italic, bold italic, condensed) and Volter (regular, bold) with
// ADVANCED anti-aliasing and pixel grid fitting, and Volter with NORMAL. Other text falls back to the
// browser's rasteriser (TextField). The bundles load before the client starts (main.ts).

import { type ColorTransformLike, layoutNativeText, layoutNormalText, type NativeFont, type NativeFontBundle, NativeTextRenderer, prepareNativeFont } from './renderer';
import { roundTiesEven } from './raster';
import ubuntuRegular from './fonts/ubuntu_regular.json?url';
import ubuntuBold from './fonts/ubuntu_bold.json?url';
import ubuntuItalic from './fonts/ubuntu_italic.json?url';
import ubuntuBoldItalic from './fonts/ubuntu_bold_italic.json?url';
import ubuntuCondensed from './fonts/ubuntu_condensed.json?url';
import volter from './fonts/volter.json?url';
import volterBold from './fonts/volterb.json?url';

/** What the engine needs from a text format and its field. */
export interface NativeTextFormat {
    fontFamily: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: number;
    leading: number;
    letterSpacing: number;
    kerning: boolean;
    antiAliasType: string;
    gridFitType: string;
    sharpness: number;
    thickness: number;
    stageQuality: 'high' | 'low';
    colorTransform?: ColorTransformLike;
}

export interface NativeMetrics { ascent: number; descent: number; lineHeight: number; baseline: number }

interface Registered { font: NativeFont; renderer: NativeTextRenderer }

const fonts = new Map<string, Registered>();
const fontKey = (family: string, weight: string, style: string) => `${family.trim().toLowerCase()}|${weight}|${style}`;

/** The families as Habbo registers them (weight and style as CSS gives them). */
const BUNDLES: { url: string; family: string; weight: '400' | '700'; style: 'normal' | 'italic' }[] = [
    { url: ubuntuRegular, family: 'Ubuntu', weight: '400', style: 'normal' },
    { url: ubuntuBold, family: 'Ubuntu', weight: '700', style: 'normal' },
    { url: ubuntuItalic, family: 'Ubuntu', weight: '400', style: 'italic' },
    { url: ubuntuBoldItalic, family: 'Ubuntu', weight: '700', style: 'italic' },
    { url: ubuntuCondensed, family: 'UbuntuCondensed', weight: '400', style: 'normal' },
    { url: volter, family: 'Volter', weight: '400', style: 'normal' },
    { url: volterBold, family: 'Volter Bold', weight: '400', style: 'normal' },
    { url: volterBold, family: 'Volter', weight: '700', style: 'normal' },
];

/** Load and register every bundle (each file once). */
export async function loadNativeFonts(): Promise<void> {
    const prepared = new Map<string, Promise<NativeFont>>();
    await Promise.all(BUNDLES.map(async b => {
        let font = prepared.get(b.url);
        if (!font) {
            font = fetch(b.url).then(r => {
                if (!r.ok) throw new Error(`native font bundle ${b.url}: HTTP ${r.status}`);
                return r.json() as Promise<NativeFontBundle>;
            }).then(prepareNativeFont);
            prepared.set(b.url, font);
        }
        const f = await font;
        fonts.set(fontKey(b.family, b.weight, b.style), { font: f, renderer: new NativeTextRenderer(f) });
    }));
    surfaces.clear();
    surfaceBytes = 0;
}

function lookup(f: NativeTextFormat): Registered | null {
    const weight = f.bold ? '700' : '400';
    const found = fonts.get(fontKey(f.fontFamily, weight, f.italic ? 'italic' : 'normal'));
    if (found) return found;
    if (f.fontFamily.toLowerCase() === 'ubuntucondensed' && !f.italic) return fonts.get(fontKey(f.fontFamily, '400', 'normal')) ?? null;
    if (/^volter(?: bold)?$/i.test(f.fontFamily)) return fonts.get(fontKey(f.fontFamily, weight, 'normal')) ?? fonts.get(fontKey(f.fontFamily, '400', 'normal')) ?? null;
    return null;
}

/** Whether the engine draws `text` in this format (the font has every glyph, the mode is one it reproduces). */
export function supports(f: NativeTextFormat, text = ''): boolean {
    const r = lookup(f);
    if (!r || !Number.isSafeInteger(f.fontSize) || f.fontSize <= 0 || f.fontSize > 256 || f.letterSpacing !== 0) return false;
    if (!Number.isFinite(f.thickness) || !Number.isFinite(f.sharpness)) return false;
    if (f.antiAliasType !== 'normal' && (f.antiAliasType !== 'advanced' || f.gridFitType !== 'pixel')) return false;
    if (!['none', 'pixel', 'subpixel'].includes(f.gridFitType)) return false;
    if (f.antiAliasType === 'normal' && !r.font.fontKey.toLowerCase().includes('volter')) return false;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i), g = r.font.swfGlyphs.get(code);
        if (!g || (g.hasInk && !r.font.glyphs.has(code))) return false;
    }
    return true;
}

function layout(f: NativeTextFormat, text: string) {
    const font = lookup(f)!.font;
    return (f.antiAliasType === 'normal' ? layoutNormalText : layoutNativeText)(font, text, f.fontSize, f.kerning);
}

/** The pen position before each character and after the last (whole twips), or null when unsupported. */
export function placements(text: string, f: NativeTextFormat): number[] | null {
    if (!supports(f, text)) return null;
    const l = layout(f, text);
    return [...l.placements.map(p => Math.floor(p.penX * 20) / 20), l.textWidth];
}

export function metrics(f: NativeTextFormat): NativeMetrics | null {
    const r = lookup(f);
    if (!r || !supports(f)) return null;
    const swf = r.font.swfFont;
    const ascent = Math.floor(((swf.metrics.ascent * f.fontSize) / swf.emSquare) * 20) / 20;
    const descent = Math.floor(((swf.metrics.descent * f.fontSize) / swf.emSquare) * 20) / 20;
    const baseline = f.antiAliasType === 'normal' && f.stageQuality !== 'low' ? Math.round((ascent + 2) * 4) / 4 : roundTiesEven(ascent + 2);
    return { ascent, descent, lineHeight: ascent + descent + f.leading, baseline: baseline - 2 };
}

/** How far italic text overhangs its advance (the field is that much wider). */
export function italicOverhang(f: NativeTextFormat): number {
    if (!f.italic || !supports(f)) return 0;
    if (f.antiAliasType === 'advanced') return Math.floor((f.fontSize * Math.fround(0.28) + Math.fround(1.04)) * 20) / 20;
    return f.stageQuality === 'low' && !lookup(f)!.font.swfFont.flags?.italic ? Math.floor(f.fontSize * 0.8) / 2 : 0;
}

// ---------- drawing ----------

interface Surface { canvas: HTMLCanvasElement; baseline: number; bytes: number }

const surfaces = new Map<string, Surface>();
let surfaceBytes = 0;
const SURFACE_BYTES = 4 * 1024 * 1024;
const SURFACE_COUNT = 256;

/**
 * Draw `text` with its pen at x and its baseline at y. Returns false (drawing nothing) when the
 * engine doesn't support it, for the caller to draw it another way.
 */
export function draw(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, f: NativeTextFormat): boolean {
    if (!supports(f, text)) return false;
    if (!text) return true;
    const key = JSON.stringify([f, text]);
    let s = surfaces.get(key);
    if (s) surfaces.delete(key);
    else {
        const width = layout(f, text).textWidth;
        if (width > 16384 || (width + 128) * (f.fontSize * 2 + 8) > 2 * 1024 * 1024) return false;
        const r = lookup(f)!;
        const out = r.renderer.render(text, {
            size: f.fontSize, color: f.color & 0xffffff, colorTransform: f.colorTransform,
            antiAliasType: f.antiAliasType as 'normal' | 'advanced', gridFitType: f.gridFitType,
            thickness: f.thickness, sharpness: f.sharpness, kerning: f.kerning, italic: f.italic, quality: f.stageQuality,
            underline: f.underline && f.antiAliasType === 'advanced',
        });
        const canvas = document.createElement('canvas');
        canvas.width = out.width;
        canvas.height = out.height;
        const c = canvas.getContext('2d')!;
        const image = c.createImageData(out.width, out.height);
        image.data.set(out.pixels);
        unpremultiply(image.data);
        c.putImageData(image, 0, 0);
        s = { canvas, baseline: out.baseline, bytes: out.width * out.height * 4 };
        surfaceBytes += s.bytes;
    }
    surfaces.set(key, s);
    ctx.drawImage(s.canvas, Math.round(x - 2), Math.round(y - s.baseline));
    while (surfaceBytes > SURFACE_BYTES || surfaces.size > SURFACE_COUNT) {
        const [oldest, old] = surfaces.entries().next().value!;
        surfaces.delete(oldest);
        surfaceBytes -= old.bytes;
    }
    return true;
}

function unpremultiply(px: Uint8ClampedArray): void {
    for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3];
        if (a === 255) continue;
        if (a === 0) { px[i] = px[i + 1] = px[i + 2] = 0; continue; }
        px[i] = Math.min(255, Math.round((px[i] * 255) / a));
        px[i + 1] = Math.min(255, Math.round((px[i + 1] * 255) / a));
        px[i + 2] = Math.min(255, Math.round((px[i + 2] * 255) / a));
    }
}
