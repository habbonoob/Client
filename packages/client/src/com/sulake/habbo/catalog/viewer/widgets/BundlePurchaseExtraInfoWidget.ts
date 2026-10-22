import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { CatalogWidgetBundleDisplayExtraInfoEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBundleDisplayExtraInfoEvent';
import type { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { ExtraInfoViewManager } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoViewManager';
import { UpdateableExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/UpdateableExtraInfoListItem';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class BundlePurchaseExtraInfoWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BundlePurchaseExtraInfoWidget'); }

    private static readonly PROMO_ITEM_DROP_DELAY_MS: number = 4000;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2705: ExtraInfoViewManager;

    private _SafeStr_4494: number = 1;

    declare private _SafeStr_5159: number;
    static { (this.prototype as any)._SafeStr_5159 = 0; }

    declare private _SafeStr_4465: number;
    static { (this.prototype as any)._SafeStr_4465 = 0; }

    declare private _SafeStr_6680: number;
    static { (this.prototype as any)._SafeStr_6680 = 0; }

    declare private _itemBadgeCode: string;

    private _SafeStr_3115: number = -1;
    private _SafeStr_2996: number = -1;
    private _SafeStr_3678: number = -1;
    private _SafeStr_4885: boolean = false;

    declare private _SafeStr_3726: Timer;

    public override dispose(): void {
        if (!this.disposed) {
            this._SafeStr_2705.dispose();
            this._SafeStr_2705 = null;
            this._catalog = null;
            this._SafeStr_3726.stop();
            this._SafeStr_3726.removeEventListener("timerComplete", this.onPromoItemDropDownTimerEvent);
            this._SafeStr_3726 = null;
            this.events.removeEventListener("CWPPEIE_RESET", this.onResetEvent);
            this.events.removeEventListener("CWPPEIE_HIDE", this.onHideEvent);
            this.events.removeEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
            this.events.removeEventListener("CWPPEIE_ITEM_CLICKED", this.onExtraInfoItemClickedEvent);
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!this._catalog.multiplePurchaseEnabled) {
            return true;
        }
        this._SafeStr_2705 = new ExtraInfoViewManager(this, this._catalog);
        this.events.addEventListener("CWPPEIE_RESET", this.onResetEvent);
        this.events.addEventListener("CWPPEIE_HIDE", this.onHideEvent);
        this.events.addEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
        this.events.addEventListener("CWPPEIE_ITEM_CLICKED", this.onExtraInfoItemClickedEvent);
        this._SafeStr_3726 = new Timer(4000, 1);
        this._SafeStr_3726.addEventListener("timerComplete", this.onPromoItemDropDownTimerEvent);
        return true;
    }

    private createPromoItem(): void {
        let _loc1_: ExtraInfoItemData = new ExtraInfoItemData(0);
        _loc1_.quantity = this._SafeStr_4494;
        this._SafeStr_3115 = this._SafeStr_2705.addItem(_loc1_);
    }

    private updatePromoItem(param1: number): void {
        let _loc3_: UpdateableExtraInfoListItem = null;
        let _loc2_: ExtraInfoItemData = null;
        if (this._SafeStr_3115 != -1) {
            _loc3_ = castTo(this._SafeStr_2705.getItem(this._SafeStr_3115), UpdateableExtraInfoListItem);
            _loc2_ = _loc3_.data;
            _loc2_.quantity = param1;
            _loc3_.update(_loc2_);
        }
    }

    private removePromoItem(): void {
        if (this._SafeStr_3115 != -1) {
            this._SafeStr_2705.removeItem(this._SafeStr_3115);
            this._SafeStr_3115 = -1;
        }
    }

    private createDiscountValueItem(): void {
        let _loc1_: ExtraInfoItemData = new ExtraInfoItemData(2);
        _loc1_.quantity = this._SafeStr_4494;
        _loc1_.priceActivityPoints = this._SafeStr_4465;
        _loc1_.activityPointType = this._SafeStr_6680;
        _loc1_.priceCredits = this._SafeStr_5159;
        this._SafeStr_2996 = this._SafeStr_2705.addItem(_loc1_);
        this._catalog.utils.discountShownEventTrack();
    }

    private updateDiscountValueItem(param1: number): void {
        let _loc2_: UpdateableExtraInfoListItem = null;
        let _loc3_: ExtraInfoItemData = null;
        if (this._SafeStr_2996 != -1) {
            _loc2_ = castTo(this._SafeStr_2705.getItem(this._SafeStr_2996), UpdateableExtraInfoListItem);
            _loc3_ = _loc2_.data;
            _loc3_.quantity = param1;
            _loc3_.discountPriceCredits = this._catalog.utils.calculateBundlePrice(true, this._SafeStr_5159, param1);
            _loc3_.discountPriceActivityPoints = this._catalog.utils.calculateBundlePrice(true, this._SafeStr_4465, param1);
            _loc2_.update(_loc3_);
        }
    }

    private removeDiscountValueItem(): void {
        if (this._SafeStr_2996 != -1) {
            this._SafeStr_2705.removeItem(this._SafeStr_2996);
            this._SafeStr_2996 = -1;
        }
    }

    private createBundleInfoItem(): void {
        let _loc1_: ExtraInfoItemData = new ExtraInfoItemData(1);
        this._SafeStr_3678 = this._SafeStr_2705.addItem(_loc1_);
        this._catalog.utils.bundlesInfoShownEventTrack();
    }

    private removeBundleInfoItem(): void {
        if (this._SafeStr_3678 != -1) {
            this._SafeStr_2705.removeItem(this._SafeStr_3678);
            this._SafeStr_3678 = -1;
        }
    }

    private onResetEvent = (param1: CatalogWidgetBundleDisplayExtraInfoEvent): void => {
        if (this.disposed) {
            return;
        }
        this.window.visible = true;
        this._SafeStr_5159 = param1.data.priceCredits;
        this._SafeStr_4465 = param1.data.priceActivityPoints;
        this._SafeStr_6680 = param1.data.activityPointType;
        this._itemBadgeCode = param1.data.badgeCode;
        this._SafeStr_2705.clear();
        this._SafeStr_2996 = -1;
        this._SafeStr_3115 = -1;
        this._SafeStr_3726.start();
    };

    private onSpinnerEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        if (this.disposed) {
            return;
        }
        if (!this._catalog.bundleDiscountEnabled) {
            return;
        }
        if (param1.type == "CWSE_VALUE_CHANGED") {
            if (param1.value != this._SafeStr_4494) {
                if (param1.value >= this._catalog.bundleDiscountRuleset.bundleSize && this._SafeStr_2996 == -1) {
                    this.createDiscountValueItem();
                } else if (param1.value < this._catalog.bundleDiscountRuleset.bundleSize) {
                    this.removeDiscountValueItem();
                }
                this.updatePromoItem(param1.value);
                this.updateDiscountValueItem(param1.value);
                this._SafeStr_4494 = param1.value;
                this.removeBundleInfoItem();
                if (this._SafeStr_4494 >= this._catalog.utils.bundleDiscountHighestFlatPriceStep) {
                    this.removePromoItem();
                    this._SafeStr_4885 = true;
                } else if (this._SafeStr_4885) {
                    this.createPromoItem();
                    this._SafeStr_4885 = false;
                }
                this._catalog.utils.spinnerValueChangedEventTrack();
            }
        }
    };

    private onHideEvent = (param1: CatalogWidgetBundleDisplayExtraInfoEvent): void => {
        this.window.visible = false;
    };

    private onExtraInfoItemClickedEvent = (param1: CatalogWidgetBundleDisplayExtraInfoEvent): void => {
        switch (param1.id) {
            case this._SafeStr_3115:
                if (this._SafeStr_3678 == -1) {
                    this.createBundleInfoItem();
                }
                break;
            case this._SafeStr_3678:
                this.removeBundleInfoItem();
        }
    };

    private onPromoItemDropDownTimerEvent = (param1: TimerEvent): void => {
        this.createPromoItem();
    };
}
