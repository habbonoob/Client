import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TargetedOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/TargetedOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { OfferView } from '@/com/sulake/habbo/catalog/targetedoffers/OfferView';

export class TargetedOfferPurchaseConfirmationView extends OfferView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::TargetedOfferPurchaseConfirmationView'); }

    declare private _quantity: number;
    static { (this.prototype as any)._quantity = 0; }

    constructor(param1: OfferController, param2: TargetedOffer, param3: number) {
        super(param1, param2);
        this._quantity = param3;
        this._window = castGuarded(this._controller.catalog.windowManager.buildFromXML(XML.from(this._controller.catalog.assets.getAssetByName("targeted_offer_purchase_confirmation_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: HabboCatalog = asInstanceOf(this._controller.catalog, HabboCatalog);
        if (_loc4_.getBoolean("disclaimer.credit_spending.enabled")) {
            this.setDisclaimerAccepted(false);
        } else {
            this._window.findChildByName("disclaimer").dispose();
            this.setDisclaimerAccepted(true);
        }
        castGuarded(this._window.findChildByName("product_name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this.getLocalization(param2.title);
        let _loc5_: IWindowContainer = asGuarded(this._window.findChildByName("purchase_cost_box"), isIWindowContainer);
        _loc4_.utils.showPriceInContainer(_loc5_, param2, param3);
        let _loc6_: ITextWindow = asGuarded(this._window.findChildByName("quantity"), isITextWindow);
        if (_loc6_ != null) {
            if (param1.catalog.multiplePurchaseEnabled && this._quantity > 1) {
                _loc6_.text = "X " + this._quantity;
            }
        }
        this._window.procedure = this.onInput;
        this._window.center();
    }

    private setDisclaimerAccepted(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("select_button");
        if (_loc2_ == null) {
            return;
        }
        if (param1) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (!this._controller) {
            return;
        }
        if (param1.type == "WME_DOWN") {
            switch (param2.name) {
                case "spending_disclaimer":
                    this.setDisclaimerAccepted(castGuarded(param2, isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                    break;
                case "header_button_close":
                case "cancel_button":
                    this._controller.maximizeOffer(this._offer);
                    break;
                case "buy_button":
                    this._controller.purchaseTargetedOffer(this._offer, this._quantity);
            }
        }
    };
}
