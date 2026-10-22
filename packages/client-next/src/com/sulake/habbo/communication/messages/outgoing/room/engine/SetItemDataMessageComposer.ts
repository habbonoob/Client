import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetItemDataMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::SetItemDataMessageComposer'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _data: string;

    declare private _colorHex: string;

    constructor(param1: number, param2: string = "", param3: string = "") {
        this._objectId = param1;
        this._data = param3;
        this._colorHex = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._colorHex, this._data];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
