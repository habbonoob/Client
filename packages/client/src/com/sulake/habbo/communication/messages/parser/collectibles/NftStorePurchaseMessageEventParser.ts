import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftStorePurchaseMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftStorePurchaseMessageEventParser'); }

    public static _SafeStr_5833: number = 0;
    public static _SafeStr_7384: number = 1;

    constructor() {
    }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    public get result(): number {
        return this._result;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readShort();
        return true;
    }
}
