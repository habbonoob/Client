import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FriendRequestData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestData';
import type { FriendListUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendListUpdateMessageParser';
import type { FriendNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendNotificationMessageParser';
import type { NewConsoleMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewConsoleMessageMessageParser';
import type { RoomInviteMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteMessageParser';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendRequest } from '@/com/sulake/habbo/friendbar/data/IFriendRequest';
import type { IHabboFriendBarData } from '@/com/sulake/habbo/friendbar/data/IHabboFriendBarData';
import type { FriendRequestEvent } from '@/com/sulake/habbo/friendlist/events/FriendRequestEvent';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { ActiveConversationEvent } from '@/com/sulake/habbo/messenger/events/ActiveConversationEvent';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { FindFriendsProcessResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FindFriendsProcessResultEvent';
import { FriendListFragmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListFragmentMessageEvent';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { FriendNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendNotificationEvent';
import { FriendRequestsEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestsEvent';
import { MessengerInitEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MessengerInitEvent';
import { NewConsoleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewConsoleMessageEvent';
import { NewFriendRequestEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewFriendRequestEvent';
import { RoomInviteEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/RoomInviteEvent';
import { FindNewFriendsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FindNewFriendsMessageComposer';
import { FollowFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FollowFriendMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GetExtendedProfileByNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileByNameMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { FriendEntity } from '@/com/sulake/habbo/friendbar/data/FriendEntity';
import { FriendNotification } from '@/com/sulake/habbo/friendbar/data/FriendNotification';
import { FriendRequest } from '@/com/sulake/habbo/friendbar/data/FriendRequest';
import { ActiveConversationsCountEvent } from '@/com/sulake/habbo/friendbar/events/ActiveConversationsCountEvent';
import { FindFriendsNotificationEvent } from '@/com/sulake/habbo/friendbar/events/FindFriendsNotificationEvent';
import { FriendBarUpdateEvent } from '@/com/sulake/habbo/friendbar/events/FriendBarUpdateEvent';
import { FriendRequestUpdateEvent } from '@/com/sulake/habbo/friendbar/events/FriendRequestUpdateEvent';
import { NewMessageEvent } from '@/com/sulake/habbo/friendbar/events/NewMessageEvent';
import { NotificationEvent } from '@/com/sulake/habbo/friendbar/events/NotificationEvent';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboMessenger } from '@/com/sulake/iid/IIDHabboMessenger';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';

export class HabboFriendBarData extends Component implements IHabboFriendBarData {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.data::HabboFriendBarData'); }

    private static readonly SHOW_OFFLINE_FRIENDS: boolean = false;
    private static readonly SORT_ALPHABETICALLY: boolean = false;
    private static readonly TRACKING_EVENT_CATEGORY: string = "Navigation";
    private static readonly TRACKING_EVENT_TYPE: string = "Friend Bar";
    private static readonly TRACKING_EVENT_ACTION_VISIT: string = "go.friendbar";
    private static readonly TRACKING_EVENT_ACTION_CHAT: string = "chat_btn_click";
    private static readonly TRACKING_EVENT_ACTION_FIND_FRIENDS: string = "find_friends_btn_click";
    public static readonly TRACKING_EVENT_ACTION_PLAY_SNOWSTORM_TAB: string = "play_snowstorm_tab_click";
    public static readonly TRACKING_EVENT_ACTION_PLAY_SNOWSTORM_BUTTON: string = "play_snowstorm_btn_click";
    private static readonly _SafeStr_8760: string = "Toolbar";
    private static readonly _SafeStr_7919: string = "open";
    private static readonly _SafeStr_8490: string = "close";
    private static readonly LEGACY_TRACKING_EVENT_TYPE_FRIENDLIST: string = "FRIENDLIST";
    private static readonly LEGACY_TRACKING_EVENT_TYPE_MESSENGER: string = "MESSENGER";

    declare private _habboCommunicationManager: IHabboCommunicationManager;

    declare private _habboFriendListComponent: IHabboFriendList;

    declare private _habboMessengerComponent: IHabboMessenger;

    declare private _tracking: IHabboTracking;

    declare private _SafeStr_2278: any[];

    declare private _SafeStr_2647: UtilsMap;

    declare private _friendRequests: any[];

    declare private _SafeStr_3679: number;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_2278 = [];
        this._SafeStr_2647 = new UtilsMap();
        this._friendRequests = [];
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboConfigurationManager(), null), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._habboCommunicationManager = param1;
         }), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._habboFriendListComponent = param1;
         }), new ComponentDependency(new IIDHabboMessenger(), (param1: IHabboMessenger): void => {
             this._habboMessengerComponent = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         })]);
    }

    protected override initComponent(): void {
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new FriendListFragmentMessageEvent(this.onFriendsListFragment));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new RoomInviteEvent(this.onRoomInvite));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new NewConsoleMessageEvent(this.onNewConsoleMessage));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new FriendNotificationEvent(this.onFriendNotification));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new FindFriendsProcessResultEvent(this.onFindFriendProcessResult));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new FriendRequestsEvent(this.onFriendRequestList));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new FriendListUpdateEvent(this.onFriendListUpdate));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new MessengerInitEvent(this.onMessengerInitialized));
        this._habboCommunicationManager.addHabboConnectionMessageEvent(new NewFriendRequestEvent(this.onNewFriendRequest));
        this._habboFriendListComponent.events.addEventListener("FRE_ACCEPTED", this.onFriendRequestEvent);
        this._habboFriendListComponent.events.addEventListener("FRE_DECLINED", this.onFriendRequestEvent);
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._habboFriendListComponent != null && !this._habboFriendListComponent.disposed) {
                this._habboFriendListComponent.events.removeEventListener("FRE_ACCEPTED", this.onFriendRequestEvent);
                this._habboFriendListComponent.events.removeEventListener("FRE_DECLINED", this.onFriendRequestEvent);
            }
            this._SafeStr_2278 = null;
            this._SafeStr_2647.dispose();
            this._SafeStr_2647 = null;
            this._friendRequests = null;
            super.dispose();
        }
    }

    public get numFriends(): number {
        return this._SafeStr_2278.length | 0;
    }

    public getFriendAt(param1: number): IFriendEntity {
        return this._SafeStr_2278[param1];
    }

    public getFriendByID(param1: number): IFriendEntity {
        return this._SafeStr_2647.getValue(param1);
    }

    public getFriendByName(param1: string): IFriendEntity {
        for (const _loc2_ of this._SafeStr_2278 ?? []) {
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public setFriendAt(param1: IFriendEntity, param2: number): void {
        let _loc3_: number = this._SafeStr_2278.indexOf(param1);
        if (_loc3_ > -1 && _loc3_ != param2) {
            this._SafeStr_2278.splice(_loc3_, 1);
            this._SafeStr_2278.splice(param2, 0, param1);
            this.events.dispatchEvent(new FriendBarUpdateEvent());
        }
    }

    public get numFriendRequests(): number {
        return (this._friendRequests ? this._friendRequests.length : 0) | 0;
    }

    public getFriendRequestAt(param1: number): IFriendRequest {
        return this._friendRequests ? this._friendRequests[param1] : null;
    }

    public getFriendRequestByID(param1: number): IFriendRequest {
        if (this._friendRequests) {
            for (const _loc2_ of this._friendRequests ?? []) {
                if (_loc2_.id == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public getFriendRequestByName(param1: string): IFriendRequest {
        if (this._friendRequests) {
            for (const _loc2_ of this._friendRequests ?? []) {
                if (_loc2_.name == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public getFriendRequestList(): any[] {
        return this._friendRequests;
    }

    public acceptFriendRequest(param1: number): void {
        this.removeFriendRequest(param1);
        if (this._habboFriendListComponent) {
            if (!this._habboFriendListComponent.disposed) {
                this._habboFriendListComponent.acceptFriendRequest(param1);
            }
        }
    }

    public showProfile(param1: number): void {
        if (this._habboCommunicationManager) {
            if (param1 > 0) {
                this._habboCommunicationManager.connection.send(new GetExtendedProfileMessageComposer(param1));
            } else {
                this._habboCommunicationManager.connection.send(new GetHabboGroupDetailsMessageComposer(Math.abs(param1) | 0, true));
            }
        }
    }

    public showProfileByName(param1: string): void {
        if (this._habboCommunicationManager) {
            this._habboCommunicationManager.connection.send(new GetExtendedProfileByNameMessageComposer(param1));
        }
    }

    public acceptAllFriendRequests(): void {
        this._friendRequests = [];
        this._habboFriendListComponent.acceptAllFriendRequests();
        this.events.dispatchEvent(new FriendRequestUpdateEvent());
    }

    public declineFriendRequest(param1: number): void {
        this.removeFriendRequest(param1);
        if (this._habboFriendListComponent) {
            if (!this._habboFriendListComponent.disposed) {
                this._habboFriendListComponent.declineFriendRequest(param1);
            }
        }
    }

    public declineAllFriendRequests(): void {
        this._friendRequests = [];
        this._habboFriendListComponent.declineAllFriendRequests();
        this.events.dispatchEvent(new FriendRequestUpdateEvent());
    }

    private removeFriendRequest(param1: number): void {
        if (this._friendRequests) {
            for (const _loc2_ of this._friendRequests ?? []) {
                if (_loc2_.id == param1) {
                    this._friendRequests.splice(this._friendRequests.indexOf(_loc2_), 1);
                    this.events.dispatchEvent(new FriendRequestUpdateEvent());
                    return;
                }
            }
        }
    }

    public followToRoom(param1: number): void {
        if (this._habboCommunicationManager) {
            this._habboCommunicationManager.connection.send(new FollowFriendMessageComposer(param1));
            this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Navigation", "Friend Bar", "go.friendbar"));
        }
    }

    public startConversation(param1: number): void {
        if (this._habboMessengerComponent) {
            this._habboMessengerComponent.startConversation(param1);
            this.events.dispatchEvent(new NewMessageEvent(false, param1));
            if (this._habboCommunicationManager) {
                this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Navigation", "Friend Bar", "chat_btn_click"));
            }
        }
    }

    public findNewFriends(): void {
        if (this._habboCommunicationManager) {
            this._habboCommunicationManager.connection.send(new FindNewFriendsMessageComposer());
            this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Navigation", "Friend Bar", "find_friends_btn_click"));
        }
    }

    public openUserTextSearch(): void {
        if (this._habboFriendListComponent.currentTabId() != 3) {
            this._habboFriendListComponent.openFriendSearch();
        } else {
            this._habboFriendListComponent.close();
        }
    }

    public sendGameTabTracking(param1: string): void {
        this.sendEventLogTracking("play_snowstorm_tab_click", param1);
    }

    public sendGameButtonTracking(param1: string): void {
        this.sendEventLogTracking("play_snowstorm_btn_click", param1);
    }

    private sendEventLogTracking(param1: string, param2: string): void {
        if (this._habboCommunicationManager) {
            this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Navigation", "Friend Bar", param1, param2, this.numFriends));
        }
    }

    public toggleFriendList(): void {
        let _loc1_: IWindowContainer = null;
        if (this._habboFriendListComponent) {
            if (!this._habboFriendListComponent.disposed) {
                if (!this._habboFriendListComponent.isOpen()) {
                    if (this._friendRequests.length > 0) {
                        this._habboFriendListComponent.openFriendRequests();
                    } else {
                        this._habboFriendListComponent.openFriendList();
                    }
                } else {
                    _loc1_ = this._habboFriendListComponent.mainWindow;
                    if (_loc1_ != null && WindowToggle.isHiddenByOtherWindows(_loc1_)) {
                        _loc1_.activate();
                        return;
                    }
                    this._habboFriendListComponent.close();
                }
                if (this._habboCommunicationManager) {
                    this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Toolbar", "FRIENDLIST", this._habboFriendListComponent.isOpen() ? "open" : "close"));
                }
            }
        }
    }

    public toggleMessenger(): void {
        if (this._habboMessengerComponent) {
            if (!this._habboMessengerComponent.disposed) {
                this._habboMessengerComponent.toggleMessenger();
                if (this._habboCommunicationManager) {
                    this._habboCommunicationManager.connection.send(new EventLogMessageComposer("Toolbar", "MESSENGER", this._habboMessengerComponent.isOpen() ? "open" : "close"));
                }
            }
        }
    }

    private onMessengerInitialized(param1: IMessageEvent): void {
        if (this._habboMessengerComponent) {
            this._habboMessengerComponent.events.addEventListener("ACCE_changed", this.onUpdateActiveConversationCount);
        }
    }

    private onFriendsListFragment(param1: IMessageEvent): void {
        this.buildFriendList(castTo(param1, FriendListFragmentMessageEvent).getParser().friendFragment);
    }

    private onFriendListUpdate(param1: IMessageEvent): void {
        let _loc2_: FriendEntity = null;
        let _loc6_: any = null;
        let _loc4_: FriendListUpdateMessageParser = castTo(param1, FriendListUpdateEvent).getParser();
        let _loc3_: any[] = _loc4_.removedFriendIds;
        let _loc8_: any[] = _loc4_.updatedFriends;
        let _loc5_: any[] = _loc4_.addedFriends;
        for (const _loc7_ of _loc3_ ?? []) {
            _loc2_ = this._SafeStr_2647.getValue(_loc7_);
            if (_loc2_) {
                this._SafeStr_2647.remove(_loc7_);
                this._SafeStr_2278.splice(this._SafeStr_2278.indexOf(_loc2_), 1);
                this._habboMessengerComponent.closeConversation(_loc7_ | 0);
            }
        }
        for (_loc6_ of _loc8_ ?? []) {
            _loc2_ = this._SafeStr_2647.getValue(_loc6_.id);
            if (_loc2_) {
                if (_loc6_.online) {
                    _loc2_.name = stringOrNull(_loc6_.name);
                    _loc2_.realName = stringOrNull(_loc6_.realName);
                    _loc2_.motto = stringOrNull(_loc6_.motto);
                    _loc2_.gender = _loc6_.gender | 0;
                    _loc2_.online = _loc6_.online;
                    _loc2_.allowFollow = _loc6_.followingAllowed;
                    _loc2_.figure = stringOrNull(_loc6_.figure);
                    _loc2_.categoryId = _loc6_.categoryId | 0;
                    _loc2_.lastAccess = stringOrNull(_loc6_.lastAccess);
                } else {
                    this._SafeStr_2647.remove(_loc6_.id);
                    this._SafeStr_2278.splice(this._SafeStr_2278.indexOf(_loc2_), 1);
                }
            } else if (_loc6_.online) {
                _loc2_ = new FriendEntity(_loc6_.id | 0, stringOrNull(_loc6_.name), stringOrNull(_loc6_.realName), stringOrNull(_loc6_.motto), _loc6_.gender | 0, _loc6_.online, _loc6_.followingAllowed, stringOrNull(_loc6_.figure), _loc6_.categoryId | 0, stringOrNull(_loc6_.lastAccess));
                this._SafeStr_2278.splice(0, 0, _loc2_);
                this._SafeStr_2647.add(_loc2_.id, _loc2_);
            }
        }
        for (_loc6_ of _loc5_ ?? []) {
            if (_loc6_.online) {
                if (this._SafeStr_2647.getValue(_loc6_.id) == null) {
                    _loc2_ = new FriendEntity(_loc6_.id | 0, stringOrNull(_loc6_.name), stringOrNull(_loc6_.realName), stringOrNull(_loc6_.motto), _loc6_.gender | 0, _loc6_.online, _loc6_.followingAllowed, stringOrNull(_loc6_.figure), _loc6_.categoryId | 0, stringOrNull(_loc6_.lastAccess));
                    this._SafeStr_2278.push(_loc2_);
                    this._SafeStr_2647.add(_loc2_.id, _loc2_);
                }
            }
            this.removeFriendRequest(_loc6_.id | 0);
        }
        if (_loc5_.length > 0 || _loc8_.length > 0) {
            this._SafeStr_2278 = this.sortByName(this._SafeStr_2278);
        }
        this.events.dispatchEvent(new FriendBarUpdateEvent());
    }

    private onFindFriendProcessResult(param1: FindFriendsProcessResultEvent): void {
        this.events.dispatchEvent(new FindFriendsNotificationEvent(param1.success));
    }

    private onNewFriendRequest(param1: NewFriendRequestEvent): void {
        let _loc2_: FriendRequestData = null;
        if (this.showFriendRequests) {
            _loc2_ = param1.getParser().req;
            this._friendRequests.push(new FriendRequest(_loc2_.requestId, _loc2_.requesterName, _loc2_.figureString));
            this.events.dispatchEvent(new FriendRequestUpdateEvent());
        }
    }

    private onFriendRequestList(param1: FriendRequestsEvent): void {
        let _loc3_: any[] = null;
        if (this.showFriendRequests) {
            _loc3_ = param1.getParser().reqs;
            for (const _loc2_ of _loc3_ ?? []) {
                this._friendRequests.push(new FriendRequest(_loc2_.requestId | 0, stringOrNull(_loc2_.requesterName), stringOrNull(_loc2_.figureString)));
            }
            this.events.dispatchEvent(new FriendRequestUpdateEvent());
        }
    }

    private onFriendRequestEvent(param1: FriendRequestEvent): void {
        this.removeFriendRequest(param1.requestId);
    }

    private onNewConsoleMessage(param1: NewConsoleMessageEvent): void {
        let _loc2_: NewConsoleMessageMessageParser = param1.getParser();
        this._SafeStr_3679 = _loc2_.chatId | 0;
        let _loc3_: boolean = true;
        if (this._habboMessengerComponent) {
            if (this._habboMessengerComponent.isOpen()) {
                _loc3_ = false;
            }
        }
        if (this._habboFriendListComponent.hasfriendsListInitialized) {
            this.events.dispatchEvent(new NewMessageEvent(_loc3_, this._SafeStr_3679));
        }
        if (_loc3_) {
            this.makeNotification(String(this._SafeStr_3679), -1, null, false, false);
        }
    }

    private onUpdateActiveConversationCount(param1: ActiveConversationEvent): void {
        this.events.dispatchEvent(new ActiveConversationsCountEvent(param1.activeConversationsCount, param1.hasUnread));
    }

    private onRoomInvite(param1: RoomInviteEvent): void {
        let _loc2_: RoomInviteMessageParser = param1.getParser();
        this._SafeStr_3679 = _loc2_.senderId;
        if (this._habboMessengerComponent && !this._habboMessengerComponent.isOpen()) {
            this.events.dispatchEvent(new NewMessageEvent(true, this._SafeStr_3679));
            this.makeNotification(String(this._SafeStr_3679), -1, null, true, false);
        }
    }

    private onFriendNotification(param1: FriendNotificationEvent): void {
        let _loc4_: FriendNotificationMessageParser = param1.getParser();
        let _loc2_: boolean = _loc4_.typeCode != 3;
        let _loc5_: boolean = _loc4_.typeCode != 4;
        let _loc3_: boolean = _loc4_.typeCode != 3;
        this.makeNotification(_loc4_.avatarId, _loc4_.typeCode, _loc4_.message, _loc2_, _loc5_, _loc3_);
    }

    private makeNotification(param1: string, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean = true): void {
        let _loc7_: IFriendEntity = null;
        let _loc8_: FriendNotification = null;
        let _loc9_: any = undefined;
        if (this.showFriendNotifications) {
            _loc7_ = this.getFriendByID(parseInt(param1) | 0);
            if (_loc7_) {
                _loc9_ = _loc7_.notifications;
                for (_loc8_ of valuesOf(_loc9_)) {
                    if (_loc8_.typeCode == param2) {
                        _loc8_.message = param3;
                        _loc8_.viewOnce = param4;
                        break;
                    }
                    _loc8_ = null;
                }
                if (!_loc8_) {
                    _loc8_ = new FriendNotification(param2, param3, param4);
                    _loc9_.push(_loc8_);
                } else if (!param6) {
                    return;
                }
                this.events.dispatchEvent(new NotificationEvent(_loc7_.id, _loc8_));
                if (param5) {
                    this.setFriendAt(_loc7_, 0);
                }
                if (_loc7_.logEventId < 0) {
                    _loc7_.logEventId = _loc7_.getNextLogEventId();
                }
                if (this._tracking) {
                    this._tracking.trackEventLog("FriendBar", FriendNotification.typeCodeToString(param2), "notified", "", _loc7_.logEventId > 0 ? _loc7_.logEventId : 0);
                }
            }
        }
    }

    private buildFriendList(param1: any[]): void {
        let _loc2_: FriendEntity = null;
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.online) {
                _loc2_ = new FriendEntity(_loc3_.id | 0, stringOrNull(_loc3_.name), stringOrNull(_loc3_.realName), stringOrNull(_loc3_.motto), _loc3_.gender | 0, _loc3_.online, _loc3_.followingAllowed, stringOrNull(_loc3_.figure), _loc3_.categoryId | 0, stringOrNull(_loc3_.lastAccess));
                this._SafeStr_2278.push(_loc2_);
                this._SafeStr_2647.add(_loc2_.id, _loc2_);
            }
        }
        this._SafeStr_2278 = this.sortByName(this._SafeStr_2278);
        this.events.dispatchEvent(new FriendBarUpdateEvent());
    }

    private sortByName(param1: any[]): any[] {
        return param1;
    }

    private sortByNameAndOnlineStatus(param1: any[]): any[] {
        let _loc5_: FriendEntity = null;
        let _loc2_: any[] = [];
        let _loc3_: any[] = [];
        let _loc4_: number = param1.length | 0;
        while (_loc4_-- > 0) {
            _loc5_ = param1[_loc4_];
            if (_loc5_.online) {
                _loc2_.push(_loc5_);
            } else {
                _loc3_.push(_loc5_);
            }
        }
        _loc4_ = _loc3_.length | 0;
        while (_loc4_-- > 0) {
            _loc2_.push(_loc3_.pop());
        }
        return _loc2_;
    }

    public get showFriendNotifications(): boolean {
        return this.getBoolean("friendbar.notifications.enabled");
    }

    public get showFriendRequests(): boolean {
        return this.getBoolean("friendbar.requests.enabled");
    }

    protected override initInstanceFields(): void {
        this.onMessengerInitialized = this.onMessengerInitialized.bind(this);
        this.onFriendsListFragment = this.onFriendsListFragment.bind(this);
        this.onFriendListUpdate = this.onFriendListUpdate.bind(this);
        this.onFindFriendProcessResult = this.onFindFriendProcessResult.bind(this);
        this.onNewFriendRequest = this.onNewFriendRequest.bind(this);
        this.onFriendRequestList = this.onFriendRequestList.bind(this);
        this.onFriendRequestEvent = this.onFriendRequestEvent.bind(this);
        this.onNewConsoleMessage = this.onNewConsoleMessage.bind(this);
        this.onUpdateActiveConversationCount = this.onUpdateActiveConversationCount.bind(this);
        this.onRoomInvite = this.onRoomInvite.bind(this);
        this.onFriendNotification = this.onFriendNotification.bind(this);
        this._SafeStr_3679 = 0;
        super.initInstanceFields();
    }
}
