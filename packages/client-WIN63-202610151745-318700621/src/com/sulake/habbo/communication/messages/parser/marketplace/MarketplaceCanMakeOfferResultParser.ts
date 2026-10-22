import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MarketplaceCanMakeOfferResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketplaceCanMakeOfferResultParser'); }

    declare private _tokenCount: number;
    static { (this.prototype as any)._tokenCount = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor() {
    }

    public get tokenCount(): number {
        return this._tokenCount;
    }

    public get resultCode(): number {
        return this._result;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        this._tokenCount = param1.readInteger();
        return true;
    }
}
