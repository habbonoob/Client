import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';

export class CraftingGridControllerBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingGridControllerBase'); }

    constructor(param1: CraftingWidget) {
        this._widget = param1;
    }

    declare protected _widget: CraftingWidget;

    public get mainWindow(): IWindowContainer {
        return this._widget.window;
    }

    public dispose(): void {
        this._widget = null;
    }

    public getItemTemplate(): IWindowContainer {
        return this._widget.itemTemplate;
    }
}
