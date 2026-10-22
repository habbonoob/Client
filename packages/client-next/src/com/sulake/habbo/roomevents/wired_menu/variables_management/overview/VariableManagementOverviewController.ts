import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredUserVariablesListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesListMessageParser';
import type { WiredUserVariablesPage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesPage';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IVariableManagementOverviewController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/IVariableManagementOverviewController';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { WiredUserVariablesListEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesListEvent';
import { VariableManagementConfig } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementConfig';
import { VariableManagementOverviewView } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementOverviewView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class VariableManagementOverviewController extends Component implements IVariableManagementOverviewController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.overview::VariableManagementOverviewController'); }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _disposed_VariableManagementOverviewController: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: VariableManagementOverviewView;

    declare private _page: WiredUserVariablesPage;

    declare private _variable: WiredVariable;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredUserVariablesListEvent(this.onGetPage));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    private onGetPage(param1: WiredUserVariablesListEvent): void {
        let event: WiredUserVariablesListEvent = param1;
        let parser: WiredUserVariablesListMessageParser = event.getParser();
        if (parser.page.amount != VariableManagementConfig.PAGE_SIZE) {
            return;
        }
        this.roomEvents.variablesSynchronizer.getAllVariables(((): any => {
             let variablesReceived: (...args: any[]) => any;
             return variablesReceived = (param1: WiredVariable[]): void => {
                this.initializeData(param1, parser.page);
            };
         })());
    }

    private initializeData(param1: WiredVariable[], param2: WiredUserVariablesPage): void {
        let _loc3_: WiredVariable = this.roomEvents.variablesSynchronizer.getCachedVariableById(param2.variableId);
        if (_loc3_ == null) {
            return;
        }
        this._page = param2;
        this._variable = _loc3_;
        this.dataIsReady();
    }

    private dataIsReady(): void {
        if (this._view == null) {
            this._view = new VariableManagementOverviewView(this, this._windowManager);
        }
        this._view.displayNewPage();
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

    public get page(): WiredUserVariablesPage {
        return this._page;
    }

    public get view(): VariableManagementOverviewView {
        return this._view;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public override get disposed(): boolean {
        return this._disposed_VariableManagementOverviewController;
    }

    public override dispose(): void {
        if (this._disposed_VariableManagementOverviewController) {
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
        this._page = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._roomEvents = null;
        this._disposed_VariableManagementOverviewController = true;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onGetPage = this.onGetPage.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this.setWindowManager = this.setWindowManager.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this._disposed_VariableManagementOverviewController = false;
        super.initInstanceFields();
    }
}
