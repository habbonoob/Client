// Hand edits to the client's asset pack (src/assets.hpa), kept apart from the generated pack:
// asset-overlay/<pack path> adds or replaces a file (asset-overlay/catalog/icon.png), and
// asset-overlay/removed.json lists the pack paths taken out. The asset editors (packages/editor,
// packages/ui-editor) write it.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const overlayDir = fileURLToPath(new URL('./asset-overlay/', import.meta.url));
const removedFile = join(overlayDir, 'removed.json');

/**
 * A pack path ('<area>/<file>'), checked: an area of letters, digits, - and _, and a file name
 * that is not '.' or '..', so it cannot lead out of the overlay folder.
 */
function checked(path: string): string {
    if (!/^[\w-]+\/(?!\.\.?$)[\w.@ -]+$/.test(path)) throw new Error(`Not an asset pack path: ${path}`);
    return path;
}

/** The pack paths removed from the pack. */
export function removedPaths(): string[] {
    return existsSync(removedFile) ? JSON.parse(readFileSync(removedFile, 'utf8')) : [];
}

function setRemoved(paths: string[]): void {
    mkdirSync(overlayDir, { recursive: true });
    if (paths.length) writeFileSync(removedFile, JSON.stringify([...new Set(paths)].sort(), null, 1) + '\n');
    else rmSync(removedFile, { force: true });
}

/** The files the overlay adds or replaces, by pack path. */
export function overlayFiles(): Map<string, Uint8Array> {
    const files = new Map<string, Uint8Array>();
    if (!existsSync(overlayDir)) return files;
    const walk = (dir: string) => {
        for (const e of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, e.name);
            if (e.isDirectory()) walk(full);
            else if (full !== removedFile) files.set(relative(overlayDir, full).split('\\').join('/'), readFileSync(full));
        }
    };
    walk(overlayDir);
    return files;
}

/** Apply the overlay to a pack's files (by pack path). */
export function applyOverlay(files: Map<string, Uint8Array>): void {
    for (const path of removedPaths()) files.delete(path);
    for (const [path, data] of overlayFiles()) files.set(path, data);
}

/** Add or replace a file. */
export function putOverlayFile(path: string, data: Uint8Array): void {
    const to = join(overlayDir, checked(path));
    mkdirSync(dirname(to), { recursive: true });
    writeFileSync(to, data);
    setRemoved(removedPaths().filter(p => p !== path));
}

/** Take a file out: its overlay copy goes, and a file the AS3 tree provides is listed as removed. */
export function removeOverlayFile(path: string, fromSource: boolean): void {
    dropOverlayFile(checked(path));
    if (fromSource) setRemoved([...removedPaths(), path]);
}

/** Undo every edit to a file: it is again what the AS3 tree provides (or absent, if it was added). */
export function revertOverlayFile(path: string): void {
    dropOverlayFile(checked(path));
    setRemoved(removedPaths().filter(p => p !== path));
}

function dropOverlayFile(path: string): void {
    const file = join(overlayDir, path);
    if (!existsSync(file)) return;
    rmSync(file);
    const dir = dirname(file);
    if (dir !== overlayDir.replace(/[\\/]$/, '') && statSync(dir).isDirectory() && !readdirSync(dir).length) rmSync(dir, { recursive: true });
}

/** Where the AS3 tree keeps the file a pack path came from (the pack path without its area). */
export function sourceOf(as3Root: string, path: string): string {
    return join(as3Root, '_assets', checked(path).slice(path.indexOf('/') + 1));
}
