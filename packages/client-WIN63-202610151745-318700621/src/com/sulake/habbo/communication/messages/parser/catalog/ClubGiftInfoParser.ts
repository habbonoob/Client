import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { CatalogPageMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageOfferData';
import { ClubGiftData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubGiftData';

export class ClubGiftInfoParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::ClubGiftInfoParser'); }

    declare private _daysUntilNextGift: number;
    static { (this.prototype as any)._daysUntilNextGift = 0; }

    declare private _giftsAvailable: number;
    static { (this.prototype as any)._giftsAvailable = 0; }

    declare private _offers: any[];

    declare private _giftData: UtilsMap;

    constructor() {
    }

    public flush(): boolean {
        if (this._giftData) {
            this._giftData.dispose();
            this._giftData = null;
        }
        this._offers = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: ClubGiftData = null;
        this._daysUntilNextGift = param1.readInteger();
        this._giftsAvailable = param1.readInteger();
        this._offers = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._offers.push(new CatalogPageMessageOfferData(param1));
            _loc4_++;
        }
        this._giftData = new UtilsMap();
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new ClubGiftData(param1);
            this._giftData.add(_loc2_.offerId, _loc2_);
            _loc4_++;
        }
        return true;
    }

    public get daysUntilNextGift(): number {
        return this._daysUntilNextGift;
    }

    public get giftsAvailable(): number {
        return this._giftsAvailable;
    }

    public get offers(): any[] {
        return this._offers;
    }

    public get giftData(): UtilsMap {
        return this._giftData;
    }
}
