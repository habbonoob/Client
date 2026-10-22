import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SelectInitialRoomMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nux::SelectInitialRoomMessageParser'); }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._status = param1.readShort();
        this._roomId = param1.readInteger();
        return true;
    }

    public get status(): number {
        return this._status;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
