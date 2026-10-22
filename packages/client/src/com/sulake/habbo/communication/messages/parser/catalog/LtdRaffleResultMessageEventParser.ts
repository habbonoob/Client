import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class LtdRaffleResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::LtdRaffleResultMessageEventParser'); }

    public static readonly _SafeStr_8478: number = 0;
    public static readonly _SafeStr_7732: number = 1;
    public static readonly _SafeStr_8064: number = 2;
    public static readonly _SafeStr_8130: number = 3;

    constructor() {
    }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _className: string;

    public get className(): string {
        return this._className;
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get hasWon(): boolean {
        return this._resultCode == 0;
    }

    public flush(): boolean {
        this._className = null;
        this._resultCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._className = param1.readString();
        this._resultCode = param1.readByte();
        return true;
    }
}
