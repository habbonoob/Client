import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PlacePetMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::PlacePetMessageComposer'); }

    constructor(param1: number, param2: number, param3: number) {
        this._petId = param1;
        this._SafeStr_2126 = param2;
        this._y = param3;
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._petId, this._SafeStr_2126, this._y];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
