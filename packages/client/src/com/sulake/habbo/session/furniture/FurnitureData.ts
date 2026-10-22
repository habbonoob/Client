import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';

export class FurnitureData implements IFurnitureData {
    static { registerClassName(this, 'com.sulake.habbo.session.furniture::FurnitureData'); }

    public static readonly _SafeStr_7671: string = "i";
    public static readonly _SafeStr_8623: string = "s";

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string, param6: string, param7: number, param8: number, param9: number, param10: number, param11: any[], param12: boolean, param13: number, param14: string, param15: number, param16: boolean, param17: number, param18: boolean, param19: boolean, param20: string, param21: number, param22: boolean, param23: boolean, param24: boolean, param25: boolean, param26: string, param27: number, param28: boolean) {
        this._type = param1;
        this._id = param2;
        this._fullName = param3;
        this._className = param4;
        this._revision = param7;
        this._tileSizeX = param8;
        this._tileSizeY = param9;
        this._tileSizeZ = param10;
        this._colours = param11;
        this._hasIndexedColor = param12;
        this._colourIndex = param13;
        this._localizedName = param5;
        this._description = param6;
        this._adUrl = param14;
        this._purchaseOfferId = param15;
        this._purchaseCouldBeUsedForBuyout = param16;
        this._rentOfferId = param17;
        this._rentCouldBeUsedForBuyout = param18;
        this._customParams = param20;
        this._category = param21;
        this._availableForBuildersClub = param19;
        this._canStandOn = param22;
        this._canSitOn = param23;
        this._canLayOn = param24;
        this._excludedFromDynamic = param25;
        this._furniLine = param26;
        this._bcOfferId = param27;
        this._tradeable = param28;
    }

    declare private _type: string;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _colourIndex: number;
    static { (this.prototype as any)._colourIndex = 0; }

    declare private _revision: number;
    static { (this.prototype as any)._revision = 0; }

    declare private _tileSizeX: number;
    static { (this.prototype as any)._tileSizeX = 0; }

    declare private _tileSizeY: number;
    static { (this.prototype as any)._tileSizeY = 0; }

    declare private _tileSizeZ: number;
    static { (this.prototype as any)._tileSizeZ = 0; }

    declare private _description: string;

    declare private _adUrl: string;

    declare private _purchaseOfferId: number;
    static { (this.prototype as any)._purchaseOfferId = 0; }

    declare private _rentOfferId: number;
    static { (this.prototype as any)._rentOfferId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _availableForBuildersClub: boolean;
    static { (this.prototype as any)._availableForBuildersClub = false; }

    declare private _canStandOn: boolean;
    static { (this.prototype as any)._canStandOn = false; }

    declare private _canSitOn: boolean;
    static { (this.prototype as any)._canSitOn = false; }

    declare private _canLayOn: boolean;
    static { (this.prototype as any)._canLayOn = false; }

    declare private _excludedFromDynamic: boolean;
    static { (this.prototype as any)._excludedFromDynamic = false; }

    declare private _furniLine: string;

    declare private _bcOfferId: number;
    static { (this.prototype as any)._bcOfferId = 0; }

    declare private _tradeable: boolean;
    static { (this.prototype as any)._tradeable = false; }

    declare private _className: string;

    public get className(): string {
        return this._className;
    }

    public set className(param1: string) {
        this._className = param1;
    }

    declare private _hasIndexedColor: boolean;
    static { (this.prototype as any)._hasIndexedColor = false; }

    public get hasIndexedColor(): boolean {
        return this._hasIndexedColor;
    }

    declare private _colours: any[];

    public get colours(): any[] {
        return this._colours;
    }

    declare private _localizedName: string;

    public get localizedName(): string {
        return this._localizedName;
    }

    declare private _customParams: string;

    public get customParams(): string {
        return this._customParams;
    }

    declare private _purchaseCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._purchaseCouldBeUsedForBuyout = false; }

    public get purchaseCouldBeUsedForBuyout(): boolean {
        return this._purchaseCouldBeUsedForBuyout;
    }

    declare private _rentCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._rentCouldBeUsedForBuyout = false; }

    public get rentCouldBeUsedForBuyout(): boolean {
        return this._rentCouldBeUsedForBuyout;
    }

    declare private _fullName: string;

    public get fullName(): string {
        return this._fullName;
    }

    public get type(): string {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public get colourIndex(): number {
        return this._colourIndex;
    }

    public get revision(): number {
        return this._revision;
    }

    public get tileSizeX(): number {
        return this._tileSizeX;
    }

    public get tileSizeY(): number {
        return this._tileSizeY;
    }

    public get tileSizeZ(): number {
        return this._tileSizeZ;
    }

    public get description(): string {
        return this._description;
    }

    public get adUrl(): string {
        return this._adUrl;
    }

    public get purchaseOfferId(): number {
        return this._purchaseOfferId;
    }

    public get bcOfferId(): number {
        return this._bcOfferId;
    }

    public get category(): number {
        return this._category;
    }

    public get rentOfferId(): number {
        return this._rentOfferId;
    }

    public get availableForBuildersClub(): boolean {
        return this._availableForBuildersClub;
    }

    public get canStandOn(): boolean {
        return this._canStandOn;
    }

    public get canSitOn(): boolean {
        return this._canSitOn;
    }

    public get canLayOn(): boolean {
        return this._canLayOn;
    }

    public get isExternalImageType(): boolean {
        return this._className.indexOf("external_image") != -1;
    }

    public get excludedFromDynamic(): boolean {
        return this._excludedFromDynamic;
    }

    public get furniLine(): string {
        return this._furniLine;
    }

    public get tradeable(): boolean {
        return this._tradeable;
    }

    get [IFurnitureData](): true {
        return true;
    }
}
