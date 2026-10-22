// AMF3 (Action Message Format 3) encoding for ByteArray.readObject/writeObject, per the AMF3
// specification: U29 integers, and per-call string / complex-object / trait reference tables.
//
// There is no class-alias registry, so every object is written as an anonymous dynamic object with
// its own enumerable properties, and typed objects read back as plain objects.

import type { ByteArray } from './ByteArray';

/** AMF3 type markers. */
const M = {
    Undefined: 0x00, Null: 0x01, False: 0x02, True: 0x03, Integer: 0x04, Double: 0x05, String: 0x06,
    XmlDoc: 0x07, Date: 0x08, Array: 0x09, Object: 0x0a, Xml: 0x0b, ByteArray: 0x0c,
    VectorInt: 0x0d, VectorUint: 0x0e, VectorDouble: 0x0f, VectorObject: 0x10, Dictionary: 0x11,
} as const;

const INT_MIN = -(1 << 28), INT_MAX = (1 << 28) - 1;

// ---------- writing ----------

interface WriteState { strings: Map<string, number>; objects: Map<object, number> }

/** AMF3 is big-endian whatever the ByteArray's endian setting. */
function bigEndian<T>(ba: ByteArray, fn: () => T): T {
    const endian = ba.endian;
    ba.endian = 'bigEndian';
    try {
        return fn();
    } finally {
        ba.endian = endian;
    }
}

export function writeAmf3(out: ByteArray, value: unknown): void {
    bigEndian(out, () => writeValue(out, value, { strings: new Map(), objects: new Map() }));
}

function writeU29(out: ByteArray, v: number): void {
    v &= 0x1fffffff;
    if (v < 0x80) out.writeByte(v);
    else if (v < 0x4000) { out.writeByte((v >> 7) | 0x80); out.writeByte(v & 0x7f); }
    else if (v < 0x200000) { out.writeByte((v >> 14) | 0x80); out.writeByte((v >> 7) | 0x80); out.writeByte(v & 0x7f); }
    else { out.writeByte((v >> 22) | 0x80); out.writeByte((v >> 15) | 0x80); out.writeByte((v >> 8) | 0x80); out.writeByte(v & 0xff); }
}

function writeString(out: ByteArray, s: string, st: WriteState): void {
    if (s === '') { writeU29(out, 1); return; }
    const ref = st.strings.get(s);
    if (ref !== undefined) { writeU29(out, ref << 1); return; }
    st.strings.set(s, st.strings.size);
    const bytes = new TextEncoder().encode(s);
    writeU29(out, (bytes.length << 1) | 1);
    for (const b of bytes) out.writeByte(b);
}

/** Write an object reference if `o` was written before; otherwise register it. */
function objectRef(out: ByteArray, o: object, st: WriteState): boolean {
    const ref = st.objects.get(o);
    if (ref !== undefined) { writeU29(out, ref << 1); return true; }
    st.objects.set(o, st.objects.size);
    return false;
}

function isByteArray(v: unknown): v is ByteArray {
    return typeof v === 'object' && v !== null && typeof (v as ByteArray).readUTFBytes === 'function' && typeof (v as ByteArray).writeUTFBytes === 'function';
}

