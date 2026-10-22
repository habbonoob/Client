import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureGuildCustomizedVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureGuildCustomizedVisualization'); }

    public static readonly PRIMARY_COLOUR_SPRITE_TAG: string = "COLOR1";
    public static readonly SECONDARY_COLOUR_SPRITE_TAG: string = "COLOR2";
    public static readonly DEFAULT_COLOR_1: number = 15658734;
    public static readonly DEFAULT_COLOR_2: number = 4934475;
    private static readonly BADGE_SPRITE_TAG: string = "BADGE";

    declare private _color1: number;
    static { (this.prototype as any)._color1 = 0; }

    declare private _color2: number;
    static { (this.prototype as any)._color2 = 0; }

    private _SafeStr_4182: string = "";
    private _SafeStr_4450: string = "";

    constructor() {
        super();
    }

    protected override updateModel(param1: number): boolean {
        let _loc4_: string = null;
        let _loc5_: boolean = super.updateModel(param1);
        if (this._SafeStr_4182 == "") {
            _loc4_ = this.object.getModel().getString("furniture_guild_customized_asset_name");
            if (_loc4_ != null) {
                this._SafeStr_4182 = _loc4_;
                this._SafeStr_4450 = this._SafeStr_4182 + "_32";
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

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        if (_loc3_ == "BADGE") {
            if (param1 == 32) {
                return this._SafeStr_4450;
            }
            return this._SafeStr_4182;
        }
        return super.getSpriteAssetName(param1, param2);
    }

    protected override getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        if (param2.tag == "BADGE") {
            return "%group.badge.url%" + param2.assetName.replace("badge_", "");
        }
        return super.getLibraryAssetNameForSprite(param1, param2);
    }
}
