import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { ColourGridCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ColourGridCatalogWidget';
import { CatalogWidgetColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColoursEvent';
import { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import { _SafeCls_6114 } from '@/com/sulake/habbo/room/object/data/_SafeCls_6114';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';

export class RecolorableFurnitureCatalogWidget extends CatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RecolorableFurnitureCatalogWidget'); }

    public static readonly PAGE_LAYOUT: string = "recolorable_furniture";
    private _colors: any[] = [];

    declare private _palette: ColourGridCatalogWidget;

    declare private _paletteEvents: EventDispatcher;

    declare private _offer: IPurchasableOffer;

    private _color: number = 16777215;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public static createStuffData(param1: string): MapStuffData {
        let _loc2_: any[] = param1.split(",");
        let _loc3_: UtilsMap = new UtilsMap();
        _loc3_.add("state", "0");
        _loc3_.add("r", _loc2_[0]);
        _loc3_.add("g", _loc2_[1]);
        _loc3_.add("b", _loc2_[2]);
        return new MapStuffData(_loc3_);
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._paletteEvents = new EventDispatcher();
        this._palette = new ColourGridCatalogWidget(this.paletteContainer);
        this._palette.page = this.page;
        this._palette.events = this._paletteEvents;
        this._palette.init();
        this._paletteEvents.addEventListener("COLOUR_INDEX", this.onPaletteColor);
        this.events.addEventListener("SELECT_PRODUCT", this.onOfferSelected);
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        return true;
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        if (this.page.offers.length > 0) {
            this.page.selectOffer(this.page.offers[0].offerId);
        }
    };

    private onPaletteColor = (param1: CatalogWidgetColourIndexEvent): void => {
        this.applyColor(this._colors[param1.index] >>> 0);
    };

    private onOfferSelected = (param1: SelectProductEvent): void => {
        this._offer = param1.offer;
        let _loc2_: IProduct = this._offer.product;
        this._colors = _loc2_ != null && _loc2_.furnitureData != null ? _SafeCls_6114.getColors((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).context.configuration, _loc2_.furnitureData.className) : [];
        this._paletteEvents.dispatchEvent(new CatalogWidgetColoursEvent(this._colors, "ctlg_clr_27x22_1", "ctlg_clr_27x22_2", "ctlg_clr_27x22_3"));
        if (this._colors.length == 0) {
            this.events.dispatchEvent(new SetRoomPreviewerStuffDataEvent(null));
            return;
        }
        this.applyColor(Number(this._colors.indexOf(this._color) >= 0 ? this._color : this._colors[0]) >>> 0);
    };

    private applyColor(param1: number): void {
        let _loc6_: number = 0;
        let _loc4_: IWindowContainer = null;
        let _loc5_: IProduct = null;
        let _loc8_: any[] = null;
        let _loc3_: any = 0;
        this._color = param1;
        _loc6_ = 0;
        while (_loc6_ < this.paletteGrid.numGridItems) {
            _loc4_ = asGuarded(this.paletteGrid.getGridItemAt(_loc6_ >>> 0), isIWindowContainer);
            _loc4_.findChildByName("chosen").visible = this._colors[_loc6_] == param1;
            _loc6_++;
        }
        let _loc7_: string = [this._color >> 16 & 0xFF, this._color >> 8 & 0xFF, this._color & 0xFF].join(",");
        for (const _loc2_ of this.page.offers ?? []) {
            _loc5_ = _loc2_.product;
            if (!(_loc5_ == null || _loc5_.furnitureData == null)) {
                _loc8_ = _SafeCls_6114.getColors((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).context.configuration, _loc5_.furnitureData.className);
                if (_loc8_.length > 0) {
                    _loc3_ = Number(_loc8_.indexOf(this._color) >= 0 ? this._color : _loc8_[0]) >>> 0;
                    _loc5_.extraParam = [_loc3_ >> 16 & 0xFF, _loc3_ >> 8 & 0xFF, _loc3_ & 0xFF].join(",");
                }
            }
        }
        this.events.dispatchEvent(new SetRoomPreviewerStuffDataEvent(RecolorableFurnitureCatalogWidget.createStuffData(_loc7_)));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.events.removeEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this._paletteEvents.removeEventListener("COLOUR_INDEX", this.onPaletteColor);
        this._palette.dispose();
        this._palette = null;
        this._paletteEvents = null;
        this.events.removeEventListener("SELECT_PRODUCT", this.onOfferSelected);
        this._offer = null;
        this._colors = null;
        super.dispose();
    }

    private get paletteContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("palette"), isIWindowContainer);
    }

    private get paletteGrid(): IItemGridWindow {
        return asGuarded(this.paletteContainer.findChildByName("colourGrid"), isIItemGridWindow);
    }
}
