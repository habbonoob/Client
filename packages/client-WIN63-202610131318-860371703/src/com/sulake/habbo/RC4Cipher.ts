import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class RC4Cipher {
    static { registerClassName(this, 'RC4Cipher'); }

    private i: number = 0;
    private _SafeStr_14023: number = 0;

    declare private _SafeStr_14024: ByteArray;

    private readonly STATE_SIZE: number = 256;

    constructor(param1: ByteArray = null) {
        this._SafeStr_14024 = new ByteArray();
        if (param1) {
            this._SafeStr_14025(param1);
        }
    }

    public getStateSize(): number {
        return this.STATE_SIZE;
    }

    public _SafeStr_14025(param1: ByteArray): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < 256) {
            this._SafeStr_14024.setByteAt(_loc2_, _loc2_);
            _loc2_++;
        }
        _loc3_ = 0;
        _loc2_ = 0;
        while (_loc2_ < 256) {
            _loc3_ = _loc3_ + this._SafeStr_14024.byteAt(_loc2_) + param1.byteAt(_loc2_ % param1.length) & 0xFF;
            _loc4_ = this._SafeStr_14024.byteAt(_loc2_) | 0;
            this._SafeStr_14024.setByteAt(_loc2_, this._SafeStr_14024.byteAt(_loc3_));
            this._SafeStr_14024.setByteAt(_loc3_, _loc4_);
            _loc2_++;
        }
        this.i = 0;
        this._SafeStr_14023 = 0;
    }

    private _SafeStr_14026(): number {
        let _loc1_: number = 0;
        this.i = this.i + 1 & 0xFF;
        this._SafeStr_14023 = this._SafeStr_14023 + this._SafeStr_14024.byteAt(this.i) & 0xFF;
        _loc1_ = this._SafeStr_14024.byteAt(this.i) | 0;
        this._SafeStr_14024.setByteAt(this.i, this._SafeStr_14024.byteAt(this._SafeStr_14023));
        this._SafeStr_14024.setByteAt(this._SafeStr_14023, _loc1_);
        return this._SafeStr_14024.byteAt(_loc1_ + this._SafeStr_14024.byteAt(this.i) & 0xFF);
    }

    public _SafeStr_14027(): number {
        return 1;
    }

    public _SafeStr_14028(param1: ByteArray): void {
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            let _loc3_: number = _loc2_++;
            param1.setByteAt(_loc3_, param1.byteAt(_loc3_) ^ this._SafeStr_14026());
        }
    }

    public _SafeStr_14012(param1: ByteArray): void {
        this._SafeStr_14028(param1);
    }

    public _SafeStr_14029(): void {
        let _loc1_: number = 0;
        if (this._SafeStr_14024 != null) {
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_14024.length) {
                this._SafeStr_14024.setByteAt(_loc1_, Math.random() * 256);
                _loc1_++;
            }
            this._SafeStr_14024.length = 0;
            this._SafeStr_14024 = null;
        }
        this.i = 0;
        this._SafeStr_14023 = 0;
    }
}
