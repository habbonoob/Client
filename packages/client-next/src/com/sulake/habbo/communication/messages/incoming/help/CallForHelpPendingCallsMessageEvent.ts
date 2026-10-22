import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CallForHelpPendingCallsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpPendingCallsMessageParser';

export class CallForHelpPendingCallsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::CallForHelpPendingCallsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CallForHelpPendingCallsMessageParser);
    }

    public getParser(): CallForHelpPendingCallsMessageParser {
        return this._parser instanceof CallForHelpPendingCallsMessageParser ? this._parser : null;
    }
}
