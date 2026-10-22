import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PostThreadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/PostThreadMessageParser';

export class PostThreadMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::PostThreadMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PostThreadMessageParser);
    }

    public getParser(): PostThreadMessageParser {
        return this._parser instanceof PostThreadMessageParser ? this._parser : null;
    }
}
