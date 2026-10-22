import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';

export class _SafeCls_6114 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::_SafeCls_6114'); }

    constructor() {
    }

    public static getColors(param1: ICoreConfiguration, param2: string): any[] {
        let _loc6_: any;
        let _loc5_: any[] = null;
        let _loc7_: string = "default";
        let _loc4_: string = param1.getProperty("recolorable_bc.palette_to_furni");
        if (_loc4_ != null && _loc4_.length > 0) {
            for (const _loc3_ of _loc4_.split(";") ?? []) {
                _loc5_ = _loc3_.split("=");
                if (_loc5_.length == 2) {
                    for (_loc6_ of String(_loc5_[1]).split(",") ?? []) {
                        if (_SafeCls_6114.trim(stringOrNull(_loc6_)) == param2) {
                            _loc7_ = _SafeCls_6114.trim(stringOrNull(_loc5_[0]));
                        }
                    }
                }
            }
        }
        let _loc10_: any[] = [];
        let _loc9_: string = param1.getProperty("recolorable_bc.palette." + _loc7_);
        if (_loc9_ == null) {
            return _loc10_;
        }
        for (let _loc8_ of _loc9_.split(",") ?? []) {
            _loc8_ = _SafeCls_6114.trim(stringOrNull(_loc8_));
            if (/^[0-9a-fA-F]{6}$/.test(stringOrNull(_loc8_))) {
                _loc10_.push(parseInt(stringOrNull(_loc8_), 16) >>> 0);
            }
        }
        return _loc10_;
    }

    private static trim(param1: string): string {
        return param1.replace(/^\s+|\s+$/g, "");
    }
}
