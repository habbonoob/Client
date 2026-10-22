import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class OutfitView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::OutfitView'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2265: IBitmapWrapperWindow;

    declare private _gradient: IStaticBitmapWrapperWindow;

    declare private _button: IButtonWindow;

    declare private _bgColor: number;
    static { (this.prototype as any)._bgColor = 0; }

    declare private _SafeStr_6818: number;
    static { (this.prototype as any)._SafeStr_6818 = 0; }

    declare private _gradientColor: number;
    static { (this.prototype as any)._gradientColor = 0; }

    declare private _SafeStr_7139: number;
    static { (this.prototype as any)._SafeStr_7139 = 0; }

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary, param3: boolean) {
        this._windowManager = param1;
        this._SafeStr_3052 = param2;
        let _loc4_: XmlAsset = asInstanceOf(this._SafeStr_3052.getAssetByName("Outfit"), XmlAsset);
        this._window = castGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (this._window != null) {
            this._SafeStr_2265 = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
            this._gradient = asGuarded(this._window.findChildByName("outfit_gradient"), isIStaticBitmapWrapperWindow);
            this._gradient.visible = false;
            this._button = asGuarded(this._window.findChildByName("button"), isIButtonWindow);
            if (!param3) {
                this._button.disable();
            }
        }
    }

    public dispose(): void {
        this._windowManager = null;
        this._SafeStr_3052 = null;
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
        if (this._SafeStr_2265) {
            this._SafeStr_2265.dispose();
        }
        this._SafeStr_2265 = null;
    }

    public update(param1: BitmapData): void {
        this._SafeStr_2265.bitmap = new BitmapData(this._SafeStr_2265.width, this._SafeStr_2265.height, true, 16777215);
        let _loc2_: number = (this._SafeStr_2265.width - param1.width) / 2 | 0;
        let _loc3_: number = this._SafeStr_2265.height - param1.height;
        this._SafeStr_2265.bitmap.copyPixels(param1, param1.rect, new Point(_loc2_, _loc3_));
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private windowEventProc(param1: WindowEvent, param2: IWindow = null): void {
        if (param1.type != "WME_CLICK") {
            if (param1.type == "WME_OVER") {
                this._window.color = 13421772;
            } else if (param1.type == "WME_OUT") {
                this._window.color = 6710886;
            }
        }
    }

    private updateBackgroundColors(): void {
        this._button.color = (this._active ? this._SafeStr_6818 : this._bgColor) >>> 0;
        if (this._gradientColor == -1) {
            this._gradient.visible = false;
        } else {
            this._gradient.color = (this._active ? this._SafeStr_7139 : this._gradientColor) >>> 0;
            this._gradient.visible = true;
        }
    }

    public setColors(param1: number, param2: number, param3: number, param4: number): void {
        this._bgColor = param1;
        this._SafeStr_6818 = param2;
        this._gradientColor = param3;
        this._SafeStr_7139 = param4;
        this.updateBackgroundColors();
    }

    public toggleActive(param1: boolean): void {
        this._active = param1;
        this.updateBackgroundColors();
    }
}
