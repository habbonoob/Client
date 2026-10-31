// One line of text in one font as AIR 32 draws it (js-client's native text renderer): laid out from
// the font's DefineFont3 advances and kerning, and drawn into a premultiplied RGBA surface as Habbo's
// retained text is (a 2-pixel gutter left of the pen, the baseline at `baseline`).

import {
    advancedPixelSetup, advancedRetainedSetup, blendComponent, colorType, type Cutoffs, type Imp1Glyph,
    premultiply, quantizeAlphaMultiplier, rasterizeLowNormal, rasterizeNormal, rasterizeRetained, type Rgba,
    roundRationalTiesEven, roundTiesEven, sampleMaskDensity, textFieldCutoffs,
} from './raster';
import { GlyphTable } from './GlyphTable';

export interface SwfGlyph { code: number; advance: number; hasInk?: boolean }

export interface SwfFont {
    emSquare: number;
    metrics: { ascent: number; descent: number };
    alignmentZones?: { csmTableHint?: number } | null;
    flags?: { italic?: boolean };
    glyphs: SwfGlyph[];
    kerning: { leftCode: number; rightCode: number; adjustment: number }[];
}

/** A font bundle ("air32-native-font-bundle-v1"): the runtime's glyph records and the font's DefineFont3 data. */
export interface NativeFontBundle {
    schemaVersion: number;
    format: string;
    fontKey: string;
    nativeProfile: { glyphs: { codepoint: number; imp1Base64: string }[] };
    swfFont: SwfFont;
}

export interface NativeFont {
    fontKey: string;
    glyphs: GlyphTable;
    swfFont: SwfFont;
    swfGlyphs: Map<number, SwfGlyph>;
    kerning: Map<string, number>;
}

const BUNDLE_FORMAT = 'air32-native-font-bundle-v1';

export function prepareNativeFont(bundle: NativeFontBundle): NativeFont {
    if (bundle?.schemaVersion !== 1 || bundle.format !== BUNDLE_FORMAT) throw new TypeError(`native bundle must use ${BUNDLE_FORMAT}`);
    // each glyph is decoded (and its user id checked) when first drawn
    const glyphs = new GlyphTable(bundle.nativeProfile.glyphs);
    const swf = bundle.swfFont;
    // "¬" (U+00AC) is the one glyph whose advance came out of the bundles negative, in every font (Volter's -13199
    // where its digits have 13653): laid out as it is, the pen went back and the rest of a line was drawn over what
    // came before it ("Kebab Shop ¬ ΩHALALΩ"). It is the glyph's unsigned 16-bit advance read as signed: Habbo's Volter
    // draws "¬" as a swirl some 22 pixels wide, and 52337 (65536 - 13199) is 23 pixels at size 9.
    const swfGlyphs = new Map(swf.glyphs.map(g => [g.code, g.advance < 0 ? { ...g, advance: g.advance + 0x10000 } : g]));
    for (const code of glyphs.keys()) if (!swfGlyphs.has(code)) throw new Error(`DefineFont3 metrics are missing U+${code.toString(16).toUpperCase()}`);
    return {
        fontKey: bundle.fontKey, glyphs, swfFont: swf, swfGlyphs,
        kerning: new Map(swf.kerning.map(k => [`${k.leftCode},${k.rightCode}`, k.adjustment])),
    };
}

// ---------- layout ----------

export interface Placement {
    codepoint: number;
    /** Pen position in pixels. */
    penX: number;
    /** The pen as the glyph is drawn: whole pixels plus eighths (quarters for NORMAL). */
    maskPenX: number;
    hasInk: boolean;
}

export interface TextLayout {
    placements: Placement[];
    rawTextWidth: number;
    /** The width in whole twips. */
    textWidth: number;
    fieldWidth: number;
}

function swfGlyph(font: NativeFont, code: number): SwfGlyph {
    const g = font.swfGlyphs.get(code);
    if (!g || g.advance == null) throw new RangeError(`DefineFont3 has no mapped glyph for U+${code.toString(16).padStart(4, '0')}`);
    return g;
}

