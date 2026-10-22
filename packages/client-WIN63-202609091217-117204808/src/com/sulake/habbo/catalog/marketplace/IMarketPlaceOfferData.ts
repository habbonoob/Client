import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IMarketPlaceOfferData {
    get offerId(): number;
    get furniId(): number;
    get furniType(): number;
    get extraData(): string;
    get stuffData(): IStuffData;
    get price(): number;
    get averagePrice(): number;
    get image(): BitmapData;
    set image(param1: BitmapData);
    set imageCallback(param1: number);
    get imageCallback(): number;
    get status(): number;
    get timeLeftMinutes(): number;
    set timeLeftMinutes(param1: number);
    set price(param1: number);
    set offerId(param1: number);
    get offerCount(): number;
    set offerCount(param1: number);
    get isUsable(): boolean;
    get isUsed(): boolean;
    get isUniqueLimitedItem(): boolean;
}
