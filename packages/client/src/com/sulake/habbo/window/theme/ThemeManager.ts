import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SkinContainer } from '@/com/sulake/core/window/graphics/SkinContainer';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import { PivotPoint } from '@/com/sulake/core/window/enum/PivotPoint';
import { PropertyKeys } from '@/com/sulake/core/window/theme/PropertyKeys';
import { PropertyMap } from '@/com/sulake/core/window/theme/PropertyMap';
import { TextStyleManager } from '@/com/sulake/core/window/utils/TextStyleManager';
import { Theme } from '@/com/sulake/habbo/window/theme/Theme';
import { IlluminaBorderWidget } from '@/com/sulake/habbo/window/widgets/IlluminaBorderWidget';
import { WidgetClasses } from '@/com/sulake/habbo/window/widgets/WidgetClasses';

export class ThemeManager implements IThemeManager {
    static { registerClassName(this, 'com.sulake.habbo.window.theme::ThemeManager'); }

    private static readonly _SafeStr_7920: number = 100;
    private static readonly THEMES: any[] = ["None", "Volter", "Ubuntu", "Illumina Light", "Illumina Dark", "Icon", "Legacy border"];

    constructor(param1: SkinContainer) {
        let _loc5_: PropertyMap = null;
        let _loc3_: PropertyMap = null;
        this._SafeStr_2935 = param1;
        _loc5_ = new PropertyMap();
        _loc5_.addBoolean("always_show_selection", false);
        _loc5_.addEnumeration("antialias_type", "advanced", ["normal", "advanced"]);
        _loc5_.addString("asset_uri", null);
        _loc5_.addBoolean("auto_arrange_items", true);
        _loc5_.addEnumeration("auto_size", "none", ["none", "left", "center", "right"]);
        _loc5_.addString("bitmap_asset_name", null);
        _loc5_.addBoolean("border", false);
        _loc5_.addHex("border_color", 0);
        _loc5_.addBoolean("condense_white", false);
        _loc5_.addBoolean("container_resize_to_columns", false);
        _loc5_.addEnumeration("direction", "down", ["up", "down", "left", "right"]);
        _loc5_.addBoolean("display_as_password", false);
        _loc5_.addBoolean("display_raw", false);
        _loc5_.addBoolean("editable", true);
        _loc5_.addHex("etching_color", 0);
        _loc5_.addBoolean("fit_size_to_contents", false);
        _loc5_.addBoolean("focus_capturer", false);
        _loc5_.addBoolean("greyscale", false);
        _loc5_.addEnumeration("grid_fit_type", "pixel", ["pixel", "none", "subpixel"]);
        _loc5_.addBoolean("handle_bitmap_disposing", true);
        _loc5_.addString("help_page", "");
        _loc5_.addEnumeration("link_target", "default", ["default", "_blank", "_parent", "_self", "_top", "internal"]);
        _loc5_.addInt("spacing", 0);
        _loc5_.addInt("margin_left", 0);
        _loc5_.addInt("margin_top", 0);
        _loc5_.addInt("margin_right", 0);
        _loc5_.addInt("margin_bottom", 0);
        _loc5_.addInt("max_chars", 0);
        _loc5_.addInt("max_lines", 0);
        _loc5_.addArray("item_array", []);
        _loc5_.addBoolean("mouse_wheel_enabled", true);
        _loc5_.addBoolean("multiline", false);
        _loc5_.addEnumeration("pivot_point", stringOrNull(PivotPoint.PIVOT_NAMES[0]), PropertyKeys.PIVOT_POINT_RANGE);
        _loc5_.addInt("pointer_offset", 0);
        _loc5_.addBoolean("resize_on_item_update", false);
        _loc5_.addBoolean("inverse_resize_on_item_update", false);
        _loc5_.addString("restrict", null);
        _loc5_.addBoolean("scale_to_fit_items", false);
        _loc5_.addString("scrollable", "");
        _loc5_.addNumber("scroll_step_h", -1);
        _loc5_.addNumber("scroll_step_v", -1);
        _loc5_.addBoolean("selectable", true);
        _loc5_.addBoolean("stretched_x", true);
        _loc5_.addBoolean("stretched_y", true);
        _loc5_.addHex("text_color", 0);
        _loc5_.addEnumeration("text_style", "regular", TextStyleManager.getStyleNameArrayRef());
        _loc5_.addString("tool_tip_caption", "");
        _loc5_.addUint("tool_tip_delay", 500);
        _loc5_.addBoolean("tool_tip_is_dynamic", false);
        _loc5_.addBoolean("interactive_cursor_disabled", false);
        _loc5_.addBoolean("vertical", false);
        _loc5_.addEnumeration("widget_type", "", WidgetClasses.WIDGET_TYPES);
        _loc5_.addBoolean("word_wrap", false);
        _loc5_.addNumber("zoom_x", 1);
        _loc5_.addNumber("zoom_y", 1);
        _loc5_.addBoolean("open_upward", false);
        _loc5_.addBoolean("keep_open_on_deactivate", false);
        _loc5_.addInt("padding_horizontal", 6);
        _loc5_.addInt("padding_vertical", 6);
        _loc5_.addString("overflow_replace", "");
        _loc5_.addBoolean("wrap_x", false);
        _loc5_.addBoolean("wrap_y", false);
        _loc5_.addNumber("rotation", 0);
        _loc5_.addEnumeration("illumina_border:border_style", "illumina_light", IlluminaBorderWidget.BORDER_STYLES);
        this._themes = new Dictionary();
        this._themes.set("None", new Theme("None", false, 0, 4294967295, _loc5_));
        let _loc4_: number = 0;
        while (this._SafeStr_2935.skinRendererExists(1, _loc4_ >>> 0)) {
            _loc4_++;
        }
        this._themes.set("Icon", new Theme("Icon", false, 0, _loc4_ >>> 0, _loc5_));
        let _loc2_: number = 0;
        while (this._SafeStr_2935.skinRendererExists(30, _loc2_ >>> 0) && _loc2_ < 100) {
            _loc2_++;
        }
        this._themes.set("Legacy border", new Theme("Legacy border", false, 0, _loc2_ >>> 0, _loc5_));
        this._themes.set("Volter", new Theme("Volter", true, 0, 3, _loc5_.clone()));
        _loc3_ = _loc5_.clone();
        _loc3_.addEnumeration("antialias_type", "advanced", ["normal", "advanced"]);
        _loc3_.addEnumeration("text_style", "u_regular", TextStyleManager.getStyleNameArrayRef());
        this._themes.set("Ubuntu", new Theme("Ubuntu", true, 3, 5, _loc3_));
        _loc3_ = _loc5_.clone();
        _loc3_.addEnumeration("antialias_type", "advanced", ["normal", "advanced"]);
        _loc5_.addHex("etching_color", 3003121663);
        _loc3_.addEnumeration("text_style", "il_regular", TextStyleManager.getStyleNameArrayRef());
        this._themes.set("Illumina Light", new Theme("Illumina Light", true, 100, 100, _loc3_));
        _loc3_ = _loc3_.clone();
        _loc5_.addEnumeration("illumina_border:border_style", "illumina_dark", IlluminaBorderWidget.BORDER_STYLES);
        this._themes.set("Illumina Dark", new Theme("Illumina Dark", true, 200, 100, _loc3_));
    }

