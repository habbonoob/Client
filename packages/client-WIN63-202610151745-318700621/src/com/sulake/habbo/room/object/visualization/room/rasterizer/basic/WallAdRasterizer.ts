import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { WallPlane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/WallPlane';
import { WallRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/WallRasterizer';
import { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class WallAdRasterizer extends WallRasterizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::WallAdRasterizer'); }

    constructor() {
        super();
    }

    public override getTextureIdentifier(param1: number, param2: IVector3d): string {
        return String(param1);
    }

    protected override initializePlanes(): void {
        if (this.data == null) {
            return;
        }
        let _loc1_: XMLList = this.data.child("wallAds");
        if (_loc1_.length() > 0) {
            this.parseWalls(_loc1_.item(0));
        }
    }

    protected override parseWalls(param1: XML): void {
        let _loc5_: number = 0;
        let _loc6_: XML = null;
        let _loc7_: string = null;
        let _loc2_: XMLList = null;
        let _loc3_: WallPlane = null;
        if (param1 == null) {
            return;
        }
        let _loc4_: XMLList = param1.child("wallAd");
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length()) {
            _loc6_ = _loc4_.item(_loc5_);
            if (XMLValidator.checkRequiredAttributes(_loc6_, ["id"])) {
                _loc7_ = _loc6_.attribute("id").toString();
                _loc2_ = _loc6_.child("visualization");
                _loc3_ = new WallPlane();
                this.parseVisualizations(_loc3_, _loc2_);
                if (this.getPlane(_loc7_) == null) {
                    this.addPlane(_loc7_, _loc3_);
                } else {
                    _loc3_.dispose();
                }
            }
            _loc5_++;
        }
    }

    public override render(param1: BitmapData, param2: string, param3: number, param4: number, param5: number, param6: IVector3d, param7: boolean, param8: number = 0, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0): PlaneBitmapData {
        let _loc15_: WallPlane = asInstanceOf(this.getPlane(param2), WallPlane);
        if (_loc15_ == null) {
            _loc15_ = asInstanceOf(this.getPlane("default"), WallPlane);
        }
        if (_loc15_ == null) {
            return null;
        }
        if (param1 != null) {
            param1.fillRect(param1.rect, 16777215);
        }
        let _loc14_: BitmapData = _loc15_.render(param1, param3, param4, param5, param6, param7);
        if (_loc14_ != null && _loc14_ != param1) {
            _loc14_ = _loc14_.clone();
        }
        return new PlaneBitmapData(_loc14_, -1);
    }
}