const hasInk = (font: NativeFont, g: SwfGlyph): boolean => g.hasInk ?? font.glyphs.has(g.code);

function assertSafeRun(v: number): void {
    if (!Number.isSafeInteger(v)) throw new RangeError('text run is too long for exact DefineFont3 layout');
}

/** ADVANCED layout: pens in em units, each placed on an eighth of a pixel. */
export function layoutNativeText(font: NativeFont, text: string, size: number, kerning: boolean): TextLayout {
    if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError('the exact native layout currently requires integer size');
    if (font.swfFont.alignmentZones != null) return layoutZonedNativeText(font, text, size, kerning);
    const em = font.swfFont.emSquare;
    let pen = 0, previous: number | null = null;
    const placements: Placement[] = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i), g = swfGlyph(font, code);
        if (kerning && previous !== null) pen += font.kerning.get(`${previous},${code}`) ?? 0;
        const scaled = pen * size;
        assertSafeRun(scaled);
        const whole = Math.floor(scaled / em);
        const eighths = roundRationalTiesEven((scaled - whole * em) * 8, em);
        placements.push({ codepoint: code, penX: scaled / em, maskPenX: whole + eighths / 8, hasInk: hasInk(font, g) });
        pen += g.advance;
        previous = code;
    }
    const scaled = pen * size;
    assertSafeRun(scaled);
    const textWidth = Math.floor((scaled * 20) / em) / 20;
    return { placements, rawTextWidth: scaled / em, textWidth, fieldWidth: textWidth + 4 };
}

const ZONED_CACHE_LIMIT = 8192;
const zonedAdvances = new WeakMap<NativeFont, Map<string, [number, number]>>();

/** ADVANCED layout for fonts with alignment zones: each advance is scaled as the glyph's zones fit it. */
function layoutZonedNativeText(font: NativeFont, text: string, size: number, kerning: boolean): TextLayout {
    let cache = zonedAdvances.get(font);
    if (!cache) { cache = new Map(); zonedAdvances.set(font, cache); }
    let pen = 0;
    const placements: Placement[] = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i), g = swfGlyph(font, code);
        const whole = Math.floor(pen), eighths = roundTiesEven((pen - whole) * 8);
        const maskPenX = whole + eighths / 8, ink = hasInk(font, g);
        placements.push({ codepoint: code, penX: pen, maskPenX, hasInk: ink });
        let scale = size / 1024, residual = 0;
        if (ink) {
            const key = `${code}:${size}:${maskPenX}`;
            let fit = cache.get(key);
            if (fit) cache.delete(key);
            else {
                const setup = advancedPixelSetup(requireGlyph(font, code), size, maskPenX + 0.5, 0);
                fit = [setup.normalizedScaleX, setup.residualX];
            }
            cache.set(key, fit);
            if (cache.size > ZONED_CACHE_LIMIT) cache.delete(cache.keys().next().value!);
            [scale, residual] = fit;
        }
        let advance = g.advance;
        if (kerning && i + 1 < text.length) advance += font.kerning.get(`${code},${text.charCodeAt(i + 1)}`) ?? 0;
        pen += (advance / 20) * scale + residual;
    }
    const textWidth = Math.floor(pen * 20) / 20;
    return { placements, rawTextWidth: pen, textWidth, fieldWidth: textWidth + 4 };
}

/** NORMAL layout: pens in whole twips. */
export function layoutNormalText(font: NativeFont, text: string, size: number, kerning: boolean): TextLayout {
    if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError('the exact native layout currently requires integer size');
    const em = font.swfFont.emSquare;
    let twips = 0, raw = 0;
    const placements: Placement[] = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i), g = swfGlyph(font, code);
        placements.push({ codepoint: code, penX: twips / 20, maskPenX: roundToQuarterPixel(twips / 20), hasInk: hasInk(font, g) });
        let advance = g.advance;
        if (kerning && i + 1 < text.length) advance += font.kerning.get(`${code},${text.charCodeAt(i + 1)}`) ?? 0;
        const scaledTwips = advance * size * 20, scaled = advance * size;
        assertSafeRun(scaledTwips);
        assertSafeRun(scaled);
        twips += Math.floor(scaledTwips / em);
        raw += scaled;
        assertSafeRun(twips);
        assertSafeRun(raw);
    }
    const textWidth = twips / 20;
    return { placements, rawTextWidth: raw / em, textWidth, fieldWidth: textWidth + 4 };
}

