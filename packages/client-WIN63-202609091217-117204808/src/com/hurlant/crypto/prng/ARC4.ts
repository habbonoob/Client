import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStreamCipher } from '@/com/hurlant/crypto/symmetric/IStreamCipher';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IPRNG } from '@/com/hurlant/crypto/prng/IPRNG';
import { Memory } from '@/com/hurlant/util/Memory';

export class ARC4 implements IPRNG, IStreamCipher {
    static { registerClassName(this, 'com.hurlant.crypto.prng::ARC4'); }

    private i: number = 0;
    private j: number = 0;

    declare private S: ByteArray;

    private readonly _SafeStr_4746: number = 256;

    constructor(param1: ByteArray = null) {
        this.S = new ByteArray();
        if (param1) {
            this.init(param1);
        }
    }

    public getPoolSize(): number {
        return 256;
    }

    public init(param1: ByteArray): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < 256) {
            this.S.setByteAt(_loc3_, _loc3_);
            _loc3_++;
        }
        _loc4_ = 0;
        _loc3_ = 0;
        while (_loc3_ < 256) {
            _loc4_ = _loc4_ + this.S.byteAt(_loc3_) + param1.byteAt(_loc3_ % param1.length) & 0xFF;
            _loc2_ = this.S.byteAt(_loc3_) | 0;
            this.S.setByteAt(_loc3_, this.S.byteAt(_loc4_));
            this.S.setByteAt(_loc4_, _loc2_);
            _loc3_++;
        }
        this.i = 0;
        this.j = 0;
    }

    public next(): number {
        let _loc1_: number = 0;
        this.i = this.i + 1 & 0xFF;
        this.j = this.j + this.S.byteAt(this.i) & 0xFF;
        _loc1_ = this.S.byteAt(this.i) | 0;
        this.S.setByteAt(this.i, this.S.byteAt(this.j));
        this.S.setByteAt(this.j, _loc1_);
        return this.S.byteAt(_loc1_ + this.S.byteAt(this.i) & 0xFF);
    }

    public getBlockSize(): number {
        return 1;
    }

    public encrypt(param1: ByteArray): void {
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            let _loc3_: number = _loc2_++;
            let _loc4_: number = param1.byteAt(_loc3_) ^ this.next();
            param1.setByteAt(_loc3_, _loc4_);
        }
    }

    public decrypt(param1: ByteArray): void {
        this.encrypt(param1);
    }

    public dispose(): void {
        let _loc1_: number = 0;
        if (this.S != null) {
            _loc1_ = 0;
            while (_loc1_ < this.S.length) {
                this.S.setByteAt(_loc1_, Math.random() * 256);
                _loc1_++;
            }
            this.S.length = 0;
            this.S = null;
        }
        this.i = 0;
        this.j = 0;
        Memory.gc();
    }

    public toString(): string {
        return "rc4";
    }

    get [IPRNG](): true {
        return true;
    }
}
