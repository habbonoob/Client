import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CompetitionRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsData';
import type { Tab } from '@/com/sulake/habbo/navigator/domain/Tab';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IViewCtrl } from '@/com/sulake/habbo/navigator/IViewCtrl';
import type { ITransitionalMainViewCtrl } from '@/com/sulake/habbo/navigator/mainview/ITransitionalMainViewCtrl';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CompetitionRoomsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/CompetitionRoomsSearchMessageComposer';
import { GetOfficialRoomsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetOfficialRoomsMessageComposer';
import { GetPopularRoomTagsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetPopularRoomTagsMessageComposer';
import { GuildBaseSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GuildBaseSearchMessageComposer';
import { MyFavouriteRoomsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyFavouriteRoomsSearchMessageComposer';
import { MyFrequentRoomHistorySearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyFrequentRoomHistorySearchMessageComposer';
import { MyFriendsRoomsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyFriendsRoomsSearchMessageComposer';
import { MyGuildBasesSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyGuildBasesSearchMessageComposer';
import { MyRecommendedRoomsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyRecommendedRoomsMessageComposer';
import { MyRoomHistorySearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyRoomHistorySearchMessageComposer';
import { MyRoomRightsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyRoomRightsSearchMessageComposer';
import { MyRoomsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/MyRoomsSearchMessageComposer';
import { PopularRoomsSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/PopularRoomsSearchMessageComposer';
import { RoomAdEventTabViewedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomAdEventTabViewedComposer';
import { RoomAdSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomAdSearchMessageComposer';
import { RoomsWhereMyFriendsAreSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomsWhereMyFriendsAreSearchMessageComposer';
import { RoomsWithHighestScoreSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomsWithHighestScoreSearchMessageComposer';
import { RoomTextSearchMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RoomTextSearchMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { GuestRoomListCtrl, OfficialRoomListCtrl, RoomAdListCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';
import { CategoryListCtrl } from '@/com/sulake/habbo/navigator/mainview/CategoryListCtrl';
import { PopularTagsListCtrl } from '@/com/sulake/habbo/navigator/mainview/PopularTagsListCtrl';
import { TextSearchInputs } from '@/com/sulake/habbo/navigator/TextSearchInputs';
import { Util } from '@/com/sulake/habbo/navigator/Util';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';

export class MainViewCtrl implements ITransitionalMainViewCtrl, IUpdateReceiver, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::MainViewCtrl'); }

    public static readonly SEARCHMSG_SEARCH: number = 1;
    public static readonly _SafeStr_8189: number = 2;
    public static readonly SEARCHMSG_OFFICIALROOMS: number = 4;
    public static readonly _SafeStr_7702: number = 5;
    private static readonly BLEND_STAGE_BLENDING_OUT: number = 1;
    private static readonly BLEND_STAGE_LOADING: number = 2;
    private static readonly BLEND_STAGE_REFRESHING: number = 3;
    private static readonly BLEND_STAGE_BLENDING_IN: number = 4;
    private static readonly SCROLLBAR_WIDTH: number = 22;
    private static readonly PANIC_BUTTON_HEIGHT: number = 60;

    declare private _navigator: HabboNavigator;

    declare private _SafeStr_2133: IFrameWindow;

    declare private _content: IWindowContainer;

    declare private _SafeStr_2463: IWindowContainer;

    declare private _SafeStr_2584: IWindowContainer;

    declare private _SafeStr_2425: IWindowContainer;

    declare private _SafeStr_3338: PopularTagsListCtrl;

    declare private _guestRooms: GuestRoomListCtrl;

    declare private _officialRooms: OfficialRoomListCtrl;

    declare private _SafeStr_3432: RoomAdListCtrl;

    declare private _SafeStr_5605: CategoryListCtrl;

    declare private _tabContext: ITabContextWindow;

    declare private _SafeStr_5429: boolean;
    static { (this.prototype as any)._SafeStr_5429 = false; }

    declare private _SafeStr_3067: number;
    static { (this.prototype as any)._SafeStr_3067 = 0; }

    private _SafeStr_5111: boolean = true;
    private _SafeStr_4922: number = 0;

    declare private _loadingText: IWindow;

    private _SafeStr_5114: number = 0;

    declare private _searchInput: TextSearchInputs;

    declare private _SafeStr_2990: Timer;

    private _disposed: boolean = false;

    declare private _SafeStr_2776: WindowToggle;

    private _isPhaseOneNavigator: boolean = false;
    private readonly DEFAULT_VIEW_LOCATION: Point = new Point(100, 10);

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._SafeStr_3338 = new PopularTagsListCtrl(this._navigator);
        this._guestRooms = new GuestRoomListCtrl(this._navigator, 0, false);
        this._officialRooms = new OfficialRoomListCtrl(this._navigator);
        this._SafeStr_3432 = new RoomAdListCtrl(this._navigator, 0, false);
        this._SafeStr_5605 = new CategoryListCtrl(this._navigator);
        this._SafeStr_2990 = new Timer(300, 1);
        this._SafeStr_2990.addEventListener("timer", this.onResizeTimer);
    }

    private static refreshScrollbar(param1: IViewCtrl, param2: boolean): void {
        let _loc4_: IItemListWindow = null;
        let _loc5_: IWindow = null;
        if (param1.content == null || !param1.content.visible) {
            return;
        }
        _loc4_ = castGuarded(param1.content.findChildByName("item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc5_ = param1.content.findChildByName("scroller");
        let _loc3_: boolean = _loc4_.scrollableRegion.height > _loc4_.height;
        if (_loc5_.visible) {
            if (!_loc3_) {
                _loc5_.visible = false;
                _loc4_.width += 22;
            }
        } else if (_loc3_) {
            _loc5_.visible = true;
            _loc4_.width -= 22;
        }
    }

    public static stretchNewEntryIfNeeded(param1: IViewCtrl, param2: IWindowContainer): void {
        let _loc3_: IWindow = param1.content.findChildByName("scroller");
        if (_loc3_ == null || _loc3_.visible) {
            return;
        }
        param2.width += 22;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public onNavigatorToolBarIconClick(): void {
        if (!this._SafeStr_2133) {
            this.reloadData();
            return;
        }
        if (!this._SafeStr_2776 || this._SafeStr_2776.disposed) {
            this._SafeStr_2776 = new WindowToggle(this._SafeStr_2133, this._SafeStr_2133.desktop, this.reloadData, this.close);
        }
        this._SafeStr_2776.toggle();
    }

    private reloadData = (): void => {
        let _loc1_: Tab = this._navigator.tabs.getSelected();
        _loc1_.tabPageDecorator.navigatorOpenedWhileInTab();
    };

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._navigator = null;
            if (this._SafeStr_2133) {
                this._SafeStr_2133.dispose();
                this._SafeStr_2133 = null;
            }
            if (this._SafeStr_2776) {
                this._SafeStr_2776.dispose();
                this._SafeStr_2776 = null;
            }
            if (this._content) {
                this._content.dispose();
                this._content = null;
            }
            if (this._SafeStr_2990) {
                this._SafeStr_2990.removeEventListener("timer", this.onResizeTimer);
                this._SafeStr_2990.reset();
                this._SafeStr_2990 = null;
            }
            if (this._SafeStr_3338) {
                this._SafeStr_3338.dispose();
                this._SafeStr_3338 = null;
            }
            if (this._guestRooms) {
                this._guestRooms.dispose();
                this._guestRooms = null;
            }
            if (this._officialRooms) {
                this._officialRooms.dispose();
                this._officialRooms = null;
            }
            if (this._SafeStr_3432) {
                this._SafeStr_3432.dispose();
                this._SafeStr_3432 = null;
            }
            if (this._searchInput) {
                this._searchInput.dispose();
                this._searchInput = null;
            }
        }
    }

    public open(): void {
        if (this._SafeStr_2133 == null) {
            this.prepare();
        }
        this.refresh();
        this._SafeStr_2133.visible = true;
        this._SafeStr_2133.y = Math.max(this._SafeStr_2133.y, 60) | 0;
        this._SafeStr_2133.activate();
    }

    public isOpen(): boolean {
        return this._SafeStr_2133 != null && Boolean(this._SafeStr_2133.visible);
    }

    public close = (): void => {
        if (this._SafeStr_2133 != null) {
            if (this._searchInput) {
                this._searchInput.dispose();
                this._searchInput = null;
            }
            if (this._SafeStr_2776) {
                this._SafeStr_2776.dispose();
                this._SafeStr_2776 = null;
            }
            this._SafeStr_2133.dispose();
            this._SafeStr_2133 = null;
            this._tabContext = null;
            this._content = null;
            this._SafeStr_2463 = null;
            this._SafeStr_2425 = null;
            this._SafeStr_2584 = null;
            this._loadingText = null;
            this._SafeStr_3338.content = null;
            this._guestRooms.content = null;
            this._officialRooms.content = null;
            this._SafeStr_5605.content = null;
            this._SafeStr_3432.content = null;
            this._SafeStr_5114 = 0;
        }
    };

    public get mainWindow(): IFrameWindow {
        return this._SafeStr_2133;
    }

    private prepare(): void {
        let _loc4_: any[] = null;
        let _loc7_: ITabButtonWindow = null;
        let _loc5_: ITabButtonWindow = null;
        let _loc2_: boolean = this._navigator.getBoolean("eventinfo.enabled");
        let _loc6_: boolean = false;
        this._SafeStr_2133 = castGuarded(this._navigator.getXmlWindow("grs_main_window_new"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._tabContext = castGuarded(this._SafeStr_2133.findChildByName("tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        this._content = castGuarded(this._SafeStr_2133.findChildByName("tab_content"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2463 = castGuarded(this._SafeStr_2133.findChildByName("custom_content"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2425 = castGuarded(this._SafeStr_2133.findChildByName("list_content"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2584 = castGuarded(this._SafeStr_2133.findChildByName("custom_footer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._loadingText = this._SafeStr_2133.findChildByName("loading_text");
        let _loc3_: IWindow = this._SafeStr_2133.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onWindowClose);
        }
        this._SafeStr_2133.addEventListener("WE_RESIZED", this.onWindowResized);
        if (!_loc2_ || !this._isPhaseOneNavigator) {
            _loc4_ = [];
            while (this._tabContext.numTabItems > 0) {
                _loc7_ = this._tabContext.getTabItemAt(0);
                _loc4_.push(_loc7_);
                this._tabContext.removeTabItem(_loc7_);
            }
            for (_loc7_ of _loc4_ ?? []) {
                if (!(_loc7_.id == 1 && !_loc2_ || _loc7_.id == 6 && !_loc6_)) {
                    this._tabContext.addTabItem(_loc7_);
                }
            }
        }
        for (const _loc1_ of this._navigator.tabs.tabs ?? []) {
            _loc5_ = this._tabContext.getTabItemByID(_loc1_.id >>> 0);
            if (_loc5_ != null) {
                _loc5_.addEventListener("WE_SELECTED", this.onTabSelected);
                _loc1_.button = _loc5_;
            }
        }
        this._SafeStr_2133.scaler.setParamFlag(12288, false);
        this._SafeStr_2133.scaler.setParamFlag(8192, true);
        this._SafeStr_2133.position = this.DEFAULT_VIEW_LOCATION;
        this.createSearchInput();
    }

    private createSearchInput(): void {
        let _loc1_: IWindowContainer = null;
        let _loc2_: string = "search_header";
        if (this._searchInput == null) {
            _loc1_ = asGuarded(this._SafeStr_2133.findChildByName(_loc2_), isIWindowContainer);
            this._searchInput = new TextSearchInputs(this._navigator, _loc1_);
        }
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2133.findChildByName(_loc2_), isIWindowContainer);
        _loc3_.visible = true;
    }

    public refresh(): void {
        if (this._SafeStr_2133 == null) {
            return;
        }
        this.refreshTab();
        this.refreshCustomContent();
        this.refreshListContent(true);
        this.refreshFooter();
        this._SafeStr_2463.height = Util.getLowestPoint(this._SafeStr_2463);
        this._SafeStr_2584.height = Util.getLowestPoint(this._SafeStr_2584);
        let _loc1_: number = this._SafeStr_2425.y;
        Util.moveChildrenToColumn(this._content, ["custom_content", "list_content"], this._SafeStr_2463.y, 8);
        this._SafeStr_2425.height = this._SafeStr_2425.height + _loc1_ - this._SafeStr_2425.y - this._SafeStr_2584.height + this._SafeStr_5114;
        Util.moveChildrenToColumn(this._content, ["list_content", "custom_footer"], this._SafeStr_2425.y, 0);
        this._SafeStr_5114 = this._SafeStr_2584.height;
        this.onResizeTimer(null);
    }

    private refreshTab(): void {
        let _loc2_: Tab = this._navigator.tabs.getSelected();
        let _loc1_: ISelectableWindow = this._tabContext.selector.getSelected();
        if (_loc2_.button != _loc1_) {
            this._SafeStr_5429 = true;
            this._tabContext.selector.setSelected(_loc2_.button);
        }
    }

    private refreshCustomContent(): void {
        Util.hideChildren(this._SafeStr_2463);
        let _loc1_: Tab = this._navigator.tabs.getSelected();
        _loc1_.tabPageDecorator.refreshCustomContent(this._SafeStr_2463);
        if (Util.hasVisibleChildren(this._SafeStr_2463)) {
            this._SafeStr_2463.visible = true;
        } else {
            this._SafeStr_2463.visible = false;
            this._SafeStr_2463.blend = 1;
        }
    }

    private refreshFooter(): void {
        Util.hideChildren(this._SafeStr_2584);
        let _loc1_: Tab = this._navigator.tabs.getSelected();
        _loc1_.tabPageDecorator.refreshFooter(this._SafeStr_2584);
        this._SafeStr_2584.visible = Util.hasVisibleChildren(this._SafeStr_2584);
    }

    private refreshListContent(param1: boolean): void {
        Util.hideChildren(this._SafeStr_2425);
        let _loc2_: Tab = this._navigator.tabs.getSelected();
        let _loc3_: boolean = this._navigator.data.guestRoomSearchArrived && _loc2_.defaultSearchType == 16;
        this.refreshRoomAds(param1, _loc3_);
        this.refreshGuestRooms(param1, !_loc3_);
        this.refreshPopularTags(param1, this._navigator.data.popularTagsArrived);
        this.refreshOfficialRooms(param1, this._navigator.data.officialRoomsArrived);
    }

    private refreshGuestRooms(param1: boolean, param2: boolean): void {
        this.refreshList(param1, param2, this._guestRooms, "guest_rooms");
    }

    private refreshPopularTags(param1: boolean, param2: boolean): void {
        this.refreshList(param1, param2, this._SafeStr_3338, "popular_tags");
    }

    private refreshOfficialRooms(param1: boolean, param2: boolean): void {
        this.refreshList(param1, param2, this._officialRooms, "official_rooms");
    }

    private refreshRoomAds(param1: boolean, param2: boolean): void {
        this.refreshList(param1, param2, this._SafeStr_3432, "room_ads");
    }

    private refreshCategoryList(param1: boolean, param2: boolean): void {
        this.refreshList(param1, param2, this._SafeStr_5605, "categories_container");
    }

    private refreshList(param1: boolean, param2: boolean, param3: IViewCtrl, param4: string): void {
        let _loc5_: IWindow = null;
        if (param2) {
            if (param3.content == null) {
                _loc5_ = this._SafeStr_2425.findChildByName(param4);
                param3.content = castGuarded(_loc5_, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            }
            if (param1) {
                param3.refresh();
            }
            param3.content.visible = true;
        }
    }

    private onWindowClose = (param1: WindowEvent): void => {
        Logger.log("Close navigator window");
        this.close();
    };

    private onTabSelected = (param1: WindowEvent): void => {
        let _loc4_: IWindow = param1.target;
        let _loc2_: number = _loc4_.id;
        if (this._SafeStr_5429) {
            this._SafeStr_5429 = false;
            return;
        }
        let _loc3_: Tab = this._navigator.tabs.getTab(_loc2_);
        _loc3_.sendSearchRequest();
        switch (_loc3_.id - 1) {
            case 0:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_EVENTS"));
                this._navigator.send(new RoomAdEventTabViewedComposer());
                break;
            case 1:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_ROOMS"));
                break;
            case 2:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_ME"));
                break;
            case 3:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_OFFICIAL"));
                break;
            case 4:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCH"));
                break;
            case 5:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_CATEGORIES"));
        }
    };

    public reloadRoomList(param1: number): boolean {
        ErrorReportStorage.addDebugData("MainViewCtrl", "Reloading RoomList");
        if (this.isOpen() && this._navigator.data.guestRoomSearchResults != null && this._navigator.data.guestRoomSearchResults.searchType == param1) {
            this.startSearch(this._navigator.tabs.getSelected().id, param1, "");
            return true;
        }
        return false;
    }

    public startSearch(param1: number, param2: number, param3: string = "-1", param4: number = 1): void {
        let _loc5_: Tab = this._navigator.tabs.getSelected();
        this._navigator.tabs.setSelectedTab(param1);
        let _loc6_: Tab = this._navigator.tabs.getSelected();
        ErrorReportStorage.addDebugData("StartSearch", "Start search " + _loc5_.id + " => " + _loc6_.id);
        if (this._isPhaseOneNavigator) {
            if (param3.substr(0, 1) == "#") {
                param2 = 9;
                param3 = param3.substr(1, param3.length - 1);
            }
        }
        this._SafeStr_5111 = _loc5_ != _loc6_;
        if (_loc5_ != _loc6_) {
            _loc6_.tabPageDecorator.tabSelected();
        }
        this._navigator.data.startLoading();
        if (param4 == 1) {
            this._navigator.send(this.getSearchMsg(param2, param3));
        } else if (param4 == 2) {
            this._navigator.send(new GetPopularRoomTagsMessageComposer());
        } else if (param4 != 5) {
            this._navigator.send(new GetOfficialRoomsMessageComposer(this._navigator.data.adIndex));
        }
        if (!this.isOpen()) {
            this.open();
            this._SafeStr_3067 = 2;
            this._SafeStr_2425.blend = 0;
            if (this._SafeStr_2463.visible) {
                this._SafeStr_2463.blend = 0;
                this._SafeStr_2584.blend = 0;
            }
        } else {
            this._SafeStr_3067 = 1;
        }
        this._SafeStr_4922 = 0;
        this._navigator.registerUpdateReceiver(this, 2);
        this.sendTrackingEvent(param2);
        this._navigator.data.competitionRoomsData = null;
        if (this._isPhaseOneNavigator) {
            if (this.searchInput != null && param3 != "-1") {
                if (param2 != 1) {
                    this.searchInput.setText(param3, param2);
                }
            }
        }
    }

    private sendTrackingEvent(param1: number): void {
        switch (param1) {
            case 6:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FAVOURITES"));
                break;
            case 3:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FRIENDS_ROOMS"));
                break;
            case 7:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_HISTORY"));
                break;
            case 5:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_ROOMS"));
                break;
            case 11:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_OFFICIALROOMS"));
                break;
            case 1:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_POPULAR_ROOMS"));
                break;
            case 4:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE"));
                break;
            case 2:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE"));
                break;
            case 9:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TAG_SEARCH"));
                break;
            case 8:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TEXT_SEARCH"));
                break;
            case 23:
                this._navigator.events.dispatchEvent(new Event("HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FREQUENT_HISTORY"));
        }
    }

    private getSearchMsg(param1: number, param2: string): IMessageComposer {
        let _loc3_: CompetitionRoomsData = null;
        switch (param1) {
            case 6:
                return new MyFavouriteRoomsSearchMessageComposer();
            case 3:
                return new MyFriendsRoomsSearchMessageComposer();
            case 7:
                return new MyRoomHistorySearchMessageComposer();
            case 5:
                return new MyRoomsSearchMessageComposer();
            case 1:
                return new PopularRoomsSearchMessageComposer(param2, this._navigator.data.adIndex);
            case 4:
                return new RoomsWhereMyFriendsAreSearchMessageComposer();
            case 2:
                return new RoomsWithHighestScoreSearchMessageComposer(this._navigator.data.adIndex);
            case 9:
                return new RoomTextSearchMessageComposer("tag:" + param2);
            case 8:
                return new RoomTextSearchMessageComposer(param2);
            case 13:
                return new RoomTextSearchMessageComposer("group:" + param2);
            case 10:
                return new RoomTextSearchMessageComposer("roomname:" + param2);
            case 14:
                return new GuildBaseSearchMessageComposer(this._navigator.data.adIndex);
            case 15:
                _loc3_ = this._navigator.data.competitionRoomsData;
                return new CompetitionRoomsSearchMessageComposer(_loc3_.goalId, _loc3_.pageIndex);
            case 16:
            case 17:
                break;
            case 18:
                return new MyRoomRightsSearchMessageComposer();
            case 19:
                return new MyGuildBasesSearchMessageComposer();
            case 20:
                return new RoomTextSearchMessageComposer("owner:" + param2);
            case 22:
                return new MyRecommendedRoomsMessageComposer();
            case 23:
                return new MyFrequentRoomHistorySearchMessageComposer();
            default:
                Logger.log("No message for searchType: " + param1);
                return null;
        }
        return new RoomAdSearchMessageComposer(this._navigator.data.adIndex, param1);
    }

    public update(param1: number): void {
        let _loc3_: number = NaN;
        if (this._SafeStr_2425 == null) {
            return;
        }
        let _loc2_: number = param1 / 150;
        if (this._SafeStr_3067 == 1) {
            _loc3_ = Math.min(1, Math.max(0, this._SafeStr_2425.blend - _loc2_));
            this._SafeStr_2425.blend = _loc3_;
            this._SafeStr_2463.blend = this._SafeStr_5111 ? _loc3_ : 1;
            this._SafeStr_2584.blend = this._SafeStr_5111 ? _loc3_ : 1;
            if (_loc3_ == 0) {
                this._SafeStr_3067 = 2;
            }
        } else if (this._SafeStr_3067 == 2) {
            if (this._SafeStr_4922 % 10 == 1) {
                this._loadingText.visible = !this._loadingText.visible;
            }
            this._SafeStr_4922 = this._SafeStr_4922 + 1;
            if (!this._navigator.data.isLoading()) {
                this._SafeStr_3067 = 3;
            }
        } else if (this._SafeStr_3067 == 3) {
            this.refresh();
            this._SafeStr_3067 = 4;
        } else {
            this._loadingText.visible = false;
            _loc3_ = Math.min(1, Math.max(0, this._SafeStr_2425.blend + _loc2_));
            this._SafeStr_2425.blend = _loc3_;
            this._SafeStr_2463.blend = this._SafeStr_5111 ? _loc3_ : 1;
            this._SafeStr_2584.blend = this._SafeStr_5111 ? _loc3_ : 1;
            if (this._SafeStr_2425.blend >= 1) {
                this._navigator.removeUpdateReceiver(this);
            }
        }
    }

    private onWindowResized = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ != this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_2990.running) {
            this._SafeStr_2990.reset();
            this._SafeStr_2990.start();
        }
    };

    private onResizeTimer = (param1: TimerEvent): void => {
        MainViewCtrl.refreshScrollbar(this._SafeStr_3338, false);
        MainViewCtrl.refreshScrollbar(this._guestRooms, false);
        MainViewCtrl.refreshScrollbar(this._SafeStr_3432, false);
        if (this._navigator.isPerkAllowed("NAVIGATOR_PHASE_ONE_2014")) {
        }
    };

    public get searchInput(): TextSearchInputs {
        return this._searchInput;
    }

    public openAtPosition(param1: Point): void {
        this.reloadData();
        if (param1 != null) {
            this._SafeStr_2133.position = param1;
        } else if (this._SafeStr_2133.position.x == 0) {
            this._SafeStr_2133.position = this.DEFAULT_VIEW_LOCATION;
        }
    }

    public get isPhaseOneNavigator(): boolean {
        return this._isPhaseOneNavigator;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
