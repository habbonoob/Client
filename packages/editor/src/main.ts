// The asset editor: browse, preview, add, replace and remove the files in an HPA asset pack
// (runtime embed/assetPack.ts).
//  - project mode (on the editor's dev server): the client's own pack, packages/client/src/assets.hpa.
//    Every edit is saved at once into the asset overlay (packages/asset-overlay), which the transpiler
//    applies on every run, and into the pack itself (a running client reloads).
//  - file mode: any .hpa file, opened from disk and saved back to it (or downloaded).

import './style.css';
import { readAssetPack, readAssetPackIndex, writeAssetPack, type AssetPackEntry } from '@habbo-pixi/runtime/embed/assetPack';
import type { EditorView } from 'codemirror';
import { createCodeEditor } from './codeEditor';

type Status = 'added' | 'replaced' | 'removed';

/** A file of the pack; `data` is null for one removed from the client's pack (project mode). */
interface Item { path: string; data: Uint8Array | null; stored?: AssetPackEntry; status?: Status }

/** Where the pack comes from: the client's (through the dev server), or a file. */
type Source =
    | { kind: 'project' }
    | { kind: 'file'; name: string; handle: FileSystemFileHandle | null; dirty: boolean };

let source: Source | null = null;
let items = new Map<string, Item>();
let packSize = 0;
let selected: string | null = null;
let filter = '';
let zoom = 1;
/** The areas shown open in the tree (all start closed). */
const expanded = new Set<string>();
let previewUrl: string | null = null;
/** The text editor of the selected file, when it is text; `dirty` while it has edits not applied to the pack. */
let code: { path: string; view: EditorView; dirty: boolean } | null = null;
let fontCount = 0;

// ---------- DOM ----------

type Child = Node | string | null | undefined | false;

function h<K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> & { class?: string } = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    const { class: className, ...rest } = props;
    if (className) el.className = className;
    Object.assign(el, rest);
    for (const c of children) if (c) el.append(c);
    return el;
}

const sourceLabel = h('div', { class: 'source' });
const openButton = h('button', { textContent: 'Open .hpa…', title: 'Open a pack file from disk' });
const newButton = h('button', { textContent: 'New pack', title: 'Start an empty pack file' });
const projectButton = h('button', { textContent: "Client's pack", title: 'Edit the client’s asset pack (needs the editor’s dev server)' });
const saveButton = h('button', { textContent: 'Save', title: 'Save the pack file (Ctrl+S)' });
const saveAsButton = h('button', { textContent: 'Save as…' });
const addButton = h('button', { textContent: 'Add files…', title: 'Add files to the pack (or drop them on the window)' });
const search = h('input', { type: 'search', placeholder: 'Filter files…' });
const tree = h('div', { class: 'tree' });
const view = h('section', { class: 'view' });
const totals = h('div');
const status = h('div', { class: 'status' });
const fileInput = h('input', { type: 'file', multiple: true, hidden: true });

document.body.append(
    h('header', {}, h('h1', { textContent: 'Asset editor' }), sourceLabel, projectButton, openButton, newButton, saveButton, saveAsButton, addButton),
    h('main', {}, h('aside', {}, search, tree), view),
    h('footer', {}, totals, status),
    fileInput,
);

// ---------- helpers ----------

const areaOf = (path: string) => path.slice(0, path.indexOf('/'));
const nameOf = (path: string) => path.slice(path.indexOf('/') + 1);
const extOf = (path: string) => path.slice(path.lastIndexOf('.') + 1).toLowerCase();

