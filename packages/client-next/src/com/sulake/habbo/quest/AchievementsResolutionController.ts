import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';
import type { AchievementResolutionData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementResolutionData';
import type { AchievementLevelUpData } from '@/com/sulake/habbo/communication/messages/incoming/notifications/AchievementLevelUpData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetResolutionAchievementsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/lobby/GetResolutionAchievementsMessageComposer';
import { ResetResolutionAchievementMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/lobby/ResetResolutionAchievementMessageComposer';
import { AchievementResolutionCompletedView } from '@/com/sulake/habbo/quest/AchievementResolutionCompletedView';
import { AchievementResolutionProgressView } from '@/com/sulake/habbo/quest/AchievementResolutionProgressView';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class AchievementsResolutionController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementsResolutionController'); }

    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_7763: string = "cancel_button";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly ELEM_DISABLED_INFO: string = "disabled.reason";

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IFrameWindow;

    declare private _progressView: AchievementResolutionProgressView;

    declare private _completedView: AchievementResolutionCompletedView;

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    declare private _achievements: AchievementResolutionData[];

    private _selectedAchievementId: number = -1;
    private _endTime: number = -1;

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
    }

    public dispose(): void {
        let _loc1_: IItemGridWindow = null;
        this._questEngine = null;
        if (this._window) {
            _loc1_ = asGuarded(this._window.findChildByName("achievements"), isIItemGridWindow);
            if (_loc1_) {
                _loc1_.destroyGridItems();
            }
            if (this._progressView) {
                this._progressView.dispose();
                this._progressView = null;
            }
            if (this._completedView) {
                this._completedView.dispose();
                this._completedView = null;
            }
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public onResolutionAchievements(param1: number, param2: AchievementResolutionData[], param3: number): void {
        this._stuffId = param1;
        this._achievements = param2;
        this._endTime = param3;
        if (param2.length == 0) {
            return;
        }
        this.refresh();
        this._window.visible = true;
        this._selectedAchievementId = this._achievements[0].achievementId;
        this.populateAchievementGrid();
        this.selectAchievement(this._selectedAchievementId);
    }

    public onResolutionProgress(param1: number, param2: number, param3: string, param4: number, param5: number, param6: number): void {
        if (!this._progressView) {
            this._progressView = new AchievementResolutionProgressView(this);
        }
        this._progressView.show(param1, param2, param3, param4, param5, param6);
    }

    public onResolutionCompleted(param1: string, param2: string): void {
        if (!this._completedView) {
            this._completedView = new AchievementResolutionCompletedView(this);
        }
        this._completedView.show(param2, param1);
    }

    public onLevelUp(param1: AchievementLevelUpData): void {
        if (this._progressView && this._progressView.visible && param1.type == this._progressView.achievementId) {
            this._questEngine.send(new GetResolutionAchievementsMessageComposer(this._progressView.stuffId, 0));
        }
    }

    public onAchievement(param1: AchievementData): void {
        if (this._progressView && this._progressView.visible && param1.achievementId == this._progressView.achievementId) {
            this._questEngine.send(new GetResolutionAchievementsMessageComposer(this._progressView.stuffId, 0));
        }
    }

    public resetResolution(param1: number): void {
        let title: string;
        let summary: string;
        let stuffId: number = param1;
        if (this._progressView && this._progressView.visible && stuffId == this._progressView.stuffId) {
            title = "${resolution.reset.confirmation.title}";
            summary = "${resolution.reset.confirmation.text}";
            this._questEngine.windowManager.confirm(title, summary, 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this._questEngine.send(new ResetResolutionAchievementMessageComposer(stuffId));
                    this._questEngine.send(new GetResolutionAchievementsMessageComposer(this._progressView.stuffId, 0));
                }
            });
        }
    }

    private refresh(): void {
        if (this._window == null) {
            this.prepareWindow();
        }
        let _loc1_: IWidgetWindow = castGuarded(this._window.findChildByName("countdown_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: ICountdownWidget = castGuarded(_loc1_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc2_.seconds = this._endTime;
        _loc2_.running = true;
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("AchievementsResolutions"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onWindowClose;
        this._window.center();
        this._window.visible = true;
        this.addClickListener("header_button_close");
        this.addClickListener("save_button");
        this.addClickListener("cancel_button");
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
        }
    };

    private addClickListener(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let title: string;
        let summary: string;
        let event: WindowMouseEvent = param1;
        switch (event.target.name) {
            case "header_button_close":
            case "cancel_button":
                this.close();
                break;
            case "ok_button":
                break;
            case "save_button":
                title = "${resolution.confirmation.title}";
                summary = "${resolution.confirmation.text}";
                this.close();
                this._questEngine.windowManager.confirm(title, summary, 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                   param1.dispose();
                   if (param2.type == "WE_OK") {
                       this._questEngine.send(new GetResolutionAchievementsMessageComposer(this._stuffId, this._selectedAchievementId));
                   } else {
                       this._window.visible = true;
                   }
               });
        }
    };

    public isVisible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public close(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    private populateAchievementGrid(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: IItemGridWindow = asGuarded(this._window.findChildByName("achievements"), isIItemGridWindow);
        _loc2_.destroyGridItems();
        let _loc4_: IWindow = this._questEngine.getXmlWindow("AchievementSimple");
        for (const _loc1_ of this._achievements ?? []) {
            _loc3_ = asGuarded(_loc4_.clone(), isIWindowContainer);
            _loc3_.id = _loc1_.achievementId;
            this.refreshBadgeImage(_loc3_, _loc1_);
            _loc3_.findChildByName("bg_region").procedure = this.onSelectAchievementProc;
            _loc3_.findChildByName("bg_selected_bitmap").visible = false;
            _loc2_.addGridItem(_loc3_);
        }
    }

    private hiliteGridItem(param1: number, param2: boolean): void {
        let _loc4_: IItemGridWindow = asGuarded(this._window.findChildByName("achievements"), isIItemGridWindow);
        let _loc3_: IWindowContainer = asGuarded(_loc4_.getGridItemByID(param1 >>> 0), isIWindowContainer);
        if (_loc3_) {
            _loc3_.findChildByName("bg_selected_bitmap").visible = param2;
        }
    }

    private selectAchievement(param1: number): void {
        if (this._selectedAchievementId != -1) {
            this.hiliteGridItem(this._selectedAchievementId, false);
        }
        let _loc2_: AchievementResolutionData = this.findAchievement(param1);
        if (_loc2_ == null) {
            return;
        }
        this._selectedAchievementId = param1;
        this.hiliteGridItem(this._selectedAchievementId, true);
        this._window.findChildByName("achievement.name").caption = this._questEngine.localization.getBadgeName(_loc2_.badgeId);
        this._window.findChildByName("achievement.description").caption = this._questEngine.localization.getBadgeDesc(_loc2_.badgeId);
        this._window.findChildByName("achievement.level").caption = _loc2_.level.toString();
        this._questEngine.localization.registerParameter("resolution.achievement.target.value", "level", _loc2_.requiredLevel.toString());
        this.refreshBadgeImageLarge(_loc2_);
        _loc2_.enabled ? this.enable() : this.disable(_loc2_.state);
    }

    private disable(param1: number): void {
        this._window.setVisibleChildren(false, ["save_button"]);
        this._window.setVisibleChildren(true, ["disabled.reason"]);
        this._window.findChildByName("disabled.reason").caption = "${resolution.disabled." + param1 + "}";
    }

    public enable(): void {
        this._window.setVisibleChildren(true, ["save_button"]);
        this._window.setVisibleChildren(false, ["disabled.reason"]);
    }

    private onSelectAchievementProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.selectAchievement(param2.parent.id);
    };

    private refreshBadgeImage(param1: IWindowContainer, param2: AchievementResolutionData): void {
        let _loc4_: IWidgetWindow = asGuarded(param1.findChildByName("achievement_pic_bitmap"), isIWidgetWindow);
        let _loc3_: IBadgeImageWidget = asGuarded(_loc4_.widget, isIBadgeImageWidget);
        if (param2 == null) {
            _loc4_.visible = false;
            return;
        }
        castGuarded(castGuarded(_loc4_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc3_.badgeId = param2.badgeId;
        _loc3_.greyscale = !param2.enabled;
        _loc4_.visible = true;
    }

    private refreshBadgeImageLarge(param1: AchievementResolutionData): void {
        let _loc3_: IWidgetWindow = asGuarded(this._window.findChildByName("achievement_badge"), isIWidgetWindow);
        let _loc2_: IBadgeImageWidget = asGuarded(_loc3_.widget, isIBadgeImageWidget);
        castGuarded(castGuarded(_loc3_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc2_.badgeId = param1.badgeId;
        _loc2_.greyscale = !param1.enabled;
        _loc3_.visible = true;
    }

    private findAchievement(param1: number): AchievementResolutionData {
        for (const _loc2_ of this._achievements ?? []) {
            if (_loc2_.achievementId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public get questEngine(): HabboQuestEngine {
        return this._questEngine;
    }

    get [IDisposable](): true {
        return true;
    }
}
