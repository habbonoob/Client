import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetMultiColoursEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetMultiColoursEvent'); }

    declare private _colours: any[];

    declare private _backgroundAssetName: string;

    declare private _colourAssetName: string;

    declare private _chosenColourAssetName: string;

    constructor(param1: any[], param2: string, param3: string, param4: string, param5: boolean = false, param6: boolean = false) {
        super("MULTI_COLOUR_ARRAY", param5, param6);
        this._colours = param1;
        this._backgroundAssetName = param2;
        this._colourAssetName = param3;
        this._chosenColourAssetName = param4;
    }

    public get colours(): any[] {
        return this._colours;
    }

    public get backgroundAssetName(): string {
        return this._backgroundAssetName;
    }

    public get colourAssetName(): string {
        return this._colourAssetName;
    }

    public get chosenColourAssetName(): string {
        return this._chosenColourAssetName;
    }
}
