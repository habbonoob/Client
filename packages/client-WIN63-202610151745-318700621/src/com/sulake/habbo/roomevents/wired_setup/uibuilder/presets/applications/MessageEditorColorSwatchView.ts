import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';

export class MessageEditorColorSwatchView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorColorSwatchView'); }

    declare private _window: IRegionWindow;

    declare private _tagName: string;

    declare private _rgb: number;
    static { (this.prototype as any)._rgb = 0; }

    declare private _SafeStr_14360: (...args: any[]) => any;

    declare private _SafeStr_14389: (...args: any[]) => any;

    constructor(param1: IRegionWindow, param2: string, param3: number, param4: number, param5: string, param6: (...args: any[]) => any, param7: (...args: any[]) => any) {
        this._window = param1;
        this._tagName = param2;
        this._rgb = param3;
        this._SafeStr_14360 = param6;
        this._SafeStr_14389 = param7;
        this.swatchColor.color = (0xFF000000 | param4) >>> 0;
        this._window.toolTipCaption = param5;
        this._window.addEventListener("WME_CLICK", this.onClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    public get window(): IRegionWindow {
        return this._window;
    }

    private onClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14360(this._tagName, this._rgb);
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._SafeStr_14389(true);
    };

    private onOut = (param1: WindowMouseEvent): void => {
        this._SafeStr_14389(false);
    };

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        this._window.removeEventListener("WME_CLICK", this.onClicked);
        this._window.removeEventListener("WME_OVER", this.onOver);
        this._window.removeEventListener("WME_OUT", this.onOut);
        this._window.dispose();
        this._window = null;
        this._tagName = null;
        this._SafeStr_14360 = null;
        this._SafeStr_14389 = null;
    }

    private get swatchColor(): IBorderWindow {
        return asGuarded(this._window.findChildByName("swatch_color"), isIBorderWindow);
    }
}
