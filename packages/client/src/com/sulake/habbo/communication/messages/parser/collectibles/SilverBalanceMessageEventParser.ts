import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SilverBalanceMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::SilverBalanceMessageEventParser'); }

    constructor() {
    }

    private _silverBalance: number = 0;

    public get silverBalance(): number {
        return this._silverBalance;
    }

    public flush(): boolean {
        this._silverBalance = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._silverBalance = param1.readInteger();
        return true;
    }
}
