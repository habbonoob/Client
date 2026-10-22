import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWindowParam {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboWindowParam'); }

    public static readonly NULL: number = 0;
    public static readonly INPUT_EVENT_PROCESSOR: number = 1;
    public static readonly _SafeStr_7658: number = 131072;
    public static readonly RESIZE_TO_ACCOMMODATE_CHILDREN: number = 147456;
    public static readonly ROUTE_INPUT_EVENTS_TO_PARENT: number = 3;
    public static readonly _SafeStr_8132: number = 5;
    public static readonly INTERNAL_EVENT_HANDLING: number = 9;
    public static readonly USE_PARENT_GRAPHIC_CONTEXT: number = 16;
    public static readonly BOUND_TO_PARENT_RECT: number = 32;
    public static readonly RELATIVE_HORIZONTAL_SCALE_FIXED: number = 0;
    public static readonly RELATIVE_HORIZONTAL_SCALE_MOVE: number = 64;
    public static readonly RELATIVE_HORIZONTAL_SCALE_STRECH: number = 128;
    public static readonly RELATIVE_HORIZONTAL_SCALE_CENTER: number = 192;
    public static readonly RELATIVE_HORIZONTAL_SCALE_MASK: number = 192;
    public static readonly RELATIVE_VERTICAL_SCALE_FIXED: number = 0;
    public static readonly RELATIVE_VERTICAL_SCALE_MOVE: number = 1024;
    public static readonly RELATIVE_VERTICAL_SCALE_STRECH: number = 2048;
    public static readonly RELATIVE_VERTICAL_SCALE_CENTER: number = 3072;
    public static readonly RELATIVE_VERTICAL_SCALE_MASK: number = 3072;
    public static readonly RELATIVE_SCALE_FIXED: number = 0;
    public static readonly RELATIVE_SCALE_MOVE: number = 1088;
    public static readonly RELATIVE_SCALE_STRECH: number = 2176;
    public static readonly RELATIVE_SCALE_CENTER: number = 3264;
    public static readonly _SafeStr_7614: number = 0;
    public static readonly ON_RESIZE_ALIGN_CENTER: number = 786432;
    public static readonly ON_RESIZE_ALIGN_RIGHT: number = 262144;
    public static readonly _SafeStr_7718: number = 0;
    public static readonly _SafeStr_8448: number = 3145728;
    public static readonly ON_RESIZE_ALIGN_BOTTOM: number = 1048576;
    public static readonly MOUSE_DRAGGING_TARGET: number = 32768;
    public static readonly MOUSE_DRAGGING_TRIGGER: number = 257;
    public static readonly _SafeStr_8182: number = 33025;
    public static readonly MOUSE_SCALING_TARGET: number = 65536;
    public static readonly MOUSE_SCALING_TRIGGER: number = 12288;
    public static readonly HORIZONTAL_MOUSE_SCALING_TRIGGER: number = 4096;
    public static readonly VERTICAL_MOUSE_SCALING_TRIGGER: number = 8192;
    public static readonly MOUSE_SCALING_TRIGGER_MASK: number = 12288;
    public static readonly SCALABLE_WITH_MOUSE: number = 77824;
    public static readonly PARENT_WINDOW: number = 1;
    public static readonly CHILD_WINDOW: number = 33;
    public static readonly EMBEDDED_CONTROLLER: number = 51;
    public static readonly FORCE_CLIPPING: number = 1073741824;

    constructor() {
    }
}
