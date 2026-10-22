import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CollectibleMintableItemResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleMintableItemResultMessageEventParser'); }

    public static _SafeStr_7384: number = 0;
    public static _SafeStr_5833: number = 1;
    public static _SafeStr_8134: number = 2;

    declare private _mintResult: number;
    static { (this.prototype as any)._mintResult = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._mintResult = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._mintResult = param1.readShort();
        return true;
    }

    public get mintResult(): number {
        return this._mintResult;
    }
}
