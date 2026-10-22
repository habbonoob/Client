import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { GuestRoomSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultData';
import type { PopularRoomTagsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularRoomTagsData';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { CanCreateRoomEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CanCreateRoomEventMessageParser';
import type { CategoriesWithVisitorCountParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CategoriesWithVisitorCountParser';
import type { FavouriteChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FavouriteChangedMessageParser';
import type { FavouritesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FavouritesMessageParser';
import type { FlatAccessDeniedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatAccessDeniedMessageParser';
import type { FlatCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatCreatedMessageParser';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { NavigatorSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/NavigatorSettingsMessageParser';
import type { OfficialRoomsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/OfficialRoomsMessageParser';
import type { RoomEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomEventMessageParser';
import type { RoomInfoUpdatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomInfoUpdatedMessageParser';
import type { RoomRatingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomRatingMessageParser';
import type { UserEventCatsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/UserEventCatsMessageParser';
import type { UserFlatCatsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/UserFlatCatsMessageParser';
import type { RoomFilterSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/RoomFilterSettingsMessageParser';
import type { CantConnectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/CantConnectMessageParser';
import type { FlatAccessibleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/FlatAccessibleMessageParser';
import type { BannedUsersFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/BannedUsersFromRoomParser';
import type { FlatControllerAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerAddedMessageParser';
import type { FlatControllerRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerRemovedMessageParser';
import type { FlatControllersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllersMessageParser';
import type { MuteAllInRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/MuteAllInRoomParser';
import type { RoomSettingsDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsDataMessageParser';
import type { RoomSettingsErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsErrorMessageParser';
import type { RoomSettingsSavedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSavedMessageParser';
import type { RoomSettingsSaveErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSaveErrorMessageParser';
import type { UserUnbannedFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/UserUnbannedFromRoomParser';
import type { NavigatorData } from '@/com/sulake/habbo/navigator/domain/NavigatorData';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { NoOwnedRoomsAlertMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/NoOwnedRoomsAlertMessageEvent';
import { FriendListFragmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListFragmentMessageEvent';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { CanCreateRoomEventEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CanCreateRoomEventEvent';
import { CategoriesWithVisitorCountEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CategoriesWithVisitorCountEvent';
import { CompetitionRoomsDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsDataMessageEvent';
import { DoorbellMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/DoorbellMessageEvent';
import { FavouriteChangedEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FavouriteChangedEvent';
import { FavouritesEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FavouritesEvent';
import { FlatAccessDeniedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatAccessDeniedMessageEvent';
import { FlatCreatedEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCreatedEvent';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { GuestRoomSearchResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultEvent';
import { NavigatorSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/NavigatorSettingsEvent';
import { OfficialRoomsEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomsEvent';
import { PopularRoomTagsResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularRoomTagsResultEvent';
import { RoomEventCancelEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventCancelEvent';
import { RoomEventEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventEvent';
import { RoomInfoUpdatedEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomInfoUpdatedEvent';
import { RoomRatingEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomRatingEvent';
import { UserEventCatsEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/UserEventCatsEvent';
import { UserFlatCatsEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/UserFlatCatsEvent';
import { NavigatorCollapsedCategoriesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NavigatorCollapsedCategoriesMessageEvent';
import { NavigatorLiftedRoomsEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NavigatorLiftedRoomsEvent';
import { NavigatorMetaDataEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NavigatorMetaDataEvent';
import { NavigatorSavedSearchesEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NavigatorSavedSearchesEvent';
import { NavigatorSearchResultBlocksEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NavigatorSearchResultBlocksEvent';
import { NewNavigatorPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/NewNavigatorPreferencesEvent';
import { SearchResultContainer } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultContainer';
import { RoomFilterSettingsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/RoomFilterSettingsMessageEvent';
import { CantConnectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CantConnectMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { FlatAccessibleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/FlatAccessibleMessageEvent';
import { BannedUsersFromRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/BannedUsersFromRoomEvent';
import { FlatControllerAddedEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllerAddedEvent';
import { FlatControllerRemovedEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllerRemovedEvent';
import { FlatControllersEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllersEvent';
import { MuteAllInRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/MuteAllInRoomEvent';
import { NoSuchFlatEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/NoSuchFlatEvent';
import { RoomSettingsDataEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsDataEvent';
import { RoomSettingsErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsErrorEvent';
import { RoomSettingsSavedEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsSavedEvent';
import { RoomSettingsSaveErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsSaveErrorEvent';
import { UserUnbannedFromRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/UserUnbannedFromRoomEvent';
import { HabboGroupDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsMessageEvent';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { GetUserEventCatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetUserEventCatsMessageComposer';
import { GetUserFlatCatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetUserFlatCatsMessageComposer';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { AlertView } from '@/com/sulake/habbo/navigator/AlertView';
import { RoomsTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/RoomsTabPageDecorator';
import { SimpleAlertView } from '@/com/sulake/habbo/navigator/SimpleAlertView';
import { LegacyNavigator } from '@/com/sulake/habbo/navigator/transitional/LegacyNavigator';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class NewIncomingMessages {
    static { registerClassName(this, 'com.sulake.habbo.navigator::NewIncomingMessages'); }

    declare private _navigator: HabboNewNavigator;

    private _messageListeners: any[] = [];

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
        let _loc2_: IHabboCommunicationManager = this._navigator.communication;
        this.addMessageListeners();
    }

    public addMessageListeners(): void {
        let _loc1_: IHabboCommunicationManager = this._navigator.communication;
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new GuestRoomSearchResultEvent(this.onGuestRoomSearchResult)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new HabboGroupDetailsMessageEvent(this.onGroupDetails)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomSettingsSavedEvent(this.onRoomSettingsSaved)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NewNavigatorPreferencesEvent(this.onNavigatorPreferences)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new GetGuestRoomResultEvent(this.onRoomInfo)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new CompetitionRoomsDataMessageEvent(this.onCompetitionData)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new BannedUsersFromRoomEvent(this.onBannedUsersFromRoom)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FriendListFragmentMessageEvent(this.onFriendsListFragment)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new OfficialRoomsEvent(this.onOfficialRooms)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new CategoriesWithVisitorCountEvent(this.onCategoriesWithUserCount)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomRatingEvent(this.onRoomRating)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NavigatorLiftedRoomsEvent(this.onNavigatorLiftedRooms)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new CanCreateRoomEventEvent(this.onCanCreateRoomEventEvent)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new UserFlatCatsEvent(this.onUserFlatCats)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NavigatorCollapsedCategoriesMessageEvent(this.onCollapsedCategories)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatControllerAddedEvent(this.onFlatControllerAdded)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomEventEvent(this.onRoomEventEvent)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomSettingsDataEvent(this.onRoomSettingsData)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new MuteAllInRoomEvent(this.onMuteAllEvent)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new NoSuchFlatEvent(this.onNoSuchFlat)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomEventCancelEvent(this.onRoomEventCancel)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NavigatorSavedSearchesEvent(this.onSavedSearches)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FavouritesEvent(this.onFavourites)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatControllerRemovedEvent(this.onFlatControllerRemoved)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatAccessibleMessageEvent(this.onDoorOpened)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatControllersEvent(this.onFlatControllers)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatAccessDeniedMessageEvent(this.onFlatAccessDenied)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NavigatorSearchResultBlocksEvent(this.onNavigatorSearchResultBlocks)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new UserUnbannedFromRoomEvent(this.onUserUnbannedFromRoom)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new DoorbellMessageEvent(this.onDoorbell)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FlatCreatedEvent(this.onFlatCreated)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new PopularRoomTagsResultEvent(this.onPopularRoomTagsResult)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new NavigatorSettingsEvent(this.onNavigatorSettings)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new UserEventCatsEvent(this.onUserEventCats)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new CantConnectMessageEvent(this.onCantConnect)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FriendListUpdateEvent(this.onFriendListUpdate)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomFilterSettingsMessageEvent(this.onRoomFilterSettings)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomInfoUpdatedEvent(this.onRoomInfoUpdated)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomSettingsErrorEvent(this.onRoomSettingsError)));
        this._messageListeners.push(_loc1_.connection.addMessageEvent(new NavigatorMetaDataEvent(this.onNavigatorMetaData)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new RoomSettingsSaveErrorEvent(this.onRoomSettingsSaveError)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new FavouriteChangedEvent(this.onFavouriteChanged)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit)));
        this._messageListeners.push(_loc1_.addHabboConnectionMessageEvent(new NoOwnedRoomsAlertMessageEvent(this.onNoOwnedRoomsAlert)));
    }

    public removeLegacyMessageListeners(): void {
        let _loc1_: IHabboCommunicationManager = this._navigator.communication;
        for (const _loc2_ of this._messageListeners ?? []) {
            _loc1_.removeHabboConnectionMessageEvent(_loc2_);
        }
        this._messageListeners = [];
    }

    private onNavigatorMetaData = (param1: NavigatorMetaDataEvent): void => {
        this._navigator.initialize(param1.getParser());
    };

    private onNavigatorSearchResultBlocks = (param1: NavigatorSearchResultBlocksEvent): void => {
        this._navigator.onSearchResult(new SearchResultContainer(param1.getParser().searchResult));
    };

    private onNavigatorLiftedRooms = (param1: NavigatorLiftedRoomsEvent): void => {
        this._navigator.onLiftedRooms(param1.getParser());
    };

    private onNavigatorPreferences = (param1: NewNavigatorPreferencesEvent): void => {
        this._navigator.onPreferences(param1.getParser());
    };

    private onSavedSearches = (param1: NavigatorSavedSearchesEvent): void => {
        this._navigator.onSavedSearches(param1.getParser());
    };

    private onGroupDetails = (param1: HabboGroupDetailsMessageEvent): void => {
        this._navigator.onGroupDetails(param1.data);
    };

    private onCollapsedCategories = (param1: NavigatorCollapsedCategoriesMessageEvent): void => {
        this._navigator.onCollapsedCategories(param1.getParser().collapsedCategories);
    };

    private get data(): NavigatorData {
        return this._navigator.data;
    }

    private onMuteAllEvent = (param1: IMessageEvent): void => {
        let _loc4_: MuteAllInRoomEvent = param1 instanceof MuteAllInRoomEvent ? param1 : null;
        let _loc3_: MuteAllInRoomParser = _loc4_.getParser();
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ != null) {
            _loc2_.allInRoomMuted = _loc3_.allMuted;
            if (castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl != null) {
                castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl.refreshButtons(this._navigator.data.enteredGuestRoom);
            }
        }
    };

    private onNoSuchFlat = (param1: IMessageEvent): void => {
    };

    private onUserObject(param1: IMessageEvent): void {
        let _loc2_: UserObjectMessageParser = castTo(param1, UserObjectEvent).getParser();
        this._navigator.data.avatarId = _loc2_.id;
        castTo(this._navigator.legacyNavigator, LegacyNavigator).send(new GetUserFlatCatsMessageComposer());
        castTo(this._navigator.legacyNavigator, LegacyNavigator).send(new GetUserEventCatsMessageComposer());
    }

    private onUserRights(param1: IMessageEvent): void {
        let _loc2_: UserRightsMessageEvent = null;
        if (this._navigator) {
            _loc2_ = castTo(param1, UserRightsMessageEvent);
            if (_loc2_.securityLevel >= 5) {
                this._navigator.data.eventMod = true;
            }
            if (_loc2_.securityLevel >= 7) {
                this._navigator.data.roomPicker = true;
            }
        }
    }

    private onCategoriesWithUserCount = (param1: IMessageEvent): void => {
        let _loc2_: CategoriesWithVisitorCountParser = castTo(param1, CategoriesWithVisitorCountEvent).getParser();
        this.data.categoriesWithVisitorData = _loc2_.data;
        Logger.log("Received Categories with user count: " + this.data.categoriesWithVisitorData.categoryToCurrentUserCountMap.length);
    };

    private onOfficialRooms = (param1: IMessageEvent): void => {
        let _loc2_: OfficialRoomsMessageParser = castTo(param1, OfficialRoomsEvent).getParser();
        this.data.officialRooms = _loc2_.data;
        this.data.adRoom = _loc2_.adRoom;
        this.data.promotedRooms = _loc2_.promotedRooms;
        Logger.log("Received Official rooms: " + this.data.officialRooms.entries.length);
    };

    private onGuestRoomSearchResult = (param1: IMessageEvent): void => {
        let _loc2_: GuestRoomSearchResultData = castTo(param1, GuestRoomSearchResultEvent).getParser().data;
        this.data.guestRoomSearchResults = _loc2_;
        Logger.log("Received GuestRoomSearch: " + (this.data.guestRoomSearchResults.rooms ? this.data.guestRoomSearchResults.rooms.length : " no rooms"));
    };

    private onPopularRoomTagsResult = (param1: IMessageEvent): void => {
        let _loc2_: PopularRoomTagsData = castTo(param1, PopularRoomTagsResultEvent).getParser().data;
        this.data.popularTags = _loc2_;
        Logger.log("Received popular room tags: " + this.data.popularTags.tags.length);
    };

    private onRoomEventEvent = (param1: IMessageEvent): void => {
        let _loc2_: RoomEventMessageParser = castTo(param1, RoomEventEvent).getParser();
        Logger.log("Got room event: " + _loc2_.data.ownerAvatarId + ", " + _loc2_.data.eventName);
        this.data.roomEventData = _loc2_.data.ownerAvatarId > 0 ? _loc2_.data : null;
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomEventInfoCtrl.refresh();
    };

    private onRoomEventCancel = (param1: IMessageEvent): void => {
        this.data.roomEventData = null;
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomEventInfoCtrl.refresh();
    };

    private onCanCreateRoomEventEvent = (param1: IMessageEvent): void => {
        let _loc3_: SimpleAlertView = null;
        let _loc2_: CanCreateRoomEventMessageParser = castTo(param1, CanCreateRoomEventEvent).getParser();
        Logger.log("CAN CREATE EVENT: " + _loc2_.canCreateEvent);
        if (_loc2_.canCreateEvent) {
            castTo(this._navigator.legacyNavigator, LegacyNavigator).roomEventViewCtrl.show();
        } else {
            _loc3_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${navigator.cannotcreateevent.title}", "${navigator.cannotcreateevent.error." + _loc2_.errorCode + "}");
            _loc3_.show();
            Logger.log("Cannot create an event just now...");
        }
    };

    private onRoomInfo = (param1: GetGuestRoomResultEvent): void => {
        let _loc2_: GetGuestRoomResultMessageParser = param1.getParser();
        if (!_loc2_.enterRoom && !_loc2_.roomForward) {
            this._navigator.onRoomInfo(_loc2_.data);
        }
    };

    private requestRoomEnterAd(): void {
        if (this._navigator.getProperty("roomenterad.habblet.enabled") == "true") {
            HabboWebTools.openRoomEnterAd();
        }
    }

    private onFlatCreated = (param1: IMessageEvent): void => {
        let _loc2_: FlatCreatedMessageParser = castTo(param1, FlatCreatedEvent).getParser();
        ErrorReportStorage.addDebugData("IncomingEvent", "Flat created: " + _loc2_.flatId + ", " + _loc2_.flatName);
        this.data.createdFlatId = _loc2_.flatId;
        castTo(this._navigator.legacyNavigator, LegacyNavigator).goToRoom(_loc2_.flatId, true);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).mainViewCtrl.reloadRoomList(5);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).goToMainView();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).closeNavigator();
    };

    private onGameStarted(param1: IMessageEvent): void {
        castTo(this._navigator.legacyNavigator, LegacyNavigator).mainViewCtrl.close();
    }

    private onRoomExit = (param1: IMessageEvent): void => {
        Logger.log("Navigator: exiting room");
        this.data.onRoomExit();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl.close();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomEventInfoCtrl.close();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomEventViewCtrl.close();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.close();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomFilterCtrl.close();
        let _loc2_: boolean = this._navigator.getBoolean("news.auto_popup.enabled");
        if (_loc2_) {
            HabboWebTools.openNews();
        }
    };

    private onUserFlatCats = (param1: IMessageEvent): void => {
        let _loc3_: UserFlatCatsMessageParser = (param1 instanceof UserFlatCatsEvent ? param1 : null).getParser();
        this._navigator.data.categories = _loc3_.nodes;
        let _loc2_: RoomsTabPageDecorator = castTo(castTo(this._navigator.legacyNavigator, LegacyNavigator).tabs.getTab(2).tabPageDecorator, RoomsTabPageDecorator);
        _loc2_.prepareRoomCategories();
    };

    private onUserEventCats = (param1: IMessageEvent): void => {
        let _loc2_: UserEventCatsMessageParser = (param1 instanceof UserEventCatsEvent ? param1 : null).getParser();
        this._navigator.data.eventCategories = _loc2_.eventCategories;
    };

    private onRoomSettingsData = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsDataMessageParser = null;
        try {
            _loc2_ = (param1 instanceof RoomSettingsDataEvent ? param1 : null).getParser();
            castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onRoomSettings(_loc2_.data);
            Logger.log("GOT ROOM SETTINGS DATA: " + _loc2_.data.name + ", " + _loc2_.data.maximumVisitors + ", " + _loc2_.data.maximumVisitorsLimit);
        } catch (e) {
            Logger.log("CRASHED WHILE PROCESSING ROOM SETTINGS DATA!");
        }
    };

    private onRoomFilterSettings = (param1: IMessageEvent): void => {
        let _loc2_: RoomFilterSettingsMessageParser = (param1 instanceof RoomFilterSettingsMessageEvent ? param1 : null).getParser();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomFilterCtrl.onRoomFilterSettings(_loc2_.badWords);
        Logger.log("GOT ROOM FILTER SETTINGS: " + _loc2_.badWords);
    };

    private onRoomSettingsError = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsErrorMessageParser = (param1 instanceof RoomSettingsErrorEvent ? param1 : null).getParser();
    };

    private onRoomSettingsSaved = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsSavedMessageParser = (param1 instanceof RoomSettingsSavedEvent ? param1 : null).getParser();
        ErrorReportStorage.addDebugData("IncomingEvent", "Room settings saved: " + _loc2_.roomId);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).mainViewCtrl.reloadRoomList(5);
    };

    private onRoomSettingsSaveError = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsSaveErrorMessageParser = (param1 instanceof RoomSettingsSaveErrorEvent ? param1 : null).getParser();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onRoomSettingsSaveError(_loc2_.roomId, _loc2_.errorCode, _loc2_.info);
    };

    private onRoomInfoUpdated = (param1: IMessageEvent): void => {
        let _loc2_: RoomInfoUpdatedMessageParser = (param1 instanceof RoomInfoUpdatedEvent ? param1 : null).getParser();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).send(new GetGuestRoomMessageComposer(_loc2_.flatId, false, false));
    };

    private onFavourites = (param1: IMessageEvent): void => {
        let _loc2_: FavouritesMessageParser = (param1 instanceof FavouritesEvent ? param1 : null).getParser();
        this._navigator.data.onFavourites(_loc2_);
    };

    private onFavouriteChanged = (param1: IMessageEvent): void => {
        let _loc2_: FavouriteChangedMessageParser = (param1 instanceof FavouriteChangedEvent ? param1 : null).getParser();
        this.data.favouriteChanged(_loc2_.flatId, _loc2_.added);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl.reload();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).mainViewCtrl.refresh();
    };

    private onNavigatorSettings = (param1: IMessageEvent): void => {
        let _loc2_: NavigatorSettingsMessageParser = (param1 instanceof NavigatorSettingsEvent ? param1 : null).getParser();
        this.data.homeRoomId = _loc2_.homeRoomId;
        this.data.settingsReceived = true;
        this._navigator.view.refreshRoomInfoBubbleHomeState();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl.reload();
    };

    private onFlatControllers = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllersMessageParser = (param1 instanceof FlatControllersEvent ? param1 : null).getParser();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onFlatControllers(_loc2_.roomId, _loc2_.controllers);
    };

    private onFlatControllerAdded = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllerAddedMessageParser = (param1 instanceof FlatControllerAddedEvent ? param1 : null).getParser();
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onFlatControllerAdded(_loc2_.flatId, _loc2_.data);
    };

    private onFlatControllerRemoved = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllerRemovedMessageParser = (param1 instanceof FlatControllerRemovedEvent ? param1 : null).getParser();
        Logger.log("Flat controller removed: " + _loc2_.flatId + ", " + _loc2_.userId);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onFlatControllerRemoved(_loc2_.flatId, _loc2_.userId);
    };

    private onBannedUsersFromRoom = (param1: IMessageEvent): void => {
        let _loc2_: BannedUsersFromRoomParser = (param1 instanceof BannedUsersFromRoomEvent ? param1 : null).getParser();
        Logger.log("Got Banned users for room: " + _loc2_.roomId + ", " + _loc2_.bannedUsers.length);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onBannedUsersFromRoom(_loc2_.roomId, _loc2_.bannedUsers);
    };

    private onUserUnbannedFromRoom = (param1: IMessageEvent): void => {
        let _loc2_: UserUnbannedFromRoomParser = (param1 instanceof UserUnbannedFromRoomEvent ? param1 : null).getParser();
        Logger.log("User was unbanned from room. User Id: " + _loc2_.userId + " Room Id: " + _loc2_.roomId);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onUserUnbannedFromRoom(_loc2_.roomId, _loc2_.userId);
    };

    private onDoorbell = (param1: IMessageEvent): void => {
        let _loc2_: DoorbellMessageEvent = param1 instanceof DoorbellMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.userName != "") {
            return;
        }
        castTo(this._navigator.legacyNavigator, LegacyNavigator).doorbell.showWaiting();
    };

    private onDoorOpened = (param1: IMessageEvent): void => {
        let _loc3_: FlatAccessibleMessageEvent = param1 instanceof FlatAccessibleMessageEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: FlatAccessibleMessageParser = _loc3_.getParser();
        if (_loc2_ != null && (_loc2_.userName == null || _loc2_.userName.length == 0)) {
            castTo(this._navigator.legacyNavigator, LegacyNavigator).doorbell.hide();
        }
    };

    private onRoomRating = (param1: IMessageEvent): void => {
        let _loc2_: RoomRatingMessageParser = (param1 instanceof RoomRatingEvent ? param1 : null).getParser();
        this.data.currentRoomRating = _loc2_.rating;
        this.data.canRate = _loc2_.canRate;
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomInfoViewCtrl.reload();
    };

    private onFlatAccessDenied = (param1: IMessageEvent): void => {
        let _loc2_: FlatAccessDeniedMessageParser = (param1 instanceof FlatAccessDeniedMessageEvent ? param1 : null).getParser();
        if (_loc2_.userName == null || _loc2_.userName == "") {
            castTo(this._navigator.legacyNavigator, LegacyNavigator).doorbell.showNoAnswer();
        }
    };

    private onFriendsListFragment = (param1: IMessageEvent): void => {
        this.data.friendList.onFriendsListFragment(param1);
    };

    private onFriendListUpdate = (param1: IMessageEvent): void => {
        this.data.friendList.onFriendListUpdate(param1);
        castTo(this._navigator.legacyNavigator, LegacyNavigator).roomSettingsCtrl.onFriendListUpdate();
    };

    private onCompetitionData = (param1: CompetitionRoomsDataMessageEvent): void => {
        this.data.competitionRoomsData = param1.getParser().data;
    };

    private forwardToRoom(param1: number): void {
        castTo(this._navigator.legacyNavigator, LegacyNavigator).send(new GetGuestRoomMessageComposer(param1, false, true));
        castTo(this._navigator.legacyNavigator, LegacyNavigator).trackNavigationDataPoint("Room Forward", "go.roomforward", "", param1);
    }

    private onNoOwnedRoomsAlert = (param1: NoOwnedRoomsAlertMessageEvent): void => {
        castTo(this._navigator.legacyNavigator, LegacyNavigator).startRoomCreation();
    };

    private closeOpenCantConnectAlerts(): void {
        let _loc1_: any[] = null;
        let _loc7_: IWindowContext = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: IWindow = null;
        let _loc3_: AlertView = null;
        if (this._navigator != null) {
            _loc1_ = [];
            _loc7_ = this._navigator.windowManager.getWindowContext(2);
            _loc4_ = _loc7_.getDesktopWindow().numChildren;
            _loc5_ = 0;
            while (_loc5_ < _loc4_) {
                _loc6_ = _loc7_.getDesktopWindow().getChildAt(_loc5_);
                if (_loc6_.tags.indexOf("SimpleAlertView") > -1) {
                    _loc1_.push(_loc6_);
                }
                _loc5_++;
            }
            if (_loc1_.length > 0) {
                for (const _loc2_ of _loc1_ ?? []) {
                    _loc3_ = AlertView.findAlertView(_loc2_);
                    if (_loc3_ != null) {
                        _loc3_.dispose();
                    }
                }
            }
        }
    }

    private onCantConnect = (param1: IMessageEvent): void => {
        let _loc2_: SimpleAlertView = null;
        let _loc3_: CantConnectMessageParser = (param1 instanceof CantConnectMessageEvent ? param1 : null).getParser();
        Logger.log("FAILED TO CONNECT: REASON: " + _loc3_.reason);
        switch (_loc3_.reason - 1) {
            case 0:
                _loc2_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${navigator.guestroomfull.title}", "${navigator.guestroomfull.text}");
                _loc2_.show();
                break;
            case 2:
                _loc2_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${room.queue.error.title}", "${room.queue.error." + _loc3_.parameter + "}");
                _loc2_.show();
                break;
            case 3:
                _loc2_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${navigator.banned.title}", "${navigator.banned.text}");
                _loc2_.show();
                break;
            case 4:
                _loc2_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${navigator.blocked.title}", "${navigator.blocked.text}");
                _loc2_.show();
                break;
            default:
                _loc2_ = new SimpleAlertView(castTo(this._navigator.legacyNavigator, LegacyNavigator), "${room.queue.error.title}", "${room.queue.error.title}");
                _loc2_.show();
        }
        castTo(this._navigator.legacyNavigator, LegacyNavigator).send(new QuitMessageComposer());
        let _loc4_: HabboToolbarEvent = new HabboToolbarEvent("HTE_TOOLBAR_CLICK");
        _loc4_.iconId = "HTIE_ICON_RECEPTION";
        castTo(this._navigator.legacyNavigator, LegacyNavigator).toolbar.events.dispatchEvent(_loc4_);
    };
}
