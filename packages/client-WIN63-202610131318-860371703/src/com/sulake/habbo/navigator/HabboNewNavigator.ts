import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';
import type { SearchResultContainer } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultContainer';
import type { SearchResultSet } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultSet';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { NavigatorLiftedRoomsParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorLiftedRoomsParser';
import type { NavigatorMetaDataParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorMetaDataParser';
import type { NavigatorSavedSearchesParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorSavedSearchesParser';
import type { NewNavigatorPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NewNavigatorPreferencesParser';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NavigatorData } from '@/com/sulake/habbo/navigator/domain/NavigatorData';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { PerksUpdatedEvent } from '@/com/sulake/habbo/session/events/PerksUpdatedEvent';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ForwardToSomeRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/ForwardToSomeRoomMessageComposer';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { NavigatorAddCollapsedCategoryMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NavigatorAddCollapsedCategoryMessageComposer';
import { NavigatorAddSavedSearchComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NavigatorAddSavedSearchComposer';
import { NavigatorDeleteSavedSearchComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NavigatorDeleteSavedSearchComposer';
import { NavigatorRemoveCollapsedCategoryMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NavigatorRemoveCollapsedCategoryMessageComposer';
import { NavigatorSetSearchCodeViewModeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NavigatorSetSearchCodeViewModeMessageComposer';
import { NewNavigatorInitComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NewNavigatorInitComposer';
import { NewNavigatorSearchComposer } from '@/com/sulake/habbo/communication/messages/outgoing/newnavigator/NewNavigatorSearchComposer';
import { SetNewNavigatorWindowPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetNewNavigatorWindowPreferencesMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { NavigatorCache } from '@/com/sulake/habbo/navigator/cache/NavigatorCache';
import { ContextContainer } from '@/com/sulake/habbo/navigator/context/ContextContainer';
import { SearchContext } from '@/com/sulake/habbo/navigator/context/SearchContext';
import { SearchContextHistoryManager } from '@/com/sulake/habbo/navigator/context/SearchContextHistoryManager';
import { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { NavigatorView } from '@/com/sulake/habbo/navigator/HabboNewNavigator.group';
import { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import { LiftDataContainer } from '@/com/sulake/habbo/navigator/lift/LiftDataContainer';
import { NewIncomingMessages } from '@/com/sulake/habbo/navigator/NewIncomingMessages';
import { LegacyNavigator } from '@/com/sulake/habbo/navigator/transitional/LegacyNavigator';
import { Base64 } from '@/com/sulake/habbo/utils/Base64';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboNewNavigator extends Component implements IHabboNewNavigator, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.navigator::HabboNewNavigator'); }

    private static readonly SEARCH_RETRY_TIMEOUT_MS: number = 5000;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _sessionData: ISessionDataManager;

    declare private _tracking: IHabboTracking;

    declare private _catalog: IHabboCatalog;

    declare private _habboHelp: IHabboHelp;

    declare private _avatarManager: IAvatarRenderManager;

    declare private _incomingMessages: NewIncomingMessages;

    declare private _toolbar: IHabboToolbar;

    declare private _oldNavigator: HabboNavigator;

    declare private _legacyNavigator: LegacyNavigator;

    declare private _initialized: boolean;

    declare private _view: NavigatorView;

    declare private _contextContainer: ContextContainer;

    declare private _liftDataContainer: LiftDataContainer;

    declare private _searchContextHistoryManager: SearchContextHistoryManager;

    declare private _currentResults: SearchResultContainer;

    declare private _groupDetails: UtilsMap;

    declare private _SafeStr_4373: UtilsMap;

    declare private _collapsedCategories: string[];

    declare private _navigatorCache: NavigatorCache;

    declare private _lastSearchCode: string;

    declare private _SafeStr_5038: string;

    declare private _SafeStr_14247: number;

    declare private _SafeStr_6430: string;

    declare private _SafeStr_3989: number;

    declare private _newResultsRendered: boolean;

    declare private _noPushToHistoryDueToNavigation: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._legacyNavigator = new LegacyNavigator(this, this._oldNavigator);
    }

    public static getEventLogExtraStringFromSearch(param1: string, param2: string): string {
        return param1 + (param2 == "" ? "" : ":" + param2);
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get sessionData(): ISessionDataManager {
        return this._sessionData;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
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
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._oldNavigator = castTo(param1, HabboNavigator);
             if (this._legacyNavigator) {
                 this._legacyNavigator.oldNavigator = this._oldNavigator;
             }
         }, true)]);
    }

    protected override initComponent(): void {
        this._incomingMessages = new NewIncomingMessages(this);
        this.context.addLinkEventTracker(this);
        this._view = new NavigatorView(this);
        this._contextContainer = new ContextContainer(this);
        this._searchContextHistoryManager = new SearchContextHistoryManager(this);
        this._liftDataContainer = new LiftDataContainer(this);
        this._navigatorCache = new NavigatorCache();
        this._communication.connection.send(new NewNavigatorInitComposer());
        this._initialized = true;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.context.removeLinkEventTracker(this);
        if (this._incomingMessages) {
            this._incomingMessages.removeLegacyMessageListeners();
            this._incomingMessages = null;
        }
        if (this._legacyNavigator) {
            this._legacyNavigator.dispose();
            this._legacyNavigator = null;
        }
        super.dispose();
    }

    private onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            let _loc2_: string = param1.iconId;
            if ("HTIE_ICON_NAVIGATOR" === _loc2_) {
                this.toggle();
            }
        }
    }

    public initialize(param1: NavigatorMetaDataParser): void {
        this._contextContainer.initialize(param1);
    }

    public onSearchResult(param1: SearchResultContainer): void {
        this._SafeStr_14247 = -1;
        this._newResultsRendered = false;
        this._currentResults = param1;
        this.extractRoomNamesFromResults(param1.resultSet);
        if (!this._noPushToHistoryDueToNavigation) {
            this._searchContextHistoryManager.addSearchContextAtCurrentOffset(new SearchContext(param1.searchCodeOriginal, param1.filteringData));
        }
        this._navigatorCache.put(param1.searchCodeOriginal + "/" + param1.filteringData, param1);
        this._noPushToHistoryDueToNavigation = false;
        if (this._view.visible) {
            this._view.onSearchResults(param1, this._SafeStr_6430);
        }
    }

    private extractRoomNamesFromResults(param1: SearchResultSet): void {
        let _loc3_: any;
        this._SafeStr_4373 = new UtilsMap();
        for (const _loc2_ of param1.blocks ?? []) {
            for (_loc3_ of _loc2_.guestRooms ?? []) {
                this._SafeStr_4373.add(_loc3_.flatId, _loc3_.roomName);
            }
        }
    }

    public get newResultsRendered(): boolean {
        return this._newResultsRendered;
    }

    public set newResultsRendered(param1: boolean) {
        this._newResultsRendered = param1;
    }

    public onLiftedRooms(param1: NavigatorLiftedRoomsParser): void {
        this._liftDataContainer.setLiftedRooms(param1.liftedRooms);
        this._view.refreshLiftedRooms();
    }

    public onPreferences(param1: NewNavigatorPreferencesParser): void {
        this._view.setInitialWindowDimensions(param1.windowX, param1.windowY, param1.windowHeight, param1.leftPaneHidden, param1.resultsMode);
    }

    public onSavedSearches(param1: NavigatorSavedSearchesParser): void {
        this._contextContainer.savedSearches = param1.savedSearches.concat(new Array<SavedSearch>(0).fill(null));
        this._view.onSavedSearches(this._contextContainer.savedSearches);
    }

    public onGroupDetails(param1: HabboGroupDetailsData): void {
        if (this._groupDetails.hasKey(param1.groupId)) {
            this._groupDetails.remove(param1.groupId);
        }
        this._groupDetails.add(param1.groupId, param1);
        this._view.onGroupDetailsArrived(param1.groupId);
    }

    public onCollapsedCategories(param1: string[]): void {
        this._collapsedCategories = param1.concat();
    }

    public get collapsedCategories(): string[] {
        return this._collapsedCategories;
    }

    public getCachedGroupDetails(param1: number): HabboGroupDetailsData {
        return this._groupDetails.getValue(param1);
    }

    public goBack(): void {
        if (this._searchContextHistoryManager.hasPrevious) {
            this._noPushToHistoryDueToNavigation = true;
            this.performSearchByContext(this._searchContextHistoryManager.getPreviousSearchContextAndGoBack());
        }
        this.trackEventLog("browse.back", "Results");
    }

    public performLastSearch(): void {
        if (this._lastSearchCode != null && this._SafeStr_5038 != null) {
            this._navigatorCache.removeEntry(this._lastSearchCode + "/" + this._SafeStr_5038);
            this.performSearch(this._lastSearchCode, this._SafeStr_5038);
        }
    }

    public performSearch(param1: string, param2: string = "", param3: string = ""): void {
        this._SafeStr_14247 = getTimer() >>> 0;
        this._view.isBusy = true;
        this._SafeStr_6430 = param3;
        let _loc4_: SearchResultContainer = this._navigatorCache.getEntry(param1 + "/" + param2);
        if (_loc4_ != null) {
            this.onSearchResult(_loc4_);
        } else {
            this._lastSearchCode = param1;
            this._SafeStr_5038 = param2;
            this._communication.connection.send(new NewNavigatorSearchComposer(param1, param2));
            this.trackEventLog("search", "Search", HabboNewNavigator.getEventLogExtraStringFromSearch(param1, param2));
        }
        this.open();
    }

    public performSearchByContext(param1: SearchContext): void {
        this.performSearch(param1.searchCode, param1.filtering);
    }

    public addSavedSearch(param1: string, param2: string): void {
        if (this._currentResults != null) {
            this._communication.connection.send(new NavigatorAddSavedSearchComposer(param1, param2));
        }
        this.trackEventLog("savedsearch.add", "SavedSearch", HabboNewNavigator.getEventLogExtraStringFromSearch(param1, param2));
        this._view.setLeftPaneVisibility(true);
    }

    public deleteSavedSearch(param1: number): void {
        this._communication.connection.send(new NavigatorDeleteSavedSearchComposer(param1));
        this.trackEventLog("savedsearch.delete", "SavedSearch");
    }

    private onPerksUpdated(param1: PerksUpdatedEvent): void {
        if (!this._sessionData.isPerkAllowed("NAVIGATOR_PHASE_TWO_2014")) {
            this.context.removeLinkEventTracker(this);
            if (this._initialized) {
                this._incomingMessages.removeLegacyMessageListeners();
                this.close();
            }
            return;
        }
        if (!this._initialized) {
            this.initComponent();
        } else if (this._sessionData.isPerkAllowed("NAVIGATOR_PHASE_TWO_2014")) {
            this._incomingMessages.addMessageListeners();
        }
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
                if (this._legacyNavigator.raidProtectionSettingsController != null) {
                    this._legacyNavigator.raidProtectionSettingsController.openFromLink(stringOrNull(_loc2_.length == 3 ? _loc2_[2] : null));
                }
                break;
            case "goto":
                if (_loc2_.length > 2) {
                    let _loc4_: any = _loc2_[2];
                    if ("home" !== _loc4_) {
                        _loc3_ = _loc2_[2] | 0;
                        if (_loc3_ > 0) {
                            this._legacyNavigator.goToPrivateRoom(_loc3_);
                        } else {
                            this.communication.connection.send(new ForwardToSomeRoomMessageComposer(stringOrNull(_loc2_[2])));
                        }
                    } else {
                        this._legacyNavigator.goToHomeRoom();
                    }
                }
                break;
            case "search":
                if (_loc2_.length > 2) {
                    this.performSearch("hotel_view", stringOrNull(_loc2_[2]));
                }
                break;
            case "tag":
                if (_loc2_.length > 2) {
                    this.performSearch("hotel_view", stringOrNull(_loc2_[2]));
                }
                break;
            case "tab":
                if (_loc2_.length > 2) {
                    this.performSearch(this.getSearchCodeForTabLink(stringOrNull(_loc2_[2])));
                }
                break;
            case "report":
                if (_loc2_.length > 3) {
                    this._legacyNavigator.reportRoomFromWeb(stringOrNull(_loc2_[2]), Base64.decode(stringOrNull(_loc2_[3])));
                }
                break;
            case "ask_forward":
                if (_loc2_.length > 2) {
                    this._SafeStr_3989 = _loc2_[2] | 0;
                    this._communication.connection.send(new GetGuestRoomMessageComposer(this._SafeStr_3989, false, false));
                }
                break;
            default:
                Logger.log("Navigator unknown link-type received: " + _loc2_[1]);
        }
    }

    private getSearchCodeForTabLink(param1: string): string {
        let _loc2_: string = param1;
        if ("me" !== _loc2_) {
            return param1;
        }
        return "myworld_view";
    }

    public onRoomInfo(param1: GuestRoomData): void {
        let text: string;
        let roomData: GuestRoomData = param1;
        if (this._SafeStr_3989 != -1 && roomData.flatId == this._SafeStr_3989) {
            this._SafeStr_3989 = -1;
            text = this._localization.getLocalizationWithParams("navigator.forward_confirmation.desc", "", "room_name", roomData.roomName);
            this._windowManager.confirm("${navigator.forward_confirmation.title}", text, 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this._legacyNavigator.goToPrivateRoom(roomData.flatId);
                }
            });
        }
    }

    public showOwnRooms(): void {
    }

    public showToolbarHover(param1: Point): void {
    }

    public hideToolbarHover(param1: boolean): void {
    }

    public get isReady(): boolean {
        return this._contextContainer != null && this._contextContainer.isReady();
    }

    public get contextContainer(): ContextContainer {
        return this._contextContainer;
    }

    public get searchContextHistoryManager(): SearchContextHistoryManager {
        return this._searchContextHistoryManager;
    }

    public get liftDataContainer(): LiftDataContainer {
        return this._liftDataContainer;
    }

    public get currentResults(): SearchResultContainer {
        return this._currentResults;
    }

    public goToRoom(param1: number, param2: string = "mainview"): void {
        this.communication.connection.send(new GetGuestRoomMessageComposer(param1, false, true));
        this._view.visible = false;
        let _loc3_: string = stringOrNull(this._SafeStr_4373.getValue(param1));
        this.trackEventLog("go", param2, !_loc3_ ? "" : _loc3_, param1);
    }

    public getExtendedProfile(param1: number): void {
        this.communication.connection.send(new GetExtendedProfileMessageComposer(param1));
    }

    public get imageLibraryBaseUrl(): string {
        return this.context.configuration.getProperty("image.library.url");
    }

    public performTagSearch(param1: string): void {
        this.performSearch("hotel_view", "tag:" + param1);
    }

    public createRoom(): void {
        this._legacyNavigator.roomCreateViewCtrl.show();
    }

    public open(): void {
        if (this._view == null) {
            return;
        }
        if (!this._view.visible) {
            this._view.visible = true;
        }
    }

    public close(): void {
        if (this._view.visible) {
            this._view.visible = false;
        }
    }

    public toggle(): void {
        if (this._view == null) {
            return;
        }
        this._view.visible = !this._view.visible;
        if (this._view.visible && (this._SafeStr_14247 < 0 || getTimer() - this._SafeStr_14247 >>> 0 >= 5000)) {
            this.performLastSearch();
        }
    }

    public get mainWindow(): IFrameWindow {
        return this._view.mainWindow;
    }

    public refresh(): void {
        if (this._currentResults) {
            this._view.onSearchResults(this._currentResults);
        }
    }

    public get legacyNavigator(): IHabboNavigator {
        return this._legacyNavigator;
    }

    public get data(): NavigatorData {
        return this._legacyNavigator.data;
    }

    public sendWindowPreferences(param1: number, param2: number, param3: number, param4: number, param5: boolean, param6: number): void {
        this._communication.connection.send(new SetNewNavigatorWindowPreferencesMessageComposer(param1, param2, param3, param4, param5, param6));
    }

    public getGuildInfo(param1: number, param2: boolean = true): void {
        this._communication.connection.send(new GetHabboGroupDetailsMessageComposer(param1, param2));
    }

    public sendAddCollapsedCategory(param1: string): void {
        this._communication.connection.send(new NavigatorAddCollapsedCategoryMessageComposer(param1));
    }

    public sendRemoveCollapsedCategory(param1: string): void {
        this._communication.connection.send(new NavigatorRemoveCollapsedCategoryMessageComposer(param1));
    }

    public goToHomeRoom(): void {
        this.goToRoom(this._legacyNavigator.data.homeRoomId, "external");
    }

    public trackEventLog(param1: string, param2: string, param3: string = "", param4: number = 0): void {
        if (this._tracking) {
            this._tracking.trackEventLog("NewNavigator", param2, param1, param3, param4);
        }
    }

    public get view(): NavigatorView {
        return this._view;
    }

    public toggleSearchCodeViewMode(param1: string, param2: number): void {
        this._communication.connection.send(new NavigatorSetSearchCodeViewModeMessageComposer(param1, param2));
        this.trackEventLog("browse.toggleviewmode", "ViewMode", "", param2);
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public performTextSearch(param1: string): void {
    }

    public performGuildBaseSearch(): void {
    }

    public performCompetitionRoomsSearch(param1: number, param2: number): void {
    }

    protected override initInstanceFields(): void {
        this.onHabboToolbarEvent = this.onHabboToolbarEvent.bind(this);
        this.onPerksUpdated = this.onPerksUpdated.bind(this);
        this._initialized = false;
        this._groupDetails = new UtilsMap();
        this._SafeStr_4373 = new UtilsMap();
        this._collapsedCategories = new Array<string>(0).fill(null);
        this._lastSearchCode = "official_view";
        this._SafeStr_5038 = "";
        this._SafeStr_14247 = -1;
        this._SafeStr_6430 = "";
        this._SafeStr_3989 = -1;
        this._newResultsRendered = false;
        this._noPushToHistoryDueToNavigation = false;
        super.initInstanceFields();
    }

    get [IHabboNewNavigator](): true {
        return true;
    }
}
