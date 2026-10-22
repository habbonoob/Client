import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RewardTrackClaimResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTrackClaimResultMessageParser'); }

    public static readonly SUCCESS: number = 0;
    public static readonly _SafeStr_7819: number = 1;
    public static readonly _SafeStr_14814: number = 2;
    public static readonly _SafeStr_14815: number = 3;
    public static readonly _SafeStr_14816: number = 4;
    public static readonly _SafeStr_14817: number = 5;
    public static readonly _SafeStr_14818: number = 6;
    public static readonly _SafeStr_14819: number = 7;
    public static readonly _SafeStr_14820: number = 8;

    declare private _SafeStr_14821: string;

    declare private _SafeStr_14822: string;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14821 = null;
        this._SafeStr_14822 = null;
        this._resultCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14821 = param1.readString();
        this._SafeStr_14822 = param1.readString();
        this._resultCode = param1.readInteger();
        return true;
    }

    public get trackId(): string {
        return this._SafeStr_14821;
    }

    public get rewardId(): string {
        return this._SafeStr_14822;
    }

    public get resultCode(): number {
        return this._resultCode;
    }
}
