import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceItemStatsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceItemStatsParser'); }

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

    declare private _averagePrices: any[];

    public get averagePrices(): any[] {
        return this._averagePrices;
    }

    public get averagePrice(): number {
        return this._averagePrice;
    }

    public get offerCount(): number {
        return this._offerCount;
    }

    public get dayOffsets(): any[] {
        return this._dayOffsets;
    }

    public get soldAmounts(): any[] {
        return this._soldAmounts;
    }

    public get furniTypeId(): number {
        return this._furniTypeId;
    }

    public get furniCategoryId(): number {
        return this._furniCategoryId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._averagePrice = param1.readInteger();
        this._offerCount = param1.readInteger();
        this._historyLength = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        this._dayOffsets = [];
        this._averagePrices = [];
        this._soldAmounts = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._dayOffsets.push(param1.readInteger());
            this._averagePrices.push(param1.readInteger());
            this._soldAmounts.push(param1.readInteger());
            _loc3_++;
        }
        this._furniCategoryId = param1.readInteger();
        this._furniTypeId = param1.readInteger();
        return true;
    }
}
