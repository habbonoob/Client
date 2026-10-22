// Text layout for TextField. The field has a 2-pixel gutter on every side. Text in a font and mode
// the native engine reproduces (air/NativeText) is laid out as AIR did: pen positions in twips from
// the font's advances and kerning, and the runtime's ascent, descent and baseline. Other text is
// measured by the browser, each character advancing by its width plus the format's letterSpacing, in
// whole pixels. Lines wrap at spaces when wordWrap is on (inside a word only when the word alone
// doesn't fit); a line is ascent + descent + leading high, using the tallest font on it; paragraph
// properties (align, margins, indent, leading) come from the paragraph's first character.

import * as NativeText from './air/NativeText';
import type { TextFormat } from './TextFormat';

export const GUTTER = 2;

export interface Line {
    start: number;        // first character
    end: number;          // one past the last character (the paragraph's '\r' is not included)
    x: number;            // left edge of the first character, in field coordinates
    margin: number;       // left margin + block indent + first-line indent (alignment not included)
    y: number;            // top of the line, in field coordinates (before scrolling)
    width: number;        // width of the visible text (trailing spaces excluded)
    ascent: number;
    descent: number;
    baseline: number;     // from the top of the line
    leading: number;
    height: number;
    advances: number[];   // x of each character (and of the end) relative to `x`
    paragraphStart: boolean;
}

export interface Layout {
    lines: Line[];
    textWidth: number;
    textHeight: number;
}

/** The field's rendering settings, which decide whether (and how) the native engine lays text out. */
export interface TextRendering {
    antiAliasType: string;
    gridFitType: string;
    sharpness: number;
    thickness: number;
    stageQuality: 'high' | 'low';
}

let ctx: CanvasRenderingContext2D | null = null;
const widths = new Map<string, number>();
const metrics = new Map<string, { ascent: number; descent: number }>();

function measureContext(): CanvasRenderingContext2D {
    return (ctx ??= document.createElement('canvas').getContext('2d')!);
}

/** The CSS font for a format. */
export function cssFont(f: TextFormat): string {
    const style = f.italic ? 'italic ' : '';
    const weight = f.bold ? 'bold ' : '';
    return `${style}${weight}${f.size ?? 12}px "${(f.font ?? 'Times New Roman').replace(/"/g, '')}", serif`;
}

/** A format as the native engine takes it (`color` overrides the format's). */
export function nativeFormat(f: TextFormat, r: TextRendering, color = f.color ?? 0): NativeText.NativeTextFormat {
    return {
        fontFamily: f.font ?? 'Times New Roman', fontSize: f.size ?? 12, bold: f.bold === true, italic: f.italic === true,
        underline: f.underline === true, color, leading: f.leading ?? 0, letterSpacing: f.letterSpacing ?? 0,
        kerning: f.kerning === true, ...r,
    };
}

/** Whether two formats lay text out the same (and draw it in the same colour). */
export function sameRun(a: TextFormat, b: TextFormat): boolean {
    return a === b || (a.font === b.font && a.size === b.size && a.bold === b.bold && a.italic === b.italic && a.underline === b.underline
        && a.color === b.color && a.kerning === b.kerning && a.letterSpacing === b.letterSpacing);
}

export function charWidth(ch: string, f: TextFormat): number {
    const font = cssFont(f);
    const key = `${font}|${ch}`;
    let w = widths.get(key);
    if (w === undefined) {
        const c = measureContext();
        c.font = font;
        // whole pixels, as Flash fitted text to the pixel grid
        w = Math.round(ch === '\t' ? c.measureText('    ').width : c.measureText(ch).width);
        widths.set(key, w);
    }
    return w + (f.letterSpacing ?? 0);
}

export function fontMetrics(f: TextFormat, r: TextRendering): { ascent: number; descent: number; baseline: number } {
    const native = NativeText.metrics(nativeFormat(f, r));
    if (native) return native;
    const font = cssFont(f);
    let m = metrics.get(font);
    if (!m) {
        const c = measureContext();
        c.font = font;
        const t = c.measureText('Mg');
        // whole pixels, so every baseline falls on the pixel grid
        m = { ascent: Math.round(t.fontBoundingBoxAscent), descent: Math.round(t.fontBoundingBoxDescent) };
        metrics.set(font, m);
    }
    return { ...m, baseline: m.ascent };
}

