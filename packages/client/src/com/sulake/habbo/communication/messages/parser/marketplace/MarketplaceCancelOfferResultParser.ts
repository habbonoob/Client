import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceCancelOfferResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceCancelOfferResultParser'); }

    constructor() {
    }

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get success(): boolean {
        return this._success;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._offerId = param1.readInteger();
        this._success = param1.readBoolean();
        return true;
    }
}
