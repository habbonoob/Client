import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { RewardTrackTaskDetailsView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskDetailsView';
import type { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardTrackTaskFilterButtonView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskFilterButtonView';
import { RewardTrackTaskRowView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskRowView';

export class RewardTrackTaskListView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.tasks::RewardTrackTaskListView'); }

    declare private _controller: RewardTrackController;

    declare private _window: IWindowContainer;

    declare private _taskTemplate: IWindowContainer;

    declare private _SafeStr_14404: RewardTrackTaskDetailsView;

    declare private _SafeStr_5628: RewardTrack;

    declare private _theme: RewardTrackTheme;

    private _filter: number = 0;

    declare private _SafeStr_14405: RewardTrackTaskFilterButtonView[];

    declare private _SafeStr_14406: RewardTrackTaskRowView[];

    declare private _SafeStr_14407: RewardTrackTask;

    declare private _SafeStr_14408: boolean;
    static { (this.prototype as any)._SafeStr_14408 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: IWindowContainer, param3: IWindowContainer, param4: RewardTrackTaskDetailsView, param5: RewardTrack, param6: RewardTrackTheme) {
        this._controller = param1;
        this._window = param2;
        this._taskTemplate = param3;
        this._SafeStr_14404 = param4;
        this._SafeStr_5628 = param5;
        this._theme = param6;
        this._SafeStr_14405 = [];
        this._SafeStr_14406 = [];
        this.getPremiumButton.addEventListener("WME_CLICK", this.onGetPremiumClicked);
        this.initializeFilters();
        this.initializeTasks();
    }

    private initializeFilters(): void {
        let _loc1_: IRegionWindow = asGuarded(this.tabSelection.removeListItemAt(0), isIRegionWindow);
        let _loc3_: IRegionWindow = asGuarded(this.tabSelection.removeListItemAt(0), isIRegionWindow);
        let _loc2_: IRegionWindow = asGuarded(this.tabSelection.removeListItemAt(0), isIRegionWindow);
        this._SafeStr_14405.push(new RewardTrackTaskFilterButtonView(_loc1_, 0, "reward_track.tasks.tab.all_tasks", this, this._theme));
        this._SafeStr_14405.push(new RewardTrackTaskFilterButtonView(_loc3_, 1, "reward_track.tasks.tab.in_progress", this, this._theme));
        this._SafeStr_14405.push(new RewardTrackTaskFilterButtonView(_loc2_, 2, "reward_track.tasks.tab.completed", this, this._theme));
        for (const _loc4_ of this._SafeStr_14405 ?? []) {
            this.tabSelection.addListItem(_loc4_.window);
        }
        this.refreshFilterButtons();
    }

    private initializeTasks(): void {
        for (const _loc1_ of this._SafeStr_5628.tasks ?? []) {
            this._SafeStr_14406.push(new RewardTrackTaskRowView(this._taskTemplate, this._controller, this, _loc1_, this._theme));
        }
        this.applyFilter();
        this.refresh(false);
    }

    public setFilter(param1: number): void {
        if (this._filter == param1) {
            return;
        }
        this._filter = param1;
        this.refreshFilterButtons();
        this.applyFilter();
    }

    public selectTask(param1: RewardTrackTask): void {
        let _loc3_: RewardTrackTaskRowView = null;
        if (this._SafeStr_14407 != null && this._SafeStr_14407 != param1) {
            _loc3_ = this.getRowView(this._SafeStr_14407);
            if (_loc3_ != null) {
                _loc3_.setSelected(false);
            }
        }
        this._SafeStr_14407 = param1;
        let _loc2_: RewardTrackTaskRowView = this.getRowView(this._SafeStr_14407);
        if (_loc2_ != null) {
            _loc2_.setSelected(true);
        }
        this._SafeStr_14404.selectTask(param1, this._SafeStr_14408);
    }

    public refresh(param1: boolean): void {
        this._SafeStr_14408 = param1;
        this.refreshTasksCompletion();
        this.refreshPremiumInfo();
        for (const _loc2_ of this._SafeStr_14406 ?? []) {
            _loc2_.refresh(param1);
        }
        if (this._SafeStr_14407 != null) {
            this._SafeStr_14404.refresh(param1);
        }
        this.applyFilter();
    }

    public taskProgressUpdated(param1: RewardTrackTask, param2: boolean, param3: boolean, param4: boolean): void {
        this._SafeStr_14408 = param4;
        let _loc5_: RewardTrackTaskRowView = this.getRowView(param1);
        if (_loc5_ != null) {
            _loc5_.refresh(param4);
        }
        if (param3 != param1.isComplete) {
            this.refreshTasksCompletion();
        }
        if (this.hasFilterMembershipChanged(param1, param2, param3)) {
            this.applyFilter();
        }
        if (this._SafeStr_14407 == param1) {
            this._SafeStr_14404.refresh(param4);
        }
    }

    public premiumUpdated(): void {
        this.refreshPremiumInfo();
    }

    public update(param1: number): void {
        for (const _loc2_ of this._SafeStr_14406 ?? []) {
            _loc2_.update(param1);
        }
        this._SafeStr_14404.update(param1);
    }

    private applyFilter(): void {
        this.tasksList.removeListItems();
        let _loc1_: RewardTrackTask = null;
        for (const _loc2_ of this._SafeStr_14406 ?? []) {
            if (this.matchesFilter(_loc2_.task)) {
                this.tasksList.addListItem(_loc2_.window);
                if (_loc1_ == null) {
                    _loc1_ = _loc2_.task;
                }
            }
        }
        if (this._SafeStr_14407 == null || !this.matchesFilter(this._SafeStr_14407)) {
            if (_loc1_ != null) {
                this.selectTask(_loc1_);
            } else {
                this.clearSelectedTask();
                this._SafeStr_14404.clear();
            }
        }
    }

    private clearSelectedTask(): void {
        let _loc1_: RewardTrackTaskRowView = null;
        if (this._SafeStr_14407 != null) {
            _loc1_ = this.getRowView(this._SafeStr_14407);
            if (_loc1_ != null) {
                _loc1_.setSelected(false);
            }
        }
        this._SafeStr_14407 = null;
    }

    private matchesFilter(param1: RewardTrackTask): boolean {
        if (this._filter == 1) {
            return param1.hasProgress && !param1.isComplete;
        }
        if (this._filter == 2) {
            return param1.isComplete;
        }
        return true;
    }

    private hasFilterMembershipChanged(param1: RewardTrackTask, param2: boolean, param3: boolean): boolean {
        if (this._filter == 1) {
            return param2 != param1.hasProgress || param3 != param1.isComplete;
        }
        if (this._filter == 2) {
            return param3 != param1.isComplete;
        }
        return false;
    }

    private getRowView(param1: RewardTrackTask): RewardTrackTaskRowView {
        for (const _loc2_ of this._SafeStr_14406 ?? []) {
            if (_loc2_.task == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private refreshTasksCompletion(): void {
        this.tasksCompletionText.text = this._controller.localizationManager.getLocalizationWithParams("reward_track.tasks.progress", "", "progress", this._SafeStr_5628.completedTaskCount, "total", this._SafeStr_5628.totalTaskCount);
    }

    private refreshPremiumInfo(): void {
        this.rewardInfo.visible = !this._SafeStr_5628.hasPremiumConfig || this._SafeStr_5628.premium;
        this.rewardInfoNotPremium.visible = this._SafeStr_5628.hasPremiumConfig && !this._SafeStr_5628.premium;
    }

    private refreshFilterButtons(): void {
        for (const _loc1_ of this._SafeStr_14405 ?? []) {
            _loc1_.setActive(_loc1_.window == this._SafeStr_14405[this._filter].window);
        }
    }

    private onGetPremiumClicked = (param1: WindowMouseEvent): void => {
        this._controller.openPremiumPurchaseConfirmation(this._SafeStr_5628);
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.getPremiumButton.removeEventListener("WME_CLICK", this.onGetPremiumClicked);
        this.tasksList.removeListItems();
        for (const _loc1_ of this._SafeStr_14406 ?? []) {
            _loc1_.dispose();
        }
        for (const _loc2_ of this._SafeStr_14405 ?? []) {
            _loc2_.dispose();
        }
        this._SafeStr_14406 = null;
        this._SafeStr_14405 = null;
        this._controller = null;
        this._window = null;
        this._taskTemplate = null;
        this._SafeStr_14404 = null;
        this._SafeStr_5628 = null;
        this._theme = null;
        this._SafeStr_14407 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get tasksCompletionText(): ITextWindow {
        return asGuarded(this._window.findChildByName("tasks_completion_txt"), isITextWindow);
    }

    private get tabSelection(): IItemListWindow {
        return asGuarded(this._window.findChildByName("tab_selection"), isIItemListWindow);
    }

    private get tasksList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("tasks"), isIScrollableListWindow);
    }

    private get rewardInfo(): IWindowContainer {
        return asGuarded(this._window.findChildByName("reward_info"), isIWindowContainer);
    }

    private get rewardInfoNotPremium(): IWindowContainer {
        return asGuarded(this._window.findChildByName("reward_info_not_premium"), isIWindowContainer);
    }

    private get getPremiumButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("get_premium_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
