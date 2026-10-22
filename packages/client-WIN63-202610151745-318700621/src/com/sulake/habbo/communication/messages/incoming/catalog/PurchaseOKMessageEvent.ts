import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PurchaseOKMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseOKMessageParser';

export class PurchaseOKMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::PurchaseOKMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PurchaseOKMessageParser);
    }

    public getParser(): PurchaseOKMessageParser {
        return this._parser instanceof PurchaseOKMessageParser ? this._parser : null;
    }
}
