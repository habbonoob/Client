import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetClothingChangeDataMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::SetClothingChangeDataMessageComposer'); }

    constructor(param1: number, param2: string, param3: string = "") {
        this._objectId = param1;
        this._gender = param2;
        this._SafeStr_6094 = param3;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _gender: string;

    declare private _SafeStr_6094: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._gender, this._SafeStr_6094];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
