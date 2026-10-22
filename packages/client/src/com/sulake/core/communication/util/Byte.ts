import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Byte {
    static { registerClassName(this, 'com.sulake.core.communication.util::Byte'); }

    constructor(param1: number) {
        this._SafeStr_6344 = param1;
    }

    declare private _SafeStr_6344: number;
    static { (this.prototype as any)._SafeStr_6344 = 0; }

    public get value(): number {
        return this._SafeStr_6344;
    }
}
