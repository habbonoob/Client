import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { DailyTaskInfo } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskInfo';
import type { DailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { DailyTaskView } from '@/com/sulake/habbo/quest/dailytasks/tasks/DailyTaskView';

export class UnclaimedTasksView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks::UnclaimedTasksView'); }

    constructor(param1: DailyTasksController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(param1.assets.getAssetByName("dailytasks_unclaimed_xml").content)), isIFrameWindow);
        this._taskViews = [];
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.show();
        this.hide();
        this.tasksList.autoHideScrollBar = false;
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _controller: DailyTasksController;

    declare private _window: IFrameWindow;

    declare private _taskViews: DailyTaskView[];

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get taskViews(): DailyTaskView[] {
        return this._taskViews;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get tasksList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("tasks_list"), isIScrollableListWindow);
    }

    private get mainContainer(): IItemListWindow {
        return asGuarded(this._window.findChildByName("main_cont"), isIItemListWindow);
    }

    public tasksCleared(): void {
        this.tasksList.removeListItems();
        for (const _loc1_ of this._taskViews ?? []) {
            _loc1_.dispose();
        }
        this._taskViews = [];
    }

    public taskAdded(param1: DailyTaskInfo): void {
        let _loc2_: DailyTaskView = new DailyTaskView(param1, this._controller);
        this._taskViews.push(_loc2_);
        this.tasksList.addListItem(_loc2_.window);
    }

    public taskUpdated(param1: number): void {
        let _loc2_: DailyTaskView = this.getTaskViewById(param1);
        if (_loc2_ == null) {
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

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        this._window.x = Math.max(this._window.x, 0) | 0;
        this._window.y = Math.max(this._window.y, 0) | 0;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        this._window.activate();
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        for (const _loc1_ of this._taskViews ?? []) {
            _loc1_.dispose();
        }
        this._taskViews = null;
        this.hide();
        this.closeButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._controller = null;
        this._disposed = true;
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hide();
    };

    get [IDisposable](): true {
        return true;
    }
}
