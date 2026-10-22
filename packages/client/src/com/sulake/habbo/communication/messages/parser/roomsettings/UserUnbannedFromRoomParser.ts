import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserUnbannedFromRoomParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::UserUnbannedFromRoomParser'); }

    constructor() {
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    public get roomId(): number {
        return this._roomId;
    }

    public get userId(): number {
        return this._userId;
    }

    public flush(): boolean {
        this._roomId = 0;
        this._userId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._userId = param1.readInteger();
        return true;
    }
}
