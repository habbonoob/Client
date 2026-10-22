import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { PrizeLevelContainer } from '@/com/sulake/habbo/catalog/recycler/PrizeLevelContainer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DealPrizeContainer } from '@/com/sulake/habbo/catalog/recycler/DealPrizeContainer';
import { PrizeContainer } from '@/com/sulake/habbo/catalog/recycler/PrizeContainer';
import { RecycleRewardDisplayWrapper } from '@/com/sulake/habbo/catalog/recycler/RecycleRewardDisplayWrapper';
import { isIGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';

export class RecyclerPrizesCatalogWidget extends CatalogWidget implements ICatalogWidget, IItemGrid {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RecyclerPrizesCatalogWidget'); }

    private static readonly STAR_LEVELS: any[] = ["bronze", "silver", "gold", "diamond", "ruby", "pink", "green", "grey"];

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    declare private _prizes: any[];

    declare private _itemList: IItemListWindow;

    declare private _gridItemLayout: XML;

    declare private _levelItemLayout: XML;

    declare private _SafeStr_2555: IGridItem;

    private get recycler(): IRecycler {
        return this.page.viewer.catalog.getRecycler();
    }

    public override dispose(): void {
        super.dispose();
        this._prizes = null;
        this._itemList = null;
        this._gridItemLayout = null;
        this._levelItemLayout = null;
        this._SafeStr_2555 = null;
    }

    public override init(): boolean {
        let _loc2_: XmlAsset = null;
        if (!super.init()) {
            return false;
        }
        this._itemList = asGuarded(this._window.findChildByName("itemList"), isIItemListWindow);
        _loc2_ = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc2_.content, XML);
        _loc2_ = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("recyclerPrizesWidgetLevelItem"), XmlAsset);
        this._levelItemLayout = asInstanceOf(_loc2_.content, XML);
        let _loc1_: any[] = this.recycler.getPrizeTable(this.onPrizesReceived);
        if (_loc1_ != null) {
            this.onPrizesReceived(_loc1_);
        }
        return true;
    }

    public select(param1: IGridItem, param2: boolean): void {
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_2555 != null) {
            this._SafeStr_2555.deactivate();
        }
        this._SafeStr_2555 = param1;
        param1.activate();
        let _loc3_: IWindowContainer = asGuarded(this.window.findChildByName("productView"), isIWindowContainer);
        let _loc5_: PrizeContainer = param1 instanceof PrizeContainer ? param1 : null;
        let _loc4_: string = "";
        this.viewProduct(this.page.viewer.roomEngine, _loc3_, _loc5_.productItemType, _loc5_.productItemTypeId, _loc5_.title, _loc4_);
    }

    public viewProduct(param1: IRoomEngine, param2: IWindowContainer, param3: string, param4: number, param5: string, param6: string): void {
        let _loc7_: IWidgetWindow = asGuarded(param2.findChildByName("product_viewer"), isIWidgetWindow);
        let _loc8_: IProductImageWidget = asGuarded(_loc7_.widget, isIProductImageWidget);
        _loc8_.productInfo = new RecycleRewardDisplayWrapper(param3, param4);
        param2.findChildByName("ctlg_product_name").caption = param5;
        param2.findChildByName("ctlg_description").caption = param6 ? param6 : "";
    }

    public startDragAndDrop(param1: IGridItem): boolean {
        return false;
    }

    private onPrizesReceived = (param1: any[]): void => {
        if (param1 == null) {
            return;
        }
        this._prizes = param1;
        this.populateItemGrid();
        if (this._prizes.length > 0 && this._prizes[0].prizes.length > 0) {
            this.select(asGuarded(this._prizes[0].prizes[0], isIGridItem), false);
        }
    };

    private createLevelItem(param1: PrizeLevelContainer): void {
        let _loc5_: number = 0;
        let _loc6_: PrizeContainer = null;
        let _loc3_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(this._levelItemLayout), isIWindowContainer);
        this._itemList.addListItem(_loc3_);
        let _loc4_: IWindow = _loc3_.findChildByName("level_title");
        _loc4_.caption = this.page.viewer.catalog.localization.getLocalization("recycler.prizes.category." + param1.prizeLevelId);
        _loc4_ = _loc3_.findChildByName("level_chances");
        if (param1.prizeLevelId == 1) {
            _loc4_.visible = false;
        } else {
            _loc4_.visible = true;
            _loc4_.caption = this.page.viewer.catalog.localization.getLocalizationWithParams("recycler.prizes.odds", "", "odds", "1:" + param1.probabilityDenominator);
        }
        _loc3_.findChildByName("level_splitter").visible = param1.prizeLevelId > 1;
        castGuarded(_loc3_.findChildByName("star_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "star_small_" + RecyclerPrizesCatalogWidget.STAR_LEVELS[param1.prizeLevelId - 1];
        let _loc2_: IItemGridWindow = asGuarded(_loc3_.findChildByName("itemGrid"), isIItemGridWindow);
        _loc5_ = 0;
        while (_loc5_ < param1.prizes.length) {
            _loc6_ = param1.prizes[_loc5_];
            this.createPrizeItem(_loc6_, _loc2_);
            _loc5_++;
        }
    }

    private createPrizeItem(param1: PrizeContainer, param2: IItemGridWindow): void {
        if (param1 == null || param2 == null || Boolean(param2.disposed)) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(this._gridItemLayout), isIWindowContainer);
        _loc3_.findChildByName("clubLevelIcon").visible = false;
        param1.view = _loc3_;
        param1.grid = this;
        param1.setIcon(this.page.viewer.roomEngine);
        param2.addGridItem(_loc3_);
        param2.height = param2.scrollableRegion.height | 0;
        if (param1 instanceof DealPrizeContainer) {
            param2.width = param2.scrollableRegion.width | 0;
        }
    }

    private populateItemGrid(param1: TimerEvent = null): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._prizes.length) {
            this.createLevelItem(this._prizes[_loc2_]);
            _loc2_++;
        }
    }
}
