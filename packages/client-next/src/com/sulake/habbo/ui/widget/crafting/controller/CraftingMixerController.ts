import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CraftingGridControllerBase } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingGridControllerBase';
import { CraftingMixerItemRenderer } from '@/com/sulake/habbo/ui/widget/crafting/renderer/CraftingMixerItemRenderer';

export class CraftingMixerController extends CraftingGridControllerBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingMixerController'); }

    private static readonly MAX_ITEMS: number = 10;

    declare private _renderers: CraftingMixerItemRenderer[];

    constructor(param1: CraftingWidget) {
        super(param1);
        this._renderers = new Array<CraftingMixerItemRenderer>(0).fill(null);
    }

    public override dispose(): void {
        this.returnItemsToInventory();
        super.dispose();
    }

    public returnItemsToInventory(): void {
        let _loc2_: number = 0;
        let _loc1_: CraftingMixerItemRenderer = null;
        _loc2_ = 0;
        while (_loc2_ < this._renderers.length) {
            _loc1_ = this._renderers[_loc2_];
            if (_loc1_) {
                _loc1_.returnItemToInventory();
            }
            _loc2_++;
        }
        this._renderers.length = 0;
        if (this.container) {
            this.container.destroyGridItems();
        }
        if (this._widget && this._widget.inventoryCtrl) {
            this._widget.inventoryCtrl.updateItemCounts();
        }
    }

    public clearItems(): void {
        this.returnItemsToInventory();
        if (this.container) {
            this.container.destroyGridItems();
        }
    }

    public canAdd(): boolean {
        return this._renderers.length < 10;
    }

    public addItemToMixer(param1: CraftingFurnitureItem, param2: number): boolean {
        if (!this.container) {
            return false;
        }
        let _loc3_: IWindowContainer = this.getItemTemplate();
        let _loc4_: CraftingMixerItemRenderer = new CraftingMixerItemRenderer(param1, asGuarded(_loc3_.clone(), isIWindowContainer), this._widget);
        _loc4_.inventoryId = param2;
        this.container.addGridItem(_loc4_.window);
        this._renderers.push(_loc4_);
        if (this._widget.inSecretRecipeMode) {
            this._widget.mixerContentChanged(this.collectSelectedFurnitureIds());
        }
        return true;
    }

    public removeListItem(param1: CraftingMixerItemRenderer): void {
        let _loc3_: number = 0;
        let _loc2_: CraftingMixerItemRenderer = null;
        if (!this.container) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._renderers.length) {
            _loc2_ = this._renderers[_loc3_];
            if (_loc2_ == param1) {
                this._renderers.splice(_loc3_, 1);
                if (_loc2_.window) {
                    this.container.removeGridItem(_loc2_.window);
                    this.container.rebuildGridStructure();
                }
                _loc2_.returnItemToInventory();
                this._widget.inventoryCtrl.updateItemCounts();
                this._widget.mixerContentChanged(this.collectSelectedFurnitureIds());
                return;
            }
            _loc3_++;
        }
    }

    public collectSelectedFurnitureIds(): number[] {
        let _loc2_: number = 0;
        let _loc1_: CraftingMixerItemRenderer = null;
        let _loc3_: number[] = new Array<number>(0).fill(0);
        _loc2_ = 0;
        while (_loc2_ < this._renderers.length) {
            _loc1_ = this._renderers[_loc2_];
            if (_loc1_) {
                _loc3_.push(_loc1_.inventoryId);
            }
            _loc2_++;
        }
        return _loc3_;
    }

    private get container(): IItemGridWindow {
        return this.mainWindow ? asGuarded(this.mainWindow.findChildByName("itemgrid_mixer"), isIItemGridWindow) : null;
    }
}
