import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CallForHelpReplyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpReplyMessageParser';

export class CallForHelpReplyMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::CallForHelpReplyMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CallForHelpReplyMessageParser);
    }

    public getParser(): CallForHelpReplyMessageParser {
        return this._parser instanceof CallForHelpReplyMessageParser ? this._parser : null;
    }
}
