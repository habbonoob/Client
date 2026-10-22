import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NamedTextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedTextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { ItemTypeTableObject } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/itemtable/ItemTypeTableObject';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class ItemTypeSelectionPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::ItemTypeSelectionPreset'); }

    public static readonly COL_FURNI_CODE: string = "furni_code";
    public static readonly COL_FURNI_NAME: string = "furni_name";
    public static readonly COL_FURNI_TYPE: string = "furni_type";
    private static readonly TYPE_POSTER: string = "poster";
    private static readonly POSTER_IDS: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 83, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 520, 521, 522, 523, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008];

    declare private _SafeStr_2808: IItemListWindow;

    declare private _allFurnis: ItemTypeTableObject[];

    declare private _furniCodePreset: NamedTextInputPreset;

    declare private _searchPreset: NamedTextInputPreset;

    declare private _SafeStr_3207: IWindowContainer;

    declare private _SafeStr_2737: TableView;

    declare private _showCountPreset: TextPreset;

    declare private _selectedItem: ChestItemType;

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

    private _SafeStr_4039: boolean = false;
    private _listeners: any[] = [];

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._SafeStr_2808 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_2808.spacing = param3.genericVerticalSpacing;
        this.createAllFurnis();
        this._furniCodePreset = param2.createNamedTextInput(new TextInputParam("", -1, "${wiredcontracts.element.itemtype.furni_code.placeholder}", 150, null, false), "${wiredcontracts.element.itemtype.furni_code}");
        this._searchPreset = param2.createNamedTextInput(new TextInputParam("", 220, "", 150), "${wiredcontracts.element.itemtype.search}");
        this._SafeStr_3207 = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._SafeStr_3207.width = 350;
        this._SafeStr_3207.height = 234;
        let _loc4_: TextParam = new TextParam(1);
        this._showCountPreset = param2.createText("-", _loc4_);
        this._showCountPreset.halfBlend();
        this._SafeStr_2808.addListItem(this._furniCodePreset.window);
        this._SafeStr_2808.addListItem(this._searchPreset.window);
        this._SafeStr_2808.addListItem(this._SafeStr_3207);
        this._SafeStr_2808.addListItem(this._showCountPreset.window);
        this._searchPreset.addEventListener("WE_CHANGE", this.onSearchChanged);
        this.createTableView();
        this.refreshShowCount();
    }

    private refreshShowCount(): void {
        let _loc1_: string = this.localizations.getLocalizationWithParams("wiredcontracts.element.show_count", "", "amount", this._SafeStr_2737.rowCount);
        this._showCountPreset.text = _loc1_;
    }

    private createAllFurnis(): void {
        let item: IFurnitureData;
        let tableObject: ItemTypeTableObject;
        let fullCode: string;
        let localizedName: string;
        let chestItemType: ChestItemType;
        let posterTypeId: number = 0;
        let localization: IHabboLocalizationManager;
        let posterId: number = 0;
        let key: string;
        this._allFurnis = [];
        let sessionData: ISessionDataManager = this._roomEvents.sessionDataManager;
        let allFloorItemData: any[] = sessionData.getAllFloorItemDatas();
        let allWallItemData: any[] = sessionData.getAllWallItemDatas();
        for (item of allFloorItemData ?? []) {
            fullCode = item.fullName;
            if (fullCode != "") {
                localizedName = item.localizedName;
                if (localizedName == "") {
                    localizedName = fullCode;
                }
                chestItemType = new ChestItemType(false, item.id, null);
                tableObject = new ItemTypeTableObject(chestItemType, localizedName, fullCode);
                this._allFurnis.push(tableObject);
            }
        }
        posterTypeId = -1;
        for (item of allWallItemData ?? []) {
            if (fullCode != "") {
                if (item.className == "poster") {
                    posterTypeId = item.id;
                } else {
                    fullCode = item.fullName;
                    localizedName = item.localizedName;
                    if (localizedName == "") {
                        localizedName = fullCode;
                    }
                    chestItemType = new ChestItemType(true, item.id, null);
                    tableObject = new ItemTypeTableObject(chestItemType, localizedName, fullCode);
                    this._allFurnis.push(tableObject);
                }
            }
        }
        localization = this._roomEvents.localization;
        if (posterTypeId != -1) {
            for (posterId of ItemTypeSelectionPreset.POSTER_IDS ?? []) {
                fullCode = "poster*" + posterId;
                key = "poster_" + posterId + "_name";
                localizedName = localization.getLocalization(key, key);
                chestItemType = new ChestItemType(true, posterTypeId, String(posterId));
                tableObject = new ItemTypeTableObject(chestItemType, localizedName, fullCode);
                this._allFurnis.push(tableObject);
            }
        }
        this._allFurnis.sort((param1: ItemTypeTableObject, param2: ItemTypeTableObject): number => {
             return param1.localizedName.localeCompare(param2.localizedName);
         });
    }

    private createTableView(): void {
        this._SafeStr_2737 = new TableView(this._roomEvents.windowManager, this._SafeStr_3207, false, false);
        let _loc1_: any[] = [new TableColumn("furni_name", "${wiredcontracts.element.itemtype.col.furni_name}", 0.5, "left"), new TableColumn("furni_code", "${wiredcontracts.element.itemtype.col.furni_code}", 0.3, "left"), new TableColumn("furni_type", "${wiredcontracts.element.itemtype.col.furni_type}", 0.2, "left")];
        this._SafeStr_2737.initialize(Array.from(_loc1_), true, true);
        this._SafeStr_2737.onRowClickedCallback = this.onListItemClicked;
        this._SafeStr_2737.setObjects(Array.from(this._allFurnis));
        this._SafeStr_4039 = true;
    }

    private onListItemClicked = (param1: ItemTypeTableObject): void => {
        if (param1 == null) {
            return;
        }
        this.selectedItem = param1.chestItemType;
    };

    public get selectedItem(): ChestItemType {
        return this._selectedItem;
    }

    public get furniDataForSelectedItem(): IFurnitureData {
        if (this._selectedItem == null) {
            return null;
        }
        let _loc1_: ISessionDataManager = this._roomEvents.sessionDataManager;
        if (this._selectedItem.isWallItem) {
            return _loc1_.getWallItemData(this._selectedItem.typeId);
        }
        return _loc1_.getFloorItemData(this._selectedItem.typeId);
    }

    public resetInteractions(): void {
        this._ignoreListeners = true;
        this._searchPreset.text = "";
        this._ignoreListeners = false;
        this.updateFilters();
        this._SafeStr_2737.resetScrollingNextUpdate();
    }

    private onSearchChanged = (param1: WindowEvent): void => {
        if (this._ignoreListeners) {
            return;
        }
        this.updateFilters();
    };

    private updateFilters(): void {
        let _loc1_: any;
        let _loc2_: any = undefined;
        let _loc4_: any[] = null;
        let _loc3_: string = this._searchPreset.text.toLowerCase();
        if (_loc3_.length < 2) {
            if (this._SafeStr_4039) {
                return;
            }
            _loc2_ = this._allFurnis;
            this._SafeStr_4039 = true;
        } else {
            _loc4_ = _loc3_.split(" ");
            _loc2_ = [];
            for (const _loc5_ of this._allFurnis ?? []) {
                let _loc7_: number = 0;
                let _loc6_: any[] = _loc4_;
                do {
                    for (_loc1_ of _loc6_ ?? []) {
                    }
                    _loc2_.push(_loc5_);
                    break;
                } while (_loc5_.matchesSubstring(_loc3_));
            }
            this._SafeStr_4039 = false;
        }
        this._SafeStr_2737.setObjects(Array.from(_loc2_));
        this.refreshShowCount();
    }

    public set selectedItem(param1: ChestItemType) {
        let _loc3_: IFurnitureData = null;
        this._selectedItem = param1;
        this.notifyListeners(param1);
        if (param1 == null) {
            this._furniCodePreset.text = "";
            return;
        }
        let _loc2_: ISessionDataManager = this._roomEvents.sessionDataManager;
        if (param1.isWallItem) {
            _loc3_ = _loc2_.getWallItemData(param1.typeId);
        } else {
            _loc3_ = _loc2_.getFloorItemData(param1.typeId);
        }
        if (_loc3_ == null) {
            this._selectedItem = null;
            this._furniCodePreset.text = "";
            this.notifyListeners(null);
            return;
        }
        if (param1.isWallItem && _loc3_.className == "poster") {
            this._furniCodePreset.text = "poster*" + param1.legacyPosterId;
            return;
        }
        this._furniCodePreset.text = _loc3_.fullName;
    }

    public addListener(param1: (...args: any[]) => any): void {
        this._listeners.push(param1);
    }

    private notifyListeners(param1: ChestItemType): void {
        for (const _loc2_ of this._listeners ?? []) {
            _loc2_(param1);
        }
    }

    public override get window(): IWindow {
        return this._SafeStr_2808;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2808.width = param1;
        this._furniCodePreset.resizeToWidth(param1);
        this._searchPreset.resizeToWidth(param1);
        this._showCountPreset.resizeToWidth(param1);
        let _loc2_: number = this._SafeStr_3207.width;
        let _loc3_: number = param1;
        if (_loc2_ != _loc3_) {
            this._SafeStr_3207.width = _loc3_;
            this._SafeStr_2737.resizeHorizontally();
        }
    }

    protected override get childPresets(): any[] {
        return [this._furniCodePreset, this._searchPreset, this._showCountPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2737 != null) {
            this._SafeStr_2737.dispose();
            this._SafeStr_2737 = null;
        }
        super.dispose();
        if (this._SafeStr_2808 != null) {
            this._SafeStr_2808.dispose();
            this._SafeStr_2808 = null;
        }
        this._allFurnis = null;
        this._furniCodePreset = null;
        this._searchPreset = null;
        this._SafeStr_3207 = null;
        this._selectedItem = null;
        this._showCountPreset = null;
        this._listeners = null;
    }
}
