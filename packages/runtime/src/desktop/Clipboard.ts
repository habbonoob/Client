/**
 * The system clipboard. Writing text goes through the browser's asynchronous clipboard API (the
 * call returns at once; the browser may refuse without a user gesture). Reading is not possible
 * synchronously in a browser, so getData() answers only for what this page itself put there.
 */
export class Clipboard {
    static readonly #general = new Clipboard();
    #last = new Map<string, unknown>();

    static get generalClipboard(): Clipboard {
        return Clipboard.#general;
    }

    get formats(): string[] {
        return [...this.#last.keys()];
    }

    /** Put `data` on the clipboard in `format` (text formats reach the system clipboard). */
    setData(format: string, data: unknown, serializable: boolean = true): boolean {
        void serializable;
        this.#last.set(format, data);
        if (format === 'air:text' || format === 'air:html' || format === 'air:url') void navigator.clipboard?.writeText(String(data)).catch(() => {});
        return true;
    }

    getData(format: string, transferMode: string = 'originalPreferred'): unknown {
        void transferMode;
        return this.#last.get(format) ?? null;
    }

    hasFormat(format: string): boolean {
        return this.#last.has(format);
    }

    clear(): void {
        this.#last.clear();
        void navigator.clipboard?.writeText('').catch(() => {});
    }

    clearData(format: string): void {
        this.#last.delete(format);
    }
}
