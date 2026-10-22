import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Long {
    static { registerClassName(this, 'com.sulake.core.communication.util::Long'); }

    declare private _numberValue: number;
    static { (this.prototype as any)._numberValue = NaN; }

    constructor(param1: number) {
        this._numberValue = param1;
    }

    public get value(): number {
        return this._numberValue;
    }
}
