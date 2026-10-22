import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradingOpenParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradingOpenParser'); }

    declare private _userID: number;
    static { (this.prototype as any)._userID = 0; }

    declare private _userCanTrade: boolean;
    static { (this.prototype as any)._userCanTrade = false; }

    declare private _otherUserID: number;
    static { (this.prototype as any)._otherUserID = 0; }

    declare private _otherUserCanTrade: boolean;
    static { (this.prototype as any)._otherUserCanTrade = false; }

    constructor() {
    }

    public get userID(): number {
        return this._userID;
    }

    public get userCanTrade(): boolean {
        return this._userCanTrade;
    }

    public get otherUserID(): number {
        return this._otherUserID;
    }

    public get otherUserCanTrade(): boolean {
        return this._otherUserCanTrade;
    }

    public flush(): boolean {
        this._userID = -1;
        this._userCanTrade = false;
        this._otherUserID = -1;
        this._otherUserCanTrade = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userID = param1.readInteger();
        this._userCanTrade = param1.readInteger() == 1;
        this._otherUserID = param1.readInteger();
        this._otherUserCanTrade = param1.readInteger() == 1;
        return true;
    }
}
