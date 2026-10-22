import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MarketPlaceOfferStatus {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketPlaceOfferStatus'); }

    public static readonly ONGOING: number = 1;
    public static readonly _SafeStr_8736: number = 1;
    public static readonly SOLD: number = 2;
    public static readonly EXPIRED: number = 3;

    constructor() {
    }
}
