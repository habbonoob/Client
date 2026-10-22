import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6064 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6064';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import { RewardTrackTaskLevel } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTaskLevel';

export class RewardTrackTask {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackTask'); }

    declare private _SafeStr_5628: RewardTrack;

    declare private _id: string;

    declare private _actionType: string;

    declare private _parameter: string;

    declare private _SafeStr_14373: number;
    static { (this.prototype as any)._SafeStr_14373 = 0; }

    declare private _SafeStr_14368: boolean;
    static { (this.prototype as any)._SafeStr_14368 = false; }

    declare private _levels: RewardTrackTaskLevel[];

    constructor(param1: RewardTrack, param2: _SafeCls_6064) {
        this._SafeStr_5628 = param1;
        this._id = param2.id;
        this._actionType = param2.actionType;
        this._parameter = param2.parameter;
        this._SafeStr_14373 = param2.progressCount;
        this._SafeStr_14368 = param2.premium;
        this._levels = [];
        for (const _loc3_ of param2.taskRewards ?? []) {
            this._levels.push(new RewardTrackTaskLevel(_loc3_));
        }
    }

    public get isComplete(): boolean {
        for (const _loc1_ of this._levels ?? []) {
            if (this._SafeStr_14373 < _loc1_.requiredCount) {
                return false;
            }
        }
        return true;
    }

    public get hasProgress(): boolean {
        return this._SafeStr_14373 > 0;
    }

    public get activeLevelIndex(): number {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._levels.length) {
            if (this._SafeStr_14373 < this._levels[_loc1_].requiredCount) {
                return _loc1_;
            }
            _loc1_ += 1;
        }
        return this._levels.length - 1;
    }

    public get activeLevel(): RewardTrackTaskLevel {
        return this._levels[this.activeLevelIndex];
    }

    public progressRatioFor(param1: RewardTrackTaskLevel): number {
        if (param1.requiredCount <= 0) {
            return 1;
        }
        return Math.max(0, Math.min(1, this._SafeStr_14373 / param1.requiredCount));
    }

    public get hasPremiumLevels(): boolean {
        for (const _loc1_ of this._levels ?? []) {
            if (_loc1_.premium) {
                return true;
            }
        }
        return false;
    }

    public get track(): RewardTrack {
        return this._SafeStr_5628;
    }

    public get id(): string {
        return this._id;
    }

    public get actionType(): string {
        return this._actionType;
    }

    public get parameter(): string {
        return this._parameter;
    }

    public get progressCount(): number {
        return this._SafeStr_14373;
    }

    public set progressCount(param1: number) {
        this._SafeStr_14373 = param1;
    }

    public get premium(): boolean {
        return this._SafeStr_14368;
    }

    public get levels(): RewardTrackTaskLevel[] {
        return this._levels;
    }
}
