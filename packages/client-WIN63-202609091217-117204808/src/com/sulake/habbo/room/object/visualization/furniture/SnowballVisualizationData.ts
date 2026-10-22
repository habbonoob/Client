import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';

export class SnowballVisualizationData implements IRoomObjectVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::SnowballVisualizationData'); }

    declare private _assets: IAssetLibrary;

    constructor() {
    }

    public dispose(): void {
        this._assets = null;
    }

    public initialize(param1: XML): boolean {
        return true;
    }

    public set assets(param1: IAssetLibrary) {
        this._assets = param1;
    }

    public get assets(): IAssetLibrary {
        return this._assets;
    }

    get [IRoomObjectVisualizationData](): true {
        return true;
    }
}
