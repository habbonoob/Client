import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class SpecialInfoWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SpecialInfoWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("specialInfoWidget");
        this._window.findChildByName("ctlg_special_txt").caption = "";
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        return true;
    }

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        if (param1 == null) {
            return;
        }
        this._window.visible = false;
    };
}
