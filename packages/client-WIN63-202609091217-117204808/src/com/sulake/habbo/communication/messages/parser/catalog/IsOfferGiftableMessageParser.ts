import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IsOfferGiftableMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::IsOfferGiftableMessageParser'); }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _SafeStr_6446: boolean;
    static { (this.prototype as any)._SafeStr_6446 = false; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._offerId = param1.readInteger();
        this._SafeStr_6446 = param1.readBoolean();
        return true;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get isGiftable(): boolean {
        return this._SafeStr_6446;
    }
}
