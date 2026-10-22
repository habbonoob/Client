import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomInviteMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::RoomInviteMessageParser'); }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _messageText: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._senderId = param1.readInteger();
        this._messageText = param1.readString();
        return true;
    }

    public get senderId(): number {
        return this._senderId;
    }

    public get messageText(): string {
        return this._messageText;
    }
}
