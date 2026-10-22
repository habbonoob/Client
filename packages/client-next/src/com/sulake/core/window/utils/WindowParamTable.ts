import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { WindowParam } from '@/com/sulake/core/window/enum/WindowParam';

export class WindowParamTable extends WindowParam {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowParamTable'); }

    constructor() {
        super();
    }

    public static fillTables(param1: Map<any, any>, param2: Map<any, any> = null): void {
        param1.set("null", 0);
        param1.set("bound_to_parent_rect", 32);
        param1.set("child_window", 33);
        param1.set("embedded_controller", 51);
        param1.set("expand_to_accommodate_children", 131072);
        param1.set("input_event_processor", 1);
        param1.set("internal_event_handling", 9);
        param1.set("mouse_dragging_target", 32768);
        param1.set("mouse_dragging_trigger", 257);
        param1.set("mouse_scaling_target", 65536);
        param1.set("mouse_scaling_trigger", 12288);
        param1.set("horizontal_mouse_scaling_trigger", 4096);
        param1.set("vertical_mouse_scaling_trigger", 8192);
        param1.set("observe_parent_input_events", 5);
        param1.set("parent_window", 1);
        param1.set("resize_to_accommodate_children", 147456);
        param1.set("relative_horizontal_scale_center", 192);
        param1.set("relative_horizontal_scale_fixed", 0);
        param1.set("relative_horizontal_scale_move", 64);
        param1.set("relative_horizontal_scale_strech", 128);
        param1.set("relative_scale_center", 3264);
        param1.set("relative_scale_fixed", 0);
        param1.set("relative_scale_move", 1088);
        param1.set("relative_scale_strech", 2176);
        param1.set("relative_vertical_scale_center", 3072);
        param1.set("relative_vertical_scale_fixed", 0);
        param1.set("relative_vertical_scale_move", 1024);
        param1.set("relative_vertical_scale_strech", 2048);
        param1.set("on_resize_align_left", 0);
        param1.set("on_resize_align_right", 262144);
        param1.set("on_resize_align_center", 786432);
        param1.set("on_resize_align_top", 0);
        param1.set("on_resize_align_bottom", 1048576);
        param1.set("on_resize_align_middle", 3145728);
        param1.set("on_accommodate_align_left", 0);
        param1.set("on_accommodate_align_right", 262144);
        param1.set("on_accommodate_align_center", 786432);
        param1.set("on_accommodate_align_top", 0);
        param1.set("on_accommodate_align_bottom", 1048576);
        param1.set("on_accommodate_align_middle", 3145728);
        param1.set("route_input_events_to_parent", 3);
        param1.set("use_parent_graphic_context", 16);
        param1.set("draggable_with_mouse", 33025);
        param1.set("scalable_with_mouse", 77824);
        param1.set("reflect_horizontal_resize_to_parent", 4194304);
        param1.set("reflect_vertical_resize_to_parent", 8388608);
        param1.set("reflect_resize_to_parent", 12582912);
        param1.set("force_clipping", 1073741824);
        param1.set("inherit_caption", 2147483648);
        if (param2 != null) {
            for (const _loc3_ of param1?.keys() ?? []) {
                param2.set(param1.get(_loc3_), _loc3_);
            }
        }
    }
}
