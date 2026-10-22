import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { MarketPlaceLogic } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceLogic';
import type { MarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/MarketPlaceOfferData';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class MarketplaceConfirmationDialog implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketplaceConfirmationDialog'); }

    declare private _marketplace: MarketPlaceLogic;

    declare private _catalog: IHabboCatalog;

    declare private _roomEngine: IRoomEngine;

    declare private _window: IFrameWindow;

    declare private _offer: MarketPlaceOfferData;

    constructor(param1: MarketPlaceLogic, param2: IHabboCatalog, param3: IRoomEngine) {
        this._marketplace = param1;
        this._catalog = param2;
        this._roomEngine = param3;
    }

    public dispose(): void {
        this._marketplace = null;
        this._catalog = null;
        this._roomEngine = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._offer = null;
    }

    public showConfirmation(param1: number, param2: MarketPlaceOfferData): void {
        let _loc9_: string = null;
        let _loc3_: ILocalization = null;
        let _loc5_: string = null;
        let _loc7_: IWindow = null;
        let _loc10_: IWidgetWindow = null;
        let _loc6_: ILimitedItemGridOverlayWidget = null;
        let _loc12_: IWidgetWindow = null;
        let _loc4_: IRarityItemGridOverlayWidget = null;
        let _loc11_: IWindow = null;
        if (!param2) {
            return;
        }
        this._offer = param2;
        if (!this._marketplace || !this._catalog || !this._catalog.localization) {
            return;
        }
        if (this._window) {
            this._window.dispose();
        }
        this._window = asGuarded(this.createWindow("marketplace_purchase_confirmation"), isIFrameWindow);
        this._window.procedure = this.eventHandler;
        this._window.center();
        let _loc8_: ITextWindow = asGuarded(this._window.findChildByName("header_text"), isITextWindow);
        if (_loc8_) {
            if (param1 == 1) {
                _loc8_.text = "${catalog.marketplace.confirm_header}";
            }
            if (param1 == 2) {
                _loc8_.text = "${catalog.marketplace.confirm_higher_header}";
            }
        }
        _loc8_ = asGuarded(this._window.findChildByName("item_name"), isITextWindow);
        if (_loc8_) {
            _loc8_.text = "${" + this._marketplace.getNameLocalizationKey(param2) + "}";
        }
        _loc8_ = asGuarded(this._window.findChildByName("item_price"), isITextWindow);
        if (_loc8_) {
            _loc9_ = this._catalog.localization.getLocalization("catalog.marketplace.confirm_price");
            _loc9_ = _loc9_.replace("%price%", String(this._offer.price));
            _loc8_.text = _loc9_;
        }
        _loc8_ = asGuarded(this._window.findChildByName("item_average_price"), isITextWindow);
        if (_loc8_) {
            _loc3_ = this._catalog.localization.getLocalizationRaw("catalog.marketplace.offer_details.average_price");
            if (_loc3_) {
                _loc9_ = _loc3_.raw;
                _loc9_ = _loc9_.replace("%days%", this._marketplace.averagePricePeriod.toString());
                _loc5_ = this._offer.averagePrice == 0 ? " - " : this._offer.averagePrice.toString();
                _loc9_ = _loc9_.replace("%average%", _loc5_);
                _loc8_.text = _loc9_;
            } else {
                _loc8_.visible = false;
            }
        }
        _loc8_ = asGuarded(this._window.findChildByName("offer_count"), isITextWindow);
        if (_loc8_) {
            _loc3_ = this._catalog.localization.getLocalizationRaw("catalog.marketplace.offer_details.offer_count");
            if (_loc3_) {
                _loc9_ = _loc3_.raw;
                _loc9_ = _loc9_.replace("%count%", String(this._offer.offerCount));
                _loc8_.text = _loc9_;
            } else {
                _loc8_.visible = false;
            }
        }
        if (param2.isUniqueLimitedItem) {
            _loc7_ = this._window.findChildByName("unique_item_background_bitmap");
            _loc7_.visible = true;
            _loc10_ = castGuarded(this._window.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc6_ = castGuarded(_loc10_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
            _loc10_.visible = true;
            _loc6_.serialNumber = param2.stuffData.uniqueSerialNumber;
            _loc6_.animated = true;
        }
        if (param2.stuffData && param2.stuffData.rarityLevel >= 0) {
            _loc12_ = castGuarded(this._window.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc4_ = castGuarded(_loc12_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc12_.visible = true;
            _loc4_.rarityLevel = param2.stuffData.rarityLevel;
        }
        this.setImage();
        if ((this._catalog instanceof HabboCatalog ? this._catalog : null).getBoolean("disclaimer.credit_spending.enabled")) {
            this.setDisclaimerAccepted(false);
        } else {
            _loc11_ = this._window.findChildByName("disclaimer");
            this._window.height -= _loc11_.height;
            _loc11_.dispose();
            this.setDisclaimerAccepted(true);
        }
    }

    private setImage(): void {
        let _loc1_: ImageResult = null;
        let _loc2_: IBitmapWrapperWindow = null;
        if (!this._offer || !this._window || !this._roomEngine) {
            return;
        }
        if (!this._offer.image) {
            if (this._offer.furniType == 1) {
                _loc1_ = this._roomEngine.getFurnitureIcon(this._offer.furniId, this);
            } else if (this._offer.furniType == 2) {
                _loc1_ = this._roomEngine.getWallItemIcon(this._offer.furniId, this);
            }
            if (_loc1_ && _loc1_.data) {
                this._offer.image = _loc1_.data instanceof BitmapData ? _loc1_.data : null;
                this._offer.imageCallback = _loc1_.id;
            }
        }
        if (this._offer.image != null) {
            _loc2_ = asGuarded(this._window.findChildByName("item_image"), isIBitmapWrapperWindow);
            if (_loc2_) {
                if (_loc2_.bitmap) {
                    _loc2_.bitmap.dispose();
                    _loc2_.bitmap = null;
                }
                _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
                _loc2_.bitmap.draw(this._offer.image, new Matrix(1, 0, 0, 1, (_loc2_.width - this._offer.image.width) / 2, (_loc2_.height - this._offer.image.height) / 2));
            }
        }
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2) {
            return;
        }
        if (param1.type != "WME_CLICK" && param1.type != "WME_DOUBLE_CLICK") {
            return;
        }
        switch (param2.name) {
            case "spending_disclaimer":
                this.setDisclaimerAccepted(castGuarded(param2, isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                break;
            case "buy_button":
                this._catalog.buyMarketPlaceOffer(this._offer.offerId);
                this.hide();
                break;
            case "header_button_close":
            case "cancel_button":
                this.hide();
        }
    };

    private hide(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._offer && this._offer.imageCallback == param1) {
            this._offer.image = param2;
            this.setImage();
        }
    }

    public imageFailed(param1: number): void {
    }

    private createWindow(param1: string): IWindow {
        if (!this._catalog || !this._catalog.assets || !this._catalog.windowManager) {
            return null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._catalog.assets.getAssetByName(param1), XmlAsset);
        if (!_loc3_ || !_loc3_.content) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (!_loc2_) {
            return null;
        }
        return this._catalog.windowManager.buildFromXML(_loc2_);
    }

    private setDisclaimerAccepted(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("buy_button");
        if (_loc2_ == null) {
            return;
        }
        if (param1) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    get [IGetImageListener](): true {
        return true;
    }
}
