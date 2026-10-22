import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { ProductViewCatalogWidget } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';

export class SingleViewCatalogWidget extends ProductViewCatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SingleViewCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1, param2);
    }

    public override dispose(): void {
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        return true;
    }

    public onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        if (this.page.offers.length == 0) {
            return;
        }
        let _loc2_: IPurchasableOffer = this.page.offers[0];
        this.events.dispatchEvent(new SelectProductEvent(_loc2_));
    };
}
