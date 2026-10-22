import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FurnitureRecolorSwatchView } from '@/com/sulake/habbo/ui/widget/furniture/recolor/FurnitureRecolorSwatchView';

export class FurnitureRecolorPaletteView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.recolor::FurnitureRecolorPaletteView'); }

    private static readonly ITEM_POOL: FurnitureRecolorSwatchView[] = [];

    declare private _grid: IItemGridWindow;

    declare private _template: IRegionWindow;

    declare private _SafeStr_14360: (...args: any[]) => any;

    private _items: Map<any, any> = new Dictionary();
    private _selectedColor: number = 16777215;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IItemGridWindow, param2: IRegionWindow, param3: (...args: any[]) => any) {
        this._grid = param1;
        this._template = param2;
        this._SafeStr_14360 = param3;
    }

    public setColors(param1: any[]): void {
        let _loc4_: any;
        let _loc3_: Map<any, any> = new Dictionary();
        for (_loc4_ of param1 ?? []) {
            _loc3_.set(_loc4_, true);
        }
        for (const _loc2_ of this._items?.values() ?? []) {
            if (!(_loc3_.has(_loc2_.color))) {
                this.removeColor(_loc2_.color >>> 0);
            }
        }
        for (_loc4_ of param1 ?? []) {
            this.addColor(_loc4_ >>> 0);
        }
    }

    private addColor(param1: number): void {
        if (this._items.has(param1)) {
            return;
        }
        let _loc2_: FurnitureRecolorSwatchView = FurnitureRecolorPaletteView.ITEM_POOL.length > 0 ? FurnitureRecolorPaletteView.ITEM_POOL.pop() : new FurnitureRecolorSwatchView(this._template);
        _loc2_.initialize(param1, this._SafeStr_14360);
        _loc2_.selected = param1 == this._selectedColor;
        this._items.set(param1, _loc2_);
        this._grid.addGridItem(_loc2_.window);
    }

    private removeColor(param1: number): void {
        let _loc2_: FurnitureRecolorSwatchView = this._items.get(param1);
        if (_loc2_ == null) {
            return;
        }
        this._grid.removeGridItem(_loc2_.window);
        this._items.delete(param1);
        _loc2_.recycle();
        FurnitureRecolorPaletteView.ITEM_POOL.push(_loc2_);
    }

    public set selectedColor(param1: number) {
        let _loc3_: FurnitureRecolorSwatchView = this._items.get(this._selectedColor);
        if (_loc3_ != null) {
            _loc3_.selected = false;
        }
        this._selectedColor = param1;
        let _loc2_: FurnitureRecolorSwatchView = this._items.get(param1);
        if (_loc2_ != null) {
            _loc2_.selected = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.setColors([]);
        this._items = null;
        this._grid = null;
        this._template = null;
        this._SafeStr_14360 = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
