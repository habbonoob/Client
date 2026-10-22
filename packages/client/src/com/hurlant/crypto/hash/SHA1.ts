import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHash } from '@/com/hurlant/crypto/hash/IHash';
import { SHABase } from '@/com/hurlant/crypto/hash/SHABase';

export class SHA1 extends SHABase implements IHash {
    static { registerClassName(this, 'com.hurlant.crypto.hash::SHA1'); }

    public static readonly _SafeStr_7521: number = 20;

    constructor() {
        super();
    }

    public override getHashSize(): number {
        return 20;
    }

    protected override core(param1: any[], param2: number): any[] {
        let _loc9_: any = 0;
        let _loc13_: any = 0;
        let _loc14_: any = 0;
        let _loc8_: any = 0;
        let _loc10_: any = 0;
        let _loc11_: any = 0;
        let _loc12_: any = 0;
        let _loc15_: any = 0;
        param1[param2 >> 5] |= 128 << 24 - param2 % 32;
        param1[(param2 + 64 >> 9 << 4) + 15] = param2;
        let _loc16_: any[] = [];
        let _loc3_: any = 1732584193;
        let _loc4_: any = 4023233417;
        let _loc5_: any = 2562383102;
        let _loc6_: any = 271733878;
        let _loc7_: any = 3285377520;
        _loc9_ = 0;
        while (_loc9_ < param1.length) {
            _loc13_ = _loc3_;
            _loc14_ = _loc4_;
            _loc8_ = _loc5_;
            _loc10_ = _loc6_;
            _loc11_ = _loc7_;
            _loc12_ = 0;
            while (_loc12_ < 80) {
                if (_loc12_ < 16) {
                    _loc16_[_loc12_] = param1[_loc9_ + _loc12_] || 0;
                } else {
                    _loc16_[_loc12_] = this.rol((_loc16_[_loc12_ - 3] ^ _loc16_[_loc12_ - 8] ^ _loc16_[_loc12_ - 14] ^ _loc16_[_loc12_ - 16]) >>> 0, 1);
                }
                _loc15_ = this.rol(_loc3_ >>> 0, 5) + this.ft(_loc12_ >>> 0, _loc4_ >>> 0, _loc5_ >>> 0, _loc6_ >>> 0) + _loc7_ + _loc16_[_loc12_] + this.kt(_loc12_ >>> 0);
                _loc7_ = _loc6_;
                _loc6_ = _loc5_;
                _loc5_ = this.rol(_loc4_ >>> 0, 30);
                _loc4_ = _loc3_;
                _loc3_ = _loc15_;
                _loc12_++;
            }
            _loc3_ += _loc13_;
            _loc4_ += _loc14_;
            _loc5_ += _loc8_;
            _loc6_ += _loc10_;
            _loc7_ += _loc11_;
            _loc9_ += 16;
        }
        return [_loc3_, _loc4_, _loc5_, _loc6_, _loc7_];
    }

    private rol(param1: number, param2: number): number {
        return (param1 << param2 | param1 >>> 32 - param2) >>> 0;
    }

    private ft(param1: number, param2: number, param3: number, param4: number): number {
        if (param1 < 20) {
            return (param2 & param3 | ~param2 & param4) >>> 0;
        }
        if (param1 < 40) {
            return (param2 ^ param3 ^ param4) >>> 0;
        }
        if (param1 < 60) {
            return (param2 & param3 | param2 & param4 | param3 & param4) >>> 0;
        }
        return (param2 ^ param3 ^ param4) >>> 0;
    }

    private kt(param1: number): number {
        return (param1 < 20 ? 1518500249 : (param1 < 40 ? 1859775393 : (param1 < 60 ? 2400959708 : 3395469782))) >>> 0;
    }

    public override toString(): string {
        return "sha1";
    }
}
