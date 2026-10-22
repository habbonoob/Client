// HPA asset packs: the files compiled into the client ([Embed] in the original source), in one
// file (src/assets.hpa). Written when the client is generated, read by preloadEmbeds; the format is
// modelled on the HAB libraries (display/hab.ts), so tools can read and edit a pack in place.
//
// File layout (little-endian): "HPA\0", version u16 (1), flags u16 (0), index length u32 (deflated),
// index length u32 (inflated), payload length u32; then the deflated JSON index, then the payload.
// The index is { entries: [{ path, offset, storedLength, length, compression: "none" | "deflate" }] }
// with offsets into the payload. A path is "<area>/<file>" (catalog/icon.png): what the client
// uses the file for, then the name it had in the source tree.

import { deflateSync, inflateSync } from 'fflate';

const MAGIC = [0x48, 0x50, 0x41, 0x00];   // "HPA\0"
const VERSION = 1;
const HEADER = 20;

/** One file in a pack, as stored. */
export interface AssetPackEntry { path: string; offset: number; storedLength: number; length: number; compression: 'none' | 'deflate' }

/** Files already compressed in their own format: stored as they are. */
const PRECOMPRESSED = /\.(png|gif|jpe?g|mp3)$/i;

/** A pack's index: every file as it is stored, and where the stored bytes start. Throws on anything malformed. */
export function readAssetPackIndex(d: Uint8Array): { entries: AssetPackEntry[]; payloadStart: number } {
    if (d.byteLength < HEADER || MAGIC.some((b, i) => d[i] !== b)) throw new Error('Not an HPA asset pack.');
    const view = new DataView(d.buffer, d.byteOffset, d.byteLength);
    const version = view.getUint16(4, true);
    if (version !== VERSION) throw new Error(`Unsupported HPA asset pack version ${version}.`);
    const storedIndex = view.getUint32(8, true), indexLength = view.getUint32(12, true), payloadLength = view.getUint32(16, true);
    const payloadStart = HEADER + storedIndex;
    if (payloadStart + payloadLength !== d.byteLength) throw new Error(`HPA asset pack length mismatch: expected ${payloadStart + payloadLength}, received ${d.byteLength}.`);
    const indexBytes = inflateSync(d.subarray(HEADER, payloadStart));
    if (indexBytes.byteLength !== indexLength) throw new Error('HPA asset pack index is corrupt.');
    const { entries } = JSON.parse(new TextDecoder().decode(indexBytes)) as { entries: AssetPackEntry[] };
    for (const e of entries) {
        if (e.offset + e.storedLength > payloadLength) throw new Error(`HPA asset pack entry ${e.path} lies outside the payload.`);
    }
    return { entries, payloadStart };
}

/**
 * A pack's files, by path, each read (inflated) only when asked for: the pack's start-up reader, which spreads the
 * work over its loads instead of inflating megabytes at once. Throws on a malformed index at once, and on a corrupt
 * file when that file is read.
 */
export function openAssetPack(d: Uint8Array): Map<string, () => Uint8Array<ArrayBuffer>> {
    const { entries, payloadStart } = readAssetPackIndex(d);
    const files = new Map<string, () => Uint8Array<ArrayBuffer>>();
    for (const e of entries) {
        files.set(e.path, () => {
            const stored = d.subarray(payloadStart + e.offset, payloadStart + e.offset + e.storedLength);
            const data = e.compression === 'deflate' ? inflateSync(stored) : stored.slice();
            if (data.byteLength !== e.length) throw new Error(`HPA asset pack entry ${e.path} is corrupt.`);
            return data as Uint8Array<ArrayBuffer>;
        });
    }
    return files;
}

/** Read a pack into its files, by path. Throws on anything malformed. */
export function readAssetPack(d: Uint8Array): Map<string, Uint8Array<ArrayBuffer>> {
    const { entries, payloadStart } = readAssetPackIndex(d);
    const files = new Map<string, Uint8Array<ArrayBuffer>>();
    for (const e of entries) {
        const stored = d.subarray(payloadStart + e.offset, payloadStart + e.offset + e.storedLength);
        const data = e.compression === 'deflate' ? inflateSync(stored) : stored.slice();
        if (data.byteLength !== e.length) throw new Error(`HPA asset pack entry ${e.path} is corrupt.`);
        files.set(e.path, data as Uint8Array<ArrayBuffer>);
    }
    return files;
}

/** Write files (by path) as a pack, in path order: the same files always give the same bytes. */
export function writeAssetPack(files: Map<string, Uint8Array>): Uint8Array {
    const entries: AssetPackEntry[] = [];
    const parts: Uint8Array[] = [];
    let offset = 0;
    for (const path of [...files.keys()].sort()) {
        const data = files.get(path)!;
        const deflated = PRECOMPRESSED.test(path) ? null : deflateSync(data, { level: 9 });
        const stored = deflated && deflated.byteLength < data.byteLength ? deflated : data;
        entries.push({ path, offset, storedLength: stored.byteLength, length: data.byteLength, compression: stored === data ? 'none' : 'deflate' });
        parts.push(stored);
        offset += stored.byteLength;
    }
    const indexBytes = new TextEncoder().encode(JSON.stringify({ entries }));
    const index = deflateSync(indexBytes, { level: 9 });
    const out = new Uint8Array(HEADER + index.byteLength + offset);
    const view = new DataView(out.buffer);
    out.set(MAGIC, 0);
    view.setUint16(4, VERSION, true);
    view.setUint16(6, 0, true);
    view.setUint32(8, index.byteLength, true);
    view.setUint32(12, indexBytes.byteLength, true);
    view.setUint32(16, offset, true);
    out.set(index, HEADER);
    let at = HEADER + index.byteLength;
    for (const p of parts) { out.set(p, at); at += p.byteLength; }
    return out;
}
