import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import { request } from './http';
import type { URLRequest } from './URLRequest';

/**
 * Downloads a URL and makes the bytes readable as they arrive: each progress event means more is
 * available through the read methods (bytesAvailable says how much).
 */
export class URLStream extends EventDispatcher {
    #buffer = new ByteArray();
    #abort: (() => void) | null = null;

    get connected(): boolean {
        return this.#abort !== null;
    }

    get bytesAvailable(): number {
        return this.#buffer.bytesAvailable;
    }

    get endian(): string {
        return this.#buffer.endian;
    }

    set endian(value: string) {
        this.#buffer.endian = value;
    }

    get objectEncoding(): number {
        return this.#buffer.objectEncoding;
    }

    set objectEncoding(value: number) {
        this.#buffer.objectEncoding = value;
    }

    load(req: URLRequest): void {
        this.close();
        this.#buffer = new ByteArray();
        this.#abort = request(req, {
            open: () => runGuarded(() => this.dispatchEvent(new Event(Event.OPEN))),
            status: r => runGuarded(() => this.dispatchEvent(new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, false, false, r.status, r.redirected))),
            chunk: (data, loaded, total) => runGuarded(() => {
                // append without moving the read position
                const pos = this.#buffer.position;
                this.#buffer.position = this.#buffer.length;
                this.#buffer.writeBytes(byteArrayAccess.from(data));
                this.#buffer.position = pos;
                this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, loaded, total));
            }),
            done: () => runGuarded(() => {
                this.#abort = null;
                this.dispatchEvent(new Event(Event.COMPLETE));
            }),
            error: message => runGuarded(() => {
                this.#abort = null;
                this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, message));
            }),
        });
    }

    close(): void {
        this.#abort?.();
        this.#abort = null;
    }

    readBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void { this.#buffer.readBytes(bytes, offset, length); }
    readBoolean(): boolean { return this.#buffer.readBoolean(); }
    readByte(): number { return this.#buffer.readByte(); }
    readUnsignedByte(): number { return this.#buffer.readUnsignedByte(); }
    readShort(): number { return this.#buffer.readShort(); }
    readUnsignedShort(): number { return this.#buffer.readUnsignedShort(); }
    readInt(): number { return this.#buffer.readInt(); }
    readUnsignedInt(): number { return this.#buffer.readUnsignedInt(); }
    readFloat(): number { return this.#buffer.readFloat(); }
    readDouble(): number { return this.#buffer.readDouble(); }
    readUTF(): string { return this.#buffer.readUTF(); }
    readUTFBytes(length: number): string { return this.#buffer.readUTFBytes(length); }
    readMultiByte(length: number, charSet: string): string { return this.#buffer.readMultiByte(length, charSet); }
    readObject(): any { return this.#buffer.readObject(); }
}
