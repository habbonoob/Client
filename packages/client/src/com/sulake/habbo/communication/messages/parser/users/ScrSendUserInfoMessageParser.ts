import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ScrSendUserInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ScrSendUserInfoMessageParser'); }

    public static readonly _SafeStr_7995: number = 1;
    public static readonly _SafeStr_7680: number = 2;
    public static readonly _SafeStr_8251: number = 3;
    public static readonly _SafeStr_8180: number = 4;

    constructor() {
    }

    declare private _daysToPeriodEnd: number;
    static { (this.prototype as any)._daysToPeriodEnd = 0; }

    declare private _memberPeriods: number;
    static { (this.prototype as any)._memberPeriods = 0; }

    declare private _periodsSubscribedAhead: number;
    static { (this.prototype as any)._periodsSubscribedAhead = 0; }

    declare private _responseType: number;
    static { (this.prototype as any)._responseType = 0; }

    declare private _hasEverBeenMember: boolean;
    static { (this.prototype as any)._hasEverBeenMember = false; }

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

    declare private _productName: string;

    public get productName(): string {
        return this._productName;
    }

    public get daysToPeriodEnd(): number {
        return this._daysToPeriodEnd;
    }

    public get memberPeriods(): number {
        return this._memberPeriods;
    }

    public get periodsSubscribedAhead(): number {
        return this._periodsSubscribedAhead;
    }

    public get responseType(): number {
        return this._responseType;
    }

    public get hasEverBeenMember(): boolean {
        return this._hasEverBeenMember;
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

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._productName = param1.readString();
        this._daysToPeriodEnd = param1.readInteger();
        this._memberPeriods = param1.readInteger();
        this._periodsSubscribedAhead = param1.readInteger();
        this._responseType = param1.readInteger();
        this._hasEverBeenMember = param1.readBoolean();
        this._isVIP = param1.readBoolean();
        this._pastClubDays = param1.readInteger();
        this._pastVipDays = param1.readInteger();
        this._minutesUntilExpiration = param1.readInteger();
        if (param1.bytesAvailable) {
            this._minutesSinceLastModified = param1.readInteger();
        }
        return true;
    }
}
