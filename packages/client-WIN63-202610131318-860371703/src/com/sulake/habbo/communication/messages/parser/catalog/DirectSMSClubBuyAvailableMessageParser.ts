import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DirectSMSClubBuyAvailableMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::DirectSMSClubBuyAvailableMessageParser'); }

    declare private _SafeStr_4012: boolean;
    static { (this.prototype as any)._SafeStr_4012 = false; }

    declare private _pricePointUrl: string;

    declare private _market: string;

    declare private _lengthInDays: number;
    static { (this.prototype as any)._lengthInDays = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_4012 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._pricePointUrl = param1.readString();
        if (this._pricePointUrl != "") {
            this._SafeStr_4012 = true;
        }
        this._market = param1.readString();
        this._lengthInDays = param1.readInteger();
        return true;
    }

    public get available(): boolean {
        return this._SafeStr_4012;
    }

    public get pricePointUrl(): string {
        return this._pricePointUrl;
    }

    public get market(): string {
        return this._market;
    }

    public get lengthInDays(): number {
        return this._lengthInDays;
    }
}
