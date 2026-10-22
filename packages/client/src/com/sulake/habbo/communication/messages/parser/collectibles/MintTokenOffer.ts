import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class MintTokenOffer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::MintTokenOffer'); }

    constructor(param1: IMessageDataWrapper) {
        this._offerId = param1.readInteger();
        this._productCode = param1.readString();
        this._silverPrice = param1.readInteger();
        this._amountTokens = param1.readInteger();
    }

    declare private _silverPrice: number;
    static { (this.prototype as any)._silverPrice = 0; }

    declare private _amountTokens: number;
    static { (this.prototype as any)._amountTokens = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get silverPrice(): number {
        return this._silverPrice;
    }

    public get amountTokens(): number {
        return this._amountTokens;
    }
}
