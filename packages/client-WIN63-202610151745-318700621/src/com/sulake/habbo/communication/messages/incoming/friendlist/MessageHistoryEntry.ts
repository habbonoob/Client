import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6064 } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/_SafeCls_6064';

export class MessageHistoryEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MessageHistoryEntry'); }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = NaN; }

    declare private _senderName: string;

    declare private _senderFigure: string;

    declare private _content: _SafeCls_6064;

    declare private _secondsSinceSent: number;
    static { (this.prototype as any)._secondsSinceSent = 0; }

    declare private _messageId: string;

    constructor(param1: IMessageDataWrapper) {
        this._senderId = param1.readInteger();
        this._senderName = param1.readString();
        this._senderFigure = param1.readString();
        this._content = _SafeCls_6064.parse(param1);
        this._secondsSinceSent = param1.readInteger();
        this._messageId = param1.readString();
    }

    public get senderId(): number {
        return this._senderId;
    }

    public get senderName(): string {
        return this._senderName;
    }

    public get senderFigure(): string {
        return this._senderFigure;
    }

    public get message(): string {
        return this._content != null ? this._content.messageText : "";
    }

    public get messageType(): number {
        return this._content != null ? this._content.messageType : 0;
    }

    public get habbiconId(): number {
        return this._content != null ? this._content.habbiconId : 0;
    }

    public get content(): _SafeCls_6064 {
        return this._content;
    }

    public get secondsSinceSent(): number {
        return this._secondsSinceSent;
    }

    public get messageId(): string {
        return this._messageId;
    }
}
