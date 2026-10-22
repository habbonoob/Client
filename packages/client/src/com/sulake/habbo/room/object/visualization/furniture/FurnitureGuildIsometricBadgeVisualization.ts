import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IsometricImageFurniVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/IsometricImageFurniVisualization';

export class FurnitureGuildIsometricBadgeVisualization extends IsometricImageFurniVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureGuildIsometricBadgeVisualization'); }

    private static readonly PRIMARY_COLOUR_SPRITE_TAG: string = "COLOR1";
    private static readonly SECONDARY_COLOUR_SPRITE_TAG: string = "COLOR2";
    private static readonly DEFAULT_COLOR_1: number = 15658734;
    private static readonly DEFAULT_COLOR_2: number = 4934475;

    constructor() {
        super();
    }

    declare private _color1: number;
    static { (this.prototype as any)._color1 = 0; }

    declare private _color2: number;
    static { (this.prototype as any)._color2 = 0; }

    protected override updateModel(param1: number): boolean {
        let _loc4_: string = null;
        let _loc5_: boolean = super.updateModel(param1);
        if (!this.hasThumbnailImage) {
            _loc4_ = this.object.getModel().getString("furniture_guild_customized_asset_name");
            if (_loc4_ != null) {
                this.setThumbnailImages(this.safeGetBitmapAsset(_loc4_), this.safeGetBitmapAsset(_loc4_ + "_32"));
            }
        }
        let _loc2_: number = this.object.getModel().getNumber("furniture_guild_customized_color_1");
        this._color1 = isNaN(_loc2_) ? 15658734 : typeof _loc2_ === "number" && (_loc2_ | 0) === _loc2_ ? _loc2_ : null;
        let _loc3_: number = this.object.getModel().getNumber("furniture_guild_customized_color_2");
        this._color2 = isNaN(_loc2_) ? 4934475 : typeof _loc3_ === "number" && (_loc3_ | 0) === _loc3_ ? _loc3_ : null;
        return _loc5_;
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        let _loc4_: string;
        switch (_loc4_ = this.getSpriteTag(param1, this.direction, param2)) {
            case "COLOR1":
                return this._color1;
            case "COLOR2":
                return this._color2;
            default:
                return super.getSpriteColor(param1, param2, param3);
        }
    }

    protected override getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        if (param2.tag == "THUMBNAIL") {
            if (this.object && this.object.getModel().getString("furniture_guild_customized_asset_name")) {
                return "%group.badge.url%" + this.object.getModel().getString("furniture_guild_customized_asset_name").replace("badge_", "");
            }
        }
        return super.getLibraryAssetNameForSprite(param1, param2);
    }

    private safeGetBitmapAsset(param1: string): BitmapData {
        let _loc2_: IGraphicAsset = this.assetCollection.getAsset(param1);
        if (_loc2_ == null || _loc2_.asset == null) {
            return null;
        }
        return castTo(_loc2_.asset.content, BitmapData);
    }
}
