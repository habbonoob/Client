import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionPartnerIsTypingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionPartnerIsTypingMessageParser'); }

    constructor() {
    }

    declare private _isTyping: boolean;
    static { (this.prototype as any)._isTyping = false; }

    public get isTyping(): boolean {
        return this._isTyping;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isTyping = param1.readBoolean();
        return true;
    }
}
