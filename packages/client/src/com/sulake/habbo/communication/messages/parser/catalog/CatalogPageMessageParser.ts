import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CatalogLocalizationData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogLocalizationData';
import { CatalogPageMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageOfferData';
import { FrontPageItem } from '@/com/sulake/habbo/communication/messages/incoming/catalog/FrontPageItem';

export class CatalogPageMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::CatalogPageMessageParser'); }

    constructor() {
    }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _catalogType: string;

    declare private _acceptSeasonCurrencyAsCredits: boolean;
    static { (this.prototype as any)._acceptSeasonCurrencyAsCredits = false; }

    declare private _layoutCode: string;

    public get layoutCode(): string {
        return this._layoutCode;
    }

    declare private _localization: CatalogLocalizationData;

    public get localization(): CatalogLocalizationData {
        return this._localization;
    }

    declare private _offers: CatalogPageMessageOfferData[];

    public get offers(): CatalogPageMessageOfferData[] {
        return this._offers;
    }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    declare private _frontPageItems: FrontPageItem[];

    public get frontPageItems(): FrontPageItem[] {
        return this._frontPageItems;
    }

    public get pageId(): number {
        return this._pageId;
    }

    public get catalogType(): string {
        return this._catalogType;
    }

    public get acceptSeasonCurrencyAsCredits(): boolean {
        return this._acceptSeasonCurrencyAsCredits;
    }

    public flush(): boolean {
        this._pageId = -1;
        this._catalogType = "";
        this._layoutCode = "";
        this._localization = null;
        this._offers = new Array<CatalogPageMessageOfferData>(0).fill(null);
        this._offerId = -1;
        this._acceptSeasonCurrencyAsCredits = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._pageId = param1.readInteger();
        this._catalogType = param1.readString();
        this._layoutCode = param1.readString();
        this._localization = new CatalogLocalizationData(param1);
        this._offers = new Array<CatalogPageMessageOfferData>(0).fill(null);
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._offers.push(new CatalogPageMessageOfferData(param1));
            _loc3_++;
        }
        this._offerId = param1.readInteger();
        this._acceptSeasonCurrencyAsCredits = param1.readBoolean();
        if (param1.bytesAvailable) {
            this._frontPageItems = new Array<FrontPageItem>(0).fill(null);
            _loc2_ = param1.readInteger();
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                this._frontPageItems.push(new FrontPageItem(param1));
                _loc3_++;
            }
        }
        return true;
    }
}
