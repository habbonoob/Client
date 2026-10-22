import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatReviewSessionResultsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionResultsMessageParser';

export class ChatReviewSessionResultsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::ChatReviewSessionResultsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatReviewSessionResultsMessageParser);
    }

    public getParser(): ChatReviewSessionResultsMessageParser {
        return this._parser instanceof ChatReviewSessionResultsMessageParser ? this._parser : null;
    }
}
