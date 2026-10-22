import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FaqSearchResultsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/FaqSearchResultsMessageParser';

export class FaqSearchResultsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::FaqSearchResultsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FaqSearchResultsMessageParser);
    }

    public getParser(): FaqSearchResultsMessageParser {
        return this._parser instanceof FaqSearchResultsMessageParser ? this._parser : null;
    }
}
