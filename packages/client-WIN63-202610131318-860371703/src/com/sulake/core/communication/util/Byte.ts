import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Byte {
    static { registerClassName(this, 'com.sulake.core.communication.util::Byte'); }

    declare private _intValue: number;
    static { (this.prototype as any)._intValue = 0; }

    constructor(param1: number) {
        this._intValue = param1;
    }

    public get value(): number {
        return this._intValue;
    }
}
