import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { AchievementCategory } from '@/com/sulake/habbo/quest/AchievementCategory';

export class AchievementCategories {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementCategories'); }

    private static readonly ACHIEVEMENT_DISABLED: number = 0;
    private static readonly ACHIEVEMENT_ENABLED: number = 1;
    private static readonly ACHIEVEMENT_ARCHIVED: number = 2;
    private static readonly ACHIEVEMENT_OFF_SEASON: number = 3;
    public static readonly ACHIEVEMENT_CATEGORY_ARCHIVED: string = "archive";
    public static readonly ACHIEVEMENT_CATEGORY_NEW: string = "new";

    constructor(param1: any[], param2: HabboQuestEngine) {
        let _loc6_: any = null;
        let _loc8_: AchievementCategory = null;
        let _loc4_: any = null;
        this._SafeStr_3425 = new Dictionary();
        this._categoryList = new Array<AchievementCategory>(0).fill(null);
        this._questEngine = param2;
        let _loc3_: AchievementCategory = new AchievementCategory("archive");
        this._SafeStr_3425.set("archive", _loc3_);
        let _loc5_: AchievementData[] = [];
        let _loc7_: string[] = this.getNewAchievementCodes();
        for (_loc4_ of param1 ?? []) {
            if (_loc4_.category != "") {
                if (_loc4_.state == 2) {
                    _loc8_ = this._SafeStr_3425.get("archive");
                } else {
                    _loc8_ = this._SafeStr_3425.get(_loc4_.category);
                }
                if (_loc8_ == null) {
                    _loc8_ = new AchievementCategory(stringOrNull(_loc4_.category));
                    this._SafeStr_3425.set(_loc4_.category, _loc8_);
                    if (_loc4_.category != "misc") {
                        this._categoryList.push(_loc8_);
                    } else {
                        _loc6_ = _loc8_;
                    }
                }
                _loc8_.add(_loc4_);
                if (this.achievementIsNew(_loc7_, _loc4_)) {
                    _loc5_.push(_loc4_);
                }
            }
        }
        if (_loc6_ != null) {
            this._categoryList.push(_loc6_);
        }
        this._categoryList.push(_loc3_);
        if (_loc5_.length > 0) {
            _loc8_ = new AchievementCategory("new");
            this._SafeStr_3425.set("new", _loc8_);
            this._categoryList.push(_loc8_);
            for (_loc4_ of _loc5_ ?? []) {
                _loc8_.add(_loc4_);
            }
        }
    }

    declare private _SafeStr_3425: Map<any, any>;

    declare private _categoryList: AchievementCategory[];

    declare private _questEngine: HabboQuestEngine;

    public get categoryList(): AchievementCategory[] {
        return this._categoryList;
    }

    public update(param1: AchievementData): void {
        if (param1 == null || param1.category == "") {
            return;
        }
        let _loc2_: AchievementCategory = this._SafeStr_3425.get(param1.category);
        if (_loc2_ != null) {
            _loc2_.update(param1);
        }
        _loc2_ = this._SafeStr_3425.get("new");
        if (_loc2_ != null) {
            _loc2_.update(param1);
        }
    }

    public getMaxProgress(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._categoryList ?? []) {
            _loc1_ += _loc2_.getMaxProgress();
        }
        return _loc1_;
    }

    public getProgress(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._categoryList ?? []) {
            _loc1_ += _loc2_.getProgress();
        }
        return _loc1_;
    }

    public getCategoryByCode(param1: string): AchievementCategory {
        for (const _loc2_ of this._categoryList ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private achievementIsNew(param1: string[], param2: AchievementData): boolean {
        let _loc4_: string = param2.badgeId;
        if (_loc4_.indexOf("ACH_") == 0) {
            _loc4_ = _loc4_.substr(4);
        }
        let _loc3_: string = "0123456789";
        while (_loc4_.length > 0 && _loc3_.indexOf(_loc4_.charAt(_loc4_.length - 1)) != -1) {
            _loc4_ = _loc4_.substr(0, _loc4_.length - 1);
        }
        return param1.indexOf(_loc4_) != -1;
    }

    private getNewAchievementCodes(): string[] {
        let _loc2_: string[] = [];
        let _loc3_: string = this._questEngine.getProperty("achievements.new");
        let _loc1_: any[] = _loc3_.split(",");
        for (const _loc4_ of _loc1_ ?? []) {
            _loc2_.push(stringOrNull(_loc4_));
        }
        return _loc2_;
    }
}
