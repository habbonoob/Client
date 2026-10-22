import { zlibSync } from 'fflate';

const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c >>> 0;
    }
    return t;
})();

function crc32(data: Uint8Array, start: number, end: number): number {
    let c = 0xffffffff;
    for (let i = start; i < end; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}

/** Encode straight (non-premultiplied) RGBA pixels as a PNG, synchronously. */
export function encodePng(rgba: Uint8ClampedArray | Uint8Array, width: number, height: number, fast: boolean): Uint8Array {
    const stride = width * 4;
    const raw = new Uint8Array((stride + 1) * height);
    for (let y = 0; y < height; y++) {
        raw[y * (stride + 1)] = 0;   // filter: none
        raw.set(rgba.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
    }
    const idat = zlibSync(raw, { level: fast ? 1 : 6 });
    const chunks: [string, Uint8Array][] = [
        ['IHDR', (() => {
            const h = new Uint8Array(13);
            const v = new DataView(h.buffer);
            v.setUint32(0, width);
            v.setUint32(4, height);
            h[8] = 8;   // bit depth
            h[9] = 6;   // colour type: RGBA
            return h;
        })()],
        ['IDAT', idat],
        ['IEND', new Uint8Array(0)],
    ];
    const size = 8 + chunks.reduce((n, [, d]) => n + 12 + d.length, 0);
    const out = new Uint8Array(size);
    const v = new DataView(out.buffer);
    out.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    let p = 8;
    for (const [type, data] of chunks) {
        v.setUint32(p, data.length);
        for (let i = 0; i < 4; i++) out[p + 4 + i] = type.charCodeAt(i);
        out.set(data, p + 8);
        v.setUint32(p + 8 + data.length, crc32(out, p + 4, p + 8 + data.length));
        p += 12 + data.length;
    }
    return out;
}
