import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconProgressBarView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconProgressBarView';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class HabbiconSetRailRowView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconSetRailRowView'); }

    private static readonly BACKGROUND_IDLE: number = 16313302;
    private static readonly BACKGROUND_HOVER: number = 16773830;
    private static readonly BACKGROUND_ACTIVE: number = 15781766;
    private static readonly BORDER_IDLE: number = 15920341;
    private static readonly BORDER_ACTIVE: number = 16777215;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14896: HabbiconSetModel;

    declare private _progressView: HabbiconProgressBarView;

    declare private _SafeStr_14195: (...args: any[]) => any;

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _hovered: boolean;
    static { (this.prototype as any)._hovered = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_14195 = param2;
        this._progressView = new HabbiconProgressBarView(this.setRowProgressBar);
        this._window.addEventListener("WME_CLICK", this.onClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    public initialize(param1: HabbiconSetModel): void {
        this._SafeStr_14896 = param1;
        this._window.visible = true;
        this.setRowTitle.text = param1.title;
        this.updateIcon();
        this.refreshProgress(false);
        this._active = false;
        this._hovered = false;
        this.updateLook();
    }

    public setActive(param1: boolean): void {
        this._active = param1;
        this.updateLook();
    }

    public refreshProgress(param1: boolean): void {
        this._progressView.setRatio(this._SafeStr_14896.progressRatio, param1);
        this.setRowProgressText.text = this._SafeStr_14896.completed + " / " + this._SafeStr_14896.total;
    }

    public update(param1: number): void {
        this._progressView.update(param1);
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
        this.clearIcon();
        if (this._progressView != null) {
            this._progressView.dispose();
            this._progressView = null;
        }
        this._window.dispose();
        this._window = null;
        this._SafeStr_14896 = null;
        this._SafeStr_14195 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get _SafeStr_14897(): HabbiconSetModel {
        return this._SafeStr_14896;
    }

    private updateIcon(): void {
        let _loc3_: HabbiconEntryModel = null;
        let _loc1_: BitmapData = null;
        let _loc2_: IBitmapWrapperWindow = this.setIcon;
        if (_loc2_ == null) {
            return;
        }
        this.clearIcon();
        if (this._SafeStr_14896.habbicons != null && this._SafeStr_14896.habbicons.length > 0) {
            _loc3_ = this._SafeStr_14896.habbicons[0];
            _loc1_ = HabbiconAssetManager.getPreviewBitmap(_loc3_.habbiconId, false);
        }
        if (_loc1_ != null) {
            _loc2_.disposesBitmap = true;
            _loc2_.bitmap = _loc1_.clone();
            _loc2_.visible = true;
            _loc2_.invalidate();
        } else {
            _loc2_.visible = false;
        }
    }

    private clearIcon(): void {
        let _loc1_: IBitmapWrapperWindow = this.setIcon;
        if (_loc1_ != null && _loc1_.bitmap != null) {
            _loc1_.bitmap.dispose();
            _loc1_.bitmap = null;
            _loc1_.invalidate();
        }
    }

    private updateLook(): void {
        let _loc1_: number = (this._active ? 15781766 : ((this._hovered ? 16773830 : 16313302) >>> 0)) >>> 0;
        let _loc2_: number = (this._active || this._hovered ? 16777215 : 15920341) >>> 0;
        this.setRowBackground.color = (0xFF000000 | _loc1_) >>> 0;
        this._window.color = (0xFF000000 | _loc2_) >>> 0;
    }

    private onClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14195 != null && this._SafeStr_14896 != null) {
            this._SafeStr_14195(this._SafeStr_14896);
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

    private get setRowTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_row_title"), isITextWindow);
    }

    private get setRowProgressBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("set_row_progress_bar"), isIWindowContainer);
    }

    private get setRowProgressText(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_row_progress_text"), isITextWindow);
    }

    private get setRowBackground(): IWindow {
        return this._window.findChildByName("set_row_background");
    }

    private get setIcon(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("set_icon"), isIBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
