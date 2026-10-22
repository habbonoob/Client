import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWindowType {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboWindowType'); }

    public static readonly NULL: number = 0;
    public static readonly FRAME: number = 35;
    public static readonly DEFAULT_FRAME: number = 35;
    public static readonly SIMPLE_FRAME: number = 35;
    public static readonly LABEL: number = 12;
    public static readonly HORIZONTAL_ITEM_LIST: number = 51;
    public static readonly VERTICAL_ITEM_LIST: number = 50;
    public static readonly _SafeStr_8357: number = 54;
    public static readonly VERTICAL_ITEM_GRID: number = 53;
    public static readonly HORIZONTAL_SCROLLBAR: number = 130;
    public static readonly VERTICAL_SCROLLBAR: number = 131;
    public static readonly HORIZONTAL_ITEMLIST: number = 51;
    public static readonly VERTICAL_ITEMLIST: number = 50;
    public static readonly HORIZONTAL_SCROLLABLE_ITEMLIST: number = 57;
    public static readonly VERTICAL_SCROLLABLE_ITEMLIST: number = 56;
    public static readonly VERTICAL_SCROLLABLE_GRIDLIST: number = 140;
    public static readonly SIMPLE_BUTTON: number = 60;
    public static readonly THICK_BUTTON: number = 61;
    public static readonly BUBBLE: number = 45;
    public static readonly _SafeStr_7529: number = 60;
    public static readonly HEADER: number = 6;
    public static readonly INPUT_FIELD: number = 77;
    public static readonly CONTAINER: number = 4;
    public static readonly CONTAINER_BUTTON: number = 41;
    public static readonly DROP_MENU: number = 102;
    public static readonly _SafeStr_8521: number = 103;
    public static readonly _SafeStr_7570: number = 10;
    public static readonly _SafeStr_8020: number = 42;
    public static readonly SELECTOR_LIST: number = 43;
    public static readonly _SafeStr_7472: number = 71;
    public static readonly CHECKBOX: number = 70;
    public static readonly TAB_BUTTON: number = 93;
    public static readonly TAB_SELECTOR: number = 92;
    public static readonly TAB_CONTEXT: number = 91;
    public static readonly BACKGROUND: number = 2;
    public static readonly BITMAP_WRAPPER: number = 21;
    public static readonly BITMAP_FILL: number = 26;
    public static readonly STATIC_BITMAP_WRAPPER: number = 23;
    public static readonly DISPLAY_OBJECT_WRAPPER: number = 20;
    public static readonly GRADIENT: number = 24;
    public static readonly SHAPE: number = 22;
    public static readonly STROKE: number = 25;
    public static readonly PASSWORD: number = 78;
    public static readonly BORDER: number = 30;
    public static readonly _SafeStr_7625: number = 67;
    public static readonly BUTTON_GROUP_CENTER: number = 68;
    public static readonly BUTTON_GROUP_RIGHT: number = 69;

    constructor() {
    }
}
