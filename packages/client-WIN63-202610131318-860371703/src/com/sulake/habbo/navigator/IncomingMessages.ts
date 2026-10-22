import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { GuestRoomSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultData';
import type { PopularRoomTagsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularRoomTagsData';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { CanCreateRoomEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CanCreateRoomEventMessageParser';
import type { CanCreateRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CanCreateRoomMessageParser';
import type { CategoriesWithVisitorCountParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CategoriesWithVisitorCountParser';
import type { ConvertedRoomIdMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/ConvertedRoomIdMessageParser';
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
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { CantConnectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/CantConnectMessageParser';
import type { FlatAccessibleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/FlatAccessibleMessageParser';
import type { RoomForwardMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomForwardMessageParser';
import type { BannedUsersFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/BannedUsersFromRoomParser';
import type { FlatControllerAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerAddedMessageParser';
import type { FlatControllerRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerRemovedMessageParser';
import type { FlatControllersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllersMessageParser';
import type { MuteAllInRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/MuteAllInRoomParser';
import type { RoomSettingsDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsDataMessageParser';
import type { RoomSettingsErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsErrorMessageParser';
import type { RoomSettingsSavedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSavedMessageParser';
import type { RoomSettingsSaveErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/RoomSettingsSaveErrorMessageParser';
import type { ShowEnforceRoomCategoryDialogParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/ShowEnforceRoomCategoryDialogParser';
import type { UserUnbannedFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/UserUnbannedFromRoomParser';
import type { ScrSendUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendUserInfoMessageParser';
import type { NavigatorData } from '@/com/sulake/habbo/navigator/domain/NavigatorData';
import type { RoomSessionTags } from '@/com/sulake/habbo/navigator/domain/RoomSessionTags';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { NoOwnedRoomsAlertMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/NoOwnedRoomsAlertMessageEvent';
import { FriendListFragmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListFragmentMessageEvent';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { Game2GameStartedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameStartedMessageEvent';
import { GenericErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/GenericErrorEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { CanCreateRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CanCreateRoomEvent';
import { CanCreateRoomEventEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CanCreateRoomEventEvent';
import { CategoriesWithVisitorCountEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CategoriesWithVisitorCountEvent';
import { CompetitionRoomsDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsDataMessageEvent';
import { ConvertedRoomIdEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ConvertedRoomIdEvent';
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
import { RoomFilterSettingsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/RoomFilterSettingsMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CantConnectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CantConnectMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { FlatAccessibleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/FlatAccessibleMessageEvent';
import { RoomForwardMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomForwardMessageEvent';
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
import { ShowEnforceRoomCategoryDialogEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/ShowEnforceRoomCategoryDialogEvent';
import { UserUnbannedFromRoomEvent } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/UserUnbannedFromRoomEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { FollowFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FollowFriendMessageComposer';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { GetUserEventCatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetUserEventCatsMessageComposer';
import { GetUserFlatCatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetUserFlatCatsMessageComposer';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';
import { HabboComponentFlags } from '@/com/sulake/habbo/configuration/enum/HabboComponentFlags';
import { Logger } from '@/com/sulake/habbo/Logger';
import { AlertView } from '@/com/sulake/habbo/navigator/AlertView';
import { ClubPromoAlertView } from '@/com/sulake/habbo/navigator/ClubPromoAlertView';
import { RoomsTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/RoomsTabPageDecorator';
import { SimpleAlertView } from '@/com/sulake/habbo/navigator/SimpleAlertView';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class IncomingMessages {
    static { registerClassName(this, 'com.sulake.habbo.navigator::IncomingMessages'); }

    declare private _navigator: HabboNavigator;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        let _loc2_: IHabboCommunicationManager = this._navigator.communication;
        _loc2_.addHabboConnectionMessageEvent(new GetGuestRoomResultEvent(this.onRoomInfo));
        _loc2_.addHabboConnectionMessageEvent(new RoomRatingEvent(this.onRoomRating));
        _loc2_.addHabboConnectionMessageEvent(new FlatControllerRemovedEvent(this.onFlatControllerRemoved));
        _loc2_.addHabboConnectionMessageEvent(new PopularRoomTagsResultEvent(this.onPopularRoomTagsResult));
        _loc2_.addHabboConnectionMessageEvent(new RoomSettingsSaveErrorEvent(this.onRoomSettingsSaveError));
        _loc2_.addHabboConnectionMessageEvent(new UserFlatCatsEvent(this.onUserFlatCats));
        _loc2_.addHabboConnectionMessageEvent(new MuteAllInRoomEvent(this.onMuteAllEvent));
        _loc2_.addHabboConnectionMessageEvent(new FriendListFragmentMessageEvent(this.onFriendsListFragment));
        _loc2_.addHabboConnectionMessageEvent(new CanCreateRoomEvent(this.onCanCreateRoom));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameStartedMessageEvent(this.onGameStarted));
        _loc2_.addHabboConnectionMessageEvent(new DoorbellMessageEvent(this.onDoorbell));
        _loc2_.addHabboConnectionMessageEvent(new ShowEnforceRoomCategoryDialogEvent(this.onEnforceRoomCategorySelection));
        _loc2_.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        _loc2_.addHabboConnectionMessageEvent(new FlatCreatedEvent(this.onFlatCreated));
        _loc2_.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        _loc2_.addHabboConnectionMessageEvent(new RoomInfoUpdatedEvent(this.onRoomInfoUpdated));
        _loc2_.addHabboConnectionMessageEvent(new CanCreateRoomEventEvent(this.onCanCreateRoomEventEvent));
        _loc2_.addHabboConnectionMessageEvent(new RoomSettingsDataEvent(this.onRoomSettingsData));
        _loc2_.addHabboConnectionMessageEvent(new NavigatorSettingsEvent(this.onNavigatorSettings));
        _loc2_.addHabboConnectionMessageEvent(new RoomEventEvent(this.onRoomEventEvent));
        _loc2_.addHabboConnectionMessageEvent(new FlatControllerAddedEvent(this.onFlatControllerAdded));
        _loc2_.addHabboConnectionMessageEvent(new BannedUsersFromRoomEvent(this.onBannedUsersFromRoom));
        _loc2_.addHabboConnectionMessageEvent(new FriendListUpdateEvent(this.onFriendListUpdate));
        _loc2_.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
        _loc2_.addHabboConnectionMessageEvent(new GenericErrorEvent(this.onError));
        _loc2_.addHabboConnectionMessageEvent(new RoomSettingsSavedEvent(this.onRoomSettingsSaved));
        _loc2_.addHabboConnectionMessageEvent(new FlatAccessibleMessageEvent(this.onDoorOpened));
        _loc2_.addHabboConnectionMessageEvent(new FlatControllersEvent(this.onFlatControllers));
        _loc2_.addHabboConnectionMessageEvent(new NoSuchFlatEvent(this.onNoSuchFlat));
        _loc2_.addHabboConnectionMessageEvent(new FlatAccessDeniedMessageEvent(this.onFlatAccessDenied));
        _loc2_.addHabboConnectionMessageEvent(new OfficialRoomsEvent(this.onOfficialRooms));
        _loc2_.addHabboConnectionMessageEvent(new FavouriteChangedEvent(this.onFavouriteChanged));
        _loc2_.addHabboConnectionMessageEvent(new UserEventCatsEvent(this.onUserEventCats));
        _loc2_.addHabboConnectionMessageEvent(new RoomFilterSettingsMessageEvent(this.onRoomFilterSettings));
        _loc2_.addHabboConnectionMessageEvent(new RoomSettingsErrorEvent(this.onRoomSettingsError));
        _loc2_.addHabboConnectionMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit));
        _loc2_.addHabboConnectionMessageEvent(new GuestRoomSearchResultEvent(this.onGuestRoomSearchResult));
        _loc2_.addHabboConnectionMessageEvent(new UserUnbannedFromRoomEvent(this.onUserUnbannedFromRoom));
        _loc2_.addHabboConnectionMessageEvent(new NoOwnedRoomsAlertMessageEvent(this.onNoOwnedRoomsAlert));
        _loc2_.addHabboConnectionMessageEvent(new RoomForwardMessageEvent(this.onRoomForward));
        _loc2_.addHabboConnectionMessageEvent(new FavouritesEvent(this.onFavourites));
        _loc2_.addHabboConnectionMessageEvent(new CompetitionRoomsDataMessageEvent(this.onCompetitionData));
        _loc2_.addHabboConnectionMessageEvent(new CantConnectMessageEvent(this.onCantConnect));
        _loc2_.addHabboConnectionMessageEvent(new ScrSendUserInfoEvent(this.onSubscriptionInfo));
        _loc2_.addHabboConnectionMessageEvent(new RoomEventCancelEvent(this.onRoomEventCancel));
        _loc2_.addHabboConnectionMessageEvent(new ConvertedRoomIdEvent(this.onConvertedRoomId));
        _loc2_.addHabboConnectionMessageEvent(new CategoriesWithVisitorCountEvent(this.onCategoriesWithUserCount));
    }

    public get data(): NavigatorData {
        return this._navigator.data;
    }

    private onMuteAllEvent = (param1: IMessageEvent): void => {
        let _loc4_: MuteAllInRoomEvent = param1 instanceof MuteAllInRoomEvent ? param1 : null;
        let _loc3_: MuteAllInRoomParser = _loc4_.getParser();
        let _loc2_: GuestRoomData = this._navigator.data.enteredGuestRoom;
        if (_loc2_ != null) {
            _loc2_.allInRoomMuted = _loc3_.allMuted;
            if (this._navigator.roomInfoViewCtrl != null) {
                this._navigator.roomInfoViewCtrl.refreshButtons(this._navigator.data.enteredGuestRoom);
            }
        }
    };

    private onNoSuchFlat = (param1: IMessageEvent): void => {
    };

    private onUserObject = (param1: IMessageEvent): void => {
        let _loc2_: UserObjectMessageParser = castTo(param1, UserObjectEvent).getParser();
        this.data.avatarId = _loc2_.id;
        this._navigator.send(new GetUserFlatCatsMessageComposer());
        this._navigator.send(new GetUserEventCatsMessageComposer());
    };

    private onUserRights = (param1: IMessageEvent): void => {
        let _loc2_: UserRightsMessageEvent = castTo(param1, UserRightsMessageEvent);
        if (_loc2_.securityLevel >= 5) {
            this._navigator.data.eventMod = true;
        }
        if (_loc2_.securityLevel >= 7) {
            this._navigator.data.roomPicker = true;
        }
    };

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
        Logger.log("Received GuestRoomSearch: " + this.data.guestRoomSearchResults.rooms.length);
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
        this._navigator.roomEventInfoCtrl.refresh();
    };

    private onRoomEventCancel = (param1: IMessageEvent): void => {
        this.data.roomEventData = null;
        this._navigator.roomEventInfoCtrl.refresh();
    };

    private onCanCreateRoomEventEvent = (param1: IMessageEvent): void => {
        let _loc3_: SimpleAlertView = null;
        let _loc2_: CanCreateRoomEventMessageParser = castTo(param1, CanCreateRoomEventEvent).getParser();
        Logger.log("CAN CREATE EVENT: " + _loc2_.canCreateEvent);
        if (_loc2_.canCreateEvent) {
            this._navigator.roomEventViewCtrl.show();
        } else {
            _loc3_ = new SimpleAlertView(this._navigator, "${navigator.cannotcreateevent.title}", "${navigator.cannotcreateevent.error." + _loc2_.errorCode + "}");
            _loc3_.show();
            Logger.log("Cannot create an event just now...");
        }
    };

    private onRoomEnter = (param1: IMessageEvent): void => {
        let _loc2_: RoomEntryInfoMessageParser = castTo(param1, RoomEntryInfoMessageEvent).getParser();
        Logger.log("Navigator: entering room");
        this.data.onRoomEnter(_loc2_);
        this.closeOpenCantConnectAlerts();
        this._navigator.roomInfoViewCtrl.close();
        this._navigator.send(new GetGuestRoomMessageComposer(_loc2_.guestRoomId, true, false));
        Logger.log("Sent get guest room...");
        this._navigator.roomEventInfoCtrl.refresh();
        this._navigator.roomEventViewCtrl.close();
        this._navigator.roomSettingsCtrl.close();
        this._navigator.roomFilterCtrl.close();
        HabboWebTools.closeNews();
    };

    private onRoomInfo = (param1: IMessageEvent): void => {
        let _loc3_: boolean = false;
        let _loc4_: RoomSessionTags = null;
        let _loc2_: GetGuestRoomResultMessageParser = castTo(param1, GetGuestRoomResultEvent).getParser();
        Logger.log("Got room info: " + _loc2_.enterRoom + ", " + _loc2_.roomForward);
        if (_loc2_.enterRoom) {
            this.data.enteredRoom = _loc2_.data;
            this.data.currentRoomIsStaffPick = _loc2_.staffPick;
            _loc3_ = this.data.createdFlatId == _loc2_.data.flatId;
            if (!_loc3_ && _loc2_.data.displayRoomEntryAd) {
                this.requestRoomEnterAd();
            }
            this.data.createdFlatId = 0;
            if (this.data.enteredGuestRoom != null && this.data.enteredGuestRoom.habboGroupId > 0) {
                this._navigator.roomEventInfoCtrl.expanded = false;
                this._navigator.roomEventInfoCtrl.refresh();
            }
            _loc4_ = this._navigator.data.getAndResetSessionTags();
            if (_loc4_ != null) {
                this._navigator.send(_loc4_.getMsg());
            }
        } else if (_loc2_.roomForward) {
            if (_loc2_.openingConnection) {
                this._navigator.goToRoom(_loc2_.data.flatId, false, "", -1, true);
            } else if (_loc2_.data.doorMode == 1 && (!_loc2_.isGroupMember && this._navigator.sessionData.userName != _loc2_.data.ownerName)) {
                this._navigator.doorbell.show(_loc2_.data);
            } else if (_loc2_.data.doorMode == 2 && (this._navigator.sessionData.userName != _loc2_.data.ownerName && !_loc2_.isGroupMember)) {
                this._navigator.passwordInput.show(_loc2_.data);
            } else {
                if (_loc2_.data.doorMode == 4 && !this._navigator.sessionData.isAmbassador && !this._navigator.sessionData.isRealNoob && !this._navigator.sessionData.isAnyRoomController) {
                    return;
                }
                this._navigator.goToRoom(_loc2_.data.flatId, false);
            }
        } else {
            this.data.enteredRoom = _loc2_.data;
            this.data.currentRoomIsStaffPick = _loc2_.staffPick;
            this._navigator.roomInfoViewCtrl.reload();
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
        this._navigator.goToRoom(_loc2_.flatId, true);
        this._navigator.mainViewCtrl.reloadRoomList(5);
        this._navigator.goToMainView();
        this._navigator.closeNavigator();
    };

    private onGameStarted = (param1: IMessageEvent): void => {
        this._navigator.mainViewCtrl.close();
    };

    private onSubscriptionInfo = (param1: IMessageEvent): void => {
        let _loc2_: ScrSendUserInfoMessageParser = castTo(param1, ScrSendUserInfoEvent).getParser();
        Logger.log("Got subscription info: " + _loc2_.productName + ", " + _loc2_.daysToPeriodEnd + ", " + _loc2_.memberPeriods + ", " + _loc2_.periodsSubscribedAhead + ", " + _loc2_.responseType);
        this.data.hcMember = _loc2_.daysToPeriodEnd > 0;
    };

    private onRoomForward = (param1: IMessageEvent): void => {
        let _loc2_: RoomForwardMessageParser = castTo(param1, RoomForwardMessageEvent).getParser();
        Logger.log("Got room forward: " + _loc2_.roomId);
        this.forwardToRoom(_loc2_.roomId);
    };

    private onConvertedRoomId = (param1: IMessageEvent): void => {
        let _loc2_: ConvertedRoomIdMessageParser = castTo(param1, ConvertedRoomIdEvent).getParser();
        if (this._navigator.webRoomReport) {
            this._navigator.habboHelp.reportRoom(_loc2_.convertedId, this._navigator.webRoomReportedName, "");
        } else {
            Logger.log("Got converted room ID for " + _loc2_.globalId + ", forward to room " + _loc2_.convertedId);
            this.forwardToRoom(_loc2_.convertedId);
        }
    };

    private onNavigatorSettings = (param1: IMessageEvent): void => {
        let _loc6_: boolean = false;
        let _loc4_: boolean = false;
        let _loc7_: number = 0;
        let _loc5_: boolean = false;
        let _loc2_: NavigatorSettingsMessageParser = castTo(param1, NavigatorSettingsEvent).getParser();
        Logger.log("Got navigator settings: " + _loc2_.homeRoomId);
        let _loc3_: boolean = !this._navigator.data.settingsReceived;
        this._navigator.data.homeRoomId = _loc2_.homeRoomId;
        this._navigator.data.settingsReceived = true;
        this._navigator.mainViewCtrl.refresh();
        let _loc8_: number = -1;
        let _loc9_: number = -1;
        if (_loc3_ && !HabboComponentFlags.isRoomViewerMode(this._navigator.flags | 0)) {
            _loc6_ = false;
            _loc4_ = false;
            if (this._navigator.propertyExists("friend.id")) {
                _loc8_ = 0;
                this._navigator.send(new FollowFriendMessageComposer(Number(this._navigator.getProperty("friend.id")) | 0));
            }
            if (this._navigator.propertyExists("forward.type") && this._navigator.propertyExists("forward.id")) {
                _loc8_ = Number(this._navigator.getProperty("forward.type")) | 0;
                _loc9_ = Number(this._navigator.getProperty("forward.id")) | 0;
            }
            _loc4_ = _loc2_.roomIdToEnter <= 0;
            if (_loc8_ == 2) {
                Logger.log("Guest room forward on enter: " + _loc9_);
                this.forwardToRoom(_loc9_);
            } else if (_loc8_ == -1) {
                if (!_loc4_) {
                    _loc7_ = _loc2_.roomIdToEnter;
                    if (_loc7_ != this._navigator.data.homeRoomId) {
                        this._navigator.goToRoom(_loc7_, true);
                    } else {
                        _loc5_ = this._navigator.goToHomeRoom();
                        if (!_loc5_) {
                            _loc6_ = true;
                        }
                    }
                }
            }
            if (_loc6_ && !this._navigator.mainViewCtrl.isOpen()) {
                this._navigator.mainViewCtrl.onNavigatorToolBarIconClick();
            }
        } else {
            this._navigator.roomInfoViewCtrl.reload();
        }
    };

    private onRoomExit = (param1: IMessageEvent): void => {
        Logger.log("Navigator: exiting room");
        this.data.onRoomExit();
        this._navigator.roomInfoViewCtrl.close();
        this._navigator.roomEventInfoCtrl.close();
        this._navigator.roomEventViewCtrl.close();
        this._navigator.roomSettingsCtrl.close();
        this._navigator.roomFilterCtrl.close();
        let _loc2_: boolean = this._navigator.getBoolean("news.auto_popup.enabled");
        if (_loc2_) {
            HabboWebTools.openNews();
        }
    };

    private onUserFlatCats = (param1: IMessageEvent): void => {
        let _loc3_: UserFlatCatsMessageParser = (param1 instanceof UserFlatCatsEvent ? param1 : null).getParser();
        this._navigator.data.categories = _loc3_.nodes;
        let _loc2_: RoomsTabPageDecorator = castTo(this._navigator.tabs.getTab(2).tabPageDecorator, RoomsTabPageDecorator);
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
            this._navigator.roomSettingsCtrl.onRoomSettings(_loc2_.data);
            Logger.log("GOT ROOM SETTINGS DATA: " + _loc2_.data.name + ", " + _loc2_.data.maximumVisitors + ", " + _loc2_.data.maximumVisitorsLimit);
        } catch (e) {
            Logger.log("CRASHED WHILE PROCESSING ROOM SETTINGS DATA!");
        }
    };

    private onRoomFilterSettings = (param1: IMessageEvent): void => {
        let _loc2_: RoomFilterSettingsMessageParser = (param1 instanceof RoomFilterSettingsMessageEvent ? param1 : null).getParser();
        this._navigator.roomFilterCtrl.onRoomFilterSettings(_loc2_.badWords);
        Logger.log("GOT ROOM FILTER SETTINGS: " + _loc2_.badWords);
    };

    private onRoomSettingsError = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsErrorMessageParser = (param1 instanceof RoomSettingsErrorEvent ? param1 : null).getParser();
    };

    private onRoomSettingsSaved = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsSavedMessageParser = (param1 instanceof RoomSettingsSavedEvent ? param1 : null).getParser();
        ErrorReportStorage.addDebugData("IncomingEvent", "Room settings saved: " + _loc2_.roomId);
        this._navigator.mainViewCtrl.reloadRoomList(5);
    };

    private onRoomSettingsSaveError = (param1: IMessageEvent): void => {
        let _loc2_: RoomSettingsSaveErrorMessageParser = (param1 instanceof RoomSettingsSaveErrorEvent ? param1 : null).getParser();
        this._navigator.roomSettingsCtrl.onRoomSettingsSaveError(_loc2_.roomId, _loc2_.errorCode, _loc2_.info);
    };

    private onRoomInfoUpdated = (param1: IMessageEvent): void => {
        let _loc2_: RoomInfoUpdatedMessageParser = (param1 instanceof RoomInfoUpdatedEvent ? param1 : null).getParser();
        Logger.log("ROOM UPDATED: " + _loc2_.flatId);
        this._navigator.send(new GetGuestRoomMessageComposer(_loc2_.flatId, false, false));
    };

    private onFavourites = (param1: IMessageEvent): void => {
        let _loc2_: FavouritesMessageParser = (param1 instanceof FavouritesEvent ? param1 : null).getParser();
        this._navigator.data.onFavourites(_loc2_);
    };

    private onFavouriteChanged = (param1: IMessageEvent): void => {
        let _loc2_: FavouriteChangedMessageParser = (param1 instanceof FavouriteChangedEvent ? param1 : null).getParser();
        Logger.log("Received favourite changed: " + _loc2_.flatId + ", " + _loc2_.added);
        this._navigator.data.favouriteChanged(_loc2_.flatId, _loc2_.added);
        this._navigator.roomInfoViewCtrl.reload();
        this._navigator.mainViewCtrl.refresh();
    };

    private onCanCreateRoom = (param1: IMessageEvent): void => {
        let _loc2_: AlertView = null;
        let _loc3_: CanCreateRoomMessageParser = (param1 instanceof CanCreateRoomEvent ? param1 : null).getParser();
        Logger.log("Can create room: " + _loc3_.resultCode + ", " + _loc3_.roomLimit);
        if (_loc3_.resultCode == 0) {
            this._navigator.roomCreateViewCtrl.show();
        } else {
            this._navigator.registerParameter("navigator.createroom.limitreached", "limit", "" + _loc3_.roomLimit);
            if (this._navigator.sessionData.hasVip) {
                _loc2_ = new SimpleAlertView(this._navigator, "${navigator.createroom.error}", "${navigator.createroom.limitreached}");
            } else {
                _loc2_ = new ClubPromoAlertView(this._navigator, "${navigator.createroom.error}", "${navigator.createroom.limitreached}", "${navigator.createroom.vippromo}");
            }
            _loc2_.show();
        }
    };

    private onFlatControllers = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllersMessageParser = (param1 instanceof FlatControllersEvent ? param1 : null).getParser();
        Logger.log("Got flat controllers: " + _loc2_.roomId + ", " + _loc2_.controllers.length);
        this._navigator.roomSettingsCtrl.onFlatControllers(_loc2_.roomId, _loc2_.controllers);
    };

    private onFlatControllerAdded = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllerAddedMessageParser = (param1 instanceof FlatControllerAddedEvent ? param1 : null).getParser();
        Logger.log("Flat controller added: " + _loc2_.flatId + ", " + _loc2_.data.userId + ", " + _loc2_.data.userName);
        this._navigator.roomSettingsCtrl.onFlatControllerAdded(_loc2_.flatId, _loc2_.data);
    };

    private onFlatControllerRemoved = (param1: IMessageEvent): void => {
        let _loc2_: FlatControllerRemovedMessageParser = (param1 instanceof FlatControllerRemovedEvent ? param1 : null).getParser();
        Logger.log("Flat controller removed: " + _loc2_.flatId + ", " + _loc2_.userId);
        this._navigator.roomSettingsCtrl.onFlatControllerRemoved(_loc2_.flatId, _loc2_.userId);
    };

    private onBannedUsersFromRoom = (param1: IMessageEvent): void => {
        let _loc2_: BannedUsersFromRoomParser = (param1 instanceof BannedUsersFromRoomEvent ? param1 : null).getParser();
        Logger.log("Got Banned users for room: " + _loc2_.roomId + ", " + _loc2_.bannedUsers.length);
        this._navigator.roomSettingsCtrl.onBannedUsersFromRoom(_loc2_.roomId, _loc2_.bannedUsers);
    };

    private onUserUnbannedFromRoom = (param1: IMessageEvent): void => {
        let _loc2_: UserUnbannedFromRoomParser = (param1 instanceof UserUnbannedFromRoomEvent ? param1 : null).getParser();
        Logger.log("User was unbanned from room. User Id: " + _loc2_.userId + " Room Id: " + _loc2_.roomId);
        this._navigator.roomSettingsCtrl.onUserUnbannedFromRoom(_loc2_.roomId, _loc2_.userId);
    };

    private onError = (param1: IMessageEvent): void => {
        let event: IMessageEvent = param1;
        let error: GenericErrorEvent = event instanceof GenericErrorEvent ? event : null;
        if (error == null) {
            return;
        }
        switch (error.getParser().errorCode) {
            case -100002:
                this._navigator.passwordInput.showRetry();
                break;
            case 4009:
                this._navigator.windowManager.alert("${generic.alert.title}", "${navigator.alert.need.to.be.vip}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                break;
            case 4010:
                this._navigator.windowManager.alert("${generic.alert.title}", "${navigator.alert.invalid_room_name}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                break;
            case 4011:
                this._navigator.windowManager.alert("${generic.alert.title}", "${navigator.alert.cannot_perm_ban}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                break;
            case 4013:
                this._navigator.windowManager.alert("${generic.alert.title}", "${navigator.alert.room_in_maintenance}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                break;
            case -100005:
                this._navigator.windowManager.alert("${generic.alert.title}", "${notification.nft_token_required}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
        }
    };

    private onDoorbell = (param1: IMessageEvent): void => {
        let _loc2_: DoorbellMessageEvent = param1 instanceof DoorbellMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.userName != "") {
            return;
        }
        this._navigator.doorbell.showWaiting();
    };

    private onDoorOpened = (param1: IMessageEvent): void => {
        let _loc3_: FlatAccessibleMessageEvent = param1 instanceof FlatAccessibleMessageEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: FlatAccessibleMessageParser = _loc3_.getParser();
        if (_loc2_ != null && (_loc2_.userName == null || _loc2_.userName.length == 0)) {
            this._navigator.doorbell.hide();
        }
    };

    private onRoomRating = (param1: IMessageEvent): void => {
        let _loc2_: RoomRatingMessageParser = (param1 instanceof RoomRatingEvent ? param1 : null).getParser();
        this._navigator.data.currentRoomRating = _loc2_.rating;
        this._navigator.data.canRate = _loc2_.canRate;
        this._navigator.roomInfoViewCtrl.reload();
    };

    private onFlatAccessDenied = (param1: IMessageEvent): void => {
        let _loc2_: FlatAccessDeniedMessageParser = (param1 instanceof FlatAccessDeniedMessageEvent ? param1 : null).getParser();
        if (_loc2_.userName == null || _loc2_.userName == "") {
            this._navigator.doorbell.showNoAnswer();
        }
    };

    private onFriendsListFragment = (param1: IMessageEvent): void => {
        this._navigator.data.friendList.onFriendsListFragment(param1);
    };

    private onFriendListUpdate = (param1: IMessageEvent): void => {
        this._navigator.data.friendList.onFriendListUpdate(param1);
        this._navigator.roomSettingsCtrl.onFriendListUpdate();
    };

    private onCompetitionData = (param1: CompetitionRoomsDataMessageEvent): void => {
        this._navigator.data.competitionRoomsData = param1.getParser().data;
    };

    private forwardToRoom(param1: number): void {
        this._navigator.send(new GetGuestRoomMessageComposer(param1, false, true));
        this._navigator.trackNavigationDataPoint("Room Forward", "go.roomforward", "", param1);
    }

    private onNoOwnedRoomsAlert = (param1: NoOwnedRoomsAlertMessageEvent): void => {
        this._navigator.startRoomCreation();
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
                _loc2_ = new SimpleAlertView(this._navigator, "${navigator.guestroomfull.title}", "${navigator.guestroomfull.text}");
                _loc2_.show();
                break;
            case 2:
                _loc2_ = new SimpleAlertView(this._navigator, "${room.queue.error.title}", "${room.queue.error." + _loc3_.parameter + "}");
                _loc2_.show();
                break;
            case 3:
                _loc2_ = new SimpleAlertView(this._navigator, "${navigator.banned.title}", "${navigator.banned.text}");
                _loc2_.show();
                break;
            case 4:
                _loc2_ = new SimpleAlertView(this._navigator, "${navigator.blocked.title}", "${navigator.blocked.text}");
                _loc2_.show();
                break;
            default:
                _loc2_ = new SimpleAlertView(this._navigator, "${room.queue.error.title}", "${room.queue.error.title}");
                _loc2_.show();
        }
        this._navigator.send(new QuitMessageComposer());
        let _loc4_: HabboToolbarEvent = new HabboToolbarEvent("HTE_TOOLBAR_CLICK");
        _loc4_.iconId = "HTIE_ICON_RECEPTION";
        this._navigator.toolbar.events.dispatchEvent(_loc4_);
    };

    private onEnforceRoomCategorySelection = (param1: IMessageEvent): void => {
        let _loc2_: ShowEnforceRoomCategoryDialogParser = (param1 instanceof ShowEnforceRoomCategoryDialogEvent ? param1 : null).getParser();
        this._navigator.enforceCategoryCtrl.show(_loc2_.selectionType);
    };
}
