import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendRequest } from '@/com/sulake/habbo/friendbar/data/IFriendRequest';
import type { IHabboFriendBarData } from '@/com/sulake/habbo/friendbar/data/IHabboFriendBarData';
import type { ActiveConversationsCountEvent } from '@/com/sulake/habbo/friendbar/events/ActiveConversationsCountEvent';
import type { FindFriendsNotificationEvent } from '@/com/sulake/habbo/friendbar/events/FindFriendsNotificationEvent';
import type { FriendRequestUpdateEvent } from '@/com/sulake/habbo/friendbar/events/FriendRequestUpdateEvent';
import type { NewMessageEvent } from '@/com/sulake/habbo/friendbar/events/NewMessageEvent';
import type { NotificationEvent } from '@/com/sulake/habbo/friendbar/events/NotificationEvent';
import type { ITab } from '@/com/sulake/habbo/friendbar/view/tabs/ITab';
import type { NewOpenMessengerTab } from '@/com/sulake/habbo/friendbar/view/tabs/NewOpenMessengerTab';
import type { FriendListIcon } from '@/com/sulake/habbo/friendbar/view/utils/FriendListIcon';
import type { MessengerIcon } from '@/com/sulake/habbo/friendbar/view/utils/MessengerIcon';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { SessionDataPreferencesEvent } from '@/com/sulake/habbo/session/events/SessionDataPreferencesEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FriendBarResizeEvent } from '@/com/sulake/habbo/friendbar/events/FriendBarResizeEvent';
import { AbstractView } from '@/com/sulake/habbo/friendbar/view/AbstractView';
import { IHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import { AddFriendsTab } from '@/com/sulake/habbo/friendbar/view/tabs/AddFriendsTab';
import { FriendEntityTab } from '@/com/sulake/habbo/friendbar/view/tabs/FriendEntityTab';
import { FriendRequestsTab } from '@/com/sulake/habbo/friendbar/view/tabs/FriendRequestsTab';
import { FriendRequestTab } from '@/com/sulake/habbo/friendbar/view/tabs/FriendRequestTab';
import { isITab } from '@/com/sulake/habbo/friendbar/view/tabs/ITab';
import { NewFriendEntityTab } from '@/com/sulake/habbo/friendbar/view/tabs/NewFriendEntityTab';
import { NewFriendRequestTab } from '@/com/sulake/habbo/friendbar/view/tabs/NewFriendRequestTab';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';
import { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';
import { TextCropper } from '@/com/sulake/habbo/friendbar/view/utils/TextCropper';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { IIDHabboFriendBarData } from '@/com/sulake/iid/IIDHabboFriendBarData';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';

export class HabboFriendBarView extends AbstractView implements IHabboFriendBarView, IAvatarImageListener, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view::HabboFriendBarView'); }

    private static readonly TAB_WIDTH: number = 127;
    private static readonly _SafeStr_7813: number = 1;
    private static readonly USE_TOGGLE_WINDOW: boolean = false;
    private static readonly _SafeStr_8473: number = 3;
    private static readonly MAIN_WINDOW_RESOURCE: string = "new_bar_xml";
    private static readonly TOGGLE_WINDOW_RESOURCE: string = "toggle_xml";
    private static readonly BORDER: string = "border";
    private static readonly LIST: string = "list";
    private static readonly HEADER: string = "header";
    private static readonly CANVAS: string = "canvas";
    private static readonly PIECES: string = "pieces";
    private static readonly TOOLS: string = "friendtools";
    private static readonly _SafeStr_7797: string = "collapse_left";
    private static readonly BUTTON_COLLAPSE_RIGHT: string = "collapse_right";
    private static readonly _SafeStr_8752: string = "button_left";
    private static readonly _SafeStr_7752: string = "button_right";
    private static readonly BUTTON_LEFT_PAGE: string = "button_left_page";
    private static readonly BUTTON_RIGHT_PAGE: string = "button_right_page";
    private static readonly _SafeStr_8707: string = "button_left_end";
    private static readonly _SafeStr_8248: string = "button_right_end";
    private static readonly _SafeStr_7631: string = "button_close";
    private static readonly _SafeStr_7848: string = "button_open";
    private static readonly LINK_FRIEND_LIST: string = "link_friendlist";
    private static readonly ICON_FIND_FRIENDS: string = "icon_find_friends";
    private static readonly ICON_ALL_FRIENDS: string = "icon_all_friends";
    private static readonly COLLAPSED_MARGIN: number = 150;
    private static readonly NEW_BAR_BOTTOM_OFFSET: number = 1;
    private static readonly NEW_BAR_RIGHT_MARGIN: number = 16;
    private static readonly COLLAPSE_ANIMATION_DURATION_MS: number = 140;
    private static readonly COLLAPSE_ANIMATION_FPS: number = 60;

    declare private _friendBarData: IHabboFriendBarData;

    declare private _gameManager: IHabboGameManager;

    declare private _friendList: IHabboFriendList;

    declare private _toolbar: IHabboToolbar;

    declare private _SafeStr_2141: IWindowContainer;

    declare private _SafeStr_2564: IWindowContainer;

    declare private _SafeStr_2486: IWindowContainer;

    declare private _SafeStr_2191: ITab[];

    declare private _SafeStr_2571: ITab;

    declare private _SafeStr_3096: number;

    declare private _startIndex: number;

    declare private _SafeStr_4584: TextCropper;

    declare private _SafeStr_3797: FriendListIcon;

    declare private _SafeStr_4367: MessengerIcon;

    declare private _SafeStr_2513: IWindowContainer;

    declare private _SafeStr_7341: NewOpenMessengerTab;

    declare private _SafeStr_5836: boolean;

    declare private _SafeStr_2745: Timer;

    declare private _SafeStr_3038: boolean;

    declare private _SafeStr_4612: IRegionWindow;

    declare private _SafeStr_4724: IRegionWindow;

    declare private _startingInit: boolean;

    declare private _SafeStr_4660: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2458: Timer;

    declare private _SafeStr_14239: Timer;

    declare private _SafeStr_14240: number;

    declare private _SafeStr_14241: number;

    declare private _SafeStr_14242: number;

    declare private _collapseAnimationStartWidth: number;

    declare private _collapseAnimationTargetWidth: number;

    declare private _collapseAnimationStartReservedWidth: number;

    declare private _collapseAnimationTargetReservedWidth: number;

    declare private _currentFriendBarWidth: number;

    declare private _notifyMessengerOnStartup: boolean;

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
        this._SafeStr_4584 = new TextCropper();
        this._SafeStr_2191 = [];
        this._SafeStr_2191 = [];
    }

    public setMessengerIconNotify(param1: boolean): void {
        if (this._SafeStr_4367) {
            this._SafeStr_4367.notify(param1);
        }
        if (this._SafeStr_2513) {
            this.notifyMessenger(param1);
        }
    }

    public get friendBarWidth(): number {
        return this._SafeStr_2141 == null ? 0 : this._currentFriendBarWidth;
    }

    public setFriendListIconNotify(param1: boolean): void {
        if (this._SafeStr_3797) {
            this._SafeStr_3797.notify(param1);
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }), new ComponentDependency(new IIDHabboFriendBarData(), (param1: IHabboFriendBarData): void => {
             this._friendBarData = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }), new ComponentDependency(new IIDHabboGameManager(), (param1: IHabboGameManager): void => {
             this._gameManager = param1;
         })]);
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_2458 != null) {
                this._SafeStr_2458.removeEventListener("timer", this.onTimerEvent);
                this._SafeStr_2458.stop();
                this._SafeStr_2458 = null;
            }
            if (this._SafeStr_14239 != null) {
                this._SafeStr_14239.removeEventListener("timer", this.onCollapseAnimationTimer);
                this._SafeStr_14239.stop();
                this._SafeStr_14239 = null;
            }
            if (this._SafeStr_2745) {
                this._SafeStr_2745.removeEventListener("timerComplete", this.onRemoveDimmer);
                this._SafeStr_2745 = null;
            }
            if (this._SafeStr_4367) {
                this._SafeStr_4367.dispose();
                this._SafeStr_4367 = null;
            }
            if (this._SafeStr_3797) {
                this._SafeStr_3797.dispose();
                this._SafeStr_3797 = null;
            }
            if (this._SafeStr_2486) {
                this._SafeStr_2486.dispose();
                this._SafeStr_2486 = null;
            }
            if (this._SafeStr_2141) {
                this._SafeStr_2141.dispose();
                this._SafeStr_2141 = null;
            }
            if (this._SafeStr_2564) {
                this._SafeStr_2564.dispose();
                this._SafeStr_2564 = null;
            }
            while (this._SafeStr_2191.length > 0) {
                castGuarded(this._SafeStr_2191.pop(), isITab, "com.sulake.habbo.friendbar.view.tabs.ITab").dispose();
            }
            while (this._SafeStr_2191.length > 0) {
                castGuarded(this._SafeStr_2191.pop(), isITab, "com.sulake.habbo.friendbar.view.tabs.ITab").dispose();
            }
            if (this._friendBarData != null && !this._friendBarData.disposed && this._friendBarData.events != null) {
                this._friendBarData.events.removeEventListener("FBE_UPDATED", this.onRefreshView);
                this._friendBarData.events.removeEventListener("FIND_FRIENDS_RESULT", this.onFindFriendsNotification);
                this._friendBarData.events.removeEventListener("FBE_REQUESTS", this.onFriendRequestUpdate);
                this._friendBarData.events.removeEventListener("FBE_MESSAGE", this.onNewInstantMessage);
                this._friendBarData.events.removeEventListener("FBE_NOTIFICATION_EVENT", this.onFriendNotification);
                this._friendBarData.events.removeEventListener("AMC_EVENT", this.onRefreshMessengerConversations);
            }
            if (this._sessionDataManager) {
                this._sessionDataManager.events.removeEventListener("APUE_UPDATED", this.onSessionDataPreferences);
            }
            if (this._windowManager != null && !this._windowManager.disposed) {
                this._windowManager.getWindowContext(1).getDesktopWindow().removeEventListener("WE_RESIZED", this.onDesktopResized);
            }
            this._SafeStr_4584.dispose();
            this._SafeStr_4584 = null;
            super.dispose();
        }
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        this._friendBarData.events.addEventListener("FBE_UPDATED", this.onRefreshView);
        this._friendBarData.events.addEventListener("FIND_FRIENDS_RESULT", this.onFindFriendsNotification);
        this._friendBarData.events.addEventListener("FBE_REQUESTS", this.onFriendRequestUpdate);
        this._friendBarData.events.addEventListener("FBE_MESSAGE", this.onNewInstantMessage);
        this._friendBarData.events.addEventListener("FBE_NOTIFICATION_EVENT", this.onFriendNotification);
        this._friendBarData.events.addEventListener("AMC_EVENT", this.onRefreshMessengerConversations);
        this._sessionDataManager.events.addEventListener("APUE_UPDATED", this.onSessionDataPreferences);
    }

    public set visible(param1: boolean) {
        if (this._SafeStr_2141) {
            this._SafeStr_2141.visible = param1;
            this._SafeStr_2141.activate();
        }
        if (this._SafeStr_2486) {
            this._SafeStr_2486.visible = !param1;
            if (this._SafeStr_2141) {
                this._SafeStr_2486.x = this._SafeStr_2141.x;
                this._SafeStr_2486.y = this._SafeStr_2141.y;
                this._SafeStr_2486.activate();
            }
        }
    }

    private addDimmerToFriendBar(): void {
        let _loc1_: IWindow = this._windowManager.createWindow("bar_dimmer", "", 30, 1, (0x80 | 0x0800 | 1) >>> 0, new Rectangle(0, 0, this._SafeStr_2141.width, this._SafeStr_2141.height), null, 0);
        _loc1_.color = 0;
        _loc1_.blend = 0.3;
        this._SafeStr_2141.addChild(_loc1_);
        this._SafeStr_2141.invalidate();
        if (this._SafeStr_2745 == null) {
            this._SafeStr_2745 = new Timer(RoomEnterEffect.totalRunningTime, 1);
            this._SafeStr_2745.addEventListener("timerComplete", this.onRemoveDimmer);
            this._SafeStr_2745.start();
        }
    }

    private onRemoveDimmer(param1: TimerEvent): void {
        this._SafeStr_2745.removeEventListener("timerComplete", this.onRemoveDimmer);
        this._SafeStr_2745 = null;
        let _loc2_: IWindow = this._SafeStr_2141.findChildByName("bar_dimmer");
        if (_loc2_ != null) {
            this._SafeStr_2141.removeChild(_loc2_);
            this._windowManager.destroy(_loc2_);
        }
    }

    public get visible(): boolean {
        return !!(this._SafeStr_2141 && this._SafeStr_2141.visible);
    }

    public populate(): void {
        let _loc6_: any = 0;
        let _loc2_: IFriendRequest = null;
        let _loc15_: IFriendEntity = null;
        let _loc9_: Tab = null;
        let _loc7_: number = 0;
        let _loc11_: Tab = null;
        if (this._SafeStr_2141 == null) {
            return;
        }
        let _loc14_: number = this._SafeStr_3096;
        this.deSelect(false);
        let _loc10_: IItemListWindow = asGuarded(this._SafeStr_2141.findChildByName("list"), isIItemListWindow);
        if (_loc10_ == null) {
            return;
        }
        _loc10_.autoArrangeItems = false;
        let _loc4_: number = 0;
        _loc6_ = _loc4_ = _loc10_.numListItems;
        while (_loc6_ > 0) {
            _loc10_.removeListItemAt(_loc6_ - 1 | 0);
            _loc6_--;
        }
        while (this._SafeStr_2191.length > 0) {
            this._SafeStr_2191.pop().recycle();
        }
        this.updateFriendRequestCounter(this._friendBarData.numFriendRequests);
        let _loc3_: number = this._friendBarData.numFriends;
        let _loc5_: number = 0;
        let _loc1_: number = this.maxNumOfTabsVisible;
        let _loc12_: number = _loc3_ + (this._SafeStr_5836 ? 1 : 0) + (_loc5_ > 0 ? 1 : 0);
        let _loc13_: number = Math.min(_loc1_, _loc12_) | 0;
        if (this._startIndex + _loc13_ > _loc12_) {
            this._startIndex = Math.max(0, this._startIndex - (this._startIndex + _loc13_ - _loc12_)) | 0;
        }
        let _loc8_: number = this._startIndex;
        if (_loc5_ > 0) {
            if (this._startIndex == 0) {
                if (this._SafeStr_2191.length < _loc1_) {
                    if (_loc5_ == 1) {
                        _loc2_ = this._friendBarData.getFriendRequestAt(0);
                        _loc9_ = NewFriendRequestTab.allocate_NewFriendRequestTab(_loc2_);
                        this._SafeStr_2191.push(_loc9_);
                        _loc10_.addListItem(_loc9_.window);
                    } else if (_loc5_ > 1) {
                        _loc9_ = FriendRequestsTab.allocate(this._friendBarData.getFriendRequestList());
                        this._SafeStr_2191.push(_loc9_);
                        _loc10_.addListItem(_loc9_.window);
                    }
                }
            } else {
                _loc8_--;
            }
        }
        _loc6_ = _loc8_;
        while (_loc6_ < _loc3_ + _loc8_) {
            if (_loc6_ >= _loc3_) {
                break;
            }
            if (this._SafeStr_2191.length >= _loc1_) {
                break;
            }
            _loc15_ = this._friendBarData.getFriendAt(_loc6_ | 0);
            if (_loc15_.id > 0) {
                _loc9_ = NewFriendEntityTab.allocate(_loc15_);
                this._SafeStr_2191.push(_loc9_);
                _loc10_.addListItem(_loc9_.window);
            }
            _loc6_++;
        }
        if (this._SafeStr_5836) {
            _loc7_ = this.getNumberOfFindFriendsTabs(_loc1_, _loc12_, _loc3_, _loc5_);
            _loc12_ = _loc3_ + _loc7_ + (_loc5_ > 0 ? 1 : 0);
            while (_loc7_-- > 0) {
                _loc11_ = AddFriendsTab.allocate();
                _loc10_.addListItem(_loc11_.window);
                this._SafeStr_2191.push(_loc11_);
            }
        }
        _loc10_.autoArrangeItems = true;
        if (_loc14_ > -1) {
            this.selectFriendEntity(_loc14_);
        }
        this.setCollapseButtonVisibility();
        this.toggleArrowButtons(this._SafeStr_2191.length < _loc12_ && _loc12_ > 0, this._startIndex != 0, this._startIndex + this._SafeStr_2191.length < _loc12_);
        if (!this._startingInit) {
            this._startingInit = true;
            this.resizeAndPopulate(false);
            this.resizeAndPopulate(true);
        }
    }

    private getNumberOfFindFriendsTabs(param1: number, param2: number, param3: number, param4: number): number {
        if (this._SafeStr_2191.length >= param1) {
            return 0;
        }
        if (this._SafeStr_2191.length >= param1) {
            return 0;
        }
        let _loc5_: number = 1;
        if (this._SafeStr_2191.length + _loc5_ < 3) {
            _loc5_ = Math.min(param1 - this._SafeStr_2191.length, 3 - this._SafeStr_2191.length) | 0;
        }
        return _loc5_;
    }

    private getFriendEntityTabByID(param1: number): FriendEntityTab {
        let _loc2_: FriendEntityTab = null;
        let _loc4_: number = 0;
        let _loc3_: number = this._SafeStr_2191.length | 0;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = asInstanceOf(this._SafeStr_2191[_loc4_], FriendEntityTab);
            if (_loc2_) {
                if (_loc2_.friend.id == param1) {
                    return _loc2_;
                }
            }
            _loc4_++;
        }
        return null;
    }

    private isUserInterfaceReady(): boolean {
        return !!(this._SafeStr_2141 && !this._SafeStr_2141.disposed);
    }

    private buildUserInterface(): void {
        Tab.DATA = this._friendBarData;
        Tab.GAMES = this._gameManager;
        Tab.FRIENDS = this._friendList;
        Tab.VIEW = this;
        Tab.ASSETS = this.assets;
        Tab.WINDOWING = this._windowManager;
        Tab._SafeStr_2508 = this._localizationManager;
        Tab.CROPPER = this._SafeStr_4584;
        Tab.TRACKING = this._tracking;
        Tab.AVATAR_RENDER_MANAGER = this._avatarManager;
        Token.WINDOWING = this._windowManager;
        Token.ASSETS = this.assets;
        Token.GAMES = this._gameManager;
        let _loc4_: IAsset = this.assets.getAssetByName("new_bar_xml");
        this._SafeStr_2141 = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML), 1), isIWindowContainer);
        this._SafeStr_2141.y = this._SafeStr_2141.parent.height - (this._SafeStr_2141.height + 1);
        this._SafeStr_2141.setParamFlag(1024, true);
        this._SafeStr_2141.procedure = this.barWindowEventProc;
        if (RoomEnterEffect.isRunning()) {
            this.addDimmerToFriendBar();
        }
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2141.findChildByName("friendtools"), isIWindowContainer);
        this._SafeStr_4660 = asGuarded(_loc2_.getChildByName("line"), isIStaticBitmapWrapperWindow);
        this._SafeStr_2513 = castGuarded(_loc2_.findChildByName("icon_messenger"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (this._SafeStr_2513) {
            this._SafeStr_2513.addEventListener("WME_CLICK", this.onOpenMessenger);
            this._SafeStr_2513.visible = false;
        }
        let _loc3_: IWindowContainer = castGuarded(_loc2_.findChildByName("icon_all_friends"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc3_) {
            _loc3_.addEventListener("WME_CLICK", this.onOpenFriendsList);
        }
        let _loc1_: IWindowContainer = castGuarded(_loc2_.findChildByName("icon_find_friends"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc1_) {
            _loc1_.addEventListener("WME_CLICK", this.onOpenSearchFriends);
        }
        this._SafeStr_4724 = asGuarded(this._SafeStr_2141.findChildByName("collapse_left"), isIRegionWindow);
        if (this._SafeStr_4724) {
            this._SafeStr_4724.addEventListener("WME_CLICK", this.onCollapseFriendList);
        }
        this._SafeStr_4612 = asGuarded(this._SafeStr_2141.findChildByName("collapse_right"), isIRegionWindow);
        if (this._SafeStr_4612) {
            this._SafeStr_4612.addEventListener("WME_CLICK", this.onCollapseFriendList);
        }
        this._windowManager.getWindowContext(1).getDesktopWindow().addEventListener("WE_RESIZED", this.onDesktopResized);
        this.populate();
        if (this._SafeStr_14239 == null) {
            this._SafeStr_14239 = new Timer(1000 / 60);
            this._SafeStr_14239.addEventListener("timer", this.onCollapseAnimationTimer);
        }
        if (this._notifyMessengerOnStartup) {
            this.notifyMessenger(true);
        }
    }

    public getAvatarFaceBitmap(param1: string): BitmapData {
        let _loc2_: BitmapData = null;
        let _loc3_: IAvatarImage = null;
        if (this._avatarManager) {
            _loc3_ = this._avatarManager.createAvatarImage(param1, "h", null, this);
            if (_loc3_) {
                _loc2_ = HabboFaceFocuser.focusUserFace(_loc3_, "head", 2, 1);
                _loc3_.dispose();
            }
        }
        return _loc2_;
    }

    public getGroupIconBitmap(param1: string): BitmapData {
        return this._sessionDataManager.getGroupBadgeImage(param1);
    }

    public avatarImageReady(param1: string): void {
        let _loc7_: any;
        let _loc11_: IFriendEntity = null;
        let _loc3_: number = 0;
        let _loc10_: BitmapData = null;
        let _loc13_: IWindowContainer = null;
        let _loc6_: IItemListWindow = null;
        let _loc12_: IWindowContainer = null;
        let _loc4_: IBitmapWrapperWindow = null;
        let _loc8_: IItemListWindow = asGuarded(this._SafeStr_2141.findChildByName("list"), isIItemListWindow);
        let _loc9_: number = this._friendBarData.numFriends;
        _loc3_ = 0;
        while (_loc3_ < _loc9_) {
            _loc11_ = this._friendBarData.getFriendAt(_loc3_);
            if (_loc11_.figure == param1) {
                _loc10_ = null;
                if (_loc11_.id > 0) {
                    _loc10_ = this.getAvatarFaceBitmap(_loc11_.figure);
                } else {
                    _loc10_ = this.getGroupIconBitmap(_loc11_.figure);
                }
                if (_loc10_) {
                    _loc13_ = asGuarded(_loc8_.getListItemByID(_loc11_.id >>> 0), isIWindowContainer);
                    if (_loc13_) {
                        _loc6_ = asGuarded(_loc13_.getChildByName("pieces"), isIItemListWindow);
                        if (_loc6_) {
                            _loc12_ = castGuarded(_loc6_.getListItemByName("header"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                            if (_loc12_) {
                                _loc4_ = asGuarded(_loc12_.findChildByName("canvas"), isIBitmapWrapperWindow);
                                _loc4_.bitmap = _loc10_;
                                _loc4_.width = _loc10_.width;
                                _loc4_.height = _loc10_.height;
                            }
                        }
                    }
                }
                return;
            }
            _loc3_++;
        }
        let _loc5_: any[] = this._friendBarData.getFriendRequestList();
        for (const _loc2_ of _loc5_ ?? []) {
            if (_loc2_.figure == param1) {
                for (_loc7_ of this._SafeStr_2191 ?? []) {
                    if (_loc7_ instanceof FriendRequestTab) {
                        castTo(_loc7_, FriendRequestTab).avatarImageReady(_loc2_, this.getAvatarFaceBitmap(param1));
                        return;
                    }
                    if (_loc7_ instanceof NewFriendRequestTab) {
                        castTo(_loc7_, NewFriendRequestTab).avatarImageReady(_loc2_, this.getAvatarFaceBitmap(param1));
                        return;
                    }
                    if (_loc7_ instanceof FriendRequestsTab) {
                        castTo(_loc7_, FriendRequestsTab).avatarImageReady(_loc2_, this.getAvatarFaceBitmap(param1));
                        return;
                    }
                }
            }
        }
    }

    private isFriendSelected(param1: IFriendEntity): boolean {
        return this._SafeStr_3096 == param1.id;
    }

    public selectTab(param1: ITab, param2: boolean): void {
        if (!param1.selected) {
            if (this._SafeStr_2571) {
                this.deSelect(true);
            }
            param1.select(param2);
            this._SafeStr_2571 = param1;
            if (param1 instanceof FriendEntityTab) {
                this._SafeStr_3096 = castTo(param1, FriendEntityTab).friend.id;
            }
            if (param1 instanceof NewFriendEntityTab) {
                this._SafeStr_3096 = castTo(param1, NewFriendEntityTab).friend.id;
            }
        }
    }

    public selectFriendEntity(param1: number): void {
        if (this._SafeStr_3096 == param1) {
            return;
        }
        let _loc2_: FriendEntityTab = this.getFriendEntityTabByID(param1);
        if (_loc2_) {
            this.selectTab(_loc2_, false);
            this._SafeStr_3096 = param1;
        }
    }

    public deSelect(param1: boolean): void {
        if (this._SafeStr_2571) {
            this._SafeStr_2571.deselect(param1);
            this._SafeStr_2571 = null;
            this._SafeStr_3096 = -1;
        }
    }

    public getIconLocation(param1: string): IWindowContainer {
        let _loc2_: any = null;
        return castGuarded(this._SafeStr_2141.findChildByName(param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private onRefreshView(param1: Event): void {
        if (!this.isUserInterfaceReady()) {
            this.buildUserInterface();
        } else {
            this.resizeAndPopulate(true);
        }
    }

    private onFindFriendsNotification(param1: FindFriendsNotificationEvent): void {
        let event: FindFriendsNotificationEvent = param1;
        let title: string = event.success ? "${friendbar.find.success.title}" : "${friendbar.find.error.title}";
        let text: string = event.success ? "${friendbar.find.success.text}" : "${friendbar.find.error.text}";
        this._windowManager.notify(title, text, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         }, 16);
    }

    private onFriendRequestUpdate(param1: FriendRequestUpdateEvent): void {
        if (this._SafeStr_3797) {
            this._SafeStr_3797.notify(this._friendBarData.numFriendRequests > 0);
        }
        if (this._SafeStr_2141) {
            this.updateFriendRequestCounter(this._friendBarData.numFriendRequests);
            this.resizeAndPopulate(true);
        } else {
            this.buildUserInterface();
        }
    }

    protected onTimerEvent(param1: TimerEvent): void {
        this._SafeStr_2513.visible = true;
        let _loc2_: IWindow = asGuarded(this._SafeStr_2513.getChildByName("icon_1"), isIWindow);
        let _loc3_: IWindow = asGuarded(this._SafeStr_2513.getChildByName("icon_2"), isIWindow);
        if (_loc2_ && _loc3_) {
            if (_loc2_.visible) {
                _loc2_.visible = false;
                _loc3_.visible = true;
            } else if (_loc3_.visible) {
                _loc3_.visible = false;
                _loc2_.visible = true;
            }
        }
    }

    private notifyMessenger(param1: boolean): void {
        let _loc2_: IWindow = asGuarded(this._SafeStr_2513.getChildByName("icon"), isIWindow);
        let _loc3_: IWindow = asGuarded(this._SafeStr_2513.getChildByName("icon_1"), isIWindow);
        if (param1) {
            if (!this._SafeStr_2458) {
                _loc2_.visible = false;
                _loc3_.visible = true;
                this._SafeStr_2458 = new Timer(500, 0);
                this._SafeStr_2458.addEventListener("timer", this.onTimerEvent);
                this._SafeStr_2458.start();
            }
        } else {
            if (this._SafeStr_2458 != null) {
                this._SafeStr_2458.removeEventListener("timer", this.onTimerEvent);
                this._SafeStr_2458.stop();
                this._SafeStr_2458 = null;
            }
            _loc2_.visible = true;
            _loc3_.visible = false;
            (asGuarded(this._SafeStr_2513.getChildByName("icon_2"), isIWindow)).visible = false;
        }
    }

    private onNewInstantMessage(param1: NewMessageEvent): void {
        if (param1.notify) {
            this._notifyMessengerOnStartup = true;
        }
        if (this._SafeStr_2513) {
            if (param1.notify) {
                this.notifyMessenger(true);
            } else {
                this._SafeStr_2513.visible = true;
                this.notifyMessenger(false);
            }
        }
        if (this._SafeStr_7341) {
            if (param1.notify) {
                this._SafeStr_7341.window.visible = true;
            }
        }
    }

    private onFriendNotification(param1: NotificationEvent): void {
        let _loc2_: FriendEntityTab = this.getFriendEntityTabByID(param1.friendId);
        if (!_loc2_) {
            return;
        }
        _loc2_.addNotificationToken(param1.notification);
    }

    private onRefreshMessengerConversations(param1: ActiveConversationsCountEvent): void {
        if (this._SafeStr_2513 != null) {
            this._SafeStr_2513.visible = param1.activeConversationsCount != 0;
            this.notifyMessenger(param1.hasUnread);
        }
    }

    private onSessionDataPreferences(param1: SessionDataPreferencesEvent): void {
        this.setCollapsedState(!(param1.uiFlags & 1), false, false);
    }

    private barWindowEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        if (param1.type == "WME_DOWN") {
            _loc4_ = this._startIndex;
            _loc3_ = this._friendBarData.numFriends + (this._SafeStr_5836 ? 1 : 0) + (this._friendBarData.numFriendRequests > 0 ? 1 : 0);
            switch (param2.name) {
                case "button_left":
                    _loc4_ = Math.max(0, this._startIndex - 1) | 0;
                    break;
                case "button_left_page":
                    _loc4_ = Math.max(0, this._startIndex - this.maxNumOfTabsVisible) | 0;
                    break;
                case "button_left_end":
                    _loc4_ = 0;
                    break;
                case "button_right":
                    _loc4_ = Math.max(0, Math.min(_loc3_ - this.maxNumOfTabsVisible, this._startIndex + 1)) | 0;
                    break;
                case "button_right_page":
                    _loc4_ = Math.max(0, Math.min(_loc3_ - this.maxNumOfTabsVisible, this._startIndex + this.maxNumOfTabsVisible)) | 0;
                    break;
                case "button_right_end":
                    _loc4_ = Math.max(0, _loc3_ - this.maxNumOfTabsVisible) | 0;
                    break;
                case "button_close":
                    this.visible = false;
                    break;
                case "border":
                    this.deSelect(true);
                    break;
                case "link_friendlist":
                    this._friendBarData.toggleFriendList();
            }
            if (_loc4_ != this._startIndex) {
                this.deSelect(true);
                this._startIndex = _loc4_;
                this.resizeAndPopulate(true);
            }
        }
        if (param1.type == "WE_DEACTIVATED") {
            this.deSelect(true);
        }
    }

    private setCollapseButtonVisibility(): void {
        if (this._SafeStr_4724) {
            this._SafeStr_4724.visible = this._SafeStr_3038;
        }
        if (this._SafeStr_4612) {
            this._SafeStr_4612.visible = !this._SafeStr_3038;
        }
    }

    private getReservedFriendBarWidth(): number {
        if (this._SafeStr_2141 == null) {
            return 0;
        }
        return this._SafeStr_3038 ? 150 : this._SafeStr_2141.width;
    }

    private dispatchFriendBarResize(): void {
        let _loc1_: FriendBarResizeEvent = new FriendBarResizeEvent();
        this.events.dispatchEvent(_loc1_);
    }

    private applyCollapseAnimationFrame(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_2141 == null) {
            return;
        }
        this._SafeStr_2141.x = param1;
        this._SafeStr_2141.width = param2;
        this._currentFriendBarWidth = param3;
        this._SafeStr_2141.invalidate();
        this.dispatchFriendBarResize();
    }

    private startCollapseAnimation(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        if (this._SafeStr_14239 == null) {
            this.applyCollapseAnimationFrame(param2, param4, param6);
            return;
        }
        this._SafeStr_14239.reset();
        this._SafeStr_14240 = 0;
        this._SafeStr_14241 = param1;
        this._SafeStr_14242 = param2;
        this._collapseAnimationStartWidth = param3;
        this._collapseAnimationTargetWidth = param4;
        this._collapseAnimationStartReservedWidth = param5;
        this._collapseAnimationTargetReservedWidth = param6;
        this.applyCollapseAnimationFrame(param1, param3, param5);
        this._SafeStr_14239.start();
    }

    private onCollapseAnimationTimer(param1: TimerEvent): void {
        if (this._SafeStr_2141 == null || this._SafeStr_14239 == null) {
            return;
        }
        this._SafeStr_14240 += this._SafeStr_14239.delay | 0;
        let _loc3_: number = Math.min(1, this._SafeStr_14240 / 140);
        let _loc2_: number = 1 - Math.pow(1 - _loc3_, 3);
        let _loc5_: number = Math.round(this._SafeStr_14241 + (this._SafeStr_14242 - this._SafeStr_14241) * _loc2_) | 0;
        let _loc4_: number = Math.round(this._collapseAnimationStartWidth + (this._collapseAnimationTargetWidth - this._collapseAnimationStartWidth) * _loc2_) | 0;
        let _loc6_: number = Math.round(this._collapseAnimationStartReservedWidth + (this._collapseAnimationTargetReservedWidth - this._collapseAnimationStartReservedWidth) * _loc2_) | 0;
        this.applyCollapseAnimationFrame(_loc5_, _loc4_, _loc6_);
        if (_loc3_ >= 1) {
            this._SafeStr_14239.stop();
            this.applyCollapseAnimationFrame(this._SafeStr_14242, this._collapseAnimationTargetWidth, this._collapseAnimationTargetReservedWidth);
        }
    }

    private onCollapseFriendList(param1: WindowMouseEvent): void {
        this.toggleCollapsedState();
    }

    private toggleCollapsedState(): void {
        this.setCollapsedState(!this._SafeStr_3038, true, true);
    }

    private setCollapsedState(param1: boolean, param2: boolean, param3: boolean): void {
        if (this._SafeStr_3038 == param1) {
            return;
        }
        let _loc8_: number = this._SafeStr_2141 != null ? this._SafeStr_2141.x : 0;
        let _loc5_: number = this._SafeStr_2141 != null ? this._SafeStr_2141.width : 0;
        let _loc6_: number = this._currentFriendBarWidth;
        this._SafeStr_3038 = param1;
        if (param2) {
            this._sessionDataManager.setFriendBarState(!this._SafeStr_3038);
        }
        if (this._SafeStr_14239 != null) {
            this._SafeStr_14239.stop();
        }
        this.deSelect(true);
        this.resizeAndPopulate(true);
        this.setCollapseButtonVisibility();
        if (!this._SafeStr_3038) {
            this.resizeAndPopulate(true);
        }
        let _loc7_: number = this._SafeStr_2141 != null ? this._SafeStr_2141.x : 0;
        let _loc9_: number = this._SafeStr_2141 != null ? this._SafeStr_2141.width : 0;
        let _loc4_: number = this.getReservedFriendBarWidth();
        if (param3) {
            this.startCollapseAnimation(_loc8_, _loc7_, _loc5_, _loc9_, _loc6_, _loc4_);
        } else {
            this.applyCollapseAnimationFrame(_loc7_, _loc9_, _loc4_);
        }
    }

    private onOpenMessenger(param1: WindowMouseEvent): void {
        this._friendBarData.toggleMessenger();
        this.notifyMessenger(false);
    }

    private onOpenFriendsList(param1: WindowMouseEvent): void {
        this._friendBarData.toggleFriendList();
    }

    private onOpenSearchFriends(param1: WindowMouseEvent): void {
        this._friendBarData.openUserTextSearch();
    }

    public removeMessengerNotifications(): void {
        for (const _loc1_ of this._SafeStr_2191 ?? []) {
            if (_loc1_ instanceof FriendEntityTab) {
                castTo(_loc1_, FriendEntityTab).removeNotificationToken(-1, true);
            }
        }
    }

    public updateFriendRequestCounter(param1: number): void {
        let _loc2_: IRegionWindow = null;
        if (!this._SafeStr_2564) {
            this._SafeStr_2564 = this._windowManager.createUnseenItemCounter();
        }
        if (this._SafeStr_2564) {
            _loc2_ = asGuarded(this._SafeStr_2141.findChildByName("icon_all_friends"), isIRegionWindow);
            if (_loc2_) {
                _loc2_.addChild(this._SafeStr_2564);
                this._SafeStr_2564.x = _loc2_.width - this._SafeStr_2564.width - 5;
                this._SafeStr_2564.y = 0;
                if (param1 > 0) {
                    this._SafeStr_2564.visible = true;
                    this._SafeStr_2564.findChildByName("count").caption = param1.toString();
                } else {
                    this._SafeStr_2564.visible = false;
                }
            }
        }
    }

    private toggleWindowEventProc(param1: WindowEvent, param2: IWindow): void {
        if (this._SafeStr_2486.visible) {
            if (param1.type == "WME_DOWN") {
                let _loc3_: string = param2.name;
                if ("button_open" === _loc3_) {
                    this.visible = true;
                }
            }
        }
    }

    private toggleArrowButtons(param1: boolean, param2: boolean, param3: boolean): void {
        let _loc4_: IRegionWindow = asGuarded(this._SafeStr_2141.findChildByName("button_left_page"), isIRegionWindow);
        let _loc5_: IRegionWindow = asGuarded(this._SafeStr_2141.findChildByName("button_right_page"), isIRegionWindow);
        if (_loc4_ != null) {
            _loc4_.visible = param1;
            if (param2) {
                _loc4_.enable();
                _loc4_.blend = 1;
            } else {
                _loc4_.disable();
                _loc4_.blend = 0.2;
            }
        }
        if (_loc5_ != null) {
            _loc5_.visible = param1;
            if (param3) {
                _loc5_.enable();
                _loc5_.blend = 1;
            } else {
                _loc5_.disable();
                _loc5_.blend = 0.2;
            }
        }
        this.arrangeWindows();
    }

    private resizeAndPopulate(param1: boolean = false): void {
        let _loc2_: Rectangle = null;
        let _loc3_: number = 0;
        if (!this.disposed) {
            if (this._SafeStr_2141) {
                _loc2_ = this._toolbar.getRect();
                this._SafeStr_2141.width = this._SafeStr_2141.parent.width - _loc2_.right | 0;
                this._SafeStr_4660.visible = !this._SafeStr_3038;
                if (!param1) {
                    _loc3_ = this.maxNumOfTabsVisible;
                    if (_loc3_ < this._SafeStr_2191.length) {
                        param1 = true;
                    } else if (_loc3_ > this._SafeStr_2191.length) {
                        if (this._SafeStr_2191.length < 3) {
                            param1 = true;
                        } else if (this._SafeStr_2191.length < this._friendBarData.numFriends + (this._SafeStr_5836 ? 1 : 0)) {
                            param1 = true;
                        } else if (this.numFriendEntityTabsVisible < this._friendBarData.numFriends) {
                            param1 = true;
                        }
                    }
                }
                if (param1) {
                    this.populate();
                    this.arrangeWindows();
                }
                if (this._SafeStr_3038) {
                    this._SafeStr_2141.x = this._SafeStr_2141.desktop.width - 150;
                } else {
                    this._SafeStr_2141.x = this._SafeStr_2141.desktop.width - this._SafeStr_2141.width;
                    this._SafeStr_4660.x = 1;
                }
                this._currentFriendBarWidth = this.getReservedFriendBarWidth();
            }
        }
    }

    private arrangeWindows(): void {
        let _loc1_: number = 0;
        for (const _loc2_ of valuesOf(this._SafeStr_2141.iterator)) {
            if (_loc2_.visible) {
                _loc2_.x = _loc1_;
                _loc1_ = _loc1_ + _loc2_.width | 0;
            }
        }
        this._SafeStr_2141.width = _loc1_;
    }

    private get numFriendEntityTabsVisible(): number {
        let _loc2_: number = 0;
        let _loc3_: number = this._SafeStr_2191.length | 0;
        while (_loc3_-- > 0) {
            if (this._SafeStr_2191[_loc3_] instanceof FriendEntityTab) {
                _loc2_++;
            }
        }
        let _loc1_: number = this._SafeStr_2191.length | 0;
        while (_loc1_-- > 0) {
            if (this._SafeStr_2191[_loc1_] instanceof FriendEntityTab) {
                _loc2_++;
            }
        }
        return _loc2_;
    }

    private get maxNumOfTabsVisible(): number {
        let _loc1_: IItemListWindow = asGuarded(this._SafeStr_2141.findChildByName("list"), isIItemListWindow);
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2141.findChildByName("friendtools"), isIWindowContainer);
        return (this._SafeStr_2141.width - _loc2_.width - 16) / (127 + _loc1_.spacing) | 0;
    }

    private onDesktopResized(param1: WindowEvent): void {
        this.resizeAndPopulate(true);
    }

    public get linkPattern(): string {
        return "friendbar/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "findfriends":
                this._friendBarData.findNewFriends();
                break;
            case "user":
                if (_loc2_.length > 2) {
                    this._friendBarData.showProfileByName(stringOrNull(_loc2_[2]));
                }
                break;
            default:
                Logger.log("HabboFriendBarView unknown link-type received: " + _loc2_[1]);
        }
    }

    protected override initInstanceFields(): void {
        this.onRemoveDimmer = this.onRemoveDimmer.bind(this);
        this.onRefreshView = this.onRefreshView.bind(this);
        this.onFindFriendsNotification = this.onFindFriendsNotification.bind(this);
        this.onFriendRequestUpdate = this.onFriendRequestUpdate.bind(this);
        this.onTimerEvent = this.onTimerEvent.bind(this);
        this.onNewInstantMessage = this.onNewInstantMessage.bind(this);
        this.onFriendNotification = this.onFriendNotification.bind(this);
        this.onRefreshMessengerConversations = this.onRefreshMessengerConversations.bind(this);
        this.onSessionDataPreferences = this.onSessionDataPreferences.bind(this);
        this.barWindowEventProc = this.barWindowEventProc.bind(this);
        this.onCollapseAnimationTimer = this.onCollapseAnimationTimer.bind(this);
        this.onCollapseFriendList = this.onCollapseFriendList.bind(this);
        this.onOpenMessenger = this.onOpenMessenger.bind(this);
        this.onOpenFriendsList = this.onOpenFriendsList.bind(this);
        this.onOpenSearchFriends = this.onOpenSearchFriends.bind(this);
        this.onDesktopResized = this.onDesktopResized.bind(this);
        this._SafeStr_3096 = -1;
        this._startIndex = 0;
        this._SafeStr_5836 = true;
        this._SafeStr_3038 = false;
        this._startingInit = false;
        this._SafeStr_14240 = 0;
        this._SafeStr_14241 = 0;
        this._SafeStr_14242 = 0;
        this._collapseAnimationStartWidth = 0;
        this._collapseAnimationTargetWidth = 0;
        this._collapseAnimationStartReservedWidth = 0;
        this._collapseAnimationTargetReservedWidth = 0;
        this._currentFriendBarWidth = 0;
        this._notifyMessengerOnStartup = false;
        super.initInstanceFields();
    }

    get [IHabboFriendBarView](): true {
        return true;
    }
}
