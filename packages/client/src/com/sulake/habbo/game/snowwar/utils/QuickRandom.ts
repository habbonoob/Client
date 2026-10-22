import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class QuickRandom {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::QuickRandom'); }

    public static iterateSeed(param1: number): number {
        let _loc2_: any = 0;
        if (param1 == 0) {
            param1 = -1;
        }
        _loc2_ = param1 << 13;
        param1 ^= _loc2_;
        _loc2_ = param1 >> 17;
        param1 ^= _loc2_;
        _loc2_ = param1 << 5;
        return param1 ^ _loc2_;
    }

    public static getRandomNumber(param1: number, param2: number): number {
        if (param2 == 0) {
            return 0;
        }
        return (param1 < 0 ? param1 * -1 : param1) % param2;
    }

    protected static bitPrint(param1: number): string {
        let _loc2_: number = 0;
        let _loc3_: string = "";
        _loc2_ = 31;
        while (_loc2_ >= 0) {
            _loc3_ += (param1 & 1 << _loc2_) > 0 ? "1" : "0";
            _loc2_--;
        }
        return _loc3_;
    }

    constructor() {
    }
}
