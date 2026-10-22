import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class BanUserWithDurationMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::BanUserWithDurationMessageComposer'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _roomId: number = 0;

    declare private _SafeStr_5957: string;

    constructor(param1: number, param2: string, param3: number = 0) {
        this._userId = param1;
        this._roomId = param3;
        this._SafeStr_5957 = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._userId, this._roomId, this._SafeStr_5957];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
