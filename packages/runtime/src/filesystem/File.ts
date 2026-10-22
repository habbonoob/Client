import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IOError } from '@habbo-pixi/runtime/errors/IOError';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ROOTS, files } from './storage';

/**
 * A path in the application's file tree (see storage.ts): the application directory (read-only),
 * application storage and cache. Paths look like 'app-storage:/folder/file.bin'.
 */
export class File extends EventDispatcher {
    #path: string;

    constructor(path: string = null) {
        super();
        this.#path = normalizePath(path ?? ROOTS.storage + '/');
    }

    static get applicationDirectory(): File {
        return new File(ROOTS.application + '/');
    }

    static get applicationStorageDirectory(): File {
        return new File(ROOTS.storage + '/');
    }

    static get cacheDirectory(): File {
        return new File(ROOTS.cache + '/');
    }

    get nativePath(): string {
        return this.#path;
    }

    get url(): string {
        return this.#path;
    }

    get name(): string {
        const p = this.#path.replace(/\/$/, '');
        return p.slice(p.lastIndexOf('/') + 1);
    }

    get extension(): string | null {
        const n = this.name;
        const i = n.lastIndexOf('.');
        return i > 0 ? n.slice(i + 1) : null;
    }

    get parent(): File | null {
        const p = this.#path.replace(/\/$/, '');
        const i = p.lastIndexOf('/');
        if (i < 0 || p.endsWith(':')) return null;
        const up = p.slice(0, i);
        return new File(up.endsWith(':') ? up + '/' : up);
    }

    get exists(): boolean {
        return files.has(this.#key());
    }

    get isDirectory(): boolean {
        return files.isDirectory(this.#key());
    }

    get size(): number {
        return files.read(this.#key())?.length ?? 0;
    }

    /** A file relative to this one ('a/b.txt', '../x'), or an absolute path. */
    resolvePath(path: string): File {
        if (/^[a-z-]+:/.test(path)) return new File(path);
        const base = this.#path.endsWith('/') ? this.#path : this.#path + '/';
        return new File(base + path);
    }

    /** Create this directory and any missing parents. */
    createDirectory(): void {
        this.#writable();
        const parts = this.#key().split('/');
        for (let i = 1; i <= parts.length; i++) {
            const p = parts.slice(0, i).join('/') || '/';
            const key = p.endsWith(':') ? p + '/' : p;
            if (!files.has(key)) files.write(key, null);
            else if (!files.isDirectory(key)) throw new IOError(`A file is in the way of directory ${key}.`);
        }
    }

    deleteFile(): void {
        this.#writable();
        if (!files.has(this.#key()) || this.isDirectory) throw new IOError(`File not found: ${this.#path}`);
        files.remove(this.#key());
    }

    deleteFileAsync(): void {
        try {
            this.deleteFile();
            setTimeout(() => runGuarded(() => this.dispatchEvent(new Event(Event.COMPLETE))), 0);
        } catch (e) {
            setTimeout(() => runGuarded(() => { throw e; }), 0);
        }
    }

    deleteDirectory(deleteDirectoryContents: boolean = false): void {
        this.#writable();
        if (!this.isDirectory) throw new IOError(`Directory not found: ${this.#path}`);
        const inside = files.descendants(this.#key());
        if (inside.length && !deleteDirectoryContents) throw new IOError(`Directory not empty: ${this.#path}`);
        for (const p of inside) files.remove(p);
        files.remove(this.#key());
    }

    getDirectoryListing(): File[] {
        if (!this.isDirectory) return [];
        return files.children(this.#key()).map(p => new File(p));
    }

    /** Move (rename) this file or directory to `newLocation`. */
    moveTo(newLocation: File, overwrite: boolean = false): void {
        this.#writable();
        newLocation.#writable();
        const from = this.#key(), to = newLocation.#key();
        if (!files.has(from)) throw new IOError(`File not found: ${this.#path}`);
        if (files.has(to)) {
            if (!overwrite) throw new IOError(`File exists: ${newLocation.#path}`);
            for (const p of files.descendants(to)) files.remove(p);
            files.remove(to);
        }
        for (const p of files.descendants(from)) {
            files.write(to + p.slice(from.length), files.read(p));
            files.remove(p);
        }
        files.write(to, files.read(from));
        files.remove(from);
        this.#path = newLocation.#path;
    }

    /** @internal the storage key */
    key(): string {
        return this.#key();
    }

    #key(): string {
        const p = this.#path;
        return p.endsWith(':/') ? p : p.replace(/\/$/, '');
    }

    #writable(): void {
        if (this.#path.startsWith(ROOTS.application)) throw new IOError(`The application directory is read-only: ${this.#path}`);
    }

    override toString(): string {
        return '[object File]';
    }
}

function normalizePath(path: string): string {
    const m = /^([a-z-]+:)\/*(.*)$/.exec(path);
    const root = m ? m[1] : ROOTS.storage;
    const rest = (m ? m[2] : path).split('/');
    const out: string[] = [];
    for (const part of rest) {
        if (part === '' || part === '.') continue;
        if (part === '..') out.pop();
        else out.push(part);
    }
    return `${root}/${out.join('/')}${path.endsWith('/') && out.length ? '/' : ''}`;
}
