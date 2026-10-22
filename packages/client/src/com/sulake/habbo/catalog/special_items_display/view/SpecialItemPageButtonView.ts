import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { SpecialItemsView } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsView';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class SpecialItemPageButtonView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display.view::SpecialItemPageButtonView'); }

    constructor(param1: SpecialItemsView, param2: number) {
        this._index = param2;
        this._view = param1;
        this._window = asGuarded(param1.pageTemplate.clone(), isIRegionWindow);
        this._window.addEventListener("WME_CLICK", this.onClick);
        this.selected = false;
    }

    declare private _view: SpecialItemsView;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _window: IRegionWindow;

    public get window(): IRegionWindow {
        return this._window;
    }

    private _disposed: any = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public set selected(param1: boolean) {
        this._isSelected = param1;
        this.pageImage.assetUri = "progress_disk_etched_" + (this._isSelected ? "on" : "off");
    }

    private get pageImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("page_image"), isIStaticBitmapWrapperWindow);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window.dispose();
        this._window = null;
        this._view = null;
        this._disposed = true;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._view.navigateTo(this._index);
    };

    get [IDisposable](): true {
        return true;
    }
}
