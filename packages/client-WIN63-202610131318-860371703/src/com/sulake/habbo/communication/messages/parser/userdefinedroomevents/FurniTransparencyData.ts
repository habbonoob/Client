import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniTransparencyData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::FurniTransparencyData'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_14801: number;
    static { (this.prototype as any)._SafeStr_14801 = 0; }

    declare private _SafeStr_14428: boolean;
    static { (this.prototype as any)._SafeStr_14428 = false; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    constructor(param1: number, param2: number, param3: boolean, param4: number) {
        this._furniId = param1;
        this._SafeStr_14801 = param2;
        this._SafeStr_14428 = param3;
        this._easingMode = param4;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get transparency(): number {
        return this._SafeStr_14801;
    }

    public get allowClickThrough(): boolean {
        return this._SafeStr_14428;
    }

    public get easingMode(): number {
        return this._easingMode;
    }
}
