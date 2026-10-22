import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class TotalPriceWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::TotalPriceWidget'); }

    private static readonly ELEMENT_TOTAL_PRICE_CONTAINER: string = "totalprice_container";
    private static readonly ELEMENT_PLUS: string = "plus";
    private static readonly _SafeStr_8196: string = "amount_text_left";
    private static readonly ELEMENT_AMOUNT_TEXT_RIGHT: string = "amount_text_right";
    private static readonly _SafeStr_8218: string = "total_left";
    private static readonly ELEMENT_TOTAL_RIGHT: string = "total_right";
    private static readonly _SafeStr_7803: string = "currency_indicator_bitmap_left";
    private static readonly ELEMENT_CURRENCY_INDICATOR_BITMAP_RIGHT: string = "currency_indicator_bitmap_right";

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_5159: number;
    static { (this.prototype as any)._SafeStr_5159 = 0; }

    declare private _SafeStr_4465: number;
    static { (this.prototype as any)._SafeStr_4465 = 0; }

    declare private _SafeStr_3611: number;
    static { (this.prototype as any)._SafeStr_3611 = 0; }

    declare private _SafeStr_6680: number;
    static { (this.prototype as any)._SafeStr_6680 = 0; }

    declare private _SafeStr_3416: IWindow;

    declare private _SafeStr_3383: IWindow;

    declare private _SafeStr_2623: IWindowContainer;

    declare private _SafeStr_2387: IWindowContainer;

    private _quantity: number = 1;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._catalog = null;
            this.events.removeEventListener("CWSE_VALUE_CHANGED", this.onSpinnerValueChangedEvent);
            this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProductEvent);
            this.clear();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this.page.isBuilderPage) {
            this.window.visible = false;
            return true;
        }
        this.attachWidgetView("totalPriceWidget");
        this.window.visible = false;
        if (!this._catalog.multiplePurchaseEnabled) {
            return true;
        }
        this.events.addEventListener("CWSE_VALUE_CHANGED", this.onSpinnerValueChangedEvent);
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProductEvent);
        this.events.dispatchEvent(new Event("TOTAL_PRICE_WIDGET_INITIALIZED"));
        return true;
    }

    private onSpinnerValueChangedEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        this._quantity = param1.value;
        this.updateCurrencyIndicators();
    };

    private onSelectProductEvent = (param1: SelectProductEvent): void => {
        this.window.visible = param1.offer.bundlePurchaseAllowed;
        this._SafeStr_5159 = param1.offer.priceInCredits;
        this._SafeStr_4465 = param1.offer.priceInActivityPoints;
        this._SafeStr_3611 = param1.offer.priceInSilver;
        this._SafeStr_6680 = param1.offer.activityPointType;
        this._quantity = 1;
        this.clear();
        this.createCurrencyIndicators();
        this.updateCurrencyIndicators();
    };

    private clear(): void {
        this._SafeStr_3416 = null;
        this._SafeStr_3383 = null;
        this._SafeStr_2623 = null;
        this._SafeStr_2387 = null;
        this._window.findChildByName("plus").visible = false;
        this._window.findChildByName("amount_text_left").visible = false;
        if (this._window.findChildByName("total_left")) {
            this._window.findChildByName("total_left").visible = false;
        }
        if (this._window.findChildByName("total_right")) {
            this._window.findChildByName("total_right").visible = false;
        }
        this._window.findChildByName("currency_indicator_bitmap_left").visible = false;
    }

    private updateCurrencyIndicators(): void {
        let _loc4_: IWindow = null;
        let _loc8_: IWindow = null;
        _loc8_ = null;
        let _loc3_: number = this._quantity * this._SafeStr_5159;
        let _loc7_: number = this._quantity * this._SafeStr_4465;
        let _loc6_: number = this._quantity * this._SafeStr_3611;
        let _loc1_: number = _loc3_;
        let _loc2_: number = _loc7_;
        let _loc5_: number = _loc6_;
        if (this._catalog.bundleDiscountEnabled) {
            _loc1_ = this._catalog.utils.calculateBundlePrice(true, this._SafeStr_5159, this._quantity);
            _loc2_ = this._catalog.utils.calculateBundlePrice(true, this._SafeStr_4465, this._quantity);
            _loc5_ = this._catalog.utils.calculateBundlePrice(true, this._SafeStr_3611, this._quantity);
        }
        if (this._SafeStr_3416 != null) {
            this._SafeStr_3416.caption = this._catalog.bundleDiscountEnabled ? _loc1_.toString() : _loc3_.toString();
        }
        if (this._SafeStr_3383 != null) {
            if (this._SafeStr_3611 > 0) {
                this._SafeStr_3383.caption = this._catalog.bundleDiscountEnabled ? _loc5_.toString() : _loc6_.toString();
            } else {
                this._SafeStr_3383.caption = this._catalog.bundleDiscountEnabled ? _loc2_.toString() : _loc7_.toString();
            }
        }
        if (this._SafeStr_2623) {
            this._SafeStr_2623.visible = _loc3_ != _loc1_;
            _loc4_ = this._SafeStr_2623.findChildByName("text");
            _loc4_.caption = this._SafeStr_2623.visible ? _loc3_.toString() : "0";
            this._SafeStr_2623.findChildByName("strike").width = _loc4_.width;
        }
        if (this._SafeStr_2387) {
            if (this._SafeStr_3611 > 0) {
                this._SafeStr_2387.visible = _loc6_ != _loc5_;
                _loc8_ = this._SafeStr_2387.findChildByName("text");
                _loc8_.caption = this._SafeStr_2387.visible ? _loc6_.toString() : "0";
                this._SafeStr_2387.findChildByName("strike").width = _loc8_.width;
            } else {
                this._SafeStr_2387.visible = _loc7_ != _loc2_;
                _loc8_ = this._SafeStr_2387.findChildByName("text");
                _loc8_.caption = this._SafeStr_2387.visible ? _loc7_.toString() : "0";
                this._SafeStr_2387.findChildByName("strike").width = _loc8_.width;
            }
        }
    }

    private createCurrencyIndicators(): void {
        let _loc2_: IWindow = null;
        let _loc3_: IWindow = null;
        let _loc1_: IWindow = null;
        if (this._SafeStr_5159 > 0) {
            if (this._SafeStr_4465 > 0 || this._SafeStr_3611 > 0) {
                this._SafeStr_3416 = this._window.findChildByName("amount_text_left");
                this._SafeStr_3416.visible = true;
                this._SafeStr_2623 = asGuarded(this._window.findChildByName("total_left"), isIWindowContainer);
                if (this._SafeStr_2623) {
                    this._SafeStr_2623.visible = false;
                }
                _loc2_ = this._window.findChildByName("currency_indicator_bitmap_left");
                _loc2_.visible = true;
                this._window.findChildByName("plus").visible = true;
            } else {
                this._SafeStr_3416 = this._window.findChildByName("amount_text_right");
                this._SafeStr_2623 = asGuarded(this._window.findChildByName("total_right"), isIWindowContainer);
                if (this._SafeStr_2623) {
                    this._SafeStr_2623.visible = false;
                }
                _loc2_ = this._window.findChildByName("currency_indicator_bitmap_right");
            }
            if (this.page.acceptSeasonCurrencyAsCredits) {
                _loc2_.style = ActivityPointTypeEnum.getIconStyleFor(this._catalog.getSeasonalCurrencyActivityPointType(), this._catalog, true, true) >>> 0;
                _loc2_.width = 53;
            } else {
                _loc2_.style = ActivityPointTypeEnum.getIconStyleFor(-1, this._catalog, true) >>> 0;
                _loc2_.width = 22;
            }
        }
        if (this._SafeStr_4465 > 0) {
            this._SafeStr_3383 = castGuarded(this._window.findChildByName("amount_text_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            this._SafeStr_2387 = asGuarded(this._window.findChildByName("total_left"), isIWindowContainer);
            if (this._SafeStr_2387) {
                this._SafeStr_2387.visible = false;
            }
            _loc3_ = this._window.findChildByName("currency_indicator_bitmap_right");
            _loc3_.style = ActivityPointTypeEnum.getIconStyleFor(this._SafeStr_6680, this._catalog, true) >>> 0;
        } else if (this._SafeStr_3611 > 0) {
            this._SafeStr_3383 = castGuarded(this._window.findChildByName("amount_text_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            this._SafeStr_2387 = asGuarded(this._window.findChildByName("total_left"), isIWindowContainer);
            if (this._SafeStr_2387) {
                this._SafeStr_2387.visible = false;
            }
            _loc1_ = this._window.findChildByName("currency_indicator_bitmap_right");
            _loc1_.style = ActivityPointTypeEnum.getIconStyleFor(1000, this._catalog, true) >>> 0;
        }
        castGuarded(this._window.findChildByName("totalprice_container"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
    }
}
