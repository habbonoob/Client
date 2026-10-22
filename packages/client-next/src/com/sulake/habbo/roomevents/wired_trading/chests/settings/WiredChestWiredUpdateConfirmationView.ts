import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { ChestSettingsUI } from '@/com/sulake/habbo/roomevents/wired_trading/chests/settings/ChestSettingsUI';
import type { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WiredChestWiredUpdateConfirmationView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.settings::WiredChestWiredUpdateConfirmationView'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _window: IWindowContainer;

    declare private _SafeStr_3112: ChestSettingsUI;

    declare private _windowManager: IHabboWindowManager;

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    declare private _chestType: number;
    static { (this.prototype as any)._chestType = 0; }

    declare private _chestItemType: number;
    static { (this.prototype as any)._chestItemType = 0; }

    declare private _SafeStr_6460: boolean;
    static { (this.prototype as any)._SafeStr_6460 = false; }

    constructor(param1: ChestSettingsUI) {
        this._SafeStr_3112 = param1;
        this._windowManager = param1.chestController.windowManager;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(param1.chestController.assets.getAssetByName("chest_wired_upgrade_xml").content), 1), isIWindowContainer);
        this._window.enableLookupCache();
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.buyButton.addEventListener("WME_CLICK", this.onBuyClicked);
    }

    private onBuyClicked = (param1: WindowMouseEvent): void => {
        this.buyButton.disable();
        this._SafeStr_3112.confirmUpgrade();
    };

    public initialize(param1: number, param2: number, param3: number, param4: boolean): void {
        this._chestId = param1;
        this._chestType = param2;
        this._chestItemType = param3;
        this._SafeStr_6460 = param4;
        this.updateUI();
    }

    private updateUI(): void {
        this.buyButton.enable();
        this.cancelButton.enable();
        let _loc1_: WiredChestController = this._SafeStr_3112.chestController;
        let _loc3_: ImageResult = _loc1_.roomEngine.getFurnitureImage(this._chestItemType, new Vector3d(90, 0, 0), 64, this);
        if (_loc3_.data) {
            this.showChestPreview(_loc3_.data);
        }
        let _loc2_: string = null;
        if (this._SafeStr_6460) {
            _loc2_ = "wiredchests.upgrade.wired.error.reason.rookie_chest";
        }
        this.errorText.visible = _loc2_ != null;
        if (_loc2_ != null) {
            this.buyButton.disable();
            this.errorText.text = _loc1_.localization.getLocalizationWithParams("wiredchests.upgrade.wired.error", "", "reason", _loc1_.localization.getLocalization(_loc2_));
        }
    }

    private showChestPreview(param1: BitmapData): void {
        this.productImage.bitmap = param1;
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        this._window.center();
        this._window.activate();
    }

    public hide(): void {
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

    public imageReady(param1: number, param2: BitmapData): void {
        this.showChestPreview(param2);
    }

    public imageFailed(param1: number): void {
        this.showChestPreview(null);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hide();
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._SafeStr_3112 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    public get productImage(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow);
    }

    public get productNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("product_name"), isITextWindow);
    }

    public get errorText(): ITextWindow {
        return asGuarded(this._window.findChildByName("error_text"), isITextWindow);
    }

    public get cancelButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("cancel_button"), isIButtonWindow);
    }

    public get buyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("buy_button"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
