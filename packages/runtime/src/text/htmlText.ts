// The HTML subset text fields understand: <p align class>, <br>, <b>, <i>, <u>, <font face size
// color letterSpacing kerning>, <a href target>, <span class>, <li>, <textformat leading indent
// blockindent leftmargin rightmargin>, and the entities &lt; &gt; &amp; &quot; &apos; &nbsp; &#N;.
// Parsing yields characters with a format each; paragraphs end with '\r'. Serializing produces the
// same upper-case markup the original text fields reported back.

import type { StyleSheet } from './StyleSheet';
import { parseColor } from './StyleSheet';
import { TextFormat } from './TextFormat';

export interface StyledText {
    text: string;
    formats: TextFormat[];
}

const ENTITIES: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'", nbsp: ' ' };

function decodeEntities(s: string): string {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
        if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
        return ENTITIES[e.toLowerCase()] ?? m;
    });
}

function attrs(src: string): Record<string, string> {
    const out: Record<string, string> = {};
    for (const m of src.matchAll(/([a-zA-Z_:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) out[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
    return out;
}

/** Parse HTML text on top of `base`; with `condenseWhite`, runs of whitespace (and line breaks in the source) become one space. */
export function parseHtml(html: string, base: TextFormat, styleSheet: StyleSheet | null, condenseWhite: boolean): StyledText {
    const chars: string[] = [];
    const formats: TextFormat[] = [];
    const stack: { tag: string; format: TextFormat }[] = [{ tag: '', format: base }];
    const current = () => stack[stack.length - 1].format;
    const styled = (tag: string, a: Record<string, string>, f: TextFormat) => {
        if (!styleSheet) return f;
        let out = f;
        const byTag = styleSheet.getStyle(tag);
        if (byTag) out = out.merged(styleSheet.transform(byTag));
        if (a.class) {
            const byClass = styleSheet.getStyle('.' + a.class);
            if (byClass) out = out.merged(styleSheet.transform(byClass));
        }
        return out;
    };
    const emit = (s: string, f: TextFormat) => {
        for (const ch of s) { chars.push(ch); formats.push(f); }
    };
    const breakParagraph = () => {
        if (chars.length && chars[chars.length - 1] !== '\r') emit('\r', current());
    };
    const src = condenseWhite ? html.replace(/\s+/g, ' ') : html.replace(/\r\n?|\n/g, '\r');
    let i = 0;
    let lastWasSpace = false;
    while (i < src.length) {
        if (src[i] === '<') {
            const end = src.indexOf('>', i);
            if (end < 0) { emit(decodeEntities(src.slice(i)), current()); break; }
            const raw = src.slice(i + 1, end).trim();
            i = end + 1;
            if (raw.startsWith('!--')) continue;
            const closing = raw.startsWith('/');
            const selfClosing = raw.endsWith('/');
            const body = raw.replace(/^\//, '').replace(/\/$/, '');
            const tag = (body.match(/^[a-zA-Z0-9]+/)?.[0] ?? '').toLowerCase();
            const a = attrs(body.slice(tag.length));
            if (closing) {
                for (let k = stack.length - 1; k > 0; k--) {
                    if (stack[k].tag === tag) {
                        stack.length = k;
                        break;
                    }
                }
                if (tag === 'p' || tag === 'li') breakParagraph();
                continue;
            }
            if (tag === 'br') { emit('\r', current()); lastWasSpace = false; continue; }
            if (tag === 'p' || tag === 'li') breakParagraph();
            let f = current().clone();
            switch (tag) {
                case 'b': f.bold = true; break;
                case 'i': f.italic = true; break;
                case 'u': f.underline = true; break;
                case 'p': if (a.align) f.align = a.align.toLowerCase(); break;
                case 'li': f.bullet = true; break;
                case 'a': f.url = a.href ?? ''; f.target = a.target ?? ''; break;
                case 'font':
                    if (a.face) f.font = a.face;
                    if (a.size) f.size = /^[+-]/.test(a.size) ? (f.size ?? 12) + Number(a.size) : Number(a.size);
                    if (a.color) f.color = parseColor(a.color);
                    if (a.letterspacing) f.letterSpacing = Number(a.letterspacing);
                    if (a.kerning) f.kerning = a.kerning === '1' || a.kerning === 'true';
                    break;
                case 'textformat':
                    if (a.leading) f.leading = Number(a.leading);
                    if (a.indent) f.indent = Number(a.indent);
                    if (a.blockindent) f.blockIndent = Number(a.blockindent);
                    if (a.leftmargin) f.leftMargin = Number(a.leftmargin);
                    if (a.rightmargin) f.rightMargin = Number(a.rightmargin);
                    break;
            }
            f = styled(tag, a, f);
            if (!selfClosing) stack.push({ tag, format: f });
            continue;
        }
        const next = src.indexOf('<', i);
        let text = decodeEntities(src.slice(i, next < 0 ? src.length : next));
        i = next < 0 ? src.length : next;
        if (condenseWhite) {
            if (lastWasSpace || chars.length === 0 || chars[chars.length - 1] === '\r') text = text.replace(/^ /, '');
            lastWasSpace = text.endsWith(' ');
        }
        emit(text, current());
    }
    // a closing paragraph break at the very end is not part of the text
    if (chars[chars.length - 1] === '\r' && formats.length) { chars.pop(); formats.pop(); }
    return { text: chars.join(''), formats };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hex = (c: number) => '#' + (c >>> 0).toString(16).toUpperCase().padStart(6, '0').slice(-6);

/** Markup for formatted text, one <P> per paragraph, as text fields report htmlText. */
export function toHtml(text: string, formats: TextFormat[], fallback: TextFormat): string {
    const paragraphs = text.split('\r');
    const out: string[] = [];
    let pos = 0;
    for (const para of paragraphs) {
        const pf = formats[pos] ?? fallback;
        let body = '';
        let i = 0;
        while (i < para.length) {
            const f = formats[pos + i] ?? fallback;
            let j = i + 1;
            while (j < para.length && sameRun(formats[pos + j] ?? fallback, f)) j++;
            let run = esc(para.slice(i, j));
            if (f.underline) run = `<U>${run}</U>`;
            if (f.italic) run = `<I>${run}</I>`;
            if (f.bold) run = `<B>${run}</B>`;
            if (f.url) run = `<A HREF="${esc(f.url)}" TARGET="${esc(f.target ?? '')}">${run}</A>`;
            body += `<FONT FACE="${esc(f.font ?? '')}" SIZE="${f.size ?? 12}" COLOR="${hex(f.color ?? 0)}" LETTERSPACING="${f.letterSpacing ?? 0}" KERNING="${f.kerning ? 1 : 0}">${run}</FONT>`;
            i = j;
        }
        if (!para.length) {
            const f = pf;
            body = `<FONT FACE="${esc(f.font ?? '')}" SIZE="${f.size ?? 12}" COLOR="${hex(f.color ?? 0)}" LETTERSPACING="${f.letterSpacing ?? 0}" KERNING="${f.kerning ? 1 : 0}"></FONT>`;
        }
        out.push(`<P ALIGN="${(pf.align ?? 'left').toUpperCase()}">${body}</P>`);
        pos += para.length + 1;
    }
    return out.join('');
}

function sameRun(a: TextFormat, b: TextFormat): boolean {
    if (a === b) return true;
    return TextFormat.PROPERTIES.every(p => a[p] === b[p]);
}
