import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetMultiColoursEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetMultiColoursEvent'); }

    constructor(param1: any[], param2: string, param3: string, param4: string, param5: boolean = false, param6: boolean = false) {
        super("MULTI_COLOUR_ARRAY", param5, param6);
        this._colours = param1;
        this._backgroundAssetName = param2;
        this._colourAssetName = param3;
        this._chosenColourAssetName = param4;
    }

    declare private _colours: any[];

    public get colours(): any[] {
        return this._colours;
    }

    declare private _backgroundAssetName: string;

    public get backgroundAssetName(): string {
        return this._backgroundAssetName;
    }

    declare private _colourAssetName: string;

    public get colourAssetName(): string {
        return this._colourAssetName;
    }

    declare private _chosenColourAssetName: string;

    public get chosenColourAssetName(): string {
        return this._chosenColourAssetName;
    }
}
