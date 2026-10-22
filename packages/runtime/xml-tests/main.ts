// The runtime's XML parser (parseMarkup) checked against the one it replaced (the browser's DOMParser, its DOM
// walked into E4X nodes): every XML file in client-next's asset pack, and big documents given in ?files=, must parse
// to the same nodes; malformed markup must be refused by both. Results go to window.__results, for
// gpu-tests/run.ts (node ../gpu-tests/run.ts http://localhost:4191/?files=...).
import { readAssetPack } from '@habbo-pixi/runtime/embed/assetPack';
import { Namespace } from '@habbo-pixi/runtime/xml/Namespace';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { parseMarkup } from '@habbo-pixi/runtime/xml/parseMarkup';

interface Result { name: string; maxDiff: number; over: number; pixels: number; ok: boolean; ms: number; bestShift?: string }

// ---------- the parser as it was ----------

function separateAttributes(text: string): string {
    return text.replace(/<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>|<[A-Za-z_][^<>]*>/g, tag =>
        tag.startsWith('<!') || tag.startsWith('<?') ? tag
            : tag.replace(/"[^"]*"|'[^']*'|[^"']+/g, (part, at: number) =>
                (part[0] === '"' || part[0] === "'") && /[A-Za-z_]/.test(tag[at + part.length] ?? '') ? part + ' ' : part));
}

function oldParse(text: string): XML[] {
    const trimmed = XML.ignoreWhitespace ? text.trim() : text;
    if (!trimmed.includes('<')) return trimmed === '' ? [] : [XML._node('text', '', trimmed)];
    const body = separateAttributes(text.replace(/^\s*<\?xml[^?]*\?>/, ''));
    const doc = new DOMParser().parseFromString(`<__e4x_root__>${body}</__e4x_root__>`, 'text/xml');
    if (doc.getElementsByTagName('parsererror').length) throw new TypeError('malformed');
    const out: XML[] = [];
    for (const c of Array.from(doc.documentElement.childNodes)) {
        const n = fromDom(c);
        if (n) out.push(n);
    }
    return out;
}

function fromDom(d: Node): XML | null {
    switch (d.nodeType) {
        case 1: {
            const el = d as Element;
            const n = XML._node('element', el.localName, '', el.namespaceURI ?? '');
            n._prefix = el.prefix ?? undefined;
            for (const a of Array.from(el.attributes)) {
                if (a.name === 'xmlns') { n._ns.push(new Namespace('', a.value)); continue; }
                if (a.prefix === 'xmlns') { n._ns.push(new Namespace(a.localName, a.value)); continue; }
                const attr = XML._node('attribute', a.localName, a.value, a.namespaceURI ?? '');
                attr._prefix = a.prefix ?? undefined;
                attr._parent = n;
                n._attrs.push(attr);
            }
            for (const c of Array.from(el.childNodes)) {
                const child = fromDom(c);
                if (child) { child._parent = n; n._children.push(child); }
            }
            return n;
        }
        case 3: {
            const v = XML.ignoreWhitespace ? (d.nodeValue ?? '').trim() : d.nodeValue ?? '';
            return v === '' ? null : XML._node('text', '', v);
        }
        case 4: {
            const n = XML._node('text', '', d.nodeValue ?? '');
            n._cdata = true;
            return n;
        }
        case 7:
            return XML.ignoreProcessingInstructions ? null : XML._node('processing-instruction', (d as ProcessingInstruction).target, d.nodeValue ?? '');
        case 8:
            return XML.ignoreComments ? null : XML._node('comment', '', d.nodeValue ?? '');
    }
    return null;
}

// ---------- comparing ----------

/** The first difference between two node lists, as a path; null when they are the same. */
function difference(a: XML[], b: XML[], path: string): string | null {
    if (a.length !== b.length) return `${path}: ${a.length} nodes, now ${b.length}`;
    for (let i = 0; i < a.length; i++) {
        const x = a[i], y = b[i];
        const at = `${path}/${x._local || x._kind}[${i}]`;
        for (const key of ['_kind', '_local', '_uri', '_prefix', '_value', '_cdata'] as const) {
            if (x[key] !== y[key]) return `${at}: ${key} ${JSON.stringify(x[key])}, now ${JSON.stringify(y[key])}`;
        }
        const ns = (n: XML) => n._ns.map(s => `${s.prefix}=${s.uri}`).join(' ');
        if (ns(x) !== ns(y)) return `${at}: namespaces ${ns(x)}, now ${ns(y)}`;
        const attrs = difference(x._attrs, y._attrs, `${at}@`);
        if (attrs) return attrs;
        const children = difference(x._children, y._children, at);
        if (children) return children;
    }
    return null;
}

const count = (nodes: XML[]): number => nodes.reduce((n, x) => n + 1 + x._attrs.length + count(x._children), 0);

function outcome(parse: (t: string) => XML[], text: string): { nodes: XML[] | null; ms: number } {
    const t = performance.now();
    try {
        const nodes = parse(text);
        return { nodes, ms: performance.now() - t };
    } catch {
        return { nodes: null, ms: performance.now() - t };
    }
}

/** Both parsers on one document: the same nodes (or both refusing it), and how long each took. */
function compare(name: string, text: string): Result & { oldMs: number; detail?: string } {
    const before = outcome(oldParse, text);
    const after = outcome(parseMarkup, text);
    let detail: string | null = null;
    if (!before.nodes !== !after.nodes) detail = before.nodes ? 'the new parser refuses it' : 'the old parser refused it, the new one takes it';
    else if (before.nodes && after.nodes) detail = difference(before.nodes, after.nodes, '');
    return {
        name, maxDiff: 0, over: detail ? 1 : 0, pixels: before.nodes ? count(before.nodes) : 0, ok: !detail,
        ms: Math.round(after.ms * 10) / 10, oldMs: Math.round(before.ms * 10) / 10, ...(detail ? { detail } : {}),
    };
}

