import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { OutgoingIngredient } from '@/com/sulake/habbo/communication/messages/parser/crafting/OutgoingIngredient';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CraftingGridControllerBase } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingGridControllerBase';
import { CraftingRecipeItemRenderer } from '@/com/sulake/habbo/ui/widget/crafting/renderer/CraftingRecipeItemRenderer';
import { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';

export class CraftingRecipeListController extends CraftingGridControllerBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingRecipeListController'); }

    declare private _SafeStr_4299: CraftingFurnitureItem;

    declare private _items: CraftingRecipeItemRenderer[];

    constructor(param1: CraftingWidget) {
        super(param1);
        this._items = new Array<CraftingRecipeItemRenderer>(0).fill(null);
    }

    public override dispose(): void {
        this.clearItems();
        this._SafeStr_4299 = null;
        super.dispose();
    }

    public clearItems(): void {
        if (this._items) {
            for (const _loc1_ of this._items ?? []) {
                _loc1_.dispose();
            }
            this._items.length = 0;
        }
        if (this.container) {
            this.container.destroyGridItems();
        }
    }

    public populateRecipeItems(param1: CraftingFurnitureItem[]): void {
        let _loc4_: number = 0;
        let _loc3_: CraftingRecipeItemRenderer = null;
        if (!this.container) {
            return;
        }
        let _loc2_: IWindowContainer = this.getItemTemplate();
        this.container.removeGridItems();
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = new CraftingRecipeItemRenderer(param1[_loc4_], asGuarded(_loc2_.clone(), isIWindowContainer), this._widget);
            this.container.addGridItem(_loc3_.window);
            this._items.push(_loc3_);
            _loc4_++;
        }
    }

    public showRecipe(param1: CraftingFurnitureItem, param2: OutgoingIngredient[]): void {
        let _loc3_: number = 0;
        let _loc7_: boolean = false;
        let _loc9_: IFurnitureData = null;
        let _loc4_: any[] = null;
        let _loc8_: number = 0;
        let _loc11_: CraftingFurnitureItem = null;
        this._SafeStr_4299 = param1;
        if (!param2) {
            this._widget.setInfoState(7);
            return;
        }
        this._widget.mixerCtrl.clearItems();
        let _loc10_: boolean = true;
        let _loc6_: string[] = new Array<string>(0).fill(null);
        for (const _loc5_ of param2 ?? []) {
            _loc7_ = false;
            _loc9_ = this._widget.sessionDataManager.getFloorItemDataByName(_loc5_.furnitureClassName);
            if (!_loc9_) {
                _loc9_ = this._widget.sessionDataManager.getWallItemDataByName(_loc5_.furnitureClassName);
                _loc7_ = true;
                if (!_loc9_) {
                    return;
                }
            }
            _loc4_ = this._widget.handler.container.inventory.getNonRentedInventoryIds("furni", _loc9_.id, _loc7_);
            if (_loc4_ == null || _loc4_.length < _loc5_.count) {
                _loc10_ = false;
            }
            _loc8_ = 0;
            while (_loc8_ < _loc5_.count) {
                _loc11_ = new CraftingFurnitureItem(null, null, _loc9_);
                if (_loc4_ && _loc4_.length) {
                    _loc3_ = _loc4_.shift() | 0;
                } else {
                    _loc3_ = 0;
                    if (_loc6_.indexOf(_loc9_.localizedName) == -1) {
                        _loc6_.push(_loc9_.localizedName);
                    }
                }
                this._widget.mixerCtrl.addItemToMixer(_loc11_, _loc3_);
                _loc8_++;
            }
        }
        if (_loc10_) {
            this._widget.setInfoState(8, this._SafeStr_4299.furnitureData);
        } else {
            this._widget.setInfoState(7, this._SafeStr_4299.furnitureData, _loc6_);
        }
    }

    private get container(): IItemGridWindow {
        return this.mainWindow ? asGuarded(this.mainWindow.findChildByName("itemgrid_products"), isIItemGridWindow) : null;
    }
}
