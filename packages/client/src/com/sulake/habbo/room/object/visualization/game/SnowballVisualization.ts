import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { SnowballVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/SnowballVisualizationData';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';

export class SnowballVisualization extends RoomObjectSpriteVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.game::SnowballVisualization'); }

    private static readonly SNOWBALL_ASSET_NAME: string = "snowball_small_png";
    private static readonly SNOWBALL_SHADOW_ASSET_NAME: string = "snowball_small_shadow_png";
    private static readonly _SafeStr_8001: number = 16;

    constructor() {
        super();
    }

    declare private _data: SnowballVisualizationData;

    declare private _SafeStr_3156: IRoomObjectSprite;

    public override dispose(): void {
        this._SafeStr_3156 = null;
        super.dispose();
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        let _loc2_: BitmapDataAsset = null;
        this._data = param1 instanceof SnowballVisualizationData ? param1 : null;
        this.createSprites(2);
        _loc2_ = asInstanceOf(this._data.assets.getAssetByName("snowball_small_png"), BitmapDataAsset);
        this.getSprite(0).asset = asInstanceOf(_loc2_.content, BitmapData);
        _loc2_ = asInstanceOf(this._data.assets.getAssetByName("snowball_small_shadow_png"), BitmapDataAsset);
        this._SafeStr_3156 = this.getSprite(1);
        this._SafeStr_3156.asset = asInstanceOf(_loc2_.content, BitmapData);
        this._SafeStr_3156.alpha = 100;
        this._SafeStr_3156.relativeDepth = 1;
        return true;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        this._SafeStr_3156.offsetY = this.object.getLocation().z * 16 | 0;
        this._SafeStr_3156.alpha = Math.max(0, 100 - this._SafeStr_3156.offsetY / 10) | 0;
    }
}
