import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class BuilderAddonsCatalogWidget extends CatalogWidget implements ICatalogWidget, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BuilderAddonsCatalogWidget'); }

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
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("addons_list"), isIItemListWindow);
        let _loc2_: IWindow = _loc5_.removeListItemAt(0);
        let _loc6_: number = 0;
        let _loc4_: any = this._catalog.builderSecondsLeft > 0;
        this._window.findChildByName("trial_warning").visible = !_loc4_;
        for (const _loc1_ of this.page.offers ?? []) {
            _loc3_ = asGuarded(_loc2_.clone(), isIWindowContainer);
            _loc3_.findChildByName("item_header").caption = _loc1_.localizationName;
            _loc3_.findChildByName("item_price").caption = _loc1_.priceInCredits.toString();
            _loc3_.findChildByName("item_buy").id = _loc6_;
            if (_loc1_.priceInActivityPoints > 0) {
                _loc3_.findChildByName("diamonds_icon").visible = true;
                _loc3_.findChildByName("diamonds_price").visible = true;
                _loc3_.findChildByName("diamonds_price").caption = _loc1_.priceInActivityPoints.toString();
            }
            if (!_loc4_) {
                castGuarded(_loc3_.findChildByName("item_buy"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").disable();
            }
            _loc6_++;
            _loc5_.addListItem(_loc3_);
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
