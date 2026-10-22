import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubGiftController } from '@/com/sulake/habbo/catalog/club/ClubGiftController';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ClubGiftConfirmationDialog {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubGiftConfirmationDialog'); }

    constructor(param1: ClubGiftController, param2: IPurchasableOffer) {
        this._offer = param2;
        this._controller = param1;
        this.showConfirmation();
    }

    declare private _offer: IPurchasableOffer;

    declare private _controller: ClubGiftController;

    declare private _view: IFrameWindow;

    public dispose(): void {
        this._controller = null;
        this._offer = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public showConfirmation(): void {
        if (!this._offer || !this._controller) {
            return;
        }
        this._view = asGuarded(this.createWindow("club_gift_confirmation"), isIFrameWindow);
        if (!this._view) {
            return;
        }
        this._view.procedure = this.windowEventHandler;
        this._view.center();
        let _loc2_: ITextWindow = asGuarded(this._view.findChildByName("item_name"), isITextWindow);
        if (_loc2_) {
            _loc2_.text = this.getProductName();
        }
        let _loc1_: IWindowContainer = asGuarded(this._view.findChildByName("image_border"), isIWindowContainer);
        if (!_loc1_) {
            return;
        }
        if (!this._offer.productContainer) {
            return;
        }
        this._offer.productContainer.view = _loc1_;
        this._offer.productContainer.initProductIcon(this._controller.roomEngine);
    }

    private getProductName(): string {
        let _loc1_: IProductData = null;
        if (this._offer && this._offer.product) {
            _loc1_ = this._offer.product.productData;
            if (_loc1_) {
                return _loc1_.name;
            }
        }
        return "";
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2 || !this._controller || !this._offer) {
            return;
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "select_button":
                this._controller.confirmSelection(this._offer.localizationId);
                break;
            case "header_button_close":
            case "cancel_button":
                this._controller.closeConfirmation();
        }
    };

    private createWindow(param1: string): IWindow {
        if (!this._controller || !this._controller.assets || !this._controller.windowManager) {
            return null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._controller.assets.getAssetByName(param1), XmlAsset);
        if (!_loc3_ || !_loc3_.content) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (!_loc2_) {
            return null;
        }
        return this._controller.windowManager.buildFromXML(_loc2_);
    }
}
