import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PostMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/PostMessageMessageParser';

export class PostMessageMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::PostMessageMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PostMessageMessageParser);
    }

    public getParser(): PostMessageMessageParser {
        return this._parser instanceof PostMessageMessageParser ? this._parser : null;
    }
}
