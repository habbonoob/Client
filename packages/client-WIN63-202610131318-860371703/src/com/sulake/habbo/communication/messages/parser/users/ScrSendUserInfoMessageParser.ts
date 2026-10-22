import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ScrSendUserInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ScrSendUserInfoMessageParser'); }

    public static readonly _SafeStr_7995: number = 1;
    public static readonly _SafeStr_7680: number = 2;
    public static readonly _SafeStr_8251: number = 3;
    public static readonly _SafeStr_8180: number = 4;

    declare private _productName: string;

    declare private _SafeStr_6673: number;
    static { (this.prototype as any)._SafeStr_6673 = 0; }

    declare private _SafeStr_7272: number;
    static { (this.prototype as any)._SafeStr_7272 = 0; }

    declare private _SafeStr_6048: number;
    static { (this.prototype as any)._SafeStr_6048 = 0; }

    declare private _SafeStr_6974: number;
    static { (this.prototype as any)._SafeStr_6974 = 0; }

    declare private _SafeStr_6019: boolean;
    static { (this.prototype as any)._SafeStr_6019 = false; }

    declare private _isVIP: boolean;
    static { (this.prototype as any)._isVIP = false; }

    declare private _pastClubDays: number;
    static { (this.prototype as any)._pastClubDays = 0; }

    declare private _pastVipDays: number;
    static { (this.prototype as any)._pastVipDays = 0; }

    declare private _minutesUntilExpiration: number;
    static { (this.prototype as any)._minutesUntilExpiration = 0; }

    declare private _minutesSinceLastModified: number;
    static { (this.prototype as any)._minutesSinceLastModified = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._productName = param1.readString();
        this._SafeStr_6673 = param1.readInteger();
        this._SafeStr_7272 = param1.readInteger();
        this._SafeStr_6048 = param1.readInteger();
        this._SafeStr_6974 = param1.readInteger();
        this._SafeStr_6019 = param1.readBoolean();
        this._isVIP = param1.readBoolean();
        this._pastClubDays = param1.readInteger();
        this._pastVipDays = param1.readInteger();
        this._minutesUntilExpiration = param1.readInteger();
        if (param1.bytesAvailable) {
            this._minutesSinceLastModified = param1.readInteger();
        }
        return true;
    }

    public get productName(): string {
        return this._productName;
    }

    public get daysToPeriodEnd(): number {
        return this._SafeStr_6673;
    }

    public get memberPeriods(): number {
        return this._SafeStr_7272;
    }

    public get periodsSubscribedAhead(): number {
        return this._SafeStr_6048;
    }

    public get responseType(): number {
        return this._SafeStr_6974;
    }

    public get hasEverBeenMember(): boolean {
        return this._SafeStr_6019;
    }

    public get isVIP(): boolean {
        return this._isVIP;
    }

    public get pastClubDays(): number {
        return this._pastClubDays;
    }

    public get pastVipDays(): number {
        return this._pastVipDays;
    }

    public get minutesUntilExpiration(): number {
        return this._minutesUntilExpiration;
    }

    public get minutesSinceLastModified(): number {
        return this._minutesSinceLastModified;
    }
}
