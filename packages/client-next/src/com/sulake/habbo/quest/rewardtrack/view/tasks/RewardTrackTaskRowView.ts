import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { RewardTrackTaskListView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskListView';
import type { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardTrackTaskProgressBarView } from '@/com/sulake/habbo/quest/rewardtrack/view/progress/RewardTrackTaskProgressBarView';

export class RewardTrackTaskRowView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.tasks::RewardTrackTaskRowView'); }

    declare private _controller: RewardTrackController;

    declare private _owner: RewardTrackTaskListView;

    declare private _SafeStr_14400: RewardTrackTask;

    declare private _theme: RewardTrackTheme;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3381: RewardTrackTaskProgressBarView;

    declare private _defaultBorderColor: number;
    static { (this.prototype as any)._defaultBorderColor = 0; }

    declare private _SafeStr_14409: number;
    static { (this.prototype as any)._SafeStr_14409 = 0; }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _hovered: boolean;
    static { (this.prototype as any)._hovered = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: RewardTrackController, param3: RewardTrackTaskListView, param4: RewardTrackTask, param5: RewardTrackTheme) {
        this._controller = param2;
        this._owner = param3;
        this._SafeStr_14400 = param4;
        this._theme = param5;
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_3381 = new RewardTrackTaskProgressBarView(this.loadingBar);
        this._defaultBorderColor = this.taskBorder.color;
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onMouseOver);
        this._window.addEventListener("WME_OUT", this.onMouseOut);
        this._SafeStr_14409 = this._SafeStr_14400.activeLevelIndex;
        this.initialize();
    }

    private initialize(): void {
        this.taskNameText.text = this.localize("reward_track." + this._SafeStr_14400.track.id + ".task." + this._SafeStr_14400.id + ".name");
        this.taskDescriptionText.text = this.localize("reward_track." + this._SafeStr_14400.track.id + ".task." + this._SafeStr_14400.id + ".desc");
        this.taskImage.assetUri = "reward_track_tasks_" + this._SafeStr_14400.actionType.toLowerCase();
        this.refresh(false);
    }

    public refresh(param1: boolean): void {
        let _loc2_: number = this._SafeStr_14409;
        this._SafeStr_14409 = this._SafeStr_14400.activeLevelIndex;
        this._SafeStr_3381.refreshTask(this._SafeStr_14400, param1, _loc2_);
        this.progressText.text = this._SafeStr_14400.progressCount + " / " + this._SafeStr_14400.activeLevel.requiredCount;
        this.rewardText.text = String(this._SafeStr_14400.activeLevel.pointsReward);
    }

    public setSelected(param1: boolean): void {
        if (this._selected == param1) {
            return;
        }
        this._selected = param1;
        this.refreshBorder();
    }

    public update(param1: number): void {
        this._SafeStr_3381.update(param1);
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._owner.selectTask(this._SafeStr_14400);
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.refreshBorder();
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.refreshBorder();
    };

    private refreshBorder(): void {
        if (this._selected) {
            this.taskBorder.color = this._theme.activeColor;
        } else if (this._hovered) {
            this.taskBorder.color = this._theme.lightColor;
        } else {
            this.taskBorder.color = this._defaultBorderColor;
        }
    }

    private localize(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._window.removeEventListener("WME_CLICK", this.onClick);
        this._window.removeEventListener("WME_OVER", this.onMouseOver);
        this._window.removeEventListener("WME_OUT", this.onMouseOut);
        this._SafeStr_3381.dispose();
        this._SafeStr_3381 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._owner = null;
        this._SafeStr_14400 = null;
        this._theme = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get task(): RewardTrackTask {
        return this._SafeStr_14400;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private get taskNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_name"), isITextWindow);
    }

    private get taskDescriptionText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_description"), isITextWindow);
    }

    private get taskBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("task_border"), isIBorderWindow);
    }

    private get progressText(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_progress_txt"), isITextWindow);
    }

    private get rewardText(): ITextWindow {
        return asGuarded(this._window.findChildByName("track_reward_txt"), isITextWindow);
    }

    private get taskImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("task_image"), isIStaticBitmapWrapperWindow);
    }

    private get loadingBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("loading_bar"), isIWindowContainer);
    }

    get [IDisposable](): true {
        return true;
    }
}
