import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { AcceptFriendResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/AcceptFriendResultMessageParser';
import type { FollowFriendFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FollowFriendFailedMessageParser';
import type { FriendRequestsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendRequestsMessageParser';
import type { FriendsListFragmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendsListFragmentMessageParser';
import type { HabboSearchResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/HabboSearchResultMessageParser';
import type { MessengerErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MessengerErrorMessageParser';
import type { MessengerInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MessengerInitMessageParser';
import type { NewFriendRequestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewFriendRequestMessageParser';
import type { RoomInviteErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteErrorMessageParser';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { FriendListTab } from '@/com/sulake/habbo/friendlist/domain/FriendListTab';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { IFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AcceptFriendResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/AcceptFriendResultEvent';
import { FollowFriendFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FollowFriendFailedEvent';
import { FriendListFragmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListFragmentMessageEvent';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { FriendRequestsEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestsEvent';
import { HabboSearchResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/HabboSearchResultEvent';
import { MessengerErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MessengerErrorEvent';
import { MessengerInitEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MessengerInitEvent';
import { NewFriendRequestEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewFriendRequestEvent';
import { RoomInviteErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/RoomInviteErrorEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { FriendListUpdateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FriendListUpdateMessageComposer';
import { GetFriendRequestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/GetFriendRequestsMessageComposer';
import { MessengerInitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/MessengerInitMessageComposer';
import { RequestFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/RequestFriendMessageComposer';
import { SetRelationshipStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/SetRelationshipStatusMessageComposer';
import { FriendRequestQuestCompleteMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/FriendRequestQuestCompleteMessageComposer';
import { AvatarSearchDeps } from '@/com/sulake/habbo/friendlist/domain/AvatarSearchDeps';
import { AvatarSearchResults } from '@/com/sulake/habbo/friendlist/domain/AvatarSearchResults';
import { Friend } from '@/com/sulake/habbo/friendlist/domain/Friend';
import { FriendCategories } from '@/com/sulake/habbo/friendlist/domain/FriendCategories';
import { FriendCategoriesDeps } from '@/com/sulake/habbo/friendlist/domain/FriendCategoriesDeps';
import { FriendCategory } from '@/com/sulake/habbo/friendlist/domain/FriendCategory';
import { FriendListTabs } from '@/com/sulake/habbo/friendlist/domain/FriendListTabs';
import { FriendListTabsDeps } from '@/com/sulake/habbo/friendlist/domain/FriendListTabsDeps';
import { FriendRequest } from '@/com/sulake/habbo/friendlist/domain/FriendRequest';
import { FriendRequests } from '@/com/sulake/habbo/friendlist/domain/FriendRequests';
import { FriendRequestsDeps } from '@/com/sulake/habbo/friendlist/domain/FriendRequestsDeps';
import { FriendListLaf } from '@/com/sulake/habbo/friendlist/FriendListLaf';
import { FriendListView } from '@/com/sulake/habbo/friendlist/FriendListView';
import { isIFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';
import { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import { OpenedToWebPopup } from '@/com/sulake/habbo/friendlist/OpenedToWebPopup';
import { SearchView } from '@/com/sulake/habbo/friendlist/SearchView';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboMessenger } from '@/com/sulake/iid/IIDHabboMessenger';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboFriendList extends Component implements IHabboFriendList, IAvatarImageListener, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::HabboFriendList'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboFriendList.#initStatics();
        return HabboFriendList._log;
    }

    public static readonly AVATAR_FACE_NAME: string = "face";

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._categories = new FriendCategories(new FriendCategoriesDeps(this));
        this._avatarSearchResults = new AvatarSearchResults(new AvatarSearchDeps(this));
        this._laf = new FriendListLaf();
    }

    declare private _communication: IHabboCommunicationManager;

    declare private _sessionData: ISessionDataManager;

    declare private _laf: FriendListLaf;

    declare private _tabs: FriendListTabs;

    declare private _view: FriendListView;

    declare private _openedToWebPopup: OpenedToWebPopup;

    declare private _avatarId: number;

    declare private _friendRequests: FriendRequests;

    declare private _avatarSearchResults: AvatarSearchResults;

    declare private _SafeStr_3181: Timer;

    declare private _SafeStr_6724: number;

    declare private _hasfriendsListInitialized: boolean;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communication = param1;
            }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
                this._tracking = param1;
            }), new ComponentDependency(new IIDHabboMessenger(), (param1: IHabboMessenger): void => {
                this._messenger = param1;
            }, false), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
                this._avatarManager = param1;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localization = param1;
            }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
                this._notifications = param1;
            }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
                this._windowManager = param1;
            }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionData = param1;
            })]);
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _messenger: IHabboMessenger;

    public get messenger(): IHabboMessenger {
        return this._messenger;
    }

    declare private _localization: IHabboLocalizationManager;

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    declare private _avatarManager: IAvatarRenderManager;

    public get avatarManager(): IAvatarRenderManager {
        return this._avatarManager;
    }

    declare private _tracking: IHabboTracking;

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    declare public _categories: FriendCategories;

    public get categories(): FriendCategories {
        return this._categories;
    }

    declare private _notifications: IHabboNotifications;

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    declare private _lastRoomInvitationTime: number;

    public get lastRoomInvitationTime(): any {
        return this._lastRoomInvitationTime;
    }

    public get hasfriendsListInitialized(): boolean {
        return this._hasfriendsListInitialized;
    }

    public get friendRequests(): FriendRequests {
        return this._friendRequests;
    }

    public get searchResults(): AvatarSearchResults {
        return this._avatarSearchResults;
    }

    public get view(): FriendListView {
        return this._view;
    }

    public get tabs(): FriendListTabs {
        return this._tabs;
    }

    public get laf(): FriendListLaf {
        return this._laf;
    }

    public get avatarId(): number {
        return this._avatarId;
    }

    public get mainWindow(): IWindowContainer {
        if (this._view == null) {
            return null;
        }
        return this._view.mainWindow;
    }

    public get linkPattern(): string {
        return "friendlist/";
    }

    protected override initComponent(): void {
        this._communication.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
        this._communication.addHabboConnectionMessageEvent(new MessengerInitEvent(this.onMessengerInit));
        this._communication.addHabboConnectionMessageEvent(new FriendListFragmentMessageEvent(this.onFriendsListFragment));
        this.context.addLinkEventTracker(this);
        this.send(new MessengerInitMessageComposer());
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.context.removeLinkEventTracker(this);
        if (this._SafeStr_3181) {
            this._SafeStr_3181.stop();
            this._SafeStr_3181.removeEventListener("timer", this.sendFriendListUpdate);
            this._SafeStr_3181 = null;
        }
        super.dispose();
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        if (this._tracking != null) {
            this._tracking.trackGoogle(param1, param2, param3);
        }
    }

    public openHabboWebPage(param1: string, param2: Map<any, any>, param3: number, param4: number): void {
        let _loc6_: string = this.getProperty(param1, param2);
        let _loc5_: string = "habboMain";
        try {
            HabboWebTools.navigateToURL(_loc6_, _loc5_);
        } catch (e) {
            HabboFriendList._log.error("GOT ERROR: " + e);
        }
        if (this._openedToWebPopup == null) {
            this._openedToWebPopup = new OpenedToWebPopup(this);
        }
        this._openedToWebPopup.show(param3, param4);
    }

    public getText(param1: string): string {
        return this._localization.getLocalization(param1);
    }

    public registerParameter(param1: string, param2: string, param3: string): void {
        this._localization.registerParameter(param1, param2, param3);
    }

    public showLimitReachedAlert(): void {
        this.registerParameter("friendlist.listfull.text", "mylimit", "" + this.friendRequests.limit);
        this.registerParameter("friendlist.listfull.text", "clublimit", "" + this.friendRequests.clubLimit);
        this.simpleAlert("${friendlist.listfull.title}", "${friendlist.listfull.text}");
    }

    public showFriendRequestSentAlert(param1: string): void {
        this.registerParameter("friendlist.friendrequestsent.text", "user_name", param1);
        this.simpleAlert("${friendlist.friendrequestsent.title}", "${friendlist.friendrequestsent.text}");
    }

    public getFriend(param1: number): IFriend {
        if (this._view == null) {
            HabboFriendList._log.warn("Cannot process getFriend. Friendlist not initialized.");
            return null;
        }
        return this._categories.findFriend(param1);
    }

    public canBeAskedForAFriend(param1: number): boolean {
        if (this._view == null) {
            HabboFriendList._log.warn("Cannot process canBeAskedForAFriend. Friendlist not initialized.");
            return false;
        }
        return this.getFriend(param1) == null && !this.searchResults.isFriendRequestSent(param1) && this.categories.getFriendCount(false) < this.friendRequests.limit;
    }

    public askForAFriend(param1: number, param2: string): boolean {
        if (this._view == null) {
            HabboFriendList._log.warn("Cannot ask for friend. Friendlist not initialized.");
            return false;
        }
        if (this.searchResults.isFriendRequestSent(param1)) {
            return true;
        }
        if (!this.canBeAskedForAFriend(param1)) {
            return false;
        }
        this.send(new RequestFriendMessageComposer(param2));
        this.searchResults.setFriendRequestSent(param1);
        this.send(new FriendRequestQuestCompleteMessageComposer());
        return true;
    }

    public openFriendList(): void {
        this.openFriendListWithTab(1);
    }

    public openFriendRequests(): void {
        this.openFriendListWithTab(2);
    }

    public openFriendSearch(): void {
        this.openFriendListWithTab(3);
        castTo(this._tabs.findTab(3).tabView, SearchView).focus();
    }

    public close(): void {
        if (this._view) {
            this._view.close();
        }
    }

    public alignBottomLeftTo(param1: Point): void {
        if (this._view) {
            this._view.alignBottomLeftTo(param1);
        }
    }

    public isOpen(): boolean {
        if (this._view) {
            return this._view.isOpen();
        }
        return false;
    }

    public currentTabId(): number {
        if (this._view == null || !this._view.isOpen()) {
            return 0;
        }
        return this._SafeStr_6724;
    }

    public getFriendCount(param1: boolean, param2: boolean): number {
        if (this._view == null) {
            HabboFriendList._log.warn("Cannot get friend count. Friendlist not initialized.");
            return 0;
        }
        return this._categories.getFriendCount(param1, param2);
    }

    public getButton(param1: string, param2: string, param3: (...args: any[]) => any, param4: number = 0, param5: number = 0, param6: number = 0): IBitmapWrapperWindow {
        let _loc8_: BitmapData = this.getButtonImage(param2);
        let _loc7_: IBitmapWrapperWindow = asGuarded(this._windowManager.createWindow(param1, "", 21, 0, (1 | 0x10) >>> 0, new Rectangle(param4, param5, _loc8_.width, _loc8_.height), param3, param6 >>> 0), isIBitmapWrapperWindow);
        _loc7_.bitmap = _loc8_;
        return _loc7_;
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc3_: IAsset = this.assets.getAssetByName(param1 + "_xml");
        let _loc2_: XmlAsset = castTo(_loc3_, XmlAsset);
        return this._windowManager.buildFromXML(XML.from(_loc2_.content));
    }

    public isMessagesPersisted(): boolean {
        return this.getBoolean("friend_list.persistent_message_status.enabled");
    }

    public getSmallGroupBadgeBitmap(param1: string): BitmapData {
        if (this._sessionData) {
            return this._sessionData.getGroupBadgeSmallImage(param1);
        }
        return null;
    }

    public getAvatarFaceBitmap(param1: string): BitmapData {
        let _loc3_: boolean = this.getBoolean("zoom.enabled");
        let _loc4_: IAvatarImage = this._avatarManager.createAvatarImage(param1, _loc3_ ? "h" : "sh", null, this);
        if (!_loc4_) {
            return null;
        }
        let _loc2_: BitmapData = HabboFaceFocuser.focusUserFace(_loc4_, "head", 2, _loc3_ ? 0.5 : 1, 20, 20);
        _loc4_.dispose();
        return _loc2_;
    }

    public isEmbeddedMinimailEnabled(): boolean {
        let _loc1_: string = this.getProperty("client.minimail.embed.enabled");
        return _loc1_ == "true";
    }

    public trackFriendListEvent(param1: string): void {
        this.events.dispatchEvent(new Event(param1));
    }

    public simpleAlert(param1: string, param2: string): void {
        this.windowManager.simpleAlert(param1, null, param2);
    }

    public refreshText(param1: IWindowContainer, param2: string, param3: boolean, param4: string): void {
        let _loc5_: IWindow = param1.getChildByName(param2);
        if (!param3) {
            _loc5_.visible = false;
        } else {
            _loc5_.visible = true;
            _loc5_.caption = param4;
        }
    }

    public refreshButton(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any, param5: number): void {
        let _loc6_: IWindow = asGuarded(param1.findChildByName(param2), isIWindow);
        if (!param3) {
            _loc6_.visible = false;
        } else {
            this.prepareButton(_loc6_, param2, param4, param5);
            _loc6_.visible = true;
        }
    }

    public refreshRelationshipRegion(param1: IWindowContainer, param2: string, param3: number, param4: (...args: any[]) => any, param5: number): void {
        let _loc6_: IRegionWindow = castGuarded(param1.findChildByName(param2), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc7_: IStaticBitmapWrapperWindow = castGuarded(_loc6_.findChildByTag("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc8_: string = "relationship_status_none";
        switch (param3 - 1) {
            case 0:
                _loc8_ = "relationship_status_heart";
                break;
            case 1:
                _loc8_ = "relationship_status_smile";
                break;
            case 2:
                _loc8_ = "relationship_status_bobba";
        }
        _loc7_.assetUri = _loc8_;
        _loc7_.visible = true;
        _loc6_.id = param5;
        _loc6_.procedure = param4;
        _loc6_.visible = param5 > 0 && this.getBoolean("relationship.status.enabled");
    }

    public refreshIcon(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any, param5: number): void {
        let _loc6_: IWindow = param1.findChildByName(param2);
        if (!param3) {
            _loc6_.visible = false;
        } else {
            _loc6_.id = param5;
            _loc6_.procedure = param4;
            _loc6_.visible = true;
        }
    }

    public getButtonImage(param1: string): BitmapData {
        let _loc4_: BitmapData = null;
        let _loc5_: IAsset = this.assets.getAssetByName(param1 + "_png");
        let _loc3_: BitmapDataAsset = _loc5_ instanceof BitmapDataAsset ? _loc5_ : null;
        HabboFriendList._log.info("GETTING ASSET: " + param1);
        let _loc2_: BitmapData = asInstanceOf(_loc3_.content, BitmapData);
        HabboFriendList._log.info("GOT ASSET: " + _loc5_ + ", " + _loc2_);
        _loc4_ = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
        _loc4_.draw(_loc2_);
        return _loc4_;
    }

    public resetLastRoomInvitationTime(): void {
        this._lastRoomInvitationTime = getTimer();
    }

    public getFriendNames(): any[] {
        if (this._categories == null) {
            return [];
        }
        return this._categories.getFriendNames();
    }

    public acceptFriendRequest(param1: number): void {
        if (!this._tabs) {
            return;
        }
        let _loc3_: FriendListTab = this._tabs.findTab(2);
        if (!_loc3_) {
            return;
        }
        let _loc2_: IFriendRequestsView = asGuarded(_loc3_.tabView, isIFriendRequestsView);
        if (!_loc2_) {
            return;
        }
        _loc2_.acceptRequest(param1);
    }

    public acceptAllFriendRequests(): void {
        let _loc2_: FriendListTab = this._tabs.findTab(2);
        if (!_loc2_) {
            return;
        }
        let _loc1_: IFriendRequestsView = asGuarded(_loc2_.tabView, isIFriendRequestsView);
        if (!_loc1_) {
            return;
        }
        _loc1_.acceptAllRequests();
    }

    public declineFriendRequest(param1: number): void {
        let _loc3_: FriendListTab = this._tabs.findTab(2);
        if (!_loc3_) {
            return;
        }
        let _loc2_: IFriendRequestsView = asGuarded(_loc3_.tabView, isIFriendRequestsView);
        if (!_loc2_) {
            return;
        }
        _loc2_.declineRequest(param1);
    }

    public declineAllFriendRequests(): void {
        let _loc2_: FriendListTab = this._tabs.findTab(2);
        if (!_loc2_) {
            return;
        }
        let _loc1_: IFriendRequestsView = asGuarded(_loc2_.tabView, isIFriendRequestsView);
        if (!_loc1_) {
            return;
        }
        _loc1_.declineAllRequests();
    }

    public setRelationshipStatus(param1: number, param2: number): void {
        this.send(new SetRelationshipStatusMessageComposer(param1, param2));
    }

    public getRelationshipStatus(param1: number): number {
        let _loc2_: Friend = this._categories.findFriend(param1);
        if (_loc2_) {
            return _loc2_.relationshipStatus;
        }
        return 0;
    }

    public avatarImageReady(param1: string): void {
        let _loc6_: IWindowContainer = null;
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc3_: BitmapData = null;
        if (this.disposed || this._categories == null) {
            return;
        }
        let _loc2_: Map<any, any> = this._categories.getAllFriends();
        if (_loc2_ == null) {
            return;
        }
        for (const _loc4_ of _loc2_?.values() ?? []) {
            if (_loc4_ != null && !_loc4_.disposed && _loc4_.figure == param1) {
                if (_loc4_.isGroupFriend()) {
                    _loc4_.face = this.getSmallGroupBadgeBitmap(stringOrNull(_loc4_.figure));
                } else {
                    _loc4_.face = this.getAvatarFaceBitmap(stringOrNull(_loc4_.figure));
                }
                if (_loc4_.face != null) {
                    _loc6_ = _loc4_.view;
                    if (_loc6_ != null) {
                        _loc5_ = asGuarded(_loc6_.getChildByName("face"), isIBitmapWrapperWindow);
                        if (_loc5_ != null && !_loc5_.disposed) {
                            _loc3_ = _loc5_.bitmap;
                            if (_loc3_ != null) {
                                _loc3_.fillRect(_loc3_.rect, 0);
                                _loc3_.copyPixels(_loc4_.face, _loc4_.face.rect, new Point(0, 0), null, null, true);
                            }
                            _loc5_.invalidate();
                        }
                    }
                }
            }
        }
    }

    public linkReceived(param1: string): void {
        let _loc3_: any[] = null;
        let _loc4_: number = 0;
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "open":
                this.openFriendList();
                break;
            case "openchat":
                if (_loc2_.length < 3 || this._messenger == null) {
                    return;
                }
                _loc3_ = _loc2_[2].split(":");
                if (_loc3_.length < 2) {
                    return;
                }
                if ((_loc3_[0] | 0) == this._avatarId) {
                    _loc4_ = _loc3_[1] | 0;
                } else {
                    _loc4_ = _loc3_[0] | 0;
                }
                if (_loc4_ && _loc4_ > 0) {
                    this.openFriendList();
                    this._messenger.startConversation(_loc4_);
                }
                break;
            default:
                HabboFriendList._log.warn("FriendList unknown link-type received: " + _loc2_[1]);
        }
    }

    private openFriendListWithTab(param1: number): void {
        if (this._view == null) {
            HabboFriendList._log.warn("Cannot open friendlist. Friendlist not initialized.");
            return;
        }
        this._view.openFriendList();
        let _loc2_: FriendListTab = this.tabs.findTab(param1);
        if (_loc2_ != this.tabs.findSelectedTab()) {
            this.tabs.toggleSelected(_loc2_);
            this.view.refresh("openFriendList");
        }
        this._view.mainWindow.activate();
        this._SafeStr_6724 = param1;
    }

    private onUserObject(param1: IMessageEvent): void {
        let _loc2_: UserObjectMessageParser = (param1 instanceof UserObjectEvent ? param1 : null).getParser();
        this._avatarId = _loc2_.id;
    }

    private onFriendsListFragment(param1: IMessageEvent): void {
        let _loc2_: FriendsListFragmentMessageParser = (param1 instanceof FriendListFragmentMessageEvent ? param1 : null).getParser();
        for (const _loc3_ of _loc2_.friendFragment ?? []) {
            this._categories.addFriend(new Friend(_loc3_));
        }
        if (_loc2_.fragmentNo == _loc2_.totalFragments - 1) {
            this._categories.sort();
            this._hasfriendsListInitialized = true;
            this._categories.findCategory(-1).setOpen(this._categories.getFriendCount(true, false) == 0);
        }
    }

    private onMessengerInit(param1: IMessageEvent): void {
        this._view = new FriendListView(this);
        let _loc2_: MessengerInitMessageParser = (param1 instanceof MessengerInitEvent ? param1 : null).getParser();
        this._friendRequests = new FriendRequests(new FriendRequestsDeps(this), _loc2_.userFriendLimit, _loc2_.extendedFriendLimit);
        this._categories.addCategory(new FriendCategory(0, this.getText("friendlist.friends")));
        this._categories.addCategory(new FriendCategory(-1, this.getText("friendlist.friends.offlinecaption")));
        this._tabs = new FriendListTabs(new FriendListTabsDeps(this));
        if (!this._SafeStr_3181) {
            this._SafeStr_3181 = new Timer(1000000);
            this._SafeStr_3181.addEventListener("timer", this.sendFriendListUpdate);
            this._SafeStr_3181.start();
        }
        this.getFriendRequests();
        this.registerListeners();
        HabboFriendList._log.info("FRIENDLIST INITIALIZED SUCCESSFULLY");
    }

    private getSortedFriends(param1: any[]): any[] {
        let _loc3_: any[] = [];
        let _loc6_: Map<any, any> = new Dictionary();
        for (const _loc5_ of param1 ?? []) {
            _loc3_.push(_loc5_.name.toLowerCase());
            _loc6_.set(_loc5_.name.toLowerCase(), _loc5_);
        }
        _loc3_.sort();
        let _loc2_: any[] = [];
        for (const _loc4_ of _loc3_ ?? []) {
            _loc2_.push(_loc6_.get(_loc4_));
        }
        return _loc2_;
    }

    private registerListeners(): void {
        this._communication.addHabboConnectionMessageEvent(new FriendRequestsEvent(this.onFriendRequests));
        this._communication.addHabboConnectionMessageEvent(new FriendListUpdateEvent(this.onFriendListUpdate));
        this._communication.addHabboConnectionMessageEvent(new AcceptFriendResultEvent(this.onAcceptFriendResult));
        this._communication.addHabboConnectionMessageEvent(new RoomInviteErrorEvent(this.onRoomInviteError));
        this._communication.addHabboConnectionMessageEvent(new HabboSearchResultEvent(this.onHabboSearchResult));
        this._communication.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        this._communication.addHabboConnectionMessageEvent(new FollowFriendFailedEvent(this.onFollowFriendFailed));
        this._communication.addHabboConnectionMessageEvent(new NewFriendRequestEvent(this.onNewFriendRequest));
        this._communication.addHabboConnectionMessageEvent(new MessengerErrorEvent(this.onMessengerError));
    }

    private getFriendRequests(): void {
        HabboFriendList._log.info("Sending friend requests request");
        this.send(new GetFriendRequestsMessageComposer());
    }

    private onFriendRequests(param1: IMessageEvent): void {
        let _loc2_: FriendRequestsMessageParser = (param1 instanceof FriendRequestsEvent ? param1 : null).getParser();
        this._friendRequests.clearAndUpdateView(false);
        for (const _loc3_ of _loc2_.reqs ?? []) {
            this._friendRequests.addRequest(new FriendRequest(_loc3_));
        }
        if (_loc2_.reqs.length > 0) {
            this._tabs.findTab(2).setNewMessageArrived(true);
        }
        this._view.refresh("friendRequests");
    }

    private onNewFriendRequest(param1: IMessageEvent): void {
        HabboFriendList._log.info("Received new friend request");
        let _loc2_: NewFriendRequestMessageParser = (param1 instanceof NewFriendRequestEvent ? param1 : null).getParser();
        let _loc4_: FriendRequest = new FriendRequest(_loc2_.req);
        this._friendRequests.addRequestAndUpdateView(_loc4_);
        let _loc3_: FriendListTab = this._tabs.findTab(2);
        _loc3_.setNewMessageArrived(true);
        this._view.refresh("newFriendRequest");
    }

    private onAcceptFriendResult(param1: IMessageEvent): void {
        let _loc2_: AcceptFriendResultMessageParser = (param1 instanceof AcceptFriendResultEvent ? param1 : null).getParser();
        for (const _loc3_ of _loc2_.failures ?? []) {
            this.friendRequests.acceptFailed(_loc3_.senderId | 0);
            this.showAlertView(_loc3_.errorCode | 0);
        }
    }

    private onHabboSearchResult(param1: IMessageEvent): void {
        let _loc2_: HabboSearchResultMessageParser = (param1 instanceof HabboSearchResultEvent ? param1 : null).getParser();
        this._avatarSearchResults.searchReceived(_loc2_.friends, _loc2_.others);
        this._view.refresh("search");
    }

    private onMessengerError(param1: IMessageEvent): void {
        let _loc2_: MessengerErrorMessageParser = (param1 instanceof MessengerErrorEvent ? param1 : null).getParser();
        this.showAlertView(_loc2_.errorCode, _loc2_.clientMessageId);
    }

    private showAlertView(param1: number, param2: number = 0): void {
        let _loc3_: string = "";
        switch (param1 - 1) {
            case 0:
                _loc3_ = "${friendlist.error.friendlistownlimit}";
                break;
            case 1:
                _loc3_ = "${friendlist.error.friendlistlimitofrequester}";
                break;
            case 2:
                _loc3_ = "${friendlist.error.friend_requests_disabled}";
                break;
            case 3:
                _loc3_ = "${friendlist.error.requestnotfound}";
                break;
            case 6:
                _loc3_ = "${friendlist.error.blocked_by_them}";
                break;
            case 7:
                _loc3_ = "${friendlist.error.blocked_by_you}";
                break;
            default:
                _loc3_ = "Received messenger error: msg: " + param2 + ", errorCode: " + param1;
        }
        this.simpleAlert("${friendlist.alert.title}", _loc3_);
    }

    private onRoomInviteError(param1: IMessageEvent): void {
        let _loc2_: RoomInviteErrorMessageParser = (param1 instanceof RoomInviteErrorEvent ? param1 : null).getParser();
        let _loc3_: string = "Received room invite error: errorCode: " + _loc2_.errorCode + ", recipients: " + Util.arrayToString(_loc2_.failedRecipients);
        this.simpleAlert("${friendlist.alert.title}", _loc3_);
    }

    private onFriendListUpdate(param1: IMessageEvent): void {
        this._categories.onFriendListUpdate(param1);
        this._view.refresh("friendListUpdate");
    }

    private onFollowFriendFailed(param1: IMessageEvent): void {
        let _loc2_: FollowFriendFailedMessageParser = (param1 instanceof FollowFriendFailedEvent ? param1 : null).getParser();
        let _loc3_: string = this.getFollowFriendErrorText(_loc2_.errorCode);
        HabboFriendList._log.warn("Received follow friend failed: " + _loc2_.errorCode + ", " + _loc3_);
        this.simpleAlert("${friendlist.alert.title}", _loc3_);
    }

    private getFollowFriendErrorText(param1: number): string {
        if (param1 == 0) {
            return "${friendlist.followerror.notfriend}";
        }
        if (param1 == 1) {
            return "${friendlist.followerror.offline}";
        }
        if (param1 == 2) {
            return "${friendlist.followerror.hotelview}";
        }
        if (param1 == 3) {
            return "${friendlist.followerror.prevented}";
        }
        return "Unknown follow friend error " + param1;
    }

    private prepareButton(param1: IWindow, param2: string, param3: (...args: any[]) => any, param4: number): void {
        let _loc5_: IBitmapWrapperWindow = null;
        param1.id = param4;
        if (isIBitmapWrapperWindow(param1)) {
            _loc5_ = isIBitmapWrapperWindow(param1) ? param1 : null;
        } else {
            _loc5_ = asGuarded(castGuarded(param1, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByTag("bitmap"), isIBitmapWrapperWindow);
        }
        if (_loc5_.bitmap != null) {
            return;
        }
        _loc5_.bitmap = this.getButtonImage(param2);
        _loc5_.width = _loc5_.bitmap.width;
        _loc5_.height = _loc5_.bitmap.height;
        param1.procedure = param3;
    }

    private onUserRights(param1: IMessageEvent): void {
        if (!this._sessionData || !this._friendRequests) {
            return;
        }
        let _loc2_: number = 0;
        if (this._sessionData.hasVip) {
            _loc2_ = this._friendRequests.clubLimit;
        } else if (this._sessionData.hasClub) {
            _loc2_ = this._friendRequests.clubLimit;
        }
        if (_loc2_ > this._friendRequests.limit) {
            this._friendRequests.limit = _loc2_;
        }
    }

    protected sendFriendListUpdate(param1: Event): void {
        HabboFriendList._log.info("Sending update request");
        this.send(new FriendListUpdateMessageComposer());
    }

    protected override initInstanceFields(): void {
        this.onUserObject = this.onUserObject.bind(this);
        this.onFriendsListFragment = this.onFriendsListFragment.bind(this);
        this.onMessengerInit = this.onMessengerInit.bind(this);
        this.onFriendRequests = this.onFriendRequests.bind(this);
        this.onNewFriendRequest = this.onNewFriendRequest.bind(this);
        this.onAcceptFriendResult = this.onAcceptFriendResult.bind(this);
        this.onHabboSearchResult = this.onHabboSearchResult.bind(this);
        this.onMessengerError = this.onMessengerError.bind(this);
        this.onRoomInviteError = this.onRoomInviteError.bind(this);
        this.onFriendListUpdate = this.onFriendListUpdate.bind(this);
        this.onFollowFriendFailed = this.onFollowFriendFailed.bind(this);
        this.onUserRights = this.onUserRights.bind(this);
        this.sendFriendListUpdate = this.sendFriendListUpdate.bind(this);
        this._avatarId = 0;
        this._SafeStr_6724 = 0;
        this._hasfriendsListInitialized = false;
        this._lastRoomInvitationTime = -60000;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboFriendList.#staticsReady) return;
        HabboFriendList.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboFriendList, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.HabboFriendList"));
    }

    get [IHabboFriendList](): true {
        return true;
    }
}
