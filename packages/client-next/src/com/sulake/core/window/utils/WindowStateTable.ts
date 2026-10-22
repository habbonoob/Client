import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WindowStateTable {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowStateTable'); }

    constructor() {
    }

    public static fillTables(param1: Map<any, any>, param2: Map<any, any> = null): void {
        let _loc3_: string = null;
        param1.set("default", 0);
        param1.set("active", 1);
        param1.set("focused", 2);
        param1.set("hovering", 4);
        param1.set("selected", 8);
        param1.set("pressed", 16);
        param1.set("disabled", 32);
        param1.set("locked", 64);
        if (param2 != null) {
            for (_loc3_ of param1?.keys() ?? []) {
                param2.set(param1.get(_loc3_), _loc3_);
            }
        }
    }
}
