import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboUserDefinedRoomEventsBootstrap } from '@/com/sulake/bootstrap/HabboUserDefinedRoomEventsBootstrap';
import { CoreWindowFrameworkLib } from '@/com/sulake/habbo/CoreWindowFrameworkLib';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const chest_generic_xml_binAsset = embedBytes("roomevents/chest_generic_xml.bin");
const coins_chest_contents_xml_binAsset = embedBytes("roomevents/coins_chest_contents_xml.bin");
const furni_chest_contents_xml_binAsset = embedBytes("roomevents/furni_chest_contents_xml.bin");
const chest_upgrade_xml_binAsset = embedBytes("roomevents/chest_upgrade_xml.bin");
const chest_wired_upgrade_xml_binAsset = embedBytes("roomevents/chest_wired_upgrade_xml.bin");
const transaction_overview_xml_binAsset = embedBytes("roomevents/transaction_overview_xml.bin");
const transaction_details_xml_binAsset = embedBytes("roomevents/transaction_details_xml.bin");
const wired_menu_view_xml_binAsset = embedBytes("roomevents/wired_menu_view_xml.bin");
const error_info_view_xml_binAsset = embedBytes("roomevents/error_info_view_xml.bin");
const variable_value_info_bubble_xml_binAsset = embedBytes("roomevents/variable_value_info_bubble_xml.bin");
const variables_management_overview_xml_binAsset = embedBytes("roomevents/variables_management_overview_xml.bin");
const variables_management_detail_xml_binAsset = embedBytes("roomevents/variables_management_detail_xml.bin");
const logs_overview_xml_binAsset = embedBytes("roomevents/logs_overview_xml.bin");
const icon_action_png_pngAsset = embedBitmap("shared/icon_action_png.png");
const icon_addon_png_pngAsset = embedBitmap("shared/icon_addon_png.png");
const icon_condition_png_pngAsset = embedBitmap("shared/icon_condition_png.png");
const icon_selector_png_pngAsset = embedBitmap("shared/icon_selector_png.png");
const icon_trigger_png_pngAsset = embedBitmap("shared/icon_trigger_png.png");
const icon_variable_png_pngAsset = embedBitmap("shared/icon_variable_png.png");
const icon_source_users_png_pngAsset = embedBitmap("roomevents/icon_source_users_png.png");
const icon_source_context_png_pngAsset = embedBitmap("roomevents/icon_source_context_png.png");
const icon_source_furni_png_pngAsset = embedBitmap("roomevents/icon_source_furni_png.png");
const icon_source_global_png_pngAsset = embedBitmap("roomevents/icon_source_global_png.png");
const move_0_png_pngAsset = embedBitmap("shared/move_0_png.png");
const move_1_png_pngAsset = embedBitmap("shared/move_1_png.png");
const move_2_png_pngAsset = embedBitmap("shared/move_2_png.png");
const move_3_png_pngAsset = embedBitmap("shared/move_3_png.png");
const move_4_png_pngAsset = embedBitmap("shared/move_4_png.png");
const move_5_png_pngAsset = embedBitmap("shared/move_5_png.png");
const move_6_png_pngAsset = embedBitmap("shared/move_6_png.png");
const move_7_png_pngAsset = embedBitmap("shared/move_7_png.png");
const move_diag_png_pngAsset = embedBitmap("shared/move_diag_png.png");
const move_rnd_png_pngAsset = embedBitmap("shared/move_rnd_png.png");
const move_vrt_png_pngAsset = embedBitmap("shared/move_vrt_png.png");
const rotate_ccw_png_pngAsset = embedBitmap("shared/rotate_ccw_png.png");
const rotate_cw_png_pngAsset = embedBitmap("shared/rotate_cw_png.png");
const slider_bg_png_pngAsset = embedBitmap("roomevents/slider_bg_png.png");
const slider_obj_png_pngAsset = embedBitmap("shared/slider_obj_png.png");
const HabboUserDefinedRoomEventsCom_manifest_binAsset = embedBytes("roomevents/HabboUserDefinedRoomEventsCom_manifest.bin");
const wired_style_volter_xml_binAsset = embedBytes("roomevents/wired_style_volter_xml.bin");
const wired_style_volter_yellow_xml_binAsset = embedBytes("roomevents/wired_style_volter_yellow_xml.bin");
const wired_style_volter_green_xml_binAsset = embedBytes("roomevents/wired_style_volter_green_xml.bin");
const wired_style_volter_blue_xml_binAsset = embedBytes("roomevents/wired_style_volter_blue_xml.bin");
const wired_style_illumina_xml_binAsset = embedBytes("roomevents/wired_style_illumina_xml.bin");
const wired_style_ubuntu_xml_binAsset = embedBytes("roomevents/wired_style_ubuntu_xml.bin");
const horizontal_list_view_xml_binAsset = embedBytes("roomevents/horizontal_list_view_xml.bin");
const vertical_list_view_xml_binAsset = embedBytes("roomevents/vertical_list_view_xml.bin");
const vertical_scroll_list_view_xml_binAsset = embedBytes("roomevents/vertical_scroll_list_view_xml.bin");
const radio_group_view_xml_binAsset = embedBytes("roomevents/radio_group_view_xml.bin");
const search_tree_dropdown_xml_binAsset = embedBytes("roomevents/search_tree_dropdown_xml.bin");
const growing_container_view_xml_binAsset = embedBytes("roomevents/growing_container_view_xml.bin");
const container_view_xml_binAsset = embedBytes("roomevents/container_view_xml.bin");
const border_view_xml_binAsset = embedBytes("roomevents/border_view_xml.bin");
const static_bitmap_view_xml_binAsset = embedBytes("roomevents/static_bitmap_view_xml.bin");
const bitmap_wrapper_view_xml_binAsset = embedBytes("roomevents/bitmap_wrapper_view_xml.bin");
const avatar_image_view_xml_binAsset = embedBytes("roomevents/avatar_image_view_xml.bin");