function formatSize(n: number): string {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1048576).toFixed(2)} MB`;
}

function setStatus(message: string, error = false): void {
    status.textContent = message;
    status.classList.toggle('error', error);
}

async function run(action: () => Promise<void>): Promise<void> {
    try {
        await action();
    } catch (e) {
        setStatus(e instanceof Error ? e.message : String(e), true);
        console.error(e);
    }
}

async function readFile(file: Blob): Promise<Uint8Array> {
    return new Uint8Array(await file.arrayBuffer());
}

function download(data: Uint8Array, name: string): void {
    const url = URL.createObjectURL(new Blob([data as Uint8Array<ArrayBuffer>]));
    const a = h('a', { href: url, download: name });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Ask for files with the hidden file input. */
function pickFiles(multiple: boolean, accept = ''): Promise<File[]> {
    return new Promise(resolve => {
        fileInput.multiple = multiple;
        fileInput.accept = accept;
        fileInput.value = '';
        fileInput.onchange = () => resolve([...(fileInput.files ?? [])]);
        fileInput.oncancel = () => resolve([]);
        fileInput.click();
    });
}

// ---------- loading ----------

function setPack(bytes: Uint8Array): void {
    const { entries } = readAssetPackIndex(bytes);
    const files = readAssetPack(bytes);
    items = new Map(entries.map(e => [e.path, { path: e.path, data: files.get(e.path) ?? null, stored: e }]));
    packSize = bytes.byteLength;
}

/** Load the client's pack and the overlay's state; false when there is no dev server to ask. */
async function loadProject(): Promise<boolean> {
    const res = await fetch('/api/project').catch(() => null);
    if (!res?.ok || !res.headers.get('content-type')?.includes('json')) return false;
    const state: { edited: { path: string; added: boolean }[]; removed: string[] } = await res.json();
    const pack = await fetch('/api/pack');
    if (!pack.ok) throw new Error(`The client's pack could not be read: ${await pack.text()}`);
    setPack(new Uint8Array(await pack.arrayBuffer()));
    for (const e of state.edited) {
        const item = items.get(e.path);
        if (item) item.status = e.added ? 'added' : 'replaced';
    }
    for (const path of state.removed) items.set(path, { path, data: null, status: 'removed' });
    source = { kind: 'project' };
    return true;
}

async function openProject(): Promise<void> {
    if (!(await confirmDiscard())) return;
    if (!(await loadProject())) {
        setStatus("The client's pack is only reachable through the editor's dev server (npm run editor).", true);
        return;
    }
    selected = null;
    setStatus('Editing the client’s asset pack: every change is saved to packages/asset-overlay at once.');
    render();
}

async function openFile(file: File, handle: FileSystemFileHandle | null): Promise<void> {
    setPack(await readFile(file));
    source = { kind: 'file', name: file.name, handle, dirty: false };
    selected = null;
    setStatus(`Opened ${file.name}: ${items.size} files.`);
    render();
}

async function openFromDisk(): Promise<void> {
    if (!(await confirmDiscard())) return;
    if (window.showOpenFilePicker) {
        const handles = await window.showOpenFilePicker({ types: [{ description: 'HPA asset pack', accept: { 'application/octet-stream': ['.hpa'] } }] }).catch(() => []);
        if (handles[0]) await openFile(await handles[0].getFile(), handles[0]);
    } else {
        const [file] = await pickFiles(false, '.hpa');
        if (file) await openFile(file, null);
    }
}

async function newPack(): Promise<void> {
    if (!(await confirmDiscard())) return;
    items = new Map();
    packSize = writeAssetPack(new Map()).byteLength;
    source = { kind: 'file', name: 'untitled.hpa', handle: null, dirty: false };
    selected = null;
    setStatus('New pack: add files, then save it.');
    render();
}

// ---------- saving (file mode) ----------

function packBytes(): Uint8Array {
    const files = new Map<string, Uint8Array>();
    for (const item of items.values()) if (item.data) files.set(item.path, item.data);
    return writeAssetPack(files);
}

async function save(as: boolean): Promise<void> {
    if (source?.kind !== 'file') return;
    const bytes = packBytes();
    let handle = as ? null : source.handle;
    if (!handle && window.showSaveFilePicker) {
        handle = await window.showSaveFilePicker({ suggestedName: source.name, types: [{ description: 'HPA asset pack', accept: { 'application/octet-stream': ['.hpa'] } }] }).catch(() => null);
        if (!handle) return;
    }
    if (handle) {
        const writable = await handle.createWritable();
        await writable.write(bytes as Uint8Array<ArrayBuffer>);
        await writable.close();
        source = { kind: 'file', name: handle.name, handle, dirty: false };
    } else {
        download(bytes, source.name);
        source.dirty = false;
    }
    // what is saved is now the baseline
    setPack(bytes);
    setStatus(`Saved ${source.name} (${formatSize(bytes.byteLength)}).`);
    render();
}

/** Whether unsaved changes to a pack file (and an unapplied text edit) may be dropped. */
async function confirmDiscard(): Promise<boolean> {
    if (!(await confirmCodeDiscard())) return false;
    if (source?.kind !== 'file' || !source.dirty) return true;
    return ask('Unsaved changes', `${source.name} has changes that are not saved. Discard them?`, 'Discard');
}

