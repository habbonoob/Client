import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';

export class AchievementCategory {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementCategory'); }

    constructor(param1: string) {
        this._code = param1;
    }

    private _achievements: AchievementData[] = new Array<AchievementData>(0).fill(null);

    declare private _code: string;

    public get code(): string {
        return this._code;
    }

    public get achievements(): AchievementData[] {
        return this._achievements;
    }

    public add(param1: AchievementData): void {
        this._achievements.push(param1);
    }

    public update(param1: AchievementData): void {
        let _loc3_: number = 0;
        let _loc2_: AchievementData = null;
        _loc3_ = 0;
        while (_loc3_ < this._achievements.length) {
            _loc2_ = this._achievements[_loc3_];
            if (_loc2_.achievementId == param1.achievementId) {
                this._achievements[_loc3_] = param1;
            }
            _loc3_++;
        }
    }

    public getProgress(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._achievements ?? []) {
            _loc1_ += _loc2_.finalLevel ? _loc2_.level : _loc2_.level - 1;
        }
        return _loc1_;
    }

    public getMaxProgress(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._achievements ?? []) {
            _loc1_ += _loc2_.levelCount;
        }
        return _loc1_;
    }

    public visibleInList(): boolean {
        return this._code != "new";
    }
}
