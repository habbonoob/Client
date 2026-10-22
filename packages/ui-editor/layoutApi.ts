// Saving layouts: served under /api/ by the editor's dev server (vite.config.ts). A saved layout is kept in the
// asset overlay (packages/asset-overlay), so the next transpile of the client makes it again, and is written into
// client-next's asset pack at once, so the client and the editor load it from then on.
//  - GET  /api/pack: client-next's asset pack as it is now (the page loads its skins, fonts and layouts from it)
//  - GET  /api/edited: the pack paths the overlay changes (JSON array)
//  - PUT  /api/layout?path=…: save a layout (the request body, the layout's bytes)
//  - POST /api/revert?path=…: undo every edit to a layout; answers with the original bytes
//  - GET  /api/new: the new layouts (not the client's: saved in layouts/ here), as [{ name, text }]
//  - PUT  /api/new?name=…: save a new layout (the request body, its XML)
//  - POST /api/usage: where the client's source names things (body: JSON array of strings, layout and element
//    names; answers { files: { string: [file, …] }, importers: { file: [file, …] } }: the files each string is a
//    literal in, and the files that import each of those). Component classes (…Com.ts) are left out: they declare
//    every asset rather than use one.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readAssetPack, writeAssetPack } from '../runtime/src/embed/assetPack.ts';
import { overlayFiles, putOverlayFile, revertOverlayFile, sourceOf } from '../asset-overlay/assetOverlay.ts';

const packFile = fileURLToPath(new URL('../client-next/src/assets.hpa', import.meta.url));
// touched after a save: client-next's dev server reloads the page (see its vite.config.ts)
const reloadMarker = fileURLToPath(new URL('../client-next/.transpiled', import.meta.url));
// the AS3 tree client-next is transpiled from (its transpile task): the originals a layout reverts to
const as3Root = fileURLToPath(new URL('../../../Documents/WIN63-202609161723-93809945/src', import.meta.url));
// layouts made in the editor, one <name>.xml each
const newLayoutDir = fileURLToPath(new URL('./layouts/', import.meta.url));
// client-next's source, searched for where each layout is used
const clientSrc = fileURLToPath(new URL('../client-next/src/', import.meta.url));

export interface ApiResponse { status: number; type?: string; body?: Uint8Array | string }

/** Change the pack in place, as the next transpile will make it with the overlay. */
function updatePack(change: (files: Map<string, Uint8Array>) => void): void {
    const files: Map<string, Uint8Array> = readAssetPack(readFileSync(packFile));
    change(files);
    writeFileSync(packFile, writeAssetPack(files));
    writeFileSync(reloadMarker, `${Date.now()}\n`);
}

/** A pack path the API may write: an existing layout file in the pack, nothing outside it. */
function checkedPath(path: string): string {
    if (!/^[\w-]+\/[\w.-]+\.bin$/.test(path)) throw new Error(`Not a layout path: ${path}`);
    if (!readAssetPack(readFileSync(packFile)).has(path)) throw new Error(`The pack has no ${path}`);
    return path;
}

/** The client's source as the usage search needs it (read once): its name-like string literals, and its imports. */
interface SourceIndex {
    /** Each string literal that could be a name, and the files it is in. */
    literals: Map<string, Set<string>>;
    /** Each file, and the files that import it. */
    importers: Map<string, Set<string>>;
}

let index: SourceIndex | null = null;

