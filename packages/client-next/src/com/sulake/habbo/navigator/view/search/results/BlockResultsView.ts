import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { SearchResultList } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultList';
import type { SearchResultSet } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultSet';
import type { CategoryElementFactory } from '@/com/sulake/habbo/navigator/view/search/results/CategoryElementFactory';
import { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator.group';

export class BlockResultsView {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search.results::BlockResultsView'); }

    private static readonly HOT_ROOMS_SEARCH_CODE: string = "hot";
    private static readonly POPULAR_ROOMS_SEARCH_CODE: string = "popular";

    declare private _navigator: HabboNewNavigator;

    declare private _itemList: IItemListWindow;

    declare private _categoryElementFactory: CategoryElementFactory;

    private _SafeStr_2621: Map<any, any> = new Dictionary();
    private _SafeStr_3974: Map<any, any> = new Dictionary();
    private _searchCodeViewMode: Map<any, any> = new Dictionary();

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    public get itemList(): IItemListWindow {
        return this._itemList;
    }

    public set itemList(param1: IItemListWindow) {
        this._itemList = param1;
    }

    public set categoryElementFactory(param1: CategoryElementFactory) {
        this._categoryElementFactory = param1;
    }

    public displayCurrentResults(): void {
        let _loc1_: IWindow = null;
        let _loc4_: SearchResultSet = null;
        let _loc2_: number = 0;
        let _loc3_: SearchResultList = null;
        if (this._navigator.currentResults == null) {
            return;
        }
        this._SafeStr_3974 = new Dictionary();
        this._SafeStr_2621 = new Dictionary();
        this._searchCodeViewMode = new Dictionary();
        this._itemList.destroyListItems();
        if (this._navigator.currentResults.resultSet.blocks.length == 0) {
            this._itemList.addListItem(this._categoryElementFactory.getNoResultsELement());
        } else {
            _loc4_ = this._navigator.currentResults.resultSet;
            this.applyHotelViewExpansionDefaults(_loc4_);
            _loc2_ = 0;
            while (_loc2_ < _loc4_.blocks.length) {
                _loc3_ = _loc4_.blocks[_loc2_];
                _loc1_ = this.renderCurrentResultsBlock(_loc2_, (!this.isMinimized(_loc3_.searchCode) || this.isSingleBlock(_loc4_)) && !_loc3_.forceClosed);
                _loc1_.id = _loc2_;
                this._itemList.addListItem(_loc1_);
                this._SafeStr_3974.set(_loc2_, _loc1_);
                this._SafeStr_2621.set(_loc2_, _loc3_.searchCode);
                this._searchCodeViewMode.set(_loc2_, _loc3_.viewMode);
                _loc2_++;
            }
        }
        this._itemList.arrangeListItems();
    }

    public onCategoryShowMoreClicked = (param1: WindowEvent): void => {
        this._navigator.performSearch(stringOrNull(this._SafeStr_2621.get(param1.window.id)), this._navigator.currentResults.filteringData);
        this._navigator.trackEventLog("browse.expandsearch", "Results", HabboNewNavigator.getEventLogExtraStringFromSearch(stringOrNull(this._SafeStr_2621.get(param1.window.id)), this._navigator.currentResults.filteringData));
    };

    public onCategoryBackClicked = (param1: WindowEvent): void => {
        this._navigator.goBack();
    };

    public onCategoryCollapseClicked = (param1: WindowEvent): void => {
        this._navigator.sendAddCollapsedCategory(stringOrNull(this._SafeStr_2621.get(param1.window.id)));
        this._navigator.collapsedCategories.push(stringOrNull(this._SafeStr_2621.get(param1.window.id)));
        this.replaceBlock(param1.window.id, false);
        this._navigator.trackEventLog("browse.collapsecategory", "Results", HabboNewNavigator.getEventLogExtraStringFromSearch(stringOrNull(this._SafeStr_2621.get(param1.window.id)), this._navigator.currentResults.filteringData));
    };

    public onCategoryExpandClicked = (param1: WindowEvent): void => {
        this._navigator.sendRemoveCollapsedCategory(stringOrNull(this._SafeStr_2621.get(param1.window.id)));
        this._navigator.collapsedCategories.splice(this._navigator.collapsedCategories.indexOf(this._SafeStr_2621.get(param1.window.id)), 1);
        this.replaceBlock(param1.window.id, true);
        this._navigator.trackEventLog("browse.uncollapsecategory", "Results", HabboNewNavigator.getEventLogExtraStringFromSearch(stringOrNull(this._SafeStr_2621.get(param1.window.id)), this._navigator.currentResults.filteringData));
    };

    public onCategoryAddQuickLinkClicked = (param1: WindowEvent): void => {
        this._navigator.addSavedSearch(stringOrNull(this._SafeStr_2621.get(param1.window.id)), this._navigator.currentResults.filteringData);
    };

    public onCategoryToggleModeClicked = (param1: WindowEvent): void => {
        let _loc2_: number = this.getToggledViewMode(this._searchCodeViewMode.get(param1.window.id) | 0);
        this._navigator.toggleSearchCodeViewMode(stringOrNull(this._SafeStr_2621.get(param1.window.id)), _loc2_);
        this._navigator.currentResults.resultSet.blocks[param1.window.id].viewMode = _loc2_;
        this.replaceBlock(param1.window.id, true);
        this._searchCodeViewMode.set(param1.window.id, _loc2_);
    };

    private getToggledViewMode(param1: number): number {
        if (param1 == 0) {
            return 1;
        }
        return 0;
    }

    public get itemListWidth(): number {
        return this._itemList.width;
    }

    private isMinimized(param1: string): boolean {
        return this._navigator.collapsedCategories.indexOf(param1) != -1;
    }

    private applyHotelViewExpansionDefaults(param1: SearchResultSet): void {
        if (param1.searchCodeOriginal != "hotel_view") {
            return;
        }
        let _loc2_: boolean = this.hasBlock(param1, "hot");
        this.setMinimized("hot", !_loc2_);
        if (this.hasBlock(param1, "popular")) {
            this.setMinimized("popular", _loc2_);
        }
    }

    private hasBlock(param1: SearchResultSet, param2: string): boolean {
        for (const _loc3_ of param1.blocks ?? []) {
            if (_loc3_.searchCode == param2) {
                return true;
            }
        }
        return false;
    }

    private setMinimized(param1: string, param2: boolean): void {
        let _loc3_: number = this._navigator.collapsedCategories.indexOf(param1);
        while (_loc3_ != -1) {
            this._navigator.collapsedCategories.splice(_loc3_, 1);
            _loc3_ = this._navigator.collapsedCategories.indexOf(param1);
        }
        if (param2) {
            this._navigator.collapsedCategories.push(param1);
        }
    }

    private isSingleBlock(param1: SearchResultSet): boolean {
        return param1.blocks.length == 1;
    }

    private renderCurrentResultsBlock(param1: number, param2: boolean): IWindow {
        let _loc5_: number = 0;
        let _loc3_: SearchResultList = this._navigator.currentResults.resultSet.blocks[param1];
        let _loc4_: string = _loc3_.text == "" ? "${navigator.searchcode.title." + _loc3_.searchCode + "}" : _loc3_.text;
        if (param2) {
            _loc5_ = !this._navigator.sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA") && this._navigator.currentResults.searchCodeOriginal != "official_view" ? 0 : _loc3_.viewMode;
            return this._categoryElementFactory.getOpenCategoryElement(_loc3_.guestRooms, _loc4_, param1, _loc3_.actionAllowed, _loc5_);
        }
        return this._categoryElementFactory.getCollapsedCategoryElement(_loc4_, param1, _loc3_.actionAllowed);
    }

    private replaceBlock(param1: number, param2: boolean): void {
        let _loc4_: number = this._itemList.getListItemIndex(this._SafeStr_3974.get(param1));
        this._itemList.removeListItemAt(_loc4_);
        let _loc3_: IWindow = this.renderCurrentResultsBlock(param1, param2);
        _loc3_.id = param1;
        this._itemList.addListItemAt(_loc3_, _loc4_ >>> 0);
        this._SafeStr_3974.set(param1, _loc3_);
    }
}
