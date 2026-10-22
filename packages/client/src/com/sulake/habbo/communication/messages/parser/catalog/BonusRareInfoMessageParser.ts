import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BonusRareInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::BonusRareInfoMessageParser'); }

    constructor() {
    }

    declare private _productType: string;

    declare private _productClassId: number;
    static { (this.prototype as any)._productClassId = 0; }

    declare private _coinsStillRequiredToBuy: number;
    static { (this.prototype as any)._coinsStillRequiredToBuy = 0; }

    declare private _totalCoinsForBonus: number;
    static { (this.prototype as any)._totalCoinsForBonus = 0; }

    public get totalCoinsForBonus(): number {
        return this._totalCoinsForBonus;
    }

    public get coinsStillRequiredToBuy(): number {
        return this._coinsStillRequiredToBuy;
    }

    public get productType(): string {
        return this._productType;
    }

    public get productClassId(): number {
        return this._productClassId;
    }

    public flush(): boolean {
        this._totalCoinsForBonus = -1;
        this._coinsStillRequiredToBuy = -1;
        this._productType = "";
        this._productClassId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._productType = param1.readString();
        this._productClassId = param1.readInteger();
        this._totalCoinsForBonus = param1.readInteger();
        this._coinsStillRequiredToBuy = param1.readInteger();
        return true;
    }
}
