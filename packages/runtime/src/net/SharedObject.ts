import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';

const PREFIX = 'sharedobject:';
const open = new Map<string, SharedObject>();

/**
 * Locally stored data that survives between sessions, kept in localStorage. `data` holds any
 * values (serialized with AMF3, so dates, byte arrays and nested objects come back as they went
 * in); flush() writes it, as does leaving the page.
 */
export class SharedObject extends EventDispatcher {
    readonly #key: string;
    #data: Record<string, any>;

    private constructor(key: string) {
        super();
        this.#key = key;
        this.#data = SharedObject.#load(key);
    }

    /** The shared object `name` (in `localPath`), created empty the first time. */
    static getLocal(name: string, localPath: string = null, secure: boolean = false): SharedObject {
        void secure;
        const key = `${PREFIX}${localPath ?? location.pathname}:${name}`;
        let so = open.get(key);
        if (!so) open.set(key, so = new SharedObject(key));
        return so;
    }

    get data(): Record<string, any> {
        return this.#data;
    }

    /** Size of the stored data in bytes. */
    get size(): number {
        return SharedObject.#encode(this.#data).length;
    }

    /** Write the data to storage; returns 'flushed'. */
    flush(minDiskSpace: number = 0): string {
        void minDiskSpace;
        const bytes = SharedObject.#encode(this.#data);
        let s = '';
        for (const b of bytes) s += String.fromCharCode(b);
        localStorage.setItem(this.#key, btoa(s));
        return 'flushed';
    }

    /** Remove all data, in memory and in storage. */
    clear(): void {
        this.#data = {};
        localStorage.removeItem(this.#key);
    }

    close(): void {
        this.flush();
    }

    static #encode(data: Record<string, any>): Uint8Array {
        const ba = new ByteArray();
        ba.writeObject(data);
        return byteArrayAccess.view(ba).slice();
    }

    static #load(key: string): Record<string, any> {
        const stored = localStorage.getItem(key);
        if (!stored) return {};
        const s = atob(stored);
        const bytes = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
        const value = byteArrayAccess.from(bytes).readObject();
        return value && typeof value === 'object' ? value : {};
    }

    static {
        window.addEventListener('pagehide', () => { for (const so of open.values()) so.flush(); });
    }
}