/** Whether the text editor's unapplied edit may be dropped. */
async function confirmCodeDiscard(): Promise<boolean> {
    if (!code?.dirty) return true;
    if (!(await ask('Unapplied edit', `${code.path} has edits that are not applied to the pack. Discard them?`, 'Discard'))) return false;
    code.dirty = false;
    return true;
}

// ---------- edits ----------

async function api(method: string, url: string, body?: Uint8Array): Promise<void> {
    const res = await fetch(url, { method, body: body as Uint8Array<ArrayBuffer> | undefined });
    if (!res.ok) throw new Error(await res.text() || `${method} ${url}: HTTP ${res.status}`);
}

function edited(message: string): void {
    if (source?.kind === 'file') source.dirty = true;
    setStatus(message);
    render();
}

async function putFile(path: string, data: Uint8Array): Promise<void> {
    if (source?.kind === 'project') {
        await api('PUT', `/api/file?path=${encodeURIComponent(path)}`, data);
    } else {
        const previous = items.get(path);
        items.set(path, { path, data, status: !previous || previous.status === 'added' ? 'added' : 'replaced' });
    }
}

async function addFiles(files: File[]): Promise<void> {
    if (!source || !files.length || !(await confirmCodeDiscard())) return;
    const area = await chooseArea(files);
    if (!area) return;
    for (const file of files) await putFile(`${area}/${file.name}`, await readFile(file));
    if (source.kind === 'project') await loadProject();
    selected = `${area}/${files[files.length - 1].name}`;
    expanded.add(area);
    edited(`Added ${files.length} file${files.length === 1 ? '' : 's'} to ${area}.`);
}

async function replaceSelected(): Promise<void> {
    if (!selected || !(await confirmCodeDiscard())) return;
    const [file] = await pickFiles(false);
    if (!file) return;
    await putFile(selected, await readFile(file));
    if (source?.kind === 'project') await loadProject();
    edited(`Replaced ${selected} with ${file.name}.`);
}

async function removeSelected(): Promise<void> {
    if (!selected || !(await confirmCodeDiscard())) return;
    const path = selected;
    if (source?.kind === 'project') {
        await api('DELETE', `/api/file?path=${encodeURIComponent(path)}`);
        await loadProject();
    } else {
        items.delete(path);
        selected = null;
    }
    edited(`Removed ${path}.`);
}

async function revertSelected(): Promise<void> {
    if (!selected || source?.kind !== 'project' || !(await confirmCodeDiscard())) return;
    const path = selected;
    await api('POST', `/api/revert?path=${encodeURIComponent(path)}`);
    await loadProject();
    if (!items.has(path)) selected = null;
    edited(`Reverted ${path} to the file the AS3 source provides.`);
}

/** Write the text editor's content into the pack (checked first when it is XML). */
async function applyCode(): Promise<void> {
    if (!code?.dirty) return;
    const { path, view: editor } = code;
    const text = editor.state.doc.toString();
    if (/^\uFEFF?\s*</.test(text)) {
        const error = new DOMParser().parseFromString(text, 'application/xml').querySelector('parsererror');
        if (error && !(await ask('XML is not well-formed', `${path}: ${(error.querySelector('div') ?? error).textContent?.trim() || 'parse error'}. Apply it anyway?`, 'Apply anyway'))) return;
    }
    await putFile(path, new TextEncoder().encode(text));
    code.dirty = false;
    if (source?.kind === 'project') await loadProject();
    edited(`Applied the edit to ${path}${source?.kind === 'file' ? ' (save the pack to keep it)' : ''}.`);
}

// ---------- dialogs ----------

/** A yes/no question in a dialog of the page's own. */
function ask(title: string, message: string, yes: string): Promise<boolean> {
    return new Promise(resolve => {
        const dialog = h('dialog', {},
            h('form', { method: 'dialog' },
                h('h2', { textContent: title }),
                h('div', { textContent: message }),
                h('div', { class: 'buttons' }, h('button', { value: 'no', textContent: 'Cancel' }), h('button', { value: 'yes', textContent: yes }))));
        dialog.addEventListener('close', () => { dialog.remove(); resolve(dialog.returnValue === 'yes'); });
        document.body.append(dialog);
        dialog.showModal();
    });
}

