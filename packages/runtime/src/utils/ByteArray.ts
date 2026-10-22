import { unzlibSync, zlibSync, inflateSync, deflateSync } from 'fflate';
import { EOFError } from '@habbo-pixi/runtime/errors/EOFError';
import { IOError } from '@habbo-pixi/runtime/errors/IOError';
import type { IDataInput } from './IDataInput';
import type { IDataOutput } from './IDataOutput';
import { readAmf3, writeAmf3 } from './amf3';

const utf8Decoder = new TextDecoder('utf-8');
const utf8Encoder = new TextEncoder();

/**
 * For the rest of the runtime (bitmap pixels, sockets, loaders): the bytes of a ByteArray
 * (a live view, valid until the array next grows) and a ByteArray wrapping a copy of some bytes.
 */
export let byteArrayAccess: {
    view(ba: ByteArray): Uint8Array;
    from(data: Uint8Array): ByteArray;
};

/**
 * A growable byte buffer with a read/write cursor. Multi-byte values use
 * `endian` (big-endian by default); reads past the end throw EOFError; writing past the end grows
 * the array, zero-filling any gap.
 */
export class ByteArray implements IDataInput, IDataOutput {
    static defaultObjectEncoding = 3;

    objectEncoding: number = ByteArray.defaultObjectEncoding;
    #bytes = new Uint8Array(16);
    #view = new DataView(this.#bytes.buffer);
    #length = 0;
    #position = 0;
    #little = false;

    get length(): number {
        return this.#length;
    }

