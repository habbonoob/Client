import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import type { TableRowView } from '@/com/sulake/habbo/window/utils/tableview/TableRowView';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class TableRowModel implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableRowModel'); }

    constructor(param1: ITableObject, param2: number) {
        this._object = param1;
        this._i = param2;
    }

    declare private _object: ITableObject;

    declare private _i: number;
    static { (this.prototype as any)._i = 0; }

    private _hovered: boolean = false;

    declare private _view: TableRowView;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _selected: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
        if (this._view != null) {
            this._view.selectedUpdated();
        }
    }

    private _hasFocus: boolean = false;

    public get hasFocus(): boolean {
        return this._hasFocus;
    }

    public set hasFocus(param1: boolean) {
        this._hasFocus = param1;
    }

    public set index(param1: number) {
        this._i = param1;
        if (this._view != null) {
            this._view.indexUpdated();
        }
    }

    public get object(): ITableObject {
        return this._object;
    }

    public get i(): number {
        return this._i;
    }

    public get hovered(): boolean {
        return this._hovered;
    }

    public set hovered(param1: boolean) {
        this._hovered = param1;
        if (this._view != null) {
            this._view.hovereddUpdated();
        }
    }

    public get view(): TableRowView {
        return this._view;
    }

    public set view(param1: TableRowView) {
        this._view = param1;
    }

    public update(param1: ITableObject): void {
        if (!param1.isUpdated(this._object)) {
            this._object = param1;
            return;
        }
        let _loc2_: ITableObject = this._object;
        this._object = param1;
        if (this._view != null) {
            this._view.objectUpdated(_loc2_, param1);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._object = null;
        this._i = 0;
        this._selected = false;
        this._hovered = false;
        this._hasFocus = false;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
