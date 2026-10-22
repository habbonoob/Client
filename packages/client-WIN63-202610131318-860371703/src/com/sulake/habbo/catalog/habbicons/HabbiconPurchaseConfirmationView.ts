import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import type { _SafeCls_6053 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6053';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class HabbiconPurchaseConfirmationView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconPurchaseConfirmationView'); }

    private static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly MODE_HABBICON: string = "habbicon";
    private static readonly MODE_SET: string = "set";
    private static readonly RETRY_ENABLE_DELAY_MS: number = 500;

    declare private _controller: HabbiconController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IWindowContainer;

    declare private _item: HabbiconEntryModel;

    declare private _SafeStr_14878: HabbiconSetModel;

    declare private _mode: string;

    declare private _SafeStr_14880: Timer;

    declare private _SafeStr_14881: boolean;
    static { (this.prototype as any)._SafeStr_14881 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("habbicon_purchase_confirmation_xml").content), 1), isIWindowContainer);
        this._window.enableLookupCache();
        this.productImage.disposesBitmap = true;
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.confirmButton.addEventListener("WME_CLICK", this.onConfirmClicked);
    }

    public initializeForHabbicon(param1: HabbiconEntryModel): void {
        this._mode = "habbicon";
        this._item = param1;
        this._SafeStr_14878 = null;
        this.setPending(false);
        this.updateHabbiconUI();
    }

    public initializeForSet(param1: HabbiconSetModel): void {
        this._mode = "set";
        this._SafeStr_14878 = param1;
        this._item = null;
        this.setPending(false);
        this.updateSetUI();
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        this._window.center();
        this._window.activate();
    }

    public purchaseFailed(): void {
        if (this._SafeStr_14880 != null) {
            this._SafeStr_14880.stop();
            this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
        }
        this._SafeStr_14880 = new Timer(500, 1);
        this._SafeStr_14880.addEventListener("timerComplete", this.onRetryTimerComplete);
        this._SafeStr_14880.start();
    }

    public setPending(param1: boolean): void {
        this._SafeStr_14881 = param1;
        WindowUtils.disableSection(this.confirmButton, this._SafeStr_14881);
        WindowUtils.disableSection(this.cancelButton, this._SafeStr_14881);
        WindowUtils.disableSection(this.closeButton, this._SafeStr_14881);
    }

    private updateHabbiconUI(): void {
        if (this._item == null) {
            return;
        }
        this.productName.text = this._item.name;
        this.descriptionText.text = "${habbicon_purchase.confirm.habbicon.desc}";
        this.previewLabel.text = this._item.collectionTitle;
        this.receiveRow.visible = true;
        this.receiveText.text = this.getHabbiconProgressText(this._item);
        this.normalPriceRow.visible = false;
        this.discountRow.visible = false;
        this.priceLabel.text = "${catalog.purchase.confirmation.dialog.cost}";
        this.updatePrice(this._item.priceCredits, this._item.priceActivityPoints, this._item.activityPointType);
        this.showProductImage(this.createHabbiconBitmap(this._item.habbiconId));
    }

    private updateSetUI(): void {
        let _loc1_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        if (this._SafeStr_14878 == null) {
            return;
        }
        _loc1_ = this.getSetPurchaseCount(this._SafeStr_14878);
        _loc4_ = this.getSetPrice(this._SafeStr_14878);
        _loc2_ = this.getSetIndividualPrice(this._SafeStr_14878);
        _loc3_ = _loc2_ - _loc4_;
        this.productName.text = this._SafeStr_14878.title;
        this.descriptionText.text = this._controller.localizationManager.getLocalizationWithParams("habbicon_purchase.confirm.set.desc", "Buy the %set_name% set?", "set_name", this._SafeStr_14878.title);
        this.previewLabel.text = "${habbicon_purchase.confirm.set.preview}";
        this.receiveRow.visible = true;
        this.receiveText.text = this._controller.localizationManager.getLocalizationWithParams(_loc1_ == 1 ? "habbicon_purchase.confirm.set.receive.one" : "habbicon_purchase.confirm.set.receive", _loc1_ == 1 ? "You\'ll receive 1 Habbicon" : "You\'ll receive %count% Habbicons", "count", _loc1_);
        this.priceLabel.text = "${habbicon_purchase.confirm.set_price}";
        this.updatePrice(this._SafeStr_14878.priceCredits, this._SafeStr_14878.priceActivityPoints, this._SafeStr_14878.activityPointType);
        this.normalPriceRow.visible = _loc2_ > _loc4_;
        this.normalPriceAmount.text = this.formatInlinePrice(_loc2_, this.getSetCurrencyType(this._SafeStr_14878));
        this.discountRow.visible = _loc3_ > 0;
        this.discountAmount.text = this.formatInlinePrice(Math.max(0, _loc3_) | 0, this.getSetCurrencyType(this._SafeStr_14878));
        this.showProductImage(this.createSetBitmap(this._SafeStr_14878));
    }

    private getHabbiconProgressText(param1: HabbiconEntryModel): string {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: _SafeCls_6053 = this.findCollection(param1.collectionId);
        let _loc2_: number = this.getCollectionTotal(_loc5_);
        if (_loc5_ == null || _loc2_ <= 0) {
            return this._controller.localizationManager.getLocalizationWithParams("habbicon_purchase.confirm.habbicon.set", "Set: %set_name%", "set_name", param1.collectionTitle);
        }
        _loc3_ = this.getCollectionOwnedCount(_loc5_);
        _loc4_ = Math.min(_loc2_, _loc3_ + 1) | 0;
        return this._controller.localizationManager.getLocalizationWithParams("habbicon_purchase.confirm.habbicon.progress", "Progress after buy: %progress% / %total%", "progress", _loc4_, "total", _loc2_);
    }

    private updatePrice(param1: number, param2: number, param3: number): void {
        this.priceAmount.text = this.formatPriceAmount(param1, param2);
        this.priceIcon.style = this.getPriceIconStyle(param1, param2, param3) >>> 0;
        this.priceIcon.fitToSize();
    }

    private formatPriceAmount(param1: number, param2: number): string {
        if (param1 > 0 && param2 > 0) {
            return param1 + "c + " + param2;
        }
        if (param1 > 0) {
            return param1.toString();
        }
        return Math.max(0, param2).toString();
    }

    private formatInlinePrice(param1: number, param2: number): string {
        if (param2 == 7) {
            return param1 + "c";
        }
        return param1.toString();
    }

    private getPriceIconStyle(param1: number, param2: number, param3: number): number {
        let _loc4_: number = param2 > 0 ? param3 : 7;
        return ActivityPointTypeEnum.getIconStyleFor(_loc4_, this._controller.configuration, true);
    }

    private getSetCurrencyType(param1: HabbiconSetModel): number {
        return param1.priceCredits > 0 ? 7 : param1.activityPointType;
    }

    private getSetPrice(param1: HabbiconSetModel): number {
        return (param1.priceCredits > 0 ? param1.priceCredits : Math.max(0, param1.priceActivityPoints)) | 0;
    }

    private findCollection(param1: number): _SafeCls_6053 {
        let _loc2_: _SafeCls_6053[] = this._controller.shopCollections;
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_ != null && _loc3_.collectionId == param1) {
                return _loc3_;
            }
        }
        return null;
    }

    private getCollectionTotal(param1: _SafeCls_6053): number {
        return (param1 == null || param1.habbicons == null ? 0 : param1.habbicons.length) | 0;
    }

    private getCollectionOwnedCount(param1: _SafeCls_6053): number {
        let _loc2_: any = null;
        let _loc3_: number = 0;
        if (param1 == null || param1.habbicons == null) {
            return 0;
        }
        for (_loc2_ of param1.habbicons ?? []) {
            if (_loc2_ != null && this.isOwnedState(_loc2_.state | 0)) {
                _loc3_++;
            }
        }
        return _loc3_;
    }

    private isOwnedState(param1: number): boolean {
        return param1 == 2 || param1 == 3;
    }

    private getSetPurchaseCount(param1: HabbiconSetModel): number {
        let _loc3_: number = 0;
        for (const _loc2_ of param1.habbicons ?? []) {
            if (this.isMissingForSetPurchase(_loc2_)) {
                _loc3_++;
            }
        }
        return _loc3_;
    }

    private getSetIndividualPrice(param1: HabbiconSetModel): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1.habbicons ?? []) {
            if (this.isMissingForSetPurchase(_loc3_)) {
                _loc2_ = _loc2_ + (_loc3_.priceCredits > 0 ? _loc3_.priceCredits : Math.max(0, _loc3_.priceActivityPoints)) | 0;
            }
        }
        return _loc2_;
    }

    private isMissingForSetPurchase(param1: HabbiconEntryModel): boolean {
        return param1 != null && !param1.owned && !param1.favorite && !param1.claimable;
    }

    private createHabbiconBitmap(param1: number): BitmapData {
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1, false);
        return _loc2_ != null ? _loc2_.clone() : new BitmapData(40, 40, false, 9408399);
    }

    private createSetBitmap(param1: HabbiconSetModel): BitmapData {
        if (param1._SafeStr_14868 != null) {
            return param1._SafeStr_14868.clone();
        }
        return new BitmapData(40, 40, false, 9408399);
    }

    private showProductImage(param1: BitmapData): void {
        this.clearProductImage();
        this.productImage.bitmap = param1;
        this.productImage.visible = param1 != null;
        this.productImage.invalidate();
    }

    private clearProductImage(): void {
        if (this.productImage.bitmap != null) {
            this.productImage.bitmap = null;
            this.productImage.invalidate();
        }
    }

    private onConfirmClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14881) {
            return;
        }
        this.setPending(true);
        if (this._mode == "set" && this._SafeStr_14878 != null) {
            this._controller.buyHabbiconCollection(this._SafeStr_14878.collectionId);
        } else if (this._mode == "habbicon" && this._item != null) {
            this._controller.buyHabbicon(this._item.habbiconId);
        } else {
            this.setPending(false);
        }
    };

    private onRetryTimerComplete = (param1: TimerEvent): void => {
        this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
        this._SafeStr_14880 = null;
        this.setPending(false);
    };

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK" || this._SafeStr_14881) {
            return;
        }
        this._controller.closeHabbiconPurchaseConfirmation();
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_14880 != null) {
            this._SafeStr_14880.stop();
            this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
            this._SafeStr_14880 = null;
        }
        this.closeButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.confirmButton.removeEventListener("WME_CLICK", this.onConfirmClicked);
        if (this._window.parent != null) {
            castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
        }
        this.clearProductImage();
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._controller = null;
        this._item = null;
        this._SafeStr_14878 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get productImage(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow);
    }

    private get previewLabel(): ITextWindow {
        return asGuarded(this._window.findChildByName("preview_label"), isITextWindow);
    }

    private get productName(): ITextWindow {
        return asGuarded(this._window.findChildByName("product_name"), isITextWindow);
    }

    private get descriptionText(): ITextWindow {
        return asGuarded(this._window.findChildByName("description_text"), isITextWindow);
    }

    private get receiveRow(): IWindow {
        return this._window.findChildByName("receive_row");
    }

    private get receiveText(): ITextWindow {
        return asGuarded(this._window.findChildByName("receive_text"), isITextWindow);
    }

    private get priceLabel(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_label"), isITextWindow);
    }

    private get priceAmount(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_amount"), isITextWindow);
    }

    private get priceIcon(): IIconWindow {
        return asGuarded(this._window.findChildByName("price_icon"), isIIconWindow);
    }

    private get normalPriceRow(): IWindow {
        return this._window.findChildByName("normal_price_row");
    }

    private get normalPriceAmount(): ITextWindow {
        return asGuarded(this._window.findChildByName("normal_price_amount"), isITextWindow);
    }

    private get discountRow(): IWindow {
        return this._window.findChildByName("discount_row");
    }

    private get discountAmount(): ITextWindow {
        return asGuarded(this._window.findChildByName("discount_amount"), isITextWindow);
    }

    private get cancelButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("cancel_button"), isIButtonWindow);
    }

    private get confirmButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("confirm_button"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
