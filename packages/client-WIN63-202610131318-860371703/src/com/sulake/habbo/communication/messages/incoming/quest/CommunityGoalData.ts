import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class CommunityGoalData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::CommunityGoalData'); }

    declare private _hasGoalExpired: boolean;
    static { (this.prototype as any)._hasGoalExpired = false; }

    declare private _personalContributionScore: number;
    static { (this.prototype as any)._personalContributionScore = 0; }

    declare private _personalContributionRank: number;
    static { (this.prototype as any)._personalContributionRank = 0; }

    declare private _communityTotalScore: number;
    static { (this.prototype as any)._communityTotalScore = 0; }

    declare private _communityHighestAchievedLevel: number;
    static { (this.prototype as any)._communityHighestAchievedLevel = 0; }

    declare private _scoreRemainingUntilNextLevel: number;
    static { (this.prototype as any)._scoreRemainingUntilNextLevel = 0; }

    declare private _percentCompletionTowardsNextLevel: number;
    static { (this.prototype as any)._percentCompletionTowardsNextLevel = 0; }

    declare private _goalCode: string;

    declare private _timeRemainingInSeconds: number;
    static { (this.prototype as any)._timeRemainingInSeconds = 0; }

    declare private _rewardUserLimits: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._rewardUserLimits = [];
        this._hasGoalExpired = param1.readBoolean();
        this._personalContributionScore = param1.readInteger();
        this._personalContributionRank = param1.readInteger();
        this._communityTotalScore = param1.readInteger();
        this._communityHighestAchievedLevel = param1.readInteger();
        this._scoreRemainingUntilNextLevel = param1.readInteger();
        this._percentCompletionTowardsNextLevel = param1.readInteger();
        this._goalCode = param1.readString();
        this._timeRemainingInSeconds = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rewardUserLimits.push(param1.readInteger());
            _loc3_++;
        }
    }

    public dispose(): void {
        this._rewardUserLimits = null;
    }

    public get disposed(): boolean {
        return this._rewardUserLimits == null;
    }

    public get hasGoalExpired(): boolean {
        return this._hasGoalExpired;
    }

    public get personalContributionScore(): number {
        return this._personalContributionScore;
    }

    public get personalContributionRank(): number {
        return this._personalContributionRank;
    }

    public get communityTotalScore(): number {
        return this._communityTotalScore;
    }

    public get communityHighestAchievedLevel(): number {
        return this._communityHighestAchievedLevel;
    }

    public get scoreRemainingUntilNextLevel(): number {
        return this._scoreRemainingUntilNextLevel;
    }

    public get percentCompletionTowardsNextLevel(): number {
        return this._percentCompletionTowardsNextLevel;
    }

    public get timeRemainingInSeconds(): number {
        return this._timeRemainingInSeconds;
    }

    public get rewardUserLimits(): any[] {
        return this._rewardUserLimits;
    }

    public get goalCode(): string {
        return this._goalCode;
    }

    get [IDisposable](): true {
        return true;
    }
}
