import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { Logger } from '@/com/sulake/habbo/Logger';

export class BundleProductContainer extends ProductContainer implements IItemGrid {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::BundleProductContainer'); }

    declare private _SafeStr_3971: BitmapData;

    constructor(param1: IPurchasableOffer, param2: IProduct[], param3: HabboCatalog) {
        super(param1, param2, param3);
        let _loc4_: BitmapDataAsset = asInstanceOf(param3.assets.getAssetByName("ctlg_pic_deal_icon_narrow"), BitmapDataAsset);
        if (_loc4_ != null) {
            this._SafeStr_3971 = asInstanceOf(_loc4_.content, BitmapData);
        } else {
            this._SafeStr_3971 = new BitmapData(1, 1, true, 16777215);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_3971 = null;
        super.dispose();
    }

    public override initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
        this.setIconImage(this._SafeStr_3971.clone(), true);
    }

    public populateItemGrid(param1: IItemGridWindow, param2: XML): void {
        let _loc7_: IWindowContainer = null;
        let _loc3_: IWindow = null;
        let _loc6_: BitmapData = null;
        let _loc4_: IWindowContainer = asGuarded(this.catalog.windowManager.buildFromXML(param2), isIWindowContainer);
        for (const _loc5_ of this.offer.productContainer.products ?? []) {
            if (_loc5_.productType != "b") {
                _loc7_ = asGuarded(_loc4_.clone(), isIWindowContainer);
                _loc3_ = _loc7_.findChildByName("clubLevelIcon");
                if (_loc3_ != null) {
                    _loc3_.visible = false;
                }
                param1.addGridItem(_loc7_);
                _loc5_.view = _loc7_;
                _loc6_ = _loc5_.initIcon(this);
                if (_loc6_ != null) {
                    _loc6_.dispose();
                }
                _loc5_.grid = this;
            }
        }
    }

    public setBundleCounter(param1: number): void {
        let _loc2_: IWindow = asGuarded(this._view.findChildByName("bundleCounter"), isITextWindow);
        if (_loc2_ != null) {
            _loc2_.caption = param1.toString();
        }
    }

    public select(param1: IGridItem, param2: boolean): void {
        Logger.log("Product Bundle, select item: " + param1);
    }

    public startDragAndDrop(param1: IGridItem): boolean {
        return false;
    }

    public override set view(param1: IWindowContainer) {
        super.view = param1;
        this.setBundleCounter(999);
    }

    public override get view(): IWindowContainer {
        return super.view;
    }
}