// markup both must take, or both refuse, the same way
const CASES: [string, string][] = [
    ['attributes without spaces', '<a x="1"y="2" z=\'3\'/>'],
    ['entities', '<a t="&lt;&amp;&#65;&#x42;&quot;">x &gt; y &amp;&#10;z</a>'],
    ['cdata and text', '<a>before<![CDATA[ <raw> & ]]>after</a>'],
    ['comments split text', '<a>one<!-- c -->two</a>'],
    ['whitespace and line ends', '<a>\r\n  <b> t\r\n x </b>\r\n</a>'],
    ['attribute line ends', '<a v="1\n2\t3"/>'],
    ['namespaces', '<r xmlns="u:d" xmlns:p="u:p"><p:a p:x="1" y="2"><b/></p:a></r>'],
    ['xml prefix', '<a xml:lang="en"/>'],
    ['declaration', '<?xml version="1.0" encoding="UTF-8"?>\n<a/>'],
    ['processing instruction', '<a><?pi data?></a>'],
    ['several roots', '<a/><b/>'],
    ['top-level text', 'just text'],
    ['empty', ''],
    ['bad: unclosed', '<a><b></a>'],
    ['bad: mismatched', '<a></b>'],
    ['bad: bare ampersand', '<a>x & y</a>'],
    ['bad: unknown entity', '<a>&nbsp;</a>'],
    ['bad: lt in attribute', '<a v="<"/>'],
    ['bad: duplicate attribute', '<a v="1" v="2"/>'],
    ['bad: unbound prefix', '<p:a/>'],
    ['bad: unquoted attribute', '<a v=1/>'],
    ['bad: attribute without value', '<a v/>'],
];

/** child() and attribute() as E4X has them (their plain-name fast path included). */
function queries(): Result[] {
    const was = XML.ignoreProcessingInstructions;
    XML.ignoreProcessingInstructions = false;
    const x = new XML('<r xmlns:p="u:p" a="1" p:a="2"><item>1</item><?item pi?><p:item>2</p:item><item>3</item><other/>text</r>');
    XML.ignoreProcessingInstructions = was;
    const checks: [string, unknown, unknown][] = [
        ['child(name): unqualified elements only', x.child('item').length(), 2],
        ['child(name) values', x.child('item').toXMLString(), '<item>1</item>\n<item>3</item>'],
        ['child(index)', x.child(1).length(), 1],
        ["child('*')", x.child('*').length(), 6],
        ['attribute(name): unqualified only', x.attribute('a').toString(), '1'],
        ["attribute('*')", x.attribute('*').length(), 2],
        ['list child of one', x.child('item').child('nothing').length(), 0],
        ['list child of many', new XML('<r><a><b/></a><a><b/><b/></a></r>').child('a').child('b').length(), 3],
        ['list attribute', new XML('<r><a v="1"/><a v="2"/></r>').child('a').attribute('v').toXMLString(), '1\n2'],
        ['missing', x.child('nope').length(), 0],
    ];
    return checks.map(([name, got, want]) => {
        const ok = got === want;
        return { name: `query: ${name}`, maxDiff: 0, over: ok ? 0 : 1, pixels: 1, ok, ms: 0, ...(ok ? {} : { detail: `got ${JSON.stringify(got)}, want ${JSON.stringify(want)}` }) };
    });
}

async function run(): Promise<Result[]> {
    const results: Result[] = [...queries()];
    for (const [name, text] of CASES) results.push(compare(`case: ${name}`, text));
    // every XML file of the client's pack
    const pack = readAssetPack(new Uint8Array(await (await fetch('/@fs/<path to this repository>/packages/client-next/src/assets.hpa')).arrayBuffer()));
    const decoder = new TextDecoder();
    let files = 0, failed = 0, oldMs = 0, newMs = 0;
    for (const [path, bytes] of pack) {
        if (!/\.(bin|xml)$/.test(path)) continue;
        const text = decoder.decode(bytes);
        if (!text.trimStart().startsWith('<')) continue;
        const r = compare(`pack: ${path}`, text);
        files++;
        oldMs += r.oldMs;
        newMs += r.ms;
        if (!r.ok) {
            failed++;
            if (failed <= 20) results.push(r);
        }
    }
    results.push({ name: `pack: ${files} XML files (old ${Math.round(oldMs)} ms)`, maxDiff: 0, over: failed, pixels: files, ok: failed === 0, ms: Math.round(newMs) });
    // big documents (absolute paths, comma-separated)
    for (const file of (new URLSearchParams(location.search).get('files') ?? '').split(',').filter(Boolean)) {
        const text = await (await fetch(`/@fs/${file}`)).text();
        const r = compare(`file: ${file.split('/').pop()} (old ${'{old}'} ms)`, text);
        r.name = r.name.replace('{old}', String(r.oldMs));
        results.push(r);
    }
    return results;
}

const log = document.getElementById('log')!;
run().then(results => {
    (window as unknown as { __results: Result[] }).__results = results;
    log.textContent = results.map(r => `${r.ok ? 'ok  ' : 'FAIL'} ${r.name} ${(r as { detail?: string }).detail ?? ''}`).join('\n');
    for (const r of results as (Result & { detail?: string })[]) if (r.detail) console.error(`${r.name}: ${r.detail}`);
}, error => {
    (window as unknown as { __results: unknown }).__results = { error: String(error?.stack ?? error) };
    log.textContent = String(error?.stack ?? error);
});
