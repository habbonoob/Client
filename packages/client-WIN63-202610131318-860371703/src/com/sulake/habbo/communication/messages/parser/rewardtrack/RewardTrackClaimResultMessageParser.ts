import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RewardTrackClaimResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTrackClaimResultMessageParser'); }

    public static readonly SUCCESS: number = 0;
    public static readonly _SafeStr_7819: number = 1;
    public static readonly _SafeStr_14098: number = 2;
    public static readonly _SafeStr_14099: number = 3;
    public static readonly _SafeStr_14100: number = 4;
    public static readonly _SafeStr_14101: number = 5;
    public static readonly _SafeStr_14102: number = 6;
    public static readonly _SafeStr_14103: number = 7;
    public static readonly _SafeStr_14104: number = 8;

    declare private _SafeStr_14105: string;

    declare private _SafeStr_14106: string;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14105 = null;
        this._SafeStr_14106 = null;
        this._resultCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14105 = param1.readString();
        this._SafeStr_14106 = param1.readString();
        this._resultCode = param1.readInteger();
        return true;
    }

    public get trackId(): string {
        return this._SafeStr_14105;
    }

    public get rewardId(): string {
        return this._SafeStr_14106;
    }

    public get resultCode(): number {
        return this._resultCode;
    }
}
