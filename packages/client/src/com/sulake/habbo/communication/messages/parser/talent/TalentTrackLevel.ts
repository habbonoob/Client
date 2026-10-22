import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { TalentTrackRewardPerk } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardPerk';
import { TalentTrackRewardProduct } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardProduct';
import { TalentTrackTask } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackTask';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

export class TalentTrackLevel {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackLevel'); }

    constructor() {
    }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    private _tasks: TalentTrackTask[] = [];
    private _rewardPerks: TalentTrackRewardPerk[] = [];
    private _rewardProducts: TalentTrackRewardProduct[] = [];

    public get level(): number {
        return this._level;
    }

    public set level(param1: number) {
        this._level = param1;
    }

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    public get tasks(): TalentTrackTask[] {
        return this._tasks;
    }

    public get rewardPerks(): TalentTrackRewardPerk[] {
        return this._rewardPerks;
    }

    public get rewardProducts(): TalentTrackRewardProduct[] {
        return this._rewardProducts;
    }

    public get rewardCount(): number {
        return this._rewardPerks.length + this._rewardProducts.length;
    }

    public get levelProgress(): number {
        let _loc2_: number = 1 / this._tasks.length;
        let _loc3_: number = 0;
        for (const _loc1_ of this._tasks ?? []) {
            if (_loc1_.state == 2) {
                _loc3_ += _loc2_;
            }
        }
        return MathUtils.clamp(_loc3_);
    }

    public parse(param1: IMessageDataWrapper): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        this._level = param1.readInteger();
        this._state = param1.readInteger();
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._tasks.push(new TalentTrackTask(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rewardPerks.push(new TalentTrackRewardPerk(param1));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rewardProducts.push(new TalentTrackRewardProduct(param1));
            _loc3_++;
        }
    }

    public findTaskByAchievementId(param1: number): TalentTrackTask {
        for (const _loc2_ of this._tasks ?? []) {
            if (_loc2_.achievementId == param1) {
                return _loc2_;
            }
        }
        return null;
    }
}
