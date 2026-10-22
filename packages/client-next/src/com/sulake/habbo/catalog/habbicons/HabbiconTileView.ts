import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class HabbiconTileView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconTileView'); }

    private static readonly _SafeStr_14137: number = 12833703;
    private static readonly OWNED_BASE_HOVER: number = 13492146;
    private static readonly OWNED_BASE_ACTIVE: number = 13952185;
    private static readonly _SafeStr_14138: number = 10076534;
    private static readonly OWNED_OUTLINE_HOVER: number = 12376223;
    private static readonly OWNED_OUTLINE_ACTIVE: number = 13887677;
    private static readonly NOT_OWNED_BASE_IDLE: number = 14735042;
    private static readonly NOT_OWNED_BASE_HOVER: number = 15261385;
    private static readonly NOT_OWNED_BASE_ACTIVE: number = 15458251;
    private static readonly NOT_OWNED_OUTLINE_IDLE: number = 13944493;
    private static readonly NOT_OWNED_OUTLINE_HOVER: number = 15129800;
    private static readonly NOT_OWNED_OUTLINE_ACTIVE: number = 15392717;
    public static readonly _SafeStr_14139: HabbiconTileView[] = new Array<HabbiconTileView>(0).fill(null);
    private static readonly _SafeStr_14140: ColorTransform = new ColorTransform(0.35, 0.35, 0.35, 0.65, 90, 85, 80, 0);

    declare private _window: IWindowContainer;

    declare private _controller: HabbiconController;

    declare private _item: HabbiconEntryModel;

    declare private _onClick: (...args: any[]) => any;

    declare private _hovered: boolean;
    static { (this.prototype as any)._hovered = false; }

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._window.addEventListener("WME_CLICK", this.onClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    public static claim(param1: IWindowContainer): HabbiconTileView {
        let _loc2_: HabbiconTileView = null;
        if (HabbiconTileView._SafeStr_14139.length > 0) {
            _loc2_ = HabbiconTileView._SafeStr_14139.pop();
        } else {
            _loc2_ = new HabbiconTileView(param1);
        }
        return _loc2_;
    }

    public static release(param1: HabbiconTileView): void {
        param1.recycle();
        HabbiconTileView._SafeStr_14139.push(param1);
    }

    public initialize(param1: HabbiconController, param2: HabbiconEntryModel, param3: (...args: any[]) => any): void {
        this._controller = param1;
        this._onClick = param3;
        this._window.visible = true;
        this.refresh(param2);
    }

    public recycle(): void {
        if (this._window.parent != null) {
            (asGuarded(this._window.parent, isIWindowContainer)).removeChild(this._window);
        }
        this.clearBitmap();
        this._controller = null;
        this._item = null;
        this._onClick = null;
        this._hovered = false;
        this._active = false;
        this._window.visible = false;
        this.favoriteIcon.visible = false;
        this.claimableIcon.visible = false;
        this.lockedOverlay.visible = false;
        this.updateLook();
    }

    public refresh(param1: HabbiconEntryModel): void {
        this._item = param1;
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1.habbiconId, false);
        let _loc3_: BitmapData = _loc2_ != null ? _loc2_.clone() : new BitmapData(40, 40, true, 0);
        this.clearBitmap();
        if (!param1.owned && !param1.claimable) {
            _loc3_.colorTransform(_loc3_.rect, HabbiconTileView._SafeStr_14140);
        }
        this.bitmap.bitmap = _loc3_;
        this.bitmap.invalidate();
        this.favoriteIcon.visible = param1.owned && param1.favorite;
        this.claimableIcon.visible = param1.claimable && !param1.owned;
        this.lockedOverlay.visible = !param1.owned && !param1.claimable;
        this.updateLook();
    }

    public setActive(param1: boolean): void {
        this._active = param1;
        this.updateLook();
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get item(): HabbiconEntryModel {
        return this._item;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window.parent != null) {
            (asGuarded(this._window.parent, isIWindowContainer)).removeChild(this._window);
        }
        this._window.removeEventListener("WME_CLICK", this.onClicked);
        this._window.removeEventListener("WME_OVER", this.onOver);
        this._window.removeEventListener("WME_OUT", this.onOut);
        this.clearBitmap();
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._item = null;
        this._onClick = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private clearBitmap(): void {
        if (this.bitmap.bitmap != null) {
            this.bitmap.bitmap.dispose();
            this.bitmap.bitmap = null;
        }
    }

    private updateLook(): void {
        let _loc4_: number = (this._item != null && this._item.owned ? 12833703 : 14735042) >>> 0;
        let _loc6_: number = (this._item != null && this._item.owned ? 13492146 : 15261385) >>> 0;
        let _loc5_: number = (this._item != null && this._item.owned ? 13952185 : 15458251) >>> 0;
        let _loc3_: number = (this._item != null && this._item.owned ? 10076534 : 13944493) >>> 0;
        let _loc2_: number = (this._item != null && this._item.owned ? 12376223 : 15129800) >>> 0;
        let _loc1_: number = (this._item != null && this._item.owned ? 13887677 : 15392717) >>> 0;
        this.tileBackground.color = (0xFF000000 | (this._active ? _loc5_ : (this._hovered ? _loc6_ : _loc4_))) >>> 0;
        this.tileBorder.color = (0xFF000000 | (this._active ? _loc1_ : (this._hovered ? _loc2_ : _loc3_))) >>> 0;
    }

    private onClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick(this);
        }
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateLook();
    };

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateLook();
    };

    private get bitmap(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
    }

    private get favoriteIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("favorite_icon"), isIStaticBitmapWrapperWindow);
    }

    private get claimableIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("claimable_icon"), isIStaticBitmapWrapperWindow);
    }

    private get lockedOverlay(): IWindow {
        return this._window.findChildByName("locked_overlay");
    }

    private get tileBackground(): IWindow {
        return this._window.findChildByName("tile_background");
    }

    private get tileBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("tile_border"), isIBorderWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
