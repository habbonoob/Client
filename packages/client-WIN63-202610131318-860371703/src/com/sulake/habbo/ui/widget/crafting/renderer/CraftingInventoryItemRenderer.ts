import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { FurniThumbnailRendererBase } from '@/com/sulake/habbo/ui/widget/crafting/renderer/FurniThumbnailRendererBase';

export class CraftingInventoryItemRenderer extends FurniThumbnailRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.renderer::CraftingInventoryItemRenderer'); }

    constructor(param1: CraftingFurnitureItem, param2: IWindowContainer, param3: CraftingWidget) {
        super(param1, param2, param3);
    }

    protected override onTriggered(): void {
        if (!this._widget || this._widget.craftingInProgress || this._widget.inventoryDirty) {
            return;
        }
        if (!this._widget.mixerCtrl.canAdd()) {
            return;
        }
        let _loc1_: number = this.content.getItemToMixer();
        if (_loc1_ == 0) {
            return;
        }
        this._widget.showSecretRecipeView();
        this._widget.mixerCtrl.addItemToMixer(this.content, _loc1_);
        this._widget.inventoryCtrl.updateItemCounts();
    }

    public override updateItemCount(): void {
        if (this.content) {
            this.updateGroupItemCount(this.content.countInInventory);
            this.updateBitmapBlend(this.content.countInInventory > 0);
        }
    }
}
