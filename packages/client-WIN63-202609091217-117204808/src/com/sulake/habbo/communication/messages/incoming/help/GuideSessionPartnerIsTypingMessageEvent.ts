import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionPartnerIsTypingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionPartnerIsTypingMessageParser';

export class GuideSessionPartnerIsTypingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionPartnerIsTypingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionPartnerIsTypingMessageParser);
    }

    public getParser(): GuideSessionPartnerIsTypingMessageParser {
        return this._parser instanceof GuideSessionPartnerIsTypingMessageParser ? this._parser : null;
    }
}
