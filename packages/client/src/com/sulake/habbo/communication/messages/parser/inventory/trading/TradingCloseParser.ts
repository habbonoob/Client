import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradingCloseParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradingCloseParser'); }

    public static readonly _SafeStr_8676: number = 1;

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    public get userID(): number {
        return this._userId;
    }

    public get reason(): number {
        return this._reason;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._reason = param1.readInteger();
        return true;
    }
}
