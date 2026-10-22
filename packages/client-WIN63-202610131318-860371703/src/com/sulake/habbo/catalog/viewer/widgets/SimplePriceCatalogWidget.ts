import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class SimplePriceCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SimplePriceCatalogWidget'); }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        return true;
    }

    private onSelectProduct = (param1: SelectProductEvent): void => {
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(param1.offer, isIWindowContainer(this._window) ? this._window : null, this._SafeStr_2857, this._window.findChildByName("fake_productimage"), 0, true, 0);
    };
}
