import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { RewardTrackTaskLevel } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTaskLevel';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardTrackTaskProgressBarView } from '@/com/sulake/habbo/quest/rewardtrack/view/progress/RewardTrackTaskProgressBarView';

export class RewardTrackTaskLevelView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.tasks::RewardTrackTaskLevelView'); }

    private static readonly _SafeStr_14404: RewardTrackTaskLevelView[] = new Array<RewardTrackTaskLevelView>(0).fill(null);

    declare private _controller: RewardTrackController;

    declare private _SafeStr_14401: RewardTrackTask;

    declare private _level: RewardTrackTaskLevel;

    declare private _theme: RewardTrackTheme;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _window: IWindowContainer;

    declare private _SafeStr_3381: RewardTrackTaskProgressBarView;

    declare private _defaultBorderColor: number;
    static { (this.prototype as any)._defaultBorderColor = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_3381 = new RewardTrackTaskProgressBarView(this.loadingBar);
        this._defaultBorderColor = this.levelBorder.color;
    }

    public static create(param1: IWindowContainer, param2: RewardTrackController, param3: RewardTrackTask, param4: RewardTrackTaskLevel, param5: number, param6: RewardTrackTheme): RewardTrackTaskLevelView {
        let _loc7_: RewardTrackTaskLevelView = RewardTrackTaskLevelView._SafeStr_14404.length > 0 ? RewardTrackTaskLevelView._SafeStr_14404.pop() : new RewardTrackTaskLevelView(param1);
        _loc7_.initialize(param2, param3, param4, param5, param6);
        return _loc7_;
    }

    public initialize(param1: RewardTrackController, param2: RewardTrackTask, param3: RewardTrackTaskLevel, param4: number, param5: RewardTrackTheme): void {
        this._controller = param1;
        this._SafeStr_14401 = param2;
        this._level = param3;
        this._index = param4;
        this._theme = param5;
        this.levelNameText.text = this._controller.localizationManager.getLocalizationWithParams("reward_track.levels.level", "", "level", param4 + 1);
        this.rewardText.text = String(this._level.pointsReward);
        this.refresh(false);
    }

    public refresh(param1: boolean): void {
        let _loc2_: number = this._SafeStr_14401.progressRatioFor(this._level);
        this._SafeStr_3381.refreshRatio(_loc2_, param1);
        this.progressText.text = this._SafeStr_14401.progressCount + " / " + this._level.requiredCount;
        this.completedIcon.visible = _loc2_ >= 1;
        this.lockedIcon.visible = false;
        this.levelBorder.color = this._index == this._SafeStr_14401.activeLevelIndex ? this._theme.activeColor : this._defaultBorderColor;
    }

    public update(param1: number): void {
        this._SafeStr_3381.update(param1);
    }

    public recycle(): void {
        this._controller = null;
        this._SafeStr_14401 = null;
        this._level = null;
        this._theme = null;
        this._index = 0;
        RewardTrackTaskLevelView._SafeStr_14404.push(this);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_3381.dispose();
        this._SafeStr_3381 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._SafeStr_14401 = null;
        this._level = null;
        this._theme = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private get levelNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("level_name"), isITextWindow);
    }

    private get levelBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("level_border"), isIBorderWindow);
    }

    private get progressText(): ITextWindow {
        return asGuarded(this._window.findChildByName("level_progress_txt"), isITextWindow);
    }

    private get rewardText(): ITextWindow {
        return asGuarded(this._window.findChildByName("level_reward_txt"), isITextWindow);
    }

    private get completedIcon(): IWindow {
        return this._window.findChildByName("completed_icon");
    }

    private get lockedIcon(): IWindow {
        return this._window.findChildByName("locked_icon");
    }

    private get loadingBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("loading_bar"), isIWindowContainer);
    }

    get [IDisposable](): true {
        return true;
    }
}
