import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { PlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneRasterizer';
import { WallPlane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/WallPlane';
import { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class WallRasterizer extends PlaneRasterizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::WallRasterizer'); }

    constructor() {
        super();
    }

    protected override initializePlanes(): void {
        if (this.data == null) {
            return;
        }
        let _loc1_: XMLList = this.data.child("walls");
        if (_loc1_.length() > 0) {
            this.parseWalls(_loc1_.item(0));
        }
    }

    protected parseWalls(param1: XML): void {
        let _loc5_: number = 0;
        let _loc2_: XML = null;
        let _loc6_: string = null;
        let _loc4_: XMLList = null;
        let _loc7_: WallPlane = null;
        if (param1 == null) {
            return;
        }
        let _loc3_: XMLList = param1.child("wall");
        _loc5_ = 0;
        while (_loc5_ < _loc3_.length()) {
            _loc2_ = _loc3_.item(_loc5_);
            if (XMLValidator.checkRequiredAttributes(_loc2_, ["id"])) {
                _loc6_ = _loc2_.attribute("id").toString();
                _loc4_ = _loc2_.child("visualization");
                _loc7_ = new WallPlane();
                this.parseVisualizations(_loc7_, _loc4_);
                if (!this.addPlane(_loc6_, _loc7_)) {
                    _loc7_.dispose();
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
            try {
                _loc14_ = _loc14_.clone();
            } catch (e) {
                if (_loc14_) {
                    _loc14_.dispose();
                }
                return null;
            }
        }
        return new PlaneBitmapData(_loc14_, -1);
    }

    public override getTextureIdentifier(param1: number, param2: IVector3d): string {
        if (param2 != null) {
            return param1 + "_" + param2.x + "_" + param2.y + "_" + param2.z;
        }
        return super.getTextureIdentifier(param1, param2);
    }
}
