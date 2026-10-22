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

export class FurniGridView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.furni::FurniGridView'); }

    private static readonly PLACEMENT_ANYWHERE: number = 0;
    private static readonly PLACEMENT_IN_ROOM: number = 1;
    private static readonly PLACEMENT_NOT_IN_ROOM: number = 2;

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

    declare private _grid: IItemGridWindow;

    declare private _items: GroupItem[];

    declare private _passedItems: GroupItem[];

    declare private _pages: IItemListWindow;

    declare private _pageTemplate: IRegionWindow;

    private _SafeStr_6064: number = 200;
    private _currentPage: number = -1;
    private _filter: string = "";
    private _showingRentedItems: boolean = false;
    private _SafeStr_4629: boolean = false;
    private _showingNfts: boolean = true;
    private _showFloorItems: boolean = true;
    private _showWallItems: boolean = true;

    declare private _SafeStr_4481: number;
    static { (this.prototype as any)._SafeStr_4481 = 0; }

    declare private _SafeStr_4754: WiredTradeRequirementsModel;

    declare private _currentPageItems: GroupItem[];

    public get currentPageItems(): GroupItem[] {
        return this._currentPageItems;
    }

    public get visibleCount(): number {
        return this._grid.numGridItems | 0;
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

    public setFilter(param1: number, param2: string, param3: boolean, param4: boolean, param5: string, param6: number, param7: boolean): void {
        this._showFloorItems = param1 == 0 || param1 == 1;
        this._showWallItems = param1 == 0 || param1 == 2;
        this._showingRentedItems = param3;
        this._SafeStr_4629 = param4;
        this._showingNfts = param7;
        this._SafeStr_4481 = param6;
        this._filter = param5.toLowerCase();
        this._SafeStr_4754 = null;
        this.update();
    }

    public setFilterByWired(param1: number, param2: string, param3: string, param4: WiredTradeRequirementsModel): void {
        this._showFloorItems = param1 == 0 || param1 == 1;
        this._showWallItems = param1 == 0 || param1 == 2;
        this._showingRentedItems = false;
        this._SafeStr_4629 = true;
        this._showingNfts = false;
        this._SafeStr_4481 = 0;
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
        let _loc5_: any = 0;
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
        if (!this._showFloorItems && !param1.isWallItem) {
            return false;
        }
        if (!this._showWallItems && param1.isWallItem) {
            return false;
        }
        if (!this._SafeStr_4629 && this._showingRentedItems != param1.isRented) {
            return false;
        }
        if (!this._showingNfts && param1.isNft()) {
            return false;
        }
        if (this._SafeStr_4481 == 1 && param1.flatId == -1) {
            return false;
        }
        if (this._SafeStr_4481 == 2 && param1.flatId > -1) {
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
}
