import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ExtraInfoItemData {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay::ExtraInfoItemData'); }

    public static readonly TYPE_PROMO: number = 0;
    public static readonly TYPE_BUNDLES_INFO_SCREEN: number = 1;
    public static readonly _SafeStr_8257: number = 2;
    public static readonly TYPE_BONUS_BADGE: number = 3;
    public static readonly _SafeStr_8638: number = 4;
    public static readonly TYPE_RESET_MESSAGE: number = 5;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _text: string;

    declare private _quantity: number;
    static { (this.prototype as any)._quantity = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _SafeStr_6435: number;
    static { (this.prototype as any)._SafeStr_6435 = 0; }

    declare private _SafeStr_6042: number;
    static { (this.prototype as any)._SafeStr_6042 = 0; }

    declare private _priceCredits: number;
    static { (this.prototype as any)._priceCredits = 0; }

    declare private _SafeStr_5965: number;
    static { (this.prototype as any)._SafeStr_5965 = 0; }

    declare private _SafeStr_6220: number;
    static { (this.prototype as any)._SafeStr_6220 = 0; }

    declare private _badgeCode: string;

    declare private _achievementCode: string;

    constructor(param1: number, param2: string = "") {
        this._type = param1;
        this._text = param2;
    }

    public set text(param1: string) {
        this._text = param1;
    }

    public set quantity(param1: number) {
        this._quantity = param1;
    }

    public set activityPointType(param1: number) {
        this._activityPointType = param1;
    }

    public set discountPriceCredits(param1: number) {
        this._SafeStr_6435 = param1;
    }

    public set discountPriceActivityPoints(param1: number) {
        this._SafeStr_6042 = param1;
    }

    public set priceCredits(param1: number) {
        this._priceCredits = param1;
    }

    public set priceActivityPoints(param1: number) {
        this._SafeStr_5965 = param1;
    }

    public set priceSilver(param1: number) {
        this._SafeStr_6220 = param1;
    }

    public set badgeCode(param1: string) {
        this._badgeCode = param1;
    }

    public set achievementCode(param1: string) {
        this._achievementCode = param1;
    }

    public get type(): number {
        return this._type;
    }

    public get text(): string {
        return this._text;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public get priceCredits(): number {
        return this._priceCredits;
    }

    public get priceActivityPoints(): number {
        return this._SafeStr_5965;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get priceSilver(): number {
        return this._SafeStr_6220;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get achievementCode(): string {
        return this._achievementCode;
    }

    public get discountPriceCredits(): number {
        return this._SafeStr_6435;
    }

    public get discountPriceActivityPoints(): number {
        return this._SafeStr_6042;
    }
}