export const floorToTwips = (v: number): number => Math.floor(v * 20) / 20;
export const roundToQuarterPixel = (v: number): number => Math.round(v * 4) / 4;

export interface LineMetrics { size: number; ascent: number; descent: number; textHeight: number; fieldHeight: number; baseline: number }

export function lineMetrics(font: SwfFont, size: number, normal: boolean, quality: 'high' | 'low'): LineMetrics {
    const ascent = floorToTwips((font.metrics.ascent * size) / font.emSquare);
    const descent = floorToTwips((font.metrics.descent * size) / font.emSquare);
    const baseline = normal && quality !== 'low' ? roundToQuarterPixel(ascent + 2) : roundTiesEven(ascent + 2);
    return { size, ascent, descent, textHeight: ascent + descent, fieldHeight: ascent + descent + 4, baseline };
}

export const advancedItalicOverhang = (size: number): number => Math.floor((size * Math.fround(0.28) + Math.fround(1.04)) * 20) / 20;
export const lowNormalItalicOverhang = (size: number): number => Math.floor(size * 0.8) / 2;

// ---------- drawing ----------

export interface ColorTransformLike { redMultiplier: number; greenMultiplier: number; blueMultiplier: number; alphaMultiplier: number; redOffset: number; greenOffset: number; blueOffset: number; alphaOffset: number }

export interface RenderOptions {
    size: number;
    /** 24-bit RGB. */
    color: number;
    colorTransform?: ColorTransformLike;
    antiAliasType: 'normal' | 'advanced';
    gridFitType: string;
    thickness: number;
    sharpness: number;
    kerning: boolean;
    italic: boolean;
    quality: 'high' | 'low';
    underline: boolean;
}

export interface RenderedText extends TextLayout, LineMetrics {
    width: number;
    height: number;
    /** Premultiplied RGBA. */
    pixels: Uint8ClampedArray;
}

interface CachedCoverage { width: number; height: number; coverage: Uint8Array; originX: number; originY: number }

const RASTER_CACHE_ENTRIES = 8192;
const RASTER_CACHE_BYTES = 2 * 1024 * 1024;

export class NativeTextRenderer {
    readonly font: NativeFont;
    #rasters = new Map<string, CachedCoverage>();
    #rasterBytes = 0;

    constructor(font: NativeFont) {
        this.font = font;
    }

