import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionErrorMessageParser'); }

    public static readonly _SafeStr_8551: number = 0;
    public static readonly _SafeStr_8595: number = 1;
    public static readonly _SafeStr_7601: number = 2;
    public static readonly _SafeStr_8109: number = 3;
    public static readonly _SafeStr_7696: number = 4;

    constructor() {
    }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        return true;
    }
}
