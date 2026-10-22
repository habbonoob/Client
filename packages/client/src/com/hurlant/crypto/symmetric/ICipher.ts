import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface ICipher {
    getBlockSize(): number;
    encrypt(param1: ByteArray): void;
    decrypt(param1: ByteArray): void;
    dispose(): void;
    toString(): string;
}
