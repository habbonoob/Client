import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { _SafeCls_6084 } from '@/com/sulake/habbo/inventory/furni/_SafeCls_6084';

export class FurniGridView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.furni::FurniGridView'); }

    declare private _grid: IItemGridWindow;

    declare private _items: GroupItem[];

    declare private _passedItems: GroupItem[];

    declare private _pages: IItemListWindow;

    declare private _pageTemplate: IRegionWindow;

    private _SafeStr_6064: number = 200;
    private _currentPage: number = -1;

    declare private _currentPageItems: GroupItem[];

    private _filter: string = "";
    private _showingRentedItems: boolean = false;
    private _SafeStr_4629: boolean = false;
    private _showingNfts: boolean = true;
    private _showFloorItems: string = "all";
    private _SafeStr_5619: string = "any";

    declare private _SafeStr_4754: WiredTradeRequirementsModel;

    constructor(param1: IItemGridWindow, param2: IItemListWindow) {
        this._grid = param1;
        this._grid.shouldRebuildGridOnResize = false;
        this._items = new Array<GroupItem>(0).fill(null);
        this._passedItems = new Array<GroupItem>(0).fill(null);
        this._pages = param2;
        if (this._pages) {
            this._pageTemplate = asGuarded(this._pages.removeListItemAt(0), isIRegionWindow);
        }
    }

    public get visibleCount(): number {
        return this._grid.numGridItems | 0;
    }

    public get currentPageItems(): GroupItem[] {
        return this._currentPageItems;
    }

    private get pageCount(): number {
        return this._passedItems.length / this._SafeStr_6064 + 1 | 0;
    }

    public dispose(): void {
        this._grid = null;
        this._items = null;
    }

    public clearGrid(): void {
        if (this._grid != null) {
            this._grid.removeGridItems();
        }
        this._grid.destroyGridItems();
    }

    public setFilter(param1: string, param2: string, param3: boolean, param4: boolean, param5: string, param6: boolean): void {
        this._showFloorItems = param1;
        this._SafeStr_5619 = param2;
        this._showingRentedItems = param3;
        this._SafeStr_4629 = param4;
        this._showingNfts = param6;
        this._filter = param5.toLowerCase();
        this._SafeStr_4754 = null;
        this.update();
    }

    public setFilterByWired(param1: string, param2: string, param3: string, param4: WiredTradeRequirementsModel): void {
        this._showFloorItems = param1;
        this._SafeStr_5619 = param2;
        this._showingRentedItems = false;
        this._SafeStr_4629 = true;
        this._showingNfts = false;
        this._filter = param3.toLowerCase();
        this._SafeStr_4754 = param4;
        this.update();
    }

    public itemWasUpdated(param1: GroupItem): void {
        if (this.passFilter(param1)) {
            this.update();
        }
    }

    public itemsWereUpdated(param1: any[]): void {
        let _loc2_: boolean = false;
        for (const _loc3_ of param1 ?? []) {
            if (this.passFilter(_loc3_)) {
                _loc2_ = true;
                break;
            }
        }
        if (_loc2_) {
            this.update();
        }
    }

    public getFirstThumb(): IWindowContainer {
        if (this._grid.numGridItems == 0) {
            return null;
        }
        return asGuarded(this._grid.getGridItemAt(0), isIWindowContainer);
    }

    public setItems(param1: GroupItem[]): void {
        this._items = param1;
        this.update();
    }

    private update(): void {
        let item: GroupItem;
        let changes: boolean = false;
        let i: number = 0;
        let currentItems: GroupItem[] = new Array<GroupItem>(0).fill(null);
        for (item of this._items ?? []) {
            if (this.passFilter(item)) {
                currentItems.push(item);
            }
        }
        if (!this._SafeStr_4629 && this._showingRentedItems) {
            currentItems = currentItems.sort((param1: GroupItem, param2: GroupItem): number => {
                let _loc5_: FurnitureItem = param1.peek();
                let _loc4_: FurnitureItem = param2.peek();
                let _loc3_: number = (Number(_loc4_.hasRentPeriodStarted) | 0) - (Number(_loc5_.hasRentPeriodStarted) | 0);
                return _loc3_ != 0 ? _loc3_ : _loc5_.secondsToExpiration - _loc4_.secondsToExpiration;
            });
        }
        if (currentItems.length == this._passedItems.length) {
            changes = false;
            i = 0;
            while (i < currentItems.length) {
                if (currentItems[i] != this._passedItems[i]) {
                    changes = true;
                    break;
                }
                i = i + 1;
            }
            if (!changes) {
                return;
            }
        }
        this._passedItems = currentItems;
        this.changeToPage(this._currentPage, true);
        this.updatePaging();
    }

    private changeToPage(param1: number, param2: boolean = false): void {
        let _loc5_: number = 0;
        if (param1 > -1) {
            if (this._currentPage == param1 && !param2) {
                return;
            }
        } else {
            param1 = 0;
        }
        this._currentPage = param1;
        if (this._currentPage >= this.pageCount) {
            this._currentPage = this.pageCount - 1;
        }
        this._currentPage = Math.max(this._currentPage, 0) | 0;
        this._currentPageItems = new Array<GroupItem>(0).fill(null);
        this.clearGrid();
        let _loc3_: number = this._currentPage * this._SafeStr_6064;
        let _loc4_: number = _loc3_ + this._SafeStr_6064;
        _loc4_ = Math.min(_loc4_, this._passedItems.length) | 0;
        _loc5_ = _loc3_;
        while (_loc5_ < _loc4_) {
            this._grid.addGridItem(this._passedItems[_loc5_].window);
            this._currentPageItems.push(this._passedItems[_loc5_]);
            _loc5_++;
        }
    }

    private updatePassedItems(param1: GroupItem): void {
    }

    private updatePaging(): void {
        let _loc4_: IRegionWindow = null;
        let _loc3_: number = 0;
        let _loc2_: ITextWindow = null;
        if (!this._pages) {
            return;
        }
        let _loc1_: number = this.pageCount;
        this._pages.visible = _loc1_ > 1;
        if (this._currentPage >= _loc1_) {
            this._currentPage = _loc1_ - 1;
        }
        this._currentPage = Math.max(this._currentPage, 0) | 0;
        if (this.pageCount != this._pages.numListItems) {
            for (_loc4_ of valuesOf(this._pages)) {
                _loc4_.removeEventListener("WME_CLICK", this.onPageEventProc);
            }
            this._pages.destroyListItems();
            _loc3_ = 0;
            while (_loc3_ < _loc1_) {
                _loc4_ = asGuarded(this._pageTemplate.clone(), isIRegionWindow);
                _loc4_.addEventListener("WME_CLICK", this.onPageEventProc);
                _loc4_.addEventListener("WME_OVER", this.onPageEventProc);
                _loc4_.addEventListener("WME_OUT", this.onPageEventProc);
                _loc4_.id = _loc3_;
                _loc4_.name = "page_" + _loc3_;
                this._pages.addListItem(_loc4_);
                _loc3_++;
            }
        }
        _loc3_ = 0;
        while (_loc3_ < _loc1_) {
            _loc4_ = asGuarded(this._pages.getListItemAt(_loc3_ >>> 0), isIRegionWindow);
            _loc2_ = asGuarded(_loc4_.findChildByTag("PAGE"), isITextWindow);
            _loc2_.caption = _loc3_.toString();
            if (_loc3_ == this._currentPage) {
                _loc2_.underline = true;
                _loc2_.textColor = 16711680;
            } else {
                _loc2_.underline = false;
                _loc2_.textColor = 0;
            }
            _loc3_++;
        }
    }

    private onPageEventProc = (param1: WindowMouseEvent): void => {
        let _loc3_: number = param1.window.id;
        let _loc2_: ITextWindow = asGuarded((asGuarded(param1.target, isIWindowContainer)).findChildByTag("PAGE"), isITextWindow);
        switch (param1.type) {
            case "WME_CLICK":
                this.changeToPage(_loc3_);
                this.updatePaging();
                break;
            case "WME_OVER":
                _loc2_.textColor = 16711680;
                break;
            case "WME_OUT":
                if (_loc3_ != this._currentPage) {
                    _loc2_.textColor = 0;
                }
        }
    };

    private passFilter(param1: GroupItem): boolean {
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc2_: string = null;
        if (!this.passMainFilter(param1)) {
            return false;
        }
        if (!this.passTypeFilter(param1)) {
            return false;
        }
        if (!this._SafeStr_4629 && this._showingRentedItems != param1.isRented) {
            return false;
        }
        if (!this._showingNfts && param1.isNft()) {
            return false;
        }
        if (this._filter.length > 0) {
            _loc3_ = param1.name.toLowerCase();
            _loc4_ = param1.description.toLowerCase();
            _loc2_ = param1.stuffData.chestName.toLowerCase();
            if (_loc3_.indexOf(this._filter) == -1 && _loc4_.indexOf(this._filter) == -1 && (_loc2_ == "" || _loc2_.indexOf(this._filter) == -1)) {
                return false;
            }
        }
        if (this._SafeStr_4754 != null && !this._SafeStr_4754.canOfferFurni(param1)) {
            return false;
        }
        return true;
    }

    private passMainFilter(param1: GroupItem): boolean {
        switch (this._showFloorItems) {
            case "all":
                return true;
            case "floor_items":
                return !param1.isWallItem;
            case "wall_items":
                return param1.isWallItem && !_SafeCls_6084.isRoomLayout(param1);
            case "room_layout":
                return _SafeCls_6084.isRoomLayout(param1);
            default:
                return true;
        }
    }

    private passTypeFilter(param1: GroupItem): boolean {
        switch (this._SafeStr_5619) {
            case "any":
                return true;
            case "sittable":
                return _SafeCls_6084.isSittable(param1);
            case "layable":
                return _SafeCls_6084.isLayable(param1);
            case "tiles_or_rugs":
                return _SafeCls_6084.isTilesOrRugs(param1);
            case "ltd":
                return _SafeCls_6084.isLtd(param1);
            case "wired":
                return _SafeCls_6084.isWired(param1);
            case "credit_furni":
                return _SafeCls_6084.isCreditFurni(param1);
            case "clothes":
                return _SafeCls_6084.isClothes(param1);
            case "pet_food":
                return _SafeCls_6084.isPetFood(param1);
            case "collectibles":
                return _SafeCls_6084.isCollectible(param1);
            case "tradable":
                return _SafeCls_6084.isTradable(param1);
            case "non_tradable":
                return _SafeCls_6084.isNonTradable(param1);
            case "recyclable":
                return _SafeCls_6084.isRecyclable(param1);
            case "windows":
                return _SafeCls_6084.isWindow(param1);
            case "dimmers":
                return _SafeCls_6084.isDimmer(param1);
            case "stickies":
                return _SafeCls_6084.isStickie(param1);
            case "paintings":
                return _SafeCls_6084.isPainting(param1);
            case "floors":
                return _SafeCls_6084.isFloor(param1);
            case "wallpapers":
                return _SafeCls_6084.isWallpaper(param1);
            case "landscape":
                return _SafeCls_6084.isLandscape(param1);
            default:
                return true;
        }
    }
}
