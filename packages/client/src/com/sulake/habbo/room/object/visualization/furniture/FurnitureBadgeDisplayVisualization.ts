import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureBadgeDisplayVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureBadgeDisplayVisualization'); }

    private static readonly BADGE_SPRITE_TAG: string = "BADGE";

    constructor() {
        super();
    }

    private _SafeStr_4182: string = "";
    private _SafeStr_4450: string = "";
    private _SafeStr_5564: number = -1;

    protected override updateModel(param1: number): boolean {
        let _loc2_: any = false;
        let _loc3_: boolean = super.updateModel(param1);
        if (!isNaN(this.object.getModel().getNumber("furniture_badge_image_status"))) {
            _loc2_ = this.object.getModel().getNumber("furniture_badge_image_status") != 0;
            if (_loc2_ && this._SafeStr_4182 == "") {
                this._SafeStr_4182 = this.object.getModel().getString("furniture_badge_asset_name");
                if (this._SafeStr_4450 == "") {
                    this._SafeStr_4450 = this._SafeStr_4182 + "_32";
                }
                if (this.object.getModel().hasNumber("furniture_badge_visible_in_state")) {
                    this._SafeStr_5564 = this.object.getModel().getNumber("furniture_badge_visible_in_state") | 0;
                }
                _loc3_ = true;
            }
        }
        return _loc3_;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        if (_loc3_ != "BADGE" || this._SafeStr_5564 != -1 && this.object.getState(0) != this._SafeStr_5564) {
            return super.getSpriteAssetName(param1, param2);
        }
        if (param1 == 32) {
            return this._SafeStr_4450;
        }
        return this._SafeStr_4182;
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: IGraphicAsset = null;
        let _loc4_: number = super.getSpriteXOffset(param1, param2, param3);
        if (this.getSpriteTag(param1, param2, param3) == "BADGE") {
            _loc5_ = this.getAsset(param1 == 32 ? this._SafeStr_4450 : this._SafeStr_4182, param3);
            if (param1 == 64) {
                _loc4_ = _loc4_ + (40 - _loc5_.width) / 2 | 0;
                if (param2 == 2 && (this.type == "china_c24_resolution1" || this.type == "china_c24_resolution2")) {
                    _loc4_ -= 40;
                }
            } else {
                _loc4_ = _loc4_ + (20 - _loc5_.width) / 2 | 0;
            }
        }
        return _loc4_;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: IGraphicAsset = null;
        let _loc4_: number = super.getSpriteYOffset(param1, param2, param3);
        if (this.getSpriteTag(param1, param2, param3) == "BADGE") {
            _loc5_ = this.getAsset(param1 == 32 ? this._SafeStr_4450 : this._SafeStr_4182, param3);
            if (param1 == 64) {
                _loc4_ = _loc4_ + (40 - _loc5_.height) / 2 | 0;
            } else {
                _loc4_ = _loc4_ + (20 - _loc5_.height) / 2 | 0;
            }
        }
        return _loc4_;
    }

    protected override getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        if (param2.tag == "BADGE") {
            return "%image.library.url%album1584/" + param2.assetName.replace("badge_", "") + ".png";
        }
        return super.getLibraryAssetNameForSprite(param1, param2);
    }
}
