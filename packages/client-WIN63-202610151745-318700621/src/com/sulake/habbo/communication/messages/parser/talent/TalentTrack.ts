import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { TalentTrackTask } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackTask';
import { TalentTrackLevel } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackLevel';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

export class TalentTrack {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrack'); }

    public static readonly STATE_LOCKED: number = 0;
    public static readonly _SafeStr_7899: number = 1;
    public static readonly _SafeStr_7880: number = 2;

    declare private _name: string;

    declare private _SafeStr_3658: number;
    static { (this.prototype as any)._SafeStr_3658 = 0; }

    declare private _levels: TalentTrackLevel[];

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): void {
        let _loc4_: number = 0;
        let _loc3_: TalentTrackLevel = null;
        this._name = param1.readString();
        this._levels = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = new TalentTrackLevel();
            _loc3_.parse(param1);
            if (_loc3_.state == 1) {
                this._SafeStr_3658 = _loc4_;
            }
            this._levels.push(_loc3_);
            _loc4_++;
        }
    }

    public findTaskByAchievementId(param1: number): TalentTrackTask {
        let _loc3_: TalentTrackTask = null;
        let _loc4_: TalentTrackTask = null;
        for (const _loc2_ of this._levels ?? []) {
            if (_loc2_.state != 0) {
                _loc3_ = _loc2_.findTaskByAchievementId(param1);
                if (_loc3_ != null) {
                    _loc4_ = _loc3_;
                }
            }
        }
        return _loc4_;
    }

    public get name(): string {
        return this._name;
    }

    public get levels(): TalentTrackLevel[] {
        return this._levels;
    }

    public get progressPerLevel(): number {
        if (this._levels.length > 0) {
            return 1 / this._levels.length;
        }
        return 0;
    }

    public get totalProgress(): number {
        let _loc1_: number = NaN;
        if (this._levels.length > 0) {
            _loc1_ = this._levels[this._SafeStr_3658].levelProgress;
            return MathUtils.clamp(this._SafeStr_3658 * this.progressPerLevel + _loc1_ * this.progressPerLevel);
        }
        return 0;
    }

    public get progressForCurrentLevel(): number {
        if (this._levels.length > 0) {
            return this._SafeStr_3658 * this.progressPerLevel;
        }
        return 0;
    }

    public removeFirstLevel(): void {
        this._levels.shift();
        this._SafeStr_3658 = Math.max(0, this._SafeStr_3658 - 1) | 0;
    }
}
