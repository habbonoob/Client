// The application's files: an in-memory tree (so File and FileStream can work synchronously, as
// the client expects), loaded from IndexedDB before the client starts and written back to it in
// the background after every change.

const DB = 'habbo-files';
const STORE = 'files';

/** path → file bytes, or null for a directory. Paths are 'root:/a/b' with no trailing slash. */
const entries = new Map<string, Uint8Array | null>();
let db: IDBDatabase | null = null;

export const ROOTS = { application: 'app:', storage: 'app-storage:', cache: 'cache:' } as const;

function open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

/** Load the stored files; call (and await) before the client starts. */
export async function loadFileSystem(): Promise<void> {
    db = await open();
    await new Promise<void>((resolve, reject) => {
        const tx = db!.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).openCursor();
        req.onsuccess = () => {
            const c = req.result;
            if (!c) { resolve(); return; }
            entries.set(String(c.key), c.value instanceof Uint8Array ? c.value : null);
            c.continue();
        };
        req.onerror = () => reject(req.error);
    });
    for (const root of [ROOTS.storage, ROOTS.cache, ROOTS.application]) if (!entries.has(root + '/')) entries.set(root + '/', null);
}

/**
 * Install the application directory: the files the app was installed with (path in the directory,
 * and the URL it is served from). Call (and await) before the client starts; they are read-only and
 * not stored. The app's SWF libraries ship as their HAB conversion (as js-client's do): X.hab is
 * also the directory's X.swf, which is the name the client looks for and loads (Loader reads it).
 */
export async function loadApplicationFiles(list: { path: string; url: string }[]): Promise<void> {
    const listed = new Set(list.map(f => f.path));
    await Promise.all(list.map(async ({ path, url }) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Application file ${path} is missing (HTTP ${res.status}).`);
        const data = new Uint8Array(await res.arrayBuffer());
        const parts = path.split('/');
        for (let i = 1; i < parts.length; i++) entries.set(`${ROOTS.application}/${parts.slice(0, i).join('/')}`, null);
        entries.set(`${ROOTS.application}/${path}`, data);
        const swf = path.replace(/\.hab$/i, '.swf');
        if (swf !== path && !listed.has(swf)) entries.set(`${ROOTS.application}/${swf}`, data);
    }));
}

function persist(path: string, value: Uint8Array | null | undefined): void {
    if (path.startsWith(ROOTS.application)) return;
    if (!db) return;
    const tx = db.transaction(STORE, 'readwrite');
    if (value === undefined) tx.objectStore(STORE).delete(path);
    else tx.objectStore(STORE).put(value, path);
}

export const files = {
    has: (path: string) => entries.has(path),
    isDirectory: (path: string) => entries.has(path) && entries.get(path) === null,
    read: (path: string) => entries.get(path) ?? null,
    write(path: string, data: Uint8Array | null): void {
        entries.set(path, data);
        persist(path, data);
    },
    remove(path: string): void {
        entries.delete(path);
        persist(path, undefined);
    },
    /** Direct children of a directory. */
    children(dir: string): string[] {
        const prefix = dir.endsWith('/') ? dir : dir + '/';
        const out: string[] = [];
        for (const p of entries.keys()) {
            if (p === prefix || !p.startsWith(prefix)) continue;
            const rest = p.slice(prefix.length);
            if (rest && !rest.includes('/')) out.push(p);
        }
        return out;
    },
    /** Everything under a directory (for deletes and moves). */
    descendants(dir: string): string[] {
        const prefix = dir.endsWith('/') ? dir : dir + '/';
        return [...entries.keys()].filter(p => p.startsWith(prefix) && p !== prefix);
    },
};
