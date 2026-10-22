import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import type { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';
import type { TableRowModel } from '@/com/sulake/habbo/window/utils/tableview/TableRowModel';
import type { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';
import { TableCellView } from '@/com/sulake/habbo/window/utils/tableview/TableCellView';

export class TableRowView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableRowView'); }

    private static _SafeStr_7525: number = 12116732;
    private static _SafeStr_7540: number = 13750737;
    private static _SafeStr_7558: number = 15395562;
    private static _SafeStr_7484: number = 16382457;
    private _disposed: boolean = false;

    declare private _SafeStr_2737: TableView;

    declare private _container: IItemListWindow;

    declare private _SafeStr_3314: TableCellView[];

    declare private _SafeStr_2134: TableRowModel;

    constructor(param1: TableView, param2: TableRowModel) {
        let _loc5_: TableCell = null;
        let _loc3_: TableCellView = null;
        this._SafeStr_2737 = param1;
        this._SafeStr_2134 = param2;
        this._container = asGuarded(param1.rowTemplate.clone(), isIItemListWindow);
        this._SafeStr_3314 = [];
        this.updateWidth();
        for (const _loc4_ of param1.columns ?? []) {
            _loc5_ = this.object.getTableCell(_loc4_.id);
            _loc3_ = new TableCellView(param1, this, _loc4_.id, _loc5_);
            this._SafeStr_3314.push(_loc3_);
            this._container.addListItem(_loc3_.container);
        }
        this.updateColor();
        this._container.addEventListener("WME_DOWN", this.onDown);
        this._container.addEventListener("WME_OVER", this.onHoverOver);
        this._container.addEventListener("WME_OUT", this.onHoverOut);
        this._container.addEventListener("WME_CLICK_AWAY", this.onClickAway);
    }

    private static windowIsChild(param1: IWindow, param2: IWindow): boolean {
        let _loc3_: IWindowContainer = null;
        let _loc4_: number = 0;
        if (param1 == param2) {
            return true;
        }
        if (isIWindowContainer(param1) || isIItemListWindow(param1) || isISelectorWindow(param1)) {
            if (isIChildWindowHost(param1)) {
                for (const _loc5_ of (isIChildWindowHost(param1) ? param1 : null).children ?? []) {
                    if (TableRowView.windowIsChild(_loc5_, param2)) {
                        return true;
                    }
                }
            } else if (isIWindowContainer(param1)) {
                _loc3_ = isIWindowContainer(param1) ? param1 : null;
                _loc4_ = 0;
                while (_loc4_ < _loc3_.numChildren) {
                    if (TableRowView.windowIsChild(_loc3_.getChildAt(_loc4_), param2)) {
                        return true;
                    }
                    _loc4_++;
                }
            }
        }
        return false;
    }

    public indexUpdated(): void {
        this.updateColor();
    }

    public objectUpdated(param1: ITableObject, param2: ITableObject): void {
        let _loc6_: TableCell = null;
        let _loc3_: TableCellView = null;
        let _loc5_: number = 0;
        for (const _loc4_ of this._SafeStr_2737.columns ?? []) {
            if (param2.isPropertyUpdated(_loc4_.id, param1)) {
                _loc6_ = param2.getTableCell(_loc4_.id);
                _loc3_ = this._SafeStr_3314[_loc5_];
                _loc3_.update(_loc6_);
            }
            _loc5_ += 1;
        }
    }

    public reuse(param1: TableRowModel): void {
        let _loc5_: TableCell = null;
        let _loc2_: TableCellView = null;
        this._SafeStr_2134 = param1;
        let _loc4_: number = 0;
        for (const _loc3_ of this._SafeStr_2737.columns ?? []) {
            _loc5_ = this.object.getTableCell(_loc3_.id);
            _loc2_ = this._SafeStr_3314[_loc4_];
            _loc2_.reuse(_loc5_);
            _loc4_ += 1;
        }
        this.updateColor();
    }

    public updateWidth(): void {
        if (this.container.width == this._SafeStr_2737.rowWidth) {
            return;
        }
        this.container.width = this._SafeStr_2737.rowWidth;
        for (const _loc1_ of this._SafeStr_3314 ?? []) {
            _loc1_.updateWidth();
        }
    }

    private updateColor(): void {
        let _loc1_: any = 0;
        if (this._SafeStr_2134 == null) {
            return;
        }
        if (this._SafeStr_2134.selected) {
            if (this._SafeStr_2134.hasFocus) {
                _loc1_ = TableRowView._SafeStr_7525;
            } else {
                _loc1_ = TableRowView._SafeStr_7540;
            }
        } else {
            _loc1_ = this._SafeStr_2134.i % 2 == 0 ? TableRowView._SafeStr_7558 : TableRowView._SafeStr_7484;
        }
        this._container.color = (0xFF000000 ^ _loc1_) >>> 0;
    }

    public onDown = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2134 == null) {
            return;
        }
        this._SafeStr_2134.hasFocus = true;
        this._SafeStr_2737.trySelect(this.object, true);
        this.updateColor();
    };

    public onHoverOver = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2134 == null) {
            return;
        }
        if (!this._SafeStr_2134.hovered) {
            this._SafeStr_2737.onHover(this.object);
        }
    };

    public onHoverOut = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2134 == null) {
            return;
        }
        if (this._SafeStr_2134.hovered) {
            this._SafeStr_2737.onHover(null);
        }
    };

    public onClickAway = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2134 == null) {
            return;
        }
        this._SafeStr_2134.hasFocus = TableRowView.windowIsChild(this._container, param1.related);
        this.updateColor();
    };

    public selectedUpdated(): void {
        this.updateColor();
    }

    public hovereddUpdated(): void {
    }

    public get object(): ITableObject {
        return this._SafeStr_2134?.object;
    }

    public get container(): IItemListWindow {
        return this._container;
    }

    public recycle(): void {
        for (const _loc1_ of this._SafeStr_3314 ?? []) {
            _loc1_.recycle();
        }
        this._SafeStr_2134 = null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        for (const _loc1_ of this._SafeStr_3314 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3314 = null;
        this._container.dispose();
        this._container = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