    declare private _themes: Map<any, any>;

    declare private _SafeStr_2935: SkinContainer;

    public getStyle(param1: string, param2: number, param3: string): number {
        let _loc4_: number = 0;
        let _loc6_: any = 0;
        if (param1 == "None") {
            return (Number(param3) | 0) >>> 0;
        }
        let _loc5_: Theme = this._themes.get(param1);
        if (_loc5_ == null) {
            return 0;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc5_.styleCount) {
            _loc6_ = _loc5_.baseStyle + _loc4_ >>> 0;
            if (param3 == this._SafeStr_2935.getIntentByTypeAndStyle(param2, _loc6_ >>> 0)) {
                return _loc6_ >>> 0;
            }
            _loc4_++;
        }
        return _loc5_.baseStyle;
    }

    public getThemeAndIntent(param1: number, param2: number): any {
        let _loc4_: string = this._SafeStr_2935.getIntentByTypeAndStyle(param1, param2);
        if (param1 == 1) {
            return { "theme": "Icon", "intent": _loc4_ };
        }
        if (param1 == 30 && param2 < 100) {
            return { "theme": "Legacy border", "intent": _loc4_ };
        }
        for (const _loc3_ of this._themes?.values() ?? []) {
            if (_loc3_.isReal && _loc3_.coversStyle(param2)) {
                return { "theme": _loc3_.name, "intent": _loc4_ };
            }
        }
        return { "theme": "None", "intent": _loc4_ };
    }

    public getIntents(param1: number, param2: string, param3: number): any[] {
        let _loc6_: Theme = null;
        let _loc5_: number = 0;
        let _loc7_: string = null;
        let _loc4_: any[] = [];
        if (param2 != "None") {
            _loc6_ = this._themes.get(param2);
            _loc5_ = 0;
            while (_loc5_ < _loc6_.styleCount) {
                _loc7_ = this._SafeStr_2935.getIntentByTypeAndStyle(param1, _loc6_.baseStyle + _loc5_ >>> 0);
                if (_loc7_ != null) {
                    _loc4_.push(_loc7_);
                }
                _loc5_++;
            }
        }
        if (_loc4_.length == 0) {
            _loc4_.push(param3.toString());
        }
        return _loc4_;
    }

    public getPropertyDefaults(param1: number): IPropertyMap {
        let _loc2_: PropertyMap = null;
        for (const _loc3_ of this._themes?.values() ?? []) {
            if (_loc3_.isReal && _loc3_.coversStyle(param1)) {
                _loc2_ = _loc3_.propertyDefaults;
                break;
            }
        }
        if (_loc2_ == null) {
            _loc2_ = new PropertyMap();
        }
        return _loc2_;
    }

    public getThemes(): any[] {
        return ThemeManager.THEMES;
    }
}
