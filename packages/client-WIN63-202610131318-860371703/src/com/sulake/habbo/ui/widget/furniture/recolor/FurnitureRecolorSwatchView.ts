import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class FurnitureRecolorSwatchView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.recolor::FurnitureRecolorSwatchView'); }

    declare private _window: IRegionWindow;

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _SafeStr_14345: (...args: any[]) => any;

    constructor(param1: IRegionWindow) {
        this._window = asGuarded(param1.clone(), isIRegionWindow);
    }

    public initialize(param1: number, param2: (...args: any[]) => any): void {
        this._color = param1;
        this._SafeStr_14345 = param2;
        this.swatch.color = (0xFF000000 | param1) >>> 0;
        this.selected = false;
        this._window.addEventListener("WME_CLICK", this.onClick);
    }

    public get color(): number {
        return this._color;
    }

    public get window(): IRegionWindow {
        return this._window;
    }

    public set selected(param1: boolean) {
        this.selection.visible = param1;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_14345(this._color);
    };

    public recycle(): void {
        this._window.removeEventListener("WME_CLICK", this.onClick);
        this.selected = false;
        this._SafeStr_14345 = null;
        this._color = 0;
    }

    private get swatch(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("color"), isIStaticBitmapWrapperWindow);
    }

    private get selection(): IWindow {
        return this._window.findChildByName("selection");
    }
}
