import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomMessageNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RoomMessageNotificationMessageParser'); }

    constructor() {
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _messageCount: number;
    static { (this.prototype as any)._messageCount = 0; }

    declare private _roomName: string;

    public get roomName(): string {
        return this._roomName;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get messageCount(): number {
        return this._messageCount;
    }

    public flush(): boolean {
        this._roomId = -1;
        this._roomName = "";
        this._messageCount = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._messageCount = param1.readInteger();
        return true;
    }
}
