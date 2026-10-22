import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UpgradeChestResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/UpgradeChestResultMessageEvent';
import { UpgradeChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/UpgradeChestMessageComposer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WiredChestUpgradeConfirmationView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.upgrade_confirmation::WiredChestUpgradeConfirmationView'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _window: IWindowContainer;

    declare private _controller: WiredChestController;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_5560: UpgradeChestResultMessageEvent;

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    declare private _chestType: number;
    static { (this.prototype as any)._chestType = 0; }

    declare private _chestItemType: number;
    static { (this.prototype as any)._chestItemType = 0; }

    declare private _currentCapacityLevel: number;
    static { (this.prototype as any)._currentCapacityLevel = 0; }

    constructor(param1: WiredChestController) {
        this._controller = param1;
        this._windowManager = param1.windowManager;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(param1.assets.getAssetByName("chest_upgrade_xml").content), 1), isIWindowContainer);
        this._window.enableLookupCache();
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.buyButton.addEventListener("WME_CLICK", this.onBuyClicked);
        this.amountSelection.addEventListener("WE_SELECTED", this.onAmountSelected);
        this._SafeStr_5560 = new UpgradeChestResultMessageEvent(this.onUpgradeChestResult);
        param1.addMessageEvent(this._SafeStr_5560);
    }

    private onUpgradeChestResult = (param1: UpgradeChestResultMessageEvent): void => {
        let _loc2_: string = null;
        let _loc4_: string = null;
        let _loc3_: number = param1.getParser().resultCode;
        if (_loc3_ == 0) {
            this._controller.roomEvents.notifications.addItem("${wiredchests.upgrade.result.success}", "info");
        } else {
            _loc2_ = this._controller.localization.getLocalization("wiredchests.upgrade.result.error." + _loc3_);
            _loc4_ = this._controller.localization.getLocalizationWithParams("wiredchests.upgrade.result.error", "", "reason", _loc2_);
            this._controller.roomEvents.notifications.addItem(_loc4_, "info");
        }
        this.hide();
    };

    private onBuyClicked = (param1: WindowMouseEvent): void => {
        this.buyButton.disable();
        this._controller.send(new UpgradeChestMessageComposer(this._chestId, this.amountSelection.selection + 1));
    };

    public initialize(param1: number, param2: number, param3: number, param4: number): void {
        this._chestId = param1;
        this._chestType = param2;
        this._chestItemType = param3;
        this._currentCapacityLevel = param4;
        this.initializeDropMenu();
        this.updateUI();
    }

    private initializeDropMenu(): void {
        let _loc6_: string = this._chestType == ChestType.TYPE_COIN ? "coins" : "furni";
        let _loc3_: number = this._controller.getInteger("wired." + _loc6_ + "_chest.max_upgrades", 0);
        let _loc4_: string[] = [];
        _loc4_.push("1");
        let _loc1_: number = 2;
        let _loc2_: number = this._currentCapacityLevel + 2;
        while (_loc2_ <= _loc3_) {
            _loc4_.push(String(_loc1_));
            _loc1_ += 1;
            _loc2_ += 1;
        }
        this.amountSelection.populateWithVector(_loc4_);
        this.amountSelection.selection = 0;
        let _loc5_: boolean = this._currentCapacityLevel >= _loc3_;
        Util.disableSection(this.amountSelection, _loc5_);
    }

    private onAmountSelected = (param1: WindowEvent): void => {
        this.updateUI();
    };

    private updateUI(): void {
        let _loc7_: number = this.amountSelection.selection + 1;
        this.buyButton.enable();
        this.cancelButton.enable();
        let _loc11_: ImageResult = this._controller.roomEngine.getFurnitureImage(this._chestItemType, new Vector3d(90, 0, 0), 64, this);
        if (_loc11_.data) {
            this.showChestPreview(_loc11_.data);
        }
        let _loc8_: string = null;
        let _loc5_: string = this._chestType == ChestType.TYPE_COIN ? "coins" : "furni";
        let _loc4_: number = this._controller.getInteger("wired." + _loc5_ + "_chest.initial_capacity", 0);
        let _loc13_: number = this._controller.getInteger("wired." + _loc5_ + "_chest.upgrade_capacity", 0);
        let _loc3_: number = this._controller.getInteger("wired." + _loc5_ + "_chest.max_upgrades", 0);
        let _loc9_: number = this._controller.getInteger("wired.chests.upgrade_cost_credits", 999);
        let _loc6_: number = this._controller.getInteger("wired.chests.upgrade_cost_diamonds", 999);
        let _loc12_: boolean = this._currentCapacityLevel >= _loc3_;
        let _loc15_: IPurse = this._controller.catalog.getPurse();
        let _loc14_: boolean = _loc15_.credits < _loc9_ * _loc7_ || _loc15_.getActivityPointsForType(5) < _loc6_ * _loc7_;
        if (_loc12_) {
            _loc8_ = "wiredchests.upgrade.error.reason.at_capacity";
        } else if (_loc14_) {
            _loc8_ = "wiredchests.upgrade.error.reason.not_enough_currency";
        }
        let _loc10_: number = _loc4_ + this._currentCapacityLevel * _loc13_;
        let _loc1_: number = _loc13_ * _loc7_;
        let _loc2_: number = _loc10_ + _loc1_;
        this.productNameText.text = this._controller.localization.getLocalizationWithParams("wiredchests.upgrade.capacity.extra", "", "purchase_capacity", _loc1_);
        this.currentCapacityText.text = this._controller.localization.getLocalizationWithParams("wiredchests.upgrade.capacity.current", "", "current_capacity", _loc10_);
        this.newCapacity.text = this._controller.localization.getLocalizationWithParams("wiredchests.upgrade.capacity.new", "", "new_capacity", _loc2_);
        this.priceCreditsText.text = String(_loc9_ * _loc7_);
        this.priceDiamondsText.text = String(_loc6_ * _loc7_);
        this.priceCreditsText.visible = _loc9_ != 0;
        this.priceDiamondsText.visible = _loc6_ != 0;
        this.pricePlusText.visible = _loc9_ != 0 && _loc6_ != 0;
        this.errorText.visible = _loc8_ != null;
        if (_loc8_ != null) {
            this.buyButton.disable();
            this.errorText.text = this._controller.localization.getLocalizationWithParams("wiredchests.upgrade.error", "", "reason", this._controller.localization.getLocalization(_loc8_));
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
        if (!this._controller.disposed) {
            this._controller.removeMessageEvent(this._SafeStr_5560);
        }
        this.hide();
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._controller = null;
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

    public get currentCapacityText(): ITextWindow {
        return asGuarded(this._window.findChildByName("current_capacity"), isITextWindow);
    }

    public get newCapacity(): ITextWindow {
        return asGuarded(this._window.findChildByName("new_capacity"), isITextWindow);
    }

    public get amountSelection(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("amount_selection_dropmenu"), isIDropMenuWindow);
    }

    public get priceCreditsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_credits"), isITextWindow);
    }

    public get pricePlusText(): ITextWindow {
        return asGuarded(this._window.findChildByName("plus"), isITextWindow);
    }

    public get priceDiamondsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_diamonds"), isITextWindow);
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
