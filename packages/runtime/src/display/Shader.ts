import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';

/**
 * A pixel shader, given as compiled Pixel Bender bytecode. Its kernel's identity (namespace::name)
 * is read from the bytecode header; ShaderFilter runs the matching hand-ported kernel.
 */
export class Shader {
    readonly kernelName: string;
    readonly namespace: string;
    readonly description: string;

    constructor(code: ByteArray = null) {
        const meta = code ? readHeader(byteArrayAccess.view(code)) : {};
        this.kernelName = meta.kernel ?? '';
        this.namespace = meta.namespace ?? '';
        this.description = meta.description ?? '';
    }

    /** 'namespace::name' of the kernel. */
    get id(): string {
        return `${this.namespace}::${this.kernelName}`;
    }
}

/** Read the kernel name (op 0xA4) and string metadata (op 0xA0) from Pixel Bender bytecode. */
function readHeader(b: Uint8Array): Record<string, string> {
    const out: Record<string, string> = {};
    const cstr = (p: number): [string, number] => {
        let e = p;
        while (e < b.length && b[e] !== 0) e++;
        return [new TextDecoder().decode(b.subarray(p, e)), e + 1];
    };
    let p = 0;
    while (p < b.length) {
        const op = b[p];
        if (op === 0xa5) { p += 5; continue; }                          // version
        if (op === 0xa4) {                                               // kernel name: u16 length + chars
            const len = b[p + 1] | (b[p + 2] << 8);
            out.kernel = new TextDecoder().decode(b.subarray(p + 3, p + 3 + len));
            p += 3 + len;
            continue;
        }
        if (op === 0xa0) {                                               // metadata: type, key, value
            const type = b[p + 1];
            const [key, afterKey] = cstr(p + 2);
            if (type === 0x0c) {
                const [value, afterValue] = cstr(afterKey);
                out[key] = value;
                p = afterValue;
            } else {
                p = afterKey + (type === 0x08 ? 2 : 4);                  // numeric metadata
            }
            continue;
        }
        break;                                                           // parameters and code follow
    }
    return out;
}
