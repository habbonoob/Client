import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';

export class DynamicStyle {
    static { registerClassName(this, 'com.sulake.core.window.dynamicstyle::DynamicStyle'); }

    public static readonly STYLE_LIFTED_HOVER: string = "lifted_hover";
    public static readonly _SafeStr_7529: string = "button";
    public static readonly BRIGHTNESS_AND_SHADOW_UNDER: string = "brightness_and_shadow_under";
    public static readonly BRIGHTNESS_AND_SHADOW_UNDER_GENTLE: string = "brightness_and_shadow_under_gentle";
    public static readonly REWARD_TRACK_ITEM: string = "reward_track_item";

    declare public name: string;

    public hoverStyles: any = {};

    public defaultStyles: any = {};

    public pressedSyles: any = {};

    public disabledStyles: any = { "colorTransform": [1, 1, 1, 0.5, 0, 0, 0, 0] };

    public childDynamicStyles: Map<any, any> = new Dictionary();

    constructor(param1: string = "") {
        this.name = param1;
    }

    public getStyleByWindowState(param1: number): any {
        switch (param1) {
            case 16:
                return this.pressedSyles;
            case 4:
                return this.hoverStyles;
            case 0:
                return this.defaultStyles;
            case 32:
                return this.disabledStyles;
            default:
                return {};
        }
    }

    private getChildDynamicStyleByKey(param1: string): DynamicStyle {
        if (this.childDynamicStyles.get(param1)) {
            return this.childDynamicStyles.get(param1);
        }
        return new DynamicStyle();
    }

    public getChildStyle(param1: WindowController): DynamicStyle {
        for (const _loc2_ of param1.tags ?? []) {
            if (_loc2_.charAt(0) == "#") {
                return this.getChildDynamicStyleByKey(stringOrNull(_loc2_));
            }
        }
        return null;
    }

    public getColorValue(param1: number): number {
        let _loc2_: any[] = null;
        let _loc3_: string = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (this.getStyleByWindowState(param1).colorTransform) {
            _loc2_ = this.getStyleByWindowState(param1).colorTransform;
            _loc3_ = "";
            _loc4_ = 0;
            while (_loc4_ < 3) {
                _loc5_ = _loc2_[_loc4_] * 255 + _loc2_[_loc4_ + 4] | 0;
                _loc3_ += Math.min(255, _loc5_).toString(16);
                _loc4_++;
            }
            return parseInt(_loc3_, 16) >>> 0;
        }
        return 0;
    }

    public getColorTransform(param1: number): ColorTransform {
        let _loc2_: any[] = null;
        let _loc3_: any[] = null;
        if (this.getStyleByWindowState(param1).colorTransform) {
            _loc2_ = this.getStyleByWindowState(param1).colorTransform;
            _loc3_ = this.getStyleByWindowState(param1).tint;
            if (!_loc3_) {
                _loc3_ = [255, 255, 255];
            }
            return new ColorTransform(_loc2_[0] * _loc3_[0] / 255, _loc2_[1] * _loc3_[1] / 255, _loc2_[2] * _loc3_[2] / 255, Number(_loc2_[3]), Number(_loc2_[4]), Number(_loc2_[5]), Number(_loc2_[6]), Number(_loc2_[7]));
        }
        return new ColorTransform();
    }
}
