import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { SnowballVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/SnowballVisualizationData';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';

export class SnowSplashVisualization extends RoomObjectSpriteVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.game::SnowSplashVisualization'); }

    private static readonly FRAME_ASSET_NAMES: any[] = ["snowball_splash_1", "snowball_splash_2", "snowball_splash_3"];

    constructor() {
        super();
    }

    private _frameNumber: number = 0;

    declare private _data: SnowballVisualizationData;

    public get isDone(): boolean {
        return this._frameNumber >= SnowSplashVisualization.FRAME_ASSET_NAMES.length;
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        let _loc2_: BitmapDataAsset = null;
        this._data = param1 instanceof SnowballVisualizationData ? param1 : null;
        this.createSprites(1);
        _loc2_ = asInstanceOf(this._data.assets.getAssetByName(stringOrNull(SnowSplashVisualization.FRAME_ASSET_NAMES[this._frameNumber])), BitmapDataAsset);
        this.getSprite(0).asset = asInstanceOf(_loc2_.content, BitmapData);
        return true;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        this._frameNumber = this._frameNumber + 1;
        this.getSprite(0).asset = this.isDone ? null : asInstanceOf(this._data.assets.getAssetByName(stringOrNull(SnowSplashVisualization.FRAME_ASSET_NAMES[this._frameNumber])).content, BitmapData);
    }
}