    render(text: string, o: RenderOptions): RenderedText {
        const normal = o.antiAliasType === 'normal';
        if (normal ? !['none', 'pixel', 'subpixel'].includes(o.gridFitType) : o.gridFitType !== 'pixel') {
            throw new RangeError(`unsupported AIR mode ${o.antiAliasType} + ${o.gridFitType}`);
        }
        if (o.underline && normal) throw new RangeError('Habbo skin effects are currently exact for ADVANCED text only');
        const size = o.size, swf = this.font.swfFont;
        const metrics = lineMetrics(swf, size, normal, o.quality);
        let layout = normal ? layoutNormalText(this.font, text, size, o.kerning) : layoutNativeText(this.font, text, size, o.kerning);
        if (!normal && swf.alignmentZones != null && o.italic) layout = { ...layout, fieldWidth: Math.round((layout.fieldWidth + advancedItalicOverhang(size)) * 20) / 20 };
        if (normal && o.quality === 'low' && o.italic && !swf.flags?.italic) layout = { ...layout, fieldWidth: layout.fieldWidth + lowNormalItalicOverhang(size) };
        const width = Math.max(1, Math.ceil(layout.fieldWidth)), height = Math.max(1, Math.ceil(metrics.fieldHeight));
        const pixels = new Uint8ClampedArray(width * height * 4);
        const { color, glyphColor, lineColor } = resolveColors(o.color, o.colorTransform);
        if (normal) {
            if (color[3] !== 255) throw new RangeError('exact AIR32 NORMAL retained rendering requires opaque text');
            if (o.quality === 'low') {
                const coverage = new Uint8Array(width * height);
                for (const p of layout.placements) {
                    if (p.hasInk) rasterizeLowNormal(requireGlyph(this.font, p.codepoint), coverage, width, height, 2 + roundTiesEven(p.penX), metrics.baseline, size, swf.emSquare);
                }
                for (let i = 0; i < coverage.length; i++) if (coverage[i] !== 0) setNormalCoverage(pixels, i * 4, color, 255);
            } else {
                const masks = new Uint16Array(width * height);
                for (const p of layout.placements) {
                    if (p.hasInk) rasterizeNormal(requireGlyph(this.font, p.codepoint), masks, width, height, 2 + p.maskPenX, metrics.baseline, size, swf.emSquare);
                }
                for (let i = 0; i < masks.length; i++) if (masks[i] !== 0) setNormalCoverage(pixels, i * 4, color, sampleMaskDensity(masks[i]));
            }
        } else {
            const cutoffs = textFieldCutoffs(size, o.thickness, o.sharpness, colorType(color), swf.alignmentZones?.csmTableHint ?? 0);
            this.#advancedPass(layout, metrics, pixels, width, height, cutoffs, glyphColor ?? color, o.underline ? (lineColor ?? color) : null);
        }
        return { ...layout, ...metrics, width, height, pixels };
    }

    /** Composite every glyph (and the underline) into the retained surface. */
    #advancedPass(layout: TextLayout, metrics: LineMetrics, pixels: Uint8ClampedArray, width: number, height: number, cutoffs: Cutoffs, glyphColor: Rgba, lineColor: Rgba | null): void {
        const color = premultiply(glyphColor);
        if (lineColor) {
            const length = this.font.swfFont.alignmentZones == null ? Math.floor(layout.rawTextWidth * 4) / 4 : Math.ceil(layout.rawTextWidth);
            compositeUnderline(pixels, width, height, 2, metrics.baseline + 1, length, lineColor);
        }
        for (const p of layout.placements) {
            if (!p.hasInk) continue;
            const key = JSON.stringify([p.codepoint, metrics.size, metrics.baseline, p.maskPenX, cutoffs.outside, cutoffs.inside]);
            let raster = this.#rasters.get(key);
            if (raster) this.#rasters.delete(key);
            else {
                const setup = advancedRetainedSetup(requireGlyph(this.font, p.codepoint), metrics.size, 2 + p.maskPenX + 0.5, -metrics.baseline);
                raster = { ...rasterizeRetained(requireGlyph(this.font, p.codepoint), setup, cutoffs), originX: setup.originX, originY: setup.originY };
            }
            this.#remember(key, raster);
            compositeGlyph(raster, pixels, width, height, raster.originX, raster.originY, color);
        }
    }

    #remember(key: string, raster: CachedCoverage): void {
        if (raster.coverage.byteLength > RASTER_CACHE_BYTES) return;
        if (!this.#rasters.has(key)) this.#rasterBytes += raster.coverage.byteLength;
        this.#rasters.set(key, raster);
        while (this.#rasters.size > RASTER_CACHE_ENTRIES || this.#rasterBytes > RASTER_CACHE_BYTES) {
            const [oldest, r] = this.#rasters.entries().next().value!;
            this.#rasters.delete(oldest);
            this.#rasterBytes -= r.coverage.byteLength;
        }
    }
}

function requireGlyph(font: NativeFont, code: number): Imp1Glyph {
    const g = font.glyphs.get(code);
    if (!g) throw new RangeError(`native profile has no rendered IMP1 glyph for U+${code.toString(16).padStart(4, '0')}`);
    return g;
}

/**
 * The text colour; with a colour transform also the transformed line colour and the glyph colour
 * (the same, with the runtime's quantised alpha).
 */
