import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { FurniThumbnailRendererBase } from '@/com/sulake/habbo/ui/widget/crafting/renderer/FurniThumbnailRendererBase';

export class CraftingRecipeItemRenderer extends FurniThumbnailRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.renderer::CraftingRecipeItemRenderer'); }

    constructor(param1: CraftingFurnitureItem, param2: IWindowContainer, param3: CraftingWidget) {
        super(param1, param2, param3);
        this.hideItemCount();
    }

    protected override onTriggered(): void {
        if (!this._widget || !this.content || this._widget.craftingInProgress) {
            return;
        }
        this._widget.showCraftableProduct(this.content);
    }
}
