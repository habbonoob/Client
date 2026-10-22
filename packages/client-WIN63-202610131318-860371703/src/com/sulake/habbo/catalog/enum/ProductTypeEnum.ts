import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ProductTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::ProductTypeEnum'); }

    public static readonly PRODUCT_TYPE_ITEM: string = "i";
    public static readonly PRODUCT_TYPE_STUFF: string = "s";
    public static readonly PRODUCT_TYPE_EFFECT: string = "e";
    public static readonly PRODUCT_TYPE_CLUB: string = "h";
    public static readonly PRODUCT_TYPE_BADGE: string = "b";
    public static readonly PRODUCT_TYPE_GAME_TOKEN: string = "GAME_TOKEN";
    public static readonly PRODUCT_TYPE_MINT_TOKEN: string = "MINT_TOKEN";
    public static readonly PRODUCT_TYPE_PET: string = "p";
    public static readonly PRODUCT_TYPE_RENTABLE_BOT: string = "r";
    public static readonly PRODUCT_TYPE_NFT: string = "n";
    public static readonly PRODUCT_TYPE_CHAT_STYLE: string = "chat_style";
    public static readonly PRODUCT_TYPE_HABBICON: string = "habbicon";

    constructor() {
    }
}
