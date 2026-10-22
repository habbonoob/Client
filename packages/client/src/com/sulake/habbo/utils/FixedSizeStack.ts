import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FixedSizeStack {
    static { registerClassName(this, 'com.sulake.habbo.utils::FixedSizeStack'); }

    constructor(param1: number) {
        this._SafeStr_4353 = param1;
    }

    private _data: any[] = [];
    private _SafeStr_4353: number = 0;
    private _index: number = 0;

    public reset(): void {
        this._data = [];
        this._index = 0;
    }

    public addValue(param1: number): void {
        if (this._data.length < this._SafeStr_4353) {
            this._data.push(param1);
        } else {
            this._data[this._index] = param1;
        }
        this._index = (this._index + 1) % this._SafeStr_4353;
    }

    public getMax(): number {
        let _loc1_: number = 0;
        let _loc2_: number = -2147483648;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_4353) {
            if (this._data[_loc1_] > _loc2_) {
                _loc2_ = this._data[_loc1_] | 0;
            }
            _loc1_++;
        }
        return _loc2_;
    }

    public getMin(): number {
        let _loc1_: number = 0;
        let _loc2_: number = 2147483647;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_4353) {
            if (this._data[_loc1_] < _loc2_) {
                _loc2_ = this._data[_loc1_] | 0;
            }
            _loc1_++;
        }
        return _loc2_;
    }
}
