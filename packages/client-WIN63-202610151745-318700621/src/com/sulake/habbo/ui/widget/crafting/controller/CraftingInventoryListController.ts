import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CraftingGridControllerBase } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingGridControllerBase';
import { CraftingInventoryItemRenderer } from '@/com/sulake/habbo/ui/widget/crafting/renderer/CraftingInventoryItemRenderer';

export class CraftingInventoryListController extends CraftingGridControllerBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingInventoryListController'); }

    declare private _items: CraftingInventoryItemRenderer[];

    constructor(param1: CraftingWidget) {
        super(param1);
        this._items = new Array<CraftingInventoryItemRenderer>(0).fill(null);
    }

    public override dispose(): void {
        this.clearItems();
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

    public populateInventoryItems(param1: CraftingFurnitureItem[]): void {
        let _loc4_: number = 0;
        let _loc3_: CraftingInventoryItemRenderer = null;
        if (!this.container) {
            return;
        }
        let _loc2_: IWindowContainer = this.getItemTemplate();
        this.container.removeGridItems();
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = new CraftingInventoryItemRenderer(param1[_loc4_], asGuarded(_loc2_.clone(), isIWindowContainer), this._widget);
            this.container.addGridItem(_loc3_.window);
            this._items.push(_loc3_);
            _loc4_++;
        }
    }

    public updateItemCounts(): void {
        for (const _loc1_ of this._items ?? []) {
            _loc1_.updateItemCount();
        }
    }

    private get container(): IItemGridWindow {
        return this.mainWindow ? asGuarded(this.mainWindow.findChildByName("itemgrid_inventory"), isIItemGridWindow) : null;
    }
}
