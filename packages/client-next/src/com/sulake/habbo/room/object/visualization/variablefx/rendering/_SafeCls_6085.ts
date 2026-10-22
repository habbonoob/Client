import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6072 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6072';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { VariableFxIconDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconDefinition';

export class _SafeCls_6085 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::_SafeCls_6085'); }

    public static readonly METADATA_ASSET_NAME: string = "variablefx_icon_metadata";
    private static readonly ICON_ASSET_PREFIX: string = "variablefx_icon_";

    constructor() {
    }

    public static resolve(param1: _SafeCls_6072, param2: string): VariableFxIconDefinition {
        let _loc4_: string = _SafeCls_6085.trim(param2);
        let _loc3_: any = _SafeCls_6085.resolveMetadata(param1);
        let _loc5_: any = _loc3_[_loc4_];
        return new VariableFxIconDefinition(_loc4_, "variablefx_icon_" + _loc4_.replace(/\./g, "_"), _loc5_?.offsetX | 0, _loc5_?.offsetY | 0);
    }

    private static resolveMetadata(param1: _SafeCls_6072): any {
        let _loc3_: any = null;
        let _loc4_: string = null;
        let _loc2_: XML = param1 == null ? null : param1.getXml("variablefx_icon_metadata");
        let _loc5_: any = {};
        if (_loc2_ == null) {
            return _loc5_;
        }
        for (_loc3_ of _loc2_.children() ?? []) {
            _loc4_ = _SafeCls_6085.trim(String(_loc3_.attribute("name")));
            if (_loc4_.length > 0) {
                _loc5_[_loc4_] = { "offsetX": parseInt(_loc3_.attribute("x").toString()), "offsetY": parseInt(_loc3_.attribute("y").toString()) };
            }
        }
        return _loc5_;
    }

    private static trim(param1: string): string {
        return param1 == null ? "" : param1.replace(/^\s+|\s+$/g, "");
    }
}
