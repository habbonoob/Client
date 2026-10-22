import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurniSlotItem } from '@/com/sulake/habbo/catalog/recycler/FurniSlotItem';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/inventory/Util';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';

export class InventoryMainView {
    static { registerClassName(this, 'com.sulake.habbo.inventory::InventoryMainView'); }

    private static readonly COUNTER_MARGIN: number = 3;
    private readonly DEFAULT_VIEW_LOCATION: Point = new Point(120, 150);

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _SafeStr_2133: IFrameWindow;

    declare private _SafeStr_2544: string;

    declare private _SafeStr_5461: IWindowContainer;

    declare private _SafeStr_3315: string;

    declare private _SafeStr_5925: IWindowContainer;

    declare private _controller: HabboInventory;

    declare private _toolbar: IHabboToolbar;

    declare private _SafeStr_4108: IWindowContainer;

    declare private _SafeStr_3606: IWindowContainer;

    declare private _SafeStr_3966: IWindowContainer;

    declare private _SafeStr_4208: IWindowContainer;

    declare private _SafeStr_3859: IWindowContainer;

    declare private _SafeStr_4210: IWindowContainer;

    declare private _SafeStr_5886: Map<any, any>;

    declare private _SafeStr_5890: ITabButtonWindow;

    declare private _SafeStr_3964: boolean;
    static { (this.prototype as any)._SafeStr_3964 = false; }

