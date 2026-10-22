import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CallForHelpDisabledNotifyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpDisabledNotifyMessageParser';

export class CallForHelpDisabledNotifyMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::CallForHelpDisabledNotifyMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CallForHelpDisabledNotifyMessageParser);
    }

    public getParser(): CallForHelpDisabledNotifyMessageParser {
        return this._parser instanceof CallForHelpDisabledNotifyMessageParser ? this._parser : null;
    }
}
