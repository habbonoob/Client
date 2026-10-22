import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XMLList } from '@habbo-pixi/runtime/xml/XMLList';

export class XMLValidator {
    static { registerClassName(this, 'com.sulake.room.utils::XMLValidator'); }

    public static checkRequiredAttributes(param1: any, param2: any[]): boolean {
        let _loc3_: XML = null;
        let _loc4_: XMLList = null;
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc5_: number = 0;
        if (param1 instanceof XML) {
            _loc3_ = param1 instanceof XML ? param1 : null;
            _loc5_ = 0;
            while (_loc5_ < param2.length) {
                if (_loc3_.attribute(String(param2[_loc5_])).length() == 0) {
                    return false;
                }
                _loc5_++;
            }
        } else {
            if (!(param1 instanceof XMLList)) {
                return false;
            }
            _loc4_ = param1 instanceof XMLList ? param1 : null;
            _loc5_ = 0;
            while (_loc5_ < param2.length) {
                if (_loc3_.attribute(String(param2[_loc5_])).length() == 0) {
                    return false;
                }
                _loc5_++;
            }
        }
        return true;
    }
}
