// XML and XMLList (top-level AS3 classes), the E4X data model. The converted code reaches it through
// methods (x.@id → x.attribute('id'), x.item → x.child('item'), x..a → x.descendants('a'),
// x.(pred) → x.filter(...)). Semantics follow E4X as AS3 implements it:
//  - an unqualified name matches only nodes without a namespace; '*' matches everything;
//  - parsing honours XML.ignoreWhitespace (text trimmed, whitespace-only text dropped),
//    ignoreComments and ignoreProcessingInstructions (all true by default);
//  - toString() gives the text of simple content and markup (toXMLString) otherwise;
//  - toXMLString() pretty-prints with XML.prettyIndent (2) spaces when XML.prettyPrinting is on.

import { Namespace } from './Namespace';
import { QName } from './QName';
import { parseMarkup } from './parseMarkup';

type Kind = 'element' | 'text' | 'attribute' | 'comment' | 'processing-instruction';
type NameArg = string | number | QName | { toString(): string };

function malformed(): TypeError {
    return new TypeError('Error #1090: XML parser failure: element is malformed.');
}

export class XML implements Iterable<XML> {
    static ignoreComments = true;
    static ignoreProcessingInstructions = true;
    static ignoreWhitespace = true;
    static prettyPrinting = true;
    static prettyIndent = 2;

    /** @internal */ _kind: Kind = 'text';
    /** @internal */ _uri = '';
    /** @internal */ _local = '';
    /** @internal */ _prefix: string | undefined;
    /** @internal */ _value = '';
    /** @internal */ _cdata = false;
    /** @internal */ _attrs: XML[] = [];
    /** @internal */ _children: XML[] = [];
    /** @internal */ _parent: XML | null = null;
    /** @internal */ _ns: Namespace[] = [];

    /** From markup, another XML (copied), a one-item XMLList (its item, copied), or any value's string. */
    constructor(value: any = '') {
        if (value === INTERNAL) return;
        const source = value instanceof XMLList && value.length() === 1 ? value.item(0) : value;
        if (source instanceof XML) {
            source._copyInto(this);
            return;
        }
        const nodes = parseFragment(source == null ? '' : String(source));
        if (nodes.length === 0) return;   // empty text node
        if (nodes.length > 1) throw new TypeError('Error #1088: The markup in the document following the root element must be well-formed.');
        nodes[0]._adoptInto(this);
    }

    /** XML(value): an XML is returned as is; anything else is converted as by `new XML(value)`. */
    static from(value: any): XML {
        if (value instanceof XML) return value;
        if (value instanceof XMLList && value.length() === 1) return value.item(0);
        return new XML(value);
    }

