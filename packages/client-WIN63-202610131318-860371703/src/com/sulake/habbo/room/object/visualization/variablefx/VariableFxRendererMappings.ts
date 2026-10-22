import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { VariableFxRendererType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererType';

export class VariableFxRendererMappings {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxRendererMappings'); }

    public static readonly ASSET_NAME: string = "variablefx_renderer_mapping";

    constructor() {
    }

    public static parse(param1: XML): any[] {
        let _loc4_: any = null;
        let _loc5_: number = 0;
        let _loc6_: string = null;
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc2_: any[] = [];
        if (param1 == null) {
            return _loc2_;
        }
        for (_loc4_ of param1.children() ?? []) {
            _loc5_ = parseInt(_loc4_.attribute("id").toString()) | 0;
            _loc6_ = String(_loc4_.attribute("name"));
            _loc7_ = String(_loc4_.attribute("rendererClass"));
            _loc3_ = VariableFxRendererType.resolveById(_loc5_);
            if (_loc3_ != null && _loc6_ == _loc3_ && _loc7_.length > 0) {
                _loc2_.push({ "renderer": _loc3_, "rendererId": _loc5_, "rendererClass": _loc7_ });
            }
        }
        return _loc2_;
    }
}
