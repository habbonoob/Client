import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { FloorPlane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/FloorPlane';
import { PlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneRasterizer';
import { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class FloorRasterizer extends PlaneRasterizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::FloorRasterizer'); }

    constructor() {
        super();
    }

    protected override initializePlanes(): void {
        if (this.data == null) {
            return;
        }
        let _loc1_: XMLList = this.data.child("floors");
        if (_loc1_.length() > 0) {
            this.parseFloors(_loc1_.item(0));
        }
    }

    public override render(param1: BitmapData, param2: string, param3: number, param4: number, param5: number, param6: IVector3d, param7: boolean, param8: number = 0, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0): PlaneBitmapData {
        let _loc15_: FloorPlane = asInstanceOf(this.getPlane(param2), FloorPlane);
        if (_loc15_ == null) {
            _loc15_ = asInstanceOf(this.getPlane("default"), FloorPlane);
        }
        if (_loc15_ == null) {
            return null;
        }
        if (param1 != null) {
            param1.fillRect(param1.rect, 16777215);
        }
        let _loc14_: BitmapData = _loc15_.render(param1, param3, param4, param5, param6, param7, param8, param9);
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

    private parseFloors(param1: XML): void {
        let _loc4_: number = 0;
        let _loc7_: XML = null;
        let _loc5_: string = null;
        let _loc3_: XMLList = null;
        let _loc6_: FloorPlane = null;
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("floor");
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length()) {
            _loc7_ = _loc2_.item(_loc4_);
            if (XMLValidator.checkRequiredAttributes(_loc7_, ["id"])) {
                _loc5_ = _loc7_.attribute("id").toString();
                _loc3_ = _loc7_.child("visualization");
                _loc6_ = new FloorPlane();
                this.parseVisualizations(_loc6_, _loc3_);
                if (!this.addPlane(_loc5_, _loc6_)) {
                    _loc6_.dispose();
                }
            }
            _loc4_++;
        }
    }
}
