import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class EmeraldBalanceMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::EmeraldBalanceMessageEventParser'); }

    private _emeraldBalance: number = 0;

    constructor() {
    }

    public flush(): boolean {
        this._emeraldBalance = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._emeraldBalance = param1.readInteger();
        return true;
    }

    public get emeraldBalance(): number {
        return this._emeraldBalance;
    }
}
