import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { CatalogWidgetInitPurchaseEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetInitPurchaseEvent';
import type { CatalogWidgetPurchaseOverrideEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetPurchaseOverrideEvent';
import type { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';
import type { CatalogWidgetToggleEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetToggleEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import type { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { RentUtils } from '@/com/sulake/habbo/catalog/viewer/widgets/utils/RentUtils';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';

export class PurchaseCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::PurchaseCatalogWidget'); }

    declare private _stubPurchaseVipXML: XML;

    declare private _SafeStr_3919: IWindowContainer;

    declare private _offer: IPurchasableOffer;

    private _additionalParameters: string = "";
    private _SafeStr_5806: IStuffData = null;
    private _quantity: number = 1;

    declare private _purchaseCallback: (...args: any[]) => any;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_5380: boolean;
    static { (this.prototype as any)._SafeStr_5380 = false; }

    private _SafeStr_6980: boolean = false;
    private _enabled: boolean = true;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.removeEventListener("CWE_SET_EXTRA_PARM", this.onSetParameter);
        this.events.removeEventListener("PURCHASE_OVERRIDE", this.onPurchaseOverride);
        this.events.removeEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onSetPreviewerStuffData);
        this.events.removeEventListener("CWE_TOGGLE", this.onToggleWidget);
        super.dispose();
    }

    private onToggleWidget = (param1: CatalogWidgetToggleEvent): void => {
        if (param1.widgetId == "purchaseWidget") {
            this._enabled = param1.enabled;
            this.window.visible = this._enabled;
        }
    };

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.page.isBuilderPage) {
            this._window.visible = false;
            return true;
        }
        this.attachWidgetView("purchaseWidget");
        this._window.findChildByName("selection_information").visible = true;
        this._window.findChildByName("default_buttons").visible = false;
        this._SafeStr_5380 = false;
        if (this.window.tags.indexOf("ROOM_INITIATE_PURCHASE") > -1) {
            this._catalog.sendRoomAdPurchaseInitiatedEvent();
        }
        this._window.findChildByName("buy_button").addEventListener("WME_CLICK", this.onPurchase);
        let _loc2_: IButtonWindow = asGuarded(this._window.findChildByName("gift_button"), isIButtonWindow);
        if (this.window.tags.indexOf("NO_GIFT_OPTION") > -1) {
            this._SafeStr_5380 = true;
            _loc2_.visible = false;
        }
        _loc2_.addEventListener("WME_CLICK", this.onGift);
        _loc2_.disable();
        let _loc1_: XmlAsset = asInstanceOf(this._catalog.assets.getAssetByName("purchaseWidgetBuyVipStub"), XmlAsset);
        if (_loc1_ != null) {
            this._stubPurchaseVipXML = asInstanceOf(_loc1_.content, XML);
        }
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("CWE_SET_EXTRA_PARM", this.onSetParameter);
        this.events.addEventListener("PURCHASE_OVERRIDE", this.onPurchaseOverride);
        this.events.addEventListener("INIT_PURCHASE", this.initPurchase);
        this.events.addEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onSetPreviewerStuffData);
        this.events.addEventListener("CWSE_VALUE_CHANGED", this.onSpinnerValueChanged);
        this.events.addEventListener("CWE_EXTRA_PARAM_REQUIRED_FOR_BUY", this.onExtraParamRequired);
        this.events.addEventListener("CWE_TOGGLE", this.onToggleWidget);
        return true;
    }

    private onPurchaseOverride = (param1: CatalogWidgetPurchaseOverrideEvent): void => {
        this._purchaseCallback = param1.callback;
    };

    private attachStub(param1: IPurchasableOffer): void {
        let _loc2_: any = null;
        if (this._SafeStr_3919 != null) {
            this._SafeStr_3919.visible = false;
            this._window.removeChild(this._SafeStr_3919);
            this._SafeStr_3919.dispose();
            this._SafeStr_3919 = null;
        }
    }

    private get extraParamRequirementsMet(): boolean {
        return !(this._SafeStr_6980 && this._additionalParameters == "");
    }

    private get canPurchaseSelectedOffer(): boolean {
        return this.extraParamRequirementsMet && !this._catalog.isHabbiconOfferOwned(this._offer);
    }

    private updatePurchaseLabel(): void {
        let _loc1_: IWindow = this._window.findChildByName("purchase_label");
        if (_loc1_ == null) {
            return;
        }
        if (this._catalog.isHabbiconOfferOwned(this._offer)) {
            _loc1_.caption = "${generic.owned}";
        } else {
            RentUtils.updateBuyCaption(this._offer, _loc1_);
        }
    }

    private onSelectProduct = (param1: SelectProductEvent): void => {
        let _loc2_: IWindow = null;
        let _loc3_: boolean = false;
        this._quantity = 1;
        this._offer = param1.offer;
        this._window.findChildByName("selection_information").visible = false;
        this._window.findChildByName("default_buttons").visible = true;
        this.attachStub(this._offer);
        this._catalog.purchaseWillBeGift(false);
        if (this._SafeStr_3919 == null) {
            this.enableBuyButton(this.canPurchaseSelectedOffer);
            this.enableGiftButton(this.canPurchaseSelectedOffer);
            this.updatePurchaseLabel();
            _loc2_ = this._window.findChildByName("gift_button");
            if (_loc2_ != null) {
                _loc2_.visible = !this._offer.isRentOffer && !this._SafeStr_5380;
            }
            if (!this._offer.giftable) {
                this.enableGiftButton(false);
            }
            _loc3_ = this.isSoldOut(this._offer);
            if (_loc3_) {
                this.enableBuyButton(false);
                this.enableGiftButton(false);
            }
            this.window.visible = this._enabled;
        } else {
            this.enableBuyButton(false);
            this.enableGiftButton(false);
        }
    };

    private isSoldOut(param1: IPurchasableOffer): boolean {
        let _loc2_: IProduct = null;
        let _loc3_: boolean = false;
        if (param1 != null) {
            if (param1.pricingModel == "pricing_model_single") {
                _loc2_ = this._offer.product;
                if (_loc2_ != null && _loc2_.isUniqueLimitedItem) {
                    return _loc2_.uniqueLimitedItemsLeft == 0;
                }
            }
        }
        return false;
    }

    private enableBuyButton(param1: boolean): void {
        if (this._catalog.sessionDataManager.isAccountSafetyLocked()) {
            param1 = false;
        }
        this.enableButton("buy_button", param1);
    }

    private enableGiftButton(param1: boolean): void {
        if (this._catalog.sessionDataManager.isAccountSafetyLocked()) {
            param1 = false;
        }
        this.enableButton("gift_button", param1);
    }

    private enableButton(param1: string, param2: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ == null) {
            return;
        }
        if (param2) {
            _loc3_.enable();
            _loc3_.blend = 1;
        } else {
            _loc3_.disable();
            _loc3_.blend = 0.5;
        }
    }

    private onSetParameter = (param1: SetExtraPurchaseParameterEvent): void => {
        this._additionalParameters = param1.parameter;
        this.enableBuyButton(this.canPurchaseSelectedOffer);
        this.enableGiftButton(this._offer != null && this._offer.giftable && this.canPurchaseSelectedOffer && this._quantity == 1);
    };

    private onPurchase = (param1: WindowMouseEvent, param2: boolean = false): void => {
        let event: WindowMouseEvent = param1;
        let isGift: boolean = param2;
        if (this._catalog.isHabbiconOfferOwned(this._offer)) {
            this._catalog.showHabbiconAlreadyOwnedAlert();
            return;
        }
        if (!this._catalog.verifyClubLevel(this._offer.clubLevel)) {
            this._catalog.openClubCenter();
            return;
        }
        this._catalog.purchaseWillBeGift(isGift);
        if (this._purchaseCallback == null) {
            if (this._offer != null) {
                if (this._catalog.roomAdPurchaseData != null && this._catalog.roomAdPurchaseData.offerId == this._offer.offerId) {
                    if (this._catalog.roomAdPurchaseData.flatId == 0) {
                        this._catalog.windowManager.alert("${roomad.error.title}", "${roomad.alert.no.available.room}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                         param1.dispose();
                     });
                        return;
                    }
                    if (this._catalog.roomAdPurchaseData.name == null || this._catalog.roomAdPurchaseData.name.length < 5 || this._catalog.roomAdPurchaseData.name.substr(0, 1) == " ") {
                        this._catalog.windowManager.alert("${roomad.error.title}", "${roomad.alert.name.empty}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                         param1.dispose();
                     });
                        return;
                    }
                }
                this._catalog.showPurchaseConfirmation(this._offer, this.page.pageId, this._additionalParameters, this._quantity, this._SafeStr_5806, null, true, null);
            }
        } else {
            this._purchaseCallback(event);
        }
    };

    private onGift = (param1: WindowMouseEvent): void => {
        this.onPurchase(param1, true);
        HabboTracking.getInstance().trackEventLog("Catalog", "click", "client.buy_as_gift.clicked");
    };

    private initPurchase = (param1: CatalogWidgetInitPurchaseEvent): void => {
        if (this._offer != null) {
            if (this._catalog.isHabbiconOfferOwned(this._offer)) {
                this._catalog.showHabbiconAlreadyOwnedAlert();
                return;
            }
            this._catalog.showPurchaseConfirmation(this._offer, this.page.pageId, this._additionalParameters, this._quantity, this._SafeStr_5806, null, true, null);
        }
    };

    private onBuyClub(param1: WindowMouseEvent): void {
        this._catalog.rememberPageDuringVipPurchase(this.page.pageId);
        this._catalog.openClubCenter();
        HabboTracking.getInstance().trackEventLog("Catalog", "click", "BUY_CLUB");
    }

    private onSetPreviewerStuffData = (param1: SetRoomPreviewerStuffDataEvent): void => {
        this._SafeStr_5806 = param1.stuffData;
    };

    private onSpinnerValueChanged = (param1: CatalogWidgetSpinnerEvent): void => {
        this._quantity = param1.value;
        if (this._quantity > 1) {
            this.enableGiftButton(false);
        } else if (this._offer != null && this.extraParamRequirementsMet) {
            this.enableGiftButton(this._offer.giftable && this.canPurchaseSelectedOffer);
        }
    };

    private onExtraParamRequired = (param1: CatalogWidgetEvent): void => {
        this._SafeStr_6980 = true;
        this.enableBuyButton(this.canPurchaseSelectedOffer);
        this.enableGiftButton(this._offer != null && this.canPurchaseSelectedOffer && this._quantity == 1);
    };
}
