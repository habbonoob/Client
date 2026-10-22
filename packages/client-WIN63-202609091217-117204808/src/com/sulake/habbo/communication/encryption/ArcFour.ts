import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class ArcFour implements IEncryption {
    static { registerClassName(this, 'com.sulake.habbo.communication.encryption::ArcFour'); }

    private i: number = 0;
    private j: number = 0;

    declare private sbox: number[];

    declare private _SafeStr_7162: number;
    static { (this.prototype as any)._SafeStr_7162 = 0; }

    declare private _SafeStr_7267: number;
    static { (this.prototype as any)._SafeStr_7267 = 0; }

    declare private _SafeStr_7021: number[];

    constructor() {
        this.sbox = [];
    }

    public init(param1: ByteArray): void {
        let _loc2_: any = 0;
        let _loc3_: number = param1.length;
        this.i = 0;
        while (this.i < 256) {
            this.sbox[this.i] = this.i;
            this.i = this.i + 1 >>> 0;
        }
        this.j = 0;
        this.i = 0;
        while (this.i < 256) {
            this.j = (this.j + this.sbox[this.i] + param1.byteAt(this.i % _loc3_)) % 256 >>> 0;
            _loc2_ = this.sbox[this.i];
            this.sbox[this.i] = this.sbox[this.j];
            this.sbox[this.j] = _loc2_ >>> 0;
            this.i = this.i + 1 >>> 0;
        }
        this.i = 0;
        this.j = 0;
    }

    public encipher(param1: ByteArray): void {
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            let _loc3_: number = _loc2_++;
            let _loc4_: number = param1.byteAt(_loc3_) ^ this.next();
            param1.setByteAt(_loc3_, _loc4_);
        }
    }

    public decipher(param1: ByteArray): void {
        this.encipher(param1);
    }

    private next(): number {
        this.i = (this.i + 1 & 0xFF) >>> 0;
        this.j = (this.j + this.sbox[this.i] & 0xFF) >>> 0;
        let _loc1_: number = this.sbox[this.i] | 0;
        this.sbox[this.i] = this.sbox[this.j];
        this.sbox[this.j] = _loc1_ >>> 0;
        return this.sbox[_loc1_ + this.sbox[this.i] & 0xFF];
    }

    public mark(): void {
        this._SafeStr_7162 = this.i;
        this._SafeStr_7267 = this.j;
        this._SafeStr_7021 = this.sbox.concat();
    }

    public reset(): void {
        this.i = this._SafeStr_7162;
        this.j = this._SafeStr_7267;
        this.sbox = this._SafeStr_7021.concat();
    }
}
