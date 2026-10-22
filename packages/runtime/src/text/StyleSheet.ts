import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { TextFormat } from './TextFormat';

/**
 * CSS styles for HTML text in text fields: selectors are tag names (`p`, `a`, `a:hover`) and class
 * names (`.title`). Property names are stored camel-cased (`font-size` → `fontSize`).
 */
export class StyleSheet extends EventDispatcher {
    #styles = new Map<string, Record<string, string>>();

    get styleNames(): string[] {
        return [...this.#styles.keys()];
    }

    /** Add the styles of a CSS text; later rules extend earlier ones for the same selector. */
    parseCSS(css: string): void {
        const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
        for (const m of text.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
            const decls: Record<string, string> = {};
            for (const d of m[2].split(';')) {
                const i = d.indexOf(':');
                if (i < 0) continue;
                const prop = d.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
                const value = d.slice(i + 1).trim().replace(/^["']|["']$/g, '');
                if (prop) decls[prop] = value;
            }
            for (const sel of m[1].split(',')) {
                const name = sel.trim().toLowerCase();
                if (!name) continue;
                this.#styles.set(name, { ...(this.#styles.get(name) ?? {}), ...decls });
            }
        }
    }

    /** A copy of the style for `styleName`, or null. */
    getStyle(styleName: string): Record<string, string> | null {
        const s = this.#styles.get(styleName.toLowerCase());
        return s ? { ...s } : null;
    }

    setStyle(styleName: string, styleObject: Record<string, any>): void {
        const name = styleName.toLowerCase();
        if (styleObject == null) { this.#styles.delete(name); return; }
        const copy: Record<string, string> = {};
        for (const k of Object.keys(styleObject)) copy[k] = String(styleObject[k]);
        this.#styles.set(name, copy);
    }

    clear(): void {
        this.#styles.clear();
    }

    /** The text format a style describes (unset properties stay null). */
    transform(formatObject: Record<string, any>): TextFormat {
        const f = new TextFormat();
        if (!formatObject) return f;
        const px = (v: string) => parseFloat(String(v));
        const s = formatObject;
        if (s.color != null) f.color = parseColor(String(s.color));
        if (s.fontFamily != null) f.font = String(s.fontFamily).split(',')[0].trim().replace(/^["']|["']$/g, '');
        if (s.fontSize != null) f.size = px(s.fontSize);
        if (s.fontWeight != null) f.bold = String(s.fontWeight) === 'bold';
        if (s.fontStyle != null) f.italic = String(s.fontStyle) === 'italic';
        if (s.textDecoration != null) f.underline = String(s.textDecoration) === 'underline';
        if (s.textAlign != null) f.align = String(s.textAlign);
        if (s.marginLeft != null) f.leftMargin = px(s.marginLeft);
        if (s.marginRight != null) f.rightMargin = px(s.marginRight);
        if (s.textIndent != null) f.indent = px(s.textIndent);
        if (s.leading != null) f.leading = px(s.leading);
        if (s.letterSpacing != null) f.letterSpacing = px(s.letterSpacing);
        if (s.kerning != null) f.kerning = String(s.kerning) === 'true';
        if (s.display != null) f.display = String(s.display);
        return f;
    }
}

/** '#RRGGBB' / '#RGB' → 0xRRGGBB. */
export function parseColor(v: string): number {
    const hex = v.trim().replace(/^#|^0x/i, '');
    const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
    const n = parseInt(full, 16);
    return Number.isNaN(n) ? 0 : n;
}
