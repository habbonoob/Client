import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IsOfferGiftableMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::IsOfferGiftableMessageParser'); }

    constructor() {
    }

    declare private _isGiftable: boolean;
    static { (this.prototype as any)._isGiftable = false; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get isGiftable(): boolean {
        return this._isGiftable;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._offerId = param1.readInteger();
        this._isGiftable = param1.readBoolean();
        return true;
    }
}
