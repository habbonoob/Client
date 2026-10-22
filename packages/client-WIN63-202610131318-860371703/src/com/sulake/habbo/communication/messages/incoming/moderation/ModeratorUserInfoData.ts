import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ModeratorUserInfoData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorUserInfoData'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _registrationAgeInMinutes: number;
    static { (this.prototype as any)._registrationAgeInMinutes = 0; }

    declare private _minutesSinceLastLogin: number;
    static { (this.prototype as any)._minutesSinceLastLogin = 0; }

    declare private _online: boolean;
    static { (this.prototype as any)._online = false; }

    declare private _cfhCount: number;
    static { (this.prototype as any)._cfhCount = 0; }

    declare private _abusiveCfhCount: number;
    static { (this.prototype as any)._abusiveCfhCount = 0; }

    declare private _cautionCount: number;
    static { (this.prototype as any)._cautionCount = 0; }

    declare private _banCount: number;
    static { (this.prototype as any)._banCount = 0; }

    declare private _tradingLockCount: number;
    static { (this.prototype as any)._tradingLockCount = 0; }

    declare private _tradingExpiryDate: string;

    declare private _lastPurchaseDate: string;

    declare private _identityId: number;
    static { (this.prototype as any)._identityId = 0; }

    declare private _identityRelatedBanCount: number;
    static { (this.prototype as any)._identityRelatedBanCount = 0; }

    declare private _primaryEmailAddress: string;

    declare private _figure: string;

    declare private _userClassification: string;

    private _lastSanctionTime: string = "";
    private _sanctionAgeHours: number = 0;

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._figure = param1.readString();
        this._registrationAgeInMinutes = param1.readInteger();
        this._minutesSinceLastLogin = param1.readInteger();
        this._online = param1.readBoolean();
        this._cfhCount = param1.readInteger();
        this._abusiveCfhCount = param1.readInteger();
        this._cautionCount = param1.readInteger();
        this._banCount = param1.readInteger();
        this._tradingLockCount = param1.readInteger();
        this._tradingExpiryDate = param1.readString();
        this._lastPurchaseDate = param1.readString();
        this._identityId = param1.readInteger();
        this._identityRelatedBanCount = param1.readInteger();
        this._primaryEmailAddress = param1.readString();
        this._userClassification = param1.readString();
        if (param1.bytesAvailable) {
            this._lastSanctionTime = param1.readString();
            this._sanctionAgeHours = param1.readInteger();
        }
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get figure(): string {
        return this._figure;
    }

    public get registrationAgeInMinutes(): number {
        return this._registrationAgeInMinutes;
    }

    public get minutesSinceLastLogin(): number {
        return this._minutesSinceLastLogin;
    }

    public get online(): boolean {
        return this._online;
    }

    public get cfhCount(): number {
        return this._cfhCount;
    }

    public get abusiveCfhCount(): number {
        return this._abusiveCfhCount;
    }

    public get cautionCount(): number {
        return this._cautionCount;
    }

    public get banCount(): number {
        return this._banCount;
    }

    public get tradingLockCount(): number {
        return this._tradingLockCount;
    }

    public get tradingExpiryDate(): string {
        return this._tradingExpiryDate;
    }

    public get lastPurchaseDate(): string {
        return this._lastPurchaseDate;
    }

    public get identityId(): number {
        return this._identityId;
    }

    public get identityRelatedBanCount(): number {
        return this._identityRelatedBanCount;
    }

    public get primaryEmailAddress(): string {
        return this._primaryEmailAddress;
    }

    public get userClassification(): string {
        return this._userClassification;
    }

    public get lastSanctionTime(): string {
        return this._lastSanctionTime;
    }

    public get sanctionAgeHours(): number {
        return this._sanctionAgeHours;
    }
}
