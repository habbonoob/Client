import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceBuyOfferResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceBuyOfferResultParser'); }

    constructor() {
    }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    private _SafeStr_6762: number = -1;
    private _newPrice: number = -1;
    private _requestedOfferId: number = -1;

    public get result(): number {
        return this._result;
    }

    public get offerId(): number {
        return this._SafeStr_6762;
    }

    public get newPrice(): number {
        return this._newPrice;
    }

    public get requestedOfferId(): number {
        return this._requestedOfferId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        this._SafeStr_6762 = param1.readInteger();
        this._newPrice = param1.readInteger();
        this._requestedOfferId = param1.readInteger();
        return true;
    }
}
