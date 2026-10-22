import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChronoFieldRangeFilter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.utils::ChronoFieldRangeFilter'); }

    constructor(param1: string, param2: boolean, param3: number, param4: number, param5: number = 0) {
        this._name = param1;
        this._useFilter = param2;
        this._min = param3;
        this._SafeStr_4035 = param4;
        this._defaultValue = param5;
    }

    declare private _useFilter: boolean;
    static { (this.prototype as any)._useFilter = false; }

    declare private _SafeStr_4035: number;
    static { (this.prototype as any)._SafeStr_4035 = 0; }

    declare private _defaultValue: number;
    static { (this.prototype as any)._defaultValue = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _min: number;
    static { (this.prototype as any)._min = 0; }

    public get min(): number {
        return this._min;
    }

    public get defaultValue(): number {
        return this._defaultValue;
    }

    public get useFilter(): boolean {
        return this._useFilter;
    }

    public get max(): number {
        return this._SafeStr_4035;
    }
}
