import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ForumThreadsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumThreadsMessageParser';

export class ForumThreadsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::ForumThreadsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ForumThreadsMessageParser);
    }

    public getParser(): ForumThreadsMessageParser {
        return this._parser instanceof ForumThreadsMessageParser ? this._parser : null;
    }
}
