import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CatalogPageWithEarliestExpiryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPageWithEarliestExpiryMessageParser';

export class CatalogPageWithEarliestExpiryMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogPageWithEarliestExpiryMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CatalogPageWithEarliestExpiryMessageParser);
    }

    public getParser(): CatalogPageWithEarliestExpiryMessageParser {
        return this._parser instanceof CatalogPageWithEarliestExpiryMessageParser ? this._parser : null;
    }
}
