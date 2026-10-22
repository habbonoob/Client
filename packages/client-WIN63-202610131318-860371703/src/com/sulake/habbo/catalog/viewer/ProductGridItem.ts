import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';

export class ProductGridItem implements IGridItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::ProductGridItem'); }

    public static readonly GRID_ITEM_BORDER: string = "bg";

    declare protected _view: IWindowContainer;

    declare private _grid: IItemGrid;

    declare protected _icon: IBitmapWrapperWindow;

    declare protected _SafeStr_3747: IBitmapWrapperWindow;

    private _disposed: boolean = false;

    declare private _SafeStr_2694: any;

    declare private _catalog: HabboCatalog;

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public set grid(param1: IItemGrid) {
        this._grid = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._grid = null;
        this._icon = null;
        this._SafeStr_3747 = null;
        this._catalog = null;
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    protected get catalog(): HabboCatalog {
        return this._catalog;
    }

    public activate(): void {
        if (!this._view) {
            return;
        }
        if (this._view.findChildByTag("ITEM_HILIGHT")) {
            this._view.findChildByTag("ITEM_HILIGHT").visible = true;
        } else {
            this._view.getChildByName("bg").style = 0;
        }
    }

    public deactivate(): void {
        if (!this._view) {
            return;
        }
        if (this._view.findChildByTag("ITEM_HILIGHT")) {
            this._view.findChildByTag("ITEM_HILIGHT").visible = false;
        } else {
            this._view.getChildByName("bg").style = 3;
        }
    }

    public set view(param1: IWindowContainer) {
        if (!param1) {
            return;
        }
        this._view = param1;
        this._view.procedure = this.eventProc;
        this._SafeStr_3747 = asGuarded(this._view.findChildByName("image_wide"), isIBitmapWrapperWindow);
        if (this._SafeStr_3747) {
            this._view.findChildByName("wide_container").visible = this.useWideView;
            this._view.findChildByName("small_container").visible = !this.useWideView;
            this._view.width = this.useWideView ? this._view.limits.maxWidth : this._view.limits.minWidth;
        } else {
            this._SafeStr_3747 = this._icon;
        }
        this._icon = asGuarded(this._view.findChildByName("image"), isIBitmapWrapperWindow);
        if (this._view.findChildByTag("ITEM_HILIGHT")) {
            this._view.findChildByTag("ITEM_HILIGHT").visible = false;
        }
        let _loc2_: IWindow = this._view.findChildByName("multiContainer");
        if (_loc2_) {
            _loc2_.visible = false;
        }
    }

    protected get useWideView(): boolean {
        return false;
    }

    public setDraggable(param1: boolean): void {
        if ((isIInteractiveWindow(this._view) ? this._view : null) && param1) {
            (isIInteractiveWindow(this._view) ? this._view : null).setMouseCursorForState(4, 5);
            (isIInteractiveWindow(this._view) ? this._view : null).setMouseCursorForState((4 | 1) >>> 0, 5);
        }
    }

    private eventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: boolean = false;
        if (param1.type == "WME_UP") {
            this._SafeStr_2694 = null;
        } else if (param1.type == "WME_DOWN") {
            if (param2 == null) {
                return;
            }
            this._grid.select(this, true);
            this._SafeStr_2694 = param2;
        } else if (param1.type == "WME_OUT" && this._SafeStr_2694 != null && this._SafeStr_2694 == param2) {
            _loc3_ = this._grid.startDragAndDrop(this);
            if (_loc3_) {
                this._SafeStr_2694 = null;
            }
        } else if (param1.type == "WME_UP") {
            this._SafeStr_2694 = null;
        } else if (param1.type == "WME_CLICK") {
            this._SafeStr_2694 = null;
        } else if (param1.type == "WME_DOUBLE_CLICK") {
            this._SafeStr_2694 = null;
        }
    };

    public setIconImage(param1: BitmapData, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (param1 == null) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = this.targetIcon;
        if (_loc5_ != null && !_loc5_.disposed) {
            _loc3_ = (_loc5_.width - param1.width) / 2 | 0;
            _loc4_ = (_loc5_.height - param1.height) / 2 | 0;
            if (_loc5_.bitmap == null) {
                _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 16777215);
            } else {
                _loc5_.bitmap.fillRect(_loc5_.bitmap.rect, 16777215);
            }
            _loc5_.bitmap.copyPixels(param1, param1.rect, new Point(_loc3_, _loc4_), null, null, false);
            _loc5_.invalidate();
        }
        if (param2) {
            param1.dispose();
        }
    }

    protected get targetIcon(): IBitmapWrapperWindow {
        return this.useWideView ? this._SafeStr_3747 : this._icon;
    }

    protected renderAvatarImage(param1: string, param2: IAvatarImageListener): BitmapData {
        let _loc4_: IAvatarImage = this._catalog.avatarRenderManager.createAvatarImage(param1, "h", null, param2);
        let _loc3_: BitmapData = _loc4_.getCroppedImage("head", 0.5);
        _loc4_.dispose();
        return _loc3_;
    }

    get [IGridItem](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
