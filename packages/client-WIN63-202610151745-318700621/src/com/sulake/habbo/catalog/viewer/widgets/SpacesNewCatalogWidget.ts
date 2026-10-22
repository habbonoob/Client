import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { ItemGridCatalogWidget } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { CatalogWidgetUpdateRoomPreviewEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetUpdateRoomPreviewEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { Logger } from '@/com/sulake/habbo/Logger';

export class SpacesNewCatalogWidget extends ItemGridCatalogWidget implements IDisposable, ICatalogWidget, IItemGrid {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::SpacesNewCatalogWidget'); }

    private _groupNames: any[] = ["wallpaper", "floor", "landscape"];
    private _SafeStr_2334: any[] = [];
    private _selectedGroup: number = 0;
    private _SafeStr_3795: any[] = [0, 0, 0];

    declare private _tabs: ISelectorWindow;

    private _categories: any[] = ["group.walls", "group.floors", "group.views"];

    constructor(param1: IWindowContainer, param2: ISessionDataManager, param3: string) {
        super(param1, param2, param3);
    }

    public override dispose(): void {
        let _loc1_: any;
        super.dispose();
        for (const _loc2_ of this._SafeStr_2334 ?? []) {
            for (_loc1_ of valuesOf(_loc2_)) {
                _loc1_.dispose();
            }
        }
        this._SafeStr_2334 = null;
    }

    public override init(): boolean {
        let _loc2_: number = 0;
        let _loc1_: IWindow = null;
        Logger.log("Init Item Group Catalog Widget (Spaces New)");
        this.createOfferGroups();
        if (!super.init()) {
            return false;
        }
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this._tabs = asGuarded(this._window.findChildByName("groups"), isISelectorWindow);
        if (this._tabs) {
            _loc2_ = 0;
            while (_loc2_ < this._tabs.numSelectables) {
                _loc1_ = this._tabs.getSelectableAt(_loc2_);
                if (isISelectableWindow(_loc1_)) {
                    _loc1_.addEventListener("WE_SELECTED", this.onSelectGroup);
                }
                _loc2_++;
            }
        }
        this.switchCategory(stringOrNull(this._categories[this._selectedGroup]));
        this.updateRoomPreview();
        return true;
    }

    public onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        let _loc3_: number = this._SafeStr_3795[this._selectedGroup] | 0;
        let _loc2_: IPurchasableOffer = this._SafeStr_2334[this._selectedGroup][_loc3_];
        this.select(_loc2_.gridItem, false);
    };

    public selectIndex(param1: number): void {
        let _loc2_: IPurchasableOffer = null;
        if (param1 > -1 && param1 < this._itemGrid.numGridItems) {
            _loc2_ = this._SafeStr_2334[this._selectedGroup][param1];
            this.select(_loc2_.gridItem, false);
        }
    }

    public override select(param1: IGridItem, param2: boolean): void {
        if (param1 == null) {
            return;
        }
        super.select(param1, false);
        let _loc3_: IPurchasableOffer = (param1 instanceof ProductContainer ? param1 : null).offer;
        if (_loc3_ == null) {
            return;
        }
        this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(_loc3_.product.extraParam));
        this._SafeStr_3795[this._selectedGroup] = (asGuarded(this._SafeStr_2334[this._selectedGroup], Array.isArray)).indexOf(_loc3_);
        this.updateRoomPreview();
    }

    private updateRoomPreview(): void {
        let _loc5_: number = this._SafeStr_3795[0] | 0;
        let _loc6_: number = this._SafeStr_3795[1] | 0;
        let _loc3_: number = this._SafeStr_3795[2] | 0;
        let _loc2_: IPurchasableOffer = this._SafeStr_2334[0].length > _loc5_ ? this._SafeStr_2334[0][_loc5_] : null;
        let _loc4_: IPurchasableOffer = this._SafeStr_2334[1].length > _loc6_ ? this._SafeStr_2334[1][_loc6_] : null;
        let _loc1_: IPurchasableOffer = this._SafeStr_2334[2].length > _loc3_ ? this._SafeStr_2334[2][_loc3_] : null;
        if (!_loc4_ || !_loc2_ || !_loc1_) {
            return;
        }
        this.events.dispatchEvent(new CatalogWidgetUpdateRoomPreviewEvent(_loc4_.product.extraParam, _loc2_.product.extraParam, _loc1_.product.extraParam, 64));
    }

    private createOfferGroups(): boolean {
        let _loc2_: IProduct = null;
        let _loc3_: number = 0;
        let _loc4_: string = null;
        let _loc5_: number = 0;
        for (const _loc1_ of this.page.offers ?? []) {
            if (!(_loc1_.pricingModel == "pricing_model_single" || _loc1_.pricingModel == "pricing_model_multi")) {
                continue;
            }
            _loc2_ = _loc1_.product;
            if (_loc2_ == null) {
                continue;
            }
            _loc3_ = _loc2_.productClassId;
            if (!(_loc2_.productType == "i" || _loc2_.productType == "s")) {
                continue;
            }
            if (_loc2_.furnitureData == null) {
                continue;
            }
            _loc4_ = _loc2_.furnitureData.className;
            _loc5_ = this._groupNames.indexOf(_loc4_);
            if (this._groupNames.indexOf(_loc4_) == -1) {
                this._groupNames.push(_loc4_);
            }
            while (this._SafeStr_2334.length < this._groupNames.length) {
                this._SafeStr_2334.push(new Array<IPurchasableOffer>(0).fill(null));
            }
            switch (_loc4_) {
                case "floor":
                    (asGuarded(this._SafeStr_2334[_loc5_], Array.isArray)).push(_loc1_);
                    break;
                case "wallpaper":
                    (asGuarded(this._SafeStr_2334[_loc5_], Array.isArray)).push(_loc1_);
                    break;
                case "landscape":
                    (asGuarded(this._SafeStr_2334[_loc5_], Array.isArray)).push(_loc1_);
                    break;
                default:
                    Logger.log("[Spaces Catalog Widget] : " + _loc4_);
            }
        }
        this.page.replaceOffers(new Array<IPurchasableOffer>(0).fill(null), false);
        return true;
    }

    private onSelectGroup = (param1: WindowEvent): void => {
        let _loc2_: number = 0;
        let _loc3_: ISelectableWindow = asGuarded(param1.target, isISelectableWindow);
        if (_loc3_) {
            _loc2_ = this._tabs.getSelectableIndex(_loc3_);
            Logger.log("select: " + [_loc3_.name, _loc2_]);
            this.switchCategory(_loc3_.name);
        }
    };

    private switchCategory(param1: string): void {
        let _loc2_: any = undefined;
        let _loc3_: any = undefined;
        let _loc4_: number = 0;
        if (this.disposed) {
            return;
        }
        if (!this._tabs) {
            return;
        }
        this._tabs.setSelected(this._tabs.getSelectableByName(param1));
        let _loc5_: number = -1;
        switch (param1) {
            case "group.walls":
                _loc5_ = 0;
                break;
            case "group.floors":
                _loc5_ = 1;
                break;
            case "group.views":
                _loc5_ = 2;
                break;
            default:
                _loc5_ = -1;
        }
        if (_loc5_ > -1) {
            if (this._SafeStr_2555 != null) {
                this._SafeStr_2555.deactivate();
            }
            this._SafeStr_2555 = null;
            this._selectedGroup = _loc5_;
            if (this._itemGrid) {
                this._itemGrid.destroyGridItems();
            }
            _loc2_ = this._SafeStr_2334[this._selectedGroup] == null ? new Array<IPurchasableOffer>(0).fill(null) : this._SafeStr_2334[this._selectedGroup];
            this.page.replaceOffers(_loc2_, false);
            this.resetTimer();
            _loc3_ = this.populateItemGrid();
            this.loadItemGridGraphics(null, _loc3_);
            if (this._SafeStr_2458) {
                this._SafeStr_2458.start();
            }
            _loc4_ = this._SafeStr_3795[this._selectedGroup] | 0;
            this.selectIndex(_loc4_);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
