import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ItemPopupCtrl } from '@/com/sulake/habbo/inventory/ItemPopupCtrl';
import { TradingView } from '@/com/sulake/habbo/inventory/trading/TradingView';
import { Util } from '@/com/sulake/habbo/inventory/Util';
import { WiredTradingModel } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel.group';

export class WiredTradingView implements IInventoryView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading::WiredTradingView'); }

    declare private _SafeStr_2134: WiredTradingModel;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _SafeStr_3399: ItemPopupCtrl;

    declare private _soundManager: IHabboSoundManager;

    declare private _SafeStr_2458: Timer;

    declare private _SafeStr_2782: Timer;

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    constructor(param1: WiredTradingModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IRoomEngine, param5: IHabboLocalizationManager, param6: IHabboSoundManager) {
        this._SafeStr_2134 = param1;
        this._windowManager = param2;
        this._localization = param5;
        this._SafeStr_3052 = param3;
        this._roomEngine = param4;
        this._soundManager = param6;
        let _loc7_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(asInstanceOf(castTo(this._SafeStr_3052.getAssetByName("item_popup_xml"), XmlAsset).content, XML)), isIWindowContainer);
        _loc7_.visible = false;
        this._SafeStr_3399 = new ItemPopupCtrl(_loc7_, this._SafeStr_3052, this._windowManager, this._SafeStr_2134.inventory);
        this.createWindow();
    }

    private createWindow(): void {
        let _loc2_: IWindow = null;
        let _loc4_: any = 0;
        let _loc3_: IItemGridWindow = null;
        let _loc1_: XML = asInstanceOf(castTo(this._SafeStr_3052.getAssetByName("inventory_trading_wired_xml"), XmlAsset).content, XML);
        let _loc5_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(_loc1_), isIWindowContainer);
        _loc3_ = asGuarded(_loc5_.findChildByTag("OWN_USER_GRID"), isIItemGridWindow);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.numGridItems) {
            _loc2_ = _loc3_.getGridItemAt(_loc4_ >>> 0);
            _loc2_.id = _loc4_ | 0;
            _loc2_.procedure = this.ownThumbEventProc;
            _loc2_.addEventListener("WME_OVER", this.ownThumbEventProc);
            _loc2_.addEventListener("WME_OUT", this.ownThumbEventProc);
            _loc4_++;
        }
        _loc3_ = asGuarded(_loc5_.findChildByTag("OTHER_USER_GRID"), isIItemGridWindow);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.numGridItems) {
            _loc2_ = _loc3_.getGridItemAt(_loc4_ >>> 0);
            _loc2_.id = _loc4_ | 0;
            _loc2_.procedure = this.othersThumbEventProc;
            _loc2_.addEventListener("WME_OVER", this.othersThumbEventProc);
            _loc2_.addEventListener("WME_OUT", this.othersThumbEventProc);
            _loc4_++;
        }
        this._window = _loc5_;
        this.acceptButton.addEventListener("WME_CLICK", this.onAcceptClick);
        this.cancelButton.addEventListener("WME_CLICK", this.onCancelClick);
        this.secondsLeftText.visible = false;
    }

    private onCancelClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2134.requestCancelTrading();
    };

    private onAcceptClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2134.state == 1) {
            if (this._SafeStr_2134.requestAccept()) {
                this.startConfirmCountdown();
            }
        } else if (this._SafeStr_2134.state == 3) {
            this._SafeStr_2134.requestConfirm();
        }
    };

    public updateAllUI(): void {
        this.updateUI();
        this.updateItemList(false);
        this.updateItemList(true);
        this.updateStateUI();
        this.updateOfferInfoUI();
    }

    public updateUI(): void {
        Util.disableButton(this.acceptButton, !this._SafeStr_2134.canAccept);
        let _loc1_: boolean = this._SafeStr_2134.isPayment();
        this.tradeTypeSplitter.assetUri = _loc1_ ? "inventory_trading_trading_arrow_icon" : "inventory_trading_trading_split_icon";
        if (_loc1_) {
            this.paymentLayoutImage.assetUri = "wired_chests_images_" + this._SafeStr_2134.paymentLayoutType + "_payments";
        }
        this.wiredOfferings.visible = !_loc1_;
        this.wiredPaymentPlaceholder.visible = _loc1_;
    }

    public tradeStateUpdated(): void {
        this.updateStateUI();
    }

    private updateStateUI(): void {
        let _loc1_: string = this._SafeStr_2134.tradeTypeLocalization.toLowerCase();
        if (this._SafeStr_2134.state == 1 || this._SafeStr_2134.state == 0) {
            this.lockIcon.assetUri = "inventory_trading_trading_unlocked_icon";
        } else {
            this.lockIcon.assetUri = "inventory_trading_trading_locked_icon";
        }
        if (this._SafeStr_2134.state == 1) {
            this.infoText.text = this._localization.getLocalizationWithParams("inventory.wired_trading.note.add_items", "", "type", _loc1_);
            this.acceptButton.caption = this._localization.getLocalization("inventory.trading.accept");
        } else if (this._SafeStr_2134.state == 2) {
            this.infoText.text = this._localization.getLocalization("inventory.wired_trading.note.countdown");
            this.acceptButton.caption = "${inventory.trading.countdown}";
            this.acceptButton.disable();
        } else if (this._SafeStr_2134.state == 3 || this._SafeStr_2134.state == 4) {
            this.infoText.text = this._localization.getLocalizationWithParams("inventory.wired_trading.note.verify", "", "type", _loc1_);
            this.acceptButton.caption = this._localization.getLocalization("inventory.trading.confirm");
            if (this._SafeStr_2134.state == 4) {
                this.acceptButton.disable();
            } else {
                this.acceptButton.enable();
            }
        }
    }

    private updateSecondsLeftUI(): void {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        let _loc3_: number = this._SafeStr_2134.secondsLeft;
        if (_loc3_ >= 0 && _loc3_ < 120) {
            this.secondsLeftText.visible = true;
            _loc2_ = _loc3_ / 60 | 0;
            _loc1_ = _loc3_ - _loc2_ * 60;
            this.secondsLeftText.text = this._localization.getLocalizationWithParams("inventory.wired_trading.seconds_left", "", "seconds", _loc1_ < 10 ? "0" + _loc1_ : _loc1_, "minutes", _loc2_);
        } else {
            this.secondsLeftText.visible = false;
        }
    }

    public startConfirmCountdown(): void {
        if (this._SafeStr_2458 == null) {
            this._SafeStr_2458 = new Timer(1000, 3);
            this._SafeStr_2458.addEventListener("timer", this.timerEventHandler);
        }
        this._SafeStr_2458.reset();
        this._SafeStr_2458.repeatCount = 3;
        this._SafeStr_2458.start();
        this._windowManager.registerLocalizationParameter("inventory.trading.countdown", "counter", "3");
    }

    private timerEventHandler = (param1: TimerEvent): void => {
        this._windowManager.registerLocalizationParameter("inventory.trading.countdown", "counter", String(3 - this._SafeStr_2458.currentCount));
        if (this._SafeStr_2458.currentCount == 3) {
            this._SafeStr_2134.confirmCountdownReady();
            this._SafeStr_2458.reset();
            this.acceptButton.enable();
        }
    };

    public startSecondsLeftTimer(): void {
        if (this._SafeStr_2782 == null) {
            this._SafeStr_2782 = new Timer(1000);
            this._SafeStr_2782.addEventListener("timer", this.onSecondsLeftTimer);
        }
        this._SafeStr_2782.reset();
        this._SafeStr_2782.start();
        this.updateSecondsLeftUI();
    }

    public stopSecondsLeftTimer(): void {
        if (this._SafeStr_2782) {
            this._SafeStr_2782.stop();
        }
    }

    private onSecondsLeftTimer = (param1: TimerEvent): void => {
        this.updateSecondsLeftUI();
        if (this._SafeStr_2134.secondsLeft <= 0) {
            this.stopSecondsLeftTimer();
        }
    };

    public updateItemList(param1: boolean): void {
        let _loc3_: UtilsMap = param1 ? this._SafeStr_2134.ownUserItems : this._SafeStr_2134.wiredItems;
        let _loc2_: IItemGridWindow = param1 ? this.yourItemGrid : this.wiredItemGrid;
        TradingView.updateItemsGrid(_loc2_, _loc3_);
        this.updateOfferInfoUI();
    }

    public updateOfferInfoUI(): void {
        this.yourItemCountText.text = this._localization.getLocalizationWithParams("inventory.trading.info.itemcount", "", "value", this._SafeStr_2134.ownUserNumItems);
        this.wiredItemCountText.text = this._localization.getLocalizationWithParams("inventory.trading.info.itemcount", "", "value", this._SafeStr_2134.wiredNumItems);
        this.yourCreditCountText.text = this._localization.getLocalizationWithParams("inventory.trading.info.creditvalue", "", "value", this._SafeStr_2134.ownUserNumCredits);
        this.wiredCreditCountText.text = this._localization.getLocalizationWithParams("inventory.trading.info.creditvalue", "", "value", this._SafeStr_2134.wiredNumCredits);
    }

    private ownThumbEventProc = (param1: WindowEvent, param2: IWindow): void => {
        TradingView.thumbEventProc(param1, param2, true, this._SafeStr_2134, this._SafeStr_2134.ownUserItems, null, this._SafeStr_2134.wiredItems, null, this._SafeStr_3399, this._localization);
    };

    private othersThumbEventProc = (param1: WindowEvent, param2: IWindow): void => {
        TradingView.thumbEventProc(param1, param2, false, this._SafeStr_2134, this._SafeStr_2134.ownUserItems, null, this._SafeStr_2134.wiredItems, null, this._SafeStr_3399, this._localization);
    };

    public alertTradeCancelled(param1: number): void {
        if (param1 == WiredTradingModel._log) {
            return;
        }
        let _loc3_: string = this._localization.getLocalization("wired_transactions.notification.fail.popup.title");
        let _loc2_: string = this._localization.getLocalizationWithParams("wired_transactions.notification.fail", "", "reason", this._localization.getLocalization("wired_transactions.notification.fail." + param1));
        this._windowManager.alert(_loc3_, _loc2_, 0, null);
    }

    public getWindowContainer(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_2458) {
            this._SafeStr_2458.removeEventListener("timer", this.timerEventHandler);
            this._SafeStr_2458.stop();
            this._SafeStr_2458 = null;
        }
        if (this._SafeStr_2782) {
            this._SafeStr_2782.removeEventListener("timer", this.onSecondsLeftTimer);
            this._SafeStr_2782.stop();
            this._SafeStr_2782 = null;
        }
        this._window.dispose();
        this._window = null;
        this._SafeStr_2134 = null;
        this._windowManager = null;
        this._localization = null;
        this._roomEngine = null;
        this._SafeStr_3052 = null;
        this._soundManager = null;
        this._SafeStr_3399.dispose();
        this._SafeStr_3399 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get infoText(): ITextWindow {
        return asGuarded(this._window.findChildByName("info_text"), isITextWindow);
    }

    public get tradeTypeSplitter(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("trade_type_splitter"), isIStaticBitmapWrapperWindow);
    }

    public get lockIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("lock_0"), isIStaticBitmapWrapperWindow);
    }

    public get acceptButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("button_accept"), isIButtonWindow);
    }

    public get cancelButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("button_cancel"), isIButtonWindow);
    }

    public get requirementsButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("requirements_button"), isIRegionWindow);
    }

    public get yourItemGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("item_grid_0"), isIItemGridWindow);
    }

    public yourItemGridBorder(param1: number): IBorderWindow {
        return asGuarded(this.yourItemGrid.getChildByID(param1), isIBorderWindow);
    }

    public get yourItemCountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("content_text_1_a"), isITextWindow);
    }

    public get yourCreditCountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("content_text_1_b"), isITextWindow);
    }

    public get wiredOfferings(): IWindowContainer {
        return asGuarded(this._window.findChildByName("offers_1"), isIWindowContainer);
    }

    public get wiredPaymentPlaceholder(): IWindowContainer {
        return asGuarded(this._window.findChildByName("offers_1_payment_placeholder"), isIWindowContainer);
    }

    public get paymentLayoutImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("payment_layout_image"), isIStaticBitmapWrapperWindow);
    }

    public get wiredItemGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("item_grid_1"), isIItemGridWindow);
    }

    public wiredItemGridBorder(param1: number): IBorderWindow {
        return asGuarded(this.wiredItemGrid.getChildByID(param1), isIBorderWindow);
    }

    public get wiredItemCountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("content_text_2_a"), isITextWindow);
    }

    public get wiredCreditCountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("content_text_2_b"), isITextWindow);
    }

    public get secondsLeftText(): ITextWindow {
        return asGuarded(this._window.findChildByName("seconds_left_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
