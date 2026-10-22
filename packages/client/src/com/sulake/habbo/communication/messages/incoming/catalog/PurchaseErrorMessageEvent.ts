import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PurchaseErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseErrorMessageParser';

export class PurchaseErrorMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::PurchaseErrorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PurchaseErrorMessageParser);
    }

    public getParser(): PurchaseErrorMessageParser {
        return this._parser instanceof PurchaseErrorMessageParser ? this._parser : null;
    }
}
