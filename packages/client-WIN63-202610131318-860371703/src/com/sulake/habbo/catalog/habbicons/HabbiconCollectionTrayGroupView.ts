import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconTileView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTileView';

export class HabbiconCollectionTrayGroupView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconCollectionTrayGroupView'); }

    private static readonly BOTTOM_PADDING: number = 8;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14852: IWindowContainer;

    declare private _controller: HabbiconController;

    declare private _SafeStr_14853: (...args: any[]) => any;

    declare private _group: HabbiconSetModel;

    declare private _tiles: HabbiconTileView[];

    declare private _baseHeight: number;
    static { (this.prototype as any)._baseHeight = 0; }

    declare private _SafeStr_14910: number;
    static { (this.prototype as any)._SafeStr_14910 = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: IWindowContainer, param3: HabbiconController, param4: (...args: any[]) => any) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_14852 = param2;
        this._controller = param3;
        this._SafeStr_14853 = param4;
        this._tiles = new Array<HabbiconTileView>(0).fill(null);
        this._baseHeight = this._window.height;
        this._SafeStr_14910 = this.trayGroupGrid.height;
        this.removeClonedTileTemplate();
    }

    public initialize(param1: HabbiconSetModel): void {
        let _loc3_: HabbiconTileView = null;
        this._group = param1;
        this.recycleTiles();
        this.trayGroupTitle.text = param1.title;
        this._window.visible = true;
        for (const _loc2_ of param1.habbicons ?? []) {
            _loc3_ = HabbiconTileView.claim(this._SafeStr_14852);
            _loc3_.initialize(this._controller, _loc2_, this._SafeStr_14853);
            this.trayGroupGrid.addGridItem(_loc3_.window);
            this._tiles.push(_loc3_);
        }
        this.resizeToContent();
    }

    public refreshEntry(param1: HabbiconEntryModel): void {
        if (param1 == null) {
            return;
        }
        for (const _loc2_ of this._tiles ?? []) {
            if (_loc2_.item != null && _loc2_.item.habbiconId == param1.habbiconId) {
                _loc2_.refresh(param1);
                return;
            }
        }
    }

    public recycle(): void {
        if (this._disposed) {
            return;
        }
        if (this._window.parent != null) {
            (asGuarded(this._window.parent, isIWindowContainer)).removeChild(this._window);
        }
        this.recycleTiles();
        this._group = null;
        this._window.visible = false;
        this.trayGroupGrid.height = this._SafeStr_14910;
        this._window.height = this._baseHeight;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.recycle();
        this._window.dispose();
        this._window = null;
        this._SafeStr_14852 = null;
        this._controller = null;
        this._SafeStr_14853 = null;
        this._group = null;
        this._tiles = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get group(): HabbiconSetModel {
        return this._group;
    }

    private recycleTiles(): void {
        this.trayGroupGrid.removeGridItems();
        for (const _loc1_ of this._tiles ?? []) {
            HabbiconTileView.release(_loc1_);
        }
        this._tiles.length = 0;
    }

    private removeClonedTileTemplate(): void {
        let _loc2_: IWindowContainer = null;
        let _loc1_: IWindow = this.trayTileTemplate;
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(_loc1_.parent, isIItemListWindow);
        if (_loc3_ != null) {
            _loc3_.removeListItem(_loc1_);
        } else if (_loc1_.parent != null) {
            _loc2_ = asGuarded(_loc1_.parent, isIWindowContainer);
            if (_loc2_ != null) {
                _loc2_.removeChild(_loc1_);
            }
        }
        _loc1_.dispose();
    }

    private resizeToContent(): void {
        this.trayGroupGrid.height = Math.max(this._SafeStr_14910, this.trayGroupGrid.scrollableRegion.height) | 0;
        this._window.height = Math.max(this._baseHeight, this.trayGroupGrid.y + this.trayGroupGrid.height + 8) | 0;
        this._window.invalidate();
    }

    private get trayGroupTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("tray_group_title"), isITextWindow);
    }

    private get trayGroupGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("tray_group_grid"), isIItemGridWindow);
    }

    private get trayTileTemplate(): IWindow {
        return this.trayGroupGrid.getGridItemByName("tray_tile_template");
    }

    get [IDisposable](): true {
        return true;
    }
}
