import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class MessageHistoryEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MessageHistoryEntry'); }

    constructor(param1: IMessageDataWrapper) {
        this._senderId = param1.readInteger();
        this._senderName = param1.readString();
        this._senderFigure = param1.readString();
        this._message = param1.readString();
        this._secondsSinceSent = param1.readInteger();
        this._messageId = param1.readString();
    }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _senderFigure: string;

    declare private _message: string;

    declare private _secondsSinceSent: number;
    static { (this.prototype as any)._secondsSinceSent = 0; }

    declare private _messageId: string;

    declare private _senderName: string;

    public get senderName(): string {
        return this._senderName;
    }

    public get senderId(): number {
        return this._senderId;
    }

    public get senderFigure(): string {
        return this._senderFigure;
    }

    public get message(): string {
        return this._message;
    }

    public get secondsSinceSent(): number {
        return this._secondsSinceSent;
    }

    public get messageId(): string {
        return this._messageId;
    }
}
