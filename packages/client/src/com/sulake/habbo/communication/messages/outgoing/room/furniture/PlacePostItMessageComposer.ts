import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PlacePostItMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::PlacePostItMessageComposer'); }

    constructor(param1: number, param2: string) {
        this._itemId = param1;
        this._location = param2;
    }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _location: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._itemId, this._location];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
