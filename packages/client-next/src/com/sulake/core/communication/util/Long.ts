import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Long {
    static { registerClassName(this, 'com.sulake.core.communication.util::Long'); }

    declare private _SafeStr_6050: number;
    static { (this.prototype as any)._SafeStr_6050 = NaN; }

    constructor(param1: number) {
        this._SafeStr_6050 = param1;
    }

    public get value(): number {
        return this._SafeStr_6050;
    }
}