/** The area files are added to: an existing one, or a new one. */
function chooseArea(files: File[]): Promise<string | null> {
    const areas = [...new Set([...items.keys()].map(areaOf))].sort();
    const current = selected ? areaOf(selected) : areas[0];
    return new Promise(resolve => {
        const select = h('select', {}, ...areas.map(a => h('option', { value: a, textContent: a, selected: a === current })), h('option', { value: '', textContent: 'New area…', selected: !areas.length }));
        const name = h('input', { placeholder: 'area name (letters, digits, - and _)', pattern: '[\\w-]+', hidden: areas.length > 0 });
        select.onchange = () => { name.hidden = select.value !== ''; if (!name.hidden) name.focus(); };
        const form = h('form', { method: 'dialog' },
            h('h2', { textContent: `Add ${files.length} file${files.length === 1 ? '' : 's'}` }),
            h('div', { class: 'files', textContent: files.map(f => f.name).join(', ') }),
            h('label', {}, 'Area ', select), name,
            h('div', { class: 'buttons' }, h('button', { value: 'cancel', textContent: 'Cancel', formNoValidate: true }), h('button', { value: 'add', textContent: 'Add' })));
        const dialog = h('dialog', {}, form);
        dialog.addEventListener('close', () => {
            dialog.remove();
            const area = select.value || name.value.trim();
            resolve(dialog.returnValue === 'add' && /^[\w-]+$/.test(area) ? area : null);
        });
        document.body.append(dialog);
        dialog.showModal();
    });
}

// ---------- rendering ----------

function visiblePaths(): string[] {
    const f = filter.toLowerCase();
    return [...items.keys()].filter(p => !f || p.toLowerCase().includes(f)).sort();
}

function renderTree(): void {
    const byArea = new Map<string, string[]>();
    for (const path of visiblePaths()) {
        const area = areaOf(path);
        byArea.get(area)?.push(path) ?? byArea.set(area, [path]);
    }
    tree.replaceChildren(...[...byArea].map(([area, paths]) => {
        const rows = paths.map(path => {
            const item = items.get(path)!;
            const row = h('div', { class: `row${path === selected ? ' selected' : ''}${item.status === 'removed' ? ' removed' : ''}`, title: path },
                h('span', { class: 'name', textContent: nameOf(path) }),
                item.status && item.status !== 'removed' && h('span', { class: `badge ${item.status}`, textContent: item.status }),
                h('span', { class: 'size', textContent: item.data ? formatSize(item.data.byteLength) : '' }));
            row.onclick = () => void select(path);
            return row;
        });
        const head = h('div', { class: 'area-head' }, h('span', { textContent: area }), h('span', { class: 'count', textContent: String(paths.length) }));
        const el = h('div', { class: `area${expanded.has(area) || filter ? '' : ' collapsed'}` }, head, h('div', { class: 'rows' }, ...rows));
        head.onclick = () => { expanded.has(area) ? expanded.delete(area) : expanded.add(area); el.classList.toggle('collapsed'); };
        return el;
    }));
    if (!items.size) tree.append(h('div', { class: 'empty', textContent: source ? 'No files yet.' : '' }));
    tree.querySelector('.row.selected')?.scrollIntoView({ block: 'nearest' });
}

function renderView(): void {
    // an editor with edits not yet applied stays as it is
    if (code?.dirty && code.path === selected) return;
    code?.view.destroy();
    code = null;
    if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = null; }
    const item = selected ? items.get(selected) : undefined;
    if (!source) {
        view.replaceChildren(h('div', { class: 'empty', textContent: 'Open a pack: the client’s (on the dev server), a .hpa file, or a new one.' }));
        return;
    }
    if (!item) {
        view.replaceChildren(h('div', { class: 'empty', textContent: items.size ? 'Select a file to preview it.' : 'Add files with “Add files…” or drop them here.' }));
        return;
    }
    const project = source.kind === 'project';
    const buttons = [
        item.data && h('button', { textContent: 'Replace…', onclick: () => void run(replaceSelected) }),
        item.data && h('button', { textContent: 'Download', onclick: () => item.data && download(item.data, nameOf(item.path)) }),
        project && item.status && h('button', { textContent: 'Revert', title: 'Undo every edit to this file', onclick: () => void run(revertSelected) }),
        item.data && h('button', { class: 'danger', textContent: 'Remove', onclick: () => void run(removeSelected) }),
    ];
    const facts = h('div', { class: 'facts' },
        h('span', {}, 'area ', h('b', { textContent: areaOf(item.path) })),
        item.data && h('span', {}, 'size ', h('b', { textContent: formatSize(item.data.byteLength) })),
        item.stored && !item.status && h('span', {}, 'stored ', h('b', { textContent: `${formatSize(item.stored.storedLength)} (${item.stored.compression === 'deflate' ? `deflated, ${Math.round(100 * item.stored.storedLength / Math.max(1, item.stored.length))}%` : 'as is'})` })),
        item.status && h('span', {}, 'edit ', h('b', { textContent: item.status === 'removed' ? 'removed from the pack' : item.status })));
    const preview = h('div', { class: 'preview' });
    const head = h('div', { class: 'view-head' }, h('span', { class: 'path', textContent: item.path }), ...buttons);
    view.replaceChildren(head, facts, preview);
    if (!item.data) {
        preview.append(h('div', { class: 'empty', textContent: 'Removed from the pack. Revert puts back the file the AS3 source provides.' }));
        return;
    }
    renderPreview(head, preview, facts, item.path, item.data);
}

