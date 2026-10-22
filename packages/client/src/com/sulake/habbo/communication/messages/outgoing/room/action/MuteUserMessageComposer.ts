import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class MuteUserMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::MuteUserMessageComposer'); }

    constructor(param1: number, param2: number, param3: number = 0) {
        this._userId = param1;
        this._roomId = param3;
        this._SafeStr_6913 = param2;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _roomId: number = 0;

    declare private _SafeStr_6913: number;
    static { (this.prototype as any)._SafeStr_6913 = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._userId, this._roomId, this._SafeStr_6913];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
