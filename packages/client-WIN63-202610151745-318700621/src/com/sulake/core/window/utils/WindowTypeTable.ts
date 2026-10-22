import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { WindowType } from '@/com/sulake/core/window/enum/WindowType';

export class WindowTypeTable extends WindowType {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowTypeTable'); }

    constructor() {
        super();
    }

    public static fillTables(param1: Map<any, any>, param2: Map<any, any> = null): void {
        let _loc3_: string = null;
        param1.set("background", 2);
        param1.set("bitmap", 21);
        param1.set("bitmap_fill", 26);
        param1.set("border", 30);
        param1.set("boxsizer", 17);
        param1.set("border_notify", 33);
        param1.set("bubble", 45);
        param1.set("bubble_pointer_up", 46);
        param1.set("bubble_pointer_right", 47);
        param1.set("bubble_pointer_down", 48);
        param1.set("bubble_pointer_left", 49);
        param1.set("button", 60);
        param1.set("button_thick", 61);
        param1.set("button_icon", 62);
        param1.set("button_group_left", 67);
        param1.set("button_group_center", 68);
        param1.set("button_group_right", 69);
        param1.set("checkbox", 70);
        param1.set("closebutton", 72);
        param1.set("container", 4);
        param1.set("container_button", 41);
        param1.set("display_object_wrapper", 20);
        param1.set("dropmenu", 102);
        param1.set("dropmenu_item", 103);
        param1.set("droplist", 105);
        param1.set("droplist_item", 106);
        param1.set("formatted_text", 15);
        param1.set("frame", 35);
        param1.set("frame_notify", 38);
        param1.set("gradient", 24);
        param1.set("header", 6);
        param1.set("html", 11);
        param1.set("icon", 1);
        param1.set("iconbutton", 79);
        param1.set("itemgrid", 52);
        param1.set("itemgrid_horizontal", 54);
        param1.set("itemgrid_vertical", 53);
        param1.set("itemlist", 50);
        param1.set("itemlist_horizontal", 51);
        param1.set("itemlist_vertical", 50);
        param1.set("label", 12);
        param1.set("maximizebox", 74);
        param1.set("menu", 100);
        param1.set("menu_item", 101);
        param1.set("submenu", 104);
        param1.set("minimizebox", 73);
        param1.set("notify", 9);
        param1.set("null", 0);
        param1.set("password", 78);
        param1.set("radiobutton", 71);
        param1.set("region", 5);
        param1.set("restorebox", 75);
        param1.set("scaler", 120);
        param1.set("scaler_horizontal", 122);
        param1.set("scaler_vertical", 121);
        param1.set("scrollbar_horizontal", 130);
        param1.set("scrollbar_vertical", 131);
        param1.set("scrollbar_slider_button_up", 139);
        param1.set("scrollbar_slider_button_down", 137);
        param1.set("scrollbar_slider_button_left", 138);
        param1.set("scrollbar_slider_button_right", 136);
        param1.set("scrollbar_slider_bar_horizontal", 132);
        param1.set("scrollbar_slider_bar_vertical", 133);
        param1.set("scrollbar_slider_track_horizontal", 134);
        param1.set("scrollbar_slider_track_vertical", 135);
        param1.set("scrollable_itemlist", 55);
        param1.set("scrollable_itemlist_vertical", 56);
        param1.set("scrollable_itemgrid_vertical", 140);
        param1.set("scrollable_itemlist_horizontal", 57);
        param1.set("selector", 42);
        param1.set("selector_list", 43);
        param1.set("shape", 22);
        param1.set("static_bitmap", 23);
        param1.set("stroke", 25);
        param1.set("submenu", 104);
        param1.set("tab_button", 93);
        param1.set("tab_container_button", 94);
        param1.set("tab_context", 91);
        param1.set("tab_content", 90);
        param1.set("tab_selector", 92);
        param1.set("text", 10);
        param1.set("input", 77);
        param1.set("link", 14);
        param1.set("toolbar", 7);
        param1.set("tooltip", 8);
        param1.set("widget", 16);
        if (param2 != null) {
            for (_loc3_ of param1?.keys() ?? []) {
                param2.set(param1.get(_loc3_), _loc3_);
            }
        }
    }
}
