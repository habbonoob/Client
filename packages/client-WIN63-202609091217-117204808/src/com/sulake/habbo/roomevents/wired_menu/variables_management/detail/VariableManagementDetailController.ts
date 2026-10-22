import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredSetUserPermanentVariableResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredSetUserPermanentVariableResultMessageParser';
import type { WiredUserPermanentVariablesList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesList';
import type { WiredUserPermanentVariablesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IVariableManagementDetailController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/detail/IVariableManagementDetailController';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { WiredSetUserPermanentVariableResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/variables_management/WiredSetUserPermanentVariableResultEvent';
import { WiredUserPermanentVariablesEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesEvent';
import { VariableManagementDetailView } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/detail/VariableManagementDetailView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class VariableManagementDetailController extends Component implements IVariableManagementDetailController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.detail::VariableManagementDetailController'); }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _disposed_VariableManagementDetailController: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: VariableManagementDetailView;

    declare private _data: WiredUserPermanentVariablesList;

    declare private _variablesById: Map<any, any>;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredUserPermanentVariablesEvent(this.onGetData));
        this._messageEvents.push(new WiredSetUserPermanentVariableResultEvent(this.onGetResult));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    private onGetData(param1: WiredUserPermanentVariablesEvent): void {
        let event: WiredUserPermanentVariablesEvent = param1;
        let parser: WiredUserPermanentVariablesMessageParser = event.getParser();
        this.roomEvents.variablesSynchronizer.getAllVariables(((): any => {
             let variablesReceived: (...args: any[]) => any;
             return variablesReceived = (param1: WiredVariable[]): void => {
                this.initializeData(param1, parser.list);
            };
         })());
    }

    private initializeData(param1: WiredVariable[], param2: WiredUserPermanentVariablesList): void {
        this._data = param2;
        this._variablesById = new Dictionary();
        for (const _loc3_ of param1 ?? []) {
            this._variablesById.set(_loc3_.variableId, _loc3_);
        }
        this.dataIsReady();
    }

    private dataIsReady(): void {
        if (this._view == null) {
            this._view = new VariableManagementDetailView(this, this._windowManager);
        }
        this._view.displayNewData();
        if (!this._view.isShowing()) {
            this._view.show();
        }
    }

    private onGetResult(param1: WiredSetUserPermanentVariableResultEvent): void {
        let _loc2_: WiredSetUserPermanentVariableResultMessageParser = param1.getParser();
        let _loc3_: boolean = _loc2_.success;
        if (!_loc3_) {
            this._roomEvents.notifications.addItem("${wiredmenu.variable_management_detail.notification.modification_failed}", "wired");
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
         }), new ComponentDependency(new IIDHabboWindowManager(), this.setWindowManager), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
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
        let _loc2_: string = param1.type;
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

    public get data(): WiredUserPermanentVariablesList {
        return this._data;
    }

    public get view(): VariableManagementDetailView {
        return this._view;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public get variablesById(): Map<any, any> {
        return this._variablesById;
    }

    public override get disposed(): boolean {
        return this._disposed_VariableManagementDetailController;
    }

    public override dispose(): void {
        if (this._disposed_VariableManagementDetailController) {
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
        this._data = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._roomEvents = null;
        this._disposed_VariableManagementDetailController = true;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onGetData = this.onGetData.bind(this);
        this.onGetResult = this.onGetResult.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this.setWindowManager = this.setWindowManager.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this._disposed_VariableManagementDetailController = false;
        this._variablesById = new Dictionary();
        super.initInstanceFields();
    }
}
