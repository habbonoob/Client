import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { PivotPoint } from '@/com/sulake/core/window/enum/PivotPoint';

export class PropertyKeys {
    static { registerClassName(this, 'com.sulake.core.window.theme::PropertyKeys'); }

    static #staticsReady = false;

    public static readonly ALWAYS_SHOW_SELECTION: string = "always_show_selection";
    public static readonly ANTIALIAS_TYPE: string = "antialias_type";
    public static readonly ALLOW_SHIFT_SCROLL_HORIZONTAL: string = "allow_shift_scroll_horizontal";
    public static readonly ASSET_URI: string = "asset_uri";
    public static readonly AUTO_ARRANGE_ITEMS: string = "auto_arrange_items";
    public static readonly AUTO_SIZE: string = "auto_size";
    public static readonly BITMAP_ASSET_NAME: string = "bitmap_asset_name";
    public static readonly BITMAP_FILL_MODE: string = "fill_mode";
    public static readonly BORDER: string = "border";
    public static readonly BORDER_COLOR: string = "border_color";
    public static readonly CONDENSE_WHITE: string = "condense_white";
    public static readonly CONTAINER_RESIZE_TO_COLUMNS: string = "container_resize_to_columns";
    public static readonly _SafeStr_8262: string = "direction";
    public static readonly _SafeStr_8307: string = "display_as_password";
    public static readonly DISPLAY_RAW: string = "display_raw";
    public static readonly _SafeStr_8507: string = "editable";
    public static readonly FIT_SIZE_TO_CONTENTS: string = "fit_size_to_contents";
    public static readonly _SafeStr_14052: string = "flip_x";
    public static readonly _SafeStr_14053: string = "flip_y";
    public static readonly FOCUS_CAPTURER: string = "focus_capturer";
    public static readonly GRADIENT_COLOR1: string = "color1";
    public static readonly GRADIENT_COLOR2: string = "color2";
    public static readonly GRADIENT_MODE: string = "mode";
    public static readonly GREYSCALE: string = "greyscale";
    public static readonly GRID_FIT_TYPE: string = "grid_fit_type";
    public static readonly HANDLE_BITMAP_DISPOSING: string = "handle_bitmap_disposing";
    public static readonly HELP_PAGE: string = "help_page";
    public static readonly HTML_LINK_TARGET: string = "link_target";
    public static readonly INVERSE_RESIZE_ON_ITEM_UPDATE: string = "inverse_resize_on_item_update";
    public static readonly ITEM_SPACING: string = "spacing";
    public static readonly KEEP_OPEN_ON_DEACTIVATE: string = "keep_open_on_deactivate";
    public static readonly MARGIN_LEFT: string = "margin_left";
    public static readonly MARGIN_TOP: string = "margin_top";
    public static readonly MARGIN_RIGHT: string = "margin_right";
    public static readonly MARGIN_BOTTOM: string = "margin_bottom";
    public static readonly MAX_CHARS: string = "max_chars";
    public static readonly MAX_LINES: string = "max_lines";
    public static readonly MENU_ITEM_ARRAY: string = "item_array";
    public static readonly MOUSE_WHEEL_ENABLED: string = "mouse_wheel_enabled";
    public static readonly MULTILINE: string = "multiline";
    public static readonly _SafeStr_8244: string = "open_upward";
    public static readonly PADDING_HORIZONTAL: string = "padding_horizontal";
    public static readonly PADDING_VERTICAL: string = "padding_vertical";
    public static readonly _SafeStr_8509: string = "pivot_point";
    public static readonly POINTER_OFFSET: string = "pointer_offset";
    public static readonly RADIUS: string = "radius";
    public static readonly RESIZE_ON_ITEM_UPDATE: string = "resize_on_item_update";
    public static readonly RESTRICT: string = "restrict";
    public static readonly SCALE_TO_FIT_ITEMS: string = "scale_to_fit_items";
    public static readonly SCROLLABLE: string = "scrollable";
    public static readonly SCROLL_STEP_HORIZONTAL: string = "selectable";
    public static readonly SHAPE: string = "shape";
    public static readonly SIDES: string = "sides";
    public static readonly STROKE_COLOR: string = "stroke_color";
    public static readonly STROKE_HSV_SHADE: string = "stroke_hsv_shade";
    public static readonly STROKE_THICKNESS: string = "stroke_thickness";
    public static readonly STRETCHED_X: string = "stretched_x";
    public static readonly STRETCHED_Y: string = "stretched_y";
    public static readonly _SafeStr_8087: string = "text_color";
    public static readonly _SafeStr_7734: string = "text_style";
    public static readonly _SafeStr_14054: string = "tint";
    public static readonly TOOL_TIP_CAPTION: string = "tool_tip_caption";
    public static readonly TOOL_TIP_DELAY: string = "tool_tip_delay";
    public static readonly TOOL_TIP_IS_DYNAMIC: string = "tool_tip_is_dynamic";
    public static readonly INTERACTIVE_CURSOR_DISABLED: string = "interactive_cursor_disabled";
    public static readonly VERTICAL: string = "vertical";
    public static readonly WIDGET_TYPE: string = "widget_type";
    public static readonly _SafeStr_7632: string = "word_wrap";
    public static readonly _SafeStr_7877: string = "wrap_x";
    public static readonly _SafeStr_7643: string = "wrap_y";
    public static readonly ROTATION: string = "rotation";
    public static readonly _SafeStr_7626: string = "zoom_x";
    public static readonly _SafeStr_8584: string = "zoom_y";
    public static readonly _SafeStr_8031: string = "overflow_replace";
    public static readonly _SafeStr_7812: string = "test_id_key";
    public static readonly BOLD: string = "bold";
    public static readonly ETCHING_COLOR: string = "etching_color";
    public static readonly ETCHING_POSITION: string = "etching_position";
    public static readonly FONT_FACE: string = "font_face";
    public static readonly FONT_SIZE: string = "font_size";
    public static readonly ITALIC: string = "italic";
    public static readonly KERNING: string = "kerning";
    public static readonly LEADING: string = "leading";
    public static readonly SHARPNESS: string = "sharpness";
    public static readonly SPACING: string = "spacing";
    public static readonly THICKNESS: string = "thickness";
    public static readonly _SafeStr_7454: string = "underline";
    public static readonly HTML_LINK_TARGET_VALUE: string = "default";
    public static readonly ANTIALIAS_TYPE_RANGE: any[] = ["normal", "advanced"];
    public static readonly ETCHING_POSITION_RANGE: any[] = ["top-left", "top", "top-right", "left", "right", "bottom-left", "bottom", "bottom-right"];
    public static readonly HTML_LINK_TARGET_RANGE: any[] = ["default", "_blank", "_parent", "_self", "_top", "internal"];

    public static get PIVOT_POINT_RANGE(): any[] {
        PropertyKeys.#initStatics();
        return PropertyKeys.PIVOT_POINT_RANGE;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PropertyKeys.#staticsReady) return;
        PropertyKeys.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PropertyKeys, name, { value, writable: true, configurable: true, enumerable: true });
        set("PIVOT_POINT_RANGE", null);
        set("PIVOT_POINT_RANGE", PivotPoint.PIVOT_NAMES);
    }
}
