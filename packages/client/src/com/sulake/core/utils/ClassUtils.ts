import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClassUtils {
    static { registerClassName(this, 'com.sulake.core.utils::ClassUtils'); }

    public static implementsInterface(param1: any, param2: any): boolean {
        // an interface is its brand symbol, which every implementing class carries on its prototype
        return typeof param1 === "function" && typeof param2 === "symbol" && param2 in param1.prototype;
    }

    public static getSimpleQualifiedClassName(param1: any): string {
        let _loc3_: string = getQualifiedClassName(param1);
        let _loc2_: number = _loc3_.indexOf("::");
        if (_loc2_ > 0) {
            return _loc3_.substr(_loc2_ + 2, _loc3_.length);
        }
        return _loc3_;
    }

    constructor() {
    }
}
