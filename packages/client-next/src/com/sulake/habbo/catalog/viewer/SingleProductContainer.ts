import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';

export class SingleProductContainer extends ProductContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::SingleProductContainer'); }

    constructor(param1: IPurchasableOffer, param2: IProduct[], param3: HabboCatalog) {
        super(param1, param2, param3);
    }

    public override initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
        let _loc3_: IProduct = this.firstProduct;
        let _loc4_: BitmapData = _loc3_.initIcon(this, this, this, asGuarded(this.offer, isIPurchasableOffer), this.targetIcon, param2, this.onPreviewImageReady);
        this.setIconImage(_loc4_, true);
    }

    public enableLimitedItemLayout(): void {
        this._view.findChildByName("unique_item_background_bitmap").visible = true;
        let _loc1_: IWidgetWindow = castGuarded(this._view.findChildByName("unique_item_overlay_container"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: ILimitedItemGridOverlayWidget = castGuarded(_loc1_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
        _loc1_.visible = true;
        _loc2_.serialNumber = this.firstProduct.uniqueLimitedItemSeriesSize;
        _loc2_.animated = true;
        if (this.firstProduct.uniqueLimitedItemsLeft == 0) {
            this._view.findChildByName("unique_item_sold_out_bitmap").visible = true;
        } else {
            this._view.findChildByName("unique_item_sold_out_bitmap").visible = false;
        }
    }

    private onPreviewImageReady = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = null;
        if (!this.disposed && this.offer.page.viewer.catalog != null) {
            _loc2_ = asInstanceOf(param1.target, AssetLoaderStruct);
            if (_loc2_ != null) {
                this.catalog.setImageFromAsset(this.targetIcon, _loc2_.assetName, null);
            }
        }
    };

    public override set view(param1: IWindowContainer) {
        super.view = param1;
        if (this.offer.product.isUniqueLimitedItem) {
            (asInstanceOf(this.offer.productContainer, SingleProductContainer)).enableLimitedItemLayout();
        }
    }

    protected override get useWideView(): boolean {
        return this.offer.isSingleChatStyle;
    }

    public override get view(): IWindowContainer {
        return super.view;
    }
}
