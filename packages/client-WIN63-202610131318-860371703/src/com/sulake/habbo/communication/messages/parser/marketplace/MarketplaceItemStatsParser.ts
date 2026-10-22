import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceItemStatsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceItemStatsParser'); }

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

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_6209 = param1.readInteger();
        this._SafeStr_14081 = param1.readInteger();
        this._historyLength = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        this._SafeStr_6253 = [];
        this._averagePrices = [];
        this._dayOffsets = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_6253.push(param1.readInteger());
            this._averagePrices.push(param1.readInteger());
            this._dayOffsets.push(param1.readInteger());
            _loc3_++;
        }
        this._soldAmounts = param1.readInteger();
        this._SafeStr_14082 = param1.readInteger();
        this._SafeStr_7079 = param1.readInteger();
        this._SafeStr_6727 = param1.readInteger();
        return true;
    }
}