function sourceIndex(): SourceIndex {
    if (index) return index;
    const found: SourceIndex = { literals: new Map(), importers: new Map() };
    const add = (map: Map<string, Set<string>>, key: string, value: string) => {
        let set = map.get(key);
        if (!set) map.set(key, set = new Set());
        set.add(value);
    };
    const texts = new Map<string, string>();
    const walk = (dir: string) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const path = join(dir, entry.name);
            if (entry.isDirectory()) walk(path);
            else if (entry.name.endsWith('.ts') && !entry.name.endsWith('Com.ts')) texts.set(path.slice(clientSrc.length).split(sep).join('/'), readFileSync(path, 'utf-8'));
        }
    };
    walk(clientSrc);
    // modules that import each other in a loop are imported through a group index (X.group.ts), which re-exports
    // them: an import of a name from a group is an import of the module the group has it from
    const reexports = new Map<string, Map<string, string>>();
    for (const [file, text] of texts) {
        if (!file.endsWith('.group.ts')) continue;
        const names = new Map<string, string>();
        for (const m of text.matchAll(/export \{([^}]+)\} from '@\/([^']+)'/g)) {
            for (const name of m[1].split(',')) names.set(name.trim().split(/\s+as\s+/).pop()!, `${m[2]}.ts`);
        }
        reexports.set(file, names);
    }
    for (const [file, text] of texts) {
        if (file.endsWith('.group.ts')) continue;
        for (const m of text.matchAll(/"([A-Za-z][\w-]*)"/g)) add(found.literals, m[1], file);
        for (const m of text.matchAll(/import (?:type )?\{([^}]+)\} from '@\/([^']+)'/g)) {
            const target = `${m[2]}.ts`;
            const group = reexports.get(target);
            if (!group) {
                add(found.importers, target, file);
                continue;
            }
            for (const name of m[1].split(',')) {
                const module = group.get(name.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]);
                if (module) add(found.importers, module, file);
            }
        }
    }
    return index = found;
}

/** A new layout's name: what an asset name may be. */
function checkedName(name: string): string {
    if (!/^[A-Za-z][\w-]{0,79}$/.test(name)) throw new Error(`Not a layout name: ${name}`);
    return name;
}

/** Answer an /api/ request; null when the URL is not one. */
export function layoutApi(method: string, url: URL, body: () => Promise<Uint8Array>): Promise<ApiResponse> | null {
    if (!url.pathname.startsWith('/api/')) return null;
    const answer = async (): Promise<ApiResponse> => {
        if (url.pathname === '/api/pack' && method === 'GET') {
            return { status: 200, type: 'application/octet-stream', body: readFileSync(packFile) };
        }
        if (url.pathname === '/api/edited' && method === 'GET') {
            return { status: 200, type: 'application/json', body: JSON.stringify([...overlayFiles().keys()].sort()) };
        }
        if (url.pathname === '/api/layout' && method === 'PUT') {
            const path = checkedPath(url.searchParams.get('path') ?? '');
            const data = await body();
            putOverlayFile(path, data);
            updatePack(files => files.set(path, data));
            return { status: 200 };
        }
        if (url.pathname === '/api/revert' && method === 'POST') {
            const path = checkedPath(url.searchParams.get('path') ?? '');
            const original = sourceOf(as3Root, path);
            if (!existsSync(original)) throw new Error(`No original for ${path} in the AS3 tree`);
            revertOverlayFile(path);
            const data = readFileSync(original);
            updatePack(files => files.set(path, data));
            return { status: 200, type: 'application/octet-stream', body: data };
        }
        if (url.pathname === '/api/new' && method === 'GET') {
            const files = existsSync(newLayoutDir) ? readdirSync(newLayoutDir).filter(f => f.endsWith('.xml')).sort() : [];
            const layouts = files.map(f => ({ name: f.slice(0, -4), text: readFileSync(join(newLayoutDir, f), 'utf-8') }));
            return { status: 200, type: 'application/json', body: JSON.stringify(layouts) };
        }
        if (url.pathname === '/api/new' && method === 'PUT') {
            const name = checkedName(url.searchParams.get('name') ?? '');
            mkdirSync(newLayoutDir, { recursive: true });
            writeFileSync(join(newLayoutDir, `${name}.xml`), await body());
            return { status: 200 };
        }
        if (url.pathname === '/api/usage' && method === 'POST') {
            const strings = JSON.parse(new TextDecoder().decode(await body())) as string[];
            const source = sourceIndex();
            const files: Record<string, string[]> = {};
            const importers: Record<string, string[]> = {};
            for (const s of strings) {
                const where = source.literals.get(s);
                if (!where) continue;
                files[s] = [...where].sort();
                for (const file of where) importers[file] ??= [...source.importers.get(file) ?? []].sort();
            }
            return { status: 200, type: 'application/json', body: JSON.stringify({ files, importers }) };
        }
        return { status: 404, body: 'no such API' };
    };
    return answer().catch((e: unknown) => ({ status: 400, body: e instanceof Error ? e.message : String(e) }));
}
