import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { IOError } from '@habbo-pixi/runtime/errors/IOError';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import type { File } from './File';
import { files } from './storage';

/**
 * Reads and writes a file's bytes. open() is synchronous; openAsync() does the same and then
 * dispatches complete (or ioError). Written data is saved when the stream is closed.
 */
export class FileStream extends EventDispatcher {
    #file: File | null = null;
    #mode = 'read';
    #data = new ByteArray();

    get bytesAvailable(): number {
        return this.#data.bytesAvailable;
    }

    get position(): number {
        return this.#data.position;
    }

    set position(value: number) {
        this.#data.position = value;
    }

    get endian(): string {
        return this.#data.endian;
    }

    set endian(value: string) {
        this.#data.endian = value;
    }

    open(file: File, fileMode: string): void {
        this.close();
        const key = file.key();
        const existing = files.read(key);
        if (files.isDirectory(key)) throw new IOError(`${file.nativePath} is a directory.`);
        if ((fileMode === 'read' || fileMode === 'update') && !existing && fileMode === 'read') throw new IOError(`File not found: ${file.nativePath}`);
        if (fileMode !== 'read') file.parent?.createDirectory();
        this.#file = file;
        this.#mode = fileMode;
        this.#data = fileMode === 'write' || !existing ? new ByteArray() : byteArrayAccess.from(existing);
        this.#data.position = fileMode === 'append' ? this.#data.length : 0;
    }

    openAsync(file: File, fileMode: string): void {
        try {
            this.open(file, fileMode);
            setTimeout(() => runGuarded(() => this.dispatchEvent(new Event(Event.COMPLETE))), 0);
        } catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            setTimeout(() => runGuarded(() => this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, message))), 0);
        }
    }

    /** Save what was written (for write modes) and release the file. */
    close(): void {
        if (!this.#file) return;
        if (this.#mode !== 'read') files.write(this.#file.key(), byteArrayAccess.view(this.#data).slice());
        this.#file = null;
        this.dispatchEvent(new Event(Event.CLOSE));
    }

    #readable(): ByteArray {
        if (!this.#file) throw new IOError('The file stream is not open.');
        return this.#data;
    }

    #writable(): ByteArray {
        if (!this.#file || this.#mode === 'read') throw new IOError('The file stream is not open for writing.');
        return this.#data;
    }

    readBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void { this.#readable().readBytes(bytes, offset, length); }
    readObject(): any { return this.#readable().readObject(); }
    readUTFBytes(length: number): string { return this.#readable().readUTFBytes(length); }
    readUTF(): string { return this.#readable().readUTF(); }
    readInt(): number { return this.#readable().readInt(); }
    readUnsignedInt(): number { return this.#readable().readUnsignedInt(); }
    readByte(): number { return this.#readable().readByte(); }
    readBoolean(): boolean { return this.#readable().readBoolean(); }

    writeBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void { this.#writable().writeBytes(bytes, offset, length); }
    writeObject(object: any): void { this.#writable().writeObject(object); }
    writeUTFBytes(value: string): void { this.#writable().writeUTFBytes(value); }
    writeUTF(value: string): void { this.#writable().writeUTF(value); }
    writeInt(value: number): void { this.#writable().writeInt(value); }
    writeUnsignedInt(value: number): void { this.#writable().writeUnsignedInt(value); }
    writeByte(value: number): void { this.#writable().writeByte(value); }
    writeBoolean(value: boolean): void { this.#writable().writeBoolean(value); }
}
