import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { MarketplaceModel } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceModel';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import type { IRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';
import type { IRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurniGridView } from '@/com/sulake/habbo/inventory/furni/FurniGridView';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { isILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import { isIRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';
import { isIRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniView implements IInventoryView, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.inventory.furni::FurniView'); }

    private static readonly STATE_NULL: number = 0;
    private static readonly STATE_INITIALIZING: number = 1;
    private static readonly STATE_EMPTY: number = 2;
    private static readonly STATE_CONTENT: number = 3;
    private static readonly UNSEEN_SYMBOL_MARGIN: number = 4;
    private static readonly MAIN_FILTER_IDS: any[] = ["all", "floor_items", "wall_items", "room_layout"];
    private _SafeStr_6536: string = "";

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _view: IWindowContainer;

    declare private _grid: FurniGridView;

    declare private _SafeStr_2134: FurniModel;

    declare private _marketplace: MarketplaceModel;

    declare private _roomEngine: IRoomEngine;

    private _disposed: boolean = false;
    private _SafeStr_3894: number = 0;

    declare private _SafeStr_3317: ILimitedItemPreviewOverlayWidget;

    declare private _SafeStr_3630: IRarityItemPreviewOverlayWidget;

    declare private _SafeStr_2239: IItemListWindow;

    declare private _SafeStr_4136: IButtonWindow;

    declare private _SafeStr_5852: IButtonWindow;

    declare private _SafeStr_5546: IButtonWindow;

    declare private _offerInTradingButton: IButtonWindow;

    declare private _offerInTradingCountButton: ITextFieldWindow;

    declare private _SafeStr_5810: IButtonWindow;

    declare private _SafeStr_5726: IButtonWindow;

    declare private _SafeStr_5626: IButtonWindow;

    private _isInitialized: boolean = false;

    declare private _roomPreviewer: RoomPreviewer;

    private _SafeStr_5315: string = "all";
    private _SafeStr_14291: string = "any";

    constructor(param1: FurniModel, param2: MarketplaceModel, param3: IHabboWindowManager, param4: IAssetLibrary, param5: IRoomEngine) {
        this._SafeStr_2134 = param1;
        this._marketplace = param2;
        this._SafeStr_3052 = param4;
        this._windowManager = param3;
        this._roomEngine = param5;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public get currentPageItems(): GroupItem[] {
        return this._grid ? this._grid.currentPageItems : null;
    }

    public get grid(): FurniGridView {
        return this._grid;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2134 && this._SafeStr_2134.controller) {
                this._SafeStr_2134.controller.removeUpdateReceiver(this);
            }
            this._SafeStr_2134 = null;
            this._marketplace = null;
            this._SafeStr_3052 = null;
            this._windowManager = null;
            this._roomEngine = null;
            if (this._SafeStr_3317) {
                this._SafeStr_3317.dispose();
                this._SafeStr_3317 = null;
            }
            if (this._SafeStr_3630) {
                this._SafeStr_3630.dispose();
                this._SafeStr_3630 = null;
            }
            if (this._view) {
                this._view.dispose();
                this._view = null;
            }
            this._disposed = true;
        }
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        if (this._view == null) {
            return null;
        }
        if (this._view.disposed) {
            return null;
        }
        this.updateActionButtons(false);
        return this._view;
    }

    public setViewToState(): void {
        let _loc1_: number = 0;
        if (!this._SafeStr_2134.isListInited()) {
            _loc1_ = 1;
        } else if (!this._SafeStr_2134.furniData || this._SafeStr_2134.furniData.length == 0) {
            _loc1_ = 2;
        } else {
            _loc1_ = 3;
        }
        if (this._SafeStr_3894 == _loc1_) {
            return;
        }
        this._SafeStr_3894 = _loc1_;
        this.updateContainerVisibility();
    }

    public clearViews(): void {
        this.updateActionView();
    }

    public getFirstThumb(): IWindowContainer {
        return this._grid != null ? this._grid.getFirstThumb() : null;
    }

    public updateActionView(): void {
        let _loc4_: FurnitureItem = null;
        let _loc14_: IStaticBitmapWrapperWindow = null;
        let _loc18_: ITextWindow = null;
        let _loc16_: IRegionWindow = null;
        let _loc5_: string = null;
        let _loc10_: string = null;
        let _loc19_: string = null;
        let _loc8_: string = null;
        let _loc17_: string = null;
        let _loc3_: string = null;
        let _loc20_: string = null;
        let _loc12_: IFurnitureData = null;
        let _loc9_: number = 0;
        let _loc1_: IWidgetWindow = null;
        let _loc11_: IWidgetWindow = null;
        let _loc13_: string = null;
        if (this._view == null) {
            return;
        }
        if (this._view.disposed) {
            return;
        }
        this.updateContainerVisibility();
        let _loc6_: boolean = false;
        let _loc7_: GroupItem = this._SafeStr_2134.getSelectedItem();
        if (_loc7_ != null && _loc7_.peek() != null) {
            if (_loc7_.selectedItemIndex >= 0) {
                _loc4_ = _loc7_.getAt(_loc7_.selectedItemIndex);
                if (!_loc4_) {
                    _loc4_ = _loc7_.peek();
                }
            } else {
                _loc4_ = _loc7_.peek();
            }
            _loc6_ = true;
            _loc5_ = this._roomEngine.getWallItemType(_loc4_.type);
            this._view.findChildByName("nextItemButton").visible = this._view.findChildByName("viewItemButton").visible = !!(_loc5_ && _loc5_.indexOf("external_image_wallitem") != -1);
            this._view.findChildByName("furni_preview_widget").visible = true;
            _loc10_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_wall_type");
            _loc19_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_floor_type");
            _loc8_ = this._roomEngine.getRoomStringValue(this._roomEngine.activeRoomId, "room_landscape_type");
            _loc10_ = _loc10_ && _loc10_.length > 0 ? _loc10_ : "101";
            _loc19_ = _loc19_ && _loc19_.length > 0 ? _loc19_ : "101";
            _loc8_ = _loc8_ && _loc8_.length > 0 ? _loc8_ : "1.1";
            this._roomPreviewer.reset(false);
            this._roomPreviewer.updateObjectRoom(_loc19_, _loc10_, _loc8_);
            if (_loc4_.category == 2 || _loc4_.category == 3 || _loc4_.category == 4) {
                this._roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);
                _loc17_ = _loc4_.category == 3 ? _loc7_.stuffData.getLegacyString() : _loc19_;
                _loc3_ = _loc4_.category == 2 ? _loc7_.stuffData.getLegacyString() : _loc10_;
                _loc20_ = _loc4_.category == 4 ? _loc7_.stuffData.getLegacyString() : _loc8_;
                this._roomPreviewer.updateObjectRoom(_loc17_, _loc3_, _loc20_);
                if (_loc4_.category == 4) {
                    _loc12_ = this._SafeStr_2134.controller.getFurnitureDataByName("window_double_default", "i");
                    this._roomPreviewer.addWallItemIntoRoom(_loc12_.id, new Vector3d(90, 0, 0), _loc12_.customParams);
                }
            } else if (_loc7_.isWallItem) {
                this._roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);
                this._roomPreviewer.addWallItemIntoRoom(_loc7_.type, new Vector3d(90, 0, 0), _loc4_.stuffData.getLegacyString());
            } else {
                this._roomPreviewer.updateRoomWallsAndFloorVisibility(false, true);
                this._roomPreviewer.addFurnitureIntoRoom(_loc7_.type, new Vector3d(90, 0, 0), _loc7_.stuffData, _loc7_.extra.toString());
            }
            _loc14_ = asGuarded(this._view.findChildByName("tradeable_icon"), isIStaticBitmapWrapperWindow);
            _loc18_ = asGuarded(this._view.findChildByName("tradeable_number"), isITextWindow);
            _loc16_ = asGuarded(this._view.findChildByName("tradeable_info_region"), isIRegionWindow);
            if (_loc14_ != null && _loc18_ != null && _loc16_ != null) {
                _loc9_ = _loc7_.getTradeableCount();
                if (_loc9_ == 0) {
                    _loc14_.assetUri = "inventory_furni_no_trade_icon";
                    _loc18_.visible = false;
                    _loc16_.toolTipCaption = "${inventory.furni.preview.not_tradeable}";
                    _loc18_.filters = [];
                } else {
                    _loc14_.assetUri = "inventory_furni_trade_icon";
                    _loc18_.visible = true;
                    _loc18_.text = String(_loc9_);
                    _loc16_.toolTipCaption = "${inventory.furni.preview.tradeable_amount}";
                    _loc18_.filters = [new GlowFilter(16777215, 1, 3, 3, 300)];
                }
            }
            _loc14_ = asGuarded(this._view.findChildByName("recyclable_icon"), isIStaticBitmapWrapperWindow);
            _loc18_ = asGuarded(this._view.findChildByName("recyclable_number"), isITextWindow);
            _loc16_ = asGuarded(this._view.findChildByName("recyclable_info_region"), isIRegionWindow);
            if (_loc14_ != null && _loc18_ != null && _loc16_ != null) {
                _loc9_ = _loc7_.getRecyclableCount();
                if (_loc9_ == 0) {
                    _loc14_.assetUri = "inventory_furni_no_recycle_icon";
                    _loc18_.visible = false;
                    _loc16_.toolTipCaption = "${inventory.furni.preview.not_recyclable}";
                    _loc18_.filters = [];
                } else {
                    _loc14_.assetUri = "inventory_furni_recycle_icon";
                    _loc18_.visible = true;
                    _loc18_.text = String(_loc9_);
                    _loc16_.toolTipCaption = "${inventory.furni.preview.recyclable_amount}";
                    _loc18_.filters = [new GlowFilter(16777215, 1, 3, 3, 300)];
                }
            }
            _loc1_ = castGuarded(this._view.findChildByName("unique_limited_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            if (_loc4_.stuffData && _loc4_.stuffData.uniqueSerialNumber > 0) {
                if (this._SafeStr_3317 == null) {
                    this._SafeStr_3317 = castGuarded(_loc1_.widget, isILimitedItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemPreviewOverlayWidget");
                }
                this._SafeStr_3317.serialNumber = _loc4_.stuffData.uniqueSerialNumber;
                this._SafeStr_3317.seriesSize = _loc4_.stuffData.uniqueSeriesSize;
                _loc1_.visible = true;
            } else {
                _loc1_.visible = false;
            }
            _loc11_ = castGuarded(this._view.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            if (_loc4_.stuffData && _loc4_.stuffData.rarityLevel >= 0) {
                if (this._SafeStr_3630 == null) {
                    this._SafeStr_3630 = castGuarded(_loc11_.widget, isIRarityItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemPreviewOverlayWidget");
                }
                this._SafeStr_3630.rarityLevel = _loc4_.stuffData.rarityLevel;
                _loc11_.visible = true;
            } else {
                _loc11_.visible = false;
            }
        } else {
            this._view.findChildByName("furni_preview_widget").visible = this._view.findChildByName("nextItemButton").visible = this._view.findChildByName("viewItemButton").visible = false;
            _loc14_ = asGuarded(this._view.findChildByName("tradeable_icon"), isIStaticBitmapWrapperWindow);
            _loc18_ = asGuarded(this._view.findChildByName("tradeable_number"), isITextWindow);
            _loc16_ = asGuarded(this._view.findChildByName("tradeable_info_region"), isIRegionWindow);
            if (_loc14_ && _loc18_ && _loc16_) {
                _loc14_.assetUri = "";
                _loc18_.visible = false;
            }
            _loc14_ = asGuarded(this._view.findChildByName("recyclable_icon"), isIStaticBitmapWrapperWindow);
            _loc18_ = asGuarded(this._view.findChildByName("recyclable_number"), isITextWindow);
            _loc16_ = asGuarded(this._view.findChildByName("recyclable_info_region"), isIRegionWindow);
            if (_loc14_ && _loc18_ && _loc16_) {
                _loc14_.assetUri = "";
                _loc18_.visible = false;
            }
        }
        let _loc2_: boolean = this._SafeStr_2134.isTradingOpen;
        this.updateActionButtons(_loc6_);
        if (_loc7_ && _loc4_) {
            this._view.findChildByName("furni_name").caption = _loc7_.name;
            if (_loc4_ && this._roomEngine.getWallItemType(_loc4_.type) == "external_image_wallitem") {
                this._view.findChildByName("furni_description").caption = _loc4_.stuffData.getJSONValue("m");
            } else {
                this._view.findChildByName("furni_description").caption = _loc7_.description;
            }
        } else {
            this._view.findChildByName("furni_name").caption = "";
            this._view.findChildByName("furni_description").caption = "";
        }
        let _loc15_: ITextWindow = asGuarded(this._view.findChildByName("furni_extra"), isITextWindow);
        if (_loc15_ != null) {
            if (_loc4_ != null && _loc4_.stuffData != null) {
                if (_loc4_.stuffData.rarityLevel >= 0) {
                    _loc13_ = (asInstanceOf(_loc4_.stuffData, MapStuffData)).getValue("rarity");
                    if (_loc13_ != null) {
                        this._windowManager.registerLocalizationParameter("inventory.rarity", "rarity", String(_loc4_.stuffData.rarityLevel));
                        _loc15_.text = this._SafeStr_2134.localization.getLocalization("inventory.rarity");
                        _loc15_.visible = true;
                    }
                } else if (_loc4_.stuffData.chestName != "") {
                    _loc15_.text = this._SafeStr_2134.localization.getLocalizationWithParams("inventory.chest_name", "", "chest_name", _loc4_.stuffData.chestName);
                    _loc15_.visible = true;
                } else {
                    _loc15_.text = "";
                    _loc15_.visible = false;
                }
            } else {
                _loc15_.text = "";
                _loc15_.visible = false;
            }
        }
        this.updateRentedItem();
    }

    public displayItemInfo(param1: GroupItem): void {
        if (this._view == null) {
            return;
        }
        if (this._view.disposed) {
            return;
        }
        let _loc2_: FurnitureItem = param1.peek();
        if (_loc2_.isWallItem) {
            this._roomPreviewer.addWallItemIntoRoom(_loc2_.type, new Vector3d(90, 0, 0), _loc2_.stuffData.getLegacyString());
        } else {
            this._roomPreviewer.addFurnitureIntoRoom(_loc2_.type, new Vector3d(90, 0, 0), _loc2_.stuffData);
        }
        this._SafeStr_4136.disable();
        this._offerInTradingButton.disable();
        this._offerInTradingCountButton.disable();
    }

    public addItems(param1: GroupItem[]): void {
        if (this._grid) {
            this._grid.setItems(param1);
        }
    }

    public updateGridFilters(): void {
        if (this._view == null || Boolean(this._view.disposed)) {
            return;
        }
        if (this._SafeStr_2134.controller.getSubCategoryViewId() == "wired_trading" && this._SafeStr_2134.controller.wiredTradingModel != null && this._SafeStr_2134.controller.wiredTradingModel.running) {
            this.updateGridFiltersWired();
        } else {
            this.updateGridFiltersNormal();
        }
    }

    private updateGridFiltersNormal(): void {
        let _loc5_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
        let _loc3_: IDropMenuWindow = asGuarded(this._view.findChildByName("placement.options"), isIDropMenuWindow);
        let _loc4_: string = this._view.findChildByName("filter").caption;
        let _loc2_: string = this.getSelectedFilterId(_loc5_, FurniView.MAIN_FILTER_IDS);
        let _loc1_: string = this.getSelectedFilterId(_loc3_, this.getTypeFilterIds(_loc2_));
        this._SafeStr_5315 = _loc2_;
        this._SafeStr_14291 = _loc1_;
        this._grid.setFilter(_loc2_, _loc1_, this._SafeStr_2134.showingRentedFurni, this._SafeStr_2134.controller.mergeRentFurni, _loc4_, this._SafeStr_2134.showingNfts);
    }

    private updateGridFiltersWired(): void {
        let _loc4_: WiredTradeRequirementsModel = this._SafeStr_2134.controller.wiredTradingModel.tradeRequirementsModel;
        let _loc6_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
        let _loc3_: IDropMenuWindow = asGuarded(this._view.findChildByName("placement.options"), isIDropMenuWindow);
        let _loc5_: string = this._view.findChildByName("filter").caption;
        let _loc2_: string = this.getSelectedFilterId(_loc6_, FurniView.MAIN_FILTER_IDS);
        let _loc1_: string = this.getSelectedFilterId(_loc3_, this.getTypeFilterIds(_loc2_));
        this._SafeStr_5315 = _loc2_;
        this._SafeStr_14291 = _loc1_;
        this._grid.setFilterByWired(_loc2_, _loc1_, _loc5_, _loc4_);
    }

    public resetFilters(param1: string): void {
        let _loc2_: IDropMenuWindow = null;
        if (this._SafeStr_6536 != param1) {
            _loc2_ = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
            _loc2_.selection = 0;
            this.populateTypeFilterOptions("all", "any");
            this._view.findChildByName("filter").caption = "";
            this._view.findChildByName("clear_filter_button").visible = false;
        }
        this._SafeStr_6536 = param1;
        this.updateGridFilters();
    }

    private init(): void {
        this._view = this._SafeStr_2134.controller.view.getView("furni");
        this._view.enableLookupCache();
        this._view.visible = false;
        this._view.procedure = this.windowEventProc;
        let _loc1_: IItemGridWindow = asGuarded(this._view.findChildByName("item_grid"), isIItemGridWindow);
        let _loc3_: IItemListWindow = asGuarded(this._view.findChildByName("item_grid_pages"), isIItemListWindow);
        this._grid = new FurniGridView(_loc1_, _loc3_);
        this.populateFilterOptions();
        this._SafeStr_2239 = asGuarded(this._view.findChildByName("preview_element_list"), isIItemListWindow);
        this._SafeStr_4136 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("placeinroom_btn")), isIButtonWindow);
        this._SafeStr_5726 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("extendrent_btn")), isIButtonWindow);
        this._SafeStr_5626 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("buyrenteditem_btn")), isIButtonWindow);
        this._SafeStr_5852 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("goto_room_btn")), isIButtonWindow);
        this._SafeStr_5810 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("use_btn")), isIButtonWindow);
        this._offerInTradingCountButton = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("offertotrade_cnt")), isITextFieldWindow);
        this._offerInTradingButton = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("offertotrade_btn")), isIButtonWindow);
        this._SafeStr_5546 = asGuarded(this._SafeStr_2239.removeListItem(this._SafeStr_2239.getListItemByName("sell_btn")), isIButtonWindow);
        let _loc2_: IRoomPreviewerWidget = asGuarded((asGuarded(this._view.findChildByName("furni_preview_widget"), isIWidgetWindow)).widget, isIRoomPreviewerWidget);
        this._roomPreviewer = _loc2_.roomPreviewer;
        this._SafeStr_2134.controller.registerUpdateReceiver(this, 1);
        this.setViewToState();
        this._isInitialized = true;
    }

    private fixPreviewHeightInTrading(): void {
        let _loc1_: IWidgetWindow = asGuarded(this._view.findChildByName("furni_preview_widget"), isIWidgetWindow);
        let _loc2_: IRoomPreviewerWidget = asGuarded((asGuarded(this._view.findChildByName("furni_preview_widget"), isIWidgetWindow)).widget, isIRoomPreviewerWidget);
        _loc2_.roomPreviewer.modifyRoomCanvas(_loc1_.width, _loc1_.height);
    }

    private updateActionButtons(param1: boolean): void {
        if (this._SafeStr_2134.isTradingOpen) {
            this.fixPreviewHeightInTrading();
        }
        this.removeButtons();
        let _loc2_: boolean = this._SafeStr_2134.isTradingOpen;
        let _loc6_: GroupItem = this._SafeStr_2134.getSelectedItem();
        let _loc3_: FurnitureItem = null;
        if (_loc6_) {
            _loc3_ = _loc6_.peek();
        }
        if (_loc3_ == null) {
            return;
        }
        let _loc10_: IFurnitureData = this._SafeStr_2134.controller.getFurnitureData(_loc3_.type, _loc3_.isWallItem ? "i" : "s");
        let _loc9_: boolean = !!(param1 && this._marketplace && this._marketplace.isEnabled && _loc3_.sellable && !this._SafeStr_2134.controller.sessionData.isAccountSafetyLocked() && !_loc2_);
        let _loc5_: boolean = this._SafeStr_2134.isPrivateRoom && param1 && (_loc3_.category == 16 || _loc3_.category == 14 || _loc3_.category == 15 || _loc3_.category == 13 || _loc3_.category == 20);
        let _loc4_: boolean = true;
        if (_loc3_.isRented) {
            if (_loc3_.flatId > -1) {
                _loc4_ = false;
            }
        }
        let _loc11_: boolean = _loc3_.flatId > -1;
        let _loc7_: boolean = !!(_loc3_.isRented && _loc4_ && _loc10_ && _loc10_.rentCouldBeUsedForBuyout);
        let _loc8_: boolean = !!(_loc3_.isRented && _loc4_ && _loc10_ && _loc10_.purchaseCouldBeUsedForBuyout);
        if (_loc10_ && _loc10_.isExternalImageType) {
            _loc9_ = false;
        }
        this.updateButtonAvailability(this._SafeStr_4136, !_loc2_ && _loc4_);
        this.updateButtonAvailability(this._SafeStr_5726, !_loc2_ && _loc7_);
        this.updateButtonAvailability(this._SafeStr_5626, !_loc2_ && _loc8_);
        this.updateButtonAvailability(this._SafeStr_5852, !_loc2_ && _loc11_);
        this.updateButtonAvailability(this._offerInTradingCountButton, _loc2_ && this._SafeStr_2134.controller.getBoolean("multi.item.trading.enabled"));
        this.updateButtonAvailability(this._offerInTradingButton, _loc2_);
        this.updateButtonAvailability(this._SafeStr_5546, _loc9_);
        this.updateButtonAvailability(this._SafeStr_5810, _loc5_);
        if (param1 && this._SafeStr_2134.isPrivateRoom) {
            this._SafeStr_4136.enable();
        } else {
            this._SafeStr_4136.disable();
        }
        if (param1 && _loc6_ != null && _loc3_ != null && this._SafeStr_2134.canUserOfferToTrade()) {
            if (_loc6_.getUnlockedCount() && _loc3_.tradeable) {
                this._offerInTradingButton.enable();
                this._offerInTradingCountButton.enable();
            } else {
                this._offerInTradingButton.disable();
                this._offerInTradingCountButton.disable();
            }
        } else {
            this._offerInTradingButton.disable();
            this._offerInTradingCountButton.disable();
        }
    }

    private updateButtonAvailability(param1: IInteractiveWindow, param2: boolean): void {
        if (this._SafeStr_2239.getListItemByName(param1.name) == null) {
            if (param2) {
                this._SafeStr_2239.addListItem(param1);
            }
        } else if (!param2) {
            this._SafeStr_2239.removeListItem(param1);
        }
    }

    private removeButtons(): void {
        this._SafeStr_2239.removeListItem(this._SafeStr_4136);
        this._SafeStr_2239.removeListItem(this._SafeStr_5726);
        this._SafeStr_2239.removeListItem(this._SafeStr_5626);
        this._SafeStr_2239.removeListItem(this._SafeStr_5852);
        this._SafeStr_2239.removeListItem(this._SafeStr_5810);
        this._SafeStr_2239.removeListItem(this._offerInTradingCountButton);
        this._SafeStr_2239.removeListItem(this._offerInTradingButton);
        this._SafeStr_2239.removeListItem(this._SafeStr_5546);
    }

    private updateContainerVisibility(): void {
        if (!this._isInitialized) {
            return;
        }
        if (this._SafeStr_2134.controller.currentCategoryId != "furni" && this._SafeStr_2134.controller.currentCategoryId != "rentables") {
            return;
        }
        let _loc1_: IWindowContainer = this._SafeStr_2134.controller.view.loadingContainer;
        let _loc4_: IWindowContainer = this._SafeStr_2134.controller.view.emptyContainer;
        let _loc5_: IWindowContainer = asGuarded(this._view.findChildByName("grid_container"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(this._view.findChildByName("preview_container"), isIWindowContainer);
        let _loc3_: IWindowContainer = asGuarded(this._view.findChildByName("options_container"), isIWindowContainer);
        switch (this._SafeStr_3894 - 1) {
            case 0:
                if (_loc1_) {
                    _loc1_.visible = true;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                _loc5_.visible = false;
                _loc2_.visible = false;
                _loc3_.visible = false;
                break;
            case 1:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = true;
                }
                _loc5_.visible = false;
                _loc2_.visible = false;
                _loc3_.visible = false;
                break;
            case 2:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                _loc5_.visible = true;
                _loc2_.visible = true;
                _loc3_.visible = true;
        }
    }

    private showNextPreviewItem(): void {
        this._SafeStr_2134.getSelectedItem().selectedItemIndex++;
        this.updateActionView();
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc10_: string;
        let _loc4_: GroupItem = null;
        let _loc5_: FurnitureItem = null;
        let _loc7_: number = 0;
        let _loc8_: GroupItem = null;
        let _loc3_: IFurnitureItem = null;
        let _loc6_: WindowKeyboardEvent = null;
        let _loc9_: string = null;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "placeinroom_btn":
                case "furni_preview_region":
                    if (!this._SafeStr_2134.isTradingOpen) {
                        this._SafeStr_2134.requestSelectedFurniPlacement(false);
                    }
                    break;
                case "nextItemButton":
                    this.showNextPreviewItem();
                    break;
                case "viewItemButton":
                    _loc4_ = this._SafeStr_2134.getSelectedItem();
                    _loc5_ = _loc4_.getAt(_loc4_.selectedItemIndex);
                    if (!_loc5_) {
                        _loc5_ = _loc4_.peek();
                    }
                    this._roomEngine.showUseProductSelection(_loc5_.ref, _loc5_.type, _loc5_.id);
                    break;
                case "goto_room_btn":
                    this._SafeStr_2134.gotoRoom();
                    break;
                case "offertotrade_btn":
                    _loc7_ = Math.max(1, Number(this._offerInTradingCountButton.caption) | 0) | 0;
                    if (_loc7_ != (Number(this._offerInTradingCountButton.caption) | 0)) {
                        this._offerInTradingCountButton.caption = String(_loc7_);
                    }
                    this._SafeStr_2134.requestSelectedFurniToTrading(_loc7_, this._offerInTradingCountButton);
                    break;
                case "sell_btn":
                    this._SafeStr_2134.requestSelectedFurniSelling();
                    break;
                case "use_btn":
                    this._SafeStr_2134.showUseProductSelection();
                    break;
                case "extendrent_btn":
                    this._SafeStr_2134.extendRentPeriod();
                    break;
                case "buyrenteditem_btn":
                    this._SafeStr_2134.buyRentedItem();
                    break;
                case "clear_filter_button":
                    this._view.findChildByName("filter").caption = "";
                    param2.visible = false;
                    this.updateGridFilters();
                    break;
                default:
                    this._SafeStr_2134.cancelFurniInMover();
            }
        } else if (param1.type == "WME_DOWN") {
            _loc10_ = param2.name;
            if ("furni_preview_region" === _loc10_) {
                _loc8_ = this._SafeStr_2134.getSelectedItem();
                if (_loc8_ == null) {
                    return;
                }
                _loc3_ = _loc8_.peek();
                if (_loc3_.category == 2 || _loc3_.category == 3 || _loc3_.category == 4) {
                    return;
                }
                if (!this._SafeStr_2134.isTradingOpen) {
                    this._SafeStr_2134.requestSelectedFurniPlacement(false);
                }
            }
        } else if (param1.type == "WKE_KEY_UP") {
            _loc6_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc10_ = param2.name;
            if ("filter" === _loc10_) {
                this._view.findChildByName("clear_filter_button").visible = param2.caption.length > 0;
                if (_loc6_.keyCode == 27) {
                    param2.caption = "";
                    this._view.findChildByName("clear_filter_button").visible = false;
                    this.updateGridFilters();
                } else if (_loc6_.keyCode == 13) {
                    this.updateGridFilters();
                }
            }
        }
        if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "filter.options":
                    _loc9_ = this.getSelectedFilterId(isIDropMenuWindow(param2) ? param2 : null, FurniView.MAIN_FILTER_IDS);
                    this.populateTypeFilterOptions(_loc9_, this.getPreservedTypeFilter(_loc9_));
                    this.updateGridFilters();
                    break;
                case "placement.options":
                    this.updateGridFilters();
            }
        }
    };

    public resetFilterOption(): void {
        let _loc1_: IDropMenuWindow = null;
        if (this._view) {
            _loc1_ = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
            _loc1_.selection = 0;
            this.populateTypeFilterOptions("all", "any");
            this.updateGridFilters();
        }
    }

    private populateFilterOptions(): void {
        let _loc3_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
        let _loc1_: any[] = [];
        for (const _loc2_ of FurniView.MAIN_FILTER_IDS ?? []) {
            _loc1_.push(this.getMainFilterLabel(stringOrNull(_loc2_)));
        }
        _loc3_.populate(_loc1_);
        _loc3_.selection = 0;
        this.populateTypeFilterOptions("all", "any");
        this._view.findChildByName("filter").caption = "";
        this._view.findChildByName("items.shown").visible = false;
        this._view.invalidate();
    }

    private populateTypeFilterOptions(param1: string, param2: string): void {
        let _loc6_: IDropMenuWindow = asGuarded(this._view.findChildByName("placement.options"), isIDropMenuWindow);
        let _loc3_: any[] = this.getTypeFilterIds(param1);
        let _loc5_: any[] = [];
        for (const _loc4_ of _loc3_ ?? []) {
            _loc5_.push(this.getTypeFilterLabel(stringOrNull(_loc4_)));
        }
        _loc6_.populate(_loc5_);
        _loc6_.selection = this.findFilterIndex(_loc3_, param2);
    }

    private getPreservedTypeFilter(param1: string): string {
        return this.findFilterIndex(this.getTypeFilterIds(param1), this._SafeStr_14291) >= 0 ? this._SafeStr_14291 : "any";
    }

    private getTypeFilterIds(param1: string): any[] {
        switch (param1) {
            case "all":
            case "floor_items":
                break;
            case "wall_items":
                return ["any", "windows", "dimmers", "stickies", "paintings", "collectibles", "tradable", "non_tradable", "recyclable"];
            case "room_layout":
                return ["any", "floors", "wallpapers", "landscape"];
            default:
                return ["any"];
        }
        return ["any", "sittable", "layable", "tiles_or_rugs", "ltd", "wired", "credit_furni", "clothes", "pet_food", "collectibles", "tradable", "non_tradable", "recyclable"];
    }

    private getSelectedFilterId(param1: IDropMenuWindow, param2: any[]): string {
        if (param2 == null || param2.length == 0) {
            return "";
        }
        let _loc3_: number = param1 != null ? param1.selection : 0;
        if (_loc3_ < 0 || _loc3_ >= param2.length) {
            _loc3_ = 0;
        }
        return String(param2[_loc3_]);
    }

    private findFilterIndex(param1: any[], param2: string): number {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] == param2) {
                return _loc3_;
            }
            _loc3_++;
        }
        return 0;
    }

    private getMainFilterLabel(param1: string): string {
        return this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.filter.main." + param1);
    }

    private getTypeFilterLabel(param1: string): string {
        return this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.filter.type." + param1);
    }

    public updateRentedItem(): void {
        if (this._SafeStr_2134 == null) {
            return;
        }
        let _loc2_: GroupItem = this._SafeStr_2134.getSelectedItem();
        let _loc1_: FurnitureItem = null;
        if (_loc2_) {
            _loc1_ = _loc2_.peek();
        }
        if (_loc1_ == null) {
            return;
        }
        if (!_loc1_.isRented) {
            return;
        }
        let _loc3_: IWindow = asGuarded(this._view.findChildByName("furni_extra"), isITextWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.visible = true;
        if (_loc1_.hasRentPeriodStarted) {
            this._SafeStr_2134.controller.localization.registerParameter("inventory.rent.expiration", "time", FriendlyTime.getFriendlyTime(this._SafeStr_2134.controller.localization, _loc1_.secondsToExpiration));
            _loc3_.caption = this._SafeStr_2134.controller.localization.getLocalization("inventory.rent.expiration");
        } else {
            this._SafeStr_2134.controller.localization.registerParameter("inventory.rent.inactive", "time", FriendlyTime.getFriendlyTime(this._SafeStr_2134.controller.localization, _loc1_.secondsToExpiration));
            _loc3_.caption = this._SafeStr_2134.controller.localization.getLocalization("inventory.rent.inactive");
        }
    }

    public update(param1: number): void {
        if (this._roomPreviewer != null) {
            this._roomPreviewer.updatePreviewRoomView();
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
