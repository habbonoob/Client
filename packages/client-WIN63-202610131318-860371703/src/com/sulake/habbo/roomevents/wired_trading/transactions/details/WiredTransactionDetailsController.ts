import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredTransactionDetails } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionDetails';
import type { WiredTransactionLogDetailsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogDetailsMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ITransactionDetailsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/ITransactionDetailsController';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { WiredTransactionLogDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogDetailsMessageEvent';
import { WiredTransactionDetailsView } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/WiredTransactionDetailsView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class WiredTransactionDetailsController extends Component implements ITransactionDetailsController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.details::WiredTransactionDetailsController'); }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _disposed_WiredTransactionDetailsController: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: WiredTransactionDetailsView;

    declare private _details: WiredTransactionDetails;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredTransactionLogDetailsMessageEvent(this.onTransactionDetails));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    private onTransactionDetails(param1: WiredTransactionLogDetailsMessageEvent): void {
        let _loc2_: WiredTransactionLogDetailsMessageParser = param1.getParser();
        this._details = _loc2_.details;
        if (this._view == null) {
            this._view = new WiredTransactionDetailsView(this, this._windowManager);
        }
        this._view.updateUI();
        if (!this._view.isShowing()) {
            this._view.show();
        }
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REE_DISPOSED", "callback": this.roomEventHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.roomSessionEventHandler }])]);
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
    }

    private setWindowManager(param1: IHabboWindowManager): void {
        this._windowManager = param1;
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

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get details(): WiredTransactionDetails {
        return this._details;
    }

    public get view(): WiredTransactionDetailsView {
        return this._view;
    }

    public override get disposed(): boolean {
        return this._disposed_WiredTransactionDetailsController;
    }

    public override dispose(): void {
        if (this._disposed_WiredTransactionDetailsController) {
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
        this._details = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._roomEvents = null;
        this._disposed_WiredTransactionDetailsController = true;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onTransactionDetails = this.onTransactionDetails.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this._disposed_WiredTransactionDetailsController = false;
        super.initInstanceFields();
    }
}
