import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6059 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6059';
import { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';

export class RewardTrack {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrack'); }

    declare private _id: string;

    declare private _theme: string;

    declare private _SafeStr_5536: number;
    static { (this.prototype as any)._SafeStr_5536 = 0; }

    declare private _hasPremiumConfig: boolean;
    static { (this.prototype as any)._hasPremiumConfig = false; }

    declare private _SafeStr_14363: number;
    static { (this.prototype as any)._SafeStr_14363 = NaN; }

    declare private _SafeStr_14364: number;
    static { (this.prototype as any)._SafeStr_14364 = 0; }

    declare private _SafeStr_14365: number;
    static { (this.prototype as any)._SafeStr_14365 = 0; }

    declare private _SafeStr_14366: number;
    static { (this.prototype as any)._SafeStr_14366 = 0; }

    declare private _SafeStr_14367: boolean;
    static { (this.prototype as any)._SafeStr_14367 = false; }

    declare private _complete: boolean;
    static { (this.prototype as any)._complete = false; }

    declare private _SafeStr_14368: boolean;
    static { (this.prototype as any)._SafeStr_14368 = false; }

    declare private _tasks: RewardTrackTask[];

    declare private _prizes: RewardTrackPrize[];

    constructor(param1: _SafeCls_6059) {
        this._id = param1.id;
        this._theme = param1.theme;
        this._SafeStr_5536 = param1.points;
        this._hasPremiumConfig = param1.hasPremiumConfig;
        this._SafeStr_14363 = param1.taskPointsBoost;
        this._SafeStr_14364 = param1.instantPoints;
        this._SafeStr_14365 = param1.costDiamonds;
        this._SafeStr_14366 = param1.costCredits;
        this._SafeStr_14367 = param1.premium;
        this._complete = param1.complete;
        this._SafeStr_14368 = param1.premiumComplete;
        this._tasks = [];
        for (const _loc2_ of param1.tasks ?? []) {
            this._tasks.push(new RewardTrackTask(this, _loc2_));
        }
        this._prizes = [];
        for (const _loc3_ of param1.prizes ?? []) {
            this._prizes.push(new RewardTrackPrize(_loc3_));
        }
        this.refreshDerivedState();
    }

    public updateProgress(param1: string, param2: number, param3: number): RewardTrackTask {
        this._SafeStr_5536 = param3;
        let _loc4_: RewardTrackTask = this.getTaskById(param1);
        if (_loc4_ != null) {
            _loc4_.progressCount = param2;
        }
        this.refreshDerivedState();
        return _loc4_;
    }

    public markPrizeClaimed(param1: string): RewardTrackPrize {
        let _loc2_: RewardTrackPrize = this.getPrizeById(param1);
        if (_loc2_ != null) {
            _loc2_.claimed = true;
        }
        this.refreshDerivedState();
        return _loc2_;
    }

    public markPremiumPurchased(param1: number): void {
        this._SafeStr_14367 = true;
        this._SafeStr_5536 = param1;
        this.refreshDerivedState();
    }

    public refreshDerivedState(): void {
        let _loc3_: any;
        for (_loc3_ of this._prizes ?? []) {
            _loc3_.refreshAvailability(this);
        }
        let _loc2_: boolean = true;
        let _loc1_: boolean = true;
        for (_loc3_ of this._prizes ?? []) {
            if (!_loc3_.premium && !_loc3_.claimed) {
                _loc2_ = false;
            }
            if (_loc3_.premium && !_loc3_.claimed) {
                _loc1_ = false;
            }
        }
        this._complete = _loc2_;
        this._SafeStr_14368 = !this._hasPremiumConfig || _loc2_ && _loc1_;
    }

    public getTaskById(param1: string): RewardTrackTask {
        for (const _loc2_ of this._tasks ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getPrizeById(param1: string): RewardTrackPrize {
        for (const _loc2_ of this._prizes ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public get completedTaskCount(): number {
        let _loc2_: number = 0;
        for (const _loc1_ of this._tasks ?? []) {
            if (_loc1_.isComplete) {
                _loc2_ += 1;
            }
        }
        return _loc2_;
    }

    public get totalTaskCount(): number {
        return this._tasks.length | 0;
    }

    public get claimedPrizeCount(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._prizes ?? []) {
            if (_loc2_.claimed) {
                _loc1_ += 1;
            }
        }
        return _loc1_;
    }

    public get totalPrizeCount(): number {
        return this._prizes.length | 0;
    }

    public get hasPremiumPrizes(): boolean {
        for (const _loc1_ of this._prizes ?? []) {
            if (_loc1_.premium) {
                return true;
            }
        }
        return false;
    }

    public get hasPremiumTasks(): boolean {
        for (const _loc1_ of this._tasks ?? []) {
            if (_loc1_.premium) {
                return true;
            }
        }
        return false;
    }

    public get hasPremiumLevels(): boolean {
        for (const _loc1_ of this._tasks ?? []) {
            if (_loc1_.hasPremiumLevels) {
                return true;
            }
        }
        return false;
    }

    public get id(): string {
        return this._id;
    }

    public get theme(): string {
        return this._theme;
    }

    public get points(): number {
        return this._SafeStr_5536;
    }

    public get hasPremiumConfig(): boolean {
        return this._hasPremiumConfig;
    }

    public get taskPointsBoost(): number {
        return this._SafeStr_14363;
    }

    public get instantPoints(): number {
        return this._SafeStr_14364;
    }

    public get costDiamonds(): number {
        return this._SafeStr_14365;
    }

    public get costCredits(): number {
        return this._SafeStr_14366;
    }

    public get premium(): boolean {
        return this._SafeStr_14367;
    }

    public get complete(): boolean {
        return this._complete;
    }

    public get premiumComplete(): boolean {
        return this._SafeStr_14368;
    }

    public get tasks(): RewardTrackTask[] {
        return this._tasks;
    }

    public get prizes(): RewardTrackPrize[] {
        return this._prizes;
    }
}