    static escapeText(value: unknown): string {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    static escapeAttribute(value: unknown): string {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
            .replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;').replace(/\t/g, '&#x9;');
    }

    /** @internal */
    static _node(kind: Kind, local = '', value = '', uri = ''): XML {
        const n = new XML(INTERNAL);
        n._kind = kind;
        n._local = local;
        n._value = value;
        n._uri = uri;
        return n;
    }

    // ---------- navigation ----------

    /** `xml[key]`: an XML value is a list of one, so index 0 is itself; a name gives the matching children. */
    getProperty(key: NameArg): any {
        if (typeof key === 'number' || (typeof key === 'string' && /^\d+$/.test(key))) return Number(key) === 0 ? this : undefined;
        return this.child(key);
    }

    /** Child nodes named `name` ('*' for all, a number for the child at that index). */
    child(name: NameArg): XMLList {
        if (typeof name === 'string' && isPlainName(name)) return new XMLList(nodesNamed(this._children, name, 'element'));
        if (typeof name === 'number' || (typeof name === 'string' && /^\d+$/.test(name))) {
            const c = this._children[Number(name)];
            return new XMLList(c ? [c] : []);
        }
        const m = matcher(name);
        return new XMLList(this._children.filter(c => (m.any ? true : c._kind === 'element' && m.test(c))));
    }

    /** Attributes named `name` ('*' for all). */
    attribute(name: NameArg): XMLList {
        if (typeof name === 'string' && isPlainName(name)) return new XMLList(nodesNamed(this._attrs, name, 'attribute'));
        const m = matcher(name);
        return new XMLList(this._attrs.filter(a => m.test(a)));
    }

    attributes(): XMLList {
        return new XMLList([...this._attrs]);
    }

    children(): XMLList {
        return new XMLList([...this._children]);
    }

    elements(name: NameArg = '*'): XMLList {
        const m = matcher(name);
        return new XMLList(this._children.filter(c => c._kind === 'element' && m.test(c)));
    }

    /** Descendant elements named `name` ('*' for all descendants, '@a' for descendant attributes). */
    descendants(name: NameArg = '*'): XMLList {
        const out: XML[] = [];
        const s = String(name);
        const attr = s.startsWith('@');
        const m = matcher(attr ? s.slice(1) : name);
        const walk = (n: XML) => {
            for (const c of n._children) {
                if (attr) {
                    if (c._kind === 'element') for (const a of c._attrs) if (m.test(a)) out.push(a);
                } else if (m.any || (c._kind === 'element' && m.test(c))) out.push(c);
                walk(c);
            }
        };
        if (attr) for (const a of this._attrs) if (m.test(a)) out.push(a);
        walk(this);
        return new XMLList(out);
    }

    text(): XMLList {
        return new XMLList(this._children.filter(c => c._kind === 'text'));
    }

    comments(): XMLList {
        return new XMLList(this._children.filter(c => c._kind === 'comment'));
    }

    parent(): XML | undefined {
        return this._parent ?? undefined;
    }

    childIndex(): number {
        return this._parent ? this._parent._children.indexOf(this) : -1;
    }

    // ---------- identity ----------

    name(): QName | null {
        if (this._kind === 'text' || this._kind === 'comment') return null;
        return new QName(this._uri, this._local);
    }

    localName(): string | null {
        if (this._kind === 'text' || this._kind === 'comment') return null;
        return this._local;
    }

    /** The node's namespace, or with a prefix, the in-scope namespace declared under it. */
    namespace(prefix?: string): Namespace | undefined {
        if (prefix === undefined) return new Namespace(this._prefix ?? '', this._uri);
        for (let n: XML | null = this; n; n = n._parent) {
            const d = n._ns.find(x => x.prefix === prefix);
            if (d) return d;
        }
        return undefined;
    }

    nodeKind(): string {
        return this._kind;
    }

    length(): number {
        return 1;
    }

    item(index: number): XML | undefined {
        return index === 0 ? this : undefined;
    }

    hasSimpleContent(): boolean {
        if (this._kind === 'comment' || this._kind === 'processing-instruction') return false;
        return !this._children.some(c => c._kind === 'element');
    }

    hasComplexContent(): boolean {
        return this._kind === 'element' && this._children.some(c => c._kind === 'element');
    }

    /** '@a' → has attribute a; a name → has a child element of that name; a number → 0. */
    hasOwnProperty(name: any): boolean {
        const s = String(name);
        if (s.startsWith('@')) return this.attribute(s.slice(1)).length() > 0;
        if (/^\d+$/.test(s)) return s === '0';
        return this.child(s).length() > 0;
    }

    contains(value: unknown): boolean {
        return value instanceof XML ? equals(this, value) : false;
    }

    filter(pred: (item: XML) => unknown): XMLList {
        return new XMLList(pred(this) ? [this] : []);
    }

    *[Symbol.iterator](): Iterator<XML> {
        yield this;
    }

    // ---------- mutation ----------

    /** Append a node (XML), nodes (XMLList), or text (markup when it looks like an element). */
    appendChild(child: any): XML {
        for (const n of toNodes(child)) {
            n._parent = this;
            this._children.push(n);
        }
        return this;
    }

    prependChild(child: any): XML {
        const nodes = toNodes(child);
        for (const n of nodes) n._parent = this;
        this._children.unshift(...nodes);
        return this;
    }

    /** E4X `x.name = value`: replace the first child named `name` and remove the rest, or append a new element. */
    setChild(name: NameArg, value: any): any {
        const m = matcher(name);
        const matches = this._children.filter(c => c._kind === 'element' && (m.any || m.test(c)));
        if (value instanceof XML || value instanceof XMLList) {
            const nodes = toNodes(value).map(n => (n._parent ? n.copy() : n));
            if (!matches.length) {
                for (const n of nodes) { n._parent = this; this._children.push(n); }
            } else {
                const at = this._children.indexOf(matches[0]);
                for (const n of nodes) n._parent = this;
                this._children.splice(at, 1, ...nodes);
                this._children = this._children.filter(c => !matches.slice(1).includes(c));
            }
            return value;
        }
        const text = String(value);
        if (!matches.length) {
            const el = XML._node('element', name instanceof QName ? name.localName : String(name), '', name instanceof QName ? name.uri ?? '' : '');
            el.appendChild(XML._node('text', '', text));
            el._parent = this;
            this._children.push(el);
        } else {
            matches[0]._children = [];
            matches[0].appendChild(XML._node('text', '', text));
            this._children = this._children.filter(c => !matches.slice(1).includes(c));
        }
        return value;
    }

    setAttribute(name: NameArg, value: any): any {
        const text = value instanceof XMLList ? value.toArray().map(x => x.toString()).join(' ') : String(value);
        const m = matcher(name);
        const existing = this._attrs.find(a => m.test(a));
        if (existing) existing._value = text;
        else {
            const a = XML._node('attribute', name instanceof QName ? name.localName : String(name), text, name instanceof QName ? name.uri ?? '' : '');
            a._parent = this;
            this._attrs.push(a);
        }
        return value;
    }

    deleteAttribute(name: NameArg): boolean {
        const m = matcher(name);
        const before = this._attrs.length;
        this._attrs = this._attrs.filter(a => !m.test(a));
        return this._attrs.length !== before;
    }

    deleteChildren(name: NameArg): boolean {
        const m = matcher(name);
        const before = this._children.length;
        this._children = this._children.filter(c => !(c._kind === 'element' && (m.any || m.test(c))));
        return this._children.length !== before;
    }

    setName(name: NameArg): void {
        if (name instanceof QName) { this._local = name.localName; this._uri = name.uri ?? ''; }
        else this._local = String(name);
    }

    /** Merge adjacent text nodes and drop empty ones, recursively. */
    normalize(): XML {
        const out: XML[] = [];
        for (const c of this._children) {
            if (c._kind === 'element') c.normalize();
            const prev = out[out.length - 1];
            if (c._kind === 'text' && !c._cdata) {
                if (c._value === '') continue;
                if (prev && prev._kind === 'text' && !prev._cdata) { prev._value += c._value; continue; }
            }
            out.push(c);
        }
        this._children = out;
        return this;
    }

    copy(): XML {
        const n = new XML(INTERNAL);
        this._copyInto(n);
        return n;
    }

    /** @internal */
    /**
     * Makes `n` this node, taking its attributes and children as they are (no copy): for a node just parsed, which
     * nothing else holds. A big document is a million nodes; copying them cost as much as parsing them.
     */
    _adoptInto(n: XML): void {
        n._kind = this._kind;
        n._uri = this._uri;
        n._local = this._local;
        n._prefix = this._prefix;
        n._value = this._value;
        n._cdata = this._cdata;
        n._ns = this._ns;
        n._parent = null;
        n._attrs = this._attrs;
        n._children = this._children;
        for (const a of n._attrs) a._parent = n;
        for (const c of n._children) c._parent = n;
    }

    _copyInto(n: XML): void {
        n._kind = this._kind;
        n._uri = this._uri;
        n._local = this._local;
        n._prefix = this._prefix;
        n._value = this._value;
        n._cdata = this._cdata;
        n._ns = [...this._ns];
        n._parent = null;
        n._attrs = this._attrs.map(a => { const c = a.copy(); c._parent = n; return c; });
        n._children = this._children.map(ch => { const c = ch.copy(); c._parent = n; return c; });
    }

    // ---------- conversion ----------

    /** Simple content → its text; complex content → markup. */
    toString(): string {
        if (this._kind === 'text' || this._kind === 'attribute') return this._value;
        if (this.hasSimpleContent()) return this._children.filter(c => c._kind === 'text').map(c => c._value).join('');
        return this.toXMLString();
    }

    toXMLString(): string {
        return serialize(this, 0);
    }
}

/** An ordered list of XML nodes: what E4X navigation returns. */
export class XMLList implements Iterable<XML> {
    #items: XML[];

