import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetRoomBackgroundColorDataComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::SetRoomBackgroundColorDataComposer'); }

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._furniId = param1;
        this._hue = param2;
        this._saturation = param3;
        this._lightness = param4;
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _hue: number;
    static { (this.prototype as any)._hue = 0; }

    declare private _saturation: number;
    static { (this.prototype as any)._saturation = 0; }

    declare private _lightness: number;
    static { (this.prototype as any)._lightness = 0; }

    public getMessageArray(): any[] {
        return [this._furniId, this._hue, this._saturation, this._lightness];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
