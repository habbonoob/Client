import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MarketplaceItemStats {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketplaceItemStats'); }

    constructor() {
    }

    declare private _averagePrice: number;
    static { (this.prototype as any)._averagePrice = 0; }

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    declare private _dayOffsets: any[];

    declare private _soldAmounts: any[];

    declare private _furniTypeId: number;
    static { (this.prototype as any)._furniTypeId = 0; }

    declare private _furniCategoryId: number;
    static { (this.prototype as any)._furniCategoryId = 0; }

    declare private _historyLength: number;
    static { (this.prototype as any)._historyLength = 0; }

    public get historyLength(): number {
        return this._historyLength;
    }

    public set historyLength(param1: number) {
        this._historyLength = param1;
    }

    declare private _averagePrices: any[];

    public get averagePrices(): any[] {
        return this._averagePrices;
    }

    public set averagePrices(param1: any[]) {
        this._averagePrices = param1.slice();
    }

    public get averagePrice(): number {
        return this._averagePrice;
    }

    public set averagePrice(param1: number) {
        this._averagePrice = param1;
    }

    public get offerCount(): number {
        return this._offerCount;
    }

    public set offerCount(param1: number) {
        this._offerCount = param1;
    }

    public get dayOffsets(): any[] {
        return this._dayOffsets;
    }

    public set dayOffsets(param1: any[]) {
        this._dayOffsets = param1.slice();
    }

    public get soldAmounts(): any[] {
        return this._soldAmounts;
    }

    public set soldAmounts(param1: any[]) {
        this._soldAmounts = param1.slice();
    }

    public get furniTypeId(): number {
        return this._furniTypeId;
    }

    public set furniTypeId(param1: number) {
        this._furniTypeId = param1;
    }

    public get furniCategoryId(): number {
        return this._furniCategoryId;
    }

    public set furniCategoryId(param1: number) {
        this._furniCategoryId = param1;
    }
}
