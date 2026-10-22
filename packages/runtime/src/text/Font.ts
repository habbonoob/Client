/**
 * A font. Embedded fonts (the client's own, loaded as font faces at startup) become available to
 * text fields with embedFonts once registered with registerFont(); device fonts are the system's.
 */
export class Font {
    static readonly #registered: Font[] = [];

    readonly fontName: string;
    readonly fontStyle: string;
    readonly fontType: string;

    constructor(fontName: string = null, fontStyle: string = 'regular', fontType: string = 'device') {
        this.fontName = fontName;
        this.fontStyle = fontStyle;
        this.fontType = fontType;
    }

    /** Make an embedded font class available to text fields that use embedded fonts. */
    static registerFont(font: new () => Font): void {
        const f = new font();
        if (!Font.#registered.some(r => r.fontName === f.fontName && r.fontStyle === f.fontStyle)) Font.#registered.push(f);
    }

    /** The registered embedded fonts (device fonts can't be enumerated in a browser). */
    static enumerateFonts(enumerateDeviceFonts: boolean = false): Font[] {
        void enumerateDeviceFonts;
        return [...Font.#registered];
    }

    /** Is an embedded font registered under this name (any style)? */
    static isRegistered(fontName: string): boolean {
        return Font.#registered.some(f => f.fontName === fontName);
    }

    /** Does the font have glyphs for every character of `str`? */
    hasGlyphs(str: string): boolean {
        return document.fonts.check(`12px "${this.fontName}"`, str);
    }
}
