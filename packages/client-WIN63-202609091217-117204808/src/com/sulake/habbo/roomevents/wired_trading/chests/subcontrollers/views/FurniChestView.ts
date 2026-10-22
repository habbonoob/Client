import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChestBasedItem } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestBasedItem';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { ChestStorage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestStorage';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { FurniChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/FurniChestSubController';
import type { ChestBasedItemGroupView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestBasedItemGroupView';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ChestItemTypeRenderableWrapper } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestItemTypeRenderableWrapper';
import { FurniChestItemView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/FurniChestItemView';
import { ProductImageWidget } from '@/com/sulake/habbo/window/widgets/ProductImageWidget';

export class FurniChestView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers.views::FurniChestView'); }

    private static readonly GRID_OFFSET_SEARCH: number = 28;
    private static readonly _SafeStr_8573: number = 31;
    private static ITEM_POOL_MAX_SIZE: number = 1000;
    private static ITEM_POOL: FurniChestItemView[] = [];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _controller: FurniChestSubController;

    declare private _container: IWindowContainer;

    declare private _itemTemplate: IRegionWindow;

    declare private _SafeStr_2989: UtilsMap;

    declare private _SafeStr_3297: UtilsMap;

    declare private _selectedItem: FurniChestItemView;

    declare private _SafeStr_2376: FurniChestItemView[];

    private _SafeStr_5703: boolean = false;
    private _searchParam: string = "";

    constructor(param1: FurniChestSubController) {
        this._controller = param1;
        this._container = asGuarded(this.roomEvents.getXmlWindow("furni_chest_contents"), isIWindowContainer);
        this._itemTemplate = asGuarded(this.itemGrid.removeGridItemAt(0), isIRegionWindow);
        this._SafeStr_2989 = new UtilsMap();
        this._SafeStr_3297 = new UtilsMap();
        this._SafeStr_2376 = [];
        this.withdrawInput.restrict = "0-9";
        this.withdrawButton.addEventListener("WME_CLICK", this.onWithdrawClick);
        this.viewLogsButton.addEventListener("WME_CLICK", this.onViewLogsClick);
        this.searchInput.addEventListener("WE_CHANGE", this.onSearchChanged);
        this.searchInput.addEventListener("WKE_KEY_DOWN", this.onSearchMaybeEnter);
        this.searchClearButton.addEventListener("WME_CLICK", this.onClearSearchClicked);
    }

    public static findReusableGroupedView(param1: ChestBasedItem, param2: UtilsMap): ChestBasedItemGroupView {
        let _loc3_: number = 0;
        let _loc9_: ChestBasedItem = null;
        let _loc5_: ChestItemType = param1.type;
        let _loc6_: number = param1.specialType;
        let _loc8_: IStuffData = param1.stuffData;
        let _loc7_: ChestBasedItemGroupView[] = param2.getValue(FurniChestView.itemTypeKey(_loc5_));
        if (_loc7_ == null || _loc7_.length == 0) {
            return null;
        }
        if (_loc8_.uniqueSerialNumber > 0) {
            return null;
        }
        if (_loc6_ == 19) {
            _loc3_ = _loc8_.rarityLevel;
            for (const _loc4_ of _loc7_ ?? []) {
                _loc9_ = _loc4_.chestBasedItemSample;
                if (_loc9_ != null && _loc3_ == _loc9_.stuffData.rarityLevel) {
                    return _loc4_;
                }
            }
            return null;
        }
        return _loc7_[0];
    }

    public static itemTypeKey(param1: ChestItemType): string {
        return (param1.isWallItem ? "1" : "0") + "-" + param1.typeId + "-" + param1.legacyPosterId;
    }

    public static getChestBasedItemName(param1: ChestBasedItem, param2: IHabboLocalizationManager, param3: ISessionDataManager): string {
        let _loc5_: IFurnitureData = null;
        let _loc4_: ChestItemType = param1.type;
        if (param1.type.isWallItem) {
            if (param1.specialType == 6 && _loc4_.legacyPosterId != "") {
                return param2.getLocalization("poster_" + _loc4_.legacyPosterId + "_name");
            }
            _loc5_ = param3.getWallItemData(_loc4_.typeId);
        } else {
            _loc5_ = param3.getFloorItemData(_loc4_.typeId);
        }
        if (_loc5_ == null) {
            return "(missing item name)";
        }
        return _loc5_.localizedName;
    }

    private static claimView(param1: IRegionWindow, param2: FurniChestView, param3: ChestStorage[]): FurniChestItemView {
        let _loc4_: FurniChestItemView = null;
        if (FurniChestView.ITEM_POOL.length > 0) {
            _loc4_ = FurniChestView.ITEM_POOL.pop();
        } else {
            _loc4_ = new FurniChestItemView(param1);
        }
        _loc4_.initialize(param2, param3);
        return _loc4_;
    }

    private static recycleView(param1: FurniChestItemView): void {
        if (FurniChestView.ITEM_POOL.length < FurniChestView.ITEM_POOL_MAX_SIZE) {
            param1.recycle();
            FurniChestView.ITEM_POOL.push(param1);
        } else {
            param1.dispose();
        }
    }

    private onClearSearchClicked = (param1: WindowMouseEvent): void => {
        this.clearSearch();
        this.updateGrid();
    };

    private onSearchMaybeEnter = (param1: WindowKeyboardEvent): void => {
        if (!this.searchInput.visible) {
            return;
        }
        if (param1.keyCode == 13) {
            if (this._searchParam == this.searchInput.text) {
                return;
            }
            this._searchParam = this.searchInput.text;
            this.updateGrid();
        } else if (param1.keyCode == 27) {
            if (this._searchParam.length == 0) {
                this.clearSearch();
                return;
            }
            this.clearSearch();
            this.updateGrid();
        }
    };

    private onSearchChanged = (param1: WindowEvent): void => {
        this.searchPlaceholder.visible = this.searchInput.text.length == 0;
        this.searchClearButton.visible = this.searchInput.text.length > 0;
    };

    private onViewLogsClick = (param1: WindowMouseEvent): void => {
        if (this._selectedItem != null && this._selectedItem.peek() != null) {
            this._controller.viewLogsWithType(this._selectedItem.peek().type);
        }
    };

    private onWithdrawClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = parseInt(this.withdrawInput.text);
        if (isNaN(_loc2_)) {
            return;
        }
        if (this._selectedItem != null && this._selectedItem.peek() != null) {
            this._controller.withdrawItemsWithType(this._selectedItem.peek().type, _loc2_ | 0);
        }
    };

    public get itemTemplate(): IRegionWindow {
        return this._itemTemplate;
    }

    private get roomEvents(): HabboUserDefinedRoomEvents {
        return this._controller.roomEvents;
    }

    public get container(): IWindowContainer {
        return this._container;
    }

    public itemsUpdated(param1: ChestStorage[], param2: ChestStorage[]): void {
        let _loc4_: FurniChestItemView = null;
        let _loc6_: any = undefined;
        let _loc8_: Map<any, any> = new Dictionary();
        let _loc11_: boolean = false;
        let _loc7_: FurniChestItemView[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc4_ = this.removeStorage(_loc3_);
            if (_loc4_ != null) {
                _loc8_.set(_loc4_, true);
                _loc11_ = true;
                if (_loc4_ == this._selectedItem) {
                    this.selectItemView(null);
                }
            }
        }
        for (const _loc9_ of param2 ?? []) {
            _loc4_ = this.addStorage(_loc9_);
            if (_loc4_ != null) {
                _loc7_.push(_loc4_);
            }
        }
        if (_loc11_ || _loc7_.length > 0) {
            _loc6_ = [];
            for (const _loc10_ of this._SafeStr_2376 ?? []) {
                if (!(_loc8_.has(_loc10_))) {
                    _loc6_.push(_loc10_);
                }
            }
            for (const _loc5_ of _loc7_ ?? []) {
                _loc6_.push(_loc5_);
            }
            this._SafeStr_2376 = _loc6_;
            this.updateGrid();
            this.maybeSelectNewItemView();
        }
        this._controller.wrapperView.updateUI();
    }

    public itemsInitialize(param1: ChestStorage[]): void {
        let _loc2_: FurniChestItemView = null;
        this.clearSearch();
        this.clear();
        let _loc4_: FurniChestItemView[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = this.addStorage(_loc3_);
            if (_loc2_ != null) {
                _loc4_.push(_loc2_);
            }
        }
        this._SafeStr_2376 = _loc4_;
        this.updateGrid();
        this.maybeSelectNewItemView();
    }

    private addStorage(param1: ChestStorage): FurniChestItemView {
        let _loc3_: FurniChestItemView = asInstanceOf(FurniChestView.findReusableGroupedView(param1, this._SafeStr_2989), FurniChestItemView);
        if (_loc3_ != null) {
            _loc3_.add(param1);
            this._SafeStr_3297.add(param1, _loc3_);
            return null;
        }
        let _loc2_: ChestStorage[] = [];
        _loc2_.push(param1);
        let _loc6_: FurniChestItemView = FurniChestView.claimView(this.itemTemplate, this, _loc2_);
        this._SafeStr_3297.add(param1, _loc6_);
        let _loc4_: string = FurniChestView.itemTypeKey(param1.type);
        let _loc5_: FurniChestItemView[] = this._SafeStr_2989.getValue(_loc4_);
        if (_loc5_ == null) {
            _loc5_ = [];
            this._SafeStr_2989.add(_loc4_, _loc5_);
        }
        _loc5_.push(_loc6_);
        return _loc6_;
    }

    private removeStorage(param1: ChestStorage): FurniChestItemView {
        let _loc4_: any = undefined;
        let _loc2_: FurniChestItemView = this._SafeStr_3297.getValue(param1);
        if (_loc2_ == null) {
            return null;
        }
        _loc2_.remove(param1);
        this._SafeStr_3297.remove(param1);
        let _loc3_: string = FurniChestView.itemTypeKey(param1.type);
        if (_loc2_.numItems == 0) {
            _loc4_ = this._SafeStr_2989.getValue(_loc3_);
            if (_loc4_ != null && _loc4_.indexOf(_loc2_) != -1) {
                _loc4_.splice(_loc4_.indexOf(_loc2_), 1)[0];
            }
            if (_loc4_.length == 0) {
                this._SafeStr_2989.remove(_loc3_);
            }
            FurniChestView.recycleView(_loc2_);
            return _loc2_;
        }
        return null;
    }

    public clear(): void {
        this.itemGrid.removeGridItems();
        for (const _loc1_ of this._SafeStr_2376 ?? []) {
            FurniChestView.recycleView(_loc1_);
        }
        this._SafeStr_2376 = [];
        this._SafeStr_2989 = new UtilsMap();
        this._SafeStr_3297 = new UtilsMap();
        this.selectItemView(null);
        this.updatePreviewUI();
    }

    public updateGrid(): void {
        let _loc2_: any;
        let _loc5_: number = 0;
        let _loc1_: FurniChestItemView = null;
        let _loc3_: string = null;
        let _loc4_: boolean = false;
        this.updateSearchbarVisibility();
        this.itemGrid.removeGridItems();
        let _loc6_: any[] = this._searchParam.length > 0 ? this._searchParam.toLowerCase().split(" ") : null;
        _loc5_ = 0;
        for (; _loc5_ < this._SafeStr_2376.length; _loc5_++) {
            _loc1_ = this._SafeStr_2376[_loc5_];
            if (_loc6_ != null) {
                _loc3_ = this.getChestStorageName(_loc1_.peek()).toLowerCase();
                _loc4_ = true;
                for (_loc2_ of _loc6_ ?? []) {
                    if (_loc3_.indexOf(stringOrNull(_loc2_)) == -1) {
                        _loc4_ = false;
                        break;
                    }
                }
                if (!_loc4_) {
                    continue;
                }
            }
            this.itemGrid.addGridItem(this._SafeStr_2376[_loc5_].window);
        }
        this.noItemsText.visible = this.itemGrid.numGridItems == 0;
    }

    private updateSearchbarVisibility(): void {
        if (!this.searchBorder.visible && this._SafeStr_2376.length >= 31) {
            this.searchBorder.visible = true;
            this.clearSearch();
            this.itemGrid.y += 28;
            this.itemGrid.height -= 28;
        } else if (this.searchBorder.visible && this._SafeStr_2376.length < 31) {
            this.searchBorder.visible = false;
            this.clearSearch();
            this.itemGrid.y -= 28;
            this.itemGrid.height += 28;
        }
    }

    private clearSearch(): void {
        this._SafeStr_5703 = true;
        this.searchInput.text = "";
        this.searchClearButton.visible = false;
        this.searchPlaceholder.visible = true;
        this._searchParam = "";
        this._SafeStr_5703 = false;
    }

    public selectItemView(param1: FurniChestItemView): void {
        if (this._selectedItem != null) {
            this._selectedItem.deactivate();
            this._selectedItem = null;
        }
        if (param1 != null) {
            this._selectedItem = param1;
            this._selectedItem.activate();
        }
        this.updatePreviewUI();
    }

    public maybeSelectNewItemView(): void {
        if (this._selectedItem == null && this._SafeStr_2376.length > 0) {
            this.selectItemView(this._SafeStr_2376[0]);
        }
    }

    public updatePreviewUI(): void {
        let _loc2_: ChestStorage = null;
        let _loc1_: ProductImageWidget = asInstanceOf(this.previewWidget.widget, ProductImageWidget);
        if (this._selectedItem == null || this._selectedItem.peek() == null) {
            this.previewFurniName.text = "";
            _loc1_.clearPreviewer();
            this.viewLogsButton.disable();
            this.withdrawButton.disable();
            this.placeholderPreviewImage.visible = true;
        } else {
            this.placeholderPreviewImage.visible = false;
            _loc2_ = this._selectedItem.peek();
            Util.disableSection(this.viewLogsButton, !this._controller.canRead);
            Util.disableSection(this.withdrawButton, !this._controller.canWithdraw);
            this.previewFurniName.text = this.getChestStorageName(_loc2_);
            _loc1_.productInfo = new ChestItemTypeRenderableWrapper(_loc2_.type);
        }
    }

    public getChestStorageName(param1: ChestStorage): string {
        return FurniChestView.getChestBasedItemName(param1, this._controller.localization, this._controller.parentController.sessionDataManager);
    }

    public updateUI(): void {
        this.updatePreviewUI();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._container.dispose();
        this._container = null;
        this._itemTemplate.dispose();
        this._itemTemplate = null;
        this._SafeStr_2989 = null;
        this._SafeStr_3297 = null;
        for (const _loc1_ of this._SafeStr_2376 ?? []) {
            FurniChestView.recycleView(_loc1_);
        }
        this._SafeStr_2376 = null;
        this._selectedItem = null;
        this._controller = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get itemGrid(): IScrollableGridWindow {
        return asGuarded(this._container.findChildByName("grid_items"), isIScrollableGridWindow);
    }

    private get searchBorder(): IBorderWindow {
        return asGuarded(this._container.findChildByName("search_border"), isIBorderWindow);
    }

    private get searchPlaceholder(): ITextWindow {
        return asGuarded(this._container.findChildByName("search_placeholder"), isITextWindow);
    }

    private get searchInput(): ITextFieldWindow {
        return asGuarded(this._container.findChildByName("search_input"), isITextFieldWindow);
    }

    private get searchClearButton(): IRegionWindow {
        return asGuarded(this._container.findChildByName("clear_search_button"), isIRegionWindow);
    }

    private get noItemsText(): ITextWindow {
        return asGuarded(this._container.findChildByName("no_items_text"), isITextWindow);
    }

    private get previewFurniName(): ITextWindow {
        return asGuarded(this._container.findChildByName("furni_name"), isITextWindow);
    }

    private get previewWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("preview_image"), isIWidgetWindow);
    }

    private get placeholderPreviewImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("placeholder_preview_image"), isIStaticBitmapWrapperWindow);
    }

    private get withdrawInput(): ITextFieldWindow {
        return asGuarded(this._container.findChildByName("withdraw_input"), isITextFieldWindow);
    }

    private get withdrawButton(): IButtonWindow {
        return asGuarded(this._container.findChildByName("withdraw_btn"), isIButtonWindow);
    }

    private get viewLogsButton(): IButtonWindow {
        return asGuarded(this._container.findChildByName("view_logs_by_furni_btn"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
