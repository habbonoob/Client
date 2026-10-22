import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ScrKickbackData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ScrKickbackData'); }

    declare private _currentHcStreak: number;
    static { (this.prototype as any)._currentHcStreak = 0; }

    declare private _firstSubscriptionDate: string;

    declare private _kickbackPercentage: number;
    static { (this.prototype as any)._kickbackPercentage = NaN; }

    declare private _totalCreditsMissed: number;
    static { (this.prototype as any)._totalCreditsMissed = 0; }

    declare private _totalCreditsRewarded: number;
    static { (this.prototype as any)._totalCreditsRewarded = 0; }

    declare private _totalCreditsSpent: number;
    static { (this.prototype as any)._totalCreditsSpent = 0; }

    declare private _creditRewardForStreakBonus: number;
    static { (this.prototype as any)._creditRewardForStreakBonus = 0; }

    declare private _creditRewardForMonthlySpent: number;
    static { (this.prototype as any)._creditRewardForMonthlySpent = 0; }

    declare private _timeUntilPayday: number;
    static { (this.prototype as any)._timeUntilPayday = 0; }

    constructor(param1: IMessageDataWrapper = null) {
        this._currentHcStreak = param1.readInteger();
        this._firstSubscriptionDate = param1.readString();
        this._kickbackPercentage = param1.readDouble();
        this._totalCreditsMissed = param1.readInteger();
        this._totalCreditsRewarded = param1.readInteger();
        this._totalCreditsSpent = param1.readInteger();
        this._creditRewardForStreakBonus = param1.readInteger();
        this._creditRewardForMonthlySpent = param1.readInteger();
        this._timeUntilPayday = param1.readInteger();
    }

    public get currentHcStreak(): number {
        return this._currentHcStreak;
    }

    public get firstSubscriptionDate(): string {
        return this._firstSubscriptionDate;
    }

    public get kickbackPercentage(): number {
        return this._kickbackPercentage;
    }

    public get totalCreditsMissed(): number {
        return this._totalCreditsMissed;
    }

    public get totalCreditsRewarded(): number {
        return this._totalCreditsRewarded;
    }

    public get totalCreditsSpent(): number {
        return this._totalCreditsSpent;
    }

    public get creditRewardForStreakBonus(): number {
        return this._creditRewardForStreakBonus;
    }

    public get creditRewardForMonthlySpent(): number {
        return this._creditRewardForMonthlySpent;
    }

    public get timeUntilPayday(): number {
        return this._timeUntilPayday;
    }
}
