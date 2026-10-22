import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DynamicStyle } from '@/com/sulake/core/window/dynamicstyle/DynamicStyle';

export class DynamicStyleManager {
    static { registerClassName(this, 'com.sulake.core.window.dynamicstyle::DynamicStyleManager'); }

    private static _styles: Map<any, any>;

    public static getStyle(param1: string): DynamicStyle {
        if (!DynamicStyleManager._styles) {
            DynamicStyleManager.fillStyleTable();
        }
        if (DynamicStyleManager._styles.has(param1)) {
            return DynamicStyleManager._styles.get(param1);
        }
        return new DynamicStyle();
    }

    private static fillStyleTable(): void {
        DynamicStyleManager._styles = new Dictionary();
        let _loc2_: DynamicStyle = new DynamicStyle("lifted_hover");
        _loc2_.defaultStyles = {};
        _loc2_.pressedSyles = { "offsetX": 1, "colorTransform": [1, 0.7, 0.7, 0.7, 0, 0, 0, 0] };
        _loc2_.hoverStyles = { "offsetY": -1, "offsetX": -1 };
        let _loc8_: DynamicStyle = new DynamicStyle();
        _loc8_.defaultStyles = { "etchingColor": 1207959552, "etchingPoint": [1, 1] };
        _loc8_.hoverStyles = { "etchingColor": 2147483648, "etchingPoint": [2, 2] };
        _loc8_.pressedSyles = { "etchingColor": 1207959552, "etchingPoint": [-1, -1] };
        _loc2_.childDynamicStyles.set("#icon", _loc8_);
        let _loc4_: DynamicStyle = new DynamicStyle("brightness_and_shadow_under");
        _loc4_.defaultStyles = {};
        let _loc9_: DynamicStyle = new DynamicStyle();
        _loc9_.defaultStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1] };
        _loc9_.pressedSyles = { "etchingColor": 2147483648, "etchingPoint": [0, -1], "offsetY": -1, "colorTransform": [0.7, 0.7, 0.7, 1, 0, 0, 0, 0] };
        _loc9_.hoverStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1], "colorTransform": [1, 1, 1, 1, 77, 77, 77, 0] };
        _loc4_.childDynamicStyles.set("#icon", _loc9_);
        let _loc5_: DynamicStyle = new DynamicStyle();
        _loc5_.defaultStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1] };
        _loc5_.pressedSyles = { "etchingColor": 2147483648, "etchingPoint": [0, 0], "colorTransform": [0.9, 0.9, 0.9, 1, 0, 0, 0, 0] };
        _loc5_.hoverStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1], "colorTransform": [1, 1, 1, 1, 77, 77, 77, 0] };
        _loc5_.disabledStyles = { "colorTransform": [0.5, 0.5, 0.5, 0.7, 0, 0, 0, 0] };
        _loc4_.childDynamicStyles.set("#bg", _loc5_);
        let _loc3_: DynamicStyle = new DynamicStyle("brightness_and_shadow_under_gentle");
        _loc3_.defaultStyles = {};
        let _loc6_: DynamicStyle = new DynamicStyle();
        _loc6_.defaultStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1] };
        _loc6_.pressedSyles = { "etchingColor": 2147483648, "etchingPoint": [0, -1], "offsetY": -1, "colorTransform": [0.8, 0.8, 0.8, 1, 0, 0, 0, 0] };
        _loc6_.hoverStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 1], "colorTransform": [1.1, 1.1, 1.1, 1, 30, 30, 30, 0] };
        _loc3_.childDynamicStyles.set("#icon", _loc6_);
        let _loc1_: DynamicStyle = new DynamicStyle("button");
        _loc1_.defaultStyles = {};
        let _loc7_: DynamicStyle = new DynamicStyle();
        _loc7_.defaultStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 0] };
        _loc7_.pressedSyles = { "etchingColor": 2147483648, "etchingPoint": [0, 0], "offsetY": 1, "colorTransform": [0.8, 0.8, 0.8, 1, 0, 0, 0, 0] };
        _loc7_.hoverStyles = { "etchingColor": 1207959552, "etchingPoint": [0, 0], "colorTransform": [1.1, 1.1, 1.1, 1, 15, 15, 15, 0] };
        _loc1_.childDynamicStyles.set("#icon", _loc7_);
        DynamicStyleManager._styles.set("lifted_hover", _loc2_);
        DynamicStyleManager._styles.set("brightness_and_shadow_under", _loc4_);
        DynamicStyleManager._styles.set("brightness_and_shadow_under_gentle", _loc3_);
        DynamicStyleManager._styles.set("button", _loc1_);
    }

    constructor() {
    }
}
