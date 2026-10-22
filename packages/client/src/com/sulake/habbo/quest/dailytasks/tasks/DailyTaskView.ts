import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { DailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksController';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DailyTaskInfo } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskInfo';
import { DailyTaskRewardView } from '@/com/sulake/habbo/quest/dailytasks/tasks/DailyTaskRewardView';
import { ProgressBar } from '@/com/sulake/habbo/quest/ProgressBar';

export class DailyTaskView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks.tasks::DailyTaskView'); }

    private static _SafeStr_7568: string = "${image.library.dailytasks.url}";

    private static BACKGROUND_GREEN: number = 13033652;
    private static _SafeStr_7496: number = 4960837;
    private static REWARD_GREEN: number = 10931858;
    private static BACKGROUND_ORANGE: number = 15916471;
    private static TITLE_ORANGE: number = 15511865;
    private static REWARD_ORANGE: number = 15714445;
    private static BACKGROUND_YELLOW: number = 15725493;
    private static _SafeStr_7528: number = 14208611;
    private static REWARD_YELLOW: number = 14804370;

    constructor(param1: DailyTaskInfo, param2: DailyTasksController) {
        let _loc4_: DailyTaskRewardView = null;
        this._dailyTask = param1;
        this._controller = param2;
        this._window = asGuarded(param2.view.taskTemplate.clone(), isIBorderWindow);
        this._SafeStr_3381 = new ProgressBar(this._controller.questEngine, this.progressBarContainer, this.progressBarContainer.width - 8, "quests.tracker.progress", true, new Point(0, 0), true);
        this._SafeStr_4502 = [];
        for (const _loc3_ of this._dailyTask.rewards ?? []) {
            _loc4_ = new DailyTaskRewardView(_loc3_, this._controller);
            this._SafeStr_4502.push(_loc4_);
            this.rewardsList.addListItem(_loc4_.window);
        }
        this.claimButton.addEventListener("WME_CLICK", this.onClaimClicked);
        this.initializeUI();
    }

    declare private _dailyTask: DailyTaskInfo;

    declare private _controller: DailyTasksController;

    declare private _SafeStr_4502: DailyTaskRewardView[];

    declare private _SafeStr_3381: ProgressBar;

    private _SafeStr_5218: boolean = false;

    declare private _window: IBorderWindow;

    public get window(): IBorderWindow {
        return this._window;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get dailyTask(): DailyTaskInfo {
        return this._dailyTask;
    }

    public get taskNameBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("task_name_cont"), isIBorderWindow);
    }

    public get rewardTitleBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("reward_title_border"), isIBorderWindow);
    }

    public get taskTitleTxt(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_title_txt"), isITextWindow);
    }

    public get taskDescTxt(): ITextWindow {
        return asGuarded(this._window.findChildByName("task_desc_txt"), isITextWindow);
    }

    public get infoHoverRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("info_hover_region"), isIRegionWindow);
    }

    public get taskImageStaticBitmap(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("task_static_bitmap"), isIStaticBitmapWrapperWindow);
    }

    public get completionContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("completion_cont"), isIWindowContainer);
    }

    public get rewardsList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("rewards_list"), isIItemListWindow);
    }

    public get claimButtonContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("claim_button_container"), isIWindowContainer);
    }

    public get claimButtonText(): ITextWindow {
        return asGuarded(this._window.findChildByName("claim_txt"), isITextWindow);
    }

    public get claimButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("claim_button"), isIButtonWindow);
    }

    public get progressBarContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("progress_bar_wrapper"), isIWindowContainer);
    }

    private get imageUrl(): string {
        return DailyTaskView._SafeStr_7568 + this._dailyTask.taskCode + this.dailyTask.imageVersion + ".png";
    }

    public updateStatusAndRepeatsUI(param1: boolean = true): void {
        if (this._dailyTask.status == DailyTaskInfo._SafeStr_5610 && Boolean(this.progressBarContainer.visible) && param1) {
            this._SafeStr_3381.refresh(this._dailyTask.requiredRepeats, this._dailyTask.requiredRepeats, this._dailyTask.taskId | 0, 0);
            this._SafeStr_5218 = true;
            return;
        }
        if (this._dailyTask.status == DailyTaskInfo._SafeStr_7314) {
            if (!this.dailyTask.isBonus) {
                this._window.color = DailyTaskView.BACKGROUND_ORANGE;
                this.rewardTitleBorder.color = DailyTaskView.REWARD_ORANGE;
                this.taskNameBorder.color = DailyTaskView.TITLE_ORANGE;
            }
            this.completionContainer.visible = false;
            this.claimButtonContainer.visible = false;
            this.progressBarContainer.visible = true;
            this._SafeStr_3381.refresh(this._dailyTask.repeats, this._dailyTask.requiredRepeats, this._dailyTask.taskId | 0, 0);
        } else {
            if (!this.dailyTask.isBonus) {
                this._window.color = DailyTaskView.BACKGROUND_GREEN;
                this.rewardTitleBorder.color = DailyTaskView.REWARD_GREEN;
                this.taskNameBorder.color = DailyTaskView._SafeStr_7496;
            }
            this.completionContainer.visible = true;
            this.claimButtonContainer.visible = true;
            if (this._dailyTask.status == DailyTaskInfo._SafeStr_7420) {
                this.claimButton.disable();
                this.claimButtonText.text = this.localize("dailytasks.claimed");
            } else {
                this.claimButton.enable();
                this.claimButtonText.text = this.localize("dailytasks.claim");
            }
            this.progressBarContainer.visible = false;
        }
    }

    public update(param1: number): void {
        if (this.progressBarContainer.visible) {
            this._SafeStr_3381.updateView(param1);
        }
        if (this._SafeStr_5218 && !this._SafeStr_3381.isUpdating) {
            this._SafeStr_5218 = false;
            this.updateStatusAndRepeatsUI(false);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.claimButton.removeEventListener("WME_CLICK", this.onClaimClicked);
        for (const _loc1_ of this._SafeStr_4502 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_4502 = null;
        this._SafeStr_3381.dispose();
        this._SafeStr_3381 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._dailyTask = null;
        this._disposed = true;
    }

    private initializeUI(): void {
        this.taskTitleTxt.text = this.localize(this._dailyTask.nameLocalizationKey);
        this.taskDescTxt.text = this.localize(this._dailyTask.descriptionLocalizationKey);
        this.infoHoverRegion.toolTipCaption = this.localize(this._dailyTask.hintLocalizationKey);
        if (this._dailyTask.isBonus) {
            this._window.color = DailyTaskView.BACKGROUND_YELLOW;
            this.rewardTitleBorder.color = DailyTaskView.REWARD_YELLOW;
            this.taskNameBorder.color = DailyTaskView._SafeStr_7528;
        }
        this.taskImageStaticBitmap.assetUri = this.imageUrl;
        this.updateStatusAndRepeatsUI();
    }

    private onClaimClicked = (param1: WindowMouseEvent): void => {
        this.claimButton.disable();
        this._controller.claimTask(this._dailyTask.taskId);
    };

    private localize(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
