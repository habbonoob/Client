import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CallForHelpResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpResultMessageParser';

export class CallForHelpResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::CallForHelpResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CallForHelpResultMessageParser);
    }

    public getParser(): CallForHelpResultMessageParser {
        return this._parser instanceof CallForHelpResultMessageParser ? this._parser : null;
    }
}
