import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PlaceObjectMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::PlaceObjectMessageComposer'); }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: number, param6: number) {
        this._objectId = param1;
        this._objectCategory = param2;
        this._wallLocation = param3;
        this._SafeStr_2126 = param4;
        this._y = param5;
        this._dir = param6;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _objectCategory: number;
    static { (this.prototype as any)._objectCategory = 0; }

    declare private _wallLocation: string;

    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _dir: number = 0;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        switch (this._objectCategory - 10) {
            case 0:
                return [this._objectId + " " + this._SafeStr_2126 + " " + this._y + " " + this._dir];
            case 10:
                return [this._objectId + " " + this._wallLocation];
            default:
                return [];
        }
    }

    get [IMessageComposer](): true {
        return true;
    }
}
