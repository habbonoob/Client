import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradeOpenFailedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradeOpenFailedParser'); }

    public static readonly _SafeStr_8609: number = 7;
    public static readonly _SafeStr_7940: number = 8;

    constructor() {
    }

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    declare private _otherUserName: string;

    public get otherUserName(): string {
        return this._otherUserName;
    }

    public get reason(): number {
        return this._reason;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._reason = param1.readInteger();
        this._otherUserName = param1.readString();
        return true;
    }
}
