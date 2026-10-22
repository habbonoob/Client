import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IHash {
    getInputSize(): number;
    getHashSize(): number;
    hash(param1: ByteArray): ByteArray;
    toString(): string;
    getPadSize(): number;
}
