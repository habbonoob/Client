import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetColoursEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetColoursEvent'); }

    declare private _colours: any[];

    declare private _backgroundAssetName: string;

    declare private _colourAssetName: string;

    declare private _chosenColourAssetName: string;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    constructor(param1: any[], param2: string, param3: string, param4: string, param5: number = 0, param6: boolean = false, param7: boolean = false) {
        super("COLOUR_ARRAY", param6, param7);
        this._colours = param1;
        this._backgroundAssetName = param2;
        this._colourAssetName = param3;
        this._chosenColourAssetName = param4;
        this._index = param5;
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

    public get index(): number {
        return this._index;
    }
}
