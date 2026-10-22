// The XML parser behind XML and XMLList: markup straight into E4X nodes, in one pass.
//
// The client parses large documents at start-up (the furniture data alone is megabytes) in one go, as AS3 did; the
// browser's DOMParser and a walk turning its DOM into E4X nodes took over a second there, and froze the page. This
// builds the nodes as it reads, and accepts what Flash's parser accepted that a browser's does not: attributes
// written without whitespace between them (a="1"b="2"), which the client's own data has. It is otherwise a strict
// XML parser, as Flash's was: mismatched or unclosed tags, a bare '&' or '<' in a value, an unknown entity, a
// duplicate attribute or an unbound prefix make the markup malformed.
//
// What it gives is what the DOM walk gave: elements (with their namespace, prefix and xmlns declarations),
// attributes, text (trimmed, and dropped when only whitespace, while XML.ignoreWhitespace), CDATA (as text, marked),
// comments and processing instructions (unless ignored). Line ends are normalised (\r\n and \r to \n), and tabs and
// line ends in attribute values become spaces, as an XML parser does.

import { Namespace } from './Namespace';
import { XML } from './XML';

const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const BAD_AMPERSAND = /&(?!(?:#x[0-9a-fA-F]+|#[0-9]+|amp|lt|gt|quot|apos);)/;
const ENTITY = /&(#x[0-9a-fA-F]+|#[0-9]+|amp|lt|gt|quot|apos);/g;

function malformed(): TypeError {
    return new TypeError('Error #1090: XML parser failure: element is malformed.');
}

/** Character data with its references resolved. */
function decode(text: string): string {
    if (text.indexOf('&') < 0) return text;
    if (BAD_AMPERSAND.test(text)) throw malformed();
    return text.replace(ENTITY, (_, ref: string) => {
        if (ref[0] !== '#') return ENTITIES[ref];
        const code = ref[1] === 'x' ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
        if (!(code >= 0 && code <= 0x10ffff)) throw malformed();
        return String.fromCodePoint(code);
    });
}

/** Whether a character code ends a name (whitespace, '/', '>', '='). */
function endsName(c: number): boolean {
    return c === 32 || c === 10 || c === 9 || c === 13 || c === 47 || c === 62 || c === 61;
}

function isSpace(c: number): boolean {
    return c === 32 || c === 10 || c === 9 || c === 13;
}

/** Whether a name can start with this character code (letters, '_' and ':', and anything beyond ASCII). */
function startsName(c: number): boolean {
    return (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 95 || c === 58 || c > 127;
}

/** Markup of zero or more top-level nodes, as E4X nodes; throws as Flash does when it is malformed. */
export function parseMarkup(source: string): XML[] {
    const s = source.indexOf('\r') >= 0 ? source.replace(/\r\n?/g, '\n') : source;
    const n = s.length;
    const out: XML[] = [];
    const open: XML[] = [];
    // the prefixes in scope (null: the parent's), by depth; the root scope binds only xml:
    const scopes: Map<string, string>[] = [new Map([['xml', XML_NAMESPACE]])];
    let text = '';
    let i = 0;

    const add = (node: XML) => {
        const parent = open.length > 0 ? open[open.length - 1] : null;
        if (parent) {
            node._parent = parent;
            parent._children.push(node);
        } else {
            out.push(node);
        }
    };
    const flushText = () => {
        if (text === '') return;
        const value = XML.ignoreWhitespace ? text.trim() : text;
        text = '';
        if (value !== '') add(XML._node('text', '', value));
    };

    while (i < n) {
        const lt = s.indexOf('<', i);
        if (lt < 0) {
            text += decode(s.slice(i));
            break;
        }
        if (lt > i) text += decode(s.slice(i, lt));
        i = lt;
        const next = s.charCodeAt(i + 1);

        if (next === 47) {   // </name>
            const gt = s.indexOf('>', i);
            if (gt < 0) throw malformed();
            flushText();
            const name = s.slice(i + 2, gt).trimEnd();
            const element = open.pop();
            if (!element || name !== (element._prefix ? `${element._prefix}:${element._local}` : element._local)) throw malformed();
            scopes.pop();
            i = gt + 1;
            continue;
        }

        if (next === 33) {   // <!-- -->, <![CDATA[ ]]>, <!DOCTYPE >
            if (s.startsWith('<!--', i)) {
                const end = s.indexOf('-->', i + 4);
                if (end < 0) throw malformed();
                flushText();
                if (!XML.ignoreComments) add(XML._node('comment', '', s.slice(i + 4, end)));
                i = end + 3;
                continue;
            }
            if (s.startsWith('<![CDATA[', i)) {
                const end = s.indexOf(']]>', i + 9);
                if (end < 0) throw malformed();
                flushText();
                const node = XML._node('text', '', s.slice(i + 9, end));
                node._cdata = true;
                add(node);
                i = end + 3;
                continue;
            }
            if (s.startsWith('<!DOCTYPE', i) && open.length === 0) {
                // skipped, with its internal subset ([...]) if it has one
                let depth = 0;
                let j = i + 9;
                for (; j < n; j++) {
                    const c = s.charCodeAt(j);
                    if (c === 91) depth++;
                    else if (c === 93) depth--;
                    else if (c === 62 && depth <= 0) break;
                }
                if (j >= n) throw malformed();
                flushText();
                i = j + 1;
                continue;
            }
            throw malformed();
        }

        if (next === 63) {   // <?target data?>
            const end = s.indexOf('?>', i + 2);
            if (end < 0) throw malformed();
            flushText();
            if (!XML.ignoreProcessingInstructions) {
                const body = s.slice(i + 2, end);
                const space = body.search(/\s/);
                const target = space < 0 ? body : body.slice(0, space);
                if (target.toLowerCase() !== 'xml') add(XML._node('processing-instruction', target, space < 0 ? '' : body.slice(space).trimStart()));
            }
            i = end + 2;
            continue;
        }

        // <name attr="value" ...> or <name ... />
        if (!startsName(next)) throw malformed();
        flushText();
        let j = i + 1;
        while (j < n && !endsName(s.charCodeAt(j))) j++;
        const tag = s.slice(i + 1, j);
        const names: string[] = [];
        const values: string[] = [];
        let selfClosing = false;
        for (;;) {
            while (j < n && isSpace(s.charCodeAt(j))) j++;
            if (j >= n) throw malformed();
            const c = s.charCodeAt(j);
            if (c === 62) {
                j++;
                break;
            }
            if (c === 47) {
                if (s.charCodeAt(j + 1) !== 62) throw malformed();
                selfClosing = true;
                j += 2;
                break;
            }
            if (!startsName(c)) throw malformed();
            const nameStart = j;
            while (j < n && !endsName(s.charCodeAt(j))) j++;
            const name = s.slice(nameStart, j);
            while (j < n && isSpace(s.charCodeAt(j))) j++;
            if (s.charCodeAt(j) !== 61) throw malformed();
            j++;
            while (j < n && isSpace(s.charCodeAt(j))) j++;
            const quote = s.charCodeAt(j);
            if (quote !== 34 && quote !== 39) throw malformed();
            const end = s.indexOf(quote === 34 ? '"' : "'", j + 1);
            if (end < 0) throw malformed();
            let value = s.slice(j + 1, end);
            if (value.indexOf('<') >= 0) throw malformed();
            if (value.indexOf('\n') >= 0 || value.indexOf('\t') >= 0) value = value.replace(/[\n\t]/g, ' ');
            if (names.indexOf(name) >= 0) throw malformed();
            names.push(name);
            values.push(decode(value));
            // no whitespace needed before the next attribute: Flash's parser read a="1"b="2"
            j = end + 1;
        }

        // namespaces: this element's declarations, then its name and its attributes' names in that scope
        let scope = scopes[scopes.length - 1];
        const element = XML._node('element');
        for (let k = 0; k < names.length; k++) {
            const name = names[k];
            if (name === 'xmlns') {
                if (scope === scopes[scopes.length - 1]) scope = new Map(scope);
                scope.set('', values[k]);
                element._ns.push(new Namespace('', values[k]));
            } else if (name.startsWith('xmlns:')) {
                if (scope === scopes[scopes.length - 1]) scope = new Map(scope);
                scope.set(name.slice(6), values[k]);
                element._ns.push(new Namespace(name.slice(6), values[k]));
            }
        }
        const colon = tag.indexOf(':');
        if (colon >= 0) {
            const prefix = tag.slice(0, colon);
            const uri = scope.get(prefix);
            if (uri == null) throw malformed();
            element._prefix = prefix;
            element._local = tag.slice(colon + 1);
            element._uri = uri;
        } else {
            element._local = tag;
            element._uri = scope.get('') ?? '';
        }
        for (let k = 0; k < names.length; k++) {
            const name = names[k];
            if (name === 'xmlns' || name.startsWith('xmlns:')) continue;
            const attrColon = name.indexOf(':');
            let attr: XML;
            if (attrColon >= 0) {
                const prefix = name.slice(0, attrColon);
                const uri = scope.get(prefix);
                if (uri == null) throw malformed();
                attr = XML._node('attribute', name.slice(attrColon + 1), values[k], uri);
                attr._prefix = prefix;
            } else {
                attr = XML._node('attribute', name, values[k]);
            }
            attr._parent = element;
            element._attrs.push(attr);
        }
        add(element);
        if (!selfClosing) {
            open.push(element);
            scopes.push(scope);
        }
        i = j;
    }
    flushText();
    if (open.length > 0) throw malformed();
    return out;
}
