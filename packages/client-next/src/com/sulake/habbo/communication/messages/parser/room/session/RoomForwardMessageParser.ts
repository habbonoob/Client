import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomForwardMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::RoomForwardMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor() {
    }

    public get roomId(): number {
        return this._roomId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        return true;
    }
}
