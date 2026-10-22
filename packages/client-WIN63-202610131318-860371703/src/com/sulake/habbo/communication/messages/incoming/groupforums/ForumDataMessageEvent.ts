import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ForumDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumDataMessageParser';

export class ForumDataMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::ForumDataMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ForumDataMessageParser);
    }

    public getParser(): ForumDataMessageParser {
        return this._parser instanceof ForumDataMessageParser ? this._parser : null;
    }
}
