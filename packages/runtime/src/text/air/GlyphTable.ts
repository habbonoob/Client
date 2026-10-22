import { type Imp1Glyph, parseImp1 } from './raster';

/**
 * A font's IMP1 glyphs, by code point, each decoded the first time it is drawn. A bundle has hundreds of glyphs,
 * base64-encoded; decoding all of every font's at start-up took a sixth of a second, for glyphs most texts never use.
 */
export class GlyphTable {
    readonly #encoded = new Map<number, string>();
    readonly #decoded = new Map<number, Imp1Glyph>();

    constructor(glyphs: readonly { codepoint: number; imp1Base64: string }[]) {
        for (const g of glyphs) this.#encoded.set(g.codepoint, g.imp1Base64);
    }

    has(code: number): boolean {
        return this.#encoded.has(code);
    }

    get(code: number): Imp1Glyph | undefined {
        let glyph = this.#decoded.get(code);
        if (glyph) return glyph;
        const base64 = this.#encoded.get(code);
        if (base64 == null) return undefined;
        const text = atob(base64);
        const bytes = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i);
        glyph = parseImp1(bytes);
        if (glyph.userId !== code) throw new Error(`IMP1 user id does not match U+${code.toString(16)}`);
        this.#decoded.set(code, glyph);
        return glyph;
    }

    keys(): IterableIterator<number> {
        return this.#encoded.keys();
    }
}
