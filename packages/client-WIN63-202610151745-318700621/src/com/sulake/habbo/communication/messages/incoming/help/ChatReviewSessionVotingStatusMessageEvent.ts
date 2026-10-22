import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatReviewSessionVotingStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionVotingStatusMessageParser';

export class ChatReviewSessionVotingStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::ChatReviewSessionVotingStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatReviewSessionVotingStatusMessageParser);
    }

    public getParser(): ChatReviewSessionVotingStatusMessageParser {
        return this._parser instanceof ChatReviewSessionVotingStatusMessageParser ? this._parser : null;
    }
}
