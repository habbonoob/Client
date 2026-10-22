// The client's asset pack, for the editor's project mode: served under /api/ by the editor's dev
// server (vite.config.ts) and by the desktop app (electron/main.ts). Every edit is kept in the
// asset overlay (packages/asset-overlay), so the transpiler makes it again, and applied to the pack
// at once.
//  - GET  /api/project: the overlay's state ({ edited: [{ path, added }], removed: [path] })
//  - GET  /api/pack: the pack
//  - PUT  /api/file?path=…: add or replace a file (the request body)
//  - DELETE /api/file?path=…: remove a file
//  - POST /api/revert?path=…: undo every edit to a file

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readAssetPack, writeAssetPack } from '../runtime/src/embed/assetPack.ts';
import { overlayFiles, putOverlayFile, removedPaths, removeOverlayFile, revertOverlayFile, sourceOf } from '../asset-overlay/assetOverlay.ts';

const packFile = fileURLToPath(new URL('../client/src/assets.hpa', import.meta.url));
// touched after an edit: the client's dev server reloads the page (see its vite.config.ts)
const reloadMarker = fileURLToPath(new URL('../client/.transpiled', import.meta.url));
// the AS3 tree the client is transpiled from (as in the client's transpile task): the originals
// an edit can be reverted to
const as3Root = fileURLToPath(new URL('../../../win63-pre-rename/src', import.meta.url));

export interface ApiResponse { status: number; type?: string; body?: Uint8Array | string }

/** Change the client's pack in place, as the next transpile will make it with the overlay. */
function updatePack(change: (files: Map<string, Uint8Array>) => void): void {
    const files: Map<string, Uint8Array> = readAssetPack(readFileSync(packFile));
    change(files);
    writeFileSync(packFile, writeAssetPack(files));
    writeFileSync(reloadMarker, `${Date.now()}\n`);
}

/** Answer an /api/ request; null when the URL is not one. */
export function projectApi(method: string, url: URL, body: () => Promise<Uint8Array>): Promise<ApiResponse> | null {
    if (!url.pathname.startsWith('/api/')) return null;
    const path = url.searchParams.get('path') ?? '';
    const answer = async (): Promise<ApiResponse> => {
        if (url.pathname === '/api/project' && method === 'GET') {
            const edited = [...overlayFiles().keys()].sort().map(p => ({ path: p, added: !existsSync(sourceOf(as3Root, p)) }));
            return { status: 200, type: 'application/json', body: JSON.stringify({ edited, removed: removedPaths() }) };
        }
        if (url.pathname === '/api/pack' && method === 'GET') {
            return { status: 200, type: 'application/octet-stream', body: readFileSync(packFile) };
        }
        if (url.pathname === '/api/file' && method === 'PUT') {
            const data = await body();
            putOverlayFile(path, data);
            updatePack(files => files.set(path, data));
            return { status: 200 };
        }
        if (url.pathname === '/api/file' && method === 'DELETE') {
            removeOverlayFile(path, existsSync(sourceOf(as3Root, path)));
            updatePack(files => files.delete(path));
            return { status: 200 };
        }
        if (url.pathname === '/api/revert' && method === 'POST') {
            revertOverlayFile(path);
            const original = sourceOf(as3Root, path);
            updatePack(files => existsSync(original) ? files.set(path, readFileSync(original)) : files.delete(path));
            return { status: 200 };
        }
        return { status: 404, body: 'no such API' };
    };
    return answer().catch((e: unknown) => ({ status: 400, body: e instanceof Error ? e.message : String(e) }));
}
