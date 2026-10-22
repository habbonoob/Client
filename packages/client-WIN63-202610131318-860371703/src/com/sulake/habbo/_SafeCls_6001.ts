import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class _SafeCls_6001 {
    static { registerClassName(this, '_SafeCls_6001'); }

    private _SafeStr_14013: number = 0;
    private _SafeStr_14014: number = 0;

    declare private _SafeStr_14015: ByteArray;

    private readonly _SafeStr_14016: number = 256;

    constructor(param1: ByteArray = null) {
        this._SafeStr_14015 = new ByteArray();
        if (param1) {
            this._SafeStr_14017(param1);
        }
    }

    public _SafeStr_14018(): number {
        return this._SafeStr_14016;
    }

    public _SafeStr_14017(param1: ByteArray): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < 256) {
            this._SafeStr_14015.setByteAt(_loc2_, _loc2_);
            _loc2_++;
        }
        _loc3_ = 0;
        _loc2_ = 0;
        while (_loc2_ < 256) {
            _loc3_ = _loc3_ + this._SafeStr_14015.byteAt(_loc2_) + param1.byteAt(_loc2_ % param1.length) & 0xFF;
            _loc4_ = this._SafeStr_14015.byteAt(_loc2_) | 0;
            this._SafeStr_14015.setByteAt(_loc2_, this._SafeStr_14015.byteAt(_loc3_));
            this._SafeStr_14015.setByteAt(_loc3_, _loc4_);
            _loc2_++;
        }
        this._SafeStr_14013 = 0;
        this._SafeStr_14014 = 0;
    }

    private _SafeStr_14019(): number {
        let _loc1_: number = 0;
        this._SafeStr_14013 = this._SafeStr_14013 + 1 & 0xFF;
        this._SafeStr_14014 = this._SafeStr_14014 + this._SafeStr_14015.byteAt(this._SafeStr_14013) & 0xFF;
        _loc1_ = this._SafeStr_14015.byteAt(this._SafeStr_14013) | 0;
        this._SafeStr_14015.setByteAt(this._SafeStr_14013, this._SafeStr_14015.byteAt(this._SafeStr_14014));
        this._SafeStr_14015.setByteAt(this._SafeStr_14014, _loc1_);
        return this._SafeStr_14015.byteAt(_loc1_ + this._SafeStr_14015.byteAt(this._SafeStr_14013) & 0xFF);
    }

    public _SafeStr_14020(): number {
        return 1;
    }

    public _SafeStr_14021(param1: ByteArray): void {
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            let _loc3_: number = _loc2_++;
            param1.setByteAt(_loc3_, param1.byteAt(_loc3_) ^ this._SafeStr_14019());
        }
    }

    public _SafeStr_14010(param1: ByteArray): void {
        this._SafeStr_14021(param1);
    }

    public _SafeStr_14022(): void {
        let _loc1_: number = 0;
        if (this._SafeStr_14015 != null) {
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_14015.length) {
                this._SafeStr_14015.setByteAt(_loc1_, Math.random() * 256);
                _loc1_++;
            }
            this._SafeStr_14015.length = 0;
            this._SafeStr_14015 = null;
        }
        this._SafeStr_14013 = 0;
        this._SafeStr_14014 = 0;
    }
}
