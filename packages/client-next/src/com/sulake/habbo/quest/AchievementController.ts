import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';
import type { AchievementCategory } from '@/com/sulake/habbo/quest/AchievementCategory';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetAchievementsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/achievements/GetAchievementsComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { AchievementCategories } from '@/com/sulake/habbo/quest/AchievementCategories';
import { ProgressBar } from '@/com/sulake/habbo/quest/ProgressBar';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class AchievementController implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementController'); }

    private static readonly CATEGORIES_COLUMN_COUNT: number = 3;
    private static readonly CATEGORY_SPACING_X: number = 8;
    private static readonly CATEGORY_SPACING_Y: number = 5;
    private static readonly CATEGORY_SPACING_TOP: number = 6;
    private static readonly CATEGORY_ROWS_MAX: number = 3;
    private static readonly ACHIEVEMENT_ROWS_MIN: number = 2;
    private static readonly ACHIEVEMENT_ROWS_MAX: number = 4;
    private static readonly ACHIEVEMENT_COLUMNS: number = 6;
    private static readonly IN_LEVEL_PROGRESS_BAR_WIDTH: number = 180;
    private static readonly TOTAL_PROGRESS_BAR_WIDTH: number = 246;
    private static readonly _SafeStr_7742: number = 12910463;
    private static readonly _SafeStr_7724: number = 45;
    private static readonly _SafeStr_8243: number = 20;
    private static readonly ACHIEVEMENT_TOP_SPACING: number = 3;
    private static readonly IN_LEVEL_PROGRESS_BAR_LOC: Point = new Point(115, 93);
    private static readonly TOTAL_PROGRESS_BAR_LOC: Point = new Point(72, 1);

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2842: IWindowContainer;

    declare private _SafeStr_3568: IWindowContainer;

    declare private _SafeStr_2744: IWindowContainer;

    declare private _SafeStr_3787: IWindowContainer;

    declare private _SafeStr_3967: IWindowContainer;

    declare private _categories: AchievementCategories;

    declare private _category: AchievementCategory;

    declare private _achievement: AchievementData;

    declare private _SafeStr_3007: Timer;

    private _badgeImages: Map<any, any> = new Dictionary();

    declare private _SafeStr_3121: ProgressBar;

    declare private _SafeStr_3463: ProgressBar;

    private _pendingCategorySelect: string = null;

    declare private _SafeStr_4498: AchievementData;

    declare private _SafeStr_3357: Timer;

    private _badgeYPositionFixes: Map<any, any> = new Dictionary();

    declare private _SafeStr_4769: boolean;
    static { (this.prototype as any)._SafeStr_4769 = false; }

    private _SafeStr_2789: Map<any, any> = new Dictionary();

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._SafeStr_3007 = new Timer(100, 1);
        this._SafeStr_3007.addEventListener("timer", this.doBadgeRefresh);
        this._SafeStr_3357 = new Timer(2000, 1);
        this._SafeStr_3357.addEventListener("timer", this.switchIntoPendingLevel);
        this._badgeYPositionFixes.set(16, 1);
        this._badgeYPositionFixes.set(28, 6);
        this._badgeYPositionFixes.set(38, 4);
        this._badgeYPositionFixes.set(39, 3);
        this._badgeYPositionFixes.set(40, 1);
    }

    public static moveAllChildrenToColumn(param1: IWindowContainer, param2: number, param3: number): void {
        let _loc4_: number = 0;
        let _loc5_: IWindow = null;
        while (_loc4_ < param1.numChildren) {
            _loc5_ = param1.getChildAt(_loc4_);
            if (_loc5_ != null && _loc5_.visible && _loc5_.height > 0) {
                _loc5_.y = param2;
                param2 += _loc5_.height + param3;
            }
            _loc4_++;
        }
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    public dispose(): void {
        this._questEngine = null;
        this._badgeImages = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_3007) {
            this._SafeStr_3007.removeEventListener("timer", this.doBadgeRefresh);
            this._SafeStr_3007.reset();
            this._SafeStr_3007 = null;
        }
        if (this._SafeStr_3357) {
            this._SafeStr_3357.removeEventListener("timer", this.switchIntoPendingLevel);
            this._SafeStr_3357.reset();
            this._SafeStr_3357 = null;
        }
        if (this._SafeStr_3121) {
            this._SafeStr_3121.dispose();
            this._SafeStr_3121 = null;
        }
        if (this._SafeStr_3463) {
            this._SafeStr_3463.dispose();
            this._SafeStr_3463 = null;
        }
        this._SafeStr_2842 = null;
        this._SafeStr_2744 = null;
        this._SafeStr_2744 = null;
        this._SafeStr_3787 = null;
        this._SafeStr_3967 = null;
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public isVisible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public close(): void {
        this._SafeStr_2789 = new Dictionary();
        this.broadcastUnseenAchievementsCount();
        if (this._window) {
            this._window.visible = false;
        }
    }

    private broadcastUnseenAchievementsCount(): void {
        let _loc2_: number = 0;
        for (const _loc1_ of this._SafeStr_2789?.values() ?? []) {
            if (!this.isSkippedForUnseenBroadcast(stringOrNull(_loc1_.badgeId))) {
                _loc2_++;
            }
        }
    }

    public onRoomExit(): void {
        this.close();
    }

    public onToolbarClick(): void {
        if (this.isVisible()) {
            this.close();
        } else {
            this.show();
        }
    }

    public ensureAchievementsInitialized(): void {
        if (this._categories == null) {
            this._questEngine.send(new GetAchievementsComposer());
        }
    }

    public show(): void {
        if (this._categories == null) {
            this._questEngine.send(new GetAchievementsComposer());
            this._SafeStr_4769 = true;
        } else {
            this.refresh();
            this._window.visible = true;
            this._window.activate();
        }
    }

    public onAchievements(param1: any[], param2: string): void {
        if (this._categories == null) {
            this._categories = new AchievementCategories(param1, this._questEngine);
        }
        if (!this._SafeStr_4769) {
            return;
        }
        this._SafeStr_4769 = false;
        this.refresh();
        this._window.visible = true;
        this._window.activate();
        let _loc3_: string = this._pendingCategorySelect == null ? param2 : this._pendingCategorySelect;
        let _loc4_: AchievementCategory = this._categories.getCategoryByCode(_loc3_);
        if (_loc4_ != null) {
            this.pickCategory(_loc4_);
            this._pendingCategorySelect = null;
        }
    }

    public onAchievement(param1: AchievementData): void {
        let _loc2_: boolean = false;
        if (this._categories != null) {
            _loc2_ = !!(this._achievement && this._achievement.achievementId == param1.achievementId);
            if (!_loc2_ && !(this._SafeStr_2789.has(param1.achievementId))) {
                this._SafeStr_2789.set(param1.achievementId, param1);
                this.broadcastUnseenAchievementsCount();
            }
            if (_loc2_ && param1.level > this._achievement.level) {
                this._achievement.setMaxProgress();
                this._SafeStr_4498 = param1;
                this._SafeStr_3357.start();
            } else {
                this._categories.update(param1);
                if (_loc2_) {
                    this._achievement = param1;
                }
            }
            if (this._window && this._window.visible) {
                this.refresh();
            }
        }
    }

    private getCategoryUnseenCount(param1: string): number {
        let _loc3_: number = 0;
        for (const _loc2_ of this._SafeStr_2789?.values() ?? []) {
            if (_loc2_.category == param1) {
                _loc3_++;
            }
        }
        return _loc3_;
    }

    private refresh(): void {
        this.prepareWindow();
        this.refreshCategoryList();
        this.refreshCategoryListFooter();
        this.refreshAchievementsHeader();
        this.refreshAchievementList();
        this.refreshAchievementDetails();
        AchievementController.moveAllChildrenToColumn(this._window.content, 0, 4);
        this._window.height = AchievementController.getLowestPoint(this._window.content) + 45;
    }

    private refreshCategoryList(): void {
        let _loc3_: number = 0;
        let _loc4_: AchievementCategory = null;
        let _loc1_: boolean = false;
        if (this._category != null) {
            this._SafeStr_2842.visible = false;
            return;
        }
        this._SafeStr_2842.visible = true;
        let _loc2_: AchievementCategory[] = this._categories.categoryList;
        _loc3_ = 0;
        while (true) {
            if (_loc3_ < _loc2_.length) {
                _loc4_ = _loc2_[_loc3_];
                if (_loc4_.visibleInList()) {
                    this.refreshCategoryEntry(_loc3_, _loc4_);
                }
            } else {
                _loc1_ = this.refreshCategoryEntry(_loc3_, null);
                if (_loc1_) {
                    break;
                }
            }
            _loc3_++;
        }
        this._SafeStr_2842.height = AchievementController.getLowestPoint(this._SafeStr_2842);
    }

    private refreshCategoryListFooter(): void {
        if (this._category != null) {
            this._SafeStr_3967.visible = false;
            return;
        }
        this._SafeStr_3967.visible = true;
        this._SafeStr_3463.refresh(this._categories.getProgress(), this._categories.getMaxProgress(), 0, 0);
    }

    private achievementIsVisible(param1: AchievementData): boolean {
        if (this._category == null || this._category.code != "wired_games") {
            return true;
        }
        let _loc4_: string = param1.code;
        if (_loc4_.indexOf("WF_") != 0) {
            return false;
        }
        _loc4_ = _loc4_.substr(3);
        let _loc3_: string[] = this._questEngine.wired.achievementsInRoom;
        for (const _loc2_ of _loc3_ ?? []) {
            if (_loc2_ == _loc4_) {
                return true;
            }
        }
        return false;
    }

    private refreshAchievementList(): void {
        let _loc7_: number = 0;
        let _loc5_: AchievementData = null;
        let _loc3_: boolean = false;
        let _loc2_: IWindow = this._window.findChildByName("achievements_list");
        if (this._category == null) {
            _loc2_.visible = false;
            return;
        }
        _loc2_.visible = true;
        Logger.log(this._category.code + " has " + this._category.achievements.length + " achievements");
        let _loc6_: AchievementData[] = this._category.achievements;
        while (this._SafeStr_3568.numChildren > 0) {
            this._SafeStr_3568.removeChildAt(0);
        }
        let _loc4_: number = 0;
        _loc7_ = 0;
        while (true) {
            if (_loc7_ < _loc6_.length) {
                _loc5_ = _loc6_[_loc7_];
                if (this.achievementIsVisible(_loc5_)) {
                    this.refreshAchievementEntry(_loc4_, _loc5_);
                    _loc4_ += 1;
                }
            } else {
                _loc3_ = this.refreshAchievementEntry(_loc4_, null);
                _loc4_ += 1;
                if (_loc3_) {
                    break;
                }
            }
            _loc7_++;
        }
        this._SafeStr_3568.height = AchievementController.getLowestPoint(this._SafeStr_3568);
        _loc2_.height = this._SafeStr_3568.height + 1;
        this._window.findChildByName("achievements_scrollarea").height = _loc2_.height;
        let _loc1_: IWindow = this._window.findChildByName("achievements_scrollbar");
        _loc1_.visible = this.achievementsNeedScrolling;
        _loc1_.height = _loc2_.height;
    }

    private refreshAchievementsHeader(): void {
        if (this._category == null) {
            this._SafeStr_3787.visible = false;
            return;
        }
        this._SafeStr_3787.visible = true;
        this._SafeStr_3787.findChildByName("category_name_txt").caption = this._questEngine.getAchievementCategoryName(this._category.code);
        this._questEngine.localization.registerParameter("achievements.details.categoryprogress", "progress", this._category.getProgress().toString());
        this._questEngine.localization.registerParameter("achievements.details.categoryprogress", "limit", this._category.getMaxProgress().toString());
        this._questEngine.setupAchievementCategoryImage(this._SafeStr_3787, this._category, false);
    }

    private refreshAchievementDetails(): void {
        if (this._achievement == null) {
            this._SafeStr_2744.visible = false;
            return;
        }
        this._SafeStr_2744.visible = true;
        let _loc2_: string = this.getAchievedBadgeId(this._achievement);
        this._SafeStr_2744.findChildByName("achievement_name_txt").caption = this._questEngine.localization.getBadgeName(_loc2_);
        let _loc1_: string = this._questEngine.localization.getBadgeDesc(_loc2_);
        this._SafeStr_2744.findChildByName("achievement_desc_txt").caption = _loc1_ == null ? "" : _loc1_;
        this._questEngine.localization.registerParameter("achievements.details.level", "level", this._achievement.finalLevel ? this._achievement.level.toString() : (this._achievement.level - 1).toString());
        this._questEngine.localization.registerParameter("achievements.details.level", "limit", this._achievement.levelCount.toString());
        this._questEngine.refreshReward(!this._achievement.finalLevel, this._SafeStr_2744, this._achievement.levelRewardPointType, this._achievement.levelRewardPoints);
        this.refreshBadgeImageLarge(this._SafeStr_2744, this._achievement);
        this._SafeStr_3121.refresh(this._achievement.currentPoints, this._achievement.scoreLimit, this._achievement.achievementId * 10000 + this._achievement.level, this._achievement.scoreAtStartOfLevel);
        this._SafeStr_3121.visible = this._achievement.displayMethod != 1 && !this._achievement.finalLevel;
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("Achievements"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onWindowClose;
        this._window.findChildByName("back_button").procedure = this.onBack;
        this._window.center();
        this._window.y = 20;
        this._SafeStr_2842 = castGuarded(this._window.findChildByName("categories_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3787 = castGuarded(this._window.findChildByName("achievements_header_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3568 = castGuarded(this._window.findChildByName("achievements_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2744 = castGuarded(this._window.findChildByName("achievement_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3967 = castGuarded(this._window.findChildByName("categories_footer_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3121 = new ProgressBar(this._questEngine, this._SafeStr_2744, 180, "achievements.details.progress", true, AchievementController.IN_LEVEL_PROGRESS_BAR_LOC);
        this._SafeStr_3463 = new ProgressBar(this._questEngine, this._SafeStr_3967, 246, "achievements.categories.totalprogress", true, AchievementController.TOTAL_PROGRESS_BAR_LOC);
    }

    private refreshCategoryEntry(param1: number, param2: AchievementCategory): boolean {
        let _loc5_: number = 0;
        let _loc3_: IWindowContainer = castGuarded(this._SafeStr_2842.getChildByName(param1.toString()), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: number = Math.floor(param1 / 3) | 0;
        let _loc6_: boolean = _loc4_ < 3;
        if (_loc3_ == null) {
            if (param2 == null && !_loc6_) {
                return true;
            }
            _loc3_ = castGuarded(this._questEngine.getXmlWindow("AchievementCategory"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc3_.name = param1.toString();
            this._SafeStr_2842.addChild(_loc3_);
            _loc3_.findChildByName("category_region").procedure = this.onSelectCategory;
            _loc3_.x = (_loc3_.width + 8) * (param1 % 3);
            _loc3_.y = (_loc3_.height + 5) * Math.floor(param1 / 3) + 6 | 0;
        }
        _loc3_.findChildByName("category_region").id = param1;
        _loc3_.findChildByName("category_region").visible = param2 != null;
        _loc3_.findChildByName("category_bg_inact").visible = param2 == null;
        _loc3_.findChildByName("category_bg_act").visible = param2 != null;
        _loc3_.findChildByName("category_bg_act_hover").visible = false;
        _loc3_.findChildByName("header_txt").visible = param2 != null;
        _loc3_.findChildByName("completion_txt").visible = param2 != null;
        _loc3_.findChildByName("category_pic_bitmap").visible = param2 != null;
        _loc3_.findChildByName("unseen_count_border").visible = false;
        if (param2) {
            _loc3_.findChildByName("header_txt").caption = this._questEngine.getAchievementCategoryName(param2.code);
            _loc3_.findChildByName("completion_txt").caption = param2.getProgress() + "/" + param2.getMaxProgress();
            this._questEngine.setupAchievementCategoryImage(_loc3_, param2, true);
            _loc5_ = this.getCategoryUnseenCount(param2.code);
            if (_loc5_ > 0) {
                _loc3_.findChildByName("unseen_count_border").visible = true;
                _loc3_.findChildByName("unseen_count").caption = _loc5_.toString();
            }
            _loc3_.visible = true;
        } else {
            _loc3_.visible = _loc6_;
        }
        return false;
    }

    private refreshAchievementEntry(param1: number, param2: AchievementData): boolean {
        let _loc5_: number = param1 / this.achievementsColumnCount | 0;
        let _loc8_: boolean = _loc5_ < 2;
        if (param2 == null && !_loc8_) {
            return true;
        }
        let _loc3_: IWindowContainer = asGuarded(this._questEngine.getXmlWindow("Achievement"), isIWindowContainer);
        this._SafeStr_3568.addChild(_loc3_);
        _loc3_.x = (_loc3_.width + (this.achievementsNeedScrolling ? 5 : 0)) * (param1 % this.achievementsColumnCount);
        Logger.log("Refreshing " + param1 + " where count is " + this._category.achievements.length + ", row=" + _loc5_ + ", column=" + param1 % this.achievementsColumnCount);
        _loc3_.y = _loc3_.height * _loc5_ + 3;
        _loc3_.findChildByName("bg_region").procedure = this.onSelectAchievement;
        let _loc6_: IWindow = _loc3_.findChildByName("bg_region");
        _loc6_.id = param1;
        _loc6_.visible = param2 != null;
        let _loc4_: IWindow = _loc3_.findChildByName("bg_unselected_bitmap");
        let _loc7_: IWindow = _loc3_.findChildByName("bg_selected_bitmap");
        this.refreshBadgeImage(_loc3_, param2);
        _loc4_.color = (param2 != null && this._SafeStr_2789.has(param2.achievementId) ? 12910463 : 16777215) >>> 0;
        if (param2) {
            _loc4_.visible = param2 != this._achievement;
            _loc7_.visible = param2 == this._achievement;
            _loc3_.visible = true;
        } else if (_loc8_) {
            _loc7_.visible = false;
            _loc4_.visible = true;
            _loc3_.visible = true;
        } else {
            _loc3_.visible = false;
        }
        return false;
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
        }
    };

    private onSelectCategory = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = param2.id;
        Logger.log("Category index: " + _loc3_);
        if (param1.type == "WME_CLICK") {
            this.pickCategory(this._categories.categoryList[_loc3_]);
        } else if (param1.type == "WME_OUT") {
            this.refreshMouseOver(-999);
        } else if (param1.type == "WME_OVER") {
            this.refreshMouseOver(_loc3_);
        }
    };

    private pickCategory(param1: AchievementCategory): void {
        this._category = param1;
        this._achievement = this._category.achievements[0];
        Logger.log("Category: " + this._category.code);
        this.refresh();
        this._questEngine.send(new EventLogMessageComposer("Achievements", this._category.code, "Category selected"));
    }

    public selectCategoryInternalLink(param1: string): void {
        let _loc2_: AchievementCategory = this._categories != null ? this._categories.getCategoryByCode(param1) : null;
        if (_loc2_ != null) {
            this.pickCategory(_loc2_);
        } else {
            this._pendingCategorySelect = param1;
        }
    }

    private refreshMouseOver(param1: number): void {
        let _loc4_: number = 0;
        let _loc2_: boolean = false;
        let _loc3_: IWindowContainer = null;
        let _loc5_: IWindow = null;
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_2842.numChildren) {
            _loc2_ = _loc4_ == param1;
            _loc3_ = castGuarded(this._SafeStr_2842.getChildAt(_loc4_), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc3_.findChildByName("category_bg_act").visible = !_loc2_ && _loc4_ < this._categories.categoryList.length;
            _loc3_.findChildByName("category_bg_act_hover").visible = _loc2_;
            _loc5_ = _loc3_.findChildByName("hover_container");
            _loc5_.x = _loc2_ ? 0 : 1;
            _loc5_.y = _loc2_ ? 0 : 1;
            _loc4_++;
        }
    }

    private onSelectAchievement = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = param2.id;
        this._achievement = this._category.achievements[_loc3_];
        this.refresh();
        this._questEngine.send(new EventLogMessageComposer("Achievements", this._achievement.achievementId.toString(), "Achievement selected"));
    };

    private onBack = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: any[] = null;
        let _loc3_: any = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._category != null) {
            _loc4_ = [];
            for (_loc3_ of this._SafeStr_2789?.values() ?? []) {
                if (_loc3_.category != this._category.code) {
                    _loc4_.push(_loc3_);
                }
            }
            this._SafeStr_2789 = new Dictionary();
            for (_loc3_ of _loc4_ ?? []) {
                this._SafeStr_2789.set(_loc3_.achievementId, _loc3_);
            }
            this.broadcastUnseenAchievementsCount();
        }
        this._category = null;
        this._achievement = null;
        this.refresh();
    };

    private refreshBadgeImage(param1: IWindowContainer, param2: AchievementData): void {
        let _loc4_: IWidgetWindow = asGuarded(param1.findChildByName("achievement_pic_bitmap"), isIWidgetWindow);
        let _loc3_: IBadgeImageWidget = asGuarded(_loc4_.widget, isIBadgeImageWidget);
        if (param2 == null) {
            _loc4_.visible = false;
            return;
        }
        castGuarded(castGuarded(_loc4_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc3_.badgeId = this.getAchievedBadgeId(param2);
        _loc3_.greyscale = !param2.firstLevelAchieved;
        _loc4_.visible = true;
    }

    private refreshBadgeImageLarge(param1: IWindowContainer, param2: AchievementData): void {
        let _loc4_: IWidgetWindow = asGuarded(param1.findChildByName("achievement_pic_bitmap"), isIWidgetWindow);
        let _loc3_: IBadgeImageWidget = asGuarded(_loc4_.widget, isIBadgeImageWidget);
        castGuarded(castGuarded(_loc4_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc3_.badgeId = this.getAchievedBadgeId(param2);
        _loc3_.greyscale = !param2.firstLevelAchieved;
        _loc4_.visible = true;
    }

    private doBadgeRefresh = (param1: TimerEvent): void => {
        this._SafeStr_3007.reset();
        this.refresh();
    };

    private switchIntoPendingLevel = (param1: TimerEvent): void => {
        this._achievement = this._SafeStr_4498;
        this._categories.update(this._SafeStr_4498);
        this._SafeStr_4498 = null;
        this.refresh();
    };

    public onBadgeImageReady = (param1: BadgeImageReadyEvent): void => {
        if (this._window == null) {
            return;
        }
        this._badgeImages.set(param1.badgeId, param1.badgeImage);
        if (!this._SafeStr_3007.running) {
            this._SafeStr_3007.start();
        }
    };

    public update(param1: number): void {
        if (this._SafeStr_3121 != null) {
            this._SafeStr_3121.updateView(param1);
        }
        if (this._SafeStr_3463 != null) {
            this._SafeStr_3463.updateView(param1);
        }
    }

    private getAchievedBadgeId(param1: AchievementData): string {
        if (param1.levelCount == 1) {
            return param1.badgeId;
        }
        return param1.finalLevel ? param1.badgeId : this._questEngine.localization.getPreviousLevelBadgeId(param1.badgeId);
    }

    private getPositionFix(param1: number): number {
        return Number(this._badgeYPositionFixes.get(param1) ? this._badgeYPositionFixes.get(param1) : 0) | 0;
    }

    private get achievementsColumnCount(): number {
        if (this.achievementsNeedScrolling) {
            return 6 - 1;
        }
        return 6;
    }

    private get achievementsNeedScrolling(): boolean {
        return this._category != null && this._category.achievements.length > 4 * 6;
    }

    private isSkippedForUnseenBroadcast(param1: string): boolean {
        let _loc3_: boolean = false;
        let _loc4_: any[] = this._questEngine.getProperty("toolbar.unseen_notification.skipped_badge_ids").split(",");
        for (const _loc2_ of _loc4_ ?? []) {
            if (param1.search(_loc2_) != -1) {
                _loc3_ = true;
                break;
            }
        }
        return _loc3_;
    }

    public getAchievementLevel(param1: string, param2: string): number {
        let _loc4_: AchievementCategory = null;
        if (this._categories != null) {
            _loc4_ = this._categories.getCategoryByCode(param1);
            if (_loc4_ != null) {
                for (const _loc3_ of _loc4_.achievements ?? []) {
                    if (_loc3_.badgeId.indexOf(param2) == 0) {
                        return (_loc3_.finalLevel ? _loc3_.level : Math.max(0, _loc3_.level - 1)) | 0;
                    }
                }
            }
        }
        return 0;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