export class HabboUserDefinedRoomEventsCom extends SimpleApplication {
    static { registerClassName(this, 'HabboUserDefinedRoomEventsCom'); }

    static #staticsReady = false;

    public static chest_generic_xml = chest_generic_xml_binAsset;

    public static coins_chest_contents_xml = coins_chest_contents_xml_binAsset;

    public static furni_chest_contents_xml = furni_chest_contents_xml_binAsset;

    public static chest_upgrade_xml = chest_upgrade_xml_binAsset;

    public static chest_wired_upgrade_xml = chest_wired_upgrade_xml_binAsset;

    public static transaction_overview_xml = transaction_overview_xml_binAsset;

    public static transaction_details_xml = transaction_details_xml_binAsset;

    public static wired_menu_view_xml = wired_menu_view_xml_binAsset;

    public static error_info_view_xml = error_info_view_xml_binAsset;

    public static variable_value_info_bubble_xml = variable_value_info_bubble_xml_binAsset;

    public static variables_management_overview_xml = variables_management_overview_xml_binAsset;

    public static variables_management_detail_xml = variables_management_detail_xml_binAsset;

    public static logs_overview_xml = logs_overview_xml_binAsset;

    public static icon_action_png = icon_action_png_pngAsset;

    public static icon_addon_png = icon_addon_png_pngAsset;

    public static icon_condition_png = icon_condition_png_pngAsset;

    public static icon_selector_png = icon_selector_png_pngAsset;

    public static icon_trigger_png = icon_trigger_png_pngAsset;

    public static icon_variable_png = icon_variable_png_pngAsset;

    public static icon_source_users_png = icon_source_users_png_pngAsset;

    public static icon_source_context_png = icon_source_context_png_pngAsset;

    public static icon_source_furni_png = icon_source_furni_png_pngAsset;

    public static icon_source_global_png = icon_source_global_png_pngAsset;

    public static move_0_png = move_0_png_pngAsset;

    public static move_1_png = move_1_png_pngAsset;

    public static move_2_png = move_2_png_pngAsset;

    public static move_3_png = move_3_png_pngAsset;

    public static move_4_png = move_4_png_pngAsset;

    public static move_5_png = move_5_png_pngAsset;

    public static move_6_png = move_6_png_pngAsset;

    public static move_7_png = move_7_png_pngAsset;

    public static move_diag_png = move_diag_png_pngAsset;

    public static move_rnd_png = move_rnd_png_pngAsset;

    public static move_vrt_png = move_vrt_png_pngAsset;

    public static rotate_ccw_png = rotate_ccw_png_pngAsset;

    public static rotate_cw_png = rotate_cw_png_pngAsset;

    public static slider_bg_png = slider_bg_png_pngAsset;

    public static slider_obj_png = slider_obj_png_pngAsset;

    public static manifest = HabboUserDefinedRoomEventsCom_manifest_binAsset;

    public static wired_style_volter_xml = wired_style_volter_xml_binAsset;

    public static wired_style_volter_yellow_xml = wired_style_volter_yellow_xml_binAsset;

    public static wired_style_volter_green_xml = wired_style_volter_green_xml_binAsset;

    public static wired_style_volter_blue_xml = wired_style_volter_blue_xml_binAsset;

    public static wired_style_illumina_xml = wired_style_illumina_xml_binAsset;

    public static wired_style_ubuntu_xml = wired_style_ubuntu_xml_binAsset;

    public static horizontal_list_view_xml = horizontal_list_view_xml_binAsset;

    public static vertical_list_view_xml = vertical_list_view_xml_binAsset;

    public static vertical_scroll_list_view_xml = vertical_scroll_list_view_xml_binAsset;

    public static radio_group_view_xml = radio_group_view_xml_binAsset;

    public static search_tree_dropdown_xml = search_tree_dropdown_xml_binAsset;

    public static growing_container_view_xml = growing_container_view_xml_binAsset;

    public static container_view_xml = container_view_xml_binAsset;

    public static border_view_xml = border_view_xml_binAsset;

    public static static_bitmap_view_xml = static_bitmap_view_xml_binAsset;

    public static bitmap_wrapper_view_xml = bitmap_wrapper_view_xml_binAsset;

    public static avatar_image_view_xml = avatar_image_view_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboUserDefinedRoomEventsCom.#initStatics();
        return HabboUserDefinedRoomEventsCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboUserDefinedRoomEventsCom.#initStatics();
        HabboUserDefinedRoomEventsCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboUserDefinedRoomEventsCom.#staticsReady) return;
        HabboUserDefinedRoomEventsCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboUserDefinedRoomEventsCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboUserDefinedRoomEventsBootstrap, IIDHabboUserDefinedRoomEvents, CoreWindowFrameworkLib]);
    }
}
