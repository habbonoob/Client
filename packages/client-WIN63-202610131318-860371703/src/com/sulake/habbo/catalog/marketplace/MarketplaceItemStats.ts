import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MarketplaceItemStats {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketplaceItemStats'); }

    declare private _SafeStr_6209: number;
    static { (this.prototype as any)._SafeStr_6209 = 0; }

    declare private _SafeStr_14081: number;
    static { (this.prototype as any)._SafeStr_14081 = 0; }

    declare private _historyLength: number;
    static { (this.prototype as any)._historyLength = 0; }

    declare private _SafeStr_6253: any[];

    declare private _averagePrices: any[];

    declare private _dayOffsets: any[];

    declare private _SafeStr_14082: number;
    static { (this.prototype as any)._SafeStr_14082 = 0; }

    declare private _soldAmounts: number;
    static { (this.prototype as any)._soldAmounts = 0; }

    declare private _SafeStr_7079: number;
    static { (this.prototype as any)._SafeStr_7079 = 0; }

    declare private _SafeStr_6727: number;
    static { (this.prototype as any)._SafeStr_6727 = 0; }

    constructor() {
    }

    public get averagePrice(): number {
        return this._SafeStr_6209;
    }

    public get offerCount(): number {
        return this._SafeStr_14081;
    }

    public get historyLength(): number {
        return this._historyLength;
    }

    public get dayOffsets(): any[] {
        return this._SafeStr_6253;
    }

    public get averagePrices(): any[] {
        return this._averagePrices;
    }

    public get soldAmounts(): any[] {
        return this._dayOffsets;
    }

    public get furniTypeId(): number {
        return this._SafeStr_14082;
    }

    public get furniCategoryId(): number {
        return this._soldAmounts;
    }

    public get lowestCurrentPrice(): number {
        return this._SafeStr_7079;
    }

    public get suggestedPrice(): number {
        return this._SafeStr_6727;
    }

    public set averagePrice(param1: number) {
        this._SafeStr_6209 = param1;
    }

    public set offerCount(param1: number) {
        this._SafeStr_14081 = param1;
    }

    public set historyLength(param1: number) {
        this._historyLength = param1;
    }

    public set dayOffsets(param1: any[]) {
        this._SafeStr_6253 = param1.slice();
    }

    public set averagePrices(param1: any[]) {
        this._averagePrices = param1.slice();
    }

    public set soldAmounts(param1: any[]) {
        this._dayOffsets = param1.slice();
    }

    public set furniTypeId(param1: number) {
        this._SafeStr_14082 = param1;
    }

    public set furniCategoryId(param1: number) {
        this._soldAmounts = param1;
    }

    public set lowestCurrentPrice(param1: number) {
        this._SafeStr_7079 = param1;
    }

    public set suggestedPrice(param1: number) {
        this._SafeStr_6727 = param1;
    }
}
