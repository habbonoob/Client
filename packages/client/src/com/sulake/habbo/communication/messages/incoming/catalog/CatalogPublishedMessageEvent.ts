import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CatalogPublishedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPublishedMessageParser';

export class CatalogPublishedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogPublishedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CatalogPublishedMessageParser);
    }

    public get instantlyRefreshCatalogue(): boolean {
        return this.getParser().instantlyRefreshCatalogue;
    }

    public get newFurniDataHash(): string {
        return this.getParser().newFurniDataHash;
    }

    public getParser(): CatalogPublishedMessageParser {
        return this._parser instanceof CatalogPublishedMessageParser ? this._parser : null;
    }
}
