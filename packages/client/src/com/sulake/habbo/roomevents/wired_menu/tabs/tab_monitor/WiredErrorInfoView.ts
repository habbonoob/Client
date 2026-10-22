import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredErrorData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredErrorData';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WiredErrorInfoView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_monitor::WiredErrorInfoView'); }

    constructor(param1: WiredMenuController) {
        this._controller = param1;
        this._windowManager = param1.windowManager;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(param1.assets.getAssetByName("error_info_view_xml").content), 1), isIWindowContainer);
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
    }

    declare private _window: IWindowContainer;

    declare private _controller: WiredMenuController;

    declare private _windowManager: IHabboWindowManager;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get errorName(): ITextWindow {
        return asGuarded(this._window.findChildByName("error_name"), isITextWindow);
    }

    private get errorText(): ITextWindow {
        return asGuarded(this._window.findChildByName("error_text"), isITextWindow);
    }

    private get contentsContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("contents"), isIWindowContainer);
    }

    private get typeIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("type_icon"), isIStaticBitmapWrapperWindow);
    }

    public initialize(param1: WiredErrorData): void {
        this.errorName.text = param1.errorName;
        this.typeIcon.assetUri = "icon_wired_" + param1.category.toLowerCase() + "_png";
        this.errorText.text = this._controller.localizationManager.getLocalization("wiredmenu.error_info." + param1.errorId);
        this._window.height = this.contentsContainer.height + 48;
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        this._window.x = Math.max(this._window.x, 0) | 0;
        this._window.y = Math.max(this._window.y, 0) | 0;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        this._window.activate();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hide();
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._controller = null;
        this._disposed = true;
    }

    private hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hide();
    };

    get [IDisposable](): true {
        return true;
    }
}