/** The text of bytes that are UTF-8 and encode back to exactly the same bytes; null otherwise. */
function textOf(data: Uint8Array): string | null {
    if (data.subarray(0, 4096).includes(0)) return null;
    try {
        const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(data);
        const back = new TextEncoder().encode(text);
        return back.byteLength === data.byteLength && back.every((b, i) => b === data[i]) ? text : null;
    } catch {
        return null;
    }
}

function renderPreview(head: HTMLElement, preview: HTMLElement, facts: HTMLElement, path: string, data: Uint8Array): void {
    const ext = extOf(path);
    if (['png', 'gif', 'jpg', 'jpeg', 'webp'].includes(ext)) {
        previewUrl = URL.createObjectURL(new Blob([data as Uint8Array<ArrayBuffer>], { type: ext === 'jpg' ? 'image/jpeg' : `image/${ext}` }));
        const img = h('img', { src: previewUrl });
        const dims = h('b');
        img.onload = () => {
            dims.textContent = `${img.naturalWidth} × ${img.naturalHeight}`;
            img.style.width = `${img.naturalWidth * zoom}px`;
        };
        const zoomButtons = [1, 2, 4, 8].map(z => h('button', {
            textContent: `${z}×`, class: z === zoom ? 'active' : '',
            onclick: () => { zoom = z; img.style.width = `${img.naturalWidth * z}px`; zoomButtons.forEach((b, i) => b.classList.toggle('active', [1, 2, 4, 8][i] === z)); },
        }));
        facts.append(h('span', {}, 'image ', dims), h('span', { class: 'zoom' }, ...zoomButtons));
        preview.append(h('div', { class: 'image' }, img));
    } else if (['mp3', 'wav', 'ogg'].includes(ext)) {
        previewUrl = URL.createObjectURL(new Blob([data as Uint8Array<ArrayBuffer>]));
        preview.append(h('audio', { src: previewUrl, controls: true }));
    } else if (['ttf', 'otf', 'woff', 'woff2'].includes(ext)) {
        const family = `hpa-font-${++fontCount}`;
        const sample = h('div', { class: 'font-sample' });
        preview.append(sample);
        new FontFace(family, data as Uint8Array<ArrayBuffer>).load().then(face => {
            document.fonts.add(face);
            sample.replaceChildren(...[12, 16, 24, 36].map(size => {
                const line = h('div', { textContent: 'The quick brown fox jumps over the lazy dog 0123456789' });
                line.style.fontFamily = family;
                line.style.fontSize = `${size}px`;
                return line;
            }));
        }, (e: unknown) => sample.replaceChildren(`Not a font this browser can load: ${e instanceof Error ? e.message : String(e)}`));
    } else if (textOf(data) !== null) {
        const text = textOf(data)!;
        const lines = h('b', { textContent: `${text.split('\n').length} lines` });
        facts.append(h('span', {}, 'text ', lines));
        const apply = h('button', { textContent: 'Apply edit', title: 'Write the edited text into the pack (Ctrl+S)', disabled: true, onclick: () => void run(applyCode) });
        const discard = h('button', { textContent: 'Discard edit', disabled: true, onclick: () => { if (code) code.dirty = false; renderView(); } });
        head.insertBefore(discard, head.children[1]);
        head.insertBefore(apply, discard);
        preview.classList.add('code');
        const editor = createCodeEditor(preview, text, {
            xml: /^\uFEFF?\s*</.test(text),
            onChange: () => {
                if (!code) return;
                code.dirty = true;
                apply.disabled = discard.disabled = false;
                lines.textContent = `${code.view.state.doc.lines} lines · edited`;
            },
            onSave: () => void run(applyCode),
        });
        code = { path, view: editor, dirty: false };
    } else if (!data.subarray(0, 4096).includes(0)) {
        // text, but not UTF-8 that would save back unchanged
        preview.append(h('div', { class: 'readonly-note', textContent: 'Not UTF-8 text: shown read-only, so saving cannot change its bytes.' }),
            h('pre', { textContent: new TextDecoder().decode(data.subarray(0, 512 * 1024)) }));
    } else {
        const lines: string[] = [];
        for (let at = 0; at < Math.min(data.byteLength, 4096); at += 16) {
            const row = [...data.subarray(at, at + 16)];
            lines.push(`${at.toString(16).padStart(6, '0')}  ${row.map(b => b.toString(16).padStart(2, '0')).join(' ').padEnd(48)}  ${row.map(b => b >= 32 && b < 127 ? String.fromCharCode(b) : '.').join('')}`);
        }
        preview.append(h('pre', { textContent: lines.join('\n') + (data.byteLength > 4096 ? '\n…' : '') }));
    }
}

