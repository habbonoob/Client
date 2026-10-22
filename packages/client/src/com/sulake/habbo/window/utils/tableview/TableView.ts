import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import type { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DeBouncer } from '@/com/sulake/habbo/utils/DeBouncer';
import { CellTemplate } from '@/com/sulake/habbo/window/utils/tableview/CellTemplate';
import { TableRowModel } from '@/com/sulake/habbo/window/utils/tableview/TableRowModel';
import { TableRowView } from '@/com/sulake/habbo/window/utils/tableview/TableRowView';

export class TableView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableView'); }

    private static SKIP_SCROLL_RESIZE: number = 500;
    private static LAZY_CHUNKING: number = 30;
    private static LAZY_CHUNKING_MINIMAL: number = 8;
    private static SCROLL_BUFFER: number = 24;
    private static SCROLL_BUFFER_MINIMAL: number = 2;
    private static TABLE_MARGIN: number = 5;
    private static SCROLLBAR_OFFSET: number = 21;

    constructor(param1: IHabboWindowManager, param2: IWindowContainer, param3: boolean = false, param4: boolean = false) {
        this._parent = param2;
        this._SafeStr_4304 = new DeBouncer(150, 300, this.manageRowViews);
        this._minimalResourcesMode = param4;
        this._container = asGuarded(param1.buildFromXML(asInstanceOf(param1.assets.getAssetByName("table_view_xml").content, XML)), isIWindowContainer);
        param2.addChild(this._container);
        this._SafeStr_2832 = asGuarded(this._container.findChildByName("table_titlerow"), isIItemListWindow);
        this._SafeStr_3452 = asGuarded(this._container.findChildByName("splitter"), isIBackgroundWindow);
        this.tableContents.removeListItem(this._SafeStr_2832);
        this.tableContents.removeListItem(this._SafeStr_3452);
        this._SafeStr_4384 = asGuarded(this._SafeStr_2832.removeListItemAt(0), isITextWindow);
        this._rowTemplate = asGuarded(this.tableItems.removeListItemAt(1), isIItemListWindow);
        this._cellTemplate = new CellTemplate(asGuarded(this._rowTemplate.removeListItemAt(0), isIRegionWindow));
        this._container.width = param2.width;
        this._container.height = param2.height;
        this.updateTableItemsHeight();
        this.resizeHorizontally();
        this.updateEmptyText();
        if (param3) {
            this._container.setParamFlag(2048, true);
        }
        this.tableContents.addEventListener("WE_RESIZED", this.onTableContentsResized);
        this.tableItems.findChildByTag("_ITEMLIST").addEventListener("WE_SCROLL", this.onScrolled);
    }

    declare private _SafeStr_5262: TableRowView[];

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _parent: IWindowContainer;

    declare private _container: IWindowContainer;

    declare private _SafeStr_2832: IItemListWindow;

    declare private _SafeStr_3452: IBackgroundWindow;

    declare private _SafeStr_4384: ITextWindow;

    declare private _rowTemplate: IItemListWindow;

    declare private _cellTemplate: CellTemplate;

    declare private _columns: TableColumn[];

    declare private _rowModels: TableRowModel[];

    declare private _SafeStr_3697: Map<any, any>;

    declare private _canSelect: boolean;
    static { (this.prototype as any)._canSelect = false; }

    private _onRowHoverCallback: (...args: any[]) => any = null;
    private _SafeStr_5563: boolean = true;
    private _SafeStr_5488: boolean = false;
    private _selectedRow: TableRowModel = null;
    private _SafeStr_2528: TableRowModel = null;
    private _ignoreListeners: boolean = false;

    declare private _SafeStr_4304: DeBouncer;

    private _forceUpdate: boolean = false;
    private _minimalResourcesMode: boolean = false;
    private _needScrollReset: boolean = false;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _onRowClickedCallback: (...args: any[]) => any = null;

    public set onRowClickedCallback(param1: (...args: any[]) => any) {
        this._onRowClickedCallback = param1;
    }

    private _onRowSelectedCallback: (...args: any[]) => any = null;

    public set onRowSelectedCallback(param1: (...args: any[]) => any) {
        this._onRowSelectedCallback = param1;
    }

    private _onCellEditCallback: (...args: any[]) => any = null;

    public set onCellEditCallback(param1: (...args: any[]) => any) {
        this._onCellEditCallback = param1;
    }

    public get selected(): ITableObject {
        if (this._selectedRow == null) {
            return null;
        }
        return this._selectedRow.object;
    }

    public get size(): number {
        return this._rowModels.length | 0;
    }

    public get rowWidth(): number {
        return this.tableContents.width - (this._SafeStr_5488 ? TableView.SCROLLBAR_OFFSET : 0);
    }

    public get columns(): TableColumn[] {
        return this._columns;
    }

    public get rowTemplate(): IItemListWindow {
        return this._rowTemplate;
    }

    public get cellTemplate(): CellTemplate {
        return this._cellTemplate;
    }

    public set onRowHoveredCallback(param1: (...args: any[]) => any) {
        this._onRowHoverCallback = param1;
    }

    public get rowCount(): number {
        return this._rowModels.length | 0;
    }

    private get visibleRangeFirstIndex(): number {
        if (this._container == null) {
            return 0;
        }
        let _loc5_: number = this._rowTemplate.height;
        let _loc3_: Rectangle = this.tableItems.visibleRegion;
        let _loc2_: number = _loc3_.y | 0;
        let _loc4_: number = _loc2_ / _loc5_ | 0;
        let _loc1_: number = Math.min(_loc4_ - 1, this._rowModels.length - this.tableItems.height / _loc5_) | 0;
        _loc1_ -= this.scrollBuffer + _loc1_ % this.lazyChunking;
        return Math.max(0, _loc1_) | 0;
    }

    private get visibleRangeLastIndex(): number {
        if (this._container == null) {
            return 0;
        }
        let _loc5_: number = this._rowTemplate.height;
        let _loc4_: Rectangle = this.tableItems.visibleRegion;
        let _loc3_: number = _loc4_.y + _loc4_.height | 0;
        let _loc2_: number = _loc3_ / _loc5_ | 0;
        let _loc1_: number = Math.min(_loc2_ + 1, this._rowModels.length - 1) | 0;
        return _loc1_ + (this.scrollBuffer + this.lazyChunking - _loc1_ % this.lazyChunking);
    }

    private get lazyChunking(): number {
        return this._minimalResourcesMode ? TableView.LAZY_CHUNKING_MINIMAL : TableView.LAZY_CHUNKING;
    }

    private get scrollBuffer(): number {
        return this._minimalResourcesMode ? TableView.SCROLL_BUFFER : TableView.SCROLL_BUFFER_MINIMAL;
    }

    private get border(): IBorderWindow {
        return asGuarded(this._container.findChildByName("table_border"), isIBorderWindow);
    }

    private get tableContents(): IItemListWindow {
        return asGuarded(this._container.findChildByName("table_contents"), isIItemListWindow);
    }

    private get tableItems(): IScrollableListWindow {
        return asGuarded(this._container.findChildByName("table_items"), isIScrollableListWindow);
    }

    private get emptyTextContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("empty_container"), isIWindowContainer);
    }

    public initialize(param1: TableColumn[], param2: boolean = true, param3: boolean = true): void {
        if (this._initialized) {
            return;
        }
        this._canSelect = param3;
        this._SafeStr_5262 = [];
        this._rowModels = [];
        this._SafeStr_3697 = new Dictionary();
        this._SafeStr_5563 = param2;
        if (param2) {
            this.tableContents.addListItemAt(this._SafeStr_2832, 0);
            this.tableContents.addListItemAt(this._SafeStr_3452, 1);
        } else {
            this.updateTableItemsHeight();
            this.updateEmptyText();
        }
        this.initializeColumns(param1);
        this._initialized = true;
    }

    public setObjects(param1: ITableObject[], param2: boolean = false): void {
        let _loc13_: ITableObject = null;
        let _loc6_: number = 0;
        let _loc9_: TableRowModel = null;
        let _loc12_: TableRowModel = null;
        if (!this._initialized) {
            return;
        }
        if (param1.length == 0) {
            this.clear();
            return;
        }
        this._ignoreListeners = true;
        let _loc7_: number = this._rowModels.length | 0;
        let _loc8_: boolean = false;
        let _loc11_: Map<any, any> = new Dictionary();
        let _loc3_: TableRowModel[] = [];
        for (_loc13_ of param1 ?? []) {
            _loc9_ = this.getRowForObject(_loc13_);
            if (_loc9_ != null) {
                _loc9_.update(_loc13_);
                _loc11_.set(_loc9_, true);
                _loc3_.push(_loc9_);
            } else {
                _loc3_.push(null);
            }
        }
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        for (const _loc10_ of this._rowModels ?? []) {
            if (!(_loc11_.has(_loc10_))) {
                if (this._selectedRow == _loc10_) {
                    this._selectedRow = null;
                    _loc4_ = true;
                }
                if (this._SafeStr_2528 == _loc10_) {
                    this._SafeStr_2528 = null;
                    _loc5_ = true;
                }
                if (_loc10_.view != null) {
                    this.recycleRowView(_loc10_.view);
                    _loc10_.view = null;
                    this._forceUpdate = true;
                }
                _loc8_ = true;
                _loc10_.dispose();
            }
        }
        this._SafeStr_3697 = new Dictionary();
        _loc6_ = 0;
        while (_loc6_ < param1.length) {
            _loc13_ = param1[_loc6_];
            _loc12_ = _loc3_[_loc6_];
            if (_loc12_ == null) {
                _loc12_ = new TableRowModel(_loc13_, _loc6_);
                _loc3_[_loc6_] = _loc12_;
                _loc8_ = true;
            }
            this._SafeStr_3697.set(_loc13_.identifier, _loc12_);
            if (_loc12_.i != _loc6_) {
                _loc8_ = true;
            }
            _loc6_ += 1;
        }
        this._rowModels = _loc3_;
        this._ignoreListeners = false;
        this._needScrollReset ||= param2;
        if (_loc8_) {
            _loc6_ = 0;
            while (_loc6_ < this._rowModels.length) {
                this._rowModels[_loc6_].index = _loc6_;
                _loc6_ += 1;
            }
        }
        if (_loc8_ || this._needScrollReset) {
            this.manageRowViewsWithDebounce();
        }
        if (_loc7_ != this._rowModels.length) {
            this.itemListAmountChanged();
        }
        if (_loc4_ && this._onRowSelectedCallback != null) {
            this._onRowSelectedCallback(null);
        }
        if (_loc5_ && this._onRowHoverCallback != null) {
            this._onRowHoverCallback(null);
        }
    }

    public manageRowViewsWithDebounce(): void {
        if (this.manageRowViews(true)) {
            this._SafeStr_4304.trigger();
        }
    }

    public scrollToTop(): void {
        this.tableItems.scrollV = 0;
    }

    public clear(): void {
        if (!this._initialized) {
            return;
        }
        this._ignoreListeners = true;
        let _loc2_: IWindow = this.tableItems.getListItemAt(0);
        let _loc3_: IWindow = this.tableItems.getListItemAt(this.tableItems.numListItems - 1 >>> 0);
        this.tableItems.removeListItems();
        _loc2_.height = 0;
        _loc3_.height = this.tableItems.height;
        this.tableItems.addListItem(_loc2_);
        this.tableItems.addListItem(_loc3_);
        this._ignoreListeners = false;
        for (const _loc1_ of this._rowModels ?? []) {
            if (_loc1_.view != null) {
                this.recycleRowView(_loc1_.view);
                _loc1_.view = null;
            }
            _loc1_.dispose();
        }
        this._rowModels = [];
        this._SafeStr_3697 = new Dictionary();
        if (this._selectedRow != null) {
            this._selectedRow = null;
            if (this._onRowSelectedCallback != null) {
                this._onRowSelectedCallback(null);
            }
        }
        if (this._SafeStr_2528 != null) {
            this._SafeStr_2528 = null;
            if (this._onRowHoverCallback != null) {
                this._onRowHoverCallback(null);
            }
        }
        this.itemListAmountChanged();
    }

    public resetScrollingNextUpdate(): void {
        this._needScrollReset = true;
    }

    public resizeHorizontally(): void {
        let _loc3_: number = 0;
        let _loc4_: ITextWindow = null;
        this._container.width = this._parent.width;
        this._SafeStr_2832.width = this.rowWidth;
        this._SafeStr_3452.width = this.rowWidth;
        let _loc2_: number = this._SafeStr_2832.numListItems;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = asGuarded(this._SafeStr_2832.getListItemAt(_loc3_ >>> 0), isITextWindow);
            _loc4_.width = this.getCellWidth(this._columns[_loc3_].id);
            _loc3_++;
        }
        for (const _loc1_ of this._rowModels ?? []) {
            if (_loc1_.view != null) {
                _loc1_.view.updateWidth();
            }
        }
    }

    public getColumnById(param1: string): TableColumn {
        for (const _loc2_ of this._columns ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getIndexOfObject(param1: ITableObject): number {
        if (param1 == null) {
            return -1;
        }
        let _loc2_: TableRowModel = this.getRowForObject(param1);
        if (_loc2_ == null) {
            return -1;
        }
        return _loc2_.i;
    }

    public getObjectByIndex(param1: number): ITableObject {
        if (param1 < 0 || param1 >= this._rowModels.length) {
            return null;
        }
        return this._rowModels[param1].object;
    }

    public trySelect(param1: ITableObject, param2: boolean = false): void {
        let _loc4_: TableRowModel = null;
        if (this._onRowClickedCallback && param2) {
            this._onRowClickedCallback(param1);
        }
        if (!this._canSelect) {
            return;
        }
        if (this._selectedRow != null && param1 != null && this._selectedRow.object == param1) {
            return;
        }
        let _loc3_: boolean = false;
        if (this._selectedRow != null) {
            this._selectedRow.selected = false;
            this._selectedRow = null;
            _loc3_ = true;
        }
        if (param1 != null) {
            _loc4_ = this.getRowForObject(param1);
            if (_loc4_ != null) {
                _loc4_.selected = true;
                this._selectedRow = _loc4_;
                _loc3_ = true;
            }
        }
        if (_loc3_ && this._onRowSelectedCallback != null) {
            this._onRowSelectedCallback(this._selectedRow != null ? this._selectedRow.object : null);
        }
    }

    public getGlobalRowRectangle(param1: ITableObject): Rectangle {
        let _loc3_: TableRowModel = this.getRowForObject(param1);
        if (_loc3_ == null || _loc3_.view == null) {
            return null;
        }
        let _loc2_: Rectangle = new Rectangle();
        _loc3_.view.container.getGlobalRectangle(_loc2_);
        return _loc2_;
    }

    public getCellWidth(param1: string): number {
        return this.rowWidth * this.getColumnById(param1).widthFactor | 0;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_4304.dispose();
        this._SafeStr_4304 = null;
        this.clear();
        this._initialized = false;
        this._container.dispose();
        this._container = null;
        this._parent = null;
        this._SafeStr_2832 = null;
        this._SafeStr_3452 = null;
        this._SafeStr_4384.dispose();
        this._SafeStr_4384 = null;
        this._rowTemplate.dispose();
        this._rowTemplate = null;
        this._columns = null;
        this._onRowHoverCallback = null;
        this._onRowSelectedCallback = null;
        this._onRowClickedCallback = null;
        this._onCellEditCallback = null;
        this._disposed = true;
    }

    public onHover(param1: ITableObject): void {
        let _loc3_: TableRowModel = null;
        if (this._SafeStr_2528 != null && param1 != null && this._SafeStr_2528.object == param1) {
            return;
        }
        let _loc2_: boolean = false;
        if (this._SafeStr_2528 != null) {
            this._SafeStr_2528.hovered = false;
            this._SafeStr_2528 = null;
            _loc2_ = true;
        }
        if (param1 != null) {
            _loc3_ = this.getRowForObject(param1);
            if (_loc3_ != null) {
                _loc3_.hovered = true;
                this._SafeStr_2528 = _loc3_;
                _loc2_ = true;
            }
        }
        if (_loc2_ && this._onRowHoverCallback != null) {
            this._onRowHoverCallback(this._SafeStr_2528 != null ? this._SafeStr_2528.object : null);
        }
    }

    public onEnterNewCellValue(param1: string, param2: ITableObject, param3: string): void {
        if (this._onCellEditCallback != null) {
            this._onCellEditCallback(param2, param3, param1);
        }
    }

    private updateTableItemsHeight(): void {
        this.tableItems.height = this.tableContents.height - (this._SafeStr_5563 ? this._SafeStr_2832.height + this._SafeStr_3452.height : 0);
        this.onScrollBarVisibilityMayHaveChanged();
    }

    private updateEmptyText(): void {
        if (this._SafeStr_5563) {
            this.emptyTextContainer.y = this._SafeStr_2832.height + this._SafeStr_3452.height;
            this.emptyTextContainer.height = this.tableContents.height - this.emptyTextContainer.y;
        } else {
            this.emptyTextContainer.y = 0;
            this.emptyTextContainer.height = this.tableContents.height;
        }
        this.emptyTextContainer.visible = this._rowModels == null || this._rowModels.length == 0;
    }

    private onTableContentsResized = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.updateTableItemsHeight();
        this.manageRowViewsWithDebounce();
    };

    private onScrolled = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.manageRowViewsWithDebounce();
    };

    private initializeColumns(param1: TableColumn[]): void {
        let _loc3_: ITextWindow = null;
        let _loc2_: number = 0;
        this._columns = param1;
        for (const _loc4_ of param1 ?? []) {
            _loc3_ = asGuarded(this._SafeStr_4384.clone(), isITextWindow);
            _loc3_.text = _loc4_.columnName;
            _loc2_ = this.getCellWidth(_loc4_.id);
            _loc3_.width = _loc2_;
            _loc3_.autoSize = _loc4_.alignment;
            this._SafeStr_2832.addListItem(_loc3_);
        }
    }

    private manageRowViews = (param1: boolean = false): boolean => {
        let _loc10_: number = NaN;
        let _loc4_: number = NaN;
        let _loc11_: number = NaN;
        let _loc12_: number = 0;
        if (!param1 && this._needScrollReset) {
            this.tableItems.scrollV = 0;
            this._needScrollReset = false;
            this._forceUpdate = true;
        }
        let _loc9_: IWindow = this.tableItems.getListItemAt(0);
        let _loc5_: IWindow = this.tableItems.getListItemAt(this.tableItems.numListItems - 1 >>> 0);
        let _loc7_: number = this.visibleRangeFirstIndex;
        let _loc13_: number = this.visibleRangeLastIndex;
        let _loc15_: number = this._rowTemplate.height;
        let _loc8_: IWindow[] = [];
        _loc8_.push(_loc9_);
        let _loc2_: number = _loc7_ * _loc15_;
        let _loc6_: number = Math.max(0, this._rowModels.length - 1 - _loc13_) * _loc15_ | 0;
        let _loc3_: boolean = this._forceUpdate || this._rowModels.length < TableView.SKIP_SCROLL_RESIZE && (_loc2_ != _loc9_.height || _loc6_ != _loc5_.height);
        if (_loc3_ && param1) {
            return true;
        }
        for (const _loc14_ of this._rowModels ?? []) {
            if (this.shouldBeVisible(_loc14_, _loc7_, _loc13_)) {
                if (_loc14_.view == null) {
                    if (!param1) {
                        _loc14_.view = this.createOrReuseTableRowView(_loc14_);
                    }
                    _loc3_ = true;
                }
                if (!param1) {
                    _loc8_.push(_loc14_.view.container);
                }
            } else if (_loc14_.view != null) {
                if (!param1) {
                    this.recycleRowView(_loc14_.view);
                    _loc14_.view = null;
                }
                _loc3_ = true;
            }
        }
        if (param1) {
            return _loc3_ || this._needScrollReset;
        }
        _loc8_.push(_loc5_);
        this._forceUpdate = false;
        this._ignoreListeners = true;
        if (_loc3_) {
            this.tableItems.autoArrangeItems = false;
            _loc10_ = Number(this.tableItems.scrollableRegion.height);
            _loc4_ = Number(this.tableItems.visibleRegion.y);
            _loc11_ = Number(this.tableItems.scrollV);
            this.tableItems.removeListItems();
            _loc9_.height = _loc2_;
            _loc5_.height = _loc6_;
            _loc12_ = 0;
            for (const _loc16_ of _loc8_ ?? []) {
                _loc16_.y = _loc12_;
                this.tableItems.addListItem(_loc16_);
                _loc12_ += _loc16_.height;
            }
            if (_loc12_ != _loc10_) {
                if (_loc12_ > this.tableItems.height) {
                    this.tableItems.scrollV = _loc4_ / (_loc12_ - this.tableItems.height);
                } else {
                    _loc5_.height += this.tableItems.height - _loc12_;
                    _loc5_.width = this.rowWidth;
                    this.tableItems.scrollV = 0;
                }
            } else {
                this.tableItems.scrollV = _loc11_;
            }
            this.tableItems.autoArrangeItems = true;
            this.onScrollBarVisibilityMayHaveChanged();
        }
        this._ignoreListeners = false;
        return _loc3_;
    };

    private shouldBeVisible(param1: TableRowModel, param2: number, param3: number): boolean {
        return param1.i >= param2 && param1.i <= param3;
    }

    private recycleRowView(param1: TableRowView): void {
        param1.recycle();
        this._SafeStr_5262.push(param1);
    }

    private createOrReuseTableRowView(param1: TableRowModel): TableRowView {
        let _loc2_: TableRowView = null;
        if (this._SafeStr_5262.length > 0) {
            _loc2_ = this._SafeStr_5262.pop();
            _loc2_.reuse(param1);
            _loc2_.updateWidth();
        } else {
            _loc2_ = new TableRowView(this, param1);
        }
        return _loc2_;
    }

    private itemListAmountChanged(): void {
        this.onScrollBarVisibilityMayHaveChanged();
        this.updateEmptyText();
    }

    private onScrollBarVisibilityMayHaveChanged(): void {
        let _loc1_: boolean = this._SafeStr_5488;
        this._SafeStr_5488 = this.tableItems.isScrollBarVisible;
        if (_loc1_ != this._SafeStr_5488) {
            this.resizeHorizontally();
        }
    }

    private getRowForObject(param1: ITableObject): TableRowModel {
        return this._SafeStr_3697.get(param1.identifier);
    }

    get [IDisposable](): true {
        return true;
    }
}