    /** Growing zero-fills; shrinking below `position` moves `position` to the new end. */
    set length(value: number) {
        value = value >>> 0;
        this.#reserve(value);
        if (value > this.#length) this.#bytes.fill(0, this.#length, value);
        this.#length = value;
        if (this.#position > value) this.#position = value;
    }

    /** The byte at `index` (`bytes[index]` in the original), or undefined past the end. */
    byteAt(index: number): number {
        index = Math.trunc(index);
        return index >= 0 && index < this.#length ? this.#bytes[index] : undefined;
    }

    /** Store the low 8 bits of `value` at `index` (`bytes[index] = value`), growing the array to reach it. */
    setByteAt(index: number, value: number): void {
        index = Math.trunc(index);
        if (index < 0) return;
        if (index >= this.#length) this.length = index + 1;
        this.#bytes[index] = value & 0xff;
    }

    get position(): number {
        return this.#position;
    }

    set position(value: number) {
        this.#position = value >>> 0;
    }

    get bytesAvailable(): number {
        return Math.max(0, this.#length - this.#position);
    }

    get endian(): string {
        return this.#little ? 'littleEndian' : 'bigEndian';
    }

    set endian(value: string) {
        if (value !== 'bigEndian' && value !== 'littleEndian') throw new TypeError(`Parameter endian must be one of the accepted values.`);
        this.#little = value === 'littleEndian';
    }

    clear(): void {
        this.#bytes = new Uint8Array(16);
        this.#view = new DataView(this.#bytes.buffer);
        this.#length = 0;
        this.#position = 0;
    }

    // ---------- reading ----------

    readBoolean(): boolean {
        return this.#take(1) && this.#bytes[this.#position++] !== 0;
    }

    readByte(): number {
        this.#take(1);
        return this.#view.getInt8(this.#position++);
    }

    readUnsignedByte(): number {
        this.#take(1);
        return this.#bytes[this.#position++];
    }

    readShort(): number {
        this.#take(2);
        const v = this.#view.getInt16(this.#position, this.#little);
        this.#position += 2;
        return v;
    }

    readUnsignedShort(): number {
        this.#take(2);
        const v = this.#view.getUint16(this.#position, this.#little);
        this.#position += 2;
        return v;
    }

    readInt(): number {
        this.#take(4);
        const v = this.#view.getInt32(this.#position, this.#little);
        this.#position += 4;
        return v;
    }

    readUnsignedInt(): number {
        this.#take(4);
        const v = this.#view.getUint32(this.#position, this.#little);
        this.#position += 4;
        return v;
    }

    readFloat(): number {
        this.#take(4);
        const v = this.#view.getFloat32(this.#position, this.#little);
        this.#position += 4;
        return v;
    }

    readDouble(): number {
        this.#take(8);
        const v = this.#view.getFloat64(this.#position, this.#little);
        this.#position += 8;
        return v;
    }

    /** Copy `length` bytes (all available when 0) into `bytes` at `offset`; `bytes.position` is untouched. */
    readBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void {
        if (length === 0) length = this.bytesAvailable;
        this.#take(length);
        const end = offset + length;
        if (bytes.#length < end) bytes.length = end;
        bytes.#bytes.set(this.#bytes.subarray(this.#position, this.#position + length), offset);
        this.#position += length;
    }

    /** A 16-bit length followed by that many UTF-8 bytes. */
    readUTF(): string {
        return this.readUTFBytes(this.readUnsignedShort());
    }

    /** `length` UTF-8 bytes; a leading byte-order mark is skipped and the string ends at a NUL byte. */
    readUTFBytes(length: number): string {
        this.#take(length);
        let start = this.#position;
        const end = start + length;
        this.#position = end;
        if (length >= 3 && this.#bytes[start] === 0xef && this.#bytes[start + 1] === 0xbb && this.#bytes[start + 2] === 0xbf) start += 3;
        let stop = this.#bytes.indexOf(0, start);
        if (stop < 0 || stop > end) stop = end;
        return utf8Decoder.decode(this.#bytes.subarray(start, stop));
    }

    readMultiByte(length: number, charSet: string): string {
        this.#take(length);
        const bytes = this.#bytes.subarray(this.#position, this.#position + length);
        this.#position += length;
        let decoder: TextDecoder;
        try { decoder = new TextDecoder(charSet); }
        catch { decoder = utf8Decoder; }   // unknown character sets read as UTF-8, the default code page here
        const s = decoder.decode(bytes);
        const nul = s.indexOf('\0');
        return nul < 0 ? s : s.slice(0, nul);
    }

    /** One AMF3-encoded value. */
    readObject(): any {
        if (this.objectEncoding !== 3) throw new Error('Only AMF3 object encoding is supported by this ByteArray.');
        return readAmf3(this);
    }

    // ---------- writing ----------

    writeBoolean(value: boolean): void {
        this.#put(1);
        this.#bytes[this.#position++] = value ? 1 : 0;
    }

    /** The low 8 bits of `value`. */
    writeByte(value: number): void {
        this.#put(1);
        this.#bytes[this.#position++] = value & 0xff;
    }

    /** The low 16 bits of `value`. */
    writeShort(value: number): void {
        this.#put(2);
        this.#view.setUint16(this.#position, value & 0xffff, this.#little);
        this.#position += 2;
    }

    writeInt(value: number): void {
        this.#put(4);
        this.#view.setInt32(this.#position, value | 0, this.#little);
        this.#position += 4;
    }

    writeUnsignedInt(value: number): void {
        this.#put(4);
        this.#view.setUint32(this.#position, value >>> 0, this.#little);
        this.#position += 4;
    }

    writeFloat(value: number): void {
        this.#put(4);
        this.#view.setFloat32(this.#position, value, this.#little);
        this.#position += 4;
    }

    writeDouble(value: number): void {
        this.#put(8);
        this.#view.setFloat64(this.#position, value, this.#little);
        this.#position += 8;
    }

    /** `length` bytes of `bytes` from `offset` (everything from `offset` when 0). */
    writeBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void {
        if (length === 0) length = Math.max(0, bytes.#length - offset);
        if (offset + length > bytes.#length) throw new RangeError('The supplied index is out of bounds.');
        const chunk = bytes.#bytes.slice(offset, offset + length);   // copy: bytes may be this array
        this.#put(length);
        this.#bytes.set(chunk, this.#position);
        this.#position += length;
    }

    /** A 16-bit byte length followed by the UTF-8 bytes. */
    writeUTF(value: string): void {
        const data = utf8Encoder.encode(value);
        if (data.length > 0xffff) throw new RangeError('The supplied index is out of bounds.');
        this.writeShort(data.length);
        this.#writeRaw(data);
    }

    writeUTFBytes(value: string): void {
        // ASCII, which is most of what the client writes (the avatar cache builds its keys out of part names this
        // way, thousands a second in a busy room), is its own UTF-8: written byte for byte, without the encoder's
        // allocation. Anything else goes through the encoder.
        const n = value.length;
        let ascii = true;
        for (let i = 0; i < n; i++) {
            if (value.charCodeAt(i) > 0x7f) {
                ascii = false;
                break;
            }
        }
        if (!ascii) {
            this.#writeRaw(utf8Encoder.encode(value));
            return;
        }
        this.#put(n);
        const bytes = this.#bytes;
        let p = this.#position;
        for (let i = 0; i < n; i++) bytes[p++] = value.charCodeAt(i);
        this.#position = p;
    }

    writeMultiByte(value: string, charSet: string): void {
        this.#writeRaw(encodeCharset(value, charSet));
    }

    /** One value, AMF3-encoded. */
    writeObject(object: any): void {
        if (this.objectEncoding !== 3) throw new Error('Only AMF3 object encoding is supported by this ByteArray.');
        writeAmf3(this, object);
    }

    // ---------- compression ----------

    /** Replace the contents with their compressed form; `position` moves to the end. */
    compress(algorithm: string = 'zlib'): void {
        const data = this.#bytes.subarray(0, this.#length);
        this.#replace(algorithm === 'deflate' ? deflateSync(data) : this.#zlib(algorithm, data, zlibSync));
        this.#position = this.#length;
    }

    /** Replace the contents with their decompressed form; `position` moves to 0. */
    uncompress(algorithm: string = 'zlib'): void {
        const data = this.#bytes.subarray(0, this.#length);
        let out: Uint8Array;
        try {
            out = algorithm === 'deflate' ? inflateSync(data) : this.#zlib(algorithm, data, unzlibSync);
        } catch (e) {
            if (e instanceof Error && e.message.startsWith('LZMA')) throw e;
            throw new IOError('There was an error decompressing the data.');
        }
        this.#replace(out);
        this.#position = 0;
    }

    deflate(): void {
        this.compress('deflate');
    }

    inflate(): void {
        this.uncompress('deflate');
    }

    #zlib(algorithm: string, data: Uint8Array, fn: (d: Uint8Array) => Uint8Array): Uint8Array {
        // this client only uses zlib and deflate; there is no LZMA codec in this runtime
        if (algorithm === 'lzma') throw new Error('LZMA compression is not available in this runtime.');
        return fn(data);
    }

    /** The bytes decoded as text, honouring a UTF-8 or UTF-16 byte-order mark. */
    toString(): string {
        const b = this.#bytes.subarray(0, this.#length);
        if (b.length >= 2 && b[0] === 0xfe && b[1] === 0xff) return new TextDecoder('utf-16be').decode(b.subarray(2));
        if (b.length >= 2 && b[0] === 0xff && b[1] === 0xfe) return new TextDecoder('utf-16le').decode(b.subarray(2));
        if (b.length >= 3 && b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) return utf8Decoder.decode(b.subarray(3));
        return utf8Decoder.decode(b);
    }

    // ---------- internals ----------

    #take(n: number): true {
        if (n > this.#length - this.#position || n < 0) throw new EOFError();
        return true;
    }

    /** Make room for n bytes at `position`, extending `length` (and zero-filling past the old end). */
    #put(n: number): void {
        const end = this.#position + n;
        this.#reserve(end);
        if (this.#position > this.#length) this.#bytes.fill(0, this.#length, this.#position);
        if (end > this.#length) this.#length = end;
    }

    #reserve(size: number): void {
        if (size <= this.#bytes.length) return;
        let cap = Math.max(16, this.#bytes.length);
        while (cap < size) cap *= 2;
        const next = new Uint8Array(cap);
        next.set(this.#bytes.subarray(0, this.#length));
        this.#bytes = next;
        this.#view = new DataView(next.buffer);
    }

    #writeRaw(data: Uint8Array): void {
        this.#put(data.length);
        this.#bytes.set(data, this.#position);
        this.#position += data.length;
    }

    #replace(data: Uint8Array): void {
        this.#bytes = new Uint8Array(Math.max(16, data.length));
        this.#bytes.set(data);
        this.#view = new DataView(this.#bytes.buffer);
        this.#length = data.length;
    }

    static {
        byteArrayAccess = {
            view: ba => ba.#bytes.subarray(0, ba.#length),
            from: data => {
                const ba = new ByteArray();
                ba.#replace(data);
                return ba;
            },
        };
    }
}

/** Encode for writeMultiByte: UTF-8/UTF-16 exactly; single-byte Latin charsets as code units, '?' when unrepresentable. */
function encodeCharset(value: string, charSet: string): Uint8Array {
    const cs = charSet.toLowerCase().replace(/_/g, '-');
    if (cs === 'utf-16' || cs === 'utf-16le' || cs === 'unicode') {
        const out = new Uint8Array(value.length * 2);
        for (let i = 0; i < value.length; i++) { const c = value.charCodeAt(i); out[i * 2] = c & 0xff; out[i * 2 + 1] = c >> 8; }
        return out;
    }
    if (cs === 'utf-16be' || cs === 'unicodefffe') {
        const out = new Uint8Array(value.length * 2);
        for (let i = 0; i < value.length; i++) { const c = value.charCodeAt(i); out[i * 2] = c >> 8; out[i * 2 + 1] = c & 0xff; }
        return out;
    }
    const latin = ['iso-8859-1', 'latin1', 'l1', 'iso8859-1', 'us-ascii', 'ascii', 'windows-1252', 'cp1252'];
    if (latin.includes(cs)) {
        const max = cs.includes('ascii') ? 0x7f : 0xff;
        const out = new Uint8Array(value.length);
        for (let i = 0; i < value.length; i++) { const c = value.charCodeAt(i); out[i] = c <= max ? c : 0x3f; }
        return out;
    }
    return utf8Encoder.encode(value);
}
