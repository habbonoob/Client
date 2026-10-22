import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class AddOnBadgeViewCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::AddOnBadgeViewCatalogWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("SELECT_PRODUCT", this.onSelectProduct);
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("addOnBadgeViewWidget");
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        return true;
    }

    private onSelectProduct = (param1: SelectProductEvent): void => {
        let _loc2_: IBadgeImageWidget = null;
        if (!this.disposed && param1.offer.badgeCode) {
            _loc2_ = asGuarded(castGuarded(this._window.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
            if (_loc2_ != null) {
                _loc2_.badgeId = param1.offer.badgeCode;
            }
        }
    };
}
