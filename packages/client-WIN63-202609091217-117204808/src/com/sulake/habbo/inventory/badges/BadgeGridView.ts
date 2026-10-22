import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Badge } from '@/com/sulake/habbo/inventory/badges/Badge';
import type { BadgesView } from '@/com/sulake/habbo/inventory/badges/BadgesView';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class BadgeGridView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.badges::BadgeGridView'); }

    private static readonly FILTER_ALL: number = 0;
    private static readonly FILTER_NORMAL_BADGES: number = 1;
    private static readonly FILTER_ACHIEVEMENTS: number = 2;
    private static readonly _SafeStr_14283: number = -1;
    private static readonly _SafeStr_14284: number = -2;
    private static readonly ACHIEVEMENT_PREFIX: string = "ACH_";

    declare private _view: BadgesView;

    declare private _grid: IItemGridWindow;

    declare private _items: Badge[];

    declare private _passedItems: Badge[];

    declare private _pages: IItemListWindow;

    declare private _pageTemplate: IRegionWindow;

    private _SafeStr_6064: number = 200;
    private _currentPage: number = -1;

    declare private _currentPageItems: Badge[];

    private _filter: string = "";
    private _SafeStr_14285: number = 0;
    private _SafeStr_14286: number = -1;

    constructor(param1: BadgesView, param2: IItemGridWindow, param3: IItemListWindow) {
        this._view = param1;
        this._grid = param2;
        this._grid.shouldRebuildGridOnResize = false;
        this._items = new Array<Badge>(0).fill(null);
        this._passedItems = new Array<Badge>(0).fill(null);
        this._pages = param3;
        if (this._pages) {
            this._pageTemplate = asGuarded(this._pages.removeListItemAt(0), isIRegionWindow);
        }
    }

    public get visibleCount(): number {
        return this._grid.numGridItems | 0;
    }

    public get currentPageItems(): Badge[] {
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

    public setFilter(param1: number, param2: number, param3: string): void {
        this._SafeStr_14285 = param1;
        this._SafeStr_14286 = param2;
        this._filter = param3 == null ? "" : param3.toLowerCase();
        this.update();
    }

    public itemWasUpdated(param1: Badge): void {
        if (this.passFilter(param1)) {
            this.update();
        }
    }

    public getFirstThumb(): IWindowContainer {
        if (this._grid.numGridItems == 0) {
            return null;
        }
        return asGuarded(this._grid.getGridItemAt(0), isIWindowContainer);
    }

    public setItems(param1: Badge[]): void {
        this._items = param1;
        this.update();
    }

    private update(): void {
        let _loc2_: any = null;
        let _loc3_: boolean = false;
        let _loc4_: number = 0;
        let _loc1_: Badge[] = new Array<Badge>(0).fill(null);
        for (_loc2_ of this._items ?? []) {
            if (this.passFilter(_loc2_)) {
                _loc1_.push(_loc2_);
            }
        }
        if (_loc1_.length == this._passedItems.length) {
            _loc3_ = false;
            _loc4_ = 0;
            while (_loc4_ < _loc1_.length) {
                if (_loc1_[_loc4_] != this._passedItems[_loc4_]) {
                    _loc3_ = true;
                    break;
                }
                _loc4_++;
            }
            if (!_loc3_) {
                return;
            }
        }
        this._passedItems = _loc1_;
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
        this._currentPageItems = new Array<Badge>(0).fill(null);
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

    private updatePassedItems(param1: Badge): void {
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

    private passFilter(param1: Badge): boolean {
        let _loc2_: string = null;
        let _loc4_: string = null;
        if (param1 == null || param1.badgeName == null || param1.badgeDescription == null) {
            return false;
        }
        let _loc3_: boolean = param1.badgeId != null && param1.badgeId.indexOf("ACH_") == 0;
        if (this._SafeStr_14285 == 1 && _loc3_) {
            return false;
        }
        if (this._SafeStr_14285 == 2 && !_loc3_) {
            return false;
        }
        if (this._SafeStr_14286 == -2) {
            if (this._view.isStandaloneBadgeRarity(param1.badgeRarityId)) {
                return false;
            }
        } else if (this._SafeStr_14286 != -1 && param1.badgeRarityId != this._SafeStr_14286) {
            return false;
        }
        if (this._filter.length > 0) {
            _loc2_ = param1.badgeName.toLowerCase();
            _loc4_ = param1.badgeDescription.toLowerCase();
            if (_loc2_.indexOf(this._filter) == -1 && _loc4_.indexOf(this._filter) == -1) {
                return false;
            }
        }
        return true;
    }
}
