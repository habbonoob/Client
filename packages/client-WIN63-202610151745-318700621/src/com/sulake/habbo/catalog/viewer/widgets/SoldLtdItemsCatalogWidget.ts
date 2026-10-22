import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetToggleEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetToggleEvent';

export class SoldLtdItemsCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SoldLtdItemsCatalogWidget'); }

    declare private _catalog: HabboCatalog;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("SELECT_PRODUCT", this.onPreviewProduct);
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("soldLtdItemsWidget");
        this.window.visible = false;
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        return true;
    }

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        let _loc4_: ICatalogNavigator = null;
        let _loc3_: any = undefined;
        if (param1 == null || param1.offer == null || param1.offer.product == null) {
            return;
        }
        if (this.page.mode == 1) {
            _loc4_ = this._catalog.getCatalogNavigator(this.page.viewer.catalogType);
            _loc3_ = _loc4_ == null ? null : _loc4_.getNodesByOfferId(param1.offer.offerId);
            if (!_loc3_) {
                _loc3_ = new Array<ICatalogNode>(0).fill(null);
            }
            for (const _loc2_ of valuesOf(_loc3_)) {
                if (_loc2_.pageName.indexOf("limited_sold") > -1) {
                    this.window.visible = true;
                    this.events.dispatchEvent(new CatalogWidgetToggleEvent("purchaseWidget", false));
                    return;
                }
            }
        }
        if (this.page.layoutCode == "sold_ltd_items") {
            this.window.visible = true;
            this.events.dispatchEvent(new CatalogWidgetToggleEvent("purchaseWidget", false));
            return;
        }
        if (param1.offer.product.isUniqueLimitedItem && param1.offer.product.uniqueLimitedItemsLeft == 0) {
            this.window.visible = true;
            this.events.dispatchEvent(new CatalogWidgetToggleEvent("purchaseWidget", false));
        } else {
            this.window.visible = false;
            this.events.dispatchEvent(new CatalogWidgetToggleEvent("purchaseWidget", true));
        }
    };
}
