import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IEncryption {
    init(param1: ByteArray): void;
    encipher(param1: ByteArray): void;
    decipher(param1: ByteArray): void;
    mark(): void;
    reset(): void;
}
