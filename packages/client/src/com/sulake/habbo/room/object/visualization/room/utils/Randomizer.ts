import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Randomizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.utils::Randomizer'); }

    public static readonly DEFAULT_SEED: number = 1;
    public static readonly DEFAULT_MODULUS: number = 16777216;
    private static _SafeStr_2524: Randomizer = null;

    public static setSeed(param1: number = 1): void {
        if (Randomizer._SafeStr_2524 == null) {
            Randomizer._SafeStr_2524 = new Randomizer();
        }
        Randomizer._SafeStr_2524.seed = param1;
    }

    public static setModulus(param1: number = 16777216): void {
        if (Randomizer._SafeStr_2524 == null) {
            Randomizer._SafeStr_2524 = new Randomizer();
        }
        Randomizer._SafeStr_2524.modulus = param1;
    }

    public static getValues(param1: number, param2: number, param3: number): any[] {
        if (Randomizer._SafeStr_2524 == null) {
            Randomizer._SafeStr_2524 = new Randomizer();
        }
        return Randomizer._SafeStr_2524.getRandomValues(param1, param2, param3);
    }

    public static getArray(param1: number, param2: number): any[] {
        if (Randomizer._SafeStr_2524 == null) {
            Randomizer._SafeStr_2524 = new Randomizer();
        }
        return Randomizer._SafeStr_2524.getRandomArray(param1, param2);
    }

    constructor() {
    }

    private _seed: number = 1;
    private _multiplier: number = 69069;
    private _increment: number = 5;
    private _modulus: number = 16777216;

    public set modulus(param1: number) {
        if (param1 < 1) {
            param1 = 1;
        }
        this._modulus = param1;
    }

    public set seed(param1: number) {
        this._seed = param1;
    }

    public dispose(): void {
    }

    public getRandomValues(param1: number, param2: number, param3: number): any[] {
        let _loc4_: number = 0;
        let _loc5_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < param1) {
            _loc5_.push(this.iterateScaled(param2, param3 - param2));
            _loc4_++;
        }
        return _loc5_;
    }

    public getRandomArray(param1: number, param2: number): any[] {
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        if (param1 > param2 || param2 > 1000) {
            return null;
        }
        let _loc3_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ <= param2) {
            _loc3_.push(_loc4_);
            _loc4_++;
        }
        let _loc7_: any[] = [];
        _loc6_ = 0;
        while (_loc6_ < param1) {
            _loc5_ = this.iterateScaled(0, _loc3_.length - 1);
            _loc7_.push(_loc3_[_loc5_]);
            _loc3_.splice(_loc5_, 1);
            _loc6_++;
        }
        return _loc7_;
    }

    private iterate(): number {
        let _loc1_: number = this._multiplier * this._seed + this._increment;
        if (_loc1_ < 0) {
            _loc1_ = -_loc1_;
        }
        _loc1_ %= this._modulus;
        this._seed = _loc1_;
        return _loc1_;
    }

    private iterateScaled(param1: number, param2: number): number {
        let _loc3_: number = this.iterate();
        if (param2 < 1) {
            return param1;
        }
        return param1 + _loc3_ / this._modulus * param2 | 0;
    }
}
