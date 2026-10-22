import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradingAcceptParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradingAcceptParser'); }

    constructor() {
    }

    declare private _userID: number;
    static { (this.prototype as any)._userID = 0; }

    declare private _userAccepts: boolean;
    static { (this.prototype as any)._userAccepts = false; }

    public get userID(): number {
        return this._userID;
    }

    public get userAccepts(): boolean {
        return this._userAccepts;
    }

    public flush(): boolean {
        this._userID = -1;
        this._userAccepts = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userID = param1.readInteger();
        this._userAccepts = param1.readInteger() > 0;
        return true;
    }
}
