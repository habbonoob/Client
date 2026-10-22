import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserTransparencyData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::UserTransparencyData'); }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _SafeStr_14813: number;
    static { (this.prototype as any)._SafeStr_14813 = 0; }

    declare private _SafeStr_14431: boolean;
    static { (this.prototype as any)._SafeStr_14431 = false; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    constructor(param1: number, param2: number, param3: boolean, param4: number) {
        this._roomIndex = param1;
        this._SafeStr_14813 = param2;
        this._SafeStr_14431 = param3;
        this._easingMode = param4;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get transparency(): number {
        return this._SafeStr_14813;
    }

    public get allowClickThrough(): boolean {
        return this._SafeStr_14431;
    }

    public get easingMode(): number {
        return this._easingMode;
    }
}