    /** From an array of nodes (internal), an XML or XMLList (copied), or markup of zero or more nodes. */
    constructor(value: any = '') {
        if (Array.isArray(value)) { this.#items = value; return; }
        if (value instanceof XML) { this.#items = [value.copy()]; return; }
        if (value instanceof XMLList) { this.#items = value.#items.map(x => x.copy()); return; }
        this.#items = parseFragment(value == null ? '' : String(value));
    }

    /** XMLList(value): an XMLList as is, an XML as a one-item list, anything else parsed. */
    static from(value: any): XMLList {
        if (value instanceof XMLList) return value;
        if (value instanceof XML) return new XMLList([value]);
        return new XMLList(value);
    }

    length(): number {
        return this.#items.length;
    }

    item(index: number): XML | undefined {
        return this.#items[index];
    }

    toArray(): XML[] {
        return [...this.#items];
    }

    /** `list[key]`: an array index gives that item, anything else the matching children. */
    getProperty(key: NameArg): any {
        if (typeof key === 'number' || (typeof key === 'string' && /^\d+$/.test(key))) return this.#items[Number(key)];
        return this.child(key);
    }

    *[Symbol.iterator](): Iterator<XML> {
        yield* this.#items;
    }

    child(name: NameArg): XMLList {
        // a list of one (a.b.c) is the common case: its item's children are the list's
        if (this.#items.length === 1) return this.#items[0].child(name);
        return new XMLList(this.#items.flatMap(x => x.child(name).#items));
    }

    attribute(name: NameArg): XMLList {
        if (this.#items.length === 1) return this.#items[0].attribute(name);
        return new XMLList(this.#items.flatMap(x => x.attribute(name).#items));
    }

    attributes(): XMLList {
        return new XMLList(this.#items.flatMap(x => x.attributes().toArray()));
    }

    children(): XMLList {
        return new XMLList(this.#items.flatMap(x => x.children().toArray()));
    }

    elements(name: NameArg = '*'): XMLList {
        return new XMLList(this.#items.flatMap(x => x.elements(name).toArray()));
    }

    descendants(name: NameArg = '*'): XMLList {
        return new XMLList(this.#items.flatMap(x => x.descendants(name).toArray()));
    }

    text(): XMLList {
        return new XMLList(this.#items.flatMap(x => x.text().toArray()));
    }

    filter(pred: (item: XML) => unknown): XMLList {
        return new XMLList(this.#items.filter(x => pred(x)));
    }

    /** The parent shared by every item, or undefined. */
    parent(): XML | undefined {
        const p = this.#items[0]?.parent();
        return p && this.#items.every(x => x.parent() === p) ? p : undefined;
    }

    hasOwnProperty(name: any): boolean {
        if (/^\d+$/.test(String(name))) return Number(name) < this.#items.length;
        return this.#items.some(x => x.hasOwnProperty(name));
    }

    hasSimpleContent(): boolean {
        if (this.#items.length === 0) return true;
        if (this.#items.length === 1) return this.#items[0].hasSimpleContent();
        return !this.#items.some(x => x.nodeKind() === 'element');
    }

    hasComplexContent(): boolean {
        return !this.hasSimpleContent();
    }

    contains(value: unknown): boolean {
        return value instanceof XML && this.#items.some(x => equals(x, value));
    }

    copy(): XMLList {
        return new XMLList(this.#items.map(x => x.copy()));
    }

    // single-item delegation, as E4X does for XMLLists of one node
    name(): QName | null {
        return this.#single('name').name();
    }

    localName(): string | null {
        return this.#single('localName').localName();
    }

    namespace(prefix?: string): Namespace | undefined {
        return this.#single('namespace').namespace(prefix);
    }

    nodeKind(): string {
        return this.#single('nodeKind').nodeKind();
    }

    appendChild(child: any): XML {
        return this.#single('appendChild').appendChild(child);
    }

    setChild(name: NameArg, value: any): any {
        if (this.#items.length === 0) return value;
        return this.#single('setChild').setChild(name, value);
    }

    setAttribute(name: NameArg, value: any): any {
        if (this.#items.length === 0) return value;
        return this.#single('setAttribute').setAttribute(name, value);
    }

    deleteAttribute(name: NameArg): boolean {
        return this.#items.map(x => x.deleteAttribute(name)).some(Boolean);
    }

    deleteChildren(name: NameArg): boolean {
        return this.#items.map(x => x.deleteChildren(name)).some(Boolean);
    }

    /** list[i] = value: replaces the node in the list and in its parent. */
    setItem(index: number, value: any): any {
        const node = value instanceof XML ? value : XML._node('text', '', String(value));
        const old = this.#items[index];
        if (old?._parent) {
            const p = old._parent;
            p._children[p._children.indexOf(old)] = node;
            node._parent = p;
        }
        this.#items[index] = node;
        return value;
    }

    /** delete list[i]: removes the node from the list and from its parent. */
    deleteAt(index: number): boolean {
        const old = this.#items[index];
        if (!old) return false;
        if (old._parent) {
            const p = old._parent;
            if (old._kind === 'attribute') p._attrs = p._attrs.filter(a => a !== old);
            else p._children = p._children.filter(c => c !== old);
            old._parent = null;
        }
        this.#items.splice(index, 1);
        return true;
    }

    normalize(): XMLList {
        for (const x of this.#items) x.normalize();
        return this;
    }

    toString(): string {
        if (this.hasSimpleContent()) {
            return this.#items.filter(x => x.nodeKind() !== 'comment' && x.nodeKind() !== 'processing-instruction').map(x => x.toString()).join('');
        }
        return this.toXMLString();
    }

    toXMLString(): string {
        return this.#items.map(x => x.toXMLString()).join('\n');
    }

    #single(method: string): XML {
        if (this.#items.length !== 1) throw new TypeError(`Error #1086: The ${method} method only works on lists containing one item.`);
        return this.#items[0];
    }
}

// ---------- internals ----------

const INTERNAL = Symbol('XML.internal');

interface Matcher { any: boolean; test(n: XML): boolean }

/** A name child() and attribute() can match by comparing it (not '*', not an index): their common case. */
function isPlainName(name: string): boolean {
    const c = name.charCodeAt(0);
    return name !== '*' && !(c >= 48 && c <= 57);
}

/**
 * The nodes named `name` without a namespace (elements of a child list, or attributes), as matcher(name) finds
 * them, in one loop: the client calls child() hundreds of thousands of times reading its data at start-up.
 */
function nodesNamed(nodes: XML[], name: string, kind: Kind): XML[] {
    const out: XML[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n._local === name && n._uri === '' && n._kind === kind) out.push(n);
    }
    return out;
}

function matcher(name: NameArg): Matcher {
    if (name instanceof QName) {
        if (name.localName === '*' && name.uri === null) return { any: true, test: () => true };
        return {
            any: false,
            test: n => (name.localName === '*' || n._local === name.localName) && (name.uri === null || n._uri === name.uri),
        };
    }
    const s = String(name);
    if (s === '*') return { any: true, test: () => true };
    return { any: false, test: n => n._local === s && n._uri === '' };
}

function toNodes(value: any): XML[] {
    if (value instanceof XMLList) return value.toArray();
    if (value instanceof XML) return [value];
    const s = String(value);
    if (/^\s*</.test(s)) return parseFragment(s);
    return [XML._node('text', '', s)];
}

function equals(a: XML, b: XML): boolean {
    if (a === b) return true;
    return a.nodeKind() === b.nodeKind() && a.toXMLString() === b.toXMLString();
}

/** Markup of zero or more top-level nodes (parseMarkup.ts); a string with no markup is one text node. */
function parseFragment(text: string): XML[] {
    if (text.indexOf('<') >= 0) return parseMarkup(text);
    const trimmed = XML.ignoreWhitespace ? text.trim() : text;
    return trimmed === '' ? [] : [XML._node('text', '', trimmed)];
}

function qualified(n: XML): string {
    return n._prefix ? `${n._prefix}:${n._local}` : n._local;
}

function serialize(n: XML, level: number): string {
    const pretty = XML.prettyPrinting;
    const pad = pretty ? ' '.repeat(level * XML.prettyIndent) : '';
    switch (n._kind) {
        case 'text': return pad + (n._cdata ? `<![CDATA[${n._value}]]>` : XML.escapeText(pretty ? n._value.trim() : n._value));
        case 'attribute': return XML.escapeAttribute(n._value);
        case 'comment': return `${pad}<!--${n._value}-->`;
        case 'processing-instruction': return `${pad}<?${n._local} ${n._value}?>`;
    }
    let open = `${pad}<${qualified(n)}`;
    for (const ns of n._ns) open += ns.prefix ? ` xmlns:${ns.prefix}="${XML.escapeAttribute(ns.uri)}"` : ` xmlns="${XML.escapeAttribute(ns.uri)}"`;
    for (const a of n._attrs) open += ` ${qualified(a)}="${XML.escapeAttribute(a._value)}"`;
    if (n._children.length === 0) return open + '/>';
    if (n._children.length === 1 && n._children[0]._kind === 'text') return `${open}>${serialize(n._children[0], 0)}</${qualified(n)}>`;
    if (!pretty) return `${open}>${n._children.map(c => serialize(c, 0)).join('')}</${qualified(n)}>`;
    return `${open}>\n${n._children.map(c => serialize(c, level + 1)).join('\n')}\n${pad}</${qualified(n)}>`;
}
