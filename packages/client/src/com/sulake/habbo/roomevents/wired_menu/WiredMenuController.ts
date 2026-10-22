import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredPermissionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredPermissionsMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/IWiredMenuController';
import type { WiredVariablesSynchronizer } from '@/com/sulake/habbo/roomevents/WiredVariablesSynchronizer';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { AccountPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/preferences/AccountPreferencesEvent';
import { YouAreControllerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/permissions/YouAreControllerMessageEvent';
import { WiredPermissionsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredPermissionsEvent';
import { WiredGetRoomLogsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/roomlogs/WiredGetRoomLogsComposer';
import { WiredSetPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredSetPreferencesMessageComposer';
import { WiredMenuEvent } from '@/com/sulake/habbo/roomevents/events/WiredMenuEvent';
import { WiredRoomLogListController } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogListController';
import { WiredRoomLogsConfig } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogsConfig';
import { WiredMenuInspectionTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { WiredMenuSettingsTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_settings/WiredMenuSettingsTab';
import { WiredMenuOverviewTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { WiredMenuTabConfigs } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabConfigs';
import { VariableManagementDetailController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/detail/VariableManagementDetailController';
import { VariableManagementOverviewController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementOverviewController';
import { WiredMenuView } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuView';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class WiredMenuController extends Component implements ILinkEventTracker, IWiredMenuController, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu::WiredMenuController'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredPermissionsEvent(this.onWiredPermissions));
        this._messageEvents.push(new AccountPreferencesEvent(this.onAccountPreferences));
        this._messageEvents.push(new YouAreControllerMessageEvent(this.onControllerMessageEvent));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
        this._SafeStr_4760 = new VariableManagementOverviewController(param1, param2, 0, param4);
        this._SafeStr_4665 = new VariableManagementDetailController(param1, param2, 0, param4);
        this._roomLogListController = new WiredRoomLogListController(param1, param2, 0, param4);
    }

    declare private _view: WiredMenuView;

    declare private _messageEvents: IMessageEvent[];

    declare private _canModify: boolean;

    declare private _canRead: boolean;

    declare private _SafeStr_4760: VariableManagementOverviewController;

    declare private _SafeStr_4665: VariableManagementDetailController;

    declare private _roomLogListController: WiredRoomLogListController;

    declare private _wiredMenuButton: boolean;

    declare private _wiredInspectButton: boolean;

    declare private _wiredWhisperDisabled: boolean;

    declare private _showAllNotifications: boolean;

    declare private _uiStyle: string;

    declare private _disposed_WiredMenuController: boolean;

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
            }, false, [{ "type": "REE_DISPOSED", "callback": this.roomEventHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.roomSessionEventHandler }]), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
                this._avatarRenderManager = param1;
            })]);
    }

    public override get disposed(): boolean {
        return this._disposed_WiredMenuController;
    }

    declare private _communicationManager: IHabboCommunicationManager;

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    declare private _localizationManager: IHabboLocalizationManager;

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    declare private _sessionDataManager: ISessionDataManager;

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    declare private _avatarRenderManager: IAvatarRenderManager;

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _roomEngine: IRoomEngine;

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    declare private _playTestMode: boolean;

    public get playTestMode(): boolean {
        return this._playTestMode;
    }

    public get linkPattern(): string {
        return "wiredmenu/";
    }

    public get isEnabled(): boolean {
        return this.getBoolean("wired.menu.enabled");
    }

    public get hasReadPermission(): boolean {
        if (this.isRoomOwnerOrStaff()) {
            return true;
        }
        return this._canRead;
    }

    public get hasWritePermission(): boolean {
        if (this.isRoomOwnerOrStaff()) {
            return true;
        }
        return this._canModify;
    }

    public get wiredMenuButton(): boolean {
        return this._wiredMenuButton;
    }

    public set wiredMenuButton(param1: boolean) {
        this._wiredMenuButton = param1;
        this.roomEvents.events.dispatchEvent(new WiredMenuEvent("WIRED_MENU_BUTTON_PREFERENCE_CHANGED"));
    }

    public get wiredInspectButton(): boolean {
        return this._wiredInspectButton;
    }

    public set wiredInspectButton(param1: boolean) {
        this._wiredInspectButton = param1;
    }

    public get showAllNotifications(): boolean {
        return this._showAllNotifications;
    }

    public set showAllNotifications(param1: boolean) {
        this._showAllNotifications = param1;
    }

    public get uiStyle(): string {
        return this._uiStyle;
    }

    public set uiStyle(param1: string) {
        if (param1 == this._uiStyle) {
            return;
        }
        this._uiStyle = param1;
        if (this.getBoolean("wired.ui_picker_enabled")) {
            this._roomEvents.wiredCtrl.setPreferredWiredStyleByName(this._uiStyle == "" ? "illumina" : this._uiStyle);
        }
    }

    public get wiredWhisperDisabled(): boolean {
        return this._wiredWhisperDisabled;
    }

    public set wiredWhisperDisabled(param1: boolean) {
        this._wiredWhisperDisabled = param1;
        this.sendPreferences();
    }

    public get view(): WiredMenuView {
        return this._view;
    }

    public get variablesSynchronizer(): WiredVariablesSynchronizer {
        return this._roomEvents.variablesSynchronizer;
    }

    public get roomLogListController(): WiredRoomLogListController {
        return this._roomLogListController;
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
    }

    public override dispose(): void {
        if (this._disposed_WiredMenuController) {
            return;
        }
        this._disposed_WiredMenuController = true;
        if (this._SafeStr_4760) {
            this._SafeStr_4760.dispose();
            this._SafeStr_4760 = null;
        }
        if (this._SafeStr_4665) {
            this._SafeStr_4665.dispose();
            this._SafeStr_4665 = null;
        }
        if (this._roomLogListController) {
            this._roomLogListController.dispose();
            this._roomLogListController = null;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._communicationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._localizationManager = null;
        this._roomEngine = null;
        super.dispose();
    }

    public linkReceived(param1: string): void {
        if (!this.isEnabled || !this.hasReadPermission) {
            this.windowManager.alert("${wiredmenu.invalid_room.title}", "${wiredmenu.invalid_room.desc}", 0, null);
            return;
        }
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.showView();
            if (_loc2_.length >= 3) {
                this.view.selectTab(stringOrNull(_loc2_[2]));
                if (_loc2_[2] == WiredMenuTabConfigs.TAB_INSPECTION_ID) {
                    this.routeInspectionLink(param1);
                } else if (_loc2_[2] == WiredMenuTabConfigs.TAB_OVERVIEW_ID) {
                    this.routeOverviewLink(param1);
                }
            }
        }
        if (_loc2_[1] == "logs") {
            if (!this.isShowing()) {
                this.showView();
                this.view.selectTab(WiredMenuTabConfigs.TAB_MONITOR_ID);
            }
            if (this._roomLogListController.view == null || !this._roomLogListController.view.isShowing()) {
                this._roomLogListController.send(new WiredGetRoomLogsComposer(1, WiredRoomLogsConfig.PAGE_SIZE, -1, -1, ""));
            } else {
                this._roomLogListController.view.activate();
            }
        }
    }

    public routeInspectionLink(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 5) {
            return;
        }
        let _loc3_: WiredMenuInspectionTab = asInstanceOf(this.view.activeTab, WiredMenuInspectionTab);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: number = parseInt(stringOrNull(_loc2_[4])) | 0;
        if (_loc2_[3] == String(WiredInputSourcePicker._SafeStr_2178)) {
            _loc3_.inspectFurni(_loc4_, true);
        } else if (_loc2_[3] == String(WiredInputSourcePicker.USER_SOURCE)) {
            _loc3_.inspectUser(_loc4_, true);
        }
    }

    public routeOverviewLink(param1: string): void {
        let _loc3_: any[] = param1.split("/");
        if (_loc3_.length < 4) {
            return;
        }
        let _loc2_: WiredMenuOverviewTab = asInstanceOf(this.view.activeTab, WiredMenuOverviewTab);
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: string = stringOrNull(_loc3_[3]);
        _loc2_.jumpToVariableByName(_loc4_);
    }

    public toggleView(): void {
        if (this.isShowing()) {
            this.hideView();
        } else {
            this.showView();
        }
    }

    public isRoomOwnerOrStaff(): boolean {
        let _loc3_: IRoomSession = this._roomEvents.roomSession;
        if (_loc3_ == null) {
            return false;
        }
        let _loc2_: boolean = this._sessionDataManager.hasSecurity(4);
        let _loc1_: boolean = this._roomEvents.roomSession.isRoomOwner;
        return _loc2_ || _loc1_;
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

    public setPlayTestMode(param1: boolean, param2: boolean = false, param3: boolean = false): void {
        let _loc5_: string = null;
        let _loc4_: WiredMenuSettingsTab = null;
        let _loc6_: IRoomSession = this.roomEvents.roomSession;
        if (_loc6_ != null) {
            _loc6_.playTestMode = param1;
        }
        if (this._playTestMode != param1 && param2) {
            this._playTestMode = param1;
            _loc5_ = "wiredmenu.settings.preferences.notification.playtest." + (param1 ? "enabled" : "disabled");
            this.roomEvents.notifications.addItem(this.localizationManager.getLocalization(_loc5_), "info", "icon_wired_notification_png", "wiredmenu/open/settings");
            if (param3) {
                this.sendPreferences();
                if (this._view != null) {
                    _loc4_ = asInstanceOf(this._view.activeTab, WiredMenuSettingsTab);
                    if (_loc4_ == null) {
                        return;
                    }
                    _loc4_.updatePreferencesUI();
                }
            }
        }
    }

    public furniSelected(param1: number): void {
        if (!this.isEnabled || this._view == null || this._view.disposed) {
            return;
        }
        if (this._view.activeTabId == WiredMenuTabConfigs.TAB_INSPECTION_ID) {
            (asInstanceOf(this._view.activeTab, WiredMenuInspectionTab)).inspectFurni(param1);
        }
    }

    public userSelected(param1: number): void {
        if (!this.isEnabled || this._view == null || this._view.disposed) {
            return;
        }
        if (this._view.activeTabId == WiredMenuTabConfigs.TAB_INSPECTION_ID) {
            (asInstanceOf(this._view.activeTab, WiredMenuInspectionTab)).inspectUser(param1);
        }
    }

    public sendPreferences(): void {
        this.send(new WiredSetPreferencesMessageComposer(this.wiredMenuButton, this.wiredInspectButton, this.playTestMode, this.wiredWhisperDisabled, this.showAllNotifications, this.uiStyle));
    }

    public hasUIOpen(): boolean {
        return this._view != null && this._view.isShowing();
    }

    private showView(): void {
        if (!this.isEnabled || !this.hasReadPermission) {
            return;
        }
        if (!this._view || this._view.disposed) {
            this._view = new WiredMenuView(this, this._windowManager);
            this._view.initialize();
        }
        this._view.show();
    }

    private hideView(): void {
        if (!this._view || this._view.disposed) {
            return;
        }
        this._view.hide();
    }

    private isShowing(): boolean {
        return this._view != null && !this._view.disposed && this._view.isShowing();
    }

    private onWiredPermissions(param1: WiredPermissionsEvent): void {
        let _loc2_: WiredPermissionsMessageParser = param1.getParser();
        this._canModify = _loc2_.canModify;
        this._canRead = _loc2_.canRead;
        if (this._view != null && !this._view.disposed) {
            if (!this._canRead) {
                this._view.dispose();
                this._view = null;
            } else {
                this._view.permissionsUpdated();
            }
        }
        this._roomEvents.wiredChest.onPermissionsChanged();
    }

    private onAccountPreferences(param1: AccountPreferencesEvent): void {
        this._wiredMenuButton = param1.getParser().wiredMenuButton;
        this._wiredInspectButton = param1.getParser().wiredInspectButton;
        this.setPlayTestMode(param1.getParser().playTestMode);
        this._wiredWhisperDisabled = param1.getParser().wiredWhisperDisabled;
        this._showAllNotifications = param1.getParser().showAllNotifications;
        this.uiStyle = param1.getParser().wiredUiStyle;
    }

    private onControllerMessageEvent(param1: IMessageEvent): void {
        let _loc2_: IRoomSession = this.roomEvents.roomSession;
        if (_loc2_ != null && this._playTestMode) {
            this.roomEvents.notifications.addItem(this.localizationManager.getLocalization("wiredmenu.settings.preferences.notification.playtest"), "info", "icon_wired_notification_png", "wiredmenu/open/settings");
        }
    }

    private roomEventHandler(param1: RoomEngineEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        let _loc2_: any = param1.type;
        if ("REE_DISPOSED" === _loc2_) {
            if (this._view != null) {
                this._view.dispose();
                this._view = null;
            }
        }
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
        if (param1.type != "RSE_STARTED") {
            return;
        }
        param1.session.playTestMode = this._playTestMode;
    }

    protected override initInstanceFields(): void {
        this.onWiredPermissions = this.onWiredPermissions.bind(this);
        this.onAccountPreferences = this.onAccountPreferences.bind(this);
        this.onControllerMessageEvent = this.onControllerMessageEvent.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this._canModify = false;
        this._canRead = false;
        this._wiredMenuButton = false;
        this._wiredInspectButton = false;
        this._wiredWhisperDisabled = false;
        this._showAllNotifications = false;
        this._uiStyle = "illumina";
        this._disposed_WiredMenuController = false;
        this._playTestMode = false;
        super.initInstanceFields();
    }
}
