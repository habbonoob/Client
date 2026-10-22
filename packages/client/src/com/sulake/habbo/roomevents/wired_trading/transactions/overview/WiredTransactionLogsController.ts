import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredTransactionLogList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogList';
import type { WiredTransactionLogListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogListMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ITransactionLogsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/ITransactionLogsController';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { WiredTransactionLogListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogListMessageEvent';
import { WiredMenuChestsTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_chests/TransactionPreviewTableObject.group';
import { TransactionConfig } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/TransactionConfig';
import { WiredTransactionLogsView } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/WiredTransactionLogsView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class WiredTransactionLogsController extends Component implements ITransactionLogsController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.overview::WiredTransactionLogsController'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredTransactionLogListMessageEvent(this.onLogList));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: WiredTransactionLogsView;

    declare private _logs: WiredTransactionLogList;

    declare private _disposed_WiredTransactionLogsController: boolean;

    public override get disposed(): boolean {
        return this._disposed_WiredTransactionLogsController;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionDataManager = param1;
            }), new ComponentDependency(new IIDHabboWindowManager(), this.setWindowManager), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localizationManager = param1;
            }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
                this._roomEngine = param1;
            }, false, [{ "type": "REE_DISPOSED", "callback": this.roomEventHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.roomSessionEventHandler }])]);
    }

    declare private _localizationManager: IHabboLocalizationManager;

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get logs(): WiredTransactionLogList {
        return this._logs;
    }

    public get view(): WiredTransactionLogsView {
        return this._view;
    }

    public override dispose(): void {
        if (this._disposed_WiredTransactionLogsController) {
            return;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._logs = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._roomEvents = null;
        this._disposed_WiredTransactionLogsController = true;
        super.dispose();
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

    private onLogList(param1: WiredTransactionLogListMessageEvent): void {
        let _loc2_: WiredTransactionLogListMessageParser = param1.getParser();
        if (_loc2_.logs.amount == WiredMenuChestsTab.TRANSACTIONS_PREVIEW_AMOUNT) {
            return;
        }
        if (_loc2_.logs.amount != TransactionConfig.PAGE_SIZE) {
            return;
        }
        this._logs = _loc2_.logs;
        if (this._view == null) {
            this._view = new WiredTransactionLogsView(this, this._windowManager);
        }
        this._view.displayNewPage();
        if (!this._view.isShowing()) {
            this._view.show();
        }
    }

    private setWindowManager(param1: IHabboWindowManager): void {
        this._windowManager = param1;
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
    }

    private roomEventHandler(param1: RoomEngineEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        let _loc2_: any = param1.type;
        if ("REE_DISPOSED" === _loc2_) {
            if (this._view != null) {
                this._view.hide();
            }
        }
    }

    protected override initInstanceFields(): void {
        this.onLogList = this.onLogList.bind(this);
        this.setWindowManager = this.setWindowManager.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this._disposed_WiredTransactionLogsController = false;
        super.initInstanceFields();
    }
}
