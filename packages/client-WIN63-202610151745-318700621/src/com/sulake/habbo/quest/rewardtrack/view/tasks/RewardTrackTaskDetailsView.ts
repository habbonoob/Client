import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { RewardTrackTaskLevel } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTaskLevel';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { RewardTrackTaskLevelView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskLevelView';

export class RewardTrackTaskDetailsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.tasks::RewardTrackTaskDetailsView'); }

    declare private _controller: RewardTrackController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3102: IWindowContainer;

    declare private _theme: RewardTrackTheme;

    declare private _SafeStr_14971: RewardTrackTask;

    declare private _SafeStr_14973: RewardTrackTaskLevelView[];

    declare private _hintInternalLink: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: IWindowContainer, param3: IWindowContainer, param4: RewardTrackTheme) {
        this._controller = param1;
        this._window = param2;
        this._SafeStr_3102 = param3;
        this._theme = param4;
        this._SafeStr_14973 = [];
        this.hintButton.addEventListener("WME_CLICK", this.onHintClicked);
        this.initializeStaffActions();
    }

    private initializeStaffActions(): void {
        this.taskNameRegion.interactiveCursorDisabled = !this._controller.canCopyDebugIds;
        if (this._controller.canCopyDebugIds) {
            this.taskNameRegion.addEventListener("WME_CLICK", this.onTaskNameClicked);
        }
    }

    public selectTask(param1: RewardTrackTask, param2: boolean): void {
        this._SafeStr_14971 = param1;
        this._window.visible = true;
        this.taskNameText.text = this.localize("reward_track." + this._SafeStr_14971.track.id + ".task." + this._SafeStr_14971.id + ".name");
        this.taskDescriptionText.text = this.localize("reward_track." + this._SafeStr_14971.track.id + ".task." + this._SafeStr_14971.id + ".desc");
        this.taskImage.assetUri = this._controller.getTaskIconAssetName(this._SafeStr_14971);
        this.taskHintText.text = this.localize("reward_track." + this._SafeStr_14971.track.id + ".task." + this._SafeStr_14971.id + ".hint.desc");
        let _loc3_: string = "reward_track." + this._SafeStr_14971.track.id + ".task." + this._SafeStr_14971.id + ".hint";
        this._hintInternalLink = this._controller.getProperty(_loc3_ + ".internal_link");
        this.hintButton.visible = this._hintInternalLink != "";
        this.hintButton.caption = "${" + _loc3_ + ".button_text}";
        this.rebuildLevels(param2);
        this.scrollActiveLevelIntoView();
    }

    public clear(): void {
        this._SafeStr_14971 = null;
        this._window.visible = false;
        this.levelsList.removeListItems();
        for (const _loc1_ of this._SafeStr_14973 ?? []) {
            _loc1_.recycle();
        }
        this._SafeStr_14973 = [];
    }

    public refresh(param1: boolean): void {
        for (const _loc2_ of this._SafeStr_14973 ?? []) {
            _loc2_.refresh(param1);
        }
    }

    public update(param1: number): void {
        for (const _loc2_ of this._SafeStr_14973 ?? []) {
            _loc2_.update(param1);
        }
    }

    private rebuildLevels(param1: boolean): void {
        let _loc5_: number = 0;
        let _loc4_: RewardTrackTaskLevel = null;
        let _loc2_: RewardTrackTaskLevelView = null;
        this.levelsList.removeListItems();
        for (const _loc3_ of this._SafeStr_14973 ?? []) {
            _loc3_.recycle();
        }
        this._SafeStr_14973 = [];
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_14971.levels.length) {
            _loc4_ = this._SafeStr_14971.levels[_loc5_];
            _loc2_ = RewardTrackTaskLevelView.create(this._SafeStr_3102, this._controller, this._SafeStr_14971, _loc4_, _loc5_, this._theme);
            this._SafeStr_14973.push(_loc2_);
            this.levelsList.addListItem(_loc2_.window);
            _loc2_.refresh(param1);
            _loc5_ += 1;
        }
    }

    private scrollActiveLevelIntoView(): void {
        if (this.levelsList.maxScrollV <= 0) {
            this.levelsList.scrollV = 0;
            return;
        }
        let _loc1_: RewardTrackTaskLevelView = this._SafeStr_14973[this._SafeStr_14971.activeLevelIndex];
        let _loc5_: Rectangle = this.levelsList.visibleRegion;
        let _loc2_: number = _loc1_.window.y;
        let _loc3_: number = _loc2_ + _loc1_.window.height;
        let _loc4_: number = _loc5_.y | 0;
        if (_loc2_ < _loc5_.y) {
            _loc4_ = _loc2_;
        } else if (_loc3_ > _loc5_.bottom) {
            _loc4_ = _loc3_ - _loc5_.height | 0;
        }
        if (_loc4_ != _loc5_.y) {
            this.levelsList.scrollV = _loc4_ / this.levelsList.maxScrollV;
        }
    }

    private onHintClicked = (param1: WindowMouseEvent): void => {
        if (this._hintInternalLink == "") {
            return;
        }
        this._controller.context.createLinkEvent(this._hintInternalLink);
    };

    private onTaskNameClicked = (param1: WindowMouseEvent): void => {
        this._controller.copyTaskId(this._SafeStr_14971.id);
    };

    private localize(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.hintButton.removeEventListener("WME_CLICK", this.onHintClicked);
        this.taskNameRegion.removeEventListener("WME_CLICK", this.onTaskNameClicked);
        this.levelsList.removeListItems();
        for (const _loc1_ of this._SafeStr_14973 ?? []) {
            _loc1_.recycle();
        }
        this._SafeStr_14973 = null;
        this._controller = null;
        this._window = null;
        this._SafeStr_3102 = null;
        this._theme = null;
        this._SafeStr_14971 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get taskNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_info_name"), isITextWindow);
    }

    private get taskNameRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("task_info_name_region"), isIRegionWindow);
    }

    private get taskDescriptionText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_info_description"), isITextWindow);
    }

    private get taskImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("task_info_img"), isIStaticBitmapWrapperWindow);
    }

    private get levelsList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("levels"), isIScrollableListWindow);
    }

    private get taskHintText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_hint_text"), isITextWindow);
    }

    private get hintButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("hint_redirect_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
