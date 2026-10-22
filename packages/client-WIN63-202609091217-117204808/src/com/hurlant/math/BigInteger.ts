import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IReduction } from '@/com/hurlant/math/IReduction';
import { System } from '@habbo-pixi/runtime/system/System';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Random } from '@/com/hurlant/crypto/prng/Random';
import { BarrettReduction, MontgomeryReduction } from '@/com/hurlant/math/BarrettReduction.group';
import { ClassicReduction } from '@/com/hurlant/math/ClassicReduction';
import { NullReduction } from '@/com/hurlant/math/NullReduction';
import { Hex } from '@/com/hurlant/util/Hex';

export class BigInteger {
    static { registerClassName(this, 'com.hurlant.math::BigInteger'); }

    static #staticsReady = false;

    public static readonly _SafeStr_8028: number = 30;
    public static readonly _SafeStr_8533: number = 1073741824;
    public static readonly DM: number = 1073741823;
    public static readonly BI_FP: number = 52;
    public static readonly F1: number = 22;
    public static readonly F2: number = 8;
    public static readonly _SafeStr_6833: number = Math.pow(2, 52);

    public static get ZERO(): BigInteger {
        BigInteger.#initStatics();
        return BigInteger.ZERO;
    }

    public static get _SafeStr_2392(): BigInteger {
        BigInteger.#initStatics();
        return BigInteger._SafeStr_2392;
    }

    public static readonly lowprimes: any[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];

    public static get _SafeStr_6303(): number {
        BigInteger.#initStatics();
        return BigInteger._SafeStr_6303;
    }

    declare public t: number;
    static { (this.prototype as any).t = 0; }

    declare public s: number;
    static { (this.prototype as any).s = 0; }

    declare public a: any[];

    constructor(param1: any = null, param2: number = 0, param3: boolean = false) {
        let _loc4_: ByteArray = null;
        let _loc5_: number = 0;
        this.a = [];
        if (typeof param1 === "string") {
            if (param2 && param2 != 16) {
                this.fromRadix(typeof param1 === "string" ? param1 : null, param2);
            } else {
                param1 = Hex.toArray(stringOrNull(param1));
                param2 = 0;
            }
        }
        if (param1 instanceof ByteArray) {
            _loc4_ = param1 instanceof ByteArray ? param1 : null;
            _loc5_ = param2 || _loc4_.length - _loc4_.position;
            this.fromArray(_loc4_, _loc5_, param3);
        }
    }

