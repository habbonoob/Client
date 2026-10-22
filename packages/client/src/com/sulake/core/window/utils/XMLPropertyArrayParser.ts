import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { XMLVariableParser } from '@/com/sulake/core/utils/XMLVariableParser';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class XMLPropertyArrayParser extends XMLVariableParser {
    static { registerClassName(this, 'com.sulake.core.window.utils::XMLPropertyArrayParser'); }

    public static parse(param1: XMLList): any[] {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: UtilsMap = new UtilsMap();
        let _loc3_: any[] = [];
        let _loc2_: any[] = [];
        _loc4_ = XMLVariableParser.parseVariableList(param1, _loc6_, _loc3_) | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_.push(new PropertyStruct(stringOrNull(_loc6_.getKey(_loc5_)), _loc6_.getWithIndex(_loc5_), stringOrNull(_loc3_[_loc5_]), true));
            _loc5_++;
        }
        return _loc2_;
    }

    constructor() {
        super();
    }
}
