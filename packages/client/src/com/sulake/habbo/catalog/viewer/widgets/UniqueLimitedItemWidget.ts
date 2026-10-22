import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { ProductOfferUpdatedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/ProductOfferUpdatedEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ILimitedItemOverlay } from '@/com/sulake/habbo/window/utils/ILimitedItemOverlay';
import type { ILimitedItemSupplyLeftOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemSupplyLeftOverlayWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { isILimitedItemSupplyLeftOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemSupplyLeftOverlayWidget';

export class UniqueLimitedItemWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::UniqueLimitedItemWidget'); }

    private static readonly SUPPLY_REFRESH_PERIOD_MS: number = 20000;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare private _catalog: HabboCatalog;

    declare private _overlay: ILimitedItemOverlay;

    declare private _SafeStr_3628: IPurchasableOffer;

    declare private _SafeStr_3231: Timer;

    declare private _overlayWidget: ILimitedItemSupplyLeftOverlayWidget;

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_3231 != null) {
                this._SafeStr_3231.stop();
                this._SafeStr_3231.removeEventListener("timer", this.onSupplyLeftTimer);
                this._SafeStr_3231 = null;
            }
            this.window.visible = false;
            this._catalog = null;
            this._SafeStr_3628 = null;
            if (this._overlay) {
                this._overlay.dispose();
                this._overlay = null;
            }
            this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProduct);
            this.events.removeEventListener("CWE_PRODUCT_OFFER_UPDATED", this.onOfferUpdated);
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        let _loc1_: IWidgetWindow = castGuarded(this._window.findChildByName("unique_item_overlay_container"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        this._overlayWidget = castGuarded(_loc1_.widget, isILimitedItemSupplyLeftOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemSupplyLeftOverlayWidget");
        this.window.visible = false;
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("CWE_PRODUCT_OFFER_UPDATED", this.onOfferUpdated);
        this._SafeStr_3231 = new Timer(20000);
        this._SafeStr_3231.addEventListener("timer", this.onSupplyLeftTimer);
        return true;
    }

    private update(param1: IPurchasableOffer, param2: boolean = false): void {
        let _loc3_: IProduct = null;
        if (param1.pricingModel == "pricing_model_single" && param1.product.isUniqueLimitedItem) {
            _loc3_ = param1.product;
            this._overlayWidget.supplyLeft = _loc3_.uniqueLimitedItemsLeft;
            this._overlayWidget.seriesSize = _loc3_.uniqueLimitedItemSeriesSize;
            this.window.visible = true;
            if (param2) {
                this._catalog.sendGetProductOffer(param1.offerId);
            }
            this._SafeStr_3231.start();
        } else {
            this.window.visible = false;
            this._SafeStr_3231.stop();
        }
    }

    private onSelectProduct = (param1: SelectProductEvent): void => {
        if (param1 == null) {
            return;
        }
        this._SafeStr_3628 = param1.offer;
        this.update(param1.offer, true);
    };

    private onOfferUpdated = (param1: ProductOfferUpdatedEvent): void => {
        this._SafeStr_3628 = param1.offer;
        this.update(param1.offer);
    };

    private onSupplyLeftTimer = (param1: TimerEvent): void => {
        if (this._window.visible && this._SafeStr_3628 != null) {
            this.update(this._SafeStr_3628, true);
        }
    };
}
