import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IPRNG {
    getPoolSize(): number;
    init(param1: ByteArray): void;
    next(): number;
    dispose(): void;
    toString(): string;
}

export const IPRNG = Symbol('com.hurlant.crypto.prng::IPRNG');
registerClassName(IPRNG, 'com.hurlant.crypto.prng::IPRNG');

export function isIPRNG(value: unknown): value is IPRNG {
    return (value as { [IPRNG]?: true } | null | undefined)?.[IPRNG] === true;
}
