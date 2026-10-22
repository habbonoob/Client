import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IDailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/IDailyTasksController';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { DailyTasksActiveListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/dailytasks/DailyTasksActiveListMessageEvent';
import { DailyTasksTasksAddedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/dailytasks/DailyTasksTasksAddedMessageEvent';
import { DailyTasksTaskUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/dailytasks/DailyTasksTaskUpdateMessageEvent';
import { ClaimDailyTaskComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/dailytasks/ClaimDailyTaskComposer';
import { GetDailyTasksComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/dailytasks/GetDailyTasksComposer';
import { DailyTaskInfo } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskInfo';
import { DailyTasksActiveListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksActiveListMessageParser';
import { DailyTasksTasksAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksTasksAddedMessageParser';
import { DailyTasksTaskUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksTaskUpdateMessageParser';
import { DailyTasksView } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksView';
import { UnseenDailyTasksCountUpdateEvent } from '@/com/sulake/habbo/quest/events/UnseenDailyTasksCountUpdateEvent';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class DailyTasksController extends Component implements ILinkEventTracker, IDailyTasksController, IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks::DailyTasksController'); }

    public static readonly REQUEST_TASKS_TIMEOUT_MS: number = 10000;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _questEngine: HabboQuestEngine;

    declare private _view: DailyTasksView;

    declare private _messageEvents: IMessageEvent[];

    declare private _tasks: DailyTaskInfo[];

    declare private _SafeStr_7554: DailyTaskInfo[];

    declare private _lastRequestTime: number;

    declare private _disposed_DailyTasksController: boolean;

    constructor(param1: HabboQuestEngine, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._questEngine = param1;
        this._tasks = [];
        this._messageEvents = [];
        this._messageEvents.push(new DailyTasksActiveListMessageEvent(this.onActiveDailyTasks));
        this._messageEvents.push(new DailyTasksTasksAddedMessageEvent(this.onTasksAdded));
        this._messageEvents.push(new DailyTasksTaskUpdateMessageEvent(this.onTaskUpdated));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         })]);
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
    }

    public get linkPattern(): string {
        return "dailytasks/";
    }

    public linkReceived(param1: string): void {
        if (!this.isEnabled) {
            return;
        }
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.showView();
        }
    }

    public toggleView(): void {
        if (this.isShowing()) {
            this.hideView();
        } else {
            this.showView();
        }
    }

    private showView(): void {
        if (!this.isEnabled) {
            return;
        }
        if (!this.viewExists()) {
            this._view = new DailyTasksView(this, this._windowManager);
            this._view.initialize();
        }
        this._view.show();
    }

    private hideView(): void {
        if (!this.viewExists()) {
            return;
        }
        this._view.hide();
    }

    private isShowing(): boolean {
        return this.viewExists() && this._view.isShowing();
    }

    private viewExists(): boolean {
        return this._view != null && !this._view.disposed;
    }

    public get isEnabled(): boolean {
        return this.getBoolean("dailytasks.enabled");
    }

    private clearTasks(): void {
        this._tasks = [];
        if (this.viewExists()) {
            this._view.tasksCleared();
        }
    }

    private addTask(param1: DailyTaskInfo): void {
        if (this.getTaskById(param1.taskId) != null) {
            return;
        }
        if (param1.secondsLeft < 0 && param1.status == DailyTaskInfo._SafeStr_5610) {
            this._SafeStr_7554.push(param1);
        }
        this._tasks.push(param1);
        if (this.viewExists()) {
            this._view.taskAdded(param1);
        }
    }

    private updateUnseenTasks(): void {
        let _loc2_: number = 0;
        for (const _loc1_ of this._tasks ?? []) {
            if (_loc1_.status == DailyTaskInfo._SafeStr_5610) {
                _loc2_ += 1;
            }
        }
        this._questEngine.events.dispatchEvent(new UnseenDailyTasksCountUpdateEvent(_loc2_));
    }

    private updateWindowDimensions(): void {
        if (this.viewExists()) {
            this._view.taskAmountChanged();
        }
    }

    private onActiveDailyTasks(param1: DailyTasksActiveListMessageEvent): void {
        let _loc2_: any = null;
        let _loc3_: DailyTasksActiveListMessageParser = asInstanceOf(param1.getParser(), DailyTasksActiveListMessageParser);
        this.clearTasks();
        for (_loc2_ of _loc3_.tasks ?? []) {
            if (!_loc2_.isBonus) {
                this.addTask(_loc2_);
            }
        }
        for (_loc2_ of _loc3_.tasks ?? []) {
            if (_loc2_.isBonus) {
                this.addTask(_loc2_);
            }
        }
        this.updateWindowDimensions();
        this.updateUnseenTasks();
    }

    private onTasksAdded(param1: DailyTasksTasksAddedMessageEvent): void {
        let _loc3_: DailyTasksTasksAddedMessageParser = asInstanceOf(param1.getParser(), DailyTasksTasksAddedMessageParser);
        for (const _loc2_ of _loc3_.tasks ?? []) {
            this.addTask(_loc2_);
        }
        if (_loc3_.tasks.length > 0 && _loc3_.tasks[0].isBonus) {
            this._questEngine.notifications.addItem(this._localizationManager.getLocalization("dailytasks.bonus_available"), "info", "icon_daily_tasks_png", "dailytasks/open");
        }
        this.updateWindowDimensions();
        this.updateUnseenTasks();
    }

    private onTaskUpdated(param1: DailyTasksTaskUpdateMessageEvent): void {
        let _loc4_: number = 0;
        let _loc3_: DailyTasksTaskUpdateMessageParser = asInstanceOf(param1.getParser(), DailyTasksTaskUpdateMessageParser);
        let _loc2_: DailyTaskInfo = this.getTaskById(_loc3_.taskId);
        if (_loc2_ == null) {
            this.requestTasks();
        } else {
            _loc4_ = _loc2_.status;
            _loc2_.repeats = _loc3_.repeats;
            _loc2_.status = _loc3_.status;
            if (this.viewExists()) {
                this._view.taskUpdated(_loc2_.taskId | 0);
            }
            if (_loc4_ != _loc2_.status) {
                if (_loc2_.status == DailyTaskInfo._SafeStr_5610) {
                    this._questEngine.notifications.addItem(this._localizationManager.getLocalization("dailytasks.completed.caption"), "info", "icon_daily_tasks_png", "dailytasks/open");
                } else if (_loc2_.status == DailyTaskInfo._SafeStr_7420) {
                    this._questEngine.notifications.addItem(this._localizationManager.getLocalization("dailytasks.claimed.caption"), "info", "icon_daily_tasks_png", "dailytasks/open");
                }
            }
        }
        this.updateUnseenTasks();
    }

    public getTaskById(param1: number): DailyTaskInfo {
        for (const _loc2_ of this._tasks ?? []) {
            if (_loc2_.taskId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public get tasks(): DailyTaskInfo[] {
        return this._tasks;
    }

    public requestTasks(): void {
        if (getTimer() <= this._lastRequestTime + 10000) {
            return;
        }
        this._lastRequestTime = getTimer();
        this.send(new GetDailyTasksComposer());
    }

    public claimTask(param1: number): void {
        this.send(new ClaimDailyTaskComposer(param1 | 0));
    }

    public update(param1: number): void {
        if (this.viewExists()) {
            this._view.update(param1);
        }
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get questEngine(): HabboQuestEngine {
        return this._questEngine;
    }

    public override dispose(): void {
        if (this._disposed_DailyTasksController) {
            return;
        }
        this._disposed_DailyTasksController = true;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._communicationManager = null;
        this._windowManager = null;
        this._localizationManager = null;
        super.dispose();
    }

    public override get disposed(): boolean {
        return this._disposed_DailyTasksController;
    }

    public get view(): DailyTasksView {
        return this._view;
    }

    protected override initInstanceFields(): void {
        this.onActiveDailyTasks = this.onActiveDailyTasks.bind(this);
        this.onTasksAdded = this.onTasksAdded.bind(this);
        this.onTaskUpdated = this.onTaskUpdated.bind(this);
        this._lastRequestTime = 0;
        this._disposed_DailyTasksController = false;
        super.initInstanceFields();
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
