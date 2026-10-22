import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { FrontPageItem } from '@/com/sulake/habbo/communication/messages/incoming/catalog/FrontPageItem';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class FeaturedItemsCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::FeaturedItemsCatalogWidget'); }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_3484: IItemListWindow;

    declare private _template: IWindowContainer;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._catalog = null;
            this._SafeStr_3484.dispose();
            this._SafeStr_3484 = null;
            this._template.dispose();
            this._template = null;
            super.dispose();
        }
    }

    public override init(): boolean {
        let _loc2_: number = 0;
        if (!super.init()) {
            return false;
        }
        this._SafeStr_3484 = asGuarded(this.window.findChildByName("itemlist_featured"), isIItemListWindow);
        this._template = asGuarded(this._SafeStr_3484.getListItemByName("featured_item_template"), isIWindowContainer);
        this._SafeStr_3484.removeListItems();
        if (this._catalog.frontPageItems == null || this._catalog.frontPageItems.length == 0) {
            return true;
        }
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("firstitem"), isIWindowContainer);
        this.populateItem(this._catalog.frontPageItems[0], _loc1_);
        _loc2_ = 1;
        while (_loc2_ < Math.min(4, this._catalog.frontPageItems.length)) {
            this._SafeStr_3484.addListItem(this.createItemFromTemplate(this._catalog.frontPageItems[_loc2_]));
            _loc2_++;
        }
        return true;
    }

    private createItemFromTemplate(param1: FrontPageItem): IWindowContainer {
        return this.populateItem(param1, asGuarded(this._template.clone(), isIWindowContainer));
    }

    private populateItem(param1: FrontPageItem, param2: IWindowContainer): IWindowContainer {
        let _loc3_: string = null;
        let _loc4_: IStaticBitmapWrapperWindow = null;
        let _loc5_: ITextWindow = asGuarded(param2.findChildByName("item_title"), isITextWindow);
        _loc5_.text = param1.itemName;
        if (param1.itemPromoImage != null && param1.itemPromoImage != "") {
            _loc3_ = this._catalog.context.configuration.getProperty("image.library.url");
            _loc4_ = asGuarded(param2.findChildByName("item_image"), isIStaticBitmapWrapperWindow);
            _loc4_.assetUri = _loc3_ + param1.itemPromoImage;
        }
        let _loc6_: IWindow = param2.getChildByName("event_catcher_region");
        if (_loc6_ != null) {
            _loc6_.procedure = this.eventProc;
        }
        return param2;
    }

    private eventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: number = 0;
        let _loc3_: FrontPageItem = null;
        if (param1.type == "WME_DOWN") {
            _loc4_ = this._SafeStr_3484.getListItemIndex(param2.parent);
            _loc4_ = _loc4_ < 0 ? 0 : _loc4_ + 1;
            _loc3_ = this._catalog.frontPageItems[_loc4_];
            switch (_loc3_.type) {
                case 0:
                    if (_loc3_.cataloguePageLocation == "room_bundles_mobile") {
                        return this._catalog.openCatalogPage("room_bundles", "NORMAL");
                    }
                    if (_loc3_.cataloguePageLocation == "mobile_subscriptions") {
                        return this._catalog.openCatalogPage("hc_membership", "NORMAL");
                    }
                    this._catalog.openCatalogPage(_loc3_.cataloguePageLocation, "NORMAL");
                    break;
                case 1:
                    this._catalog.openCatalogPageByOfferId(_loc3_.productOfferID, "NORMAL");
            }
        }
    };
}
