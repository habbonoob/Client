import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class BuilderLoyaltyCatalogWidget extends CatalogWidget implements ICatalogWidget, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BuilderLoyaltyCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare private _catalog: HabboCatalog;

    public override init(): boolean {
        let _loc3_: IWindowContainer = null;
        if (!super.init()) {
            return false;
        }
        this._window.procedure = this.windowProcedure;
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("loyalty_list"), isIItemListWindow);
        let _loc2_: IWindow = _loc4_.removeListItemAt(0);
        let _loc5_: number = 0;
        for (const _loc1_ of this.page.offers ?? []) {
            _loc3_ = asGuarded(_loc2_.clone(), isIWindowContainer);
            _loc3_.findChildByName("item_header").caption = _loc1_.localizationName;
            this._catalog.utils.showPriceInContainer(asGuarded(_loc3_.findChildByName("item_cost_box"), isIWindowContainer), _loc1_);
            _loc3_.findChildByName("item_buy").id = _loc5_;
            _loc5_++;
            _loc4_.addListItem(_loc3_);
        }
        return true;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "item_buy") {
            this._catalog.showPurchaseConfirmation(this.page.offers[param2.id], this.page.pageId);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
