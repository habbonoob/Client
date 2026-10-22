import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatReviewSessionStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionStartedMessageParser';

export class ChatReviewSessionStartedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::ChatReviewSessionStartedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatReviewSessionStartedMessageParser);
    }

    public getParser(): ChatReviewSessionStartedMessageParser {
        return this._parser instanceof ChatReviewSessionStartedMessageParser ? this._parser : null;
    }
}
