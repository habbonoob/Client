import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetColoursEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetColoursEvent'); }

    constructor(param1: any[], param2: string, param3: string, param4: string, param5: number = 0, param6: boolean = false, param7: boolean = false) {
        super("COLOUR_ARRAY", param6, param7);
        this._colours = param1;
        this._backgroundAssetName = param2;
        this._colourAssetName = param3;
        this._chosenColourAssetName = param4;
        this._index = param5;
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

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }
}
