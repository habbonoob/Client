import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AddSpamWallPostItMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::AddSpamWallPostItMessageComposer'); }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _location: string;

    declare private _message: string;

    declare private _colorHex: string;

    constructor(param1: number, param2: string, param3: string, param4: string) {
        this._itemId = param1;
        this._location = param2;
        this._message = param4;
        this._colorHex = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._itemId, this._location, this._colorHex, this._message];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
