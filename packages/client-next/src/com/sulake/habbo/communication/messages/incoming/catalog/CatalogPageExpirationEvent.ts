import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CatalogPageExpirationParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPageExpirationParser';

export class CatalogPageExpirationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogPageExpirationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CatalogPageExpirationParser);
    }

    public getParser(): CatalogPageExpirationParser {
        return this._parser instanceof CatalogPageExpirationParser ? this._parser : null;
    }
}
