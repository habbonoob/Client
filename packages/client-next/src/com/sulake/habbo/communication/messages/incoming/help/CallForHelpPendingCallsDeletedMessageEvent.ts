import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CallForHelpPendingCallsDeletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpPendingCallsDeletedMessageParser';

export class CallForHelpPendingCallsDeletedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::CallForHelpPendingCallsDeletedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CallForHelpPendingCallsDeletedMessageParser);
    }

    public getParser(): CallForHelpPendingCallsDeletedMessageParser {
        return this._parser instanceof CallForHelpPendingCallsDeletedMessageParser ? this._parser : null;
    }
}