    declare private _SafeStr_6668: number;
    static { (this.prototype as any)._SafeStr_6668 = 0; }

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._controller = param1;
        this._SafeStr_3052 = param3;
        this._windowManager = param2;
    }

    public get isVisible(): boolean {
        return this._SafeStr_2133 ? this._SafeStr_2133.visible : false;
    }

    public get isActive(): boolean {
        return this._SafeStr_2133 ? this._SafeStr_2133.getStateFlag(1) : false;
    }

    public get emptyContainer(): IWindowContainer {
        if (!this._SafeStr_2133) {
            return null;
        }
        return asGuarded(this._SafeStr_2133.findChildByName("empty_container"), isIWindowContainer);
    }

    public get loadingContainer(): IWindowContainer {
        if (!this._SafeStr_2133) {
            return null;
        }
        return asGuarded(this._SafeStr_2133.findChildByName("loading_container"), isIWindowContainer);
    }

    public get mainContainer(): IWindowContainer {
        if (!this._SafeStr_2133) {
            return null;
        }
        return asGuarded(this._SafeStr_2133.findChildByName("contentArea"), isIWindowContainer);
    }

    public dispose(): void {
        this._SafeStr_4108 = null;
        this._SafeStr_3606 = null;
        this._SafeStr_3859 = null;
        this._SafeStr_4208 = null;
        this._SafeStr_3966 = null;
        this._SafeStr_4210 = null;
        this._controller = null;
        this._SafeStr_5461 = null;
        this._SafeStr_5925 = null;
        if (this._SafeStr_2133) {
            this._SafeStr_2133.dispose();
            this._SafeStr_2133 = null;
        }
        if (this._toolbar) {
            if (this._toolbar.events) {
                this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
            }
            this._toolbar = null;
        }
        this._windowManager = null;
        this._SafeStr_3052 = null;
    }

    private getWindow(): IFrameWindow {
        let _loc4_: IAsset = null;
        let _loc1_: XmlAsset = null;
        let _loc2_: ITabContextWindow = null;
        let _loc3_: any[] = null;
        let _loc5_: ITabButtonWindow = null;
        if (!this._SafeStr_2133) {
            _loc4_ = this._SafeStr_3052.getAssetByName("inventory_xml");
            _loc1_ = castTo(_loc4_, XmlAsset);
            this._SafeStr_5886 = new Dictionary();
            this._SafeStr_2133 = asGuarded(this._windowManager.buildFromXML(XML.from(_loc1_.content)), isIFrameWindow);
            if (this._SafeStr_2133 != null) {
                this._SafeStr_2133.position = this.DEFAULT_VIEW_LOCATION;
                this._SafeStr_2133.visible = false;
                this._SafeStr_2133.procedure = this.windowEventProc;
                this._SafeStr_2133.setParamFlag(65536, this._controller.getBoolean("inventory.allow.scaling"));
                this.extractWindow("furni");
                this.extractWindow("collectibles");
                this.extractWindow("pets");
                this.extractWindow("bots");
                this.extractWindow("badges");
                _loc2_ = asGuarded(this._SafeStr_2133.findChildByName("tabs"), isITabContextWindow);
                _loc3_ = [];
                while (_loc2_.numTabItems > 0) {
                    _loc5_ = _loc2_.getTabItemAt(0);
                    _loc3_.push(_loc5_);
                    _loc2_.removeTabItem(_loc5_);
                }
                for (_loc5_ of _loc3_ ?? []) {
                    switch (_loc5_.name) {
                        case "collectibles":
                            if (this._controller.web3tradeEnabled) {
                                this._SafeStr_5890 = _loc5_;
                                this._SafeStr_6668 = _loc2_.numTabItems | 0;
                                if (this._SafeStr_3964) {
                                    _loc2_.addTabItem(_loc5_);
                                }
                            }
                            break;
                        case "bots":
                            if (this._controller.getBoolean("inventory.bots.enabled")) {
                                _loc2_.addTabItem(_loc5_);
                            }
                            break;
                        case "rentables":
                            if (!this._controller.mergeRentFurni && this._controller.getBoolean("duckets.enabled")) {
                                _loc2_.addTabItem(_loc5_);
                            }
                            break;
                        default:
                            _loc2_.addTabItem(_loc5_);
                    }
                }
                this._controller.preparingInventoryView();
            }
            this._controller.updateUnseenItemCounts();
        }
        if (this._SafeStr_2133.y < 0) {
            this._SafeStr_2133.y = 0;
        }
        if (this._SafeStr_2133.x < 0) {
            this._SafeStr_2133.x = 0;
        }
        return this._SafeStr_2133;
    }

    public disableNonTradingTabs(param1: boolean): void {
        let _loc4_: number = 0;
        let _loc2_: ITabButtonWindow = null;
        let _loc3_: ITabContextWindow = asGuarded(this._SafeStr_2133.findChildByName("tabs"), isITabContextWindow);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.numTabItems) {
            _loc2_ = _loc3_.getTabItemAt(_loc4_ >>> 0);
            if (_loc2_.name != "collectibles" && _loc2_.name != "furni") {
                Util.disableSection(_loc2_, param1);
            }
            _loc4_ += 1;
        }
    }

    public showCollectiblesTab(param1: boolean): void {
        if (!this._SafeStr_2133) {
            this._SafeStr_3964 = param1;
            return;
        }
        let _loc2_: ITabContextWindow = asGuarded(this._SafeStr_2133.findChildByName("tabs"), isITabContextWindow);
        if (this._SafeStr_3964 && !param1) {
            _loc2_.removeTabItem(this._SafeStr_5890);
        } else if (!this._SafeStr_3964 && param1) {
            _loc2_.addTabItemAt(this._SafeStr_5890, this._SafeStr_6668 >>> 0);
        }
        this._SafeStr_3964 = param1;
    }

    public getCategoryViewId(): string {
        return this._SafeStr_2544;
    }

    public getSubCategoryViewId(): string {
        return this._SafeStr_3315;
    }

    public hideInventory(): void {
        this._controller.closingInventoryView();
        let _loc1_: IWindow = this.getWindow();
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = false;
    }

    public showInventory(): void {
        let _loc1_: IWindow = this.getWindow();
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = true;
        this._controller.inventoryViewOpened(this._SafeStr_3315 && this._SafeStr_3315.length > 0 ? this._SafeStr_3315 : this._SafeStr_2544);
    }

    public toggleCategoryView(param1: string, param2: boolean = true, param3: boolean = false): boolean {
        let _loc4_: IWindow = this.getWindow();
        if (_loc4_ == null) {
            return false;
        }
        if (_loc4_.visible) {
            if (this._SafeStr_2544 == param1) {
                if (param2) {
                    if (!WindowToggle.isHiddenByOtherWindows(_loc4_)) {
                        this.hideInventory();
                        return false;
                    }
                    _loc4_.activate();
                }
            } else {
                this.setViewToCategory(param1);
            }
        } else {
            if (param3 && this._SafeStr_2544 != null && this._SafeStr_2544 != param1) {
                this.setViewToCategory(param1);
            }
            _loc4_.visible = true;
            _loc4_.activate();
            if (param1 != this._SafeStr_2544 || !this._controller.isInventoryCategoryInit(param1)) {
                this.setViewToCategory(param1);
            }
            this._controller.inventoryViewOpened(param1);
        }
        return true;
    }

    public activate(): void {
        let _loc1_: IWindow = this.getWindow();
        if (_loc1_ == null) {
            return;
        }
        _loc1_.activate();
    }

    public toggleSubCategoryView(param1: string, param2: boolean = true): void {
        let _loc3_: IWindow = this.getWindow();
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.visible) {
            if (this._SafeStr_3315 == param1) {
                if (param2) {
                    _loc3_.visible = false;
                }
            } else {
                this.setSubViewToCategory(param1);
            }
        } else {
            _loc3_.visible = true;
            if (param1 != this._SafeStr_3315) {
                this.setSubViewToCategory(param1);
            }
        }
    }

    public updateSubCategoryView(): void {
        if (this._SafeStr_3315 == null) {
            return;
        }
        this.setSubViewToCategory(this._SafeStr_3315);
    }

    public setToolbar(param1: IHabboToolbar): void {
        this._toolbar = param1;
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
    }

    public windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (param1.type == "WE_SELECTED") {
            _loc3_ = castGuarded(param2, isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow").selector.getSelected().name;
            if (_loc3_ != this._SafeStr_2544) {
                this.resetUnseenCounters(this._SafeStr_2544);
                this._controller.toggleInventoryPage(_loc3_);
            }
        } else if (param1.type == "WME_CLICK") {
            if (param2.name == "header_button_close") {
                this.hideInventory();
            }
            if (param2.name == "open_catalog_btn") {
                this._controller.catalog.openCatalog();
            }
        } else if (param1.type == "WME_DOUBLE_CLICK") {
            if (param2.name == "titlebar") {
                this._SafeStr_2133.height = this._SafeStr_2133.limits.minHeight;
            }
        }
    };

    public updateUnseenFurniCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_4108) {
            this._SafeStr_4108 = this.createCounter("furni");
        }
        this.updateCounter(this._SafeStr_4108, param1);
    }

    public updateUnseenRentedFurniCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_3606) {
            this._SafeStr_3606 = this.createCounter("rentables");
        }
        this.updateCounter(this._SafeStr_3606, param1);
    }

    public updateUnseenPetsCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_4208) {
            this._SafeStr_4208 = this.createCounter("pets");
        }
        this.updateCounter(this._SafeStr_4208, param1);
        this._controller.petsModel.updateView();
    }

    public updateUnseenBadgeCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_3966) {
            this._SafeStr_3966 = this.createCounter("badges");
        }
        this.updateCounter(this._SafeStr_3966, param1);
        this._controller.badgesModel.updateView();
    }

    public updateUnseenBotCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_3859) {
            this._SafeStr_3859 = this.createCounter("bots");
        }
        this.updateCounter(this._SafeStr_3859, param1);
        this._controller.botsModel.updateView();
    }

    public updateUnseenCollectiblesCount(param1: number): void {
        if (!this._SafeStr_2133) {
            return;
        }
        if (!this._SafeStr_4210) {
            this._SafeStr_4210 = this.createCounter("collectibles");
        }
        this.updateCounter(this._SafeStr_4210, param1);
        this._controller.collectiblesModel.updateView();
    }

    public getView(param1: string): IWindowContainer {
        return asGuarded(this._SafeStr_5886.get(param1), isIWindowContainer);
    }

    private extractWindow(param1: string): void {
        let _loc2_: IWindow = this.mainContainer.getChildByName(param1);
        if (_loc2_) {
            this._SafeStr_5886.set(param1, this.mainContainer.removeChild(_loc2_));
        }
    }

    private resetUnseenCounters(param1: string): void {
        switch (param1) {
            case "furni":
                this._controller.furniModel.resetUnseenItems();
                break;
            case "rentables":
                this._controller.furniModel.resetUnseenItems();
                break;
            case "pets":
                this._controller.petsModel.resetUnseenItems();
                break;
            case "badges":
                this._controller.badgesModel.resetUnseenItems();
                break;
            case "collectibles":
                this._controller.collectiblesModel.resetUnseenItems();
                break;
            case "bots":
                this._controller.botsModel.resetUnseenItems();
        }
    }

    private setViewToCategory(param1: string): void {
        if (param1 == null) {
            return;
        }
        if (param1 == "") {
            return;
        }
        if (this.emptyContainer) {
            this.emptyContainer.visible = false;
        }
        if (this.loadingContainer) {
            this.loadingContainer.visible = false;
        }
        this._controller.checkCategoryInitilization(param1);
        if (this.mainContainer == null) {
            return;
        }
        this.mainContainer.removeChild(this._SafeStr_5461);
        this.mainContainer.invalidate();
        let _loc2_: IWindowContainer = this._controller.getCategoryWindowContainer(param1);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.visible = true;
        this.mainContainer.addChild(_loc2_);
        _loc2_.height = this.mainContainer.height;
        this._controller.updateView(param1);
        this._SafeStr_5461 = _loc2_;
        this._SafeStr_2544 = param1;
        let _loc3_: ITabContextWindow = asGuarded(this._SafeStr_2133.findChildByName("tabs"), isITabContextWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.selector.setSelected(_loc3_.selector.getSelectableByName(param1));
        this.emptyFurnimaticSlots();
    }

    private emptyFurnimaticSlots(): void {
        let _loc2_: number = 0;
        let _loc1_: FurniSlotItem = null;
        let _loc3_: IRecycler = this._controller.catalog.getRecycler();
        if (_loc3_ != null) {
            _loc2_ = 0;
            while (_loc2_ < _loc3_.numberOfSlots) {
                _loc1_ = _loc3_.getSlotContent(_loc2_);
                if (_loc1_ != null) {
                    _loc3_.releaseSlot(_loc2_);
                }
                _loc2_++;
            }
        }
    }

    private enableScaling(): void {
        this._SafeStr_2133.height = this._SafeStr_2133.limits.minHeight;
        this._SafeStr_2133.setParamFlag(65536, true);
        this._SafeStr_2133.findChildByName("top_content").setParamFlag(2048, true);
    }

    private disableScaling(): void {
        this._SafeStr_2133.height = this._SafeStr_2133.limits.minHeight;
        this._SafeStr_2133.setParamFlag(65536, false);
        this._SafeStr_2133.findChildByName("top_content").setParamFlag(2048, false);
    }

    private setSubViewToCategory(param1: string): void {
        if (param1 == null || param1 == "") {
            return;
        }
        this._controller.checkCategoryInitilization(param1);
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2133.findChildByName("subContentArea"), isIWindowContainer);
        while (_loc2_.numChildren > 0) {
            _loc2_.removeChildAt(0);
        }
        let _loc3_: IWindowContainer = this._controller.getCategorySubWindowContainer(param1);
        if (_loc3_ != null) {
            this.disableScaling();
            _loc2_.visible = true;
            _loc3_.visible = true;
            _loc2_.addChild(_loc3_);
        } else {
            this.enableScaling();
            _loc2_.visible = false;
        }
        _loc2_.y = this._SafeStr_2133.findChildByName("top_content").rectangle.bottom + 5 | 0;
        this.resizeToFitContents();
        if (this._SafeStr_2133.parent != null) {
            if (this._SafeStr_2133.x + this._SafeStr_2133.width > this._SafeStr_2133.parent.width) {
                this._SafeStr_2133.x = this._SafeStr_2133.parent.width - this._SafeStr_2133.width;
            }
            if (this._SafeStr_2133.y + this._SafeStr_2133.height > this._SafeStr_2133.parent.height) {
                this._SafeStr_2133.y = (this._SafeStr_2133.parent.height - this._SafeStr_2133.height) * 0.5 | 0;
            }
            if (this._SafeStr_2133.y < 0) {
                this._SafeStr_2133.y = 0;
            }
        }
        this._SafeStr_5925 = _loc3_;
        this._SafeStr_3315 = param1;
    }

    public resizeToFitContents(): void {
        let _loc1_: IWindowContainer = asGuarded(this._SafeStr_2133.findChildByName("subContentArea"), isIWindowContainer);
        if (_loc1_.visible) {
            _loc1_.height = Util.getLowestPoint(_loc1_);
        } else {
            _loc1_.height = 0;
        }
        this._SafeStr_2133.resizeToFitContent();
    }

    private createCounter(param1: string): IWindowContainer {
        let _loc3_: IWindowContainer = this._windowManager.createUnseenItemCounter();
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2133.findChildByName(param1), isIWindowContainer);
        if (_loc2_) {
            _loc2_.addChild(_loc3_);
            _loc3_.x = _loc2_.width - _loc3_.width - 3;
            _loc3_.y = 3;
        }
        return _loc3_;
    }

    private updateCounter(param1: IWindowContainer, param2: number): void {
        let _loc5_: ILabelWindow = null;
        param1.findChildByName("count").caption = param2.toString();
        param1.visible = param2 > 0;
        let _loc3_: string = "";
        switch (param1) {
            case this._SafeStr_3859:
                _loc3_ = "bots";
                break;
            case this._SafeStr_4210:
                _loc3_ = "collectibles";
                break;
            case this._SafeStr_4208:
                _loc3_ = "pets";
                break;
            case this._SafeStr_3966:
                _loc3_ = "badges";
                break;
            case this._SafeStr_4108:
                _loc3_ = "furni";
                break;
            case this._SafeStr_3606:
                _loc3_ = "rentables";
                break;
            case this._SafeStr_3606:
                _loc3_ = "rentables";
        }
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_2133.findChildByName(_loc3_), isIWindowContainer);
        if (_loc4_) {
            _loc5_ = asGuarded(_loc4_.getChildByTag("TITLE"), isILabelWindow);
            if (_loc5_) {
                if (param1.visible) {
                    _loc5_.margins.right = param1.width + 2 * 3;
                } else {
                    _loc5_.margins.right = _loc5_.margins.left;
                }
                _loc4_.width = _loc5_.width;
                param1.x = _loc4_.width - param1.width - 3;
            }
        }
    }

    public onHabboToolbarEvent = (param1: HabboToolbarEvent): void => {
        if (param1.iconId != "HTIE_ICON_INVENTORY") {
            return;
        }
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            if (this._SafeStr_2544 == "pets") {
                this.toggleCategoryView("pets");
            } else if (this._SafeStr_2544 == "furni") {
                this.toggleCategoryView("furni");
            } else if (this._SafeStr_2544 == "rentables") {
                this.toggleCategoryView("rentables");
            } else if (this._SafeStr_2544 == "badges") {
                this.toggleCategoryView("badges");
            } else if (this._SafeStr_2544 == "bots") {
                this.toggleCategoryView("bots");
            } else if (this._SafeStr_2544 == "collectibles") {
                this.toggleCategoryView("furni");
            } else if (this._controller != null) {
                this._controller.toggleInventoryPage("furni");
            }
        }
    };
}
