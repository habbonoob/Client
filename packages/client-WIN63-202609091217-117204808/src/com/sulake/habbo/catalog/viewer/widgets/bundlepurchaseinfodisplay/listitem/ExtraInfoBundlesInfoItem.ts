import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoListItem';
import { CatalogWidgetBundleDisplayExtraInfoEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBundleDisplayExtraInfoEvent';

export class ExtraInfoBundlesInfoItem extends ExtraInfoListItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay.listitem::ExtraInfoBundlesInfoItem'); }

    declare private _catalog: HabboCatalog;

    declare private _window: IWindowContainer;

    declare private _widget: BundlePurchaseExtraInfoWidget;

    constructor(param1: BundlePurchaseExtraInfoWidget, param2: number, param3: ExtraInfoItemData, param4: HabboCatalog) {
        super(param1, param2, param3, 2, true);
        this._catalog = param4;
        this._widget = param1;
    }

    public override getRenderedWindow(): IWindowContainer {
        if (this._window == null) {
            this.createWindow();
        }
        return this._window;
    }

    private createWindow(): void {
        this._window = castGuarded(this._catalog.utils.createWindow("bundlesInfoItem"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.windowProcedure;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._widget.events.dispatchEvent(new CatalogWidgetBundleDisplayExtraInfoEvent("CWPPEIE_ITEM_CLICKED", this.data, this.id));
        }
    };
}
