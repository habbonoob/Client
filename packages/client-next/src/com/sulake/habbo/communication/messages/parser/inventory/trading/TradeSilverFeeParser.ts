import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradeSilverFeeParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradeSilverFeeParser'); }

    declare private _silverFee: number;
    static { (this.prototype as any)._silverFee = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._silverFee = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._silverFee = param1.readInteger();
        return true;
    }

    public get silverFee(): number {
        return this._silverFee;
    }
}