function resolveColors(rgb: number, t?: ColorTransformLike): { color: Rgba; glyphColor?: Rgba; lineColor?: Rgba } {
    if (!Number.isSafeInteger(rgb) || rgb < 0 || rgb > 0xffffff) throw new RangeError('color must be a 24-bit integer');
    const color: Rgba = [rgb >>> 16, (rgb >>> 8) & 255, rgb & 255, 255];
    if (!t) return { color };
    const c = (v: number) => Math.max(0, Math.min(255, Math.trunc(v)));
    const transformed: Rgba = [
        c(color[0] * t.redMultiplier + t.redOffset), c(color[1] * t.greenMultiplier + t.greenOffset),
        c(color[2] * t.blueMultiplier + t.blueOffset), c(color[3] * t.alphaMultiplier + t.alphaOffset),
    ];
    return { color, lineColor: transformed, glyphColor: [transformed[0], transformed[1], transformed[2], quantizeAlphaMultiplier(transformed[3] / 255)] };
}

/** NORMAL text replaces the retained pixel with the opaque colour at `density`. */
function setNormalCoverage(pixels: Uint8ClampedArray, at: number, color: Rgba, density: number): void {
    if (density === 0) return;
    pixels[at] = (color[0] * (density + 1)) >> 8;
    pixels[at + 1] = (color[1] * (density + 1)) >> 8;
    pixels[at + 2] = (color[2] * (density + 1)) >> 8;
    pixels[at + 3] = density;
}

/** A glyph's coverage (rows bottom-up) composited in premultiplied colour at (x, y). */
function compositeGlyph(glyph: { width: number; height: number; coverage: Uint8Array }, pixels: Uint8ClampedArray, width: number, height: number, x: number, y: number, [r, g, b, a]: Rgba): void {
    const c0 = Math.max(0, -x), c1 = Math.min(glyph.width, width - x);
    const r0 = Math.max(0, -y), r1 = Math.min(glyph.height, height - y);
    for (let row = r0; row < r1; row++) {
        let src = (glyph.height - 1 - row) * glyph.width + c0;
        let dst = ((y + row) * width + x + c0) * 4;
        for (let col = c0; col < c1; col++, src++, dst += 4) {
            const m = glyph.coverage[src];
            if (m === 0) continue;
            const pr = pixels[dst], pg = pixels[dst + 1], pb = pixels[dst + 2], pa = pixels[dst + 3];
            pixels[dst] = pr + (((r - ((pr * a) >> 8)) * m) >> 8);
            pixels[dst + 1] = pg + (((g - ((pg * a) >> 8)) * m) >> 8);
            pixels[dst + 2] = pb + (((b - ((pb * a) >> 8)) * m) >> 8);
            pixels[dst + 3] = pa + (((a - ((pa * a) >> 8)) * m) >> 8);
        }
    }
}

function compositeUnderline(pixels: Uint8ClampedArray, width: number, height: number, x: number, y: number, length: number, color: Rgba): void {
    if (y < 0 || y >= height || length <= 0) return;
    const whole = Math.floor(length);
    for (let i = 0; i < whole; i++) {
        const px = x + i;
        if (px < 0 || px >= width) continue;
        const at = (y * width + px) * 4;
        if (color[3] === 255) { pixels[at] = color[0]; pixels[at + 1] = color[1]; pixels[at + 2] = color[2]; pixels[at + 3] = 255; }
        else compositeCoverage(pixels, at, color, 255);
    }
    const frac = length - whole, px = x + whole;
    if (frac <= 0 || px < 0 || px >= width) return;
    compositeCoverage(pixels, (y * width + px) * 4, color, Math.min(255, Math.round(frac * 256)));
}

function compositeCoverage(pixels: Uint8ClampedArray, at: number, color: Rgba, coverage: number): void {
    if (coverage === 0) return;
    const p = premultiply(color), a = p[3];
    for (let i = 0; i < 3; i++) pixels[at + i] = blendComponent(pixels[at + i], p[i], a, coverage);
    pixels[at + 3] = blendComponent(pixels[at + 3], a, a, coverage);
}
