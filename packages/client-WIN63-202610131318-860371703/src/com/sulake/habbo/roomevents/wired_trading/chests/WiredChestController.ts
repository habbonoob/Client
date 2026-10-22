import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { OpenChestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/OpenChestMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/IWiredChestController';
import type { IWiredChestParent } from '@/com/sulake/habbo/roomevents/wired_trading/chests/IWiredChestParent';
import type { IWiredChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/IWiredChestSubController';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { OpenChestMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/OpenChestMessageEvent';
import { CloseChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/CloseChestMessageComposer';
import { OpenChestAndGetContentsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/OpenChestAndGetContentsMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { CoinChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/CoinChestSubController';
import { FurniChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController.group';
import { WiredChestWrapperView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestWrapperView';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class WiredChestController extends Component implements IWiredChestController, IWiredChestParent {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests::WiredChestController'); }

    public static STATUS_CLOSED: number = 0;
    public static STATUS_OPENING: number = 1;
    public static STATUS_OPEN: number = 2;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _catalog: IHabboCatalog;

    declare private _disposed_WiredChestController: boolean;

    declare private _status: number;

    declare private _chestWrapperView: WiredChestWrapperView;

    declare private _subControllers: IWiredChestSubController[];

    declare private _requestedChestId: number;

    declare private _activeChestId: number;

    declare private _messageEvents: IMessageEvent[];

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._status = WiredChestController.STATUS_CLOSED;
        this._messageEvents = [];
        this._messageEvents.push(new OpenChestMessageEvent(this.onOpenChest));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
        this._subControllers = [];
        this._subControllers.push(new FurniChestSubController(this));
        this._subControllers.push(new CoinChestSubController(this));
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), this.setWindowManager), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REE_DISPOSED", "callback": this.roomEventHandler }, { "type": "REOE_REMOVED", "callback": this.roomObjectRemovedHandler }, { "type": "REOE_UPDATED", "callback": this.roomObjectUpdatedHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.roomSessionEventHandler }])]);
    }

    private setWindowManager(param1: IHabboWindowManager): void {
        this._windowManager = param1;
        if (param1 != null) {
            this._chestWrapperView = new WiredChestWrapperView(this, param1);
        }
    }

    private onOpenChest(param1: OpenChestMessageEvent): void {
        let _loc2_: OpenChestMessageParser = param1.getParser();
        this.open(_loc2_.chestId);
    }

    public open(param1: number): void {
        this._requestedChestId = param1;
        this._communicationManager.connection.send(new OpenChestAndGetContentsMessageComposer(param1));
    }

    public close(): void {
        this._chestWrapperView.hide();
        this.setClosedStatus();
    }

    public setClosedStatus(): void {
        if (this._activeChestId != 0) {
            this._communicationManager.connection.send(new CloseChestMessageComposer(this._activeChestId));
        }
        this._activeChestId = 0;
        this._status = WiredChestController.STATUS_CLOSED;
    }

    public setOpeningStatus(param1: number): void {
        this._requestedChestId = 0;
        this._activeChestId = param1;
        this._status = WiredChestController.STATUS_OPENING;
    }

    public setOpenStatus(param1: number, param2: IWiredChestSubController): void {
        this._requestedChestId = 0;
        this._activeChestId = param1;
        this._status = WiredChestController.STATUS_OPEN;
        let _loc4_: IRoomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, this._activeChestId, 10);
        if (_loc4_ == null || _loc4_.getModel() == null) {
            Logger.log("Tried to open chest, but it\'s not in the room");
            this._chestWrapperView.hide();
            return;
        }
        let _loc6_: number = _loc4_.getModel().getNumber("furniture_owner_id");
        let _loc5_: boolean = _loc6_ == this._roomEvents.sessionDataManager.userId;
        let _loc3_: boolean = this._roomEvents.roomSession.isRoomOwner;
        this._chestWrapperView.show(param2, _loc4_, this._activeChestId, _loc5_, _loc3_);
    }

    public get status(): number {
        return this._status;
    }

    public get chestWrapperView(): WiredChestWrapperView {
        return this._chestWrapperView;
    }

    private roomObjectRemovedHandler(param1: RoomEngineObjectEvent): void {
        let _loc2_: number = param1.objectId;
        let _loc3_: number = param1.category;
        if (_loc2_ == this._chestWrapperView.viewingChestId && this._status == WiredChestController.STATUS_OPEN && _loc3_ == 10) {
            this._chestWrapperView.hide();
        }
    }

    private roomObjectUpdatedHandler(param1: RoomEngineObjectEvent): void {
        let _loc2_: number = param1.objectId;
        let _loc3_: number = param1.category;
        if (_loc2_ == this._chestWrapperView.viewingChestId && this._status == WiredChestController.STATUS_OPEN && _loc3_ == 10) {
            this._chestWrapperView.viewingChestUpdated();
        }
    }

    public get activeChestId(): number {
        return this._activeChestId;
    }

    public get requestedChestId(): number {
        return this._requestedChestId;
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

    private roomEventHandler(param1: RoomEngineEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        let _loc2_: any = param1.type;
        if ("REE_DISPOSED" === _loc2_) {
            if (this._chestWrapperView != null) {
                this._chestWrapperView.hide();
            }
        }
    }

    public onPermissionsChanged(): void {
        if (this._chestWrapperView.isShowing() && !this._chestWrapperView.canRead && !this._chestWrapperView.isVisibleForEveryone) {
            this._chestWrapperView.hide();
        }
        if (this._chestWrapperView != null && this._chestWrapperView.isShowing()) {
            this._chestWrapperView.updateLayout();
            this._chestWrapperView.updateUI();
        }
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
    }

    private subControllerByType(param1: number): IWiredChestSubController {
        for (const _loc2_ of this._subControllers ?? []) {
            if (_loc2_.type == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public override get disposed(): boolean {
        return this._disposed_WiredChestController;
    }

    public override dispose(): void {
        if (this._disposed_WiredChestController) {
            return;
        }
        this._disposed_WiredChestController = true;
        for (const _loc1_ of this._subControllers ?? []) {
            _loc1_.dispose();
        }
        this._subControllers = null;
        for (const _loc2_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc2_);
        }
        this._messageEvents = null;
        this._requestedChestId = 0;
        this._activeChestId = 0;
        this._status = WiredChestController.STATUS_CLOSED;
        this._chestWrapperView.dispose();
        this._chestWrapperView = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._roomEvents = null;
        this._catalog = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.setWindowManager = this.setWindowManager.bind(this);
        this.onOpenChest = this.onOpenChest.bind(this);
        this.roomObjectRemovedHandler = this.roomObjectRemovedHandler.bind(this);
        this.roomObjectUpdatedHandler = this.roomObjectUpdatedHandler.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this._disposed_WiredChestController = false;
        this._status = 0;
        this._requestedChestId = 0;
        this._activeChestId = 0;
        super.initInstanceFields();
    }
}