/**
 * The x of each character of display[start, end) and of the end, from `start`: runs of one format
 * the native engine supports take its pen positions, other characters their measured widths.
 */
function positions(display: string, start: number, end: number, fmt: (i: number) => TextFormat, r: TextRendering): number[] {
    const pos = [0];
    let x = 0;
    for (let i = start; i < end;) {
        const f = fmt(i);
        let j = i + 1;
        while (j < end && display[j] !== '\t' && display[i] !== '\t' && sameRun(fmt(j), f)) j++;
        const text = display.slice(i, j);
        const native = NativeText.placements(text, nativeFormat(f, r));
        if (native) {
            for (let k = 1; k <= text.length; k++) pos.push(x + native[k]);
            x += native[text.length];
        } else {
            for (const ch of text) { x += charWidth(ch, f); pos.push(x); }
        }
        i = j;
    }
    return pos;
}

/**
 * Lay out `text` (paragraphs separated by '\r') in a field `fieldWidth` wide. `display` is what is
 * drawn for each character (the text itself, or asterisks for a password field).
 */
export function layoutText(display: string, formats: TextFormat[], fallback: TextFormat, fieldWidth: number, wordWrap: boolean, rendering: TextRendering): Layout {
    const lines: Line[] = [];
    const fmt = (i: number) => formats[i] ?? formats[formats.length - 1] ?? fallback;
    let y = GUTTER;
    let paraStart = 0;
    while (paraStart <= display.length) {
        let paraEnd = display.indexOf('\r', paraStart);
        if (paraEnd < 0) paraEnd = display.length;
        const pf = fmt(paraStart);
        const left = (pf.leftMargin ?? 0) + (pf.blockIndent ?? 0);
        const right = pf.rightMargin ?? 0;
        const indent = pf.indent ?? 0;
        const avail = fieldWidth - 2 * GUTTER - left - right;
        let lineStart = paraStart;
        let first = true;
        do {
            const lineIndent = first ? indent : 0;
            const max = avail - lineIndent;
            // each line is laid out from its own start, as it is drawn
            const pos = positions(display, lineStart, paraEnd, fmt, rendering);
            const at = (i: number) => pos[i - lineStart];
            let breakAt = -1;
            let k = lineStart;
            for (; k < paraEnd; k++) {
                const x = at(k), w = at(k + 1) - at(k);
                if (wordWrap && x + w > max && k > lineStart && display[k] !== ' ') {
                    if (breakAt > lineStart) k = breakAt;
                    break;
                }
                if (display[k] === ' ' || display[k] === '-') breakAt = k + 1;
            }
            const end = k;
            // positions, and the visible width without trailing spaces
            const advances = pos.slice(0, end - lineStart + 1);
            let visible = end;
            while (visible > lineStart && display[visible - 1] === ' ') visible--;
            const width = advances[visible - lineStart];
            let ascent = 0, descent = 0, baseline = 0;
            for (let c = lineStart; c < Math.max(end, lineStart + 1) && c <= display.length; c++) {
                const m = fontMetrics(fmt(Math.min(c, display.length - 1 < 0 ? 0 : c)), rendering);
                ascent = Math.max(ascent, m.ascent);
                descent = Math.max(descent, m.descent);
                baseline = Math.max(baseline, m.baseline);
            }
            if (end === lineStart) {
                const m = fontMetrics(pf, rendering);
                ({ ascent, descent, baseline } = m);
            }
            const leading = pf.leading ?? 0;
            const align = pf.align ?? 'left';
            const slack = max - width;
            const offset = align === 'center' ? Math.max(0, Math.floor(slack / 2)) : align === 'right' ? Math.max(0, slack) : 0;
            lines.push({
                start: lineStart, end, x: GUTTER + left + lineIndent + offset, margin: left + lineIndent, y, width, ascent, descent, baseline, leading,
                height: ascent + descent + leading, advances, paragraphStart: first,
            });
            y += ascent + descent + leading;
            lineStart = end;
            first = false;
        } while (lineStart < paraEnd);
        paraStart = paraEnd + 1;
        if (paraEnd === display.length) break;
    }
    let textWidth = 0;
    for (const l of lines) textWidth = Math.max(textWidth, l.margin + l.width);
    const last = lines[lines.length - 1];
    const textHeight = lines.length ? y - GUTTER - (last?.leading ?? 0) : 0;
    return { lines, textWidth: display.length ? textWidth : 0, textHeight: display.length ? textHeight : 0 };
}