function render(): void {
    const file = source?.kind === 'file' ? source : null;
    sourceLabel.replaceChildren(...(!source ? ['No pack open']
        : source.kind === 'project' ? ['Client’s pack ', h('b', { textContent: 'packages/client/src/assets.hpa' }), ' · edits saved to packages/asset-overlay']
        : ['File ', h('b', { textContent: source.name + (source.dirty ? ' •' : '') })]));
    saveButton.disabled = !file || !file.dirty;
    saveAsButton.disabled = !file;
    addButton.disabled = !source;
    const present = [...items.values()].filter(i => i.data);
    const edits = [...items.values()].filter(i => i.status).length;
    totals.textContent = source ? `${present.length} files · ${formatSize(present.reduce((n, i) => n + (i.data?.byteLength ?? 0), 0))} · pack ${formatSize(file?.dirty ? packBytes().byteLength : packSize)}${edits ? ` · ${edits} edited` : ''}` : '';
    document.title = file ? `${file.name}${file.dirty ? ' •' : ''} – Asset editor` : 'Asset editor';
    renderTree();
    renderView();
}

async function select(path: string | null): Promise<void> {
    if (path !== selected && !(await confirmCodeDiscard())) return;
    selected = path;
    // a file chosen while filtering stays in view when the filter is cleared
    if (path) expanded.add(areaOf(path));
    render();
}

// ---------- events ----------

projectButton.onclick = () => void run(openProject);
openButton.onclick = () => void run(openFromDisk);
newButton.onclick = () => void run(newPack);
saveButton.onclick = () => void run(() => save(false));
saveAsButton.onclick = () => void run(() => save(true));
addButton.onclick = () => void run(async () => addFiles(await pickFiles(true)));
search.oninput = () => { filter = search.value.trim(); renderTree(); };

document.addEventListener('keydown', e => {
    // (handled already: the text editor's own keys)
    if (e.defaultPrevented) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        void run(() => code?.dirty ? applyCode() : save(false));
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && document.activeElement !== search && !(document.activeElement instanceof HTMLElement && document.activeElement.closest('.cm-editor')) && !document.querySelector('dialog[open]')) {
        const paths = visiblePaths().filter(p => expanded.has(areaOf(p)) || filter);
        if (!paths.length) return;
        e.preventDefault();
        const at = selected ? paths.indexOf(selected) : -1;
        void select(paths[Math.max(0, Math.min(paths.length - 1, at + (e.key === 'ArrowDown' ? 1 : -1)))]);
    }
});

// drop files to add them; drop a single .hpa file to open it
let dragDepth = 0;
window.addEventListener('dragenter', e => { if (e.dataTransfer?.types.includes('Files')) { dragDepth++; document.body.classList.add('dragging'); } });
window.addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('dragging'); } });
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
    e.preventDefault();
    dragDepth = 0;
    document.body.classList.remove('dragging');
    const files = [...(e.dataTransfer?.files ?? [])];
    if (files.length === 1 && extOf(files[0].name) === 'hpa') void run(async () => { if (await confirmDiscard()) await openFile(files[0], null); });
    else if (source) void run(() => addFiles(files));
    else setStatus('Open a pack first.', true);
});

window.addEventListener('beforeunload', e => { if ((source?.kind === 'file' && source.dirty) || code?.dirty) e.preventDefault(); });

// on the dev server, start on the client's pack
render();
void run(async () => {
    if (await loadProject()) {
        setStatus('Editing the client’s asset pack: every change is saved to packages/asset-overlay at once.');
        render();
    } else {
        setStatus('No dev server: open or create a .hpa file.');
    }
});
