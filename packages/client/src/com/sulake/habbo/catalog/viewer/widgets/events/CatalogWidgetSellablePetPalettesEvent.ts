import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetSellablePetPalettesEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetSellablePetPalettesEvent'); }

    constructor(param1: string, param2: any[], param3: boolean = false, param4: boolean = false) {
        super("SELLABLE_PET_PALETTES", param3, param4);
        this._productCode = param1;
        this._sellablePalettes = param2;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    declare private _sellablePalettes: any[];

    public get sellablePalettes(): any[] {
        if (this._sellablePalettes != null) {
            return this._sellablePalettes.slice();
        }
        return [];
    }
}
