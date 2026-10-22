import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IReduction } from '@/com/hurlant/math/IReduction';
import { BigInteger } from '@/com/hurlant/math/BarrettReduction.group';

export class MontgomeryReduction implements IReduction {
    static { registerClassName(this, 'com.hurlant.math::MontgomeryReduction'); }

    declare private m: BigInteger;

    declare private _SafeStr_5591: number;
    static { (this.prototype as any)._SafeStr_5591 = 0; }

    declare private _SafeStr_5621: number;
    static { (this.prototype as any)._SafeStr_5621 = 0; }

    declare private _SafeStr_6043: number;
    static { (this.prototype as any)._SafeStr_6043 = 0; }

    declare private _SafeStr_6534: number;
    static { (this.prototype as any)._SafeStr_6534 = 0; }

    declare private mt2: number;
    static { (this.prototype as any).mt2 = 0; }

    constructor(param1: BigInteger) {
        this.m = param1;
        this._SafeStr_5591 = param1.invDigit();
        this._SafeStr_5621 = this._SafeStr_5591 & 0x7FFF;
        this._SafeStr_6043 = this._SafeStr_5591 >> 15;
        this._SafeStr_6534 = 32767;
        this.mt2 = 2 * param1.t;
    }

    public convert(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        param1.abs().dlShiftTo(this.m.t, _loc2_);
        _loc2_.divRemTo(this.m, null, _loc2_);
        if (param1.s < 0 && _loc2_.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(_loc2_, _loc2_);
        }
        return _loc2_;
    }

    public revert(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        param1.copyTo(_loc2_);
        this.reduce(_loc2_);
        return _loc2_;
    }

    public reduce(param1: BigInteger): void {
        let _loc2_: number = 0;
        let _loc3_: any = 0;
        let _loc4_: any = 0;
        while (param1.t <= this.mt2) {
            param1.a[param1.t++] = 0;
        }
        _loc2_ = 0;
        while (_loc2_ < this.m.t) {
            _loc3_ = param1.a[_loc2_] & 0x7FFF;
            _loc4_ = _loc3_ * this._SafeStr_5621 + ((_loc3_ * this._SafeStr_6043 + (param1.a[_loc2_] >> 15) * this._SafeStr_5621 & this._SafeStr_6534) << 15) & 0x3FFFFFFF;
            _loc3_ = _loc2_ + this.m.t;
            param1.a[_loc3_] += this.m.am(0, _loc4_ | 0, param1, _loc2_, 0, this.m.t);
            while (param1.a[_loc3_] >= 1073741824) {
                let _loc6_: any = _loc3_;
                let _loc5_: any = param1.a[_loc6_] - 1073741824;
                param1.a[_loc6_] = _loc5_;
                param1.a[++_loc3_]++;
            }
            _loc2_++;
        }
        param1.clamp();
        param1.drShiftTo(this.m.t, param1);
        if (param1.compareTo(this.m) >= 0) {
            param1.subTo(this.m, param1);
        }
    }

    public sqrTo(param1: BigInteger, param2: BigInteger): void {
        param1.squareTo(param2);
        this.reduce(param2);
    }

    public mulTo(param1: BigInteger, param2: BigInteger, param3: BigInteger): void {
        param1.multiplyTo(param2, param3);
        this.reduce(param3);
    }
}
