import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ExtraInfoItemData {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay::ExtraInfoItemData'); }

    public static readonly TYPE_PROMO: number = 0;
    public static readonly TYPE_BUNDLES_INFO_SCREEN: number = 1;
    public static readonly _SafeStr_8257: number = 2;
    public static readonly TYPE_BONUS_BADGE: number = 3;
    public static readonly _SafeStr_8638: number = 4;
    public static readonly TYPE_RESET_MESSAGE: number = 5;

    constructor(param1: number, param2: string = "") {
        this._type = param1;
        this._text = param2;
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _quantity: number;
    static { (this.prototype as any)._quantity = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _discountPriceCredits: number;
    static { (this.prototype as any)._discountPriceCredits = 0; }

    declare private _discountPriceActivityPoints: number;
    static { (this.prototype as any)._discountPriceActivityPoints = 0; }

    declare private _priceCredits: number;
    static { (this.prototype as any)._priceCredits = 0; }

    declare private _SafeStr_5965: number;
    static { (this.prototype as any)._SafeStr_5965 = 0; }

    declare private _priceSilver: number;
    static { (this.prototype as any)._priceSilver = 0; }

    declare private _text: string;

    public get text(): string {
        return this._text;
    }

    public set text(param1: string) {
        this._text = param1;
    }

    declare private _badgeCode: string;

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public set badgeCode(param1: string) {
        this._badgeCode = param1;
    }

    declare private _achievementCode: string;

    public get achievementCode(): string {
        return this._achievementCode;
    }

    public set achievementCode(param1: string) {
        this._achievementCode = param1;
    }

    public get type(): number {
        return this._type;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(param1: number) {
        this._quantity = param1;
    }

    public get priceCredits(): number {
        return this._priceCredits;
    }

    public set priceCredits(param1: number) {
        this._priceCredits = param1;
    }

    public get priceActivityPoints(): number {
        return this._SafeStr_5965;
    }

    public set priceActivityPoints(param1: number) {
        this._SafeStr_5965 = param1;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public set activityPointType(param1: number) {
        this._activityPointType = param1;
    }

    public get priceSilver(): number {
        return this._priceSilver;
    }

    public set priceSilver(param1: number) {
        this._priceSilver = param1;
    }

    public get discountPriceCredits(): number {
        return this._discountPriceCredits;
    }

    public set discountPriceCredits(param1: number) {
        this._discountPriceCredits = param1;
    }

    public get discountPriceActivityPoints(): number {
        return this._discountPriceActivityPoints;
    }

    public set discountPriceActivityPoints(param1: number) {
        this._discountPriceActivityPoints = param1;
    }
}
