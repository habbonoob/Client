import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';

export class CraftingGridControllerBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingGridControllerBase'); }

    declare protected _widget: CraftingWidget;

    constructor(param1: CraftingWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        this._widget = null;
    }

    public get mainWindow(): IWindowContainer {
        return this._widget.window;
    }

    public getItemTemplate(): IWindowContainer {
        return this._widget.itemTemplate;
    }
}
