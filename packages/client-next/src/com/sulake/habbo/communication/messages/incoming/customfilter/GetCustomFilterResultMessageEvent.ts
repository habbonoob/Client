import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GetCustomFilterResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/customfilter/GetCustomFilterResultMessageEventParser';

export class GetCustomFilterResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.customfilter::GetCustomFilterResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GetCustomFilterResultMessageEventParser);
    }

    public getParser(): GetCustomFilterResultMessageEventParser {
        return this._parser instanceof GetCustomFilterResultMessageEventParser ? this._parser : null;
    }
}
