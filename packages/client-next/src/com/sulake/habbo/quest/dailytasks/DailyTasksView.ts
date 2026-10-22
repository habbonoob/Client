import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { DailyTaskInfo } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskInfo';
import type { DailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DailyTaskView } from '@/com/sulake/habbo/quest/dailytasks/tasks/DailyTaskView';
import { UnclaimedTasksView } from '@/com/sulake/habbo/quest/dailytasks/UnclaimedTasksView';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class DailyTasksView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks::DailyTasksView'); }

    public static readonly _SafeStr_8141: number = 500;
    public static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _windowManager: IHabboWindowManager;

    declare private _controller: DailyTasksController;

    declare private _window: IFrameWindow;

    declare private _taskTemplate: IBorderWindow;

    declare private _rewardTemplate: IWindowContainer;

    declare private _taskViews: DailyTaskView[];

    private _lastTitleUpdateTime: number = 0;

    declare private _SafeStr_3302: UnclaimedTasksView;

    private _disposed: boolean = false;

    constructor(param1: DailyTasksController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._taskViews = [];
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("daily_tasks_xml").content), 1), isIFrameWindow);
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.unclaimedButton.addEventListener("WME_CLICK", this.onUnclaimedTasksOpen);
        this.getHCButton.addEventListener("WME_CLICK", this.onGetHcClicked);
        this._taskTemplate = asGuarded(this.tasksList.removeListItemAt(0), isIBorderWindow);
        this._rewardTemplate = asGuarded((asGuarded(this._taskTemplate.findChildByName("rewards_list"), isIItemListWindow)).removeListItemAt(0), isIWindowContainer);
        this._SafeStr_3302 = new UnclaimedTasksView(this._controller, param2);
    }

    public initialize(): void {
        for (const _loc1_ of this._controller.tasks ?? []) {
            this.taskAdded(_loc1_);
        }
        this.taskAmountChanged();
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
    }

    public isShowing(): boolean {
        return this._windowManager != null && this._window != null && this._window.parent != null;
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hide();
    };

    private onUnclaimedTasksOpen = (param1: WindowMouseEvent): void => {
        this._SafeStr_3302.show();
    };

    private onGetHcClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IHabboCatalog = this._controller.questEngine.catalog;
        if (_loc2_) {
            _loc2_.openCatalogPage("hc_membership", "NORMAL");
        }
    };

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public taskAmountChanged(): void {
        let _loc1_: boolean = this._SafeStr_3302.taskViews.length > 0;
        this.extraCont.visible = _loc1_;
        let _loc2_: number = _loc1_ ? this.extraCont.height + this.mainContainer.spacing : 0;
        this.tasksList.y = _loc2_;
        this.tasksList.height = Math.min(Math.max(this._taskViews.length, 1), 4) * (this.taskTemplate.height + this.tasksList.spacing) - this.tasksList.spacing | 0;
        this.hcInfoBar.y = _loc2_ + this.tasksList.height + this.mainContainer.spacing;
        this._window.height = 33 + _loc2_ + this.tasksList.height + this.mainContainer.spacing + this.hcInfoBar.height + this.mainContainer.spacing;
        this._window.width = this.tasksList.isScrollBarVisible ? this._window.limits.maxWidth : this._window.limits.minWidth;
        this.extraCont.width = this._window.width;
        this.hcInfoBar.width = this._window.width;
        this.setHcDoubleDuckets();
    }

    private setHcDoubleDuckets(): void {
        let _loc1_: boolean = this._controller.questEngine.sessionDataManager.hasClub;
        if (_loc1_) {
            this.hcDoubleDucketsInfoText.text = this._controller.localizationManager.getLocalization("hc.has.double_duckets.info", "You get double duckets as you are an HC member!");
        } else {
            this.hcDoubleDucketsInfoText.text = this._controller.localizationManager.getLocalization("hc.get.double_duckets.info", "Get HC membership to gain double duckets!");
        }
        this.getHCButton.visible = !_loc1_;
    }

    public tasksCleared(): void {
        this.tasksList.removeListItems();
        for (const _loc1_ of this._taskViews ?? []) {
            _loc1_.dispose();
        }
        this._taskViews = [];
        this._SafeStr_3302.tasksCleared();
    }

    public taskAdded(param1: DailyTaskInfo): void {
        if (param1.isExpired) {
            this._SafeStr_3302.taskAdded(param1);
            return;
        }
        let _loc2_: DailyTaskView = new DailyTaskView(param1, this._controller);
        this._taskViews.push(_loc2_);
        this.tasksList.addListItem(_loc2_.window);
    }

    public taskUpdated(param1: number): void {
        let _loc2_: DailyTaskView = this.getTaskViewById(param1);
        if (_loc2_ == null) {
            this._SafeStr_3302.taskUpdated(param1);
            return;
        }
        _loc2_.updateStatusAndRepeatsUI();
    }

    public getTaskViewById(param1: number): DailyTaskView {
        for (const _loc2_ of this._taskViews ?? []) {
            if (_loc2_.dailyTask.taskId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public update(param1: number): void {
        for (const _loc3_ of this._taskViews ?? []) {
            _loc3_.update(param1);
        }
        let _loc5_: number = 0;
        for (const _loc2_ of this._controller.tasks ?? []) {
            if (_loc2_.secondsLeft > _loc5_) {
                _loc5_ = _loc2_.secondsLeft;
            }
        }
        let _loc4_: boolean = getTimer() > this._lastTitleUpdateTime + 500;
        if (this.isShowing() && _loc4_) {
            if (_loc5_ > 0) {
                this._window.caption = this._controller.localizationManager.getLocalization("dailytasks.title") + " - " + this._controller.localizationManager.getLocalizationWithParams("dailytasks.refreshes", "Refresh in %time", "time", FriendlyTime.getFriendlyTime(this._controller.localizationManager, _loc5_));
            } else {
                this._window.caption = this._controller.localizationManager.getLocalization("dailytasks.title");
            }
            this._lastTitleUpdateTime = getTimer();
        }
        if (this._controller.tasks.length == 0 || _loc5_ < -5) {
            this._controller.requestTasks();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_3302.dispose();
        this._SafeStr_3302 = null;
        for (const _loc1_ of this._taskViews ?? []) {
            _loc1_.dispose();
        }
        this._taskViews = null;
        this._taskTemplate = null;
        this._rewardTemplate = null;
        this.hide();
        this.closeButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.unclaimedButton.removeEventListener("WME_CLICK", this.onUnclaimedTasksOpen);
        this.getHCButton.removeEventListener("WME_CLICK", this.onGetHcClicked);
        this._window.dispose();
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get taskTemplate(): IBorderWindow {
        return this._taskTemplate;
    }

    public get rewardTemplate(): IWindowContainer {
        return this._rewardTemplate;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get unclaimedButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("unclaimed_btn"), isIButtonWindow);
    }

    private get tasksList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("tasks_list"), isIScrollableListWindow);
    }

    private get mainContainer(): IItemListWindow {
        return asGuarded(this._window.findChildByName("main_cont"), isIItemListWindow);
    }

    private get extraCont(): IWindowContainer {
        return asGuarded(this._window.findChildByName("extra_cont"), isIWindowContainer);
    }

    private get hcInfoBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("hc_info_cont"), isIWindowContainer);
    }

    private get hcDoubleDucketsInfoText(): ITextWindow {
        return asGuarded(this._window.findChildByName("hc_info_text"), isITextWindow);
    }

    private get getHCButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("get_hc_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
