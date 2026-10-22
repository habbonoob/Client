import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6114 } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/_SafeCls_6114';

export class NewConsoleMessageMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::NewConsoleMessageMessageParser'); }

    declare private _chatId: number;
    static { (this.prototype as any)._chatId = NaN; }

    declare private _content: _SafeCls_6114;

    declare private _secondsSinceSent: number;
    static { (this.prototype as any)._secondsSinceSent = 0; }

    declare private _messageId: string;

    declare private _confirmationId: number;
    static { (this.prototype as any)._confirmationId = 0; }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = NaN; }

    declare private _senderName: string;

    declare private _senderFigure: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chatId = param1.readInteger();
        this._content = _SafeCls_6114.parse(param1);
        this._secondsSinceSent = param1.readInteger();
        this._messageId = param1.readString();
        this._confirmationId = param1.readInteger();
        this._senderId = param1.readInteger();
        this._senderName = param1.readString();
        this._senderFigure = param1.readString();
        return true;
    }

    public get chatId(): number {
        return this._chatId;
    }

    public get messageText(): string {
        return this._content != null ? this._content.messageText : "";
    }

    public get secondsSinceSent(): number {
        return this._secondsSinceSent;
    }

    public get messageType(): number {
        return this._content != null ? this._content.messageType : 0;
    }

    public get habbiconId(): number {
        return this._content != null ? this._content.habbiconId : 0;
    }

    public get content(): _SafeCls_6114 {
        return this._content;
    }

    public get messageId(): string {
        return this._messageId;
    }

    public get confirmationId(): number {
        return this._confirmationId;
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
}
