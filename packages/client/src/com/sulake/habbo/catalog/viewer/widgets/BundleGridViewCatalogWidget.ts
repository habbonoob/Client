import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';

export class BundleGridViewCatalogWidget extends CatalogWidget implements ICatalogWidget, IItemGrid, IProductContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BundleGridViewCatalogWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    declare private _gridItemLayout: XML;

    declare private _itemGrid: IItemGridWindow;

    declare private _offer: IPurchasableOffer;

    public get offer(): IPurchasableOffer {
        return this._offer;
    }

    public get products(): IProduct[] {
        return null;
    }

    public get firstProduct(): IProduct {
        return null;
    }

    public get view(): IWindowContainer {
        return null;
    }

    public set view(param1: IWindowContainer) {
    }

    public set grid(param1: IItemGrid) {
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        let _loc1_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc1_.content, XML);
        this._itemGrid = castGuarded(this._window.findChildByName("bundleGrid"), isIItemGridWindow, "com.sulake.core.window.components.IItemGridWindow");
        return true;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProduct);
            this.events.removeEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
            super.dispose();
        }
    }

    public select(param1: IGridItem, param2: boolean): void {
    }

    public startDragAndDrop(param1: IGridItem): boolean {
        return false;
    }

    public initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
    }

    public activate(): void {
    }

    public setClubIconLevel(param1: number): void {
    }

    protected populateItemGrid(): void {
        let _loc5_: IWindowContainer = null;
        let _loc1_: IWindow = null;
        let _loc4_: BitmapData = null;
        let _loc2_: IWindowContainer = asGuarded(this._offer.page.viewer.catalog.windowManager.buildFromXML(this._gridItemLayout), isIWindowContainer);
        for (const _loc3_ of this._offer.productContainer.products ?? []) {
            if (_loc3_.productType != "b") {
                _loc5_ = asGuarded(_loc2_.clone(), isIWindowContainer);
                _loc1_ = _loc5_.findChildByName("clubLevelIcon");
                if (_loc1_ != null) {
                    _loc1_.visible = false;
                }
                this._itemGrid.addGridItem(_loc5_);
                _loc3_.view = _loc5_;
                _loc4_ = _loc3_.initIcon(this);
                if (_loc4_ != null) {
                    _loc4_.dispose();
                }
                _loc3_.grid = this;
            }
        }
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        let _loc2_: IPurchasableOffer = null;
        if (this.page.offers.length == 1) {
            _loc2_ = this.page.offers[0];
            if (_loc2_ != null) {
                this.events.dispatchEvent(new SelectProductEvent(_loc2_));
            }
        }
    };

    private onSelectProduct = (param1: SelectProductEvent): void => {
        this._offer = param1.offer;
        this._itemGrid.destroyGridItems();
        this.populateItemGrid();
    };

    get [IProductContainer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