function writeValue(out: ByteArray, v: unknown, st: WriteState): void {
    if (v === undefined) { out.writeByte(M.Undefined); return; }
    if (v === null) { out.writeByte(M.Null); return; }
    if (v === false) { out.writeByte(M.False); return; }
    if (v === true) { out.writeByte(M.True); return; }
    if (typeof v === 'number') {
        if (Number.isInteger(v) && v >= INT_MIN && v <= INT_MAX && !Object.is(v, -0)) { out.writeByte(M.Integer); writeU29(out, v); }
        else { out.writeByte(M.Double); out.writeDouble(v); }
        return;
    }
    if (typeof v === 'string') { out.writeByte(M.String); writeString(out, v, st); return; }
    if (typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') { out.writeByte(M.Undefined); return; }
    const o = v as object;
    if (o instanceof Date) {
        out.writeByte(M.Date);
        if (objectRef(out, o, st)) return;
        writeU29(out, 1);
        out.writeDouble(o.getTime());
        return;
    }
    if (isByteArray(o)) {
        out.writeByte(M.ByteArray);
        if (objectRef(out, o, st)) return;
        writeU29(out, (o.length << 1) | 1);
        out.writeBytes(o, 0, o.length);
        return;
    }
    if (Array.isArray(o)) {
        out.writeByte(M.Array);
        if (objectRef(out, o, st)) return;
        // dense part, then any named (associative) entries
        let dense = 0;
        while (dense < o.length && dense in o) dense++;
        writeU29(out, (dense << 1) | 1);
        for (const k of Object.keys(o)) {
            if (/^\d+$/.test(k) && Number(k) < dense) continue;
            writeString(out, k, st);
            writeValue(out, (o as unknown as Record<string, unknown>)[k], st);
        }
        writeString(out, '', st);
        for (let i = 0; i < dense; i++) writeValue(out, o[i], st);
        return;
    }
    if (o instanceof Map) {
        out.writeByte(M.Dictionary);
        if (objectRef(out, o, st)) return;
        writeU29(out, (o.size << 1) | 1);
        out.writeByte(0);   // strong keys
        for (const [k, val] of o) { writeValue(out, k, st); writeValue(out, val, st); }
        return;
    }
    const xml = o as { toXMLString?: () => string; nodeKind?: () => string };
    if (typeof xml.toXMLString === 'function' && typeof xml.nodeKind === 'function') {
        out.writeByte(M.Xml);
        if (objectRef(out, o, st)) return;
        const bytes = new TextEncoder().encode(xml.toXMLString());
        writeU29(out, (bytes.length << 1) | 1);
        for (const b of bytes) out.writeByte(b);
        return;
    }
    // anonymous dynamic object: inline traits, no sealed members, class name ''
    out.writeByte(M.Object);
    if (objectRef(out, o, st)) return;
    writeU29(out, 0b1011);
    writeString(out, '', st);
    for (const k of Object.keys(o)) {
        const val = (o as Record<string, unknown>)[k];
        if (typeof val === 'function') continue;
        writeString(out, k, st);
        writeValue(out, val, st);
    }
    writeString(out, '', st);
}

// ---------- reading ----------

interface Traits { className: string; externalizable: boolean; dynamic: boolean; sealed: string[] }
interface ReadState { strings: string[]; objects: unknown[]; traits: Traits[] }

export function readAmf3(input: ByteArray): unknown {
    return bigEndian(input, () => readValue(input, { strings: [], objects: [], traits: [] }));
}

function readU29(input: ByteArray): number {
    let v = 0;
    for (let i = 0; i < 3; i++) {
        const b = input.readUnsignedByte();
        if (!(b & 0x80)) return (v << 7) | b;
        v = (v << 7) | (b & 0x7f);
    }
    return (v << 8) | input.readUnsignedByte();
}

function readString(input: ByteArray, st: ReadState): string {
    const flag = readU29(input);
    if (!(flag & 1)) return st.strings[flag >> 1];
    const len = flag >> 1;
    if (len === 0) return '';
    const s = input.readUTFBytes(len);
    st.strings.push(s);
    return s;
}

function readValue(input: ByteArray, st: ReadState): unknown {
    const marker = input.readUnsignedByte();
    switch (marker) {
        case M.Undefined: return undefined;
        case M.Null: return null;
        case M.False: return false;
        case M.True: return true;
        case M.Integer: { const v = readU29(input); return v & 0x10000000 ? v - 0x20000000 : v; }
        case M.Double: return input.readDouble();
        case M.String: return readString(input, st);
        case M.XmlDoc: case M.Xml: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const s = input.readUTFBytes(flag >> 1);
            st.objects.push(s);
            return s;
        }
        case M.Date: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const d = new Date(input.readDouble());
            st.objects.push(d);
            return d;
        }
        case M.Array: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const arr: unknown[] = [];
            st.objects.push(arr);
            for (let key = readString(input, st); key !== ''; key = readString(input, st)) {
                (arr as unknown as Record<string, unknown>)[key] = readValue(input, st);
            }
            const dense = flag >> 1;
            for (let i = 0; i < dense; i++) arr[i] = readValue(input, st);
            return arr;
        }
        case M.Object: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            let traits: Traits;
            if (!(flag & 2)) traits = st.traits[flag >> 2];
            else {
                traits = { externalizable: !!(flag & 4), dynamic: !!(flag & 8), className: readString(input, st), sealed: [] };
                for (let i = 0; i < flag >> 4; i++) traits.sealed.push(readString(input, st));
                st.traits.push(traits);
            }
            if (traits.externalizable) throw new Error(`AMF3: cannot read externalizable class "${traits.className}" (no class alias registry)`);
            const obj: Record<string, unknown> = {};
            st.objects.push(obj);
            for (const name of traits.sealed) obj[name] = readValue(input, st);
            if (traits.dynamic) for (let key = readString(input, st); key !== ''; key = readString(input, st)) obj[key] = readValue(input, st);
            return obj;
        }
        case M.ByteArray: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const ba = new (input.constructor as new () => ByteArray)();
            st.objects.push(ba);
            const len = flag >> 1;
            if (len) input.readBytes(ba, 0, len);
            return ba;
        }
        case M.VectorInt: case M.VectorUint: case M.VectorDouble: case M.VectorObject: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const count = flag >> 1;
            input.readUnsignedByte();   // fixed
            const vec: unknown[] = [];
            st.objects.push(vec);
            if (marker === M.VectorObject) readString(input, st);   // element type name
            for (let i = 0; i < count; i++) {
                vec.push(marker === M.VectorInt ? input.readInt() : marker === M.VectorUint ? input.readUnsignedInt()
                    : marker === M.VectorDouble ? input.readDouble() : readValue(input, st));
            }
            return vec;
        }
        case M.Dictionary: {
            const flag = readU29(input);
            if (!(flag & 1)) return st.objects[flag >> 1];
            const map = new Map<unknown, unknown>();
            st.objects.push(map);
            input.readUnsignedByte();   // weak keys
            for (let i = 0; i < flag >> 1; i++) { const k = readValue(input, st); map.set(k, readValue(input, st)); }
            return map;
        }
        default:
            throw new Error(`AMF3: unknown type marker 0x${marker.toString(16)}`);
    }
}
