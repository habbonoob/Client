import { WindowParamTable } from '@/com/sulake/core/window/utils/WindowParamTable';

/** The client's window param names and their flags (its param table). */
function table(): Map<string, number> {
    const names = new Map<string, number>();
    WindowParamTable.fillTables(names);
    return names;
}

/** The param names a <param name="…"> can have, sorted. */
export function windowParamNames(): string[] {
    return [...table().keys()].sort();
}

const bits = (n: number) => { let c = 0; for (let v = n >>> 0; v; v >>>= 1) c += v & 1; return c; };

/**
 * A params number as the names it is made of: the widest named flags first (several names stand for groups of
 * bits, e.g. draggable_with_mouse), then whatever bits no name covers, in hex.
 */
export function describeParams(value: number): string[] {
    let left = value >>> 0;
    const parts: string[] = [];
    const named = [...table()].filter(([, flag]) => flag !== 0).sort((a, b) => bits(b[1]) - bits(a[1]) || a[0].localeCompare(b[0]));
    for (const [name, flag] of named) {
        if (((left & flag) >>> 0) === flag >>> 0) {
            parts.push(name);
            left = (left & ~flag) >>> 0;
        }
    }
    if (left) parts.push(`0x${left.toString(16)}`);
    return parts;
}
