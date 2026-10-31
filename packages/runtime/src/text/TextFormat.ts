/**
 * Character and paragraph formatting. A null property means "not specified": when applied, it
 * leaves that property of the text as it was; when read back from a range, it means the range mixes
 * values.
 */
export class TextFormat {
    font: string | null;
    #size: number | null = null;
    color: number | null;
    bold: boolean | null;
    italic: boolean | null;
    underline: boolean | null;
    url: string | null;
    target: string | null;
    align: string | null;
    leftMargin: number | null;
    rightMargin: number | null;
    indent: number | null;
    leading: number | null;
    blockIndent: number | null = null;
    bullet: boolean | null = null;
    kerning: boolean | null = null;
    letterSpacing: number | null = null;
    display: string = 'block';
    tabStops: number[] | null = null;

    constructor(font: string = null, size: number = null, color: number = null, bold: boolean = null, italic: boolean = null,
        underline: boolean = null, url: string = null, target: string = null, align: string = null, leftMargin: number = null,
        rightMargin: number = null, indent: number = null, leading: number = null) {
        this.font = font;
        this.size = size;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.url = url;
        this.target = target;
        this.align = align;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.indent = indent;
        this.leading = leading;
    }

    /** The size in pixels: Flash keeps whole sizes only, rounding a fraction to the nearest, a half to the even one (a
     * chat font of 9 at the 1.15 chat size is drawn at 10, not 10.35). */
    get size(): number | null {
        return this.#size;
    }

    set size(value: number | null) {
        this.#size = value == null ? null : roundToEven(Number(value));
    }

    /** The properties this format specifies (non-null), for copying onto another. */
    static readonly PROPERTIES = ['font', 'size', 'color', 'bold', 'italic', 'underline', 'url', 'target', 'align', 'leftMargin',
        'rightMargin', 'indent', 'leading', 'blockIndent', 'bullet', 'kerning', 'letterSpacing', 'tabStops'] as const;

    /** A copy of this format with `other`'s specified properties laid over it. */
    merged(other: TextFormat | null): TextFormat {
        const out = this.clone();
        if (other) for (const p of TextFormat.PROPERTIES) if (other[p] != null) (out as any)[p] = other[p];
        return out;
    }

    clone(): TextFormat {
        const f = new TextFormat();
        for (const p of TextFormat.PROPERTIES) (f as any)[p] = this[p];
        f.display = this.display;
        return f;
    }
}

/** The nearest whole number, a half going to the even one (ECMAScript's ToNumber then IEEE round-half-even). */
function roundToEven(v: number): number {
    if (!Number.isFinite(v)) return v;
    const r = Math.round(v);
    return r - v === 0.5 && r % 2 !== 0 ? r - 1 : r;
}
