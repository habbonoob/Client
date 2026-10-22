import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClubOfferRequestSourceEnum {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::ClubOfferRequestSourceEnum'); }

    public static readonly SOURCE_CATALOG_BUY_CLUB_PAGE: number = 0;
    public static readonly SOURCE_CATALOG_BUY_VIP_PAGE: number = 1;
    public static readonly SOURCE_CATALOG_GIFT_VIP_PAGE: number = 2;
    public static readonly SOURCE_QUICK_BUY_VIP_DIALOG: number = 3;
    public static readonly SOURCE_DIRECT_SMS_DIALOG: number = 4;
    public static readonly SOURCE_SNOWSTORM: number = 5;
    public static readonly SOURCE_CATALOG_LOYALTY_PAGE: number = 6;
}
