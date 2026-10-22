import { Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { InteractiveObject } from '@habbo-pixi/runtime/display/InteractiveObject';
import { addBeforeRender, requestRedraw } from '@habbo-pixi/runtime/display/renderHooks';
import type { FocusTarget } from '@habbo-pixi/runtime/display/Stage';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { TextEvent } from '@habbo-pixi/runtime/events/TextEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Font } from './Font';
import { parseHtml, toHtml } from './htmlText';
import * as NativeText from './air/NativeText';
import { GUTTER, cssFont, layoutText, nativeFormat, sameRun, type Layout, type Line, type TextRendering } from './layout';
import type { StyleSheet } from './StyleSheet';
import { TextFormat } from './TextFormat';
import { TextLineMetrics } from './TextLineMetrics';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

const views = new Set<WeakRef<TextField>>();

/** Before each render: redraw text fields whose content, size or scale changed. */
export function updateTextFields(resolution: number): void {
    for (const ref of views) {
        const tf = ref.deref();
        if (!tf) { views.delete(ref); continue; }
        tf.updateView(resolution);
    }
}

function defaultFormat(): TextFormat {
    const f = new TextFormat('Times New Roman', 12, 0, false, false, false, '', '', 'left', 0, 0, 0, 0);
    f.blockIndent = 0;
    f.bullet = false;
    f.kerning = false;
    f.letterSpacing = 0;
    f.tabStops = [];
    return f;
}

/**
 * Text on the display list: plain or HTML, formatted per character, optionally editable.
 *  - `text` uses '\r' for line breaks ('\n' and '\r\n' are converted);
 *  - the text sits 2 pixels inside the field (the gutter); autoSize resizes the field to
 *    textWidth + 4 × textHeight + 4, keeping its left edge, centre or right edge in place;
 *  - scrollV counts lines from 1; maxScrollV is the first line that can be scrolled to the top;
 *  - with embedFonts, text in fonts not registered with Font.registerFont is not drawn;
 *  - text in the fonts AIR's glyph records cover (air/NativeText) is laid out and rasterised as AIR
 *    did, following antiAliasType, gridFitType, sharpness, thickness and kerning; other text is drawn
 *    by the browser;
 *  - input fields take typing (and IME) through a hidden textarea; restrict and maxChars limit
 *    what the user can type, textInput events can cancel it, and every edit dispatches change.
 */
export class TextField extends InteractiveObject implements FocusTarget {
    #text = '';
    #formats: TextFormat[] = [];
    #default = defaultFormat();
    #width = 100;
    #height = 100;
    #autoSize = 'none';
    #wordWrap = false;
    #multiline = false;
    #type = 'dynamic';
    #border = false;
    #borderColor = 0x000000;
    #background = false;
    #backgroundColor = 0xffffff;
    #styleSheet: StyleSheet | null = null;
    #condenseWhite = false;
    #displayAsPassword = false;
    #scrollV = 1;
    #scrollH = 0;
    #selBegin = 0;
    #selEnd = 0;
    #layout: Layout | null = null;
    #focused = false;
    #input: HTMLTextAreaElement | null = null;
    #caretOn = true;
    #caretTimer: ReturnType<typeof setInterval> | null = null;
    #dragging = false;
    // view
    #sprite = new PixiSprite(Texture.EMPTY);
    #canvas: HTMLCanvasElement | null = null;
    #texture: Texture | null = null;
    #dirty = true;
    /** The scale and size the view was last drawn at. */
    #viewScale = 0;
    #viewWidth = 0;
    #viewHeight = 0;
    /** The world transform's scale part (a, b, c, d) and the resolution when the view was last checked. */
    #viewA = NaN;
    #viewB = NaN;
    #viewC = NaN;
    #viewD = NaN;
    #viewResolution = NaN;

    #antiAliasType = 'normal';
    #gridFitType = 'pixel';
    #sharpness = 0;
    #thickness = 0;

    selectable = true;
    embedFonts = false;
    maxChars = 0;
    restrict: string | null = null;
    mouseWheelEnabled = true;
    alwaysShowSelection = false;
    useRichTextClipboard = false;

    // how the text is rasterised (and, for the native engine's fonts, laid out)
    get antiAliasType(): string { return this.#antiAliasType; }
    set antiAliasType(v: string) { this.#antiAliasType = v; this.#changed(); }
    get gridFitType(): string { return this.#gridFitType; }
    set gridFitType(v: string) { this.#gridFitType = v; this.#changed(); }
    get sharpness(): number { return this.#sharpness; }
    set sharpness(v: number) { this.#sharpness = v; this.#changed(); }
    get thickness(): number { return this.#thickness; }
    set thickness(v: number) { this.#thickness = v; this.#changed(); }

    constructor() {
        super(new Container());
        this.node.addChild(this.#sprite);
        // on whole screen pixels, as Flash drew text fitted to the pixel grid
        this.#sprite.roundPixels = true;
        views.add(new WeakRef(this));
        // the field's own mouse handling (links, selection, wheel scrolling)
        super.addEventListener(MouseEvent.MOUSE_DOWN, e => this.#onMouseDown(e as MouseEvent));
        super.addEventListener(MouseEvent.MOUSE_MOVE, e => this.#onMouseMove(e as MouseEvent));
        super.addEventListener(MouseEvent.MOUSE_UP, () => { this.#dragging = false; });
        super.addEventListener(MouseEvent.CLICK, e => this.#onClick(e as MouseEvent));
        super.addEventListener(MouseEvent.MOUSE_WHEEL, e => this.#onWheel(e as MouseEvent));
    }

    // ---------- content ----------

    get text(): string {
        return this.#text;
    }

    set text(value: string) {
        const t = normalize(value ?? '');
        this.#text = t;
        this.#formats = Array.from(t, () => this.#default);
        this.#changed();
    }

    get htmlText(): string {
        return toHtml(this.#text, this.#formats, this.#default);
    }

    set htmlText(value: string) {
        const parsed = parseHtml(value ?? '', this.#default, this.#styleSheet, this.#condenseWhite);
        this.#text = parsed.text;
        this.#formats = parsed.formats;
        this.#changed();
    }

    get length(): number {
        return this.#text.length;
    }

    appendText(newText: string): void {
        this.replaceText(this.#text.length, this.#text.length, newText);
    }

    /** Replace [beginIndex, endIndex) with `newText`, formatted like the character at beginIndex. */
    replaceText(beginIndex: number, endIndex: number, newText: string): void {
        const t = normalize(newText ?? '');
        const b = clamp(beginIndex, 0, this.#text.length), e = clamp(endIndex, b, this.#text.length);
        const f = this.#formats[b] ?? this.#formats[b - 1] ?? this.#default;
        this.#text = this.#text.slice(0, b) + t + this.#text.slice(e);
        this.#formats.splice(b, e - b, ...Array.from(t, () => f));
        this.#changed();
    }

    replaceSelectedText(value: string): void {
        const b = Math.min(this.#selBegin, this.#selEnd), e = Math.max(this.#selBegin, this.#selEnd);
        this.replaceText(b, e, value);
        this.setSelection(b + normalize(value ?? '').length, b + normalize(value ?? '').length);
    }

    // ---------- formatting ----------

    get defaultTextFormat(): TextFormat {
        return this.#default.clone();
    }

    set defaultTextFormat(value: TextFormat) {
        this.#default = this.#default.merged(value);
    }

    /** The format shared by [beginIndex, endIndex): properties that differ within the range are null. */
    getTextFormat(beginIndex: number = -1, endIndex: number = -1): TextFormat {
        if (this.#text.length === 0) return this.#default.clone();
        const b = beginIndex < 0 ? 0 : clamp(beginIndex, 0, this.#text.length - 1);
        const e = endIndex < 0 ? (beginIndex < 0 ? this.#text.length : b + 1) : clamp(endIndex, b + 1, this.#text.length);
        const out = this.#formats[b].clone();
        for (let i = b + 1; i < e; i++) {
            const f = this.#formats[i];
            for (const p of TextFormat.PROPERTIES) if (out[p] !== f[p]) (out as any)[p] = null;
        }
        return out;
    }

    /** Apply `format`'s set properties to [beginIndex, endIndex) (all text by default, one character with only beginIndex). */
    setTextFormat(format: TextFormat, beginIndex: number = -1, endIndex: number = -1): void {
        if (this.#styleSheet) throw new Error('This method cannot be used on a text field with a style sheet.');
        const b = beginIndex < 0 ? 0 : clamp(beginIndex, 0, this.#text.length);
        const e = endIndex < 0 ? (beginIndex < 0 ? this.#text.length : b + 1) : clamp(endIndex, b, this.#text.length);
        const cache = new Map<TextFormat, TextFormat>();
        for (let i = b; i < e; i++) {
            const old = this.#formats[i];
            let next = cache.get(old);
            if (!next) cache.set(old, next = old.merged(format));
            this.#formats[i] = next;
        }
        this.#changed();
    }

    get textColor(): number {
        return (this.#formats[0] ?? this.#default).color ?? 0;
    }

    /** Colour of all the text (and of text added later). */
    set textColor(value: number) {
        const f = new TextFormat();
        f.color = value >>> 0;
        this.#default = this.#default.merged(f);
        this.#formats = this.#formats.map(x => x.merged(f));
        this.#changed();
    }

    get styleSheet(): StyleSheet | null {
        return this.#styleSheet;
    }

    set styleSheet(value: StyleSheet | null) {
        this.#styleSheet = value;
        this.#changed();
    }

    get condenseWhite(): boolean {
        return this.#condenseWhite;
    }

    set condenseWhite(value: boolean) {
        this.#condenseWhite = value;
    }

    // ---------- appearance and size ----------

    get autoSize(): string {
        return this.#autoSize;
    }

    set autoSize(value: string) {
        this.#autoSize = value === true as unknown ? 'left' : value === false as unknown ? 'none' : value;
        this.#changed();
    }

    get wordWrap(): boolean {
        return this.#wordWrap;
    }

    set wordWrap(value: boolean) {
        this.#wordWrap = value;
        this.#changed();
    }

    get multiline(): boolean {
        return this.#multiline;
    }

    set multiline(value: boolean) {
        this.#multiline = value;
    }

    /** 'dynamic' (display only) or 'input' (editable). */
    get type(): string {
        return this.#type;
    }

    set type(value: string) {
        this.#type = value;
        this.#dirty = true;
    }

    get acceptsTextInput(): boolean {
        return this.#type === 'input';
    }

    get displayAsPassword(): boolean {
        return this.#displayAsPassword;
    }

    set displayAsPassword(value: boolean) {
        this.#displayAsPassword = value;
        this.#changed();
    }

    get border(): boolean { return this.#border; }
    set border(value: boolean) { this.#border = value; this.#dirty = true; }
    get borderColor(): number { return this.#borderColor; }
    set borderColor(value: number) { this.#borderColor = value >>> 0; this.#dirty = true; }
    get background(): boolean { return this.#background; }
    set background(value: boolean) { this.#background = value; this.#dirty = true; }
    get backgroundColor(): number { return this.#backgroundColor; }
    set backgroundColor(value: number) { this.#backgroundColor = value >>> 0; this.#dirty = true; }

    /** The field's width (its own size, independent of scale). */
    override get width(): number {
        this.#ensureLayout();
        return this.#width * Math.abs(this.scaleX);
    }

    override set width(value: number) {
        this.#width = Math.max(0, value / (Math.abs(this.scaleX) || 1));
        this.#changed();
    }

    override get height(): number {
        this.#ensureLayout();
        return this.#height * Math.abs(this.scaleY);
    }

    override set height(value: number) {
        this.#height = Math.max(0, value / (Math.abs(this.scaleY) || 1));
        this.#changed();
    }

    get textWidth(): number {
        return this.#ensureLayout().textWidth;
    }

    get textHeight(): number {
        return this.#ensureLayout().textHeight;
    }

    // ---------- lines and characters ----------

    get numLines(): number {
        return this.#ensureLayout().lines.length;
    }

    get scrollV(): number {
        this.#ensureLayout();
        return this.#scrollV;
    }

    set scrollV(value: number) {
        this.#ensureLayout();
        const v = clamp(Math.round(value), 1, this.maxScrollV);
        if (v === this.#scrollV) return;
        this.#scrollV = v;
        this.#dirty = true;
        this.dispatchEvent(new Event(Event.SCROLL));
    }

    /** The last line that can be scrolled to the top so that the text's end is in view. */
    get maxScrollV(): number {
        const lines = this.#ensureLayout().lines;
        if (!lines.length) return 1;
        const visible = this.#height - 2 * GUTTER;
        let height = 0, n = lines.length;
        while (n > 0 && height + lines[n - 1].height - lines[n - 1].leading <= visible) height += lines[--n].height;
        return Math.max(1, n + 1);
    }

    /** The last line (1-based) fully in view. */
    get bottomScrollV(): number {
        const lines = this.#ensureLayout().lines;
        const top = lines[this.#scrollV - 1]?.y ?? GUTTER;
        let last = this.#scrollV;
        for (let i = this.#scrollV - 1; i < lines.length; i++) {
            if (lines[i].y - top + lines[i].height - lines[i].leading <= this.#height - 2 * GUTTER) last = i + 1;
            else break;
        }
        return last;
    }

    get scrollH(): number {
        return this.#scrollH;
    }

    set scrollH(value: number) {
        const v = clamp(Math.round(value), 0, this.maxScrollH);
        if (v === this.#scrollH) return;
        this.#scrollH = v;
        this.#dirty = true;
        this.dispatchEvent(new Event(Event.SCROLL));
    }

    get maxScrollH(): number {
        if (this.#wordWrap) return 0;
        return Math.max(0, Math.ceil(this.#ensureLayout().textWidth - (this.#width - 2 * GUTTER)));
    }

    /** Scroll so the caret (the moving end of the selection) is in view, as the player does while the user types. */
    #revealCaret(): void {
        const lines = this.#ensureLayout().lines;
        if (!lines.length) return;
        const caret = this.#selEnd;
        let li = 0;
        while (li + 1 < lines.length && lines[li + 1].start <= caret) li++;
        const l = lines[li];
        const x = l.x + l.advances[clamp(caret - l.start, 0, l.advances.length - 1)];
        if (x - this.#scrollH > this.#width - GUTTER) this.scrollH = Math.ceil(x - (this.#width - GUTTER));
        else if (x - this.#scrollH < GUTTER) this.scrollH = Math.floor(x - GUTTER);
        if (li + 1 < this.#scrollV) this.scrollV = li + 1;
        else if (li + 1 > this.bottomScrollV) this.scrollV = this.#scrollV + (li + 1 - this.bottomScrollV);
    }

    getLineMetrics(lineIndex: number): TextLineMetrics {
        const l = this.#line(lineIndex);
        return new TextLineMetrics(l.x, l.width, l.height, l.ascent, l.descent, l.leading);
    }

    /** Index of the first character of the line. */
    getLineOffset(lineIndex: number): number {
        return this.#line(lineIndex).start;
    }

    /** Characters on the line, including its line break. */
    getLineLength(lineIndex: number): number {
        const l = this.#line(lineIndex);
        return l.end - l.start + (this.#text[l.end] === '\r' ? 1 : 0);
    }

    getLineText(lineIndex: number): string {
        const l = this.#line(lineIndex);
        return this.#text.slice(l.start, l.end + (this.#text[l.end] === '\r' ? 1 : 0));
    }

    getLineIndexOfChar(charIndex: number): number {
        if (charIndex < 0 || charIndex > this.#text.length) return -1;
        const lines = this.#ensureLayout().lines;
        for (let i = 0; i < lines.length; i++) if (charIndex < lines[i].end || (charIndex === lines[i].end && this.#text[charIndex] === '\r')) return i;
        return lines.length - 1;
    }

    /** The line under the point (field coordinates), or -1. */
    getLineIndexAtPoint(x: number, y: number): number {
        void x;
        const lines = this.#ensureLayout().lines;
        const top = lines[this.#scrollV - 1]?.y ?? GUTTER;
        for (let i = this.#scrollV - 1; i < lines.length; i++) {
            const ly = lines[i].y - top + GUTTER;
            if (y >= ly && y < ly + lines[i].height) return i;
        }
        return -1;
    }

    /** The character under the point (field coordinates), or -1. */
    getCharIndexAtPoint(x: number, y: number): number {
        const li = this.getLineIndexAtPoint(x, y);
        if (li < 0) return -1;
        const l = this.#ensureLayout().lines[li];
        const lx = x + this.#scrollH - l.x;
        for (let i = 0; i < l.end - l.start; i++) if (lx >= l.advances[i] && lx < l.advances[i + 1]) return l.start + i;
        return -1;
    }

    /** The box of a character (field coordinates, as scrolled), or null for line breaks and invalid indexes. */
    getCharBoundaries(charIndex: number): Rectangle | null {
        if (charIndex < 0 || charIndex >= this.#text.length || this.#text[charIndex] === '\r') return null;
        const lines = this.#ensureLayout().lines;
        const li = this.getLineIndexOfChar(charIndex);
        const l = lines[li];
        if (!l || charIndex >= l.end) return null;
        const top = lines[this.#scrollV - 1]?.y ?? GUTTER;
        const i = charIndex - l.start;
        return new Rectangle(l.x + l.advances[i] - this.#scrollH, l.y - top + GUTTER, l.advances[i + 1] - l.advances[i], l.height - l.leading);
    }

    getFirstCharInParagraph(charIndex: number): number {
        if (charIndex < 0 || charIndex > this.#text.length) return -1;
        return this.#text.lastIndexOf('\r', charIndex - 1) + 1;
    }

    /** Length of the paragraph containing the character, including its line break. */
    getParagraphLength(charIndex: number): number {
        const start = this.getFirstCharInParagraph(charIndex);
        if (start < 0) return -1;
        const end = this.#text.indexOf('\r', start);
        return (end < 0 ? this.#text.length : end + 1) - start;
    }

    /** Images embedded with <img id=…> in HTML text; this text engine lays out text only. */
    getImageReference(id: string): null {
        void id;
        return null;
    }

    // ---------- selection ----------

    get caretIndex(): number {
        return this.#selEnd;
    }

    get selectionBeginIndex(): number {
        return Math.min(this.#selBegin, this.#selEnd);
    }

    get selectionEndIndex(): number {
        return Math.max(this.#selBegin, this.#selEnd);
    }

    setSelection(beginIndex: number, endIndex: number): void {
        this.#selBegin = clamp(beginIndex, 0, this.#text.length);
        this.#selEnd = clamp(endIndex, 0, this.#text.length);
        if (this.#input) this.#input.setSelectionRange(this.selectionBeginIndex, this.selectionEndIndex);
        this.#dirty = true;
    }

    // ---------- focus (from the stage) ----------

    focusIn(): void {
        this.#focused = true;
        this.#dirty = true;
        if (this.#type !== 'input') return;
        this.#openInput();
        this.#caretOn = true;
        this.#caretTimer = setInterval(() => { this.#caretOn = !this.#caretOn; this.#dirty = true; }, 500);
    }

    focusOut(): void {
        this.#focused = false;
        this.#dirty = true;
        if (this.#caretTimer) clearInterval(this.#caretTimer);
        this.#caretTimer = null;
        this.#closeInput();
    }

    // ---------- display object content ----------

    protected override localBounds(): Rectangle {
        this.#ensureLayout();
        return new Rectangle(0, 0, this.#width, this.#height);
    }

    protected override renderContent(ctx: Ctx): void {
        this.#draw(ctx);
    }

    // ---------- internals ----------

    #changed(): void {
        this.#layout = null;
        this.#dirty = true;
        // text set by code while the user is typing: what they type next goes into the new text
        const ta = this.#input;
        const value = this.#text.replace(/\r/g, '\n');
        if (ta && ta.value !== value) {
            this.#selBegin = clamp(this.#selBegin, 0, this.#text.length);
            this.#selEnd = clamp(this.#selEnd, 0, this.#text.length);
            ta.value = value;
            ta.setSelectionRange(this.selectionBeginIndex, this.selectionEndIndex);
        }
    }

    #display(): string {
        return this.#displayAsPassword ? this.#text.replace(/[^\r]/g, '*') : this.#text;
    }

    #rendering(): TextRendering {
        const quality = String(this.stage?.quality ?? 'high').toLowerCase() === 'low' ? 'low' : 'high';
        return { antiAliasType: this.#antiAliasType, gridFitType: this.#gridFitType, sharpness: this.#sharpness, thickness: this.#thickness, stageQuality: quality };
    }

    #ensureLayout(): Layout {
        if (this.#layout) return this.#layout;
        const rendering = this.#rendering();
        let layout = layoutText(this.#display(), this.#formats, this.#default, this.#width, this.#wordWrap, rendering);
        if (this.#autoSize !== 'none') {
            if (!this.#wordWrap) {
                const w = Math.ceil(layout.textWidth) + 2 * GUTTER;
                const dx = this.#autoSize === 'center' ? (this.#width - w) / 2 : this.#autoSize === 'right' ? this.#width - w : 0;
                if (dx !== 0) this.x = this.x + dx;
                this.#width = w;
                layout = layoutText(this.#display(), this.#formats, this.#default, this.#width, false, rendering);
            }
            // an empty field still sizes to one line of its default format (textHeight itself stays 0)
            const first = layout.lines[0];
            const h = this.#display().length || !first ? layout.textHeight : first.ascent + first.descent;
            this.#height = Math.ceil(h) + 2 * GUTTER;
        }
        this.#layout = layout;
        this.#scrollV = clamp(this.#scrollV, 1, this.maxScrollV);
        this.#scrollH = clamp(this.#scrollH, 0, this.maxScrollH);
        return layout;
    }

    #line(i: number): Line {
        const l = this.#ensureLayout().lines[i];
        if (!l) throw new RangeError('The supplied index is out of bounds.');
        return l;
    }

    /** Draw background, border, text, selection and caret in field coordinates. */
    #draw(ctx: Ctx): void {
        const layout = this.#ensureLayout();
        const w = this.#width, h = this.#height;
        if (this.#background) { ctx.fillStyle = hex(this.#backgroundColor); ctx.fillRect(0, 0, w, h); }
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.clip();
        const top = layout.lines[this.#scrollV - 1]?.y ?? GUTTER;
        const selB = this.selectionBeginIndex, selE = this.selectionEndIndex;
        const showSel = selE > selB && (this.#focused || this.alwaysShowSelection);
        const shown = this.#display();
        const rendering = this.#rendering();
        const fmt = (i: number) => this.#formats[i] ?? this.#default;
        for (let li = this.#scrollV - 1; li < layout.lines.length; li++) {
            const l = layout.lines[li];
            const y = l.y - top + GUTTER;
            if (y > h) break;
            const baseline = y + l.baseline;
            // runs of one format and one selection state, drawn by the native engine where it can
            for (let i = l.start; i < l.end;) {
                const f = fmt(i);
                const selected = showSel && i >= selB && i < selE;
                let j = i + 1;
                while (j < l.end && shown[j] !== '\t' && shown[i] !== '\t' && sameRun(fmt(j), f) && (showSel && j >= selB && j < selE) === selected) j++;
                const x = l.x + l.advances[i - l.start] - this.#scrollH;
                const runWidth = l.advances[j - l.start] - l.advances[i - l.start];
                if (selected) { ctx.fillStyle = '#000000'; ctx.fillRect(x, y, runWidth, l.height - l.leading); }
                if (!(this.embedFonts && !Font.isRegistered(f.font ?? ''))) {
                    const color = selected ? 0xffffff : f.color ?? 0;
                    const native = nativeFormat(f, rendering, color);
                    if (!NativeText.draw(ctx as CanvasRenderingContext2D, shown.slice(i, j), x, baseline, native)) {
                        ctx.font = cssFont(f);
                        ctx.fillStyle = hex(color);
                        ctx.textBaseline = 'alphabetic';
                        for (let c = i; c < j; c++) ctx.fillText(shown[c], l.x + l.advances[c - l.start] - this.#scrollH, baseline);
                        if (f.underline) ctx.fillRect(x, baseline + 1, runWidth, Math.max(1, (f.size ?? 12) / 16));
                    } else if (f.underline && native.antiAliasType !== 'advanced') {
                        // the engine underlines ADVANCED text itself
                        ctx.fillStyle = hex(color);
                        ctx.fillRect(Math.round(x), Math.round(baseline) + 1, Math.round(runWidth), 1);
                    }
                }
                i = j;
            }
        }
        if (this.#focused && this.#type === 'input' && this.#caretOn && selB === selE) {
            const li = Math.max(0, this.getLineIndexOfChar(selE));
            const l = layout.lines[li];
            if (l) {
                const x = l.x + l.advances[Math.min(selE - l.start, l.advances.length - 1)] - this.#scrollH;
                ctx.fillStyle = hex((this.#formats[Math.max(0, selE - 1)] ?? this.#default).color ?? 0);
                ctx.fillRect(Math.round(x), l.y - top + GUTTER, 1, l.ascent + l.descent);
            }
        }
        ctx.restore();
        if (this.#border) {
            ctx.strokeStyle = hex(this.#borderColor);
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
        }
    }

    /** Re-rasterise the field for the screen when it changed or its on-screen scale did. */
    updateView(resolution: number): void {
        if (!this.visible) return;
        const wt = this.node.worldTransform;
        // nothing changed since the last check (every field, every frame): told by comparing numbers
        if (!this.#dirty && wt.a === this.#viewA && wt.b === this.#viewB && wt.c === this.#viewC && wt.d === this.#viewD
            && resolution === this.#viewResolution && this.#width === this.#viewWidth && this.#height === this.#viewHeight) return;
        this.#viewA = wt.a;
        this.#viewB = wt.b;
        this.#viewC = wt.c;
        this.#viewD = wt.d;
        this.#viewResolution = resolution;
        const scale = Math.round(Math.max(Math.hypot(wt.a, wt.b), Math.hypot(wt.c, wt.d)) * resolution * 100) / 100 || 1;
        // unchanged (the layout too: it is only ever dropped along with marking the field dirty) is the common case,
        // every field every frame: told before walking up to the stage
        if (!this.#dirty && scale === this.#viewScale && this.#width === this.#viewWidth && this.#height === this.#viewHeight) return;
        if (!this.stage) return;
        this.#ensureLayout();
        if (!this.#dirty && scale === this.#viewScale && this.#width === this.#viewWidth && this.#height === this.#viewHeight) return;
        this.#dirty = false;
        this.#viewScale = scale;
        this.#viewWidth = this.#width;
        this.#viewHeight = this.#height;
        const cw = Math.max(1, Math.min(8192, Math.ceil(this.#width * scale)));
        const ch = Math.max(1, Math.min(8192, Math.ceil(this.#height * scale)));
        if (!this.#canvas || this.#canvas.width !== cw || this.#canvas.height !== ch) {
            this.#texture?.destroy(false);
            this.#canvas = document.createElement('canvas');
            this.#canvas.width = cw;
            this.#canvas.height = ch;
            this.#texture = Texture.from(this.#canvas);
            // drawn at screen resolution, so one texel is one screen pixel: sampled as it is (a
            // rotated or skewed field is smoothed)
            this.#texture.source.scaleMode = wt.b === 0 && wt.c === 0 ? 'nearest' : 'linear';
            this.#sprite.texture = this.#texture;
        }
        const ctx = this.#canvas.getContext('2d')!;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cw, ch);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        this.#draw(ctx);
        this.#texture!.source.update();
        this.#sprite.scale.set(1 / scale);
        this.#positionInput();
    }

    // ---------- mouse ----------

    #localPoint(e: MouseEvent): Point {
        return new Point(e.localX, e.localY);
    }

    #onMouseDown(e: MouseEvent): void {
        if (!this.selectable && this.#type !== 'input') return;
        const p = this.#localPoint(e);
        const i = this.#nearestIndex(p.x, p.y);
        this.setSelection(i, i);
        this.#dragging = true;
    }

    #onMouseMove(e: MouseEvent): void {
        if (!this.#dragging || !e.buttonDown) return;
        const p = this.#localPoint(e);
        this.setSelection(this.#selBegin, this.#nearestIndex(p.x, p.y));
    }

    #onClick(e: MouseEvent): void {
        const p = this.#localPoint(e);
        const i = this.getCharIndexAtPoint(p.x, p.y);
        const url = i >= 0 ? this.#formats[i]?.url : null;
        if (!url) return;
        if (url.startsWith('event:')) this.dispatchEvent(new TextEvent(TextEvent.LINK, true, false, url.slice(6)));
        else navigateToURL(new URLRequest(url), this.#formats[i].target || '_blank');
    }

    #onWheel(e: MouseEvent): void {
        if (!this.mouseWheelEnabled) return;
        this.scrollV = this.scrollV - e.delta;
    }

    /** Caret position nearest to a point (for clicks between characters). */
    #nearestIndex(x: number, y: number): number {
        const layout = this.#ensureLayout();
        let li = this.getLineIndexAtPoint(x, y);
        if (li < 0) li = y < GUTTER ? this.#scrollV - 1 : layout.lines.length - 1;
        const l = layout.lines[li];
        if (!l) return 0;
        const lx = x + this.#scrollH - l.x;
        for (let i = 0; i < l.end - l.start; i++) {
            if (lx < (l.advances[i] + l.advances[i + 1]) / 2) return l.start + i;
        }
        return l.end;
    }

    // ---------- text input ----------

    #openInput(): void {
        if (this.#input) return;
        const ta = document.createElement('textarea');
        ta.setAttribute('autocomplete', 'off');
        ta.setAttribute('autocorrect', 'off');
        ta.setAttribute('spellcheck', 'false');
        Object.assign(ta.style, { position: 'fixed', opacity: '0', pointerEvents: 'none', resize: 'none', padding: '0', border: '0', overflow: 'hidden' });
        ta.value = this.#text.replace(/\r/g, '\n');
        document.body.appendChild(ta);
        ta.addEventListener('beforeinput', ev => this.#beforeInput(ev));
        ta.addEventListener('input', () => this.#afterInput());
        ta.addEventListener('select', () => this.#syncSelection());
        ta.addEventListener('keyup', () => this.#syncSelection());
        document.addEventListener('selectionchange', this.#syncSelection);
        this.#input = ta;
        this.#positionInput();
        ta.focus({ preventScroll: true });
        ta.setSelectionRange(this.selectionBeginIndex, this.selectionEndIndex);
    }

    #closeInput(): void {
        const ta = this.#input;
        if (!ta) return;
        this.#input = null;
        document.removeEventListener('selectionchange', this.#syncSelection);
        ta.remove();
    }

    #positionInput(): void {
        const ta = this.#input;
        if (!ta || !this.stage) return;
        const p = this.localToGlobal(new Point(0, 0));
        const f = this.#formats[0] ?? this.#default;
        Object.assign(ta.style, { left: `${p.x}px`, top: `${p.y}px`, width: `${this.#width}px`, height: `${this.#height}px`, font: cssFont(f) });
    }

    readonly #syncSelection = (): void => {
        const ta = this.#input;
        if (!ta || document.activeElement !== ta) return;
        const forward = ta.selectionDirection !== 'backward';
        this.#selBegin = forward ? ta.selectionStart : ta.selectionEnd;
        this.#selEnd = forward ? ta.selectionEnd : ta.selectionStart;
        this.#caretOn = true;
        this.#dirty = true;
        this.#revealCaret();
        // what the user types shows at once, as the player redraws after text entry
        requestRedraw();
    };

    /** Filter what the user types (restrict, maxChars, single line) and let textInput listeners cancel it. */
    #beforeInput(ev: InputEvent): void {
        const breaking = ev.inputType === 'insertLineBreak' || ev.inputType === 'insertParagraph';
        if (breaking && !this.#multiline) { ev.preventDefault(); return; }
        const data = breaking ? '\n' : ev.data ?? (ev.dataTransfer?.getData('text/plain') ?? null);
        if (!ev.inputType.startsWith('insert') || data == null) return;
        let allowed = [...data.replace(/\r\n?/g, '\n')].filter(c => c === '\n' || allowedChar(c, this.restrict)).join('');
        if (!this.#multiline) allowed = allowed.replace(/\n/g, '');
        const replacing = this.selectionEndIndex - this.selectionBeginIndex;
        if (this.maxChars > 0) allowed = allowed.slice(0, Math.max(0, this.maxChars - (this.#text.length - replacing)));
        const event = new TextEvent(TextEvent.TEXT_INPUT, true, true, allowed);
        if (!this.dispatchEvent(event) || allowed.length === 0) { ev.preventDefault(); return; }
        if (allowed !== data) {
            // insert the filtered text ourselves
            ev.preventDefault();
            this.replaceSelectedText(allowed);
            this.#input!.value = this.#text.replace(/\r/g, '\n');
            this.#input!.setSelectionRange(this.#selEnd, this.#selEnd);
            this.dispatchEvent(new Event(Event.CHANGE, true));
        }
    }

    /** The textarea changed: carry the edit into the field, keeping the formats of untouched text. */
    #afterInput(): void {
        const ta = this.#input;
        if (!ta) return;
        const next = ta.value.replace(/\n/g, '\r');
        const prev = this.#text;
        if (next === prev) return;
        let s = 0;
        while (s < prev.length && s < next.length && prev[s] === next[s]) s++;
        let e = 0;
        while (e < prev.length - s && e < next.length - s && prev[prev.length - 1 - e] === next[next.length - 1 - e]) e++;
        const f = this.#formats[s - 1] ?? this.#formats[s] ?? this.#default;
        this.#text = next;
        this.#formats.splice(s, prev.length - s - e, ...Array.from(next.slice(s, next.length - e), () => f));
        this.#changed();
        this.#syncSelection();
        this.dispatchEvent(new Event(Event.CHANGE, true));
    }

}

addBeforeRender(updateTextFields);

function normalize(t: string): string {
    return String(t).replace(/\r\n|\n/g, '\r');
}

function clamp(v: number, lo: number, hi: number): number {
    return Math.max(lo, Math.min(hi, v));
}

function hex(c: number): string {
    return '#' + (c & 0xffffff).toString(16).padStart(6, '0');
}

/** restrict: characters and ranges ("a-z0-9"), '^' switching to exclusion, '\' escaping. */
function allowedChar(c: string, restrict: string | null): boolean {
    if (restrict == null) return true;
    if (restrict === '') return false;
    let allowed = false, include = true, touched = false;
    const code = c.charCodeAt(0);
    for (let i = 0; i < restrict.length; i++) {
        let ch = restrict[i];
        if (ch === '^') { include = !include; if (!touched) allowed = true; continue; }
        if (ch === '\\' && i + 1 < restrict.length) ch = restrict[++i];
        let lo = ch.charCodeAt(0), hi = lo;
        if (restrict[i + 1] === '-' && i + 2 < restrict.length) {
            let end = restrict[i + 2];
            i += 2;
            if (end === '\\' && i + 1 < restrict.length) end = restrict[++i];
            hi = end.charCodeAt(0);
        }
        touched = true;
        if (code >= lo && code <= hi) allowed = include;
    }
    return allowed;
}
