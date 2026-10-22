import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftEmeraldConvertResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.nft::NftEmeraldConvertResultMessageParser'); }

    public static readonly _SafeStr_5833: number = 0;
    public static readonly _SafeStr_8785: number = 1;
    public static readonly _SafeStr_7900: number = 2;
    public static readonly _SafeStr_7759: number = 3;
    public static readonly _SafeStr_8344: number = 4;
    public static readonly _SafeStr_7654: number = 5;

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._stuffId = 0;
        this._result = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._stuffId = param1.readInteger();
        this._result = param1.readShort();
        return true;
    }

    public get stuffId(): number {
        return this._stuffId;
    }

    public get result(): number {
        return this._result;
    }
}
