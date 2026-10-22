import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceConfigurationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceConfigurationParser'); }

    constructor() {
    }

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    declare private _commission: number;
    static { (this.prototype as any)._commission = 0; }

    declare private _tokenBatchPrice: number;
    static { (this.prototype as any)._tokenBatchPrice = 0; }

    declare private _SafeStr_5540: number;
    static { (this.prototype as any)._SafeStr_5540 = 0; }

    declare private _averagePricePeriod: number;
    static { (this.prototype as any)._averagePricePeriod = 0; }

    declare private _sellingFeePercentage: number;
    static { (this.prototype as any)._sellingFeePercentage = 0; }

    declare private _offerMaxPrice: number;
    static { (this.prototype as any)._offerMaxPrice = 0; }

    public get offerMaxPrice(): number {
        return this._offerMaxPrice;
    }

    declare private _offerMinPrice: number;
    static { (this.prototype as any)._offerMinPrice = 0; }

    public get offerMinPrice(): number {
        return this._offerMinPrice;
    }

    declare private _expirationHours: number;
    static { (this.prototype as any)._expirationHours = 0; }

    public get expirationHours(): number {
        return this._expirationHours;
    }

    declare private _revenueLimit: number;
    static { (this.prototype as any)._revenueLimit = 0; }

    public get revenueLimit(): number {
        return this._revenueLimit;
    }

    declare private _halfTaxLimit: number;
    static { (this.prototype as any)._halfTaxLimit = 0; }

    public get halfTaxLimit(): number {
        return this._halfTaxLimit;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public get commission(): number {
        return this._commission;
    }

    public get tokenBatchPrice(): number {
        return this._tokenBatchPrice;
    }

    public get tokenBatchSize(): number {
        return this._SafeStr_5540;
    }

    public get averagePricePeriod(): number {
        return this._averagePricePeriod;
    }

    public get tokensBatchSize(): number {
        return this._SafeStr_5540;
    }

    public get sellingFeePercentage(): number {
        return this._sellingFeePercentage;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isEnabled = param1.readBoolean();
        this._commission = param1.readInteger();
        this._tokenBatchPrice = param1.readInteger();
        this._SafeStr_5540 = param1.readInteger();
        this._offerMinPrice = param1.readInteger();
        this._offerMaxPrice = param1.readInteger();
        this._expirationHours = param1.readInteger();
        this._averagePricePeriod = param1.readInteger();
        this._sellingFeePercentage = param1.readInteger();
        this._revenueLimit = param1.readInteger();
        this._halfTaxLimit = param1.readInteger();
        return true;
    }
}
