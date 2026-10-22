import { asGuarded, isInt } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NumberBank {
    static { registerClassName(this, 'com.sulake.room.utils::NumberBank'); }

    constructor(param1: number) {
        let _loc2_: number = 0;
        this._reservedNumbers = [];
        this._freeNumbers = [];
        if (param1 < 0) {
            param1 = 0;
        }
        _loc2_ = 0;
        while (_loc2_ < param1) {
            this._freeNumbers.push(_loc2_);
            _loc2_++;
        }
    }

    private _SafeStr_4867: number = 0;

    declare private _reservedNumbers: any[];

    declare private _freeNumbers: any[];

    public dispose(): void {
        this._reservedNumbers = null;
        this._freeNumbers = null;
        this._SafeStr_4867 = 0;
    }

    public reserveNumber(): number {
        let _loc1_: number = 0;
        if (this._freeNumbers.length > 0) {
            _loc1_ = asGuarded(this._freeNumbers.pop(), isInt);
            this._reservedNumbers.push(_loc1_);
            return _loc1_;
        }
        return -1;
    }

    public freeNumber(param1: number): void {
        let _loc2_: number = this._reservedNumbers.indexOf(param1);
        if (_loc2_ >= 0) {
            this._reservedNumbers.splice(_loc2_, 1);
            this._freeNumbers.push(param1);
        }
    }
}
