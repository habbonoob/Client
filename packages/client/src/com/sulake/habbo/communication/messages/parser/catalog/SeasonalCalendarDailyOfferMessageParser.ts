import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CatalogPageMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageOfferData';

export class SeasonalCalendarDailyOfferMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::SeasonalCalendarDailyOfferMessageParser'); }

    constructor() {
    }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _offerData: CatalogPageMessageOfferData;

    public get pageId(): number {
        return this._pageId;
    }

    public get offerData(): CatalogPageMessageOfferData {
        return this._offerData;
    }

    public flush(): boolean {
        this._pageId = -1;
        this._offerData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._pageId = param1.readInteger();
        this._offerData = new CatalogPageMessageOfferData(param1);
        return true;
    }
}