    public static nbv(param1: number): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        _loc2_.fromInt(param1);
        return _loc2_;
    }

    public dispose(): void {
        let _loc2_: any = 0;
        let _loc1_: Random = new Random();
        _loc2_ = 0;
        while (_loc2_ < this.a.length) {
            this.a[_loc2_] = _loc1_.nextByte();
            delete this.a[_loc2_];
            _loc2_++;
        }
        this.a = null;
        this.t = 0;
        this.s = 0;
        System.pauseForGCIfCollectionImminent();
    }

    public toString(param1: number = 16): string {
        let _loc7_: number = 0;
        if (this.s < 0) {
            return "-" + this.negate().toString(param1);
        }
        switch (param1) {
            case 2:
                _loc7_ = 1;
                break;
            case 4:
                _loc7_ = 2;
                break;
            case 8:
                _loc7_ = 3;
                break;
            case 16:
                _loc7_ = 4;
                break;
            case 32:
                _loc7_ = 5;
                break;
            default:
                return this.toRadix(param1 >>> 0);
        }
        let _loc3_: number = (1 << _loc7_) - 1;
        let _loc5_: number = 0;
        let _loc8_: boolean = false;
        let _loc4_: string = "";
        let _loc6_: number = this.t;
        let _loc2_: number = 30 - _loc6_ * 30 % _loc7_;
        if (_loc6_-- > 0) {
            if (_loc2_ < 30 && (_loc5_ = this.a[_loc6_] >> _loc2_) > 0) {
                _loc8_ = true;
                _loc4_ = _loc5_.toString(36);
            }
            while (_loc6_ >= 0) {
                if (_loc2_ < _loc7_) {
                    _loc5_ = (this.a[_loc6_] & (1 << _loc2_) - 1) << _loc7_ - _loc2_;
                    _loc5_ = _loc5_ | this.a[--_loc6_] >> (_loc2_ += 30 - _loc7_);
                } else {
                    _loc5_ = this.a[_loc6_] >> (_loc2_ -= _loc7_) & _loc3_;
                    if (_loc2_ <= 0) {
                        _loc2_ += 30;
                        _loc6_--;
                    }
                }
                if (_loc5_ > 0) {
                    _loc8_ = true;
                }
                if (_loc8_) {
                    _loc4_ += _loc5_.toString(36);
                }
            }
        }
        return _loc8_ ? _loc4_ : "0";
    }

    public toArray(param1: ByteArray): number {
        let _loc7_: number = 0;
        _loc7_ = 8;
        let _loc3_: number = 0;
        _loc3_ = 255;
        let _loc5_: number = 0;
        let _loc6_: number = this.t;
        let _loc2_: number = 30 - _loc6_ * 30 % 8;
        let _loc8_: boolean = false;
        let _loc4_: number = 0;
        if (_loc6_-- > 0) {
            if (_loc2_ < 30 && (_loc5_ = this.a[_loc6_] >> _loc2_) > 0) {
                _loc8_ = true;
                param1.writeByte(_loc5_);
                _loc4_++;
            }
            while (_loc6_ >= 0) {
                if (_loc2_ < 8) {
                    _loc5_ = (this.a[_loc6_] & (1 << _loc2_) - 1) << 8 - _loc2_;
                    _loc5_ = _loc5_ | this.a[--_loc6_] >> (_loc2_ += 30 - 8);
                } else {
                    _loc5_ = this.a[_loc6_] >> (_loc2_ -= 8) & 0xFF;
                    if (_loc2_ <= 0) {
                        _loc2_ += 30;
                        _loc6_--;
                    }
                }
                if (_loc5_ > 0) {
                    _loc8_ = true;
                }
                if (_loc8_) {
                    param1.writeByte(_loc5_);
                    _loc4_++;
                }
            }
        }
        return _loc4_ >>> 0;
    }

    public valueOf(): number {
        let _loc2_: any = 0;
        if (this.s == -1) {
            return -this.negate().valueOf();
        }
        let _loc1_: number = 1;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this.t) {
            _loc3_ += this.a[_loc2_] * _loc1_;
            _loc1_ *= 1073741824;
            _loc2_++;
        }
        return _loc3_;
    }

    public negate(): BigInteger {
        let _loc1_: BigInteger = this.nbi();
        BigInteger.ZERO.subTo(this, _loc1_);
        return _loc1_;
    }

    public abs(): BigInteger {
        return this.s < 0 ? this.negate() : this;
    }

    public compareTo(param1: BigInteger): number {
        let _loc2_: number = this.s - param1.s;
        if (_loc2_ != 0) {
            return _loc2_;
        }
        let _loc3_: number = this.t;
        _loc2_ = _loc3_ - param1.t;
        if (_loc2_ != 0) {
            return this.s < 0 ? _loc2_ * -1 : _loc2_;
        }
        while (--_loc3_ >= 0) {
            _loc2_ = this.a[_loc3_] - param1.a[_loc3_] | 0;
            if (_loc2_ != 0) {
                return _loc2_;
            }
        }
        return 0;
    }

    public nbits(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: number = 1;
        _loc3_ = param1 >>> 16 | 0;
        if (_loc3_ != 0) {
            param1 = _loc3_;
            _loc2_ += 16;
        }
        _loc3_ = param1 >> 8;
        if (_loc3_ != 0) {
            param1 = _loc3_;
            _loc2_ += 8;
        }
        _loc3_ = param1 >> 4;
        if (_loc3_ != 0) {
            param1 = _loc3_;
            _loc2_ += 4;
        }
        _loc3_ = param1 >> 2;
        if (_loc3_ != 0) {
            param1 = _loc3_;
            _loc2_ += 2;
        }
        _loc3_ = param1 >> 1;
        if (_loc3_ != 0) {
            param1 = _loc3_;
            _loc2_ += 1;
        }
        return _loc2_;
    }

    public bitLength(): number {
        if (this.t <= 0) {
            return 0;
        }
        return 30 * (this.t - 1) + this.nbits(this.a[this.t - 1] ^ this.s & 0x3FFFFFFF);
    }

    public mod(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = this.nbi();
        this.abs().divRemTo(param1, null, _loc2_);
        if (this.s < 0 && _loc2_.compareTo(BigInteger.ZERO) > 0) {
            param1.subTo(_loc2_, _loc2_);
        }
        return _loc2_;
    }

    public modPowInt(param1: number, param2: BigInteger): BigInteger {
        let _loc3_: IReduction = null;
        if (param1 < 256 || param2.isEven()) {
            _loc3_ = new ClassicReduction(param2);
        } else {
            _loc3_ = new MontgomeryReduction(param2);
        }
        return this.exp(param1, _loc3_);
    }

    public copyTo(param1: BigInteger): void {
        let _loc2_: number = 0;
        _loc2_ = this.t - 1;
        while (_loc2_ >= 0) {
            param1.a[_loc2_] = this.a[_loc2_];
            _loc2_--;
        }
        param1.t = this.t;
        param1.s = this.s;
    }

    public fromInt(param1: number): void {
        this.t = 1;
        this.s = param1 < 0 ? -1 : 0;
        if (param1 > 0) {
            this.a[0] = param1;
        } else if (param1 < -1) {
            this.a[0] = param1 + 1073741824;
        } else {
            this.t = 0;
        }
    }

    public fromArray(param1: ByteArray, param2: number, param3: boolean = false): void {
        let _loc9_: any;
        let _loc10_: any;
        let _loc8_: number = 0;
        _loc8_ = 8;
        let _loc6_: number = 0;
        let _loc4_: number = param1.position | 0;
        let _loc7_: number = _loc4_ + param2;
        let _loc5_: number = 0;
        this.t = 0;
        this.s = 0;
        while (--_loc7_ >= _loc4_) {
            _loc6_ = (_loc7_ < param1.length ? param1.byteAt(_loc7_) : 0) | 0;
            if (_loc5_ == 0) {
                this.a[this.t++] = _loc6_;
            } else if (_loc5_ + 8 > 30) {
                _loc9_ = this.t - 1;
                _loc10_ = this.a[_loc9_] | (_loc6_ & (1 << 30 - _loc5_) - 1) << _loc5_;
                this.a[_loc9_] = _loc10_;
                this.a[this.t++] = _loc6_ >> 30 - _loc5_;
            } else {
                _loc10_ = this.t - 1;
                _loc9_ = this.a[_loc10_] | _loc6_ << _loc5_;
                this.a[_loc10_] = _loc9_;
            }
            _loc5_ += 8;
            if (_loc5_ >= 30) {
                _loc5_ -= 30;
            }
        }
        if (!param3 && (param1.byteAt(0) & 0x80) == 128) {
            this.s = -1;
            if (_loc5_ > 0) {
                _loc9_ = this.t - 1;
                _loc10_ = this.a[_loc9_] | (1 << 30 - _loc5_) - 1 << _loc5_;
                this.a[_loc9_] = _loc10_;
            }
        }
        this.clamp();
        param1.position = Math.min(_loc4_ + param2, param1.length) >>> 0;
    }

    public clamp(): void {
        let _loc1_: number = this.s & 0x3FFFFFFF;
        while (this.t > 0 && this.a[this.t - 1] == _loc1_) {
            this.t = this.t - 1;
        }
    }

    public dlShiftTo(param1: number, param2: BigInteger): void {
        let _loc3_: number = 0;
        _loc3_ = this.t - 1;
        while (_loc3_ >= 0) {
            param2.a[_loc3_ + param1] = this.a[_loc3_];
            _loc3_--;
        }
        _loc3_ = param1 - 1;
        while (_loc3_ >= 0) {
            param2.a[_loc3_] = 0;
            _loc3_--;
        }
        param2.t = this.t + param1;
        param2.s = this.s;
    }

    public drShiftTo(param1: number, param2: BigInteger): void {
        let _loc3_: number = 0;
        _loc3_ = param1;
        while (_loc3_ < this.t) {
            param2.a[_loc3_ - param1] = this.a[_loc3_];
            _loc3_++;
        }
        param2.t = Math.max(this.t - param1, 0) | 0;
        param2.s = this.s;
    }

    public lShiftTo(param1: number, param2: BigInteger): void {
        let _loc6_: number = 0;
        let _loc3_: number = param1 % 30;
        let _loc5_: number = 30 - _loc3_;
        let _loc7_: number = (1 << _loc5_) - 1;
        let _loc8_: number = param1 / 30 | 0;
        let _loc4_: number = this.s << _loc3_ & 0x3FFFFFFF;
        _loc6_ = this.t - 1;
        while (_loc6_ >= 0) {
            param2.a[_loc6_ + _loc8_ + 1] = this.a[_loc6_] >> _loc5_ | _loc4_;
            _loc4_ = (this.a[_loc6_] & _loc7_) << _loc3_;
            _loc6_--;
        }
        _loc6_ = _loc8_ - 1;
        while (_loc6_ >= 0) {
            param2.a[_loc6_] = 0;
            _loc6_--;
        }
        param2.a[_loc8_] = _loc4_;
        param2.t = this.t + _loc8_ + 1;
        param2.s = this.s;
        param2.clamp();
    }

    public rShiftTo(param1: number, param2: BigInteger): void {
        let _loc8_: any;
        let _loc9_: any;
        let _loc5_: number = 0;
        param2.s = this.s;
        let _loc7_: number = param1 / 30 | 0;
        if (_loc7_ >= this.t) {
            param2.t = 0;
            return;
        }
        let _loc3_: number = param1 % 30;
        let _loc4_: number = 30 - _loc3_;
        let _loc6_: number = (1 << _loc3_) - 1;
        param2.a[0] = this.a[_loc7_] >> _loc3_;
        _loc5_ = _loc7_ + 1;
        while (_loc5_ < this.t) {
            _loc8_ = _loc5_ - _loc7_ - 1;
            _loc9_ = param2.a[_loc8_] | (this.a[_loc5_] & _loc6_) << _loc4_;
            param2.a[_loc8_] = _loc9_;
            param2.a[_loc5_ - _loc7_] = this.a[_loc5_] >> _loc3_;
            _loc5_++;
        }
        if (_loc3_ > 0) {
            _loc9_ = this.t - _loc7_ - 1;
            _loc8_ = param2.a[_loc9_] | (this.s & _loc6_) << _loc4_;
            param2.a[_loc9_] = _loc8_;
        }
        param2.t = this.t - _loc7_;
        param2.clamp();
    }

    public subTo(param1: BigInteger, param2: BigInteger): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = Math.min(param1.t, this.t) | 0;
        while (_loc4_ < _loc5_) {
            _loc3_ = _loc3_ + (this.a[_loc4_] - param1.a[_loc4_]) | 0;
            param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
            _loc3_ >>= 30;
        }
        if (param1.t < this.t) {
            _loc3_ -= param1.s;
            while (_loc4_ < this.t) {
                _loc3_ = _loc3_ + this.a[_loc4_] | 0;
                param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
                _loc3_ >>= 30;
            }
            _loc3_ += this.s;
        } else {
            _loc3_ += this.s;
            while (_loc4_ < param1.t) {
                _loc3_ = _loc3_ - param1.a[_loc4_] | 0;
                param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
                _loc3_ >>= 30;
            }
            _loc3_ -= param1.s;
        }
        param2.s = _loc3_ < 0 ? -1 : 0;
        if (_loc3_ < -1) {
            param2.a[_loc4_++] = 1073741824 + _loc3_;
        } else if (_loc3_ > 0) {
            param2.a[_loc4_++] = _loc3_;
        }
        param2.t = _loc4_;
        param2.clamp();
    }

    public am(param1: number, param2: number, param3: BigInteger, param4: number, param5: number, param6: number): number {
        let _loc10_: number = 0;
        let _loc9_: number = 0;
        let _loc11_: number = 0;
        let _loc8_: number = param2 & 0x7FFF;
        let _loc7_: number = param2 >> 15;
        while (--param6 >= 0) {
            _loc10_ = this.a[param1] & 0x7FFF;
            _loc9_ = this.a[param1++] >> 15;
            _loc11_ = _loc7_ * _loc10_ + _loc9_ * _loc8_;
            _loc10_ = _loc8_ * _loc10_ + ((_loc11_ & 0x7FFF) << 15) + param3.a[param4] + (param5 & 0x3FFFFFFF) | 0;
            param5 = (_loc10_ >>> 30) + (_loc11_ >>> 15) + _loc7_ * _loc9_ + (param5 >>> 30);
            param3.a[param4++] = _loc10_ & 0x3FFFFFFF;
        }
        return param5;
    }

    public multiplyTo(param1: BigInteger, param2: BigInteger): void {
        let _loc3_: BigInteger = this.abs();
        let _loc4_: BigInteger = param1.abs();
        let _loc5_: number = _loc3_.t;
        param2.t = _loc5_ + _loc4_.t;
        while (--_loc5_ >= 0) {
            param2.a[_loc5_] = 0;
        }
        _loc5_ = 0;
        while (_loc5_ < _loc4_.t) {
            param2.a[_loc5_ + _loc3_.t] = _loc3_.am(0, _loc4_.a[_loc5_] | 0, param2, _loc5_, 0, _loc3_.t);
            _loc5_++;
        }
        param2.s = 0;
        param2.clamp();
        if (this.s != param1.s) {
            BigInteger.ZERO.subTo(param2, param2);
        }
    }

    public squareTo(param1: BigInteger): void {
        let _loc6_: number = NaN;
        let _loc5_: number = NaN;
        let _loc2_: number = 0;
        let _loc3_: BigInteger = this.abs();
        let _loc4_: number = param1.t = 2 * _loc3_.t;
        while (--_loc4_ >= 0) {
            param1.a[_loc4_] = 0;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc3_.t - 1) {
            _loc2_ = _loc3_.am(_loc4_, _loc3_.a[_loc4_] | 0, param1, 2 * _loc4_, 0, 1);
            param1.a[_loc4_ + _loc3_.t] += _loc3_.am(_loc4_ + 1, 2 * _loc3_.a[_loc4_] | 0, param1, 2 * _loc4_ + 1, _loc2_, _loc3_.t - _loc4_ - 1);
            if (_loc6_ >= 1073741824) {
                _loc6_ = _loc4_ + _loc3_.t;
                _loc5_ = param1.a[_loc6_] - 1073741824;
                param1.a[_loc6_] = _loc5_;
                param1.a[_loc4_ + _loc3_.t + 1] = 1;
            }
            _loc4_++;
        }
        if (param1.t > 0) {
            _loc5_ = param1.t - 1;
            _loc6_ = Number(param1.a[_loc5_] + _loc3_.am(_loc4_, _loc3_.a[_loc4_] | 0, param1, 2 * _loc4_, 0, 1));
            param1.a[_loc5_] = _loc6_;
        }
        param1.s = 0;
        param1.clamp();
    }

    public divRemTo(param1: BigInteger, param2: BigInteger = null, param3: BigInteger = null): void {
        let _loc12_: number = 0;
        let _loc18_: BigInteger = param1.abs();
        if (_loc18_.t <= 0) {
            return;
        }
        let _loc5_: BigInteger = this.abs();
        if (_loc5_.t < _loc18_.t) {
            if (param2 != null) {
                param2.fromInt(0);
            }
            if (param3 != null) {
                this.copyTo(param3);
            }
            return;
        }
        if (param3 == null) {
            param3 = this.nbi();
        }
        let _loc15_: BigInteger = this.nbi();
        let _loc19_: number = this.s;
        let _loc7_: number = param1.s;
        let _loc4_: number = 30 - this.nbits(_loc18_.a[_loc18_.t - 1] | 0);
        if (_loc4_ > 0) {
            _loc18_.lShiftTo(_loc4_, _loc15_);
            _loc5_.lShiftTo(_loc4_, param3);
        } else {
            _loc18_.copyTo(_loc15_);
            _loc5_.copyTo(param3);
        }
        let _loc16_: number = _loc15_.t;
        let _loc14_: number = _loc15_.a[_loc16_ - 1] | 0;
        if (_loc14_ == 0) {
            return;
        }
        let _loc17_: number = _loc14_ * (1 << 22) + (_loc16_ > 1 ? _loc15_.a[_loc16_ - 2] >> 8 : 0);
        let _loc10_: number = BigInteger._SafeStr_6833 / _loc17_;
        let _loc11_: number = (1 << 22) / _loc17_;
        let _loc6_: number = 256;
        let _loc8_: number = param3.t;
        let _loc9_: number = _loc8_ - _loc16_;
        let _loc13_: BigInteger = param2 == null ? this.nbi() : param2;
        _loc15_.dlShiftTo(_loc9_, _loc13_);
        if (param3.compareTo(_loc13_) >= 0) {
            param3.a[param3.t++] = 1;
            param3.subTo(_loc13_, param3);
        }
        BigInteger._SafeStr_2392.dlShiftTo(_loc16_, _loc13_);
        _loc13_.subTo(_loc15_, _loc15_);
        while (_loc15_.t < _loc16_) {
            _loc15_.a[_loc15_.t++] = 0;
        }
        while (--_loc9_ >= 0) {
            _loc12_ = (param3.a[--_loc8_] == _loc14_ ? 1073741823 : Number(param3.a[_loc8_]) * _loc10_ + (Number(param3.a[_loc8_ - 1]) + _loc6_) * _loc11_) | 0;
            if ((param3.a[_loc8_] += _loc15_.am(0, _loc12_, param3, _loc9_, 0, _loc16_)) < _loc12_) {
                _loc15_.dlShiftTo(_loc9_, _loc13_);
                param3.subTo(_loc13_, param3);
                while (param3.a[_loc8_] < --_loc12_) {
                    param3.subTo(_loc13_, param3);
                }
            }
        }
        if (param2 != null) {
            param3.drShiftTo(_loc16_, param2);
            if (_loc19_ != _loc7_) {
                BigInteger.ZERO.subTo(param2, param2);
            }
        }
        param3.t = _loc16_;
        param3.clamp();
        if (_loc4_ > 0) {
            param3.rShiftTo(_loc4_, param3);
        }
        if (_loc19_ < 0) {
            BigInteger.ZERO.subTo(param3, param3);
        }
    }

    public invDigit(): number {
        if (this.t < 1) {
            return 0;
        }
        let _loc1_: number = this.a[0] | 0;
        if ((_loc1_ & 1) == 0) {
            return 0;
        }
        let _loc2_: number = _loc1_ & 3;
        _loc2_ = _loc2_ * (2 - (_loc1_ & 0x0F) * _loc2_) & 0x0F;
        _loc2_ = _loc2_ * (2 - (_loc1_ & 0xFF) * _loc2_) & 0xFF;
        _loc2_ = _loc2_ * (2 - ((_loc1_ & 0xFFFF) * _loc2_ & 0xFFFF)) & 0xFFFF;
        _loc2_ = _loc2_ * (2 - _loc1_ * _loc2_ % 1073741824) % 1073741824;
        return _loc2_ > 0 ? 1073741824 - _loc2_ : -_loc2_;
    }

    public isEven(): boolean {
        return (this.t > 0 ? this.a[0] & 1 : this.s) == 0;
    }

    public exp(param1: number, param2: IReduction): BigInteger {
        let _loc5_: BigInteger = null;
        if (param1 > 4294967295 || param1 < 1) {
            return BigInteger._SafeStr_2392;
        }
        let _loc4_: BigInteger = this.nbi();
        let _loc3_: BigInteger = this.nbi();
        let _loc6_: BigInteger = param2.convert(this);
        let _loc7_: number = this.nbits(param1) - 1;
        _loc6_.copyTo(_loc4_);
        while (--_loc7_ >= 0) {
            param2.sqrTo(_loc4_, _loc3_);
            if ((param1 & 1 << _loc7_) > 0) {
                param2.mulTo(_loc3_, _loc6_, _loc4_);
            } else {
                _loc5_ = _loc4_;
                _loc4_ = _loc3_;
                _loc3_ = _loc5_;
            }
        }
        return param2.revert(_loc4_);
    }

    public intAt(param1: string, param2: number): number {
        let _loc3_: number = parseInt(param1.charAt(param2), 36);
        return (isNaN(_loc3_) ? -1 : _loc3_) | 0;
    }

    protected nbi(): any {
        return new BigInteger();
    }

    public clone(): BigInteger {
        let _loc1_: BigInteger = new BigInteger();
        this.copyTo(_loc1_);
        return _loc1_;
    }

    public intValue(): number {
        if (this.s < 0) {
            if (this.t == 1) {
                return this.a[0] - 1073741824 | 0;
            }
            if (this.t == 0) {
                return -1;
            }
        } else {
            if (this.t == 1) {
                return this.a[0] | 0;
            }
            if (this.t == 0) {
                return 0;
            }
        }
        return (this.a[1] & 3) << 30 | this.a[0];
    }

    public byteValue(): number {
        return this.t == 0 ? this.s : this.a[0] << 24 >> 24;
    }

    public shortValue(): number {
        return this.t == 0 ? this.s : this.a[0] << 16 >> 16;
    }

    protected chunkSize(param1: number): number {
        return Math.floor(0.6931471805599453 * 30 / Math.log(param1)) | 0;
    }

    public sigNum(): number {
        if (this.s < 0) {
            return -1;
        }
        if (this.t <= 0 || this.t == 1 && this.a[0] <= 0) {
            return 0;
        }
        return 1;
    }

    public toRadix(param1: number = 10): string {
        if (this.sigNum() == 0 || param1 < 2 || param1 > 32) {
            return "0";
        }
        let _loc2_: number = this.chunkSize(param1);
        let _loc3_: number = Math.pow(param1, _loc2_);
        let _loc5_: BigInteger = BigInteger.nbv(_loc3_ | 0);
        let _loc6_: BigInteger = this.nbi();
        let _loc7_: BigInteger = this.nbi();
        let _loc4_: string = "";
        this.divRemTo(_loc5_, _loc6_, _loc7_);
        while (_loc6_.sigNum() > 0) {
            _loc4_ = (_loc3_ + _loc7_.intValue()).toString(param1).substr(1) + _loc4_;
            _loc6_.divRemTo(_loc5_, _loc6_, _loc7_);
        }
        return _loc7_.intValue().toString(param1) + _loc4_;
    }

    public fromRadix(param1: string, param2: number = 10): void {
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        this.fromInt(0);
        let _loc3_: number = this.chunkSize(param2);
        let _loc4_: number = Math.pow(param2, _loc3_);
        let _loc9_: boolean = false;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < param1.length) {
            _loc6_ = this.intAt(param1, _loc7_);
            if (_loc6_ < 0) {
                if (param1.charAt(_loc7_) == "-" && this.sigNum() == 0) {
                    _loc9_ = true;
                }
            } else {
                _loc5_ = param2 * _loc5_ + _loc6_;
                if (++_loc8_ >= _loc3_) {
                    this.dMultiply(_loc4_ | 0);
                    this.dAddOffset(_loc5_, 0);
                    _loc8_ = 0;
                    _loc5_ = 0;
                }
            }
            _loc7_++;
        }
        if (_loc8_ > 0) {
            this.dMultiply(Math.pow(param2, _loc8_) | 0);
            this.dAddOffset(_loc5_, 0);
        }
        if (_loc9_) {
            BigInteger.ZERO.subTo(this, this);
        }
    }

    public toByteArray(): ByteArray {
        let _loc3_: number = 0;
        let _loc4_: number = this.t;
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.setByteAt(0, this.s);
        let _loc1_: number = 30 - _loc4_ * 30 % 8;
        let _loc5_: number = 0;
        if (_loc4_-- > 0) {
            if (_loc1_ < 30 && (_loc3_ = this.a[_loc4_] >> _loc1_) != (this.s & 0x3FFFFFFF) >> _loc1_) {
                _loc2_.setByteAt(_loc5_++, _loc3_ | this.s << 30 - _loc1_);
            }
            while (_loc4_ >= 0) {
                if (_loc1_ < 8) {
                    _loc3_ = (this.a[_loc4_] & (1 << _loc1_) - 1) << 8 - _loc1_;
                    _loc3_ |= this.a[--_loc4_] >> (_loc1_ += 30 - 8);
                } else {
                    _loc3_ = this.a[_loc4_] >> (_loc1_ -= 8) & 0xFF;
                    if (_loc1_ <= 0) {
                        _loc1_ += 30;
                        _loc4_--;
                    }
                }
                if ((_loc3_ & 0x80) != 0) {
                    _loc3_ |= -256;
                }
                if (_loc5_ == 0 && (this.s & 0x80) != (_loc3_ & 0x80)) {
                    _loc5_++;
                }
                if (_loc5_ > 0 || _loc3_ != this.s) {
                    _loc2_.setByteAt(_loc5_++, _loc3_);
                }
            }
        }
        return _loc2_;
    }

    public equals(param1: BigInteger): boolean {
        return this.compareTo(param1) == 0;
    }

    public min(param1: BigInteger): BigInteger {
        return this.compareTo(param1) < 0 ? this : param1;
    }

    public max(param1: BigInteger): BigInteger {
        return this.compareTo(param1) > 0 ? this : param1;
    }

    protected bitwiseTo(param1: BigInteger, param2: (...args: any[]) => any, param3: BigInteger): void {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: number = Math.min(param1.t, this.t) | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc6_) {
            param3.a[_loc5_] = param2(this.a[_loc5_], param1.a[_loc5_]);
            _loc5_++;
        }
        if (param1.t < this.t) {
            _loc4_ = param1.s & 0x3FFFFFFF;
            _loc5_ = _loc6_;
            while (_loc5_ < this.t) {
                param3.a[_loc5_] = param2(this.a[_loc5_], _loc4_);
                _loc5_++;
            }
            param3.t = this.t;
        } else {
            _loc4_ = this.s & 0x3FFFFFFF;
            _loc5_ = _loc6_;
            while (_loc5_ < param1.t) {
                param3.a[_loc5_] = param2(_loc4_, param1.a[_loc5_]);
                _loc5_++;
            }
            param3.t = param1.t;
        }
        param3.s = param2(this.s, param1.s) | 0;
        param3.clamp();
    }

    private op_and = (param1: number, param2: number): number => {
        return param1 & param2;
    };

    public and(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.bitwiseTo(param1, this.op_and, _loc2_);
        return _loc2_;
    }

    private op_or = (param1: number, param2: number): number => {
        return param1 | param2;
    };

    public or(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.bitwiseTo(param1, this.op_or, _loc2_);
        return _loc2_;
    }

    private op_xor = (param1: number, param2: number): number => {
        return param1 ^ param2;
    };

    public xor(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.bitwiseTo(param1, this.op_xor, _loc2_);
        return _loc2_;
    }

    private op_andnot = (param1: number, param2: number): number => {
        return param1 & ~param2;
    };

    public andNot(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.bitwiseTo(param1, this.op_andnot, _loc2_);
        return _loc2_;
    }

    public not(): BigInteger {
        let _loc2_: number = 0;
        let _loc1_: BigInteger = new BigInteger();
        _loc2_ = 0;
        while (_loc2_ < this.t) {
            _loc1_[_loc2_] = 0x3FFFFFFF & ~this.a[_loc2_];
            _loc2_++;
        }
        _loc1_.t = this.t;
        _loc1_.s = ~this.s;
        return _loc1_;
    }

    public shiftLeft(param1: number): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        if (param1 < 0) {
            this.rShiftTo(-param1, _loc2_);
        } else {
            this.lShiftTo(param1, _loc2_);
        }
        return _loc2_;
    }

    public shiftRight(param1: number): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        if (param1 < 0) {
            this.lShiftTo(-param1, _loc2_);
        } else {
            this.rShiftTo(param1, _loc2_);
        }
        return _loc2_;
    }

    private lbit(param1: number): number {
        if (param1 == 0) {
            return -1;
        }
        let _loc2_: number = 0;
        if ((param1 & 0xFFFF) == 0) {
            param1 >>= 16;
            _loc2_ += 16;
        }
        if ((param1 & 0xFF) == 0) {
            param1 >>= 8;
            _loc2_ += 8;
        }
        if ((param1 & 0x0F) == 0) {
            param1 >>= 4;
            _loc2_ += 4;
        }
        if ((param1 & 3) == 0) {
            param1 >>= 2;
            _loc2_ += 2;
        }
        if ((param1 & 1) == 0) {
            _loc2_++;
        }
        return _loc2_;
    }

    public getLowestSetBit(): number {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this.t) {
            if (this.a[_loc1_] != 0) {
                return _loc1_ * 30 + this.lbit(this.a[_loc1_] | 0);
            }
            _loc1_++;
        }
        if (this.s < 0) {
            return this.t * 30;
        }
        return -1;
    }

    private cbit(param1: number): number {
        let _loc2_: number = 0;
        while (param1 != 0) {
            param1 &= param1 - 1;
            _loc2_++;
        }
        return _loc2_ | 0;
    }

    public bitCount(): number {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: number = this.s & 0x3FFFFFFF;
        _loc3_ = 0;
        while (_loc3_ < this.t) {
            _loc1_ += this.cbit(this.a[_loc3_] ^ _loc2_);
            _loc3_++;
        }
        return _loc1_;
    }

    public testBit(param1: number): boolean {
        let _loc2_: number = Math.floor(param1 / 30) | 0;
        if (_loc2_ >= this.t) {
            return this.s != 0;
        }
        return (this.a[_loc2_] & 1 << param1 % 30) != 0;
    }

    protected changeBit(param1: number, param2: (...args: any[]) => any): BigInteger {
        let _loc3_: BigInteger = BigInteger._SafeStr_2392.shiftLeft(param1);
        this.bitwiseTo(_loc3_, param2, _loc3_);
        return _loc3_;
    }

    public setBit(param1: number): BigInteger {
        return this.changeBit(param1, this.op_or);
    }

    public clearBit(param1: number): BigInteger {
        return this.changeBit(param1, this.op_andnot);
    }

    public flipBit(param1: number): BigInteger {
        return this.changeBit(param1, this.op_xor);
    }

    protected addTo(param1: BigInteger, param2: BigInteger): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = Math.min(param1.t, this.t) | 0;
        while (_loc4_ < _loc5_) {
            _loc3_ = _loc3_ + (this.a[_loc4_] + param1.a[_loc4_]) | 0;
            param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
            _loc3_ >>= 30;
        }
        if (param1.t < this.t) {
            _loc3_ += param1.s;
            while (_loc4_ < this.t) {
                _loc3_ = _loc3_ + this.a[_loc4_] | 0;
                param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
                _loc3_ >>= 30;
            }
            _loc3_ += this.s;
        } else {
            _loc3_ += this.s;
            while (_loc4_ < param1.t) {
                _loc3_ = _loc3_ + param1.a[_loc4_] | 0;
                param2.a[_loc4_++] = _loc3_ & 0x3FFFFFFF;
                _loc3_ >>= 30;
            }
            _loc3_ += param1.s;
        }
        param2.s = _loc3_ < 0 ? -1 : 0;
        if (_loc3_ > 0) {
            param2.a[_loc4_++] = _loc3_;
        } else if (_loc3_ < -1) {
            param2.a[_loc4_++] = 1073741824 + _loc3_;
        }
        param2.t = _loc4_;
        param2.clamp();
    }

    public add(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.addTo(param1, _loc2_);
        return _loc2_;
    }

    public subtract(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.subTo(param1, _loc2_);
        return _loc2_;
    }

    public multiply(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.multiplyTo(param1, _loc2_);
        return _loc2_;
    }

    public divide(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.divRemTo(param1, _loc2_, null);
        return _loc2_;
    }

    public remainder(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = new BigInteger();
        this.divRemTo(param1, null, _loc2_);
        return _loc2_;
    }

    public divideAndRemainder(param1: BigInteger): any[] {
        let _loc2_: BigInteger = new BigInteger();
        let _loc3_: BigInteger = new BigInteger();
        this.divRemTo(param1, _loc2_, _loc3_);
        return [_loc2_, _loc3_];
    }

    public dMultiply(param1: number): void {
        this.a[this.t] = this.am(0, param1 - 1, this, 0, 0, this.t);
        this.t = this.t + 1;
        this.clamp();
    }

    public dAddOffset(param1: number, param2: number): void {
        while (this.t <= param2) {
            this.a[this.t++] = 0;
        }
        let _loc3_: any = param2;
        let _loc4_: any = this.a[_loc3_] + param1;
        this.a[_loc3_] = _loc4_;
        while (this.a[param2] >= 1073741824) {
            _loc4_ = param2;
            _loc3_ = this.a[_loc4_] - 1073741824;
            this.a[_loc4_] = _loc3_;
            if (++param2 >= this.t) {
                this.a[this.t++] = 0;
            }
            ++this.a[param2];
        }
    }

    public pow(param1: number): BigInteger {
        return this.exp(param1, new NullReduction());
    }

    public multiplyLowerTo(param1: BigInteger, param2: number, param3: BigInteger): void {
        let _loc5_: number = 0;
        let _loc4_: number = Math.min(this.t + param1.t, param2) | 0;
        param3.s = 0;
        param3.t = _loc4_;
        while (_loc4_ > 0) {
            param3.a[--_loc4_] = 0;
        }
        _loc5_ = param3.t - this.t;
        while (_loc4_ < _loc5_) {
            param3.a[_loc4_ + this.t] = this.am(0, param1.a[_loc4_] | 0, param3, _loc4_, 0, this.t);
            _loc4_++;
        }
        _loc5_ = Math.min(param1.t, param2) | 0;
        while (_loc4_ < _loc5_) {
            this.am(0, param1.a[_loc4_] | 0, param3, _loc4_, 0, param2 - _loc4_);
            _loc4_++;
        }
        param3.clamp();
    }

    public multiplyUpperTo(param1: BigInteger, param2: number, param3: BigInteger): void {
        param2--;
        let _loc4_: number = param3.t = this.t + param1.t - param2;
        param3.s = 0;
        while (--_loc4_ >= 0) {
            param3.a[_loc4_] = 0;
        }
        _loc4_ = Math.max(param2 - this.t, 0) | 0;
        while (_loc4_ < param1.t) {
            param3.a[this.t + _loc4_ - param2] = this.am(param2 - _loc4_, param1.a[_loc4_] | 0, param3, 0, 0, this.t + _loc4_ - param2);
            _loc4_++;
        }
        param3.clamp();
        param3.drShiftTo(1, param3);
    }

    public modPow(param1: BigInteger, param2: BigInteger): BigInteger {
        let _loc10_: number = 0;
        let _loc16_: IReduction = null;
        let _loc11_: BigInteger = null;
        let _loc15_: number = 0;
        let _loc14_: BigInteger = null;
        let _loc8_: number = param1.bitLength();
        let _loc13_: BigInteger = BigInteger.nbv(1);
        if (_loc8_ <= 0) {
            return _loc13_;
        }
        if (_loc8_ < 18) {
            _loc10_ = 1;
        } else if (_loc8_ < 48) {
            _loc10_ = 3;
        } else if (_loc8_ < 144) {
            _loc10_ = 4;
        } else if (_loc8_ < 768) {
            _loc10_ = 5;
        } else {
            _loc10_ = 6;
        }
        if (_loc8_ < 8) {
            _loc16_ = new ClassicReduction(param2);
        } else if (param2.isEven()) {
            _loc16_ = new BarrettReduction(param2);
        } else {
            _loc16_ = new MontgomeryReduction(param2);
        }
        let _loc7_: any[] = [];
        let _loc12_: number = 3;
        let _loc5_: number = _loc10_ - 1;
        let _loc4_: number = (1 << _loc10_) - 1;
        _loc7_[1] = _loc16_.convert(this);
        if (_loc10_ > 1) {
            _loc11_ = new BigInteger();
            _loc16_.sqrTo(_loc7_[1], _loc11_);
            while (_loc12_ <= _loc4_) {
                _loc7_[_loc12_] = new BigInteger();
                _loc16_.mulTo(_loc11_, _loc7_[_loc12_ - 2], _loc7_[_loc12_]);
                _loc12_ += 2;
            }
        }
        let _loc9_: number = param1.t - 1;
        let _loc6_: boolean = true;
        let _loc3_: BigInteger = new BigInteger();
        _loc8_ = this.nbits(param1.a[_loc9_] | 0) - 1;
        while (_loc9_ >= 0) {
            if (_loc8_ >= _loc5_) {
                _loc15_ = param1.a[_loc9_] >> _loc8_ - _loc5_ & _loc4_;
            } else {
                _loc15_ = (param1.a[_loc9_] & (1 << _loc8_ + 1) - 1) << _loc5_ - _loc8_;
                if (_loc9_ > 0) {
                    _loc15_ |= param1.a[_loc9_ - 1] >> 30 + _loc8_ - _loc5_;
                }
            }
            _loc12_ = _loc10_;
            while ((_loc15_ & 1) == 0) {
                _loc15_ >>= 1;
                _loc12_--;
            }
            _loc8_ -= _loc12_;
            if (_loc8_ < 0) {
                _loc8_ += 30;
                _loc9_--;
            }
            if (_loc6_) {
                _loc7_[_loc15_].copyTo(_loc13_);
                _loc6_ = false;
            } else {
                while (_loc12_ > 1) {
                    _loc16_.sqrTo(_loc13_, _loc3_);
                    _loc16_.sqrTo(_loc3_, _loc13_);
                    _loc12_ -= 2;
                }
                if (_loc12_ > 0) {
                    _loc16_.sqrTo(_loc13_, _loc3_);
                } else {
                    _loc14_ = _loc13_;
                    _loc13_ = _loc3_;
                    _loc3_ = _loc14_;
                }
                _loc16_.mulTo(_loc3_, _loc7_[_loc15_], _loc13_);
            }
            while (_loc9_ >= 0 && (param1.a[_loc9_] & 1 << _loc8_) == 0) {
                _loc16_.sqrTo(_loc13_, _loc3_);
                _loc14_ = _loc13_;
                _loc13_ = _loc3_;
                _loc3_ = _loc14_;
                if (--_loc8_ < 0) {
                    _loc8_ = 30 - 1;
                    _loc9_--;
                }
            }
        }
        return _loc16_.revert(_loc13_);
    }

    public gcd(param1: BigInteger): BigInteger {
        let _loc2_: BigInteger = null;
        let _loc4_: BigInteger = this.s < 0 ? this.negate() : this.clone();
        let _loc5_: BigInteger = param1.s < 0 ? param1.negate() : param1.clone();
        if (_loc4_.compareTo(_loc5_) < 0) {
            _loc2_ = _loc4_;
            _loc4_ = _loc5_;
            _loc5_ = _loc2_;
        }
        let _loc6_: number = _loc4_.getLowestSetBit();
        let _loc3_: number = _loc5_.getLowestSetBit();
        if (_loc3_ < 0) {
            return _loc4_;
        }
        if (_loc6_ < _loc3_) {
            _loc3_ = _loc6_;
        }
        if (_loc3_ > 0) {
            _loc4_.rShiftTo(_loc3_, _loc4_);
            _loc5_.rShiftTo(_loc3_, _loc5_);
        }
        while (_loc4_.sigNum() > 0) {
            _loc6_ = _loc4_.getLowestSetBit();
            if (_loc6_ > 0) {
                _loc4_.rShiftTo(_loc6_, _loc4_);
            }
            _loc6_ = _loc5_.getLowestSetBit();
            if (_loc6_ > 0) {
                _loc5_.rShiftTo(_loc6_, _loc5_);
            }
            if (_loc4_.compareTo(_loc5_) >= 0) {
                _loc4_.subTo(_loc5_, _loc4_);
                _loc4_.rShiftTo(1, _loc4_);
            } else {
                _loc5_.subTo(_loc4_, _loc5_);
                _loc5_.rShiftTo(1, _loc5_);
            }
        }
        if (_loc3_ > 0) {
            _loc5_.lShiftTo(_loc3_, _loc5_);
        }
        return _loc5_;
    }

    protected modInt(param1: number): number {
        let _loc4_: number = 0;
        if (param1 <= 0) {
            return 0;
        }
        let _loc3_: number = 1073741824 % param1;
        let _loc2_: number = this.s < 0 ? param1 - 1 : 0;
        if (this.t > 0) {
            if (_loc3_ == 0) {
                _loc2_ = this.a[0] % param1 | 0;
            } else {
                _loc4_ = this.t - 1;
                while (_loc4_ >= 0) {
                    _loc2_ = (_loc3_ * _loc2_ + this.a[_loc4_]) % param1 | 0;
                    _loc4_--;
                }
            }
        }
        return _loc2_;
    }

    public modInverse(param1: BigInteger): BigInteger {
        let _loc3_: boolean = param1.isEven();
        if (this.isEven() && _loc3_ || param1.sigNum() == 0) {
            return BigInteger.ZERO;
        }
        let _loc7_: BigInteger = param1.clone();
        let _loc8_: BigInteger = this.clone();
        let _loc2_: BigInteger = BigInteger.nbv(1);
        let _loc4_: BigInteger = BigInteger.nbv(0);
        let _loc5_: BigInteger = BigInteger.nbv(0);
        let _loc6_: BigInteger = BigInteger.nbv(1);
        while (_loc7_.sigNum() != 0) {
            while (_loc7_.isEven()) {
                _loc7_.rShiftTo(1, _loc7_);
                if (_loc3_) {
                    if (!_loc2_.isEven() || !_loc4_.isEven()) {
                        _loc2_.addTo(this, _loc2_);
                        _loc4_.subTo(param1, _loc4_);
                    }
                    _loc2_.rShiftTo(1, _loc2_);
                } else if (!_loc4_.isEven()) {
                    _loc4_.subTo(param1, _loc4_);
                }
                _loc4_.rShiftTo(1, _loc4_);
            }
            while (_loc8_.isEven()) {
                _loc8_.rShiftTo(1, _loc8_);
                if (_loc3_) {
                    if (!_loc5_.isEven() || !_loc6_.isEven()) {
                        _loc5_.addTo(this, _loc5_);
                        _loc6_.subTo(param1, _loc6_);
                    }
                    _loc5_.rShiftTo(1, _loc5_);
                } else if (!_loc6_.isEven()) {
                    _loc6_.subTo(param1, _loc6_);
                }
                _loc6_.rShiftTo(1, _loc6_);
            }
            if (_loc7_.compareTo(_loc8_) >= 0) {
                _loc7_.subTo(_loc8_, _loc7_);
                if (_loc3_) {
                    _loc2_.subTo(_loc5_, _loc2_);
                }
                _loc4_.subTo(_loc6_, _loc4_);
            } else {
                _loc8_.subTo(_loc7_, _loc8_);
                if (_loc3_) {
                    _loc5_.subTo(_loc2_, _loc5_);
                }
                _loc6_.subTo(_loc4_, _loc6_);
            }
        }
        if (_loc8_.compareTo(BigInteger._SafeStr_2392) != 0) {
            return BigInteger.ZERO;
        }
        if (_loc6_.compareTo(param1) >= 0) {
            return _loc6_.subtract(param1);
        }
        if (_loc6_.sigNum() < 0) {
            _loc6_.addTo(param1, _loc6_);
            if (_loc6_.sigNum() < 0) {
                return _loc6_.add(param1);
            }
            return _loc6_;
        }
        return _loc6_;
    }

    public isProbablePrime(param1: number): boolean {
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: BigInteger = this.abs();
        if (_loc2_.t == 1 && _loc2_.a[0] <= BigInteger.lowprimes[BigInteger.lowprimes.length - 1]) {
            _loc3_ = 0;
            while (_loc3_ < BigInteger.lowprimes.length) {
                if (_loc2_[0] == BigInteger.lowprimes[_loc3_]) {
                    return true;
                }
                _loc3_++;
            }
            return false;
        }
        if (_loc2_.isEven()) {
            return false;
        }
        _loc3_ = 1;
        while (_loc3_ < BigInteger.lowprimes.length) {
            _loc5_ = BigInteger.lowprimes[_loc3_] | 0;
            _loc4_ = _loc3_ + 1;
            while (_loc4_ < BigInteger.lowprimes.length && _loc5_ < BigInteger._SafeStr_6303) {
                _loc5_ = _loc5_ * BigInteger.lowprimes[_loc4_++] | 0;
            }
            _loc5_ = _loc2_.modInt(_loc5_);
            while (_loc3_ < _loc4_) {
                if (_loc5_ % BigInteger.lowprimes[_loc3_++] == 0) {
                    return false;
                }
            }
        }
        return _loc2_.millerRabin(param1);
    }

    protected millerRabin(param1: number): boolean {
        let _loc5_: number = 0;
        let _loc6_: BigInteger = null;
        let _loc7_: number = 0;
        let _loc4_: BigInteger = this.subtract(BigInteger._SafeStr_2392);
        let _loc8_: number = _loc4_.getLowestSetBit();
        if (_loc8_ <= 0) {
            return false;
        }
        let _loc3_: BigInteger = _loc4_.shiftRight(_loc8_);
        param1 = param1 + 1 >> 1;
        if (param1 > BigInteger.lowprimes.length) {
            param1 = BigInteger.lowprimes.length | 0;
        }
        let _loc2_: BigInteger = new BigInteger();
        _loc5_ = 0;
        while (_loc5_ < param1) {
            _loc2_.fromInt(BigInteger.lowprimes[_loc5_] | 0);
            _loc6_ = _loc2_.modPow(_loc3_, this);
            if (_loc6_.compareTo(BigInteger._SafeStr_2392) != 0 && _loc6_.compareTo(_loc4_) != 0) {
                _loc7_ = 1;
                while (_loc7_++ < _loc8_ && _loc6_.compareTo(_loc4_) != 0) {
                    _loc6_ = _loc6_.modPowInt(2, this);
                    if (_loc6_.compareTo(BigInteger._SafeStr_2392) == 0) {
                        return false;
                    }
                }
                if (_loc6_.compareTo(_loc4_) != 0) {
                    return false;
                }
            }
            _loc5_++;
        }
        return true;
    }

    public primify(param1: number, param2: number): void {
        if (!this.testBit(param1 - 1)) {
            this.bitwiseTo(BigInteger._SafeStr_2392.shiftLeft(param1 - 1), this.op_or, this);
        }
        if (this.isEven()) {
            this.dAddOffset(1, 0);
        }
        while (!this.isProbablePrime(param2)) {
            this.dAddOffset(2, 0);
            while (this.bitLength() > param1) {
                this.subTo(BigInteger._SafeStr_2392.shiftLeft(param1 - 1), this);
            }
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BigInteger.#staticsReady) return;
        BigInteger.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BigInteger, name, { value, writable: true, configurable: true, enumerable: true });
        set("ZERO", null);
        set("_SafeStr_2392", null);
        set("_SafeStr_6303", 0);
        set("ZERO", BigInteger.nbv(0));
        set("_SafeStr_2392", BigInteger.nbv(1));
        set("_SafeStr_6303", 67108864 / BigInteger.lowprimes[BigInteger.lowprimes.length - 1] | 0);
    }
}
