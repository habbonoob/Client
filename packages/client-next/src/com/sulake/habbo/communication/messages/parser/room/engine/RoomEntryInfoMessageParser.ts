import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomEntryInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::RoomEntryInfoMessageParser'); }

    declare private _guestRoomId: number;
    static { (this.prototype as any)._guestRoomId = 0; }

    declare private _owner: boolean;
    static { (this.prototype as any)._owner = false; }

    constructor() {
    }

    public get guestRoomId(): number {
        return this._guestRoomId;
    }

    public get owner(): boolean {
        return this._owner;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._guestRoomId = param1.readInteger();
        this._owner = param1.readBoolean();
        return true;
    }
}
