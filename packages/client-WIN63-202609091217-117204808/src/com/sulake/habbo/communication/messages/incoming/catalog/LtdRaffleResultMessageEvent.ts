import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LtdRaffleResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/LtdRaffleResultMessageEventParser';

export class LtdRaffleResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::LtdRaffleResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LtdRaffleResultMessageEventParser);
    }

    public getParser(): LtdRaffleResultMessageEventParser {
        return this._parser instanceof LtdRaffleResultMessageEventParser ? this._parser : null;
    }
}
