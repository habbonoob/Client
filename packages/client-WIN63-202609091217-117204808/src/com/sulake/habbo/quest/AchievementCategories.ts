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
    private static readonly ACHIEVEMENT_CONTROL_BY_WIRED: number = 4;
    public static readonly ACHIEVEMENT_CATEGORY_ARCHIVED: string = "archive";
    public static readonly ACHIEVEMENT_CATEGORY_NEW: string = "new";
    public static readonly ACHIEVEMENT_CATEGORY_WIRED_GAMES: string = "wired_games";

    declare private _SafeStr_3425: Map<any, any>;

    declare private _categoryList: AchievementCategory[];

    declare private _questEngine: HabboQuestEngine;

    constructor(param1: any[], param2: HabboQuestEngine) {
        let _loc7_: AchievementCategory = null;
        let _loc9_: AchievementCategory = null;
        let _loc5_: any = null;
        this._SafeStr_3425 = new Dictionary();
        this._categoryList = new Array<AchievementCategory>(0).fill(null);
        this._questEngine = param2;
        let _loc3_: AchievementCategory = new AchievementCategory("archive");
        this._SafeStr_3425.set("archive", _loc3_);
        let _loc4_: AchievementCategory = new AchievementCategory("wired_games");
        this._SafeStr_3425.set("wired_games", _loc4_);
        let _loc6_: AchievementData[] = [];
        let _loc8_: string[] = this.getNewAchievementCodes();
        for (_loc5_ of param1 ?? []) {
            if (_loc5_.category != "") {
                if (!(_loc5_.state == 4 && _loc5_.category != "wired_games")) {
                    if (_loc5_.state == 2) {
                        _loc9_ = this._SafeStr_3425.get("archive");
                    } else {
                        _loc9_ = this._SafeStr_3425.get(_loc5_.category);
                    }
                    if (_loc9_ == null) {
                        _loc9_ = new AchievementCategory(stringOrNull(_loc5_.category));
                        this._SafeStr_3425.set(_loc5_.category, _loc9_);
                        if (_loc5_.category != "misc") {
                            this._categoryList.push(_loc9_);
                        } else {
                            _loc7_ = _loc9_;
                        }
                    }
                    _loc9_.add(_loc5_);
                    if (this.achievementIsNew(_loc8_, _loc5_)) {
                        _loc6_.push(_loc5_);
                    }
                }
            }
        }
        if (_loc7_ != null) {
            this._categoryList.push(_loc7_);
        }
        this._categoryList.push(_loc3_);
        this._categoryList.push(_loc4_);
        if (_loc6_.length > 0) {
            _loc9_ = new AchievementCategory("new");
            this._SafeStr_3425.set("new", _loc9_);
            this._categoryList.push(_loc9_);
            for (_loc5_ of _loc6_ ?? []) {
                _loc9_.add(_loc5_);
            }
        }
    }

    private achievementIsNew(param1: string[], param2: AchievementData): boolean {
        return param1.indexOf(param2.code) != -1;
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

    public get categoryList(): AchievementCategory[] {
        return this._categoryList;
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
}
