import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatReviewSessionDetachedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionDetachedMessageParser';

export class ChatReviewSessionDetachedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::ChatReviewSessionDetachedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatReviewSessionDetachedMessageParser);
    }
}
