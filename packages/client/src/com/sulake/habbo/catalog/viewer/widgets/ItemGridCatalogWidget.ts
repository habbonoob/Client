import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IDragAndDropDoneReceiver } from '@/com/sulake/habbo/catalog/viewer/IDragAndDropDoneReceiver';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import type { CatalogWidgetGuildSelectedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetGuildSelectedEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { BundleProductContainer } from '@/com/sulake/habbo/catalog/viewer/BundleProductContainer';
import { isIProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColoursEvent';
import { CatalogWidgetInitPurchaseEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetInitPurchaseEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';

export class ItemGridCatalogWidget extends CatalogWidget implements ICatalogWidget, IItemGrid, IDragAndDropDoneReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ItemGridCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: ISessionDataManager, param3: string) {
        super(param1);
        this._SafeStr_2171 = param2;
        this._catalogType = param3;
    }

    public itemColors: Map<any, any> = new Dictionary();
    public chosenItemColorIndex: number = 0;

    declare protected _itemGrid: IItemGridWindow;

    declare protected _gridItemLayout: XML;

    declare protected _SafeStr_4866: XML;

    declare protected _SafeStr_4826: XML;

    declare protected _SafeStr_2555: IGridItem;

    declare protected _SafeStr_2458: Timer;

    declare protected _SafeStr_3880: (...args: any[]) => any;

    protected _SafeStr_7442: boolean = true;

    declare protected _SafeStr_2171: ISessionDataManager;

    private _bundleCounter: number = 0;
    private _offerInitIndex: number = 0;
    private _SafeStr_5630: number = -1;

    declare private _selectedGuildColor1: string;

    declare private _selectedGuildColor2: string;

    declare private _selectedGuildBadgeCode: string;

    declare private _catalogType: string;

    public override dispose(): void {
        if (this._SafeStr_2458 != null) {
            this._SafeStr_2458.stop();
            if (this._SafeStr_3880 != null) {
                this._SafeStr_2458.removeEventListener("timer", this._SafeStr_3880);
                this._SafeStr_3880 = null;
            }
            this._SafeStr_2458 = null;
        }
        if (this._itemGrid != null) {
            this._itemGrid.destroyGridItems();
            this._itemGrid = null;
        }
        this._gridItemLayout = null;
        this._SafeStr_4866 = null;
        this._SafeStr_4826 = null;
        this._SafeStr_2555 = null;
        super.dispose();
    }

    public override init(): boolean {
        let isFixed: boolean = false;
        let gridAsset: XmlAsset;
        let loadGraphics: IPurchasableOffer[];
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("itemGridWidget");
        isFixed = this._window.tags.indexOf("FIXED") > -1;
        this._itemGrid = asGuarded(this._window.findChildByName("itemGrid"), isIItemGridWindow);
        if (!isFixed) {
            this._window.getChildAt(0).width = this._window.width;
            this._window.getChildAt(0).height = this._window.height;
        }
        this._itemGrid.verticalSpacing = 0;
        gridAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(gridAsset.content, XML);
        gridAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("grid_item_with_price_single"), XmlAsset);
        this._SafeStr_4826 = asInstanceOf(gridAsset.content, XML);
        gridAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("grid_item_with_price_multi"), XmlAsset);
        this._SafeStr_4866 = asInstanceOf(gridAsset.content, XML);
        loadGraphics = this.populateItemGrid();
        if (this._SafeStr_7442) {
            this._SafeStr_2458 = new Timer(25);
            this._SafeStr_3880 = (param1: TimerEvent): void => {
                    this.loadItemGridGraphics(param1, loadGraphics);
                };
            this._SafeStr_2458.addEventListener("timer", this._SafeStr_3880);
            this._SafeStr_2458.start();
        } else {
            this.loadItemGridGraphics(null, loadGraphics);
        }
        this.events.addEventListener("GUILD_SELECTED", this.onGuildSelected);
        this.events.addEventListener("COLOUR_INDEX", this.onColourIndex);
        return true;
    }

    public select(param1: IGridItem, param2: boolean): void {
        if (this._SafeStr_2555 != null) {
            this._SafeStr_2555.deactivate();
        }
        this._SafeStr_2555 = param1;
        param1.activate();
        if (this._SafeStr_2555.view) {
            this._SafeStr_2555.view.findChildByName("border_outline").color = (this._catalogType == "NORMAL" ? 6538729 : 16758076) >>> 0;
        }
        let _loc4_: ProductContainer = param1 instanceof ProductContainer ? param1 : null;
        if (!_loc4_) {
            return;
        }
        if (_loc4_.isLazy) {
            return;
        }
        let _loc3_: IPurchasableOffer = _loc4_.offer;
        if (_loc3_ != null) {
            this.events.dispatchEvent(new SelectProductEvent(_loc3_));
            if (_loc3_.product && _loc3_.product.productType == "i") {
                this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(_loc3_.product.extraParam));
            }
        }
        if (param2) {
            this.events.dispatchEvent(new CatalogWidgetColoursEvent(this.getCurrentItemColors(), "ctlg_clr_27x22_1", "ctlg_clr_27x22_2", "ctlg_clr_27x22_3", this.getCurrentItemColourIndex()));
        }
    }

    public startDragAndDrop(param1: IGridItem): boolean {
        let _loc2_: IPurchasableOffer = (param1 instanceof ProductContainer ? param1 : null).offer;
        if (_loc2_ != null) {
            if (this._SafeStr_2171.clubLevel >= _loc2_.clubLevel) {
                (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).requestSelectedItemToMover(this, _loc2_);
            }
        }
        return true;
    }

    public onDragAndDropDone(param1: boolean, param2: string): void {
        if (this.disposed) {
            return;
        }
        if (param1) {
            this.events.dispatchEvent(new CatalogWidgetInitPurchaseEvent(false, param2));
        }
    }

    public stopDragAndDrop(): void {
    }

    public getCurrentItemColors(): any[] {
        let _loc2_: any = null;
        for (const _loc1_ of this.page.offers ?? []) {
            if (_loc1_.gridItem == this._SafeStr_2555) {
                _loc2_ = _loc1_;
            }
        }
        if (!_loc2_ || !_loc2_.product.isColorable) {
            return [];
        }
        let _loc3_: string = stringOrNull(_loc2_.product.furnitureData.fullName.split("*")[0]);
        return this.itemColors.get(_loc3_);
    }

    protected populateItemGrid(): IPurchasableOffer[] {
        let _loc6_: string = null;
        let _loc7_: number = 0;
        let _loc1_: any = null;
        let _loc4_: number = 0;
        let _loc5_: any = 0;
        let _loc8_: number = 0;
        let _loc9_: IWindowContainer = null;
        let _loc3_: any = false;
        let _loc11_: Map<any, any> = new Dictionary();
        let _loc10_: IPurchasableOffer[] = [];
        let _loc12_: any = this.page.layoutCode == "default_3x3_color_grouping";
        if (_loc12_) {
            for (_loc1_ of this.page.offers ?? []) {
                if (!_loc1_.product.furnitureData || !_loc1_.product.isColorable) {
                    _loc10_.push(_loc1_);
                } else {
                    _loc6_ = stringOrNull(_loc1_.product.furnitureData.fullName.split("*")[0]);
                    _loc7_ = _loc1_.product.furnitureData.fullName.split("*")[1] | 0;
                    if (!this.itemColors.get(_loc6_)) {
                        this.itemColors.set(_loc6_, []);
                    }
                    if (_loc1_.product.furnitureData.colours) {
                        _loc5_ = 16777215;
                        for (_loc4_ of _loc1_.product.furnitureData.colours ?? []) {
                            if (_loc4_ != 16777215) {
                                _loc5_ = _loc4_;
                            }
                        }
                        if (this.itemColors.get(_loc6_).indexOf(_loc5_) == -1) {
                            this.itemColors.get(_loc6_)[_loc7_] = _loc5_;
                        }
                    }
                    if (_loc11_.get(_loc6_) == null) {
                        _loc11_.set(_loc6_, _loc10_.length);
                        _loc10_.push(_loc1_);
                    } else if (_loc6_.indexOf("bc_") == 0 && (_loc5_ == 16777215 || _loc5_ == 16777214)) {
                        _loc8_ = _loc11_.get(_loc6_) | 0;
                        _loc10_[_loc8_] = _loc1_;
                    }
                }
            }
        } else {
            _loc10_ = this.page.offers;
        }
        let _loc2_: IPurchasableOffer[] = [];
        for (_loc1_ of this.page.offers ?? []) {
            if (_loc12_ && _loc1_.product.furnitureData && _loc1_.product.isColorable) {
                if (_loc10_.indexOf(_loc1_) != -1) {
                    _loc9_ = this.createGridItem(_loc1_.gridItem);
                    _loc1_.gridItem.view = _loc9_;
                }
            } else {
                _loc9_ = this.createGridItem(_loc1_.gridItem);
                _loc1_.gridItem.view = _loc9_;
            }
            _loc1_.gridItem.grid = this;
            _loc3_ = _loc10_.indexOf(_loc1_) != -1;
            if (_loc3_) {
                _loc2_.push(_loc1_);
            }
            if (_loc1_.pricingModel == "pricing_model_bundle") {
                this._bundleCounter = this._bundleCounter + 1;
                if (_loc1_.productContainer instanceof BundleProductContainer) {
                    (asInstanceOf(_loc1_.productContainer, BundleProductContainer)).setBundleCounter(this._bundleCounter);
                }
            }
        }
        return _loc2_;
    }

    protected resetTimer(): void {
        if (this._SafeStr_2458 != null) {
            this._SafeStr_2458.reset();
        }
        this._offerInitIndex = 0;
    }

    protected loadItemGridGraphics(param1: TimerEvent = null, param2: IPurchasableOffer[] = null): void {
        let _loc5_: number = 0;
        let _loc3_: IPurchasableOffer = null;
        if (this.disposed) {
            return;
        }
        if (param1 != null) {
        }
        if (param2 == null) {
            param2 = this.page.offers;
        }
        let _loc4_: number = param2.length | 0;
        if (_loc4_ > 0) {
            _loc5_ = 0;
            while (_loc5_ < 3) {
                if (this._offerInitIndex >= 0 && this._offerInitIndex < _loc4_) {
                    _loc3_ = param2[this._offerInitIndex];
                    this.loadGraphics(_loc3_);
                }
                this._offerInitIndex = this._offerInitIndex + 1;
                if (this._offerInitIndex >= _loc4_) {
                    this.resetTimer();
                    break;
                }
                _loc5_++;
            }
        }
    }

    protected createGridItem(param1: IGridItem): IWindowContainer {
        let _loc2_: XML = null;
        let _loc3_: IProductContainer = isIProductContainer(param1) ? param1 : null;
        let _loc5_: boolean = _loc3_ != null && _loc3_.offer != null && (_loc3_.offer.priceInCredits > 0 || _loc3_.offer.priceInActivityPoints > 0 || _loc3_.offer.priceInSilver > 0);
        if (_loc5_ && this._catalogType != "BUILDERS_CLUB") {
            if (_loc3_.offer && _loc3_.offer.priceInCredits > 0 && _loc3_.offer.priceInActivityPoints > 0) {
                _loc2_ = this._SafeStr_4866;
            } else {
                _loc2_ = this._SafeStr_4826;
            }
        } else {
            _loc2_ = this._gridItemLayout;
        }
        let _loc4_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(_loc2_), isIWindowContainer);
        this._itemGrid.addGridItem(_loc4_);
        param1.view = _loc4_;
        if (this._catalogType != "BUILDERS_CLUB" && _loc3_ instanceof ProductContainer) {
            (_loc3_ instanceof ProductContainer ? _loc3_ : null).createCurrencyIndicators(asInstanceOf(this.page.viewer.catalog, HabboCatalog));
        }
        return _loc4_;
    }

    protected loadGraphics(param1: IPurchasableOffer): void {
        let _loc3_: IStuffData = null;
        let _loc2_: any[] = null;
        let _loc4_: StringArrayStuffData = null;
        if (param1 != null && !param1.disposed) {
            _loc3_ = null;
            if (this._SafeStr_5630 != -1) {
                _loc2_ = [];
                _loc2_.push("0");
                _loc2_.push(this._SafeStr_5630.toString());
                _loc2_.push(this._selectedGuildBadgeCode);
                _loc2_.push(this._selectedGuildColor1);
                _loc2_.push(this._selectedGuildColor2);
                _loc4_ = new StringArrayStuffData();
                _loc4_.setArray(_loc2_);
                _loc3_ = _loc4_;
            }
            param1.productContainer.initProductIcon(this.page.viewer.roomEngine, _loc3_);
        }
        param1.productContainer.grid = this;
    }

    private getCurrentItemColourIndex(): number {
        let _loc2_: any = null;
        for (const _loc1_ of this.page.offers ?? []) {
            if (_loc1_.gridItem == this._SafeStr_2555) {
                _loc2_ = _loc1_;
            }
        }
        if (!_loc2_ || !_loc2_.product.isColorable) {
            return 0;
        }
        return Math.max(_loc2_.product.furnitureData.colourIndex - 1, 0) | 0;
    }

    private onGuildSelected = (param1: CatalogWidgetGuildSelectedEvent): void => {
        let _loc3_: IWindowContainer = null;
        if (this.disposed) {
            return;
        }
        this._SafeStr_5630 = param1.guildId;
        this._selectedGuildColor1 = param1.color1;
        this._selectedGuildColor2 = param1.color2;
        this._selectedGuildBadgeCode = param1.badgeCode;
        this._itemGrid.destroyGridItems();
        for (const _loc2_ of this.page.offers ?? []) {
            _loc3_ = this.createGridItem(_loc2_.gridItem);
            _loc2_.gridItem.view = _loc3_;
            _loc2_.gridItem.grid = this;
            this.loadGraphics(_loc2_);
        }
    };

    private onColourIndex = (param1: CatalogWidgetColourIndexEvent): void => {
        let _loc4_: any = null;
        let _loc2_: any = null;
        for (_loc2_ of this.page.offers ?? []) {
            if (_loc2_.gridItem == this._SafeStr_2555 && _loc2_.gridItem.view != null) {
                _loc4_ = _loc2_;
            }
        }
        if (!_loc4_ || !_loc4_.product.isColorable) {
            return;
        }
        let _loc3_: IWindowContainer = _loc4_.gridItem.view;
        _loc4_.gridItem.view = null;
        let _loc5_: string = _loc4_.product.furnitureData.fullName.split("*")[0] + "*" + (param1.index + 1);
        for (_loc2_ of this.page.offers ?? []) {
            if (_loc2_.product.furnitureData.fullName == _loc5_) {
                _loc2_.gridItem.view = _loc3_;
                this.select(_loc2_.gridItem, false);
                this.loadGraphics(_loc2_);
            }
        }
    };
}
