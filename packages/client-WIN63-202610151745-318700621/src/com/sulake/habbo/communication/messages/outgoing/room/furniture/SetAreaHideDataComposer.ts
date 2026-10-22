import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetAreaHideDataComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::SetAreaHideDataComposer'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _rootX: number;
    static { (this.prototype as any)._rootX = 0; }

    declare private _rootY: number;
    static { (this.prototype as any)._rootY = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _length: number;
    static { (this.prototype as any)._length = 0; }

    declare private _SafeStr_6146: boolean;
    static { (this.prototype as any)._SafeStr_6146 = false; }

    declare private _SafeStr_6216: boolean;
    static { (this.prototype as any)._SafeStr_6216 = false; }

    declare private _invert: boolean;
    static { (this.prototype as any)._invert = false; }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean, param7: boolean, param8: boolean) {
        this._furniId = param1;
        this._rootX = param2;
        this._rootY = param3;
        this._width = param4;
        this._length = param5;
        this._SafeStr_6146 = param6;
        this._SafeStr_6216 = param7;
        this._invert = param8;
    }

    public getMessageArray(): any[] {
        return [this._furniId, this._rootX, this._rootY, this._width, this._length, this._SafeStr_6146, this._SafeStr_6216, this._invert];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
