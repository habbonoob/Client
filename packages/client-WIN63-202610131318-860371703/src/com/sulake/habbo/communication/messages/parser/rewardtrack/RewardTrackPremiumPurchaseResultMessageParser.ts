import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RewardTrackPremiumPurchaseResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTrackPremiumPurchaseResultMessageParser'); }

    public static readonly SUCCESS: number = 0;
    public static readonly _SafeStr_7819: number = 1;
    public static readonly _SafeStr_14098: number = 2;
    public static readonly _SafeStr_14100: number = 3;
    public static readonly _SafeStr_14109: number = 4;
    public static readonly _SafeStr_14110: number = 5;
    public static readonly _SafeStr_14111: number = 6;
    public static readonly _SafeStr_14112: number = 7;
    public static readonly _SafeStr_14113: number = 8;
    public static readonly _SafeStr_14103: number = 9;

    declare private _SafeStr_14105: string;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _SafeStr_5536: number;
    static { (this.prototype as any)._SafeStr_5536 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14105 = null;
        this._resultCode = 0;
        this._SafeStr_5536 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14105 = param1.readString();
        this._resultCode = param1.readInteger();
        this._SafeStr_5536 = param1.readInteger();
        return true;
    }

    public get trackId(): string {
        return this._SafeStr_14105;
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get points(): number {
        return this._SafeStr_5536;
    }
}
