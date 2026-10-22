import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CatalogPageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPageMessageParser';

export class CatalogPageMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogPageMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CatalogPageMessageParser);
    }

    public getParser(): CatalogPageMessageParser {
        return this._parser instanceof CatalogPageMessageParser ? this._parser : null;
    }
}
