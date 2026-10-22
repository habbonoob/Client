import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatReviewSessionOfferedToGuideMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionOfferedToGuideMessageParser';

export class ChatReviewSessionOfferedToGuideMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::ChatReviewSessionOfferedToGuideMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatReviewSessionOfferedToGuideMessageParser);
    }

    public getParser(): ChatReviewSessionOfferedToGuideMessageParser {
        return this._parser instanceof ChatReviewSessionOfferedToGuideMessageParser ? this._parser : null;
    }
}
