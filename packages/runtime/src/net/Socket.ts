import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { IOError } from '@habbo-pixi/runtime/errors/IOError';
import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';

/**
 * A two-way byte stream to a server, over a WebSocket. Writes go to an output buffer that flush()
 * sends as one binary message; everything received is appended to an input buffer read through
 * the read methods, announced with socketData events. The byte stream is the same as over TCP, so
 * length-prefixed protocols reassemble their packets exactly as before.
 * Events: connect, socketData, close, ioError.
 */
export class Socket extends EventDispatcher {
    timeout = 20000;
    #ws: WebSocket | null = null;
    #input = new ByteArray();
    #output = new ByteArray();
    #endian = 'bigEndian';
    #timer: ReturnType<typeof setTimeout> | null = null;

    constructor(host: string = null, port: number = 0) {
        super();
        if (host != null && port !== 0) this.connect(host, port);
    }

    get connected(): boolean {
        return this.#ws?.readyState === WebSocket.OPEN;
    }

    get bytesAvailable(): number {
        return this.#input.bytesAvailable;
    }

    get bytesPending(): number {
        return this.#output.length;
    }

    get endian(): string {
        return this.#endian;
    }

    set endian(value: string) {
        this.#endian = value;
        this.#input.endian = value;
        this.#output.endian = value;
    }

    connect(host: string, port: number): void {
        this.close();
        this.#input = new ByteArray();
        this.#output = new ByteArray();
        this.endian = this.#endian;
        // "host?TCP_NODELAY" asks for Nagle's algorithm off; a WebSocket sends each message as it comes
        const ws = new WebSocket(runtimeConfig.socketUrl(host.replace(/\?TCP_NODELAY$/i, ''), port));
        ws.binaryType = 'arraybuffer';
        this.#ws = ws;
        this.#timer = setTimeout(() => runGuarded(() => {
            if (ws.readyState !== WebSocket.CONNECTING) return;
            this.#drop();
            this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, `Socket connection timed out: ${host}:${port}`));
        }), this.timeout);
        ws.addEventListener('open', () => runGuarded(() => {
            this.#clearTimer();
            this.dispatchEvent(new Event(Event.CONNECT));
        }));
        ws.addEventListener('message', m => runGuarded(() => {
            const data = new Uint8Array(m.data as ArrayBuffer);
            // append at the end, keeping the read position where the reader left it
            const pos = this.#input.position;
            this.#input.position = this.#input.length;
            this.#input.writeBytes(byteArrayAccess.from(data));
            this.#input.position = pos;
            this.dispatchEvent(new ProgressEvent(ProgressEvent.SOCKET_DATA, false, false, data.length, 0));
        }));
        ws.addEventListener('error', () => runGuarded(() => {
            if (this.#ws !== ws) return;
            this.#clearTimer();
            if (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.CLOSED) {
                this.#drop();
                this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, `Socket error: ${host}:${port}`));
            }
        }));
        ws.addEventListener('close', () => runGuarded(() => {
            if (this.#ws !== ws) return;
            this.#clearTimer();
            this.#ws = null;
            this.dispatchEvent(new Event(Event.CLOSE));
        }));
    }

    /** Close the connection (no close event, as when the application closes it itself). */
    close(): void {
        this.#drop();
    }

    /** Send everything written since the last flush. */
    flush(): void {
        if (!this.connected) throw new IOError('Operation attempted on invalid socket.');
        if (this.#output.length === 0) return;
        this.#ws!.send(byteArrayAccess.view(this.#output).slice());
        this.#output = new ByteArray();
        this.#output.endian = this.#endian;
    }

    // ---------- reading ----------

    readBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void { this.#input.readBytes(bytes, offset, length); this.#compact(); }
    readBoolean(): boolean { return this.#read(() => this.#input.readBoolean()); }
    readByte(): number { return this.#read(() => this.#input.readByte()); }
    readUnsignedByte(): number { return this.#read(() => this.#input.readUnsignedByte()); }
    readShort(): number { return this.#read(() => this.#input.readShort()); }
    readUnsignedShort(): number { return this.#read(() => this.#input.readUnsignedShort()); }
    readInt(): number { return this.#read(() => this.#input.readInt()); }
    readUnsignedInt(): number { return this.#read(() => this.#input.readUnsignedInt()); }
    readFloat(): number { return this.#read(() => this.#input.readFloat()); }
    readDouble(): number { return this.#read(() => this.#input.readDouble()); }
    readUTF(): string { return this.#read(() => this.#input.readUTF()); }
    readUTFBytes(length: number): string { return this.#read(() => this.#input.readUTFBytes(length)); }
    readMultiByte(length: number, charSet: string): string { return this.#read(() => this.#input.readMultiByte(length, charSet)); }
    readObject(): any { return this.#read(() => this.#input.readObject()); }

    // ---------- writing ----------

    writeBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void { this.#output.writeBytes(bytes, offset, length); }
    writeBoolean(value: boolean): void { this.#output.writeBoolean(value); }
    writeByte(value: number): void { this.#output.writeByte(value); }
    writeShort(value: number): void { this.#output.writeShort(value); }
    writeInt(value: number): void { this.#output.writeInt(value); }
    writeUnsignedInt(value: number): void { this.#output.writeUnsignedInt(value); }
    writeFloat(value: number): void { this.#output.writeFloat(value); }
    writeDouble(value: number): void { this.#output.writeDouble(value); }
    writeUTF(value: string): void { this.#output.writeUTF(value); }
    writeUTFBytes(value: string): void { this.#output.writeUTFBytes(value); }
    writeMultiByte(value: string, charSet: string): void { this.#output.writeMultiByte(value, charSet); }
    writeObject(object: any): void { this.#output.writeObject(object); }

    // ---------- internals ----------

    #read<T>(fn: () => T): T {
        const v = fn();
        this.#compact();
        return v;
    }

    /** Drop consumed bytes once everything received has been read. */
    #compact(): void {
        if (this.#input.bytesAvailable === 0 && this.#input.length > 0) {
            this.#input = new ByteArray();
            this.#input.endian = this.#endian;
        }
    }

    #drop(): void {
        this.#clearTimer();
        const ws = this.#ws;
        this.#ws = null;
        if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) ws.close();
    }

    #clearTimer(): void {
        if (this.#timer !== null) clearTimeout(this.#timer);
        this.#timer = null;
    }
}
