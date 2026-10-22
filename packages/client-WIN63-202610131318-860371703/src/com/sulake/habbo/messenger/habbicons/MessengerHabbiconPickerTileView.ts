import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MessengerHabbiconPickerEntry } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerEntry';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class MessengerHabbiconPickerTileView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.messenger.habbicons::MessengerHabbiconPickerTileView'); }

    private static readonly SLOT_FILLED_COLOR: number = 4294967295;
    private static readonly SLOT_EMPTY_COLOR: number = 4292730333;
    private static readonly SLOT_FILLED_HOVER_COLOR: number = 4293848814;

    declare private _window: IWindowContainer;

    declare private _entry: MessengerHabbiconPickerEntry;

    declare private _SafeStr_14173: (...args: any[]) => any;

    declare private _SafeStr_14174: (...args: any[]) => any;

    declare private _SafeStr_14175: IWindowContainer;

    declare private _SafeStr_14176: boolean;
    static { (this.prototype as any)._SafeStr_14176 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: MessengerHabbiconPickerEntry, param3: (...args: any[]) => any, param4: IHabboWindowManager, param5: (...args: any[]) => any, param6: (...args: any[]) => any) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._entry = param2;
        this._SafeStr_14173 = param3;
        this._SafeStr_14174 = param6;
        this.addWheelListener(this._window);
        this.addWheelListener(this.background);
        this.addWheelListener(this.bitmap);
        let _loc7_: boolean = param2 != null;
        this.background.color = _loc7_ ? 4294967295 : 4292730333;
        this.background.blend = _loc7_ ? 0.85 : 0.4;
        this._window.mouseThreshold = (_loc7_ ? 0 : 10) >>> 0;
        castGuarded(this._window, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").toolTipCaption = _loc7_ ? param2.name : "";
        if (param2 == null) {
            this.bitmap.visible = false;
            return;
        }
        if (_loc7_) {
            this._window.addEventListener("WME_CLICK", this.onClicked);
            this._window.addEventListener("WME_OVER", this.onHovered);
            this._window.addEventListener("WME_OUT", this.onOut);
        }
        this.refreshBitmap();
        this.addUnseenCounter(param4, param5);
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public clearUnseenCounterForHabbicon(param1: number): void {
        if (this._entry != null && this._entry.habbiconId == param1) {
            this.removeUnseenCounter();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_14176) {
            HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onAssetsLoaded);
            this._SafeStr_14176 = false;
        }
        if (this._window != null) {
            if (this._window.parent != null) {
                castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
            }
            this.removeWheelListener(this._window);
            this.removeWheelListener(this.background);
            this.removeWheelListener(this.bitmap);
            this._window.removeEventListener("WME_CLICK", this.onClicked);
            this._window.removeEventListener("WME_OVER", this.onHovered);
            this._window.removeEventListener("WME_OUT", this.onOut);
            this.removeUnseenCounter();
            this.clearBitmap();
            this._window.dispose();
            this._window = null;
        }
        this._entry = null;
        this._SafeStr_14173 = null;
        this._SafeStr_14174 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private refreshBitmap(): void {
        let _loc1_: BitmapData = null;
        this.clearBitmap();
        _loc1_ = HabbiconAssetManager.getPreviewBitmap(this._entry.habbiconId, false);
        if (_loc1_ == null) {
            this.bitmap.bitmap = new BitmapData(40, 40, true, 0);
            this.bitmap.visible = true;
            this.bitmap.invalidate();
            if (!this._SafeStr_14176) {
                HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onAssetsLoaded);
                this._SafeStr_14176 = true;
            }
            return;
        }
        this.bitmap.bitmap = _loc1_.clone();
        this.bitmap.visible = true;
        this.bitmap.invalidate();
    }

    private addUnseenCounter(param1: IHabboWindowManager, param2: (...args: any[]) => any): void {
        let _loc3_: ITextWindow = null;
        if (param1 == null || param2 == null || !param2(this._entry.habbiconId)) {
            return;
        }
        this._SafeStr_14175 = param1.createUnseenItemCounter();
        _loc3_ = asGuarded(this._SafeStr_14175.findChildByName("count"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.caption = "1";
        }
        this._SafeStr_14175.x = this._window.width - this._SafeStr_14175.width - 1;
        this._SafeStr_14175.y = 1;
        this._window.addChild(this._SafeStr_14175);
    }

    private removeUnseenCounter(): void {
        if (this._SafeStr_14175 == null) {
            return;
        }
        if (this._SafeStr_14175.parent != null) {
            castGuarded(this._SafeStr_14175.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._SafeStr_14175);
        }
        this._SafeStr_14175.dispose();
        this._SafeStr_14175 = null;
    }

    private onAssetsLoaded = (param1: Event): void => {
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onAssetsLoaded);
        this._SafeStr_14176 = false;
        if (!this._disposed) {
            this.refreshBitmap();
        }
    };

    private onClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14173 != null) {
            this._SafeStr_14173(this._entry.habbiconId, param1.shiftKey);
        }
    };

    private onHovered = (param1: WindowMouseEvent): void => {
        this.background.color = 4293848814;
    };

    private onOut = (param1: WindowMouseEvent): void => {
        this.background.color = 4294967295;
    };

    private addWheelListener(param1: IWindow): void {
        if (param1 == null || this._SafeStr_14174 == null) {
            return;
        }
        param1.addEventListener("WME_WHEEL", this._SafeStr_14174);
        param1.addEventListener("WME_WHEEL_HORIZONTAL", this._SafeStr_14174);
    }

    private removeWheelListener(param1: IWindow): void {
        if (param1 == null || this._SafeStr_14174 == null) {
            return;
        }
        param1.removeEventListener("WME_WHEEL", this._SafeStr_14174);
        param1.removeEventListener("WME_WHEEL_HORIZONTAL", this._SafeStr_14174);
    }

    private clearBitmap(): void {
        if (this.bitmap != null && this.bitmap.bitmap != null) {
            this.bitmap.bitmap.dispose();
            this.bitmap.bitmap = null;
        }
    }

    private get bitmap(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("habbicon_icon"), isIBitmapWrapperWindow);
    }

    private get background(): IBorderWindow {
        return asGuarded(this._window.findChildByName("habbicon_item_bg"), isIBorderWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
