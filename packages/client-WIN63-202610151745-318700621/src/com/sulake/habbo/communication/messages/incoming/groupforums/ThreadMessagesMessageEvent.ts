import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ThreadMessagesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadMessagesMessageParser';

export class ThreadMessagesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::ThreadMessagesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ThreadMessagesMessageParser);
    }

    public getParser(): ThreadMessagesMessageParser {
        return this._parser instanceof ThreadMessagesMessageParser ? this._parser : null;
    }
}
