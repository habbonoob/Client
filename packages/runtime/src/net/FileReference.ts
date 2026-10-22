import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';

/** A file the user saves (as a browser download). */
export class FileReference extends EventDispatcher {
    #name: string | null = null;
    #size = 0;

    get name(): string | null {
        return this.#name;
    }

    get size(): number {
        return this.#size;
    }

    /** Offer `data` (a ByteArray, or text) to the user as a download named `defaultFileName`. */
    save(data: any, defaultFileName: string = null): void {
        const bytes = data instanceof ByteArray ? byteArrayAccess.view(data).slice() : new TextEncoder().encode(String(data));
        const name = defaultFileName ?? 'download';
        const url = URL.createObjectURL(new Blob([bytes]));
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
        this.#name = name;
        this.#size = bytes.length;
        this.dispatchEvent(new Event(Event.COMPLETE));
    }
}
