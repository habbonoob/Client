import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureProductItem } from '@/com/sulake/habbo/communication/messages/parser/crafting/FurnitureProductItem';
import type { OutgoingIngredient } from '@/com/sulake/habbo/communication/messages/parser/crafting/OutgoingIngredient';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CraftingWidgetHandler } from '@/com/sulake/habbo/ui/handler/CraftingWidgetHandler';
import { CraftingInfoController } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingInfoController';
import { CraftingInventoryListController } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingInventoryListController';
import { CraftingMixerController } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingMixerController';
import { CraftingRecipeListController } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingRecipeListController';
import { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class CraftingWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting::CraftingWidget'); }

    public static readonly MODE_NONE: number = 0;
    public static readonly MODE_SECRET_RECIPE: number = 1;
    public static readonly MODE_PUBLIC_RECIPE: number = 2;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: RoomUI) {
        // AS3 passed its own assets and localizations here, before RoomWidgetBase had set them: null
        super(param1, param2, null, null);
        this._roomUI = param3;
        this._inventoryCtrl = new CraftingInventoryListController(this);
        this._recipeCtrl = new CraftingRecipeListController(this);
        this._mixerCtrl = new CraftingMixerController(this);
        this._infoCtrl = new CraftingInfoController(this);
        this._assets = param3.assets;
        this.handler.widget = this;
    }

    declare private _roomUI: RoomUI;

    declare private _SafeStr_3569: CraftingFurnitureItem;

    declare private _modal: IModalDialog;

    declare private _itemTemplate: IWindowContainer;

    declare private _inventoryCtrl: CraftingInventoryListController;

    declare private _recipeCtrl: CraftingRecipeListController;

    declare private _mixerCtrl: CraftingMixerController;

    declare private _infoCtrl: CraftingInfoController;

    private _craftingMode: number = 0;

    public get inSecretRecipeMode(): boolean {
        return this._craftingMode == 1;
    }

    public get craftingInProgress(): boolean {
        return this.handler.craftingInProgress;
    }

    public get inventoryDirty(): boolean {
        return this.handler.inventoryDirty;
    }

    public get itemTemplate(): IWindowContainer {
        return this._itemTemplate;
    }

    public get handler(): CraftingWidgetHandler {
        return this._SafeStr_2143 instanceof CraftingWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this.handler.container.sessionDataManager;
    }

    public get inventoryCtrl(): CraftingInventoryListController {
        return this._inventoryCtrl;
    }

    public get recipeCtrl(): CraftingRecipeListController {
        return this._recipeCtrl;
    }

    public get mixerCtrl(): CraftingMixerController {
        return this._mixerCtrl;
    }

    public get infoCtrl(): CraftingInfoController {
        return this._infoCtrl;
    }

    public get window(): IWindowContainer {
        return this._modal ? asGuarded(this._modal.rootWindow, isIWindowContainer) : null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        this._roomUI = null;
        if (this._inventoryCtrl) {
            this._inventoryCtrl.dispose();
            this._inventoryCtrl = null;
        }
        if (this._recipeCtrl) {
            this._recipeCtrl.dispose();
            this._recipeCtrl = null;
        }
        if (this._mixerCtrl) {
            this._mixerCtrl.dispose();
            this._mixerCtrl = null;
        }
        if (this._infoCtrl) {
            this._infoCtrl.dispose();
            this._infoCtrl = null;
        }
        if (this._itemTemplate) {
            this._itemTemplate.dispose();
            this._itemTemplate = null;
        }
        super.dispose();
    }

    public hide(): void {
        this.handler.removeInventoryUpdateEvent();
        this._mixerCtrl.clearItems();
        this._inventoryCtrl.clearItems();
        this._recipeCtrl.clearItems();
        if (this.craftingInProgress) {
            this._infoCtrl.cancelCrafting();
        }
        this._craftingMode = 0;
        if (this._modal != null) {
            this._modal.dispose();
            this._modal = null;
        }
    }

    public populateInventoryItems(param1: CraftingFurnitureItem[]): void {
        this._inventoryCtrl.populateInventoryItems(param1);
    }

    public populateRecipeItems(param1: CraftingFurnitureItem[]): void {
        this._recipeCtrl.populateRecipeItems(param1);
    }

    public setInfoState(param1: number, ...rest: any[]): void {
        if (this._infoCtrl) {
            this._infoCtrl.setState(param1, rest);
        }
    }

    public setInfoText(param1: string): void {
        let _loc2_: ITextWindow = this.window ? asGuarded(this.window.findChildByName("header_mixer"), isITextWindow) : null;
        if (_loc2_) {
            _loc2_.text = param1;
        }
    }

    public showWidget(): void {
        if (this.window) {
            return;
        }
        this.createMainWindow();
        this.setInfoText("");
        this.setInfoState(0);
    }

    public showCraftingCategories(param1: FurnitureProductItem[], param2: string[], param3: IRoomEngine, param4: ISessionDataManager): void {
        let _loc9_: any = undefined;
        let _loc6_: any = null;
        let _loc10_: IFurnitureData = null;
        let _loc12_: IFurnitureData = null;
        let _loc8_: boolean = false;
        let _loc11_: CraftingFurnitureItem = null;
        let _loc5_: any[] = null;
        _loc9_ = new Array<CraftingFurnitureItem>(0).fill(null);
        for (_loc6_ of param2 ?? []) {
            _loc8_ = false;
            _loc10_ = param4.getFloorItemDataByName(_loc6_);
            if (!_loc10_) {
                _loc10_ = param4.getWallItemDataByName(_loc6_);
                _loc8_ = true;
                if (!_loc10_) {
                    continue;
                }
            }
            _loc11_ = new CraftingFurnitureItem(null, null, _loc10_);
            _loc5_ = this.handler.container.inventory.getNonRentedInventoryIds("furni", _loc11_.typeId, _loc8_);
            if (_loc5_ && _loc5_.length > 0) {
                _loc11_.inventoryIds = Array.from(_loc5_);
            }
            _loc9_.push(_loc11_);
        }
        this.populateInventoryItems(_loc9_);
        _loc9_ = new Array<CraftingFurnitureItem>(0).fill(null);
        for (const _loc7_ of param1 ?? []) {
            _loc10_ = param4.getFloorItemDataByName(_loc7_.furnitureClassName);
            _loc12_ = param4.getWallItemDataByName(_loc7_.furnitureClassName);
            if (_loc10_) {
                _loc9_.push(new CraftingFurnitureItem(_loc7_.recipeCode, _loc7_.productCode, _loc10_));
            } else if (_loc12_) {
                _loc9_.push(new CraftingFurnitureItem(_loc7_.recipeCode, _loc7_.productCode, _loc12_));
            }
        }
        this.populateRecipeItems(_loc9_);
    }

    public showCraftableProduct(param1: CraftingFurnitureItem): void {
        this._SafeStr_3569 = param1;
        if (!this._SafeStr_3569) {
            return;
        }
        this.setInfoText(this._SafeStr_3569.furnitureData ? this._SafeStr_3569.furnitureData.localizedName : "");
        this.handler.getCraftingRecipe(this._SafeStr_3569.recipeCode, this._SafeStr_3569.productCode);
    }

    public showCraftingRecipe(param1: OutgoingIngredient[]): void {
        this.showCraftableProductView();
        this._recipeCtrl.showRecipe(this._SafeStr_3569, param1);
    }

    public clearMixerItems(): void {
        if (this._mixerCtrl) {
            this._mixerCtrl.clearItems();
        }
    }

    public mixerContentChanged(param1: number[]): void {
        if (param1.length > 0) {
            this.setInfoState(1000);
            this.handler.getCraftingRecipesAvailable(param1);
        } else {
            this.setInfoState(1);
        }
    }

    public showSecretRecipeView(): void {
        if (this._craftingMode != 1) {
            this.clearMixerItems();
        }
        this._craftingMode = 1;
        this.setInfoText("");
        this.setInfoState(1);
    }

    public showCraftableProductView(): void {
        if (this._craftingMode != 2) {
            this.clearMixerItems();
        }
        this._craftingMode = 2;
        this.setInfoState(6);
    }

    public doCrafting(): void {
        switch (this._craftingMode - 1) {
            case 0:
                this.handler.doCraftingWithMixer();
                break;
            case 1:
                this.handler.doCraftingWithRecipe();
        }
    }

    public getSelectedIngredients(): number[] {
        return this._mixerCtrl.collectSelectedFurnitureIds();
    }

    private createMainWindow(): void {
        if (this.window != null) {
            return;
        }
        this._modal = this.windowManager.buildModalDialogFromXML(XML.from(this.assets.getAssetByName("craftingwidget_xml").content));
        if (!this._modal || !this._modal.rootWindow) {
            return;
        }
        let _loc2_: IWindow = this.window.findChildByTag("close");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onClose);
        }
        let _loc1_: IItemGridWindow = asGuarded(this.window.findChildByName("itemgrid_products"), isIItemGridWindow);
        this._itemTemplate = asGuarded(_loc1_.getGridItemAt(0), isIWindowContainer);
        _loc1_.removeGridItem(this._itemTemplate);
        this.window.procedure = this.onInput;
        this.window.center();
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_DOWN") {
            return;
        }
        let _loc3_: any = param2.name;
        if ("header_button_close" === _loc3_) {
            this.hide();
        }
    };

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };
}
