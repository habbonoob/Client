import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class CameraEffect {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraEffect'); }

    private static readonly DEFAULT_EFFECT_STRENGTH: number = 0.5;
    public static readonly TYPE_COLORMATRIX: string = "colormatrix";
    public static readonly _SafeStr_7901: string = "composite";
    public static readonly TYPE_FRAME: string = "frame";
    private static _effects: UtilsMap;
    private static _SafeStr_4059: number = 1;
    private static _SafeStr_2259: IHabboLocalizationManager;
    private static _availableEffectNames: any[] = [];

    public static resetAllEffects(): void {
        for (const _loc1_ of valuesOf(CameraEffect._effects)) {
            _loc1_.value = 0.5 * CameraEffect._SafeStr_4059;
            _loc1_.setChosen(false);
        }
    }

    public static setMaxValue(param1: number): void {
        CameraEffect._SafeStr_4059 = param1;
    }

    public static getEffects(param1: string, param2: IHabboLocalizationManager): UtilsMap {
        let _loc3_: any[] = null;
        if (!CameraEffect._effects) {
            if (param1 != null) {
                _loc3_ = param1.split(",");
                for (const _loc4_ of _loc3_ ?? []) {
                    CameraEffect._availableEffectNames.push(StringUtil.trim(stringOrNull(_loc4_)));
                }
            }
            CameraEffect._SafeStr_2259 = param2;
            CameraEffect.initEffects();
        }
        return CameraEffect._effects;
    }

    private static initEffects(): void {
        CameraEffect._effects = new UtilsMap();
        CameraEffect.addEffect("dark_sepia", "colormatrix", [0.4, 0.4, 0.1, 0, 110, 0.3, 0.4, 0.1, 0, 30, 0.3, 0.2, 0.1, 0, 0, 0, 0, 0, 1, 0], null);
        CameraEffect.addEffect("increase_saturation", "colormatrix", [2, -0.5, -0.5, 0, 0, -0.5, 2, -0.5, 0, 0, -0.5, -0.5, 2, 0, 0, 0, 0, 0, 1, 0], null);
        CameraEffect.addEffect("increase_contrast", "colormatrix", [1.5, 0, 0, 0, -50, 0, 1.5, 0, 0, -50, 0, 0, 1.5, 0, -50, 0, 0, 0, 1.5, 0], null);
        CameraEffect.addEffect("shadow_multiply_02", "composite", null, "multiply");
        CameraEffect.addEffect("color_1", "colormatrix", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0], null, 1);
        CameraEffect.addEffect("hue_bright_sat", "colormatrix", [1, 0.6, 0.2, 0, -50, 0.2, 1, 0.6, 0, -50, 0.6, 0.2, 1, 0, -50, 0, 0, 0, 1, 0], null, 1);
        CameraEffect.addEffect("hearts_hardlight_02", "composite", null, "hardlight", 1);
        CameraEffect.addEffect("texture_overlay", "composite", null, "overlay", 1);
        CameraEffect.addEffect("pinky_nrm", "composite", null, "normal", 1);
        CameraEffect.addEffect("color_2", "colormatrix", [0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333, 0, 0, 0, 0, 0, 1, 0], null, 2);
        CameraEffect.addEffect("night_vision", "colormatrix", [0, 0, 0, 0, 0, 0, 1.1, 0, 0, -50, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], null, 2);
        CameraEffect.addEffect("stars_hardlight_02", "composite", null, "hardlight", 2);
        CameraEffect.addEffect("coffee_mpl", "composite", null, "multiply", 2);
        CameraEffect.addEffect("security_hardlight", "composite", null, "hardlight", 3);
        CameraEffect.addEffect("bluemood_mpl", "composite", null, "multiply", 3);
        CameraEffect.addEffect("rusty_mpl", "composite", null, "multiply", 3);
        CameraEffect.addEffect("decr_conrast", "colormatrix", [0.5, 0, 0, 0, 50, 0, 0.5, 0, 0, 50, 0, 0, 0.5, 0, 50, 0, 0, 0, 1, 0], null, 4);
        CameraEffect.addEffect("green_2", "colormatrix", [0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, 90, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 1, 0], null, 4);
        CameraEffect.addEffect("alien_hrd", "composite", null, "hardlight", 4);
        CameraEffect.addEffect("color_3", "colormatrix", [0.609, 0.609, 0.082, 0, 0, 0.309, 0.609, 0.082, 0, 0, 0.309, 0.609, 0.082, 0, 0, 0, 0, 0, 1, 0], null, 5);
        CameraEffect.addEffect("color_4", "colormatrix", [0.8, -0.8, 1, 0, 70, 0.8, -0.8, 1, 0, 70, 0.8, -0.8, 1, 0, 70, 0, 0, 0, 1, 0], null, 5);
        CameraEffect.addEffect("toxic_hrd", "composite", null, "hardlight", 5);
        CameraEffect.addEffect("hypersaturated", "colormatrix", [2, -1, 0, 0, 0, -1, 2, 0, 0, 0, 0, -1, 2, 0, 0, 0, 0, 0, 1, 0], null, 6);
        CameraEffect.addEffect("Yellow", "colormatrix", [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], null, 6);
        CameraEffect.addEffect("misty_hrd", "composite", null, "hardlight", 6);
        CameraEffect.addEffect("x_ray", "colormatrix", [0, 1.2, 0, 0, -100, 0, 2, 0, 0, -120, 0, 2, 0, 0, -120, 0, 0, 0, 1, 0], null, 7);
        CameraEffect.addEffect("decrease_saturation", "colormatrix", [0.7, 0.2, 0.2, 0, 0, 0.2, 0.7, 0.2, 0, 0, 0.2, 0.2, 0.7, 0, 0, 0, 0, 0, 1, 0], null, 7);
        CameraEffect.addEffect("drops_mpl", "composite", null, "multiply", 8);
        CameraEffect.addEffect("shiny_hrd", "composite", null, "hardlight", 9);
        CameraEffect.addEffect("glitter_hrd", "composite", null, "hardlight", 10);
        CameraEffect.addEffect("frame_gold", "frame", null, null, 999);
        CameraEffect.addEffect("frame_gray_4", "frame", null, null, 999);
        CameraEffect.addEffect("frame_black_2", "frame", null, null, 999);
        CameraEffect.addEffect("frame_wood_2", "frame", null, null, 999);
        CameraEffect.addEffect("finger_nrm", "frame", null, null, 999);
        CameraEffect.addEffect("color_5", "colormatrix", [3.309, 0.609, 1.082, 0.2, 0, 0.309, 0.609, 0.082, 0, 0, 1.309, 0.609, 0.082, 0, 0, 0, 0, 0, 1, 0], null, 999);
        CameraEffect.addEffect("black_white_negative", "colormatrix", [-0.5, -0.5, -0.5, 0, 255, -0.5, -0.5, -0.5, 0, 255, -0.5, -0.5, -0.5, 0, 255, 0, 0, 0, 1, 0], null, 999);
        CameraEffect.addEffect("blue", "colormatrix", [0.5, 0.5, 0.5, 0, -255, 0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 1, 0], null, 999);
        CameraEffect.addEffect("red", "colormatrix", [0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, -170, 0, 0, 0, 1, 0], null, 999);
        CameraEffect.addEffect("green", "colormatrix", [0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, -170, 0, 0, 0, 1, 0], null, 999);
    }

    private static addEffect(param1: string, param2: string, param3: any[], param4: string, param5: number = 0): void {
        if (CameraEffect._availableEffectNames.indexOf(param1) >= 0) {
            CameraEffect._effects[param1] = new CameraEffect(param1, param2, param3, param4, param5);
        }
    }

    constructor(param1: string, param2: string, param3: any[], param4: string, param5: number) {
        this.name = param1;
        this.description = CameraEffect._SafeStr_2259.getLocalization("camera.effect.name." + param1, param1);
        this.type = param2;
        this.blendmode = param4;
        this.matrixArray = param3;
        this._SafeStr_5906 = param5;
    }

    declare public type: string;

    declare public matrixArray: any[];

    declare public blendmode: string;

    declare public name: string;

    declare public description: string;

    declare public value: number;
    static { (this.prototype as any).value = 0; }

    public isOn: boolean = false;
    public _SafeStr_5906: number = 0;

    declare public button: IWindowContainer;

    public getEffectStrength(): number {
        return this.value / CameraEffect._SafeStr_4059;
    }

    public allowsOnlyOneInstance(): boolean {
        return this.type == "frame";
    }

    public usesEffectStrength(): boolean {
        return this.type != "frame";
    }

    public getColorMatrixFilter(param1: boolean = false): BitmapFilter {
        let _loc5_: number = 0;
        if (param1) {
            return new ColorMatrixFilter(this.matrixArray);
        }
        let _loc4_: any[] = [];
        let _loc3_: any[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        _loc5_ = 0;
        while (_loc5_ < this.matrixArray.length) {
            _loc4_.push(this.matrixArray[_loc5_] * this.getEffectStrength() + _loc3_[_loc5_] * (1 - this.getEffectStrength()));
            _loc5_++;
        }
        return new ColorMatrixFilter(_loc4_);
    }

    public setChosen(param1: boolean): void {
        let _loc3_: IRegionWindow = null;
        let _loc2_: IWindow = null;
        this.isOn = param1;
        if (this.button) {
            this.setSelectionHighlight(this.isOn);
            _loc3_ = asGuarded(this.button.findChildByName("remove_effect_button"), isIRegionWindow);
            _loc3_.visible = this.isOn;
            if (!this.allowsOnlyOneInstance()) {
                _loc2_ = asGuarded(this.button.findChildByName("active_indicator"), isIWindow);
                _loc2_.visible = this.isOn;
            }
        }
    }

    public turnOffHighlight(): void {
        this.setSelectionHighlight(false);
    }

    private setSelectionHighlight(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (this.button) {
            _loc2_ = asGuarded(this.button.findChildByName("selected_indicator"), isIWindow);
            _loc2_.visible = param1;
        }
    }
}
