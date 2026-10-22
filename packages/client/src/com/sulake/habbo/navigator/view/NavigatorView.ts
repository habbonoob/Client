import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';
import type { SearchResultContainer } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultContainer';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import type { LiftView } from '@/com/sulake/habbo/navigator/view/LiftView';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BlockResultsView, QuickLinksView } from '@/com/sulake/habbo/navigator/HabboNewNavigator.group';
import { RoomInfoPopup } from '@/com/sulake/habbo/navigator/view/RoomInfoPopup';
import { CategoryElementFactory } from '@/com/sulake/habbo/navigator/view/search/results/CategoryElementFactory';
import { RoomEntryElementFactory } from '@/com/sulake/habbo/navigator/view/search/results/RoomEntryElementFactory';
import { SearchView } from '@/com/sulake/habbo/navigator/view/search/SearchView';
import { ViewMode } from '@/com/sulake/habbo/navigator/view/search/ViewMode';
import { TopViewSelector } from '@/com/sulake/habbo/navigator/view/TopViewSelector';

export class NavigatorView implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view::NavigatorView'); }

    private static readonly POPUP_HIDE_DELAY_MS: number = 4000;
    private static readonly MAX_WINDOW_WIDTH: number = 578;
    private static readonly STARTING_TAB_POSITION: number = 115;
    private static readonly _SafeStr_8283: number = 7;
    private static readonly _SafeStr_7617: number = 7;

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNewNavigator;

    declare private _SafeStr_6516: LiftView;

    declare private _SafeStr_3654: QuickLinksView;

    declare private _SafeStr_4254: SearchView;

    declare private _blockResultsView: BlockResultsView;

    declare private _SafeStr_3356: RoomEntryElementFactory;

    declare private _categoryElementFactory: CategoryElementFactory;

    declare private _SafeStr_3478: TopViewSelector;

    declare private _roomInfoPopup: RoomInfoPopup;

    declare private _SafeStr_7340: IBorderWindow;

    declare private _SafeStr_7351: IBorderWindow;

    declare private _SafeStr_7308: IBorderWindow;

    declare private _window: IWindowContainer;

    declare private _isBusy: boolean;
    static { (this.prototype as any)._isBusy = false; }

    private _SafeStr_4165: number = getTimer() >>> 0;
    private _SafeStr_3200: number = -1;
    private _SafeStr_3184: number = -1;
    private _lastWindowWidth: number = -1;
    private _SafeStr_3337: number = -1;
    private _lastLeftPaneHidden: boolean = false;
    private _waitingForGroupDetails: number = -1;
    private _SafeStr_4511: number = 4000;
    private _SafeStr_7342: boolean = false;

    declare private _SafeStr_3895: number;
    static { (this.prototype as any)._SafeStr_3895 = 0; }

    declare private _SafeStr_5738: number;
    static { (this.prototype as any)._SafeStr_5738 = 0; }

    declare private _SafeStr_2822: IWindow;

    declare private _leftPaneMargin: number;
    static { (this.prototype as any)._leftPaneMargin = 0; }

    private roomInfoGlobalRectangle: Rectangle = new Rectangle();

    public get visible(): boolean {
        if (this._window) {
            return this._window.visible;
        }
        return false;
    }

    public set visible(param1: boolean) {
        if (param1 && this._navigator.isReady) {
            if (this._SafeStr_3356 == null) {
                this._SafeStr_3356 = new RoomEntryElementFactory(this._navigator);
            }
            if (this._categoryElementFactory == null) {
                this._categoryElementFactory = new CategoryElementFactory(this._navigator, this._SafeStr_3356);
            }
            this.createSubViews();
            if (this._window == null) {
                this.createMainWindow();
                this._navigator.registerUpdateReceiver(this, 1000);
                this._SafeStr_3654.setQuickLinks(this._navigator.contextContainer.savedSearches);
            }
            if (this._navigator.currentResults != null) {
                this.onSearchResults(this._navigator.currentResults);
            } else if (!this._isBusy) {
                this._navigator.performSearch("official_view");
            }
            this._window.activate();
        } else if (this._roomInfoPopup) {
            this._roomInfoPopup.show(false);
        }
        if (this._window) {
            this._window.visible = param1;
        }
    }

    public get mainWindow(): IFrameWindow {
        return isIFrameWindow(this._window) ? this._window : null;
    }

    public get isBusy(): boolean {
        return this._isBusy;
    }

    public set isBusy(param1: boolean) {
        if (this._window) {
            this._window.caption = param1 ? "${navigator.title.is.busy}" : "${navigator.title}";
            this._window.findChildByName("search_waiting_for_results_mask").visible = param1;
        }
        this._isBusy = param1;
    }

    public get disposed(): boolean {
        return false;
    }

    public get isRoomInfoBubbleVisible(): boolean {
        if (this._roomInfoPopup) {
            return this._roomInfoPopup.visible;
        }
        return false;
    }

    private get windowPreferencesChanged(): boolean {
        if (this._lastLeftPaneHidden != this._window.findChildByName("left_pane").visible) {
            return true;
        }
        if (this._SafeStr_3200 != this._window.x) {
            return true;
        }
        if (this._SafeStr_3184 != this._window.y) {
            return true;
        }
        if (this._SafeStr_3337 != this._window.height) {
            return true;
        }
        return false;
    }

    public setInitialWindowDimensions(param1: number, param2: number, param3: number, param4: boolean, param5: number): void {
        if (this._window) {
            this.setLeftPaneVisibility(!param4);
            this._window.x = param1;
            this._window.y = param2;
            this._window.height = param3;
        } else {
            this._SafeStr_3200 = param1;
            this._SafeStr_3184 = param2;
            this._SafeStr_3337 = param3;
            this._lastLeftPaneHidden = param4;
        }
    }

    public onSavedSearches(param1: SavedSearch[]): void {
        if (this._SafeStr_3654) {
            this._SafeStr_3654.setQuickLinks(param1);
        }
    }

    public onSearchResults(param1: SearchResultContainer, param2: string = ""): void {
        let _loc3_: number = 0;
        if (this._navigator.newResultsRendered) {
            return;
        }
        if (!this._SafeStr_3356 || !this._blockResultsView) {
            return;
        }
        this._SafeStr_3356.viewMode = ViewMode.getViewMode(param1.searchCodeOriginal);
        this._blockResultsView.displayCurrentResults();
        if (this._navigator.contextContainer.hasContextFor(param1.searchCodeOriginal)) {
            _loc3_ = this._navigator.contextContainer.getTopLevelSearches().indexOf(param1.searchCodeOriginal);
            if (_loc3_ != -1) {
                this._SafeStr_3478.selectTabByIndex(_loc3_);
            }
        }
        this._window.findChildByName("create_room").procedure = this.createRoomProcedure;
        this._window.findChildByName("random_room_border").visible = false;
        this._window.findChildByName("promote_room_border").visible = false;
        if (param1.searchCodeOriginal == "roomads_view" || param1.searchCodeOriginal == "myworld_view") {
            this._window.findChildByName("promote_room_border").visible = true;
            this._window.findChildByName("promote_room").procedure = this.promoteRoomProcedure;
        } else {
            this._window.findChildByName("random_room_border").visible = true;
            this._window.findChildByName("random_room").procedure = this.randomRoomProcedure;
        }
        this._SafeStr_4254.setTextAndSearchModeFromFilter(param1.filteringData, param2);
        this._navigator.newResultsRendered = true;
        this.isBusy = false;
        if (this._roomInfoPopup) {
            this._roomInfoPopup.show(false);
        }
    }

    public currentFilterText(): string {
        if (this._SafeStr_4254 != null) {
            return this._SafeStr_4254.currentInput;
        }
        return null;
    }

    public refreshLiftedRooms(): void {
        if (this._SafeStr_6516) {
            this._SafeStr_6516.refresh();
        }
    }

    public showRoomInfoBubbleAt(param1: GuestRoomData, param2: number, param3: number, param4: boolean = false): void {
        this._SafeStr_7342 = true;
        if (!this._window) {
            return;
        }
        if (!this._roomInfoPopup) {
            this._roomInfoPopup = new RoomInfoPopup(this._navigator);
        }
        if (this._roomInfoPopup.visible && !param4) {
            this._roomInfoPopup.show(false);
        } else {
            this._roomInfoPopup.setData(param1);
            if (param1.habboGroupId != 0 && this._navigator.getCachedGroupDetails(param1.habboGroupId) == null) {
                this._navigator.getGuildInfo(param1.habboGroupId, false);
                this._waitingForGroupDetails = param1.habboGroupId;
            }
            this._roomInfoPopup.showAt(true, param2, param3);
            this._navigator.trackEventLog("browse.openroominfo", "Results", param1.roomName, param1.flatId);
            this._SafeStr_4511 = 4000;
        }
    }

    public setLeftPaneVisibility(param1: boolean): void {
        let _loc3_: number = 0;
        let _loc2_: IWindow = this._window.findChildByName("left_pane");
        let _loc5_: number = this._SafeStr_5738 - this._leftPaneMargin + 7;
        this._SafeStr_2822.setParamFlag(0, true);
        this._SafeStr_2822.setParamFlag(128, false);
        if (!param1) {
            _loc2_.visible = false;
            this._SafeStr_2822.x = this._SafeStr_3895;
            this._window.limits.minWidth = this._window.width - _loc5_ + this._SafeStr_3895;
            this._window.limits.maxWidth = this._window.width - _loc5_ + this._SafeStr_3895;
            this._window.width = this._window.width - _loc5_ + this._SafeStr_3895;
        } else {
            _loc2_.visible = true;
            this._SafeStr_2822.x = this._SafeStr_5738;
            _loc3_ = this._window.width + _loc5_ - this._SafeStr_3895;
            this._window.limits.minWidth = _loc3_ > 578 ? 578 : _loc3_;
            this._window.limits.maxWidth = _loc3_ > 578 ? 578 : _loc3_;
            this._window.width = _loc3_ > 578 ? 578 : _loc3_;
        }
        this._SafeStr_2822.setParamFlag(0, false);
        this._SafeStr_2822.setParamFlag(128, true);
        this._window.findChildByName("left_hide_container").visible = param1;
        this._window.findChildByName("left_show_container").visible = !param1;
        let _loc4_: number = (param1 ? 115 : 115 - _loc5_ / 2) | 0;
        this._window.findChildByName("top_view_select_tab_context").x = _loc4_;
    }

    public update(param1: number): void {
        let _loc2_: number = getTimer() >>> 0;
        if (this.windowPreferencesChanged && _loc2_ - this._SafeStr_4165 > 5000) {
            this.sendWindowPreferences();
        }
        this.keepWindowInsideScreenRegion();
        this._SafeStr_4511 -= param1;
        if (this.isRoomInfoBubbleVisible && this._SafeStr_4511 < 0) {
            this._roomInfoPopup.getGlobalRectangle(this.roomInfoGlobalRectangle);
            if (!this.roomInfoGlobalRectangle.contains(this._window.desktop.mouseX, this._window.desktop.mouseY)) {
                this._roomInfoPopup.show(false);
            }
        }
    }

    public dispose(): void {
        this._navigator.removeUpdateReceiver(this);
    }

    public onGroupDetailsArrived(param1: number): void {
        if (this._waitingForGroupDetails == param1) {
            this._waitingForGroupDetails = -1;
        }
    }

    private createSubViews(): void {
        if (this._blockResultsView == null) {
            this._blockResultsView = new BlockResultsView(this._navigator);
            this._blockResultsView.categoryElementFactory = this._categoryElementFactory;
            this._categoryElementFactory.blockResultsView = this._blockResultsView;
        }
        if (this._SafeStr_4254 == null) {
            this._SafeStr_4254 = new SearchView(this._navigator);
        }
        if (this._SafeStr_3654 == null) {
            this._SafeStr_3654 = new QuickLinksView(this._navigator);
        }
        if (this._SafeStr_6516 == null) {
        }
        if (this._SafeStr_3478 == null) {
            this._SafeStr_3478 = new TopViewSelector(this._navigator);
        }
    }

    private createMainWindow(): void {
        let _loc8_: IWindowContainer = castGuarded(this._navigator.windowManager.buildFromXML(XML.from(this._navigator.assets.getAssetByName("navigator_frame_2_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(_loc8_.findChildByName("block_results"), isIScrollableListWindow, "com.sulake.core.window.components.IScrollableListWindow").autoHideScrollBar = false;
        let _loc10_: IWindowContainer = castGuarded(_loc8_.findChildByName("navigator_entry_row_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3356.rowEntryTemplate = castGuarded(_loc10_.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc10_.destroy();
        let _loc4_: IItemListWindow = castGuarded(_loc8_.findChildByName("navigator_entry_tile_container").clone(), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc5_: IWindowContainer = castGuarded(_loc4_.getListItemByName("navigator_entry_tile").clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3356.tileEntryTemplate = _loc5_;
        _loc4_.destroyListItems();
        this._SafeStr_3356.tileContainerTemplate = _loc4_;
        castGuarded(_loc8_.findChildByName("category_content"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").destroyListItems();
        let _loc9_: IWindowContainer = castGuarded(_loc8_.findChildByName("category_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._categoryElementFactory.categoryTemplate = castGuarded(_loc9_.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(_loc8_.findChildByName("block_results"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        _loc9_.destroy();
        let _loc1_: IWindowContainer = castGuarded(_loc8_.findChildByName("category_container_collapsed"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._categoryElementFactory.collapsedCategoryTemplate = castGuarded(_loc1_.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(_loc8_.findChildByName("block_results"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        _loc1_.destroy();
        let _loc6_: IWindowContainer = castGuarded(_loc8_.findChildByName("no_results_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._categoryElementFactory.noResultsTemplate = castGuarded(_loc6_.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(_loc8_.findChildByName("block_results"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        _loc6_.destroy();
        this._blockResultsView.itemList = castGuarded(_loc8_.findChildByName("block_results"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4254.container = castGuarded(_loc8_.findChildByName("search_tools"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: IRegionWindow = castGuarded(_loc8_.findChildByName("quick_link"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.findChildByName("quick_link_text").caption = "";
        this._SafeStr_3654.template = castGuarded(_loc3_.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        this._SafeStr_3654.itemList = castGuarded(_loc8_.findChildByName("quicklinks_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        castGuarded(_loc8_.findChildByName("quicklinks_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItems();
        _loc3_.destroy();
        let _loc2_: ITabContextWindow = castGuarded(_loc8_.findChildByName("top_view_select_tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        let _loc7_: ITabButtonWindow = castGuarded(_loc2_.getTabItemAt(0).clone(), isITabButtonWindow, "com.sulake.core.window.components.ITabButtonWindow");
        this._SafeStr_3478.template = _loc7_;
        this._SafeStr_3478.tabContext = _loc2_;
        _loc2_.removeTabItem(_loc7_);
        this._SafeStr_3478.refresh();
        this._SafeStr_7340 = castGuarded(_loc8_.findChildByName("create_room_border").clone(), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        castGuarded(_loc8_.findChildByName("left_pane"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItem(_loc8_.findChildByName("create_room_border"));
        this._SafeStr_7351 = castGuarded(_loc8_.findChildByName("promote_room_border").clone(), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        castGuarded(_loc8_.findChildByName("left_pane"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItem(_loc8_.findChildByName("promote_room_border"));
        this._SafeStr_7308 = castGuarded(_loc8_.findChildByName("random_room_border").clone(), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        castGuarded(_loc8_.findChildByName("left_pane"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItem(_loc8_.findChildByName("random_room_border"));
        this._leftPaneMargin = _loc8_.findChildByName("left_pane").x;
        _loc8_.findChildByName("refreshButton").procedure = this.refreshSearchResults;
        _loc8_.findChildByName("header_button_close").procedure = this.headerProcedure;
        this._SafeStr_3895 = 7;
        _loc8_.findChildByName("temp_back").procedure = this.leftPaneShowHideProcedure;
        this._SafeStr_2822 = _loc8_.findChildByName("right_pane");
        this._SafeStr_5738 = this._SafeStr_2822.x;
        this._window = _loc8_;
        this.setLeftPaneVisibility(false);
        if (this._SafeStr_3200 == -1 && this._SafeStr_3184 == -1) {
            this._SafeStr_3200 = this._window.x;
            this._SafeStr_3184 = this._window.y;
            this._lastWindowWidth = this._window.width;
            this._SafeStr_3337 = this._window.height;
        } else {
            if (this._lastLeftPaneHidden) {
                this.setLeftPaneVisibility(true);
            }
            this._window.x = this._SafeStr_3200;
            this._window.y = this._SafeStr_3184;
            this._window.height = this._SafeStr_3337;
        }
        this._SafeStr_4165 = getTimer() >>> 0;
    }

    private refreshSearchResults = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && param2.name == "refreshButton") {
            this._navigator.performLastSearch();
        }
    };

    private headerProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (param2.name == "header_button_close") {
                this.visible = false;
            }
        }
    };

    private createRoomProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.createRoom();
            if (this._roomInfoPopup) {
                this._roomInfoPopup.show(false);
            }
        }
    };

    private promoteRoomProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.context.createLinkEvent("catalog/open/room_ad");
            if (this._roomInfoPopup) {
                this._roomInfoPopup.show(false);
            }
        }
    };

    private randomRoomProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._navigator.context.createLinkEvent("navigator/goto/random_friending_room");
            if (this._roomInfoPopup) {
                this._roomInfoPopup.show(false);
            }
            this.visible = false;
        }
    };

    private leftPaneShowHideProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IWindow = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._window.findChildByName("left_pane");
            this.setLeftPaneVisibility(!_loc3_.visible);
            if (this._roomInfoPopup) {
                this._roomInfoPopup.show(false);
            }
        }
    };

    private keepWindowInsideScreenRegion(): void {
        this._window.x = Math.max(0, this._window.x) | 0;
        this._window.y = Math.max(0, this._window.y) | 0;
        if (this._window.desktop) {
            this._window.x = Math.min(this._window.desktop.width - this._window.width, this._window.x) | 0;
            this._window.y = Math.min(this._window.desktop.height - this._window.height, this._window.y) | 0;
        }
    }

    private sendWindowPreferences(): void {
        this._SafeStr_3200 = this._window.x;
        this._SafeStr_3184 = this._window.y;
        this._lastWindowWidth = this._window.width;
        this._SafeStr_3337 = this._window.height;
        this._lastLeftPaneHidden = this._window.findChildByName("left_pane").visible;
        this._SafeStr_4165 = getTimer() >>> 0;
        this._navigator.sendWindowPreferences(this._SafeStr_3200, this._SafeStr_3184, this._lastWindowWidth, this._SafeStr_3337, this._lastLeftPaneHidden, 0);
        this._navigator.trackEventLog("windowsettings", "Interface", this._window.width + " x " + this._window.height);
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
