import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MySanctionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/MySanctionStatusMessageParser';

export class MySanctionStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::MySanctionStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MySanctionStatusMessageParser);
    }

    public getParser(): MySanctionStatusMessageParser {
        return this._parser instanceof MySanctionStatusMessageParser ? this._parser : null;
    }
}
