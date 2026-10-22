import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { CraftingFurnitureItem } from '@/com/sulake/habbo/ui/widget/crafting/utils/CraftingFurnitureItem';
import { FurniThumbnailRendererBase } from '@/com/sulake/habbo/ui/widget/crafting/renderer/FurniThumbnailRendererBase';

export class CraftingMixerItemRenderer extends FurniThumbnailRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.renderer::CraftingMixerItemRenderer'); }

    declare private _inventoryId: number;

    constructor(param1: CraftingFurnitureItem, param2: IWindowContainer, param3: CraftingWidget) {
        super(param1, param2, param3);
    }

    protected override onTriggered(): void {
        if (!this._widget || this._widget.craftingInProgress || this._widget.inventoryDirty) {
            return;
        }
        if (this._inventoryId == 0) {
            this._widget.setInfoState(9, this.furnitureData);
            return;
        }
        if (this._widget.inSecretRecipeMode) {
            this._widget.mixerCtrl.removeListItem(this);
        }
    }

    public returnItemToInventory(): void {
        if (this._inventoryId != 0) {
            this._data.returnItemToInventory(this._inventoryId);
        }
        this.dispose();
    }

    public override updateItemCount(): void {
        this.updateBitmapBlend(this._inventoryId != 0);
    }

    public get inventoryId(): number {
        return this._inventoryId;
    }

    public set inventoryId(param1: number) {
        this._inventoryId = param1;
        this.updateItemCount();
    }

    protected override initInstanceFields(): void {
        this._inventoryId = 0;
        super.initInstanceFields();
    }
}
