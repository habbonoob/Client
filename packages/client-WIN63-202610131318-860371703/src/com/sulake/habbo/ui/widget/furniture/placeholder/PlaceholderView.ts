import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class PlaceholderView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.placeholder::PlaceholderView'); }

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IWindowContainer;

    constructor(param1: IAssetLibrary, param2: IHabboWindowManager) {
        this._SafeStr_3052 = param1;
        this._windowManager = param2;
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public toggleWindow(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this.hideWindow();
        } else {
            this.showWindow();
        }
    }

    public showWindow(): void {
        if (this._window == null) {
            this.createWindow();
        }
        if (this._window == null) {
            return;
        }
        this._window.visible = true;
        this._window.x = 200;
    }

    private createWindow(): void {
        let _loc2_: XmlAsset = asInstanceOf(this._SafeStr_3052.getAssetByName("placeholder"), XmlAsset);
        if (_loc2_ == null || _loc2_.content == null) {
            return;
        }
        this._window = asGuarded(this._windowManager.createWindow("habbohelp_window", "", 4, 0, (0x020000 | 1) >>> 0, new Rectangle(-300, 300, 10, 10), null), isIWindowContainer);
        this._window.buildFromXML(asInstanceOf(_loc2_.content, XML));
        this._window.tags.push("habbo_help_window");
        this._window.background = true;
        this._window.color = 33554431;
        let _loc1_: IWindow = this._window.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.procedure = this.onWindowClose;
        }
    }

    public hideWindow(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideWindow();
    };
}
