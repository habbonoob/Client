import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LtdRaffleEnteredMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/LtdRaffleEnteredMessageEventParser';

export class LtdRaffleEnteredMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::LtdRaffleEnteredMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LtdRaffleEnteredMessageEventParser);
    }

    public getParser(): LtdRaffleEnteredMessageEventParser {
        return this._parser instanceof LtdRaffleEnteredMessageEventParser ? this._parser : null;
    }
}
