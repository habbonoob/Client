import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomReadyMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::RoomReadyMessageParser'); }

    constructor() {
    }

    private _roomType: string = "";
    private _roomId: number = 0;

    public get roomType(): string {
        return this._roomType;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public flush(): boolean {
        this._roomType = "";
        this._roomId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomType = param1.readString();
        this._roomId = param1.readInteger();
        return true;
    }
}
