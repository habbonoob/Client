import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PurchaseNotAllowedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/PurchaseNotAllowedMessageParser';

export class PurchaseNotAllowedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::PurchaseNotAllowedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PurchaseNotAllowedMessageParser);
    }

    public getParser(): PurchaseNotAllowedMessageParser {
        return this._parser instanceof PurchaseNotAllowedMessageParser ? this._parser : null;
    }
}
