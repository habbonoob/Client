import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboConfigurationManager } from '@/com/sulake/habbo/configuration/IHabboConfigurationManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { ITransitionalMainViewCtrl } from '@/com/sulake/habbo/navigator/mainview/ITransitionalMainViewCtrl';
import type { PerksUpdatedEvent } from '@/com/sulake/habbo/session/events/PerksUpdatedEvent';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLibraryCollection, Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { CompetitionRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsData';
import { ConvertGlobalRoomIdMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/ConvertGlobalRoomIdMessageComposer';
import { ForwardToSomeRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/ForwardToSomeRoomMessageComposer';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { RemoveOwnRoomRightsRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RemoveOwnRoomRightsRoomMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { NavigatorData } from '@/com/sulake/habbo/navigator/domain/NavigatorData';
import { Tabs } from '@/com/sulake/habbo/navigator/domain/Tabs';
import { GuestRoomDoorbell } from '@/com/sulake/habbo/navigator/GuestRoomDoorbell';
import { GuestRoomPasswordInput } from '@/com/sulake/habbo/navigator/GuestRoomPasswordInput';
import { MainViewCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import { IncomingMessages } from '@/com/sulake/habbo/navigator/IncomingMessages';
import { RoomEventInfoCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomEventInfoCtrl';
import { RoomEventViewCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomEventViewCtrl';
import { RoomInfoViewCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomInfoViewCtrl';
import { OfficialRoomEntryManager } from '@/com/sulake/habbo/navigator/mainview/OfficialRoomEntryManager';
import { RaidProtectionSettingsController } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsController';
import { EnforceCategoryCtrl } from '@/com/sulake/habbo/navigator/roomsettings/EnforceCategoryCtrl';
import { RoomCreateViewCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomCreateViewCtrl';
import { RoomFilterCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomFilterCtrl';
import { RoomSettingsCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomSettingsCtrl';
import { ToolbarHoverCtrl } from '@/com/sulake/habbo/navigator/toolbar/ToolbarHoverCtrl';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboNavigator extends Component implements IHabboNavigator, IHabboTransitionalNavigator, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.navigator::HabboNavigator'); }

    declare private _communication: IHabboCommunicationManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _sessionData: ISessionDataManager;

    declare private _tracking: IHabboTracking;

    declare private _catalog: IHabboCatalog;

    declare private _habboHelp: IHabboHelp;

    declare private _avatarManager: IAvatarRenderManager;

    declare private _SafeStr_2226: MainViewCtrl;

    declare private _roomInfoViewCtrl: RoomInfoViewCtrl;

    declare private _roomCreateViewCtrl: RoomCreateViewCtrl;

    declare private _data: NavigatorData;

    declare private _tabs: Tabs;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _incomingMessages: IncomingMessages;

    declare private _toolbar: IHabboToolbar;

    declare private _roomSettingsCtrl: RoomSettingsCtrl;

    declare private _passwordInput: GuestRoomPasswordInput;

    declare private _doorbell: GuestRoomDoorbell;

    declare private _officialRoomEntryManager: OfficialRoomEntryManager;

    declare private _roomEventViewCtrl: RoomEventViewCtrl;

    declare private _roomEventInfoCtrl: RoomEventInfoCtrl;

    declare private _roomFilterCtrl: RoomFilterCtrl;

    declare private _SafeStr_3080: ToolbarHoverCtrl;

    declare private _enforceCategoryCtrl: EnforceCategoryCtrl;

    declare private _configuration: IHabboConfigurationManager;

    declare private _SafeStr_14246: RaidProtectionSettingsController;

    declare private _log: boolean;

    declare private _webRoomReportedName: string;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_3052 = new AssetLibraryCollection("NavigatorComponent");
        this._data = new NavigatorData(this);
        this._SafeStr_2226 = new MainViewCtrl(this);
        this._roomInfoViewCtrl = new RoomInfoViewCtrl(this);
        this._roomCreateViewCtrl = new RoomCreateViewCtrl(this);
        this._passwordInput = new GuestRoomPasswordInput(this);
        this._doorbell = new GuestRoomDoorbell(this);
        this._tabs = new Tabs(this);
        this._officialRoomEntryManager = new OfficialRoomEntryManager(this);
        this._roomEventViewCtrl = new RoomEventViewCtrl(this);
        this._roomEventInfoCtrl = new RoomEventInfoCtrl(this);
        this._roomFilterCtrl = new RoomFilterCtrl(this);
        this._enforceCategoryCtrl = new EnforceCategoryCtrl(this);
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get data(): NavigatorData {
        return this._data;
    }

    public get mainViewCtrl(): ITransitionalMainViewCtrl {
        return this._SafeStr_2226;
    }

    public get tabs(): Tabs {
        return this._tabs;
    }

    public get roomInfoViewCtrl(): RoomInfoViewCtrl {
        return this._roomInfoViewCtrl;
    }

    public get roomCreateViewCtrl(): RoomCreateViewCtrl {
        return this._roomCreateViewCtrl;
    }

    public get assetLibrary(): IAssetLibrary {
        return this._SafeStr_3052;
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get roomSettingsCtrl(): RoomSettingsCtrl {
        return this._roomSettingsCtrl;
    }

    public get sessionData(): ISessionDataManager {
        return this._sessionData;
    }

    public get passwordInput(): GuestRoomPasswordInput {
        return this._passwordInput;
    }

    public get doorbell(): GuestRoomDoorbell {
        return this._doorbell;
    }

    public get roomEventViewCtrl(): RoomEventViewCtrl {
        return this._roomEventViewCtrl;
    }

    public get officialRoomEntryManager(): OfficialRoomEntryManager {
        return this._officialRoomEntryManager;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get roomEventInfoCtrl(): RoomEventInfoCtrl {
        return this._roomEventInfoCtrl;
    }

    public get roomFilterCtrl(): RoomFilterCtrl {
        return this._roomFilterCtrl;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get enforceCategoryCtrl(): EnforceCategoryCtrl {
        return this._enforceCategoryCtrl;
    }

    public get raidProtectionSettingsController(): RaidProtectionSettingsController {
        return this._SafeStr_14246;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboConfigurationManager(), (param1: IHabboConfigurationManager): void => {
             this._configuration = param1;
         }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onHabboToolbarEvent }]), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, false), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionData = param1;
         }, true, [{ "type": "PUE_perks_updated", "callback": this.onPerksUpdated }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarManager = param1;
         }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._habboHelp = param1;
         }, false), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         })]);
    }

    protected override initComponent(): void {
        this._incomingMessages = new IncomingMessages(this);
        this._roomSessionManager.events.addEventListener("RSE_CREATED", this.onRoomSessionCreatedEvent);
        this._SafeStr_14246 = new RaidProtectionSettingsController(this, this._configuration);
        if (!this._sessionData.isPerkAllowed("NAVIGATOR_PHASE_TWO_2014")) {
            this.context.addLinkEventTracker(this);
        }
        let _loc1_: string = this.getProperty("navigator.default_tab");
        if (this.getInteger("new.identity", 0) > 0) {
            _loc1_ = this.getProperty("new.identity.navigator.default_tab");
        }
        this.tabs.setSelectedTab(Tabs.tabIdFromName(_loc1_, 2));
        this._roomSettingsCtrl = new RoomSettingsCtrl(this);
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("openroom", this.enterRoomWebRequest);
        }
    }

    public enterRoomWebRequest(param1: string, param2: boolean = false, param3: string = null): void {
        this._log = param2;
        this._webRoomReportedName = param3;
        this.send(new ConvertGlobalRoomIdMessageComposer(param1));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2226) {
            this._SafeStr_2226.dispose();
            this._SafeStr_2226 = null;
        }
        if (this._roomSessionManager != null) {
            this._roomSessionManager.events.removeEventListener("RSE_CREATED", this.onRoomSessionCreatedEvent);
        }
        this.context.removeLinkEventTracker(this);
        if (this._toolbar != null && this._toolbar.events != null) {
            this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
        }
        if (this._roomInfoViewCtrl) {
            this._roomInfoViewCtrl.dispose();
            this._roomInfoViewCtrl = null;
        }
        if (this._SafeStr_14246) {
            this._SafeStr_14246.dispose();
            this._SafeStr_14246 = null;
        }
        if (this._roomFilterCtrl) {
            this._roomFilterCtrl.dispose();
            this._roomFilterCtrl = null;
        }
        if (this._roomCreateViewCtrl) {
            this._roomCreateViewCtrl.dispose();
            this._roomCreateViewCtrl = null;
        }
        if (this._officialRoomEntryManager) {
            this._officialRoomEntryManager.dispose();
            this._officialRoomEntryManager = null;
        }
        if (this._roomEventViewCtrl) {
            this._roomEventViewCtrl.dispose();
            this._roomEventViewCtrl = null;
        }
        if (this._roomSettingsCtrl) {
            this._roomSettingsCtrl.dispose();
            this._roomSettingsCtrl = null;
        }
        if (this._SafeStr_3080) {
            this._SafeStr_3080.dispose();
            this._SafeStr_3080 = null;
        }
        super.dispose();
    }

    public startRoomCreation(): void {
        this._roomCreateViewCtrl.show();
    }

    public goToPrivateRoom(param1: number): void {
        this.send(new GetGuestRoomMessageComposer(param1, false, true));
    }

    public removeRoomRights(param1: number): void {
        this.send(new RemoveOwnRoomRightsRoomMessageComposer(param1));
    }

    public hasRoomRightsButIsNotOwner(param1: number): boolean {
        let _loc2_: IRoomSession = null;
        if (this._roomSessionManager) {
            _loc2_ = this._roomSessionManager.getSession(param1);
            return _loc2_.roomControllerLevel == 1 && !_loc2_.isRoomOwner;
        }
        return false;
    }

    public goToRoomNetwork(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        if (this._roomSessionManager) {
            this._roomInfoViewCtrl.close();
            _loc3_ = 0;
            if (param2 && this._data.homeRoomId > 0) {
                _loc3_ = this._data.homeRoomId;
            }
            this._roomSessionManager.gotoRoomNetwork(param1, _loc3_);
        }
    }

    public goToRoom(param1: number, param2: boolean, param3: string = "", param4: number = -1, param5: boolean = false): void {
        let _loc6_: number = 0;
        if (this._roomSessionManager) {
            Logger.log("[HabboNavigator] Go to room: " + param1);
            if (param2) {
                this._SafeStr_2226.close();
            }
            this._roomSessionManager.gotoRoom(param1, param3, "", param5);
            if (this.tabs.getSelected()) {
                _loc6_ = param4 > -1 ? param4 + 1 : 0;
                switch (this.tabs.getSelected().id - 1) {
                    case 0:
                        this.trackNavigationDataPoint("Events", "go.events", String(param1), _loc6_);
                        break;
                    case 1:
                        this.trackNavigationDataPoint(this.tabs.getSelected().tabPageDecorator.filterCategory, "go.rooms", String(param1), _loc6_);
                        break;
                    case 2:
                        this.trackNavigationDataPoint(this.tabs.getSelected().tabPageDecorator.filterCategory, "go.me", String(param1), _loc6_);
                        break;
                    case 3:
                        this.trackNavigationDataPoint(this.tabs.getSelected().tabPageDecorator.filterCategory, "go.official", String(param1), _loc6_);
                        break;
                    case 4:
                        this.trackNavigationDataPoint("Search", "go.search", String(param1), _loc6_);
                }
            }
        } else {
            Logger.log("[HabboNavigator] Room Session Manager is not initialized. Can not enter: " + param1);
        }
    }

    public goToHomeRoom(): boolean {
        if (this._data.homeRoomId < 1) {
            Logger.log("No home room set while attempting to go to home room");
            return false;
        }
        this.goToRoom(this._data.homeRoomId, true);
        return true;
    }

    public send(param1: IMessageComposer, param2: boolean = false): void {
        this._communication.connection.send(param1);
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1 + "_xml");
            _loc3_ = castTo(_loc5_, XmlAsset);
            _loc4_ = this._windowManager.buildFromXML(XML.from(_loc3_.content), param2);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboNavigator", "Failed to build window " + param1 + "_xml, " + _loc5_ + ", " + this._windowManager + "!");
            throw e;
        }
        return _loc4_;
    }

    public getText(param1: string): string {
        let _loc2_: string = this._localization.getLocalization(param1);
        if (_loc2_ == null || _loc2_ == "") {
            _loc2_ = param1;
        }
        return _loc2_;
    }

    public registerParameter(param1: string, param2: string, param3: string): string {
        return this._localization.registerParameter(param1, param2, param3);
    }

    public getButton(param1: string, param2: string, param3: (...args: any[]) => any, param4: number = 0, param5: number = 0, param6: number = 0): IBitmapWrapperWindow {
        let _loc8_: BitmapData = this.getButtonImage(param2);
        let _loc7_: IBitmapWrapperWindow = castGuarded(this._windowManager.createWindow(param1, "", 21, 0, (1 | 0x10) >>> 0, new Rectangle(param4, param5, _loc8_.width, _loc8_.height), param3, param6 >>> 0), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc7_.bitmap = _loc8_;
        _loc7_.disposesBitmap = false;
        return _loc7_;
    }

    public refreshButton(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any, param5: number, param6: string = null): void {
        if (!param6) {
            param6 = param2;
        }
        let _loc7_: IBitmapWrapperWindow = asGuarded(param1.findChildByName(param2), isIBitmapWrapperWindow);
        if (!_loc7_) {
            Logger.log("Could not locate button in navigator: " + param2);
        }
        if (!param3) {
            _loc7_.visible = false;
        } else {
            this.prepareButton(_loc7_, param6, param4, param5);
            _loc7_.visible = true;
        }
    }

    private prepareButton(param1: IBitmapWrapperWindow, param2: string, param3: (...args: any[]) => any, param4: number): void {
        param1.id = param4;
        param1.procedure = param3;
        if (param1.bitmap != null) {
            return;
        }
        param1.bitmap = this.getButtonImage(param2);
        param1.disposesBitmap = false;
        param1.width = param1.bitmap.width;
        param1.height = param1.bitmap.height;
    }

    public getButtonImage(param1: string, param2: string = "_png"): BitmapData {
        let _loc6_: any = null;
        let _loc4_: string = param1 + param2;
        let _loc7_: IAsset = this.assets.getAssetByName(_loc4_);
        let _loc5_: BitmapDataAsset = castTo(_loc7_, BitmapDataAsset);
        return castTo(_loc5_.content, BitmapData);
    }

    private onRoomSessionCreatedEvent(param1: RoomSessionEvent): void {
        if (this._roomSessionManager && this._roomInfoViewCtrl) {
            this._roomInfoViewCtrl.close();
        }
    }

    public openCatalogClubPage(param1: string): void {
        if (this._catalog == null) {
            return;
        }
        this._catalog.openClubCenter();
    }

    public openCatalogRoomAdsPage(): void {
        if (this._catalog == null) {
            return;
        }
        this._catalog.openCatalogPage("room_ad");
    }

    public openCatalogRoomAdsExtendPage(param1: string, param2: string, param3: Date, param4: number): void {
        if (this._catalog == null) {
            return;
        }
        let _loc5_: string = this._data.enteredGuestRoom.roomName;
        this._catalog.openRoomAdCatalogPageInExtendedMode("room_ad", param1, param2, _loc5_, param3, param4);
    }

    private onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            switch (param1.iconId) {
                case "HTIE_ICON_ROOMINFO":
                    this.toggleRoomInfoVisibility();
                    break;
                case "HTIE_ICON_NAVIGATOR_ME_TAB":
                    this.showOwnRooms();
                    break;
                case "HTIE_ICON_GAMES":
                    if (this.getBoolean("game.center.enabled")) {
                        this.closeNavigator();
                    }
                    break;
                case "HTIE_ICON_HOME":
                    this.goToHomeRoom();
            }
        }
    }

    public toggleRoomInfoVisibility(): void {
        if (this._roomCreateViewCtrl) {
            this._roomInfoViewCtrl.toggle();
        }
    }

    public performTagSearch(param1: string): void {
        if (this._SafeStr_2226 == null) {
            return;
        }
        if (param1.indexOf(" ") != -1) {
            param1 = "\"" + param1 + "\"";
        }
        this._SafeStr_2226.startSearch(5, 9, param1);
        this.trackNavigationDataPoint("Search", "search.tag", param1);
        this._SafeStr_2226.mainWindow.activate();
    }

    public performTextSearch(param1: string): void {
        if (this._SafeStr_2226 == null) {
            return;
        }
        this._SafeStr_2226.startSearch(5, 8, param1);
        this.trackNavigationDataPoint("Search", "search", param1);
        this._SafeStr_2226.mainWindow.activate();
        this._SafeStr_2226.searchInput.searchStr.setText(param1);
    }

    public performCompetitionRoomsSearch(param1: number, param2: number): void {
        if (this._SafeStr_2226 == null || this._data != null && this._data.isLoading()) {
            return;
        }
        this._data.competitionRoomsData = new CompetitionRoomsData(null, param1, param2);
        this._SafeStr_2226.startSearch(5, 15, "");
        this._SafeStr_2226.mainWindow.activate();
        this._SafeStr_2226.searchInput.searchStr.setText("");
    }

    public performGuildBaseSearch(): void {
        if (this._SafeStr_2226 == null) {
            return;
        }
        this._SafeStr_2226.startSearch(5, 14, "");
        this._SafeStr_2226.mainWindow.activate();
        this._SafeStr_2226.searchInput.searchStr.setText("");
    }

    public showOwnRooms(): void {
        if (this._SafeStr_2226 == null) {
            return;
        }
        this._SafeStr_2226.startSearch(3, 5);
        this._tabs.getTab(3).tabPageDecorator.tabSelected();
    }

    public showFavouriteRooms(): void {
        this.showMeTab(6);
    }

    public showHistoryRooms(): void {
        this.showMeTab(7);
    }

    public showFrequentRooms(): void {
        this.showMeTab(23);
    }

    private showMeTab(param1: number): void {
        if (this._SafeStr_2226 == null) {
            return;
        }
        this._SafeStr_2226.startSearch(3, param1);
        this._tabs.getTab(3).tabPageDecorator.setSubSelection(param1);
    }

    public trackNavigationDataPoint(param1: string, param2: string, param3: string = "", param4: number = 0): void {
        if (this._tracking) {
            this._tracking.trackEventLog("Navigation", param1, param2, param3, param4);
        }
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        if (this._tracking) {
            this._tracking.trackGoogle(param1, param2, param3);
        }
    }

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    public openNavigator(param1: Point = null): void {
    }

    public closeNavigator(): void {
        this._SafeStr_2226.close();
    }

    public goToMainView(): void {
        this._roomCreateViewCtrl.hide();
        this._roomInfoViewCtrl.close();
    }

    public get homeRoomId(): number {
        return this._data ? this._data.homeRoomId : -1;
    }

    public get webRoomReport(): boolean {
        return this._log;
    }

    public get webRoomReportedName(): string {
        return this._webRoomReportedName;
    }

    public get enteredGuestRoomData(): GuestRoomData {
        if (this._data) {
            return this._data.enteredGuestRoom;
        }
        return null;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get linkPattern(): string {
        return "navigator/";
    }

    public linkReceived(param1: string): void {
        let _loc3_: number = 0;
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "raidprotection":
                this._SafeStr_14246.openFromLink(stringOrNull(_loc2_.length == 3 ? _loc2_[2] : null));
                break;
            case "goto":
                if (_loc2_.length > 2) {
                    let _loc4_: any = _loc2_[2];
                    if ("home" !== _loc4_) {
                        _loc3_ = _loc2_[2] | 0;
                        if (_loc3_ > 0) {
                            this.goToPrivateRoom(_loc3_);
                        } else {
                            this.send(new ForwardToSomeRoomMessageComposer(stringOrNull(_loc2_[2])));
                        }
                    } else {
                        this.goToHomeRoom();
                    }
                }
                break;
            case "search":
                if (_loc2_.length > 2) {
                    this.performTextSearch(stringOrNull(_loc2_[2]));
                }
                break;
            case "tag":
                if (_loc2_.length > 2) {
                    this.performTagSearch(stringOrNull(_loc2_[2]));
                }
                break;
            case "tab":
                if (_loc2_.length > 2) {
                    this.tabs.setSelectedTab(Tabs.tabIdFromName(stringOrNull(_loc2_[2]), 2));
                    this.openNavigator(null);
                }
                break;
            case "report":
                if (_loc2_.length > 3) {
                    this.enterRoomWebRequest(stringOrNull(_loc2_[2]), true, stringOrNull(_loc2_[3]));
                }
                break;
            default:
                Logger.log("Navigator unknown link-type received: " + _loc2_[1]);
        }
    }

    private onPerksUpdated(param1: PerksUpdatedEvent): void {
        if (!this._sessionData.isPerkAllowed("NAVIGATOR_PHASE_TWO_2014")) {
            if (this._SafeStr_2226 && this._SafeStr_2226.isPhaseOneNavigator != this.isPerkAllowed("NAVIGATOR_PHASE_ONE_2014")) {
                this._SafeStr_2226.close();
            }
            this.context.addLinkEventTracker(this);
        } else {
            this.context.removeLinkEventTracker(this);
        }
    }

    public showToolbarHover(param1: Point): void {
        if (!this._SafeStr_3080) {
            this._SafeStr_3080 = new ToolbarHoverCtrl(this);
        }
        this._SafeStr_3080.show(param1);
    }

    public hideToolbarHover(param1: boolean): void {
        if (!this._SafeStr_3080) {
            return;
        }
        if (param1) {
            this._SafeStr_3080.hideDelayed();
        } else {
            this._SafeStr_3080.hide();
        }
    }

    public isPerkAllowed(param1: string): boolean {
        if (this._sessionData) {
            return this._sessionData.isPerkAllowed(param1);
        }
        return false;
    }

    public canRateRoom(): boolean {
        if (!this.data) {
            return false;
        }
        return this.data.canRate;
    }

    public isRoomFavorite(param1: number): boolean {
        if (!this.data) {
            return false;
        }
        return this.data.isRoomFavourite(param1);
    }

    public isRoomHome(param1: number): boolean {
        if (!this.data) {
            return false;
        }
        return this.data.isRoomHome(param1);
    }

    public get visibleEventCategories(): any[] {
        if (!this.data) {
            return [];
        }
        return this.data.visibleEventCategories;
    }

    protected override initInstanceFields(): void {
        this.enterRoomWebRequest = this.enterRoomWebRequest.bind(this);
        this.onRoomSessionCreatedEvent = this.onRoomSessionCreatedEvent.bind(this);
        this.onHabboToolbarEvent = this.onHabboToolbarEvent.bind(this);
        this.onPerksUpdated = this.onPerksUpdated.bind(this);
        this._log = true;
        this._webRoomReportedName = null;
        super.initInstanceFields();
    }

    get [IHabboNavigator](): true {
        return true;
    }
}
