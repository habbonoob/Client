import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetRelationshipStatusMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.friendlist::SetRelationshipStatusMessageComposer'); }

    declare private _friendId: number;
    static { (this.prototype as any)._friendId = 0; }

    declare private _SafeStr_7304: number;
    static { (this.prototype as any)._SafeStr_7304 = 0; }

    constructor(param1: number, param2: number) {
        this._friendId = param1;
        this._SafeStr_7304 = param2;
    }

    public getMessageArray(): any[] {
        return [this._friendId, this._SafeStr_7304];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
