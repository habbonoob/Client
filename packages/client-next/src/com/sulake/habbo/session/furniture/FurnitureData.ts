import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';

export class FurnitureData implements IFurnitureData {
    static { registerClassName(this, 'com.sulake.habbo.session.furniture::FurnitureData'); }

    public static readonly _SafeStr_7671: string = "i";
    public static readonly _SafeStr_8623: string = "s";

    declare private _type: string;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _className: string;

    declare private _hasIndexedColor: boolean;
    static { (this.prototype as any)._hasIndexedColor = false; }

    declare private _SafeStr_14690: number;
    static { (this.prototype as any)._SafeStr_14690 = 0; }

    declare private _revision: number;
    static { (this.prototype as any)._revision = 0; }

    declare private _SafeStr_14691: number;
    static { (this.prototype as any)._SafeStr_14691 = 0; }

    declare private _SafeStr_14692: number;
    static { (this.prototype as any)._SafeStr_14692 = 0; }

    declare private _SafeStr_14693: number;
    static { (this.prototype as any)._SafeStr_14693 = 0; }

    declare private _colours: any[];

    declare private _localizedName: string;

    declare private _description: string;

    declare private _SafeStr_14694: string;

    declare private _purchaseOfferId: number;
    static { (this.prototype as any)._purchaseOfferId = 0; }

    declare private _SafeStr_6299: number;
    static { (this.prototype as any)._SafeStr_6299 = 0; }

    declare private _customParams: string;

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _SafeStr_14695: string;

    declare private _purchaseCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._purchaseCouldBeUsedForBuyout = false; }

    declare private _rentCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._rentCouldBeUsedForBuyout = false; }

    declare private _availableForBuildersClub: boolean;
    static { (this.prototype as any)._availableForBuildersClub = false; }

    declare private _fullName: string;

    declare private _canStandOn: boolean;
    static { (this.prototype as any)._canStandOn = false; }

    declare private _SafeStr_14696: boolean;
    static { (this.prototype as any)._SafeStr_14696 = false; }

    declare private _SafeStr_14697: boolean;
    static { (this.prototype as any)._SafeStr_14697 = false; }

    declare private _SafeStr_14698: boolean;
    static { (this.prototype as any)._SafeStr_14698 = false; }

    declare private _height: number;
    static { (this.prototype as any)._height = NaN; }

    declare private _SafeStr_14699: boolean;
    static { (this.prototype as any)._SafeStr_14699 = false; }

    declare private _SafeStr_14700: string;

    declare private _bcOfferId: number;
    static { (this.prototype as any)._bcOfferId = 0; }

    declare private _tradeable: boolean;
    static { (this.prototype as any)._tradeable = false; }

    declare private _recyclable: boolean;
    static { (this.prototype as any)._recyclable = false; }

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string, param6: string, param7: number, param8: number, param9: number, param10: number, param11: any[], param12: boolean, param13: number, param14: string, param15: number, param16: boolean, param17: number, param18: boolean, param19: boolean, param20: string, param21: number, param22: string, param23: boolean, param24: boolean, param25: boolean, param26: boolean, param27: number, param28: boolean, param29: string, param30: number, param31: boolean, param32: boolean) {
        this._type = param1;
        this._id = param2;
        this._fullName = param3;
        this._className = param4;
        this._revision = param7;
        this._SafeStr_14691 = param8;
        this._SafeStr_14692 = param9;
        this._SafeStr_14693 = param10;
        this._colours = param11;
        this._hasIndexedColor = param12;
        this._SafeStr_14690 = param13;
        this._localizedName = param5;
        this._description = param6;
        this._SafeStr_14694 = param14;
        this._purchaseOfferId = param15;
        this._purchaseCouldBeUsedForBuyout = param16;
        this._SafeStr_6299 = param17;
        this._rentCouldBeUsedForBuyout = param18;
        this._customParams = param20;
        this._category = param21;
        this._SafeStr_14695 = param22;
        this._availableForBuildersClub = param19;
        this._canStandOn = param23;
        this._SafeStr_14696 = param24;
        this._SafeStr_14697 = param25;
        this._SafeStr_14698 = param26;
        this._height = param27;
        this._SafeStr_14699 = param28;
        this._SafeStr_14700 = param29;
        this._bcOfferId = param30;
        this._tradeable = param31;
        this._recyclable = param32;
    }

    public get type(): string {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public get className(): string {
        return this._className;
    }

    public get fullName(): string {
        return this._fullName;
    }

    public get hasIndexedColor(): boolean {
        return this._hasIndexedColor;
    }

    public get colourIndex(): number {
        return this._SafeStr_14690;
    }

    public get revision(): number {
        return this._revision;
    }

    public get tileSizeX(): number {
        return this._SafeStr_14691;
    }

    public get tileSizeY(): number {
        return this._SafeStr_14692;
    }

    public get tileSizeZ(): number {
        return this._SafeStr_14693;
    }

    public get colours(): any[] {
        return this._colours;
    }

    public get localizedName(): string {
        return this._localizedName;
    }

    public get description(): string {
        return this._description;
    }

    public get adUrl(): string {
        return this._SafeStr_14694;
    }

    public get purchaseOfferId(): number {
        return this._purchaseOfferId;
    }

    public get bcOfferId(): number {
        return this._bcOfferId;
    }

    public get customParams(): string {
        return this._customParams;
    }

    public get category(): number {
        return this._category;
    }

    public get furniDataCategory(): string {
        return this._SafeStr_14695;
    }

    public set className(param1: string) {
        this._className = param1;
    }

    public get rentOfferId(): number {
        return this._SafeStr_6299;
    }

    public get purchaseCouldBeUsedForBuyout(): boolean {
        return this._purchaseCouldBeUsedForBuyout;
    }

    public get rentCouldBeUsedForBuyout(): boolean {
        return this._rentCouldBeUsedForBuyout;
    }

    public get availableForBuildersClub(): boolean {
        return this._availableForBuildersClub;
    }

    public get canStandOn(): boolean {
        return this._canStandOn;
    }

    public get canSitOn(): boolean {
        return this._SafeStr_14696;
    }

    public get canLayOn(): boolean {
        return this._SafeStr_14697;
    }

    public get canPutStuffOn(): boolean {
        return this._SafeStr_14698;
    }

    public get height(): number {
        return this._height;
    }

    public get isExternalImageType(): boolean {
        return this._className.indexOf("external_image") != -1;
    }

    public get excludedFromDynamic(): boolean {
        return this._SafeStr_14699;
    }

    public get furniLine(): string {
        return this._SafeStr_14700;
    }

    public get tradeable(): boolean {
        return this._tradeable;
    }

    public get recyclable(): boolean {
        return this._recyclable;
    }

    get [IFurnitureData](): true {
        return true;
    }
}
