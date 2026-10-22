import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes, embedFont } from '@habbo-pixi/runtime/embed/embed';
import { HabboWindowManagerComponentBootstrap } from '@/com/sulake/bootstrap/HabboWindowManagerComponentBootstrap';
import { CoreWindowFrameworkLib } from '@/com/sulake/habbo/CoreWindowFrameworkLib';
import { ICoreLocalizationFrameworkLib } from '@/com/sulake/habbo/ICoreLocalizationFrameworkLib';
import { ICoreWindowFrameworkLib } from '@/com/sulake/habbo/ICoreWindowFrameworkLib';
import { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { IIDCoreWindowManager } from '@/com/sulake/iid/IIDCoreWindowManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboWindowManagerCom_manifest_binAsset = embedBytes("window/HabboWindowManagerCom_manifest.bin");
const habbo_element_description_xml_binAsset = embedBytes("window/habbo_element_description_xml.bin");
const habbo_window_layout_alert_xml_binAsset = embedBytes("window/habbo_window_layout_alert_xml.bin");
const habbo_window_layout_bubble_xml_binAsset = embedBytes("window/habbo_window_layout_bubble_xml.bin");
const habbo_window_layout_bubble_7_xml_binAsset = embedBytes("window/habbo_window_layout_bubble_7_xml.bin");
const habbo_window_layout_button_xml_binAsset = embedBytes("window/habbo_window_layout_button_xml.bin");
const habbo_window_layout_button_thick_xml_binAsset = embedBytes("window/habbo_window_layout_button_thick_xml.bin");
const habbo_window_layout_button_black_xml_binAsset = embedBytes("window/habbo_window_layout_button_black_xml.bin");
const habbo_window_layout_button_thick_black_xml_binAsset = embedBytes("window/habbo_window_layout_button_thick_black_xml.bin");
const habbo_window_layout_button_shiny_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_xml.bin");
const habbo_window_layout_button_shiny_thick_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_thick_xml.bin");
const habbo_window_layout_button_shiny_large_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_large_xml.bin");
const habbo_window_layout_button_shiny_large_5_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_large_5_xml.bin");
const habbo_window_layout_button_shiny_black_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_black_xml.bin");
const habbo_window_layout_button_shiny_thick_black_xml_binAsset = embedBytes("window/habbo_window_layout_button_shiny_thick_black_xml.bin");
const habbo_window_layout_dropmenu_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_xml.bin");
const habbo_window_layout_dropmenu_3_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_3_xml.bin");
const habbo_window_layout_dropmenu_black_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_black_xml.bin");
const habbo_window_layout_dropmenu_item_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_item_xml.bin");
const habbo_window_layout_dropmenu_item_3_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_item_3_xml.bin");
const habbo_window_layout_dropmenu_item_black_xml_binAsset = embedBytes("window/habbo_window_layout_dropmenu_item_black_xml.bin");
const habbo_window_layout_droplist_xml_binAsset = embedBytes("window/habbo_window_layout_droplist_xml.bin");
const habbo_window_layout_frame_xml_binAsset = embedBytes("window/habbo_window_layout_frame_xml.bin");
const habbo_window_layout_frame_3_xml_binAsset = embedBytes("window/habbo_window_layout_frame_3_xml.bin");
const habbo_window_layout_frame_7_xml_binAsset = embedBytes("window/habbo_window_layout_frame_7_xml.bin");
const habbo_window_layout_frame_leaderboard_xml_binAsset = embedBytes("window/habbo_window_layout_frame_leaderboard_xml.bin");
const habbo_window_layout_header_xml_binAsset = embedBytes("window/habbo_window_layout_header_xml.bin");
const habbo_window_layout_header_black_xml_binAsset = embedBytes("window/habbo_window_layout_header_black_xml.bin");
const habbo_window_layout_header_3_xml_binAsset = embedBytes("window/habbo_window_layout_header_3_xml.bin");
const habbo_window_layout_header_7_xml_binAsset = embedBytes("window/habbo_window_layout_header_7_xml.bin");
const habbo_window_layout_header_leaderboard_xml_binAsset = embedBytes("window/habbo_window_layout_header_leaderboard_xml.bin");
const habbo_window_layout_scaler_xml_binAsset = embedBytes("window/habbo_window_layout_scaler_xml.bin");
const habbo_window_layout_scaler_3_xml_binAsset = embedBytes("window/habbo_window_layout_scaler_3_xml.bin");
const habbo_window_layout_scrollbar_horizontal_xml_binAsset = embedBytes("window/habbo_window_layout_scrollbar_horizontal_xml.bin");
const habbo_window_layout_scrollbar_vertical_xml_binAsset = embedBytes("window/habbo_window_layout_scrollbar_vertical_xml.bin");
const habbo_window_layout_scrollable_itemlist_vertical_xml_binAsset = embedBytes("window/habbo_window_layout_scrollable_itemlist_vertical_xml.bin");
const habbo_window_layout_scrollable_itemgrid_vertical_xml_binAsset = embedBytes("window/habbo_window_layout_scrollable_itemgrid_vertical_xml.bin");
const habbo_window_layout_scrollable_itemlist_vertical_ubuntu_xml_binAsset = embedBytes("window/habbo_window_layout_scrollable_itemlist_vertical_ubuntu_xml.bin");
const habbo_window_layout_scrollable_itemgrid_vertical_ubuntu_xml_binAsset = embedBytes("window/habbo_window_layout_scrollable_itemgrid_vertical_ubuntu_xml.bin");
const habbo_window_layout_simple_xml_binAsset = embedBytes("window/habbo_window_layout_simple_xml.bin");
const habbo_window_layout_tab_button_xml_binAsset = embedBytes("window/habbo_window_layout_tab_button_xml.bin");
const habbo_window_layout_tab_button_black_xml_binAsset = embedBytes("window/habbo_window_layout_tab_button_black_xml.bin");
const habbo_window_layout_tab_button_3_xml_binAsset = embedBytes("window/habbo_window_layout_tab_button_3_xml.bin");
const habbo_window_layout_tab_context_xml_binAsset = embedBytes("window/habbo_window_layout_tab_context_xml.bin");
const habbo_window_layout_tab_context_3_xml_binAsset = embedBytes("window/habbo_window_layout_tab_context_3_xml.bin");
const habbo_window_layout_tooltip_xml_binAsset = embedBytes("window/habbo_window_layout_tooltip_xml.bin");
const habbo_skin_frame_xml_binAsset = embedBytes("window/habbo_skin_frame_xml.bin");
const habbo_skin_frame_3_xml_binAsset = embedBytes("window/habbo_skin_frame_3_xml.bin");
const habbo_skin_frame_7_xml_binAsset = embedBytes("window/habbo_skin_frame_7_xml.bin");
const habbo_skin_frame_leaderboard_all_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_all_xml.bin");
const habbo_skin_frame_leaderboard_ach_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_ach_xml.bin");
const habbo_skin_frame_leaderboard_rarity_uncommon_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_uncommon_xml.bin");
const habbo_skin_frame_leaderboard_rarity_1_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_1_xml.bin");
const habbo_skin_frame_leaderboard_rarity_2_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_2_xml.bin");
const habbo_skin_frame_leaderboard_rarity_3_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_3_xml.bin");
const habbo_skin_frame_leaderboard_rarity_4_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_4_xml.bin");
const habbo_skin_frame_leaderboard_rarity_5_xml_binAsset = embedBytes("window/habbo_skin_frame_leaderboard_rarity_5_xml.bin");
const habbo_skin_bubble_xml_binAsset = embedBytes("window/habbo_skin_bubble_xml.bin");
const habbo_skin_bubble_pointer_up_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_up_xml.bin");
const habbo_skin_bubble_pointer_right_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_right_xml.bin");
const habbo_skin_bubble_pointer_down_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_down_xml.bin");
const habbo_skin_frame_pointer_down_xml_binAsset = embedBytes("window/habbo_skin_frame_pointer_down_xml.bin");
const habbo_skin_bubble_pointer_left_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_left_xml.bin");
const habbo_skin_bubble_7_xml_binAsset = embedBytes("window/habbo_skin_bubble_7_xml.bin");
const habbo_skin_bubble_pointer_up_7_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_up_7_xml.bin");
const habbo_skin_bubble_pointer_right_7_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_right_7_xml.bin");
const habbo_skin_bubble_pointer_down_7_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_down_7_xml.bin");
const habbo_skin_bubble_pointer_left_7_xml_binAsset = embedBytes("window/habbo_skin_bubble_pointer_left_7_xml.bin");
const habbo_skin_button_default_xml_binAsset = embedBytes("window/habbo_skin_button_default_xml.bin");
const habbo_skin_button_default_black_xml_binAsset = embedBytes("window/habbo_skin_button_default_black_xml.bin");
const habbo_skin_button_default_white_xml_binAsset = embedBytes("window/habbo_skin_button_default_white_xml.bin");
const habbo_skin_button_shiny_default_xml_binAsset = embedBytes("window/habbo_skin_button_shiny_default_xml.bin");
const habbo_skin_button_shiny_black_xml_binAsset = embedBytes("window/habbo_skin_button_shiny_black_xml.bin");
const habbo_skin_button_shiny_thick_xml_binAsset = embedBytes("window/habbo_skin_button_shiny_thick_xml.bin");
const habbo_skin_button_shiny_large_xml_binAsset = embedBytes("window/habbo_skin_button_shiny_large_xml.bin");
const habbo_skin_button_shiny_thick_black_xml_binAsset = embedBytes("window/habbo_skin_button_shiny_thick_black_xml.bin");
const habbo_skin_button_thick_xml_binAsset = embedBytes("window/habbo_skin_button_thick_xml.bin");
const habbo_skin_button_thick_black_xml_binAsset = embedBytes("window/habbo_skin_button_thick_black_xml.bin");
const habbo_skin_button_thick_white_xml_binAsset = embedBytes("window/habbo_skin_button_thick_white_xml.bin");
const habbo_skin_button_group_left_xml_binAsset = embedBytes("window/habbo_skin_button_group_left_xml.bin");
const habbo_skin_button_group_left_black_xml_binAsset = embedBytes("window/habbo_skin_button_group_left_black_xml.bin");
const habbo_skin_button_group_left_white_xml_binAsset = embedBytes("window/habbo_skin_button_group_left_white_xml.bin");
const habbo_skin_button_group_center_xml_binAsset = embedBytes("window/habbo_skin_button_group_center_xml.bin");
const habbo_skin_button_group_center_black_xml_binAsset = embedBytes("window/habbo_skin_button_group_center_black_xml.bin");
const habbo_skin_button_group_center_white_xml_binAsset = embedBytes("window/habbo_skin_button_group_center_white_xml.bin");
const habbo_skin_button_group_right_xml_binAsset = embedBytes("window/habbo_skin_button_group_right_xml.bin");
const habbo_skin_button_group_right_black_xml_binAsset = embedBytes("window/habbo_skin_button_group_right_black_xml.bin");
const habbo_skin_button_group_right_white_xml_binAsset = embedBytes("window/habbo_skin_button_group_right_white_xml.bin");
const habbo_skin_button_checkbox_xml_binAsset = embedBytes("window/habbo_skin_button_checkbox_xml.bin");
const habbo_skin_button_checkbox_black_xml_binAsset = embedBytes("window/habbo_skin_button_checkbox_black_xml.bin");
const habbo_skin_button_checkbox_white_xml_binAsset = embedBytes("window/habbo_skin_button_checkbox_white_xml.bin");
const habbo_skin_button_close_xml_binAsset = embedBytes("window/habbo_skin_button_close_xml.bin");
const habbo_skin_button_close_black_xml_binAsset = embedBytes("window/habbo_skin_button_close_black_xml.bin");
const habbo_skin_button_close_white_xml_binAsset = embedBytes("window/habbo_skin_button_close_white_xml.bin");
const habbo_skin_button_close_3_xml_binAsset = embedBytes("window/habbo_skin_button_close_3_xml.bin");
const habbo_skin_button_close_leaderboard_xml_binAsset = embedBytes("window/habbo_skin_button_close_leaderboard_xml.bin");
const habbo_skin_button_plus_3_xml_binAsset = embedBytes("window/habbo_skin_button_plus_3_xml.bin");
const habbo_skin_button_minus_3_xml_binAsset = embedBytes("window/habbo_skin_button_minus_3_xml.bin");
const habbo_skin_button_help_3_xml_binAsset = embedBytes("window/habbo_skin_button_help_3_xml.bin");
const habbo_skin_button_menu_xml_binAsset = embedBytes("window/habbo_skin_button_menu_xml.bin");
const habbo_skin_button_radio_xml_binAsset = embedBytes("window/habbo_skin_button_radio_xml.bin");
const habbo_skin_button_radio_black_xml_binAsset = embedBytes("window/habbo_skin_button_radio_black_xml.bin");
const habbo_skin_button_radio_white_xml_binAsset = embedBytes("window/habbo_skin_button_radio_white_xml.bin");
const habbo_skin_button_tab_xml_binAsset = embedBytes("window/habbo_skin_button_tab_xml.bin");
const habbo_skin_button_tab_black_xml_binAsset = embedBytes("window/habbo_skin_button_tab_black_xml.bin");
const habbo_skin_button_tab_white_xml_binAsset = embedBytes("window/habbo_skin_button_tab_white_xml.bin");
const habbo_skin_button_tab_3_xml_binAsset = embedBytes("window/habbo_skin_button_tab_3_xml.bin");
const habbo_skin_tab_content_3_xml_binAsset = embedBytes("window/habbo_skin_tab_content_3_xml.bin");
const habbo_skin_scaler_xml_binAsset = embedBytes("window/habbo_skin_scaler_xml.bin");
const habbo_skin_scaler_black_xml_binAsset = embedBytes("window/habbo_skin_scaler_black_xml.bin");
const habbo_skin_scaler_white_xml_binAsset = embedBytes("window/habbo_skin_scaler_white_xml.bin");
const habbo_skin_scaler_3_xml_binAsset = embedBytes("window/habbo_skin_scaler_3_xml.bin");
const habbo_skin_scrollbar_xml_binAsset = embedBytes("window/habbo_skin_scrollbar_xml.bin");
const habbo_skin_scrollbar_black_xml_binAsset = embedBytes("window/habbo_skin_scrollbar_black_xml.bin");
const habbo_skin_scrollbar_3_xml_binAsset = embedBytes("window/habbo_skin_scrollbar_3_xml.bin");
const habbo_skin_header_xml_binAsset = embedBytes("window/habbo_skin_header_xml.bin");
const habbo_skin_header_3_xml_binAsset = embedBytes("window/habbo_skin_header_3_xml.bin");
const habbo_skin_header_7_xml_binAsset = embedBytes("window/habbo_skin_header_7_xml.bin");
const habbo_skin_header_leaderboard_xml_binAsset = embedBytes("window/habbo_skin_header_leaderboard_xml.bin");
const habbo_skin_icon_set_xml_binAsset = embedBytes("window/habbo_skin_icon_set_xml.bin");
const habbo_skin_dropmenu_xml_binAsset = embedBytes("window/habbo_skin_dropmenu_xml.bin");
const habbo_skin_dropmenu_3_xml_binAsset = embedBytes("window/habbo_skin_dropmenu_3_xml.bin");
const habbo_skin_dropmenu_black_xml_binAsset = embedBytes("window/habbo_skin_dropmenu_black_xml.bin");
const habbo_skin_droplist_xml_binAsset = embedBytes("window/habbo_skin_droplist_xml.bin");
const habbo_skin_droplist_thick_xml_binAsset = embedBytes("window/habbo_skin_droplist_thick_xml.bin");
const habbo_skin_tab_context_xml_binAsset = embedBytes("window/habbo_skin_tab_context_xml.bin");
const habbo_skin_border_black_xml_binAsset = embedBytes("window/habbo_skin_border_black_xml.bin");
const habbo_skin_border_colorless_xml_binAsset = embedBytes("window/habbo_skin_border_colorless_xml.bin");
const habbo_skin_border_colorless_dropshadow_xml_binAsset = embedBytes("window/habbo_skin_border_colorless_dropshadow_xml.bin");
const habbo_skin_border_white_xml_binAsset = embedBytes("window/habbo_skin_border_white_xml.bin");
const habbo_skin_border_slot_xml_binAsset = embedBytes("window/habbo_skin_border_slot_xml.bin");
const habbo_skin_border_slot_2_xml_binAsset = embedBytes("window/habbo_skin_border_slot_2_xml.bin");
const habbo_skin_border_4_xml_binAsset = embedBytes("window/habbo_skin_border_4_xml.bin");
const habbo_skin_border_5_xml_binAsset = embedBytes("window/habbo_skin_border_5_xml.bin");
const habbo_skin_border_6_xml_binAsset = embedBytes("window/habbo_skin_border_6_xml.bin");
const habbo_skin_border_7_xml_binAsset = embedBytes("window/habbo_skin_border_7_xml.bin");
const habbo_skin_border_8_xml_binAsset = embedBytes("window/habbo_skin_border_8_xml.bin");
const habbo_skin_border_9_xml_binAsset = embedBytes("window/habbo_skin_border_9_xml.bin");
const habbo_skin_border_12_xml_binAsset = embedBytes("window/habbo_skin_border_12_xml.bin");
const habbo_skin_border_13_xml_binAsset = embedBytes("window/habbo_skin_border_13_xml.bin");
const habbo_skin_border_14_xml_binAsset = embedBytes("window/habbo_skin_border_14_xml.bin");
const habbo_skin_border_15_xml_binAsset = embedBytes("window/habbo_skin_border_15_xml.bin");
const habbo_skin_border_16_xml_binAsset = embedBytes("window/habbo_skin_border_16_xml.bin");
const habbo_skin_text_xml_binAsset = embedBytes("window/habbo_skin_text_xml.bin");
const habbo_skin_tooltip_xml_binAsset = embedBytes("window/habbo_skin_tooltip_xml.bin");
const text_styles_css_binAsset = embedBytes("window/text_styles_css.bin");
const habbo_blue_skin_png_pngAsset = embedBitmap("window/habbo_blue_skin_png.png");
const habbo_skin_ubuntu_png_pngAsset = embedBitmap("window/habbo_skin_ubuntu_png.png");
const habbo_border_hsv_layers_png_pngAsset = embedBitmap("window/habbo_border_hsv_layers_png.png");
const habbo_border_hsv_layers2_png_pngAsset = embedBitmap("window/habbo_border_hsv_layers2_png.png");
const skin_ubuntu_bg_9_pngAsset = embedBitmap("window/skin_ubuntu_bg_9.png");
const ubuntu_frame_leaderboard_all_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_all_png.png");
const ubuntu_frame_leaderboard_ach_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_ach_png.png");
const ubuntu_frame_leaderboard_rarity_uncommon_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_uncommon_png.png");
const ubuntu_frame_leaderboard_rarity_1_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_1_png.png");
const ubuntu_frame_leaderboard_rarity_2_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_2_png.png");
const ubuntu_frame_leaderboard_rarity_3_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_3_png.png");
const ubuntu_frame_leaderboard_rarity_4_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_4_png.png");
const ubuntu_frame_leaderboard_rarity_5_png_pngAsset = embedBitmap("window/ubuntu_frame_leaderboard_rarity_5_png.png");
const leaderboard_button_close_png_pngAsset = embedBitmap("window/leaderboard_button_close_png.png");
const habbo_cursor_link_png_pngAsset = embedBitmap("window/habbo_cursor_link_png.png");
const habbo_cursor_drag_png_pngAsset = embedBitmap("window/habbo_cursor_drag_png.png");
const habbo_icons_png_pngAsset = embedBitmap("window/habbo_icons_png.png");
const placeholder_avatar_png_pngAsset = embedBitmap("window/placeholder_avatar_png.png");
const placeholder_avatar_head_png_pngAsset = embedBitmap("window/placeholder_avatar_head_png.png");
const placeholder_avatar_cropped_png_pngAsset = embedBitmap("window/placeholder_avatar_cropped_png.png");
const placeholder_avatar_head_cropped_png_pngAsset = embedBitmap("window/placeholder_avatar_head_cropped_png.png");
const placeholder_avatar_small_png_pngAsset = embedBitmap("window/placeholder_avatar_small_png.png");
const placeholder_avatar_small_head_png_pngAsset = embedBitmap("window/placeholder_avatar_small_head_png.png");
const placeholder_avatar_small_cropped_png_pngAsset = embedBitmap("window/placeholder_avatar_small_cropped_png.png");
const placeholder_avatar_small_head_cropped_png_pngAsset = embedBitmap("window/placeholder_avatar_small_head_cropped_png.png");
const placeholder_pet_png_pngAsset = embedBitmap("window/placeholder_pet_png.png");
const placeholder_pet_small_png_pngAsset = embedBitmap("window/placeholder_pet_small_png.png");
const placeholder_furni_png_pngAsset = embedBitmap("window/placeholder_furni_png.png");
const placeholder_furni_small_png_pngAsset = embedBitmap("window/placeholder_furni_small_png.png");
const sticker_croco_pngAsset = embedBitmap("window/sticker_croco.png");
const volter_ttfAsset = embedFont("window/volter.ttf", { fontName: "Volter", fontFamily: "Volter", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-00AC,U+00AE-017E,U+0192-0192,U+02C6-02C7,U+02D8-02DD,U+03A9-03A9,U+03C0-03C0,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+20AC-20AC,U+2122-2122,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2212,U+221A-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+FB01-FB02" });
const volterb_ttfAsset = embedFont("window/volterb.ttf", { fontName: "Volter Bold", fontFamily: "Volter", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-00A5,U+00A7-00AC,U+00AE-00B1,U+00B4-00B8,U+00BA-00BB,U+00BF-00CF,U+00D1-00D6,U+00D8-00DC,U+00DF-00EF,U+00F1-00FC,U+00FF-00FF,U+011E-011F,U+0130-0131,U+0152-0153,U+015E-015F,U+0178-0178,U+0192-0192,U+02C6-02C7,U+02D8-02DD,U+03C0-03C0,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+20AC-20AC,U+2122-2122,U+2126-2126,U+2202-2202,U+220F-220F,U+221A-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F8FF-F8FF,U+FB01-FB02" });
const HabboWindowManagerCom_ubuntu_regular_ttfAsset = embedFont("shared/HabboWindowManagerCom_ubuntu_regular.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_ttfAsset = embedFont("shared/ubuntu_bold.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_condensed_ttfAsset = embedFont("window/ubuntu_condensed.ttf", { fontName: "UbuntuCondensed", fontFamily: "Ubuntu Condensed", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntuThick_bold_ttfAsset = embedFont("window/ubuntuThick_bold.ttf", { fontName: "UbuntuThick", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_italic_ttfAsset = embedFont("shared/ubuntu_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_italic_ttfAsset = embedFont("shared/ubuntu_bold_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntuMedium_ttfAsset = embedFont("window/ubuntuMedium.ttf", { fontName: "UbuntuMedium", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const habbo_window_alert_xml_binAsset = embedBytes("window/habbo_window_alert_xml.bin");
const habbo_window_alert_link_xml_binAsset = embedBytes("window/habbo_window_alert_link_xml.bin");
const habbo_window_confirm_xml_binAsset = embedBytes("window/habbo_window_confirm_xml.bin");
const habbo_crasher_dialog_xml_binAsset = embedBytes("window/habbo_crasher_dialog_xml.bin");
const unseen_item_counter_xml_binAsset = embedBytes("window/unseen_item_counter_xml.bin");
const HabboWindowManagerCom_simple_alert_xml_binAsset = embedBytes("window/HabboWindowManagerCom_simple_alert_xml.bin");
const illumina_alert_illustrations_frank_neutral_png_pngAsset = embedBitmap("window/illumina_alert_illustrations_frank_neutral_png.png");
const habbo_skin_illumina_light_png_pngAsset = embedBitmap("window/habbo_skin_illumina_light_png.png");
const illumina_light_balloon_png_pngAsset = embedBitmap("window/illumina_light_balloon_png.png");
const illumina_light_border_etched_png_pngAsset = embedBitmap("window/illumina_light_border_etched_png.png");
const frame_png_pngAsset = embedBitmap("shared/frame_png.png");
const illumina_light_border_infobox_png_pngAsset = embedBitmap("window/illumina_light_border_infobox_png.png");
const illumina_light_border_light_png_pngAsset = embedBitmap("window/illumina_light_border_light_png.png");
const illumina_light_border_raised_png_pngAsset = embedBitmap("window/illumina_light_border_raised_png.png");
const illumina_light_border_sunk_png_pngAsset = embedBitmap("window/illumina_light_border_sunk_png.png");
const illumina_light_bubble_chat_arrow_png_pngAsset = embedBitmap("window/illumina_light_bubble_chat_arrow_png.png");
const illumina_light_bubble_chat_bg_png_pngAsset = embedBitmap("window/illumina_light_bubble_chat_bg_png.png");
const illumina_light_button_default_png_pngAsset = embedBitmap("window/illumina_light_button_default_png.png");
const illumina_light_button_multi_png_pngAsset = embedBitmap("window/illumina_light_button_multi_png.png");
const illumina_light_button_frame_close_png_pngAsset = embedBitmap("window/illumina_light_button_frame_close_png.png");
const illumina_light_button_frame_menu_png_pngAsset = embedBitmap("window/illumina_light_button_frame_menu_png.png");
const illumina_light_button_frame_minimize_png_pngAsset = embedBitmap("window/illumina_light_button_frame_minimize_png.png");
const illumina_light_button_unetched_png_pngAsset = embedBitmap("window/illumina_light_button_unetched_png.png");
const illumina_light_button_dark_recolorable_png_pngAsset = embedBitmap("window/illumina_light_button_dark_recolorable_png.png");
const illumina_light_checkbox_basic_png_pngAsset = embedBitmap("window/illumina_light_checkbox_basic_png.png");
const illumina_light_clock_background_png_pngAsset = embedBitmap("window/illumina_light_clock_background_png.png");
const illumina_light_clock_background_left_png_pngAsset = embedBitmap("window/illumina_light_clock_background_left_png.png");
const illumina_light_clock_background_mid_png_pngAsset = embedBitmap("window/illumina_light_clock_background_mid_png.png");
const illumina_light_clock_background_right_png_pngAsset = embedBitmap("window/illumina_light_clock_background_right_png.png");
const illumina_light_icons_png_pngAsset = embedBitmap("window/illumina_light_icons_png.png");
const illumina_light_input_chat_png_pngAsset = embedBitmap("window/illumina_light_input_chat_png.png");
const illumina_light_progress_indicator_etched_png_pngAsset = embedBitmap("window/illumina_light_progress_indicator_etched_png.png");
const illumina_light_progress_indicator_flat_png_pngAsset = embedBitmap("window/illumina_light_progress_indicator_flat_png.png");
const illumina_light_radio_button_png_pngAsset = embedBitmap("window/illumina_light_radio_button_png.png");
const illumina_light_scrollbar_horizontal_png_pngAsset = embedBitmap("window/illumina_light_scrollbar_horizontal_png.png");
const illumina_light_scrollbar_vertical_png_pngAsset = embedBitmap("window/illumina_light_scrollbar_vertical_png.png");
const illumina_light_separator_png_pngAsset = embedBitmap("window/illumina_light_separator_png.png");
const illumina_light_switch_png_pngAsset = embedBitmap("window/illumina_light_switch_png.png");
const illumina_light_skin_border_xml_binAsset = embedBytes("window/illumina_light_skin_border_xml.bin");
const illumina_light_skin_border_sunk_xml_binAsset = embedBytes("window/illumina_light_skin_border_sunk_xml.bin");
const illumina_light_skin_border_light_xml_binAsset = embedBytes("window/illumina_light_skin_border_light_xml.bin");
const illumina_light_skin_border_raised_xml_binAsset = embedBytes("window/illumina_light_skin_border_raised_xml.bin");
const illumina_light_skin_border_input_xml_binAsset = embedBytes("window/illumina_light_skin_border_input_xml.bin");
const illumina_light_skin_border_chat_bubble_xml_binAsset = embedBytes("window/illumina_light_skin_border_chat_bubble_xml.bin");
const illumina_light_skin_border_balloon_xml_binAsset = embedBytes("window/illumina_light_skin_border_balloon_xml.bin");
const illumina_light_skin_border_infobox_xml_binAsset = embedBytes("window/illumina_light_skin_border_infobox_xml.bin");
const illumina_light_frame_xml_binAsset = embedBytes("window/illumina_light_frame_xml.bin");
const illumina_light_frame_modal_xml_binAsset = embedBytes("window/illumina_light_frame_modal_xml.bin");
const illumina_light_frame_wired_xml_binAsset = embedBytes("window/illumina_light_frame_wired_xml.bin");
const illumina_light_skin_frame_xml_binAsset = embedBytes("window/illumina_light_skin_frame_xml.bin");
const illumina_light_skin_button_frame_close_xml_binAsset = embedBytes("window/illumina_light_skin_button_frame_close_xml.bin");
const illumina_light_skin_button_frame_menu_xml_binAsset = embedBytes("window/illumina_light_skin_button_frame_menu_xml.bin");
const illumina_light_skin_button_frame_minimize_xml_binAsset = embedBytes("window/illumina_light_skin_button_frame_minimize_xml.bin");
const illumina_light_button_xml_binAsset = embedBytes("window/illumina_light_button_xml.bin");
const illumina_light_button_plain_xml_binAsset = embedBytes("window/illumina_light_button_plain_xml.bin");
const illumina_light_skin_button_xml_binAsset = embedBytes("window/illumina_light_skin_button_xml.bin");
const illumina_light_skin_button_plain_xml_binAsset = embedBytes("window/illumina_light_skin_button_plain_xml.bin");
const illumina_light_skin_button_multi_left_xml_binAsset = embedBytes("window/illumina_light_skin_button_multi_left_xml.bin");
const illumina_light_skin_button_multi_right_xml_binAsset = embedBytes("window/illumina_light_skin_button_multi_right_xml.bin");
const illumina_light_skin_button_multi_middle_xml_binAsset = embedBytes("window/illumina_light_skin_button_multi_middle_xml.bin");
const illumina_light_skin_button_unetched_xml_binAsset = embedBytes("window/illumina_light_skin_button_unetched_xml.bin");
const illumina_light_skin_button_dark_recolorable_xml_binAsset = embedBytes("window/illumina_light_skin_button_dark_recolorable_xml.bin");
const illumina_light_checkbox_basic_xml_binAsset = embedBytes("window/illumina_light_checkbox_basic_xml.bin");
const illumina_light_skin_checkbox_basic_xml_binAsset = embedBytes("window/illumina_light_skin_checkbox_basic_xml.bin");
const illumina_light_skin_dropmenu_xml_binAsset = embedBytes("window/illumina_light_skin_dropmenu_xml.bin");
const illumina_light_switch_xml_binAsset = embedBytes("window/illumina_light_switch_xml.bin");
const illumina_light_skin_switch_xml_binAsset = embedBytes("window/illumina_light_skin_switch_xml.bin");
const illumina_light_radio_button_xml_binAsset = embedBytes("window/illumina_light_radio_button_xml.bin");
const illumina_light_skin_radio_button_xml_binAsset = embedBytes("window/illumina_light_skin_radio_button_xml.bin");
const illumina_light_scrollbar_horizontal_xml_binAsset = embedBytes("window/illumina_light_scrollbar_horizontal_xml.bin");
const illumina_light_scrollbar_vertical_xml_binAsset = embedBytes("window/illumina_light_scrollbar_vertical_xml.bin");
const illumina_light_skin_scrollbar_xml_binAsset = embedBytes("window/illumina_light_skin_scrollbar_xml.bin");
const illumina_light_scrollable_itemlist_vertical_xml_binAsset = embedBytes("window/illumina_light_scrollable_itemlist_vertical_xml.bin");
const illumina_light_dropmenu_item_xml_binAsset = embedBytes("window/illumina_light_dropmenu_item_xml.bin");
const illumina_light_dropmenu_xml_binAsset = embedBytes("window/illumina_light_dropmenu_xml.bin");
const illumina_purple_border_frame_png_pngAsset = embedBitmap("window/illumina_purple_border_frame_png.png");
const illumina_purple_button_frame_close_png_pngAsset = embedBitmap("window/illumina_purple_button_frame_close_png.png");
const illumina_purple_button_default_png_pngAsset = embedBitmap("window/illumina_purple_button_default_png.png");
const illumina_purple_skin_frame_xml_binAsset = embedBytes("window/illumina_purple_skin_frame_xml.bin");
const illumina_purple_skin_button_frame_close_xml_binAsset = embedBytes("window/illumina_purple_skin_button_frame_close_xml.bin");
const illumina_purple_frame_xml_binAsset = embedBytes("window/illumina_purple_frame_xml.bin");
const illumina_purple_button_xml_binAsset = embedBytes("window/illumina_purple_button_xml.bin");
const illumina_purple_button_plain_xml_binAsset = embedBytes("window/illumina_purple_button_plain_xml.bin");
const illumina_purple_skin_button_xml_binAsset = embedBytes("window/illumina_purple_skin_button_xml.bin");
const illumina_purple_skin_button_plain_xml_binAsset = embedBytes("window/illumina_purple_skin_button_plain_xml.bin");
const habbo_skin_illumina_dark_png_pngAsset = embedBitmap("window/habbo_skin_illumina_dark_png.png");
const illumina_dark_skin_border_xml_binAsset = embedBytes("window/illumina_dark_skin_border_xml.bin");
const illumina_dark_frame_xml_binAsset = embedBytes("window/illumina_dark_frame_xml.bin");
const illumina_dark_skin_frame_xml_binAsset = embedBytes("window/illumina_dark_skin_frame_xml.bin");
const illumina_dark_header_xml_binAsset = embedBytes("window/illumina_dark_header_xml.bin");
const illumina_dark_skin_header_xml_binAsset = embedBytes("window/illumina_dark_skin_header_xml.bin");
const illumina_dark_button_xml_binAsset = embedBytes("window/illumina_dark_button_xml.bin");
const illumina_dark_skin_button_xml_binAsset = embedBytes("window/illumina_dark_skin_button_xml.bin");
const illumina_dark_scrollbar_horizontal_xml_binAsset = embedBytes("window/illumina_dark_scrollbar_horizontal_xml.bin");
const illumina_dark_scrollbar_vertical_xml_binAsset = embedBytes("window/illumina_dark_scrollbar_vertical_xml.bin");
const illumina_dark_skin_scrollbar_xml_binAsset = embedBytes("window/illumina_dark_skin_scrollbar_xml.bin");
const illumina_dark_scrollbar_horizontal_png_pngAsset = embedBitmap("window/illumina_dark_scrollbar_horizontal_png.png");
const illumina_dark_scrollbar_vertical_png_pngAsset = embedBitmap("window/illumina_dark_scrollbar_vertical_png.png");
const achievement_ach_progressbar1_pngAsset = embedBitmap("window/achievement_ach_progressbar1.png");
const achievement_ach_progressbar2_pngAsset = embedBitmap("window/achievement_ach_progressbar2.png");
const achievement_ach_progressbar3_pngAsset = embedBitmap("window/achievement_ach_progressbar3.png");
const achievement_ach_progressbar4_pngAsset = embedBitmap("window/achievement_ach_progressbar4.png");
const achievement_ach_progressbar5_pngAsset = embedBitmap("window/achievement_ach_progressbar5.png");
const avatar_editor_avatar_editor_download_icon_pngAsset = embedBitmap("window/avatar_editor_avatar_editor_download_icon.png");
const avatar_editor_editor_clr_13x21_1_pngAsset = embedBitmap("window/avatar_editor_editor_clr_13x21_1.png");
const avatar_editor_editor_clr_13x21_2_pngAsset = embedBitmap("window/avatar_editor_editor_clr_13x21_2.png");
const avatar_editor_editor_clr_13x21_3_pngAsset = embedBitmap("window/avatar_editor_editor_clr_13x21_3.png");
const avatar_editor_editor_clr_40x32_1_pngAsset = embedBitmap("window/avatar_editor_editor_clr_40x32_1.png");
const avatar_editor_editor_clr_40x32_2_pngAsset = embedBitmap("window/avatar_editor_editor_clr_40x32_2.png");
const avatar_editor_editor_clr_40x32_3_pngAsset = embedBitmap("window/avatar_editor_editor_clr_40x32_3.png");
const avatar_editor_generic_platform_pngAsset = embedBitmap("window/avatar_editor_generic_platform.png");
const avatar_editor_generic_remove_selection_pngAsset = embedBitmap("window/avatar_editor_generic_remove_selection.png");
const avatar_editor_parts_hilite_pngAsset = embedBitmap("window/avatar_editor_parts_hilite.png");
const avatar_editor_parts_hilite_with_sd_pngAsset = embedBitmap("window/avatar_editor_parts_hilite_with_sd.png");
const avatar_editor_rotate_avatar_button_pngAsset = embedBitmap("window/avatar_editor_rotate_avatar_button.png");
const avatar_editor_tabs_ae_tabs_effects_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_effects.png");
const avatar_editor_tabs_ae_tabs_generic_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_generic.png");
const avatar_editor_tabs_ae_tabs_head_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_head.png");
const avatar_editor_tabs_ae_tabs_hotlooks_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_hotlooks.png");
const avatar_editor_tabs_ae_tabs_legs_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_legs.png");
const avatar_editor_tabs_ae_tabs_misc_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_misc.png");
const avatar_editor_tabs_ae_tabs_torso_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_torso.png");
const avatar_editor_tabs_ae_tabs_wardrobe_pngAsset = embedBitmap("window/avatar_editor_tabs_ae_tabs_wardrobe.png");
const avatar_editor_tabs_bottom_accessories_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_accessories.png");
const avatar_editor_tabs_bottom_accessories_off_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_accessories_off.png");
const avatar_editor_tabs_bottom_shoes_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_shoes.png");
const avatar_editor_tabs_bottom_shoes_off_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_shoes_off.png");
const avatar_editor_tabs_bottom_trousers_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_trousers.png");
const avatar_editor_tabs_bottom_trousers_off_pngAsset = embedBitmap("window/avatar_editor_tabs_bottom_trousers_off.png");
const avatar_editor_tabs_effects_fx_pngAsset = embedBitmap("window/avatar_editor_tabs_effects_fx.png");
const avatar_editor_tabs_gender_female_pngAsset = embedBitmap("window/avatar_editor_tabs_gender_female.png");
const avatar_editor_tabs_gender_female_off_pngAsset = embedBitmap("window/avatar_editor_tabs_gender_female_off.png");
const avatar_editor_tabs_gender_male_pngAsset = embedBitmap("window/avatar_editor_tabs_gender_male.png");
const avatar_editor_tabs_gender_male_off_pngAsset = embedBitmap("window/avatar_editor_tabs_gender_male_off.png");
const avatar_editor_tabs_head_accessories_pngAsset = embedBitmap("window/avatar_editor_tabs_head_accessories.png");
const avatar_editor_tabs_head_accessories_off_pngAsset = embedBitmap("window/avatar_editor_tabs_head_accessories_off.png");
const avatar_editor_tabs_head_eyewear_pngAsset = embedBitmap("window/avatar_editor_tabs_head_eyewear.png");
const avatar_editor_tabs_head_eyewear_off_pngAsset = embedBitmap("window/avatar_editor_tabs_head_eyewear_off.png");
const avatar_editor_tabs_head_face_accessories_pngAsset = embedBitmap("window/avatar_editor_tabs_head_face_accessories.png");
const avatar_editor_tabs_head_face_accessories_off_pngAsset = embedBitmap("window/avatar_editor_tabs_head_face_accessories_off.png");
const avatar_editor_tabs_head_hair_pngAsset = embedBitmap("window/avatar_editor_tabs_head_hair.png");
const avatar_editor_tabs_head_hair_off_pngAsset = embedBitmap("window/avatar_editor_tabs_head_hair_off.png");
const avatar_editor_tabs_head_hats_pngAsset = embedBitmap("window/avatar_editor_tabs_head_hats.png");
const avatar_editor_tabs_head_hats_off_pngAsset = embedBitmap("window/avatar_editor_tabs_head_hats_off.png");
const avatar_editor_tabs_icon_misc_misc_pngAsset = embedBitmap("window/avatar_editor_tabs_icon_misc_misc.png");
const avatar_editor_tabs_icon_misc_misc_off_pngAsset = embedBitmap("window/avatar_editor_tabs_icon_misc_misc_off.png");
const avatar_editor_tabs_icon_misc_pets_pngAsset = embedBitmap("window/avatar_editor_tabs_icon_misc_pets.png");
const avatar_editor_tabs_icon_misc_pets_off_pngAsset = embedBitmap("window/avatar_editor_tabs_icon_misc_pets_off.png");
const avatar_editor_tabs_top_accessories_pngAsset = embedBitmap("window/avatar_editor_tabs_top_accessories.png");
const avatar_editor_tabs_top_accessories_off_pngAsset = embedBitmap("window/avatar_editor_tabs_top_accessories_off.png");
const avatar_editor_tabs_top_jacket_pngAsset = embedBitmap("window/avatar_editor_tabs_top_jacket.png");
const avatar_editor_tabs_top_jacket_off_pngAsset = embedBitmap("window/avatar_editor_tabs_top_jacket_off.png");
const avatar_editor_tabs_top_prints_pngAsset = embedBitmap("window/avatar_editor_tabs_top_prints.png");
const avatar_editor_tabs_top_prints_off_pngAsset = embedBitmap("window/avatar_editor_tabs_top_prints_off.png");
const avatar_editor_tabs_top_shirt_pngAsset = embedBitmap("window/avatar_editor_tabs_top_shirt.png");
const avatar_editor_tabs_top_shirt_off_pngAsset = embedBitmap("window/avatar_editor_tabs_top_shirt_off.png");
const avatar_editor_wardrobe_select_outfit_pngAsset = embedBitmap("window/avatar_editor_wardrobe_select_outfit.png");
const avatar_editor_wardrobe_select_outfit_over_pngAsset = embedBitmap("window/avatar_editor_wardrobe_select_outfit_over.png");
const avatar_editor_wardrobe_wardrobe_empty_slot_pngAsset = embedBitmap("window/avatar_editor_wardrobe_wardrobe_empty_slot.png");
const bottom_bar_buildersclub_pngAsset = embedBitmap("window/bottom_bar_buildersclub.png");
const bottom_bar_camera_pngAsset = embedBitmap("window/bottom_bar_camera.png");
const bottom_bar_wired_menu_pngAsset = embedBitmap("window/bottom_bar_wired_menu.png");
const bottom_bar_collapse_left_pngAsset = embedBitmap("window/bottom_bar_collapse_left.png");
const bottom_bar_collapse_right_pngAsset = embedBitmap("window/bottom_bar_collapse_right.png");
const bottom_bar_divider_1px_pngAsset = embedBitmap("window/bottom_bar_divider_1px.png");
const bottom_bar_games_pngAsset = embedBitmap("window/bottom_bar_games.png");
const bottom_bar_home_pngAsset = embedBitmap("window/bottom_bar_home.png");
const bottom_bar_inventory_pngAsset = embedBitmap("window/bottom_bar_inventory.png");
const bottom_bar_logo_pngAsset = embedBitmap("window/bottom_bar_logo.png");
const bottom_bar_navigator_pngAsset = embedBitmap("window/bottom_bar_navigator.png");
const bottom_bar_memenu_bg_pngAsset = embedBitmap("window/bottom_bar_memenu_bg.png");
const bottom_bar_memenu_circle_pngAsset = embedBitmap("window/bottom_bar_memenu_circle.png");
const bottom_bar_progression_pngAsset = embedBitmap("window/bottom_bar_progression.png");
const bottom_bar_shop_pngAsset = embedBitmap("window/bottom_bar_shop.png");
const bottom_bar_stories_pngAsset = embedBitmap("window/bottom_bar_stories.png");
const camera_arrow_gray_pngAsset = embedBitmap("window/camera_arrow_gray.png");
const camera_arrow_green_pngAsset = embedBitmap("window/camera_arrow_green.png");
const camera_browse_ffwd_pngAsset = embedBitmap("window/camera_browse_ffwd.png");
const camera_cam_bg_pngAsset = embedBitmap("window/camera_cam_bg.png");
const camera_cam_btn_hi_pngAsset = embedBitmap("window/camera_cam_btn_hi.png");
const camera_cam_close_x_pngAsset = embedBitmap("window/camera_cam_close_x.png");
const camera_camera_btn_pngAsset = embedBitmap("window/camera_camera_btn.png");
const camera_camera_btn_down_pngAsset = embedBitmap("window/camera_camera_btn_down.png");
const camera_camera_edit_pngAsset = embedBitmap("window/camera_camera_edit.png");
const camera_camera_icon_pngAsset = embedBitmap("window/camera_camera_icon.png");
const camera_photo_border_pngAsset = embedBitmap("window/camera_photo_border.png");
const camera_fx_button_outline_pngAsset = embedBitmap("window/camera_fx_button_outline.png");
const camera_fx_button_selected_pngAsset = embedBitmap("window/camera_fx_button_selected.png");
const camera_fx_frame_selected_pngAsset = embedBitmap("window/camera_fx_frame_selected.png");
const camera_fx_slider_bottom_active_pngAsset = embedBitmap("window/camera_fx_slider_bottom_active.png");
const camera_fx_slider_button_pngAsset = embedBitmap("window/camera_fx_slider_button.png");
const camera_habbo_camera_pngAsset = embedBitmap("window/camera_habbo_camera.png");
const camera_icon_colorfilter_pngAsset = embedBitmap("window/camera_icon_colorfilter.png");
const camera_icon_compositefilter_pngAsset = embedBitmap("window/camera_icon_compositefilter.png");
const camera_icon_frame_pngAsset = embedBitmap("window/camera_icon_frame.png");
const camera_locked_pngAsset = embedBitmap("window/camera_locked.png");
const camera_remove_effect_pngAsset = embedBitmap("window/camera_remove_effect.png");
const camera_retake_button_pngAsset = embedBitmap("window/camera_retake_button.png");
const camera_shadow_outline_pngAsset = embedBitmap("window/camera_shadow_outline.png");
const camera_viewfinder_pngAsset = embedBitmap("window/camera_viewfinder.png");
const camera_zoom_in_pngAsset = embedBitmap("window/camera_zoom_in.png");
const camera_zoom_out_pngAsset = embedBitmap("window/camera_zoom_out.png");
const campaign_calendar_day_generic_activated_pngAsset = embedBitmap("window/campaign_calendar_day_generic_activated.png");
const campaign_calendar_day_generic_bg_pngAsset = embedBitmap("window/campaign_calendar_day_generic_bg.png");
const campaign_calendar_day_generic_button_pngAsset = embedBitmap("window/campaign_calendar_day_generic_button.png");
const campaign_calendar_generic_lock_pngAsset = embedBitmap("window/campaign_calendar_generic_lock.png");
const campaign_calendar_icon_advent_pngAsset = embedBitmap("window/campaign_calendar_icon_advent.png");
const campaign_calendar_opened_pngAsset = embedBitmap("window/campaign_calendar_opened.png");
const catalogue_background_pngAsset = embedBitmap("window/catalogue_background.png");
const catalogue_badge_background_pngAsset = embedBitmap("window/catalogue_badge_background.png");
const catalogue_chatstyle_background_pngAsset = embedBitmap("window/catalogue_chatstyle_background.png");
const catalogue_bundle_star_pngAsset = embedBitmap("window/catalogue_bundle_star.png");
const catalogue_clakboard_pngAsset = embedBitmap("window/catalogue_clakboard.png");
const ctlg_clr_27x22_1_pngAsset = embedBitmap("shared/ctlg_clr_27x22_1.png");
const ctlg_clr_27x22_2_pngAsset = embedBitmap("shared/ctlg_clr_27x22_2.png");
const ctlg_clr_27x22_3_pngAsset = embedBitmap("shared/ctlg_clr_27x22_3.png");
const fx_icon_108_png_pngAsset = embedBitmap("shared/fx_icon_108_png.png");
const giftcard_blank_pngAsset = embedBitmap("shared/giftcard_blank.png");
const catalogue_giftcard_staff_pngAsset = embedBitmap("window/catalogue_giftcard_staff.png");
const catalogue_giftcard_staff_icon_pngAsset = embedBitmap("window/catalogue_giftcard_staff_icon.png");
const catalogue_ui2_checkmark_m_pngAsset = embedBitmap("window/catalogue_ui2_checkmark_m.png");
const catalogue_icon_alert_s_pngAsset = embedBitmap("window/catalogue_icon_alert_s.png");
const catalogue_giftcard_icon_bgstar_pngAsset = embedBitmap("window/catalogue_giftcard_icon_bgstar.png");
const catalogue_ufo_pricebg_pngAsset = embedBitmap("window/catalogue_ufo_pricebg.png");
const chest_overlay_brown_background_pngAsset = embedBitmap("window/chest_overlay_brown_background.png");
const chest_overlay_brown_plaque_pngAsset = embedBitmap("window/chest_overlay_brown_plaque.png");
const chest_overlay_gold_background_pngAsset = embedBitmap("window/chest_overlay_gold_background.png");
const chest_overlay_gold_plaque_pngAsset = embedBitmap("window/chest_overlay_gold_plaque.png");
const chest_overlay_shine_pngAsset = embedBitmap("window/chest_overlay_shine.png");
const chest_overlay_silver_background_pngAsset = embedBitmap("window/chest_overlay_silver_background.png");
const chest_overlay_silver_plaque_pngAsset = embedBitmap("window/chest_overlay_silver_plaque.png");
const common_beta_sign_pngAsset = embedBitmap("window/common_beta_sign.png");
const common_blue_arrow_horizontal_pngAsset = embedBitmap("window/common_blue_arrow_horizontal.png");
const common_blue_arrow_vertical_pngAsset = embedBitmap("window/common_blue_arrow_vertical.png");
const common_chat_indicator_pngAsset = embedBitmap("window/common_chat_indicator.png");
const common_chat_style_block_pngAsset = embedBitmap("window/common_chat_style_block.png");
const common_chat_styles_pngAsset = embedBitmap("window/common_chat_styles.png");
const common_check_mark_pngAsset = embedBitmap("window/common_check_mark.png");
const common_chisel_pngAsset = embedBitmap("window/common_chisel.png");
const common_close_x_pngAsset = embedBitmap("window/common_close_x.png");
const common_cross_mark_pngAsset = embedBitmap("window/common_cross_mark.png");
const common_green_arrow_horizontal_pngAsset = embedBitmap("window/common_green_arrow_horizontal.png");
const common_green_arrow_vertical_pngAsset = embedBitmap("window/common_green_arrow_vertical.png");
const common_hilight_big_pngAsset = embedBitmap("window/common_hilight_big.png");
const common_icon_task_completed_m_pngAsset = embedBitmap("window/common_icon_task_completed_m.png");
const common_icon_task_completed_s_pngAsset = embedBitmap("window/common_icon_task_completed_s.png");
const common_info_icon_grey_pngAsset = embedBitmap("window/common_info_icon_grey.png");
const common_item_selected_pngAsset = embedBitmap("window/common_item_selected.png");
const common_item_unselected_pngAsset = embedBitmap("window/common_item_unselected.png");
const loading_icon_pngAsset = embedBitmap("shared/loading_icon.png");
const common_maximize_pngAsset = embedBitmap("window/common_maximize.png");
const common_maximize_unetched_pngAsset = embedBitmap("window/common_maximize_unetched.png");
const common_minimize_unetched_pngAsset = embedBitmap("window/common_minimize_unetched.png");
const common_offers_icon_pngAsset = embedBitmap("window/common_offers_icon.png");
const common_promo_arrow_close_pngAsset = embedBitmap("window/common_promo_arrow_close.png");
const common_promo_arrow_top_right_pngAsset = embedBitmap("window/common_promo_arrow_top_right.png");
const common_small_coin_pngAsset = embedBitmap("window/common_small_coin.png");
const small_pen_pngAsset = embedBitmap("shared/small_pen.png");
const common_star_pngAsset = embedBitmap("window/common_star.png");
const common_trashcan_big_pngAsset = embedBitmap("window/common_trashcan_big.png");
const common_trashcan_small_pngAsset = embedBitmap("window/common_trashcan_small.png");
const common_welcome_screen_arrow_pngAsset = embedBitmap("window/common_welcome_screen_arrow.png");
const craft_craft_bg_pngAsset = embedBitmap("window/craft_craft_bg.png");
const discord_discord_box_pngAsset = embedBitmap("window/discord_discord_box.png");
const discord_collectibles_logo_pngAsset = embedBitmap("window/discord_collectibles_logo.png");
const discord_origins_logo_pngAsset = embedBitmap("window/discord_origins_logo.png");
const discord_wired_logo_pngAsset = embedBitmap("window/discord_wired_logo.png");
const favourite_png_pngAsset = embedBitmap("shared/favourite_png.png");
const extended_profile_icon_level_pngAsset = embedBitmap("window/extended_profile_icon_level.png");
const extended_profile_icon_star_gem_pngAsset = embedBitmap("window/extended_profile_icon_star_gem.png");
const make_favourite_png_pngAsset = embedBitmap("shared/make_favourite_png.png");
const extended_profile_rooms_pngAsset = embedBitmap("window/extended_profile_rooms.png");
const extended_profile_frank_stop_pngAsset = embedBitmap("window/extended_profile_frank_stop.png");
const extended_profile_block_icon_pngAsset = embedBitmap("window/extended_profile_block_icon.png");
const floor_plan_editor_add_tile_pngAsset = embedBitmap("window/floor_plan_editor_add_tile.png");
const floor_plan_editor_enter_tile_pngAsset = embedBitmap("window/floor_plan_editor_enter_tile.png");
const floor_plan_editor_logo_pngAsset = embedBitmap("window/floor_plan_editor_logo.png");
const floor_plan_editor_raise_tile_pngAsset = embedBitmap("window/floor_plan_editor_raise_tile.png");
const floor_plan_editor_remove_tile_pngAsset = embedBitmap("window/floor_plan_editor_remove_tile.png");
const floor_plan_editor_sink_tile_pngAsset = embedBitmap("window/floor_plan_editor_sink_tile.png");
const forum_forum_edit_pngAsset = embedBitmap("window/forum_forum_edit.png");
const forum_forum_hide_pngAsset = embedBitmap("window/forum_forum_hide.png");
const forum_forum_list0_pngAsset = embedBitmap("window/forum_forum_list0.png");
const forum_forum_list1_pngAsset = embedBitmap("window/forum_forum_list1.png");
const forum_forum_list2_pngAsset = embedBitmap("window/forum_forum_list2.png");
const forum_forum_locked_pngAsset = embedBitmap("window/forum_forum_locked.png");
const forum_forum_pinned_pngAsset = embedBitmap("window/forum_forum_pinned.png");
const forum_forum_report_pngAsset = embedBitmap("window/forum_forum_report.png");
const forum_forum_unhide_pngAsset = embedBitmap("window/forum_forum_unhide.png");
const forum_forum_unlocked_pngAsset = embedBitmap("window/forum_forum_unlocked.png");
const forum_forum_unpinned_pngAsset = embedBitmap("window/forum_forum_unpinned.png");
const forum_reply_pngAsset = embedBitmap("window/forum_reply.png");
const franks_emotions_angry_pngAsset = embedBitmap("window/franks_emotions_angry.png");
const franks_emotions_blush_pngAsset = embedBitmap("window/franks_emotions_blush.png");
const franks_emotions_heart_pngAsset = embedBitmap("window/franks_emotions_heart.png");
const franks_emotions_poop_pngAsset = embedBitmap("window/franks_emotions_poop.png");
const franks_emotions_sad_pngAsset = embedBitmap("window/franks_emotions_sad.png");
const friend_bar_all_friends_pngAsset = embedBitmap("window/friend_bar_all_friends.png");
const friend_bar_event_notification_icon_pngAsset = embedBitmap("window/friend_bar_event_notification_icon.png");
const friend_bar_friendlist_chat_pngAsset = embedBitmap("window/friend_bar_friendlist_chat.png");
const friend_bar_friendlist_eye_pngAsset = embedBitmap("window/friend_bar_friendlist_eye.png");
const friend_bar_friendlist_go_room_pngAsset = embedBitmap("window/friend_bar_friendlist_go_room.png");
const friend_bar_friendlist_messenger_pngAsset = embedBitmap("window/friend_bar_friendlist_messenger.png");
const friend_bar_friendlist_messenger_notify_0_pngAsset = embedBitmap("window/friend_bar_friendlist_messenger_notify_0.png");
const friend_bar_friendlist_messenger_notify_1_pngAsset = embedBitmap("window/friend_bar_friendlist_messenger_notify_1.png");
const friend_bar_friends_browse_bg_pngAsset = embedBitmap("window/friend_bar_friends_browse_bg.png");
const friend_bar_search_habbos_pngAsset = embedBitmap("window/friend_bar_search_habbos.png");
const game_center_achievement_locked_icon_pngAsset = embedBitmap("window/game_center_achievement_locked_icon.png");
const game_center_loading_icon_pngAsset = embedBitmap("window/game_center_loading_icon.png");
const game_center_snowball_notification_icon_pngAsset = embedBitmap("window/game_center_snowball_notification_icon.png");
const group_guild_color_btm_pngAsset = embedBitmap("window/group_guild_color_btm.png");
const group_guild_color_top_pngAsset = embedBitmap("window/group_guild_color_top.png");
const hc_center_hc_center_cover_pngAsset = embedBitmap("window/hc_center_hc_center_cover.png");
const hc_center_hc_center_icon_credits_pngAsset = embedBitmap("window/hc_center_hc_center_icon_credits.png");
const hc_center_hc_center_illustration_pngAsset = embedBitmap("window/hc_center_hc_center_illustration.png");
const hc_center_hc_center_timer_pngAsset = embedBitmap("window/hc_center_hc_center_timer.png");
const hc_center_hc_postit_bg_pngAsset = embedBitmap("window/hc_center_hc_postit_bg.png");
const hc_center_t0_pngAsset = embedBitmap("window/hc_center_t0.png");
const hc_center_t1_pngAsset = embedBitmap("window/hc_center_t1.png");
const hc_center_t2_pngAsset = embedBitmap("window/hc_center_t2.png");
const hc_center_t3_pngAsset = embedBitmap("window/hc_center_t3.png");
const hc_center_t4_pngAsset = embedBitmap("window/hc_center_t4.png");
const hc_center_t5_pngAsset = embedBitmap("window/hc_center_t5.png");
const hc_center_t6_pngAsset = embedBitmap("window/hc_center_t6.png");
const hc_center_t7_pngAsset = embedBitmap("window/hc_center_t7.png");
const hc_center_t8_pngAsset = embedBitmap("window/hc_center_t8.png");
const hc_center_t9_pngAsset = embedBitmap("window/hc_center_t9.png");
const bg_star_300x300_pngAsset = embedBitmap("window/bg_star_300x300.png");
const collectables_level_bg_pngAsset = embedBitmap("window/collectables_level_bg.png");
const collectables_score_element_pngAsset = embedBitmap("window/collectables_score_element.png");
const collectables_score_element2_pngAsset = embedBitmap("window/collectables_score_element2.png");
const collectables_reward_rarity_flag_pngAsset = embedBitmap("window/collectables_reward_rarity_flag.png");
const collectables_score_background_pngAsset = embedBitmap("window/collectables_score_background.png");
const collectables_score_background_right_pngAsset = embedBitmap("window/collectables_score_background_right.png");
const collectables_score_background_gradient_pngAsset = embedBitmap("window/collectables_score_background_gradient.png");
const collectables_score_background_gradient2_pngAsset = embedBitmap("window/collectables_score_background_gradient2.png");
const collectables_transfer_safe_pngAsset = embedBitmap("window/collectables_transfer_safe.png");
const collectables_cabinet_element_pngAsset = embedBitmap("window/collectables_cabinet_element.png");
const collectables_collection_default_pngAsset = embedBitmap("window/collectables_collection_default.png");
const icon_nft_pngAsset = embedBitmap("shared/icon_nft.png");
const icon_curator_stamp_large_png_pngAsset = embedBitmap("shared/icon_curator_stamp_large_png.png");
const collectables_lock_closed_pngAsset = embedBitmap("window/collectables_lock_closed.png");
const collectables_lock_open_pngAsset = embedBitmap("window/collectables_lock_open.png");
const image_connection_problem_pngAsset = embedBitmap("window/image_connection_problem.png");
const image_frank_dont_know_pngAsset = embedBitmap("window/image_frank_dont_know.png");
const icon_checkmark_small_pngAsset = embedBitmap("window/icon_checkmark_small.png");
const icon_habbicon_fav_pngAsset = embedBitmap("window/icon_habbicon_fav.png");
const habbicons_submenu_icon_default_pngAsset = embedBitmap("window/habbicons_submenu_icon_default.png");
const habbicons_submenu_icon_owned_pngAsset = embedBitmap("window/habbicons_submenu_icon_owned.png");
const icon_notification_corner_mid_pngAsset = embedBitmap("window/icon_notification_corner_mid.png");
const bg_pattern_001_pngAsset = embedBitmap("window/bg_pattern_001.png");
const habbicon_topbar_left_pngAsset = embedBitmap("window/habbicon_topbar_left.png");
const habbicon_topbar_mid_pngAsset = embedBitmap("window/habbicon_topbar_mid.png");
const habbicon_topbar_right_pngAsset = embedBitmap("window/habbicon_topbar_right.png");
const habbicons_clip_pngAsset = embedBitmap("window/habbicons_clip.png");
const habbicons_habbicons_dm_pngAsset = embedBitmap("window/habbicons_habbicons_dm.png");
const habbicons_habbicons_logo_pngAsset = embedBitmap("window/habbicons_habbicons_logo.png");
const habbicons_sticky_note_pngAsset = embedBitmap("window/habbicons_sticky_note.png");
const habbicons_sticky_note2_pngAsset = embedBitmap("window/habbicons_sticky_note2.png");
const loading_pngAsset = embedBitmap("window/loading.png");
const help_accept_icon_pngAsset = embedBitmap("window/help_accept_icon.png");
const help_bandaid_pngAsset = embedBitmap("window/help_bandaid.png");
const help_chat_review_anonymous_pngAsset = embedBitmap("window/help_chat_review_anonymous.png");
const help_chat_review_avatar_anonymous_pngAsset = embedBitmap("window/help_chat_review_avatar_anonymous.png");
const help_chat_review_avatar_perpetrator_pngAsset = embedBitmap("window/help_chat_review_avatar_perpetrator.png");
const help_chat_review_decision_bad_pngAsset = embedBitmap("window/help_chat_review_decision_bad.png");
const help_chat_review_decision_ok_pngAsset = embedBitmap("window/help_chat_review_decision_ok.png");
const help_chat_review_decision_refused_pngAsset = embedBitmap("window/help_chat_review_decision_refused.png");
const help_chat_review_decision_searching_1_pngAsset = embedBitmap("window/help_chat_review_decision_searching_1.png");
const help_chat_review_decision_searching_2_pngAsset = embedBitmap("window/help_chat_review_decision_searching_2.png");
const help_chat_review_decision_undecided_pngAsset = embedBitmap("window/help_chat_review_decision_undecided.png");
const help_chat_review_decision_very_bad_pngAsset = embedBitmap("window/help_chat_review_decision_very_bad.png");
const help_chat_review_decision_waiting_1_pngAsset = embedBitmap("window/help_chat_review_decision_waiting_1.png");
const help_chat_review_decision_waiting_2_pngAsset = embedBitmap("window/help_chat_review_decision_waiting_2.png");
const help_chat_review_perpetrator_pngAsset = embedBitmap("window/help_chat_review_perpetrator.png");
const help_chat_review_progress_big_1_pngAsset = embedBitmap("window/help_chat_review_progress_big_1.png");
const help_chat_review_progress_big_2_pngAsset = embedBitmap("window/help_chat_review_progress_big_2.png");
const help_chat_review_progress_big_3_pngAsset = embedBitmap("window/help_chat_review_progress_big_3.png");
const help_chat_review_progress_big_4_pngAsset = embedBitmap("window/help_chat_review_progress_big_4.png");
const help_chat_review_vote_bad_pngAsset = embedBitmap("window/help_chat_review_vote_bad.png");
const help_chat_review_vote_bad_down_pngAsset = embedBitmap("window/help_chat_review_vote_bad_down.png");
const help_chat_review_vote_bad_over_pngAsset = embedBitmap("window/help_chat_review_vote_bad_over.png");
const help_chat_review_vote_ok_pngAsset = embedBitmap("window/help_chat_review_vote_ok.png");
const help_chat_review_vote_ok_down_pngAsset = embedBitmap("window/help_chat_review_vote_ok_down.png");
const help_chat_review_vote_ok_over_pngAsset = embedBitmap("window/help_chat_review_vote_ok_over.png");
const help_chat_review_vote_very_bad_pngAsset = embedBitmap("window/help_chat_review_vote_very_bad.png");
const help_chat_review_vote_very_bad_down_pngAsset = embedBitmap("window/help_chat_review_vote_very_bad_down.png");
const help_chat_review_vote_very_bad_over_pngAsset = embedBitmap("window/help_chat_review_vote_very_bad_over.png");
const help_citizenship_default_pngAsset = embedBitmap("window/help_citizenship_default.png");
const help_decline_icon_pngAsset = embedBitmap("window/help_decline_icon.png");
const help_error_state_pngAsset = embedBitmap("window/help_error_state.png");
const help_feeling_confused_pngAsset = embedBitmap("window/help_feeling_confused.png");
const help_feeling_confused_coming_up_pngAsset = embedBitmap("window/help_feeling_confused_coming_up.png");
const help_frank_greeting_pngAsset = embedBitmap("window/help_frank_greeting.png");
const help_guide_accept_pngAsset = embedBitmap("window/help_guide_accept.png");
const help_guide_icon_pngAsset = embedBitmap("window/help_guide_icon.png");
const help_habboway_correct_pngAsset = embedBitmap("window/help_habboway_correct.png");
const help_habboway_dove_off_pngAsset = embedBitmap("window/help_habboway_dove_off.png");
const help_habboway_dove_on_pngAsset = embedBitmap("window/help_habboway_dove_on.png");
const help_habboway_dove_quizz_pngAsset = embedBitmap("window/help_habboway_dove_quizz.png");
const help_habboway_next_pngAsset = embedBitmap("window/help_habboway_next.png");
const help_habboway_prev_pngAsset = embedBitmap("window/help_habboway_prev.png");
const help_habboway_wrong_pngAsset = embedBitmap("window/help_habboway_wrong.png");
const help_help_duck_pngAsset = embedBitmap("window/help_help_duck.png");
const help_illustrations_bully_pngAsset = embedBitmap("window/help_illustrations_bully.png");
const help_illustrations_question_pngAsset = embedBitmap("window/help_illustrations_question.png");
const help_illustrations_tour_pngAsset = embedBitmap("window/help_illustrations_tour.png");
const help_need_help_pngAsset = embedBitmap("window/help_need_help.png");
const help_notification_pngAsset = embedBitmap("window/help_notification.png");
const help_poor_frank_pngAsset = embedBitmap("window/help_poor_frank.png");
const help_requester_icon_pngAsset = embedBitmap("window/help_requester_icon.png");
const help_user_create_pngAsset = embedBitmap("window/help_user_create.png");
const help_user_feedback_pngAsset = embedBitmap("window/help_user_feedback.png");
const help_user_pending_pngAsset = embedBitmap("window/help_user_pending.png");
const high_score_highscore_cup_pngAsset = embedBitmap("window/high_score_highscore_cup.png");
const icons_back_pngAsset = embedBitmap("window/icons_back.png");
const icons_back_small_pngAsset = embedBitmap("window/icons_back_small.png");
const icons_builder_error_full_pngAsset = embedBitmap("window/icons_builder_error_full.png");
const icons_builder_error_furnilimit_pngAsset = embedBitmap("window/icons_builder_error_furnilimit.png");
const icons_builder_error_grouproom_pngAsset = embedBitmap("window/icons_builder_error_grouproom.png");
const icons_builder_error_notroom_pngAsset = embedBitmap("window/icons_builder_error_notroom.png");
const icons_builder_error_room_pngAsset = embedBitmap("window/icons_builder_error_room.png");
const icons_builder_error_userinroom_pngAsset = embedBitmap("window/icons_builder_error_userinroom.png");
const icons_close_pngAsset = embedBitmap("window/icons_close.png");
const icons_facebook_pngAsset = embedBitmap("window/icons_facebook.png");
const icons_flag_pngAsset = embedBitmap("window/icons_flag.png");
const icons_forward_pngAsset = embedBitmap("window/icons_forward.png");
const icons_forward_small_pngAsset = embedBitmap("window/icons_forward_small.png");
const icons_go_to_room_icon_pngAsset = embedBitmap("window/icons_go_to_room_icon.png");
const icons_hc_icon_small_pngAsset = embedBitmap("window/icons_hc_icon_small.png");
const icons_hilighter_yellow_pngAsset = embedBitmap("window/icons_hilighter_yellow.png");
const icons_info_grey_pngAsset = embedBitmap("window/icons_info_grey.png");
const icons_link_icon_pngAsset = embedBitmap("window/icons_link_icon.png");
const icons_next_pngAsset = embedBitmap("window/icons_next.png");
const icons_panic_pngAsset = embedBitmap("window/icons_panic.png");
const icons_share_pngAsset = embedBitmap("window/icons_share.png");
const icons_star_pngAsset = embedBitmap("window/icons_star.png");
const icons_tickmark_pngAsset = embedBitmap("window/icons_tickmark.png");
const icons_toolbar_achievements_hover_pngAsset = embedBitmap("window/icons_toolbar_achievements_hover.png");
const achievements_color_pngAsset = embedBitmap("shared/achievements_color.png");
const icons_toolbar_builder_hover_pngAsset = embedBitmap("window/icons_toolbar_builder_hover.png");
const icons_toolbar_builder_normal_pngAsset = embedBitmap("window/icons_toolbar_builder_normal.png");
const icons_toolbar_catalogue_hover_pngAsset = embedBitmap("window/icons_toolbar_catalogue_hover.png");
const icons_toolbar_catalogue_normal_pngAsset = embedBitmap("window/icons_toolbar_catalogue_normal.png");
const icons_toolbar_divider_pngAsset = embedBitmap("window/icons_toolbar_divider.png");
const icons_toolbar_games_hover_pngAsset = embedBitmap("window/icons_toolbar_games_hover.png");
const icons_toolbar_games_normal_pngAsset = embedBitmap("window/icons_toolbar_games_normal.png");
const icons_toolbar_home_hover_pngAsset = embedBitmap("window/icons_toolbar_home_hover.png");
const icons_toolbar_home_normal_pngAsset = embedBitmap("window/icons_toolbar_home_normal.png");
const icons_toolbar_inventory_hover_pngAsset = embedBitmap("window/icons_toolbar_inventory_hover.png");
const icons_toolbar_inventory_normal_pngAsset = embedBitmap("window/icons_toolbar_inventory_normal.png");
const icons_toolbar_me_menu_placeholder_pngAsset = embedBitmap("window/icons_toolbar_me_menu_placeholder.png");
const icons_toolbar_minimail_hover_pngAsset = embedBitmap("window/icons_toolbar_minimail_hover.png");
const icons_toolbar_minimail_normal_pngAsset = embedBitmap("window/icons_toolbar_minimail_normal.png");
const icons_toolbar_navigator_hover_pngAsset = embedBitmap("window/icons_toolbar_navigator_hover.png");
const icons_toolbar_navigator_normal_pngAsset = embedBitmap("window/icons_toolbar_navigator_normal.png");
const icons_toolbar_progression_hover_pngAsset = embedBitmap("window/icons_toolbar_progression_hover.png");
const icons_toolbar_progression_normal_pngAsset = embedBitmap("window/icons_toolbar_progression_normal.png");
const icons_toolbar_reception_hover_pngAsset = embedBitmap("window/icons_toolbar_reception_hover.png");
const icons_toolbar_reception_normal_pngAsset = embedBitmap("window/icons_toolbar_reception_normal.png");
const icons_toolbar_stories_hover_pngAsset = embedBitmap("window/icons_toolbar_stories_hover.png");
const icons_toolbar_stories_normal_pngAsset = embedBitmap("window/icons_toolbar_stories_normal.png");
const icons_toolbar_valentines_hover_pngAsset = embedBitmap("window/icons_toolbar_valentines_hover.png");
const icons_toolbar_valentines_normal_pngAsset = embedBitmap("window/icons_toolbar_valentines_normal.png");
const icons_toolbar_xmas_hover_pngAsset = embedBitmap("window/icons_toolbar_xmas_hover.png");
const icons_toolbar_xmas_normal_pngAsset = embedBitmap("window/icons_toolbar_xmas_normal.png");
const icons_twitter_pngAsset = embedBitmap("window/icons_twitter.png");
const icons_wearable_pngAsset = embedBitmap("window/icons_wearable.png");
const illumina_horizontal_separator_pngAsset = embedBitmap("window/illumina_horizontal_separator.png");
const illumina_wired_bg_left_repeating_pngAsset = embedBitmap("window/illumina_wired_bg_left_repeating.png");
const illumina_wired_bg_left_pngAsset = embedBitmap("window/illumina_wired_bg_left.png");
const illumina_wired_bg_right_pngAsset = embedBitmap("window/illumina_wired_bg_right.png");
const infostand_bot_info_bg_pngAsset = embedBitmap("window/infostand_bot_info_bg.png");
const infostand_furni_place_pngAsset = embedBitmap("window/infostand_furni_place.png");
const infostand_furni_shop_pngAsset = embedBitmap("window/infostand_furni_shop.png");
const inventory_download_icon_pngAsset = embedBitmap("window/inventory_download_icon.png");
const inventory_furni_icon_credits_pngAsset = embedBitmap("window/inventory_furni_icon_credits.png");
const packagecard_icon_floor_pngAsset = embedBitmap("shared/packagecard_icon_floor.png");
const packagecard_icon_landscape_pngAsset = embedBitmap("shared/packagecard_icon_landscape.png");
const packagecard_icon_wallpaper_pngAsset = embedBitmap("shared/packagecard_icon_wallpaper.png");
const inventory_furni_no_recycle_icon_pngAsset = embedBitmap("window/inventory_furni_no_recycle_icon.png");
const inventory_furni_no_trade_icon_pngAsset = embedBitmap("window/inventory_furni_no_trade_icon.png");
const inventory_furni_recycle_icon_pngAsset = embedBitmap("window/inventory_furni_recycle_icon.png");
const inventory_furni_trade_icon_pngAsset = embedBitmap("window/inventory_furni_trade_icon.png");
const inventory_inventory_empty_pngAsset = embedBitmap("window/inventory_inventory_empty.png");
const inventory_inventory_icon_pngAsset = embedBitmap("window/inventory_inventory_icon.png");
const thumb_bg_pngAsset = embedBitmap("shared/thumb_bg.png");
const thumb_bg_selected_pngAsset = embedBitmap("shared/thumb_bg_selected.png");
const inventory_thumb_icon_recycle_pngAsset = embedBitmap("window/inventory_thumb_icon_recycle.png");
const inventory_thumb_rent_ending_pngAsset = embedBitmap("window/inventory_thumb_rent_ending.png");
const inventory_thumb_rent_started_pngAsset = embedBitmap("window/inventory_thumb_rent_started.png");
const inventory_thumb_rent_not_started_pngAsset = embedBitmap("window/inventory_thumb_rent_not_started.png");
const inventory_thumb_selected_outline_pngAsset = embedBitmap("window/inventory_thumb_selected_outline.png");
const inventory_trading_trading_arrow_icon_pngAsset = embedBitmap("window/inventory_trading_trading_arrow_icon.png");
const inventory_trading_trading_locked_icon_pngAsset = embedBitmap("window/inventory_trading_trading_locked_icon.png");
const inventory_trading_trading_unlocked_icon_pngAsset = embedBitmap("window/inventory_trading_trading_unlocked_icon.png");
const inventory_trading_trading_split_icon_pngAsset = embedBitmap("window/inventory_trading_trading_split_icon.png");
const inventory_trading_trading_silver_arrow_left_pngAsset = embedBitmap("window/inventory_trading_trading_silver_arrow_left.png");
const inventory_trading_trading_silver_arrow_right_pngAsset = embedBitmap("window/inventory_trading_trading_silver_arrow_right.png");
const landing_view_avatar_info_background_pngAsset = embedBitmap("window/landing_view_avatar_info_background.png");
const landing_view_needle_meter_needle0_pngAsset = embedBitmap("window/landing_view_needle_meter_needle0.png");
const landing_view_needle_meter_needle1_pngAsset = embedBitmap("window/landing_view_needle_meter_needle1.png");
const landing_view_needle_meter_needle10_pngAsset = embedBitmap("window/landing_view_needle_meter_needle10.png");
const landing_view_needle_meter_needle11_pngAsset = embedBitmap("window/landing_view_needle_meter_needle11.png");
const landing_view_needle_meter_needle12_pngAsset = embedBitmap("window/landing_view_needle_meter_needle12.png");
const landing_view_needle_meter_needle13_pngAsset = embedBitmap("window/landing_view_needle_meter_needle13.png");
const landing_view_needle_meter_needle14_pngAsset = embedBitmap("window/landing_view_needle_meter_needle14.png");
const landing_view_needle_meter_needle15_pngAsset = embedBitmap("window/landing_view_needle_meter_needle15.png");
const landing_view_needle_meter_needle16_pngAsset = embedBitmap("window/landing_view_needle_meter_needle16.png");
const landing_view_needle_meter_needle17_pngAsset = embedBitmap("window/landing_view_needle_meter_needle17.png");
const landing_view_needle_meter_needle18_pngAsset = embedBitmap("window/landing_view_needle_meter_needle18.png");
const landing_view_needle_meter_needle19_pngAsset = embedBitmap("window/landing_view_needle_meter_needle19.png");
const landing_view_needle_meter_needle2_pngAsset = embedBitmap("window/landing_view_needle_meter_needle2.png");
const landing_view_needle_meter_needle20_pngAsset = embedBitmap("window/landing_view_needle_meter_needle20.png");
const landing_view_needle_meter_needle21_pngAsset = embedBitmap("window/landing_view_needle_meter_needle21.png");
const landing_view_needle_meter_needle22_pngAsset = embedBitmap("window/landing_view_needle_meter_needle22.png");
const landing_view_needle_meter_needle23_pngAsset = embedBitmap("window/landing_view_needle_meter_needle23.png");
const landing_view_needle_meter_needle3_pngAsset = embedBitmap("window/landing_view_needle_meter_needle3.png");
const landing_view_needle_meter_needle4_pngAsset = embedBitmap("window/landing_view_needle_meter_needle4.png");
const landing_view_needle_meter_needle5_pngAsset = embedBitmap("window/landing_view_needle_meter_needle5.png");
const landing_view_needle_meter_needle6_pngAsset = embedBitmap("window/landing_view_needle_meter_needle6.png");
const landing_view_needle_meter_needle7_pngAsset = embedBitmap("window/landing_view_needle_meter_needle7.png");
const landing_view_needle_meter_needle8_pngAsset = embedBitmap("window/landing_view_needle_meter_needle8.png");
const landing_view_needle_meter_needle9_pngAsset = embedBitmap("window/landing_view_needle_meter_needle9.png");
const landing_view_reception_horizontal_pngAsset = embedBitmap("window/landing_view_reception_horizontal.png");
const me_menu_me_achv_pngAsset = embedBitmap("window/me_menu_me_achv.png");
const me_menu_me_clothing_pngAsset = embedBitmap("window/me_menu_me_clothing.png");
const me_menu_me_forums_pngAsset = embedBitmap("window/me_menu_me_forums.png");
const me_menu_me_cabinet_pngAsset = embedBitmap("window/me_menu_me_cabinet.png");
const me_menu_me_guide_pngAsset = embedBitmap("window/me_menu_me_guide.png");
const me_menu_me_mail_pngAsset = embedBitmap("window/me_menu_me_mail.png");
const me_menu_me_profile_pngAsset = embedBitmap("window/me_menu_me_profile.png");
const me_menu_me_rooms_pngAsset = embedBitmap("window/me_menu_me_rooms.png");
const me_menu_me_talents_pngAsset = embedBitmap("window/me_menu_me_talents.png");
const icon_daily_tasks_png_pngAsset = embedBitmap("shared/icon_daily_tasks_png.png");
const prog_menu_quests_pngAsset = embedBitmap("window/prog_menu_quests.png");
const prog_menu_leaderboards_pngAsset = embedBitmap("window/prog_menu_leaderboards.png");
const prog_menu_introduction_pngAsset = embedBitmap("window/prog_menu_introduction.png");
const messenger_caution_pngAsset = embedBitmap("window/messenger_caution.png");
const messenger_minimize_button_pngAsset = embedBitmap("window/messenger_minimize_button.png");
const messenger_notification_icon_pngAsset = embedBitmap("window/messenger_notification_icon.png");
const messenger_profile_icon_pngAsset = embedBitmap("window/messenger_profile_icon.png");
const messenger_visit_icon_pngAsset = embedBitmap("window/messenger_visit_icon.png");
const close_x_pngAsset = embedBitmap("shared/close_x.png");
const mysterybox_box_base_pngAsset = embedBitmap("window/mysterybox_box_base.png");
const mysterybox_box_overlay_pngAsset = embedBitmap("window/mysterybox_box_overlay.png");
const mysterybox_box_small_pngAsset = embedBitmap("window/mysterybox_box_small.png");
const mysterybox_key_base_pngAsset = embedBitmap("window/mysterybox_key_base.png");
const mysterybox_key_overlay_pngAsset = embedBitmap("window/mysterybox_key_overlay.png");
const mysterybox_key_small_pngAsset = embedBitmap("window/mysterybox_key_small.png");
const mysterybox_tracker_border_pngAsset = embedBitmap("window/mysterybox_tracker_border.png");
const icon_weblink_png_pngAsset = embedBitmap("shared/icon_weblink_png.png");
const newnavigator_button_back_pngAsset = embedBitmap("window/newnavigator_button_back.png");
const newnavigator_button_category_collapse_pngAsset = embedBitmap("window/newnavigator_button_category_collapse.png");
const newnavigator_button_category_expand_pngAsset = embedBitmap("window/newnavigator_button_category_expand.png");
const newnavigator_button_category_show_more_pngAsset = embedBitmap("window/newnavigator_button_category_show_more.png");
const newnavigator_button_leftpane_hide_pngAsset = embedBitmap("window/newnavigator_button_leftpane_hide.png");
const newnavigator_button_leftpane_show_pngAsset = embedBitmap("window/newnavigator_button_leftpane_show.png");
const newnavigator_button_quicklink_add_pngAsset = embedBitmap("window/newnavigator_button_quicklink_add.png");
const newnavigator_button_quicklink_remove_pngAsset = embedBitmap("window/newnavigator_button_quicklink_remove.png");
const newnavigator_button_rows_pngAsset = embedBitmap("window/newnavigator_button_rows.png");
const newnavigator_button_show_room_info_pngAsset = embedBitmap("window/newnavigator_button_show_room_info.png");
const newnavigator_button_tiles_pngAsset = embedBitmap("window/newnavigator_button_tiles.png");
const newnavigator_create_room_pngAsset = embedBitmap("window/newnavigator_create_room.png");
const newnavigator_default_room_pngAsset = embedBitmap("window/newnavigator_default_room.png");
const doormode_doorbell_small_png_pngAsset = embedBitmap("shared/doormode_doorbell_small_png.png");
const doormode_invisible_small_png_pngAsset = embedBitmap("shared/doormode_invisible_small_png.png");
const doormode_password_small_png_pngAsset = embedBitmap("shared/doormode_password_small_png.png");
const newnavigator_event_icon_pngAsset = embedBitmap("window/newnavigator_event_icon.png");
const group_base_icon_png_pngAsset = embedBitmap("shared/group_base_icon_png.png");
const newnavigator_icon_fav_no_pngAsset = embedBitmap("window/newnavigator_icon_fav_no.png");
const newnavigator_icon_fav_yes_pngAsset = embedBitmap("window/newnavigator_icon_fav_yes.png");
const newnavigator_icon_group_pngAsset = embedBitmap("window/newnavigator_icon_group.png");
const newnavigator_icon_group_admin_pngAsset = embedBitmap("window/newnavigator_icon_group_admin.png");
const newnavigator_icon_group_owner_pngAsset = embedBitmap("window/newnavigator_icon_group_owner.png");
const newnavigator_icon_home_no_pngAsset = embedBitmap("window/newnavigator_icon_home_no.png");
const newnavigator_icon_home_yes_pngAsset = embedBitmap("window/newnavigator_icon_home_yes.png");
const newnavigator_icon_ql_add_pngAsset = embedBitmap("window/newnavigator_icon_ql_add.png");
const newnavigator_icon_ql_remove_pngAsset = embedBitmap("window/newnavigator_icon_ql_remove.png");
const newnavigator_icon_quicklink_plain_pngAsset = embedBitmap("window/newnavigator_icon_quicklink_plain.png");
const newnavigator_icon_usercount_pngAsset = embedBitmap("window/newnavigator_icon_usercount.png");
const newnavigator_nav_view_mini_pngAsset = embedBitmap("window/newnavigator_nav_view_mini.png");
const newnavigator_nav_view_row_pngAsset = embedBitmap("window/newnavigator_nav_view_row.png");
const newnavigator_nav_view_thumbs_pngAsset = embedBitmap("window/newnavigator_nav_view_thumbs.png");
const newnavigator_promote_room_pngAsset = embedBitmap("window/newnavigator_promote_room.png");
const newnavigator_random_room_pngAsset = embedBitmap("window/newnavigator_random_room.png");
const newnavigator_rating_star_off_pngAsset = embedBitmap("window/newnavigator_rating_star_off.png");
const newnavigator_rating_star_on_pngAsset = embedBitmap("window/newnavigator_rating_star_on.png");
const newnavigator_refresh_search_icon_pngAsset = embedBitmap("window/newnavigator_refresh_search_icon.png");
const newnavigator_report_room_pngAsset = embedBitmap("window/newnavigator_report_room.png");
const newnavigator_room_settings_icon_pngAsset = embedBitmap("window/newnavigator_room_settings_icon.png");
const newnavigator_roominfo_temp_pngAsset = embedBitmap("window/newnavigator_roominfo_temp.png");
const newnavigator_roomusercount_dimmer_black_pngAsset = embedBitmap("window/newnavigator_roomusercount_dimmer_black.png");
const icon_pixel_0_pngAsset = embedBitmap("shared/icon_pixel_0.png");
const nft_icon_24x24_pngAsset = embedBitmap("window/nft_icon_24x24.png");
const notification_friendonline_circle_pngAsset = embedBitmap("window/notification_friendonline_circle.png");
const notification_friendonline_circle_inner_pngAsset = embedBitmap("window/notification_friendonline_circle_inner.png");
const notification_friendonline_left_pngAsset = embedBitmap("window/notification_friendonline_left.png");
const notification_friendonline_middle_pngAsset = embedBitmap("window/notification_friendonline_middle.png");
const notification_friendonline_right_pngAsset = embedBitmap("window/notification_friendonline_right.png");
const notification_friendonline_slide_pngAsset = embedBitmap("window/notification_friendonline_slide.png");
const poll_poll_prompt_frank_pngAsset = embedBitmap("window/poll_poll_prompt_frank.png");
const poll_poll_prompt_question_pngAsset = embedBitmap("window/poll_poll_prompt_question.png");
const pursearea_credits_icon_pngAsset = embedBitmap("window/pursearea_credits_icon.png");
const icon_credit_0_pngAsset = embedBitmap("shared/icon_credit_0.png");
const pursearea_diamond_icon_pngAsset = embedBitmap("window/pursearea_diamond_icon.png");
const pursearea_duckets_icon_pngAsset = embedBitmap("window/pursearea_duckets_icon.png");
const pursearea_tiny_emerald_icon_pngAsset = embedBitmap("window/pursearea_tiny_emerald_icon.png");
const pursearea_mid_emerald_icon_pngAsset = embedBitmap("window/pursearea_mid_emerald_icon.png");
const pursearea_tiny_silver_icon_pngAsset = embedBitmap("window/pursearea_tiny_silver_icon.png");
const pursearea_mid_silver_icon_pngAsset = embedBitmap("window/pursearea_mid_silver_icon.png");
const pursearea_hc_icon_pngAsset = embedBitmap("window/pursearea_hc_icon.png");
const pursearea_logout_icon_pngAsset = embedBitmap("window/pursearea_logout_icon.png");
const pursearea_loyalty_icon_pngAsset = embedBitmap("window/pursearea_loyalty_icon.png");
const pursearea_settings_icon_pngAsset = embedBitmap("window/pursearea_settings_icon.png");
const pursearea_unseen_indicator_pngAsset = embedBitmap("window/pursearea_unseen_indicator.png");
const pursearea_vault_icon_pngAsset = embedBitmap("window/pursearea_vault_icon.png");
const pursearea_icon_earnings_pngAsset = embedBitmap("window/pursearea_icon_earnings.png");
const rarity_item_rarity_item_plaque_pngAsset = embedBitmap("window/rarity_item_rarity_item_plaque.png");
const rarity_item_rarity_preview_bg_pngAsset = embedBitmap("window/rarity_item_rarity_preview_bg.png");
const reward_track_checkmark_pngAsset = embedBitmap("window/reward_track_checkmark.png");
const reward_track_available_icon_pngAsset = embedBitmap("window/reward_track_available_icon.png");
const reward_track_frank_and_piccolo_pngAsset = embedBitmap("window/reward_track_frank_and_piccolo.png");
const reward_track_frank_tips_pngAsset = embedBitmap("window/reward_track_frank_tips.png");
const reward_track_free_track_pngAsset = embedBitmap("window/reward_track_free_track.png");
const reward_track_locked_large_pngAsset = embedBitmap("window/reward_track_locked_large.png");
const reward_track_locked_reward_pngAsset = embedBitmap("window/reward_track_locked_reward.png");
const reward_track_locked_small_pngAsset = embedBitmap("window/reward_track_locked_small.png");
const reward_track_not_available_icon_pngAsset = embedBitmap("window/reward_track_not_available_icon.png");
const reward_track_point_large_pngAsset = embedBitmap("window/reward_track_point_large.png");
const reward_track_point_small_pngAsset = embedBitmap("window/reward_track_point_small.png");
const reward_track_premium_track_pngAsset = embedBitmap("window/reward_track_premium_track.png");
const reward_track_prizes_background_pngAsset = embedBitmap("window/reward_track_prizes_background.png");
const reward_track_prizes_background_stars_pngAsset = embedBitmap("window/reward_track_prizes_background_stars.png");
const reward_track_reward_gift_pngAsset = embedBitmap("window/reward_track_reward_gift.png");
const reward_track_reward_gift_premium_pngAsset = embedBitmap("window/reward_track_reward_gift_premium.png");
const reward_track_small_icon_pngAsset = embedBitmap("window/reward_track_small_icon.png");
const reward_track_task_list_pngAsset = embedBitmap("window/reward_track_task_list.png");
const reward_track_task_list_complete_pngAsset = embedBitmap("window/reward_track_task_list_complete.png");
const reward_track_tasks_buy_from_catalogue_pngAsset = embedBitmap("window/reward_track_tasks_buy_from_catalogue.png");
const reward_track_tasks_change_figure_pngAsset = embedBitmap("window/reward_track_tasks_change_figure.png");
const reward_track_tasks_change_motto_pngAsset = embedBitmap("window/reward_track_tasks_change_motto.png");
const reward_track_tasks_chat_with_someone_pngAsset = embedBitmap("window/reward_track_tasks_chat_with_someone.png");
const reward_track_tasks_create_room_pngAsset = embedBitmap("window/reward_track_tasks_create_room.png");
const reward_track_tasks_dance_pngAsset = embedBitmap("window/reward_track_tasks_dance.png");
const reward_track_tasks_enter_other_users_room_pngAsset = embedBitmap("window/reward_track_tasks_enter_other_users_room.png");
const reward_track_tasks_find_hand_item_pngAsset = embedBitmap("window/reward_track_tasks_find_hand_item.png");
const reward_track_tasks_follow_friend_pngAsset = embedBitmap("window/reward_track_tasks_follow_friend.png");
const reward_track_tasks_friend_furni_locked_pngAsset = embedBitmap("window/reward_track_tasks_friend_furni_locked.png");
const reward_track_tasks_give_respect_pngAsset = embedBitmap("window/reward_track_tasks_give_respect.png");
const reward_track_tasks_move_item_pngAsset = embedBitmap("window/reward_track_tasks_move_item.png");
const reward_track_tasks_pet_eat_pngAsset = embedBitmap("window/reward_track_tasks_pet_eat.png");
const reward_track_tasks_pet_level_pngAsset = embedBitmap("window/reward_track_tasks_pet_level.png");
const reward_track_tasks_pet_respect_pngAsset = embedBitmap("window/reward_track_tasks_pet_respect.png");
const reward_track_tasks_place_builders_club_furni_pngAsset = embedBitmap("window/reward_track_tasks_place_builders_club_furni.png");
const reward_track_tasks_place_item_pngAsset = embedBitmap("window/reward_track_tasks_place_item.png");
const reward_track_tasks_publish_picture_pngAsset = embedBitmap("window/reward_track_tasks_publish_picture.png");
const reward_track_tasks_replenish_respect_pngAsset = embedBitmap("window/reward_track_tasks_replenish_respect.png");
const reward_track_tasks_request_friend_pngAsset = embedBitmap("window/reward_track_tasks_request_friend.png");
const reward_track_tasks_rotate_item_pngAsset = embedBitmap("window/reward_track_tasks_rotate_item.png");
const reward_track_tasks_send_messenger_invite_pngAsset = embedBitmap("window/reward_track_tasks_send_messenger_invite.png");
const reward_track_tasks_send_messenger_message_pngAsset = embedBitmap("window/reward_track_tasks_send_messenger_message.png");
const reward_track_tasks_set_relationship_status_pngAsset = embedBitmap("window/reward_track_tasks_set_relationship_status.png");
const reward_track_tasks_switch_item_state_pngAsset = embedBitmap("window/reward_track_tasks_switch_item_state.png");
const reward_track_tasks_swim_pngAsset = embedBitmap("window/reward_track_tasks_swim.png");
const reward_track_tasks_teleport_pngAsset = embedBitmap("window/reward_track_tasks_teleport.png");
const reward_track_tasks_use_habbicon_pngAsset = embedBitmap("window/reward_track_tasks_use_habbicon.png");
const reward_track_tasks_wave_pngAsset = embedBitmap("window/reward_track_tasks_wave.png");
const reward_track_tasks_wear_badge_pngAsset = embedBitmap("window/reward_track_tasks_wear_badge.png");
const relationship_status_bobba_pngAsset = embedBitmap("window/relationship_status_bobba.png");
const relationship_status_heart_pngAsset = embedBitmap("window/relationship_status_heart.png");
const relationship_status_none_pngAsset = embedBitmap("window/relationship_status_none.png");
const relationship_status_smile_pngAsset = embedBitmap("window/relationship_status_smile.png");
const roomtools_achievements_pngAsset = embedBitmap("window/roomtools_achievements.png");
const roomtools_camera_pngAsset = embedBitmap("window/roomtools_camera.png");
const roomtools_chat_history_pngAsset = embedBitmap("window/roomtools_chat_history.png");
const roomtools_gear_pngAsset = embedBitmap("window/roomtools_gear.png");
const roomtools_history_back_bg_pngAsset = embedBitmap("window/roomtools_history_back_bg.png");
const roomtools_history_back_icon_pngAsset = embedBitmap("window/roomtools_history_back_icon.png");
const roomtools_history_forward_bg_pngAsset = embedBitmap("window/roomtools_history_forward_bg.png");
const roomtools_history_forward_icon_pngAsset = embedBitmap("window/roomtools_history_forward_icon.png");
const roomtools_history_open_bg_pngAsset = embedBitmap("window/roomtools_history_open_bg.png");
const roomtools_history_open_icon_pngAsset = embedBitmap("window/roomtools_history_open_icon.png");
const roomtools_like_pngAsset = embedBitmap("window/roomtools_like.png");
const roomtools_magnifier_pngAsset = embedBitmap("window/roomtools_magnifier.png");
const roomtools_minimizebutton_pngAsset = embedBitmap("window/roomtools_minimizebutton.png");
const roomtools_photo_icon_pngAsset = embedBitmap("window/roomtools_photo_icon.png");
const roomtools_unlike_pngAsset = embedBitmap("window/roomtools_unlike.png");
const roomtools_zoom_in_pngAsset = embedBitmap("window/roomtools_zoom_in.png");
const roomtools_zoom_out_pngAsset = embedBitmap("window/roomtools_zoom_out.png");
const talent_achieved_div_pngAsset = embedBitmap("window/talent_achieved_div.png");
const talent_achieved_left_pngAsset = embedBitmap("window/talent_achieved_left.png");
const talent_achieved_mid_pngAsset = embedBitmap("window/talent_achieved_mid.png");
const talent_achieved_right_pngAsset = embedBitmap("window/talent_achieved_right.png");
const talent_action_overlay_pngAsset = embedBitmap("window/talent_action_overlay.png");
const talent_avatar_glow_pngAsset = embedBitmap("window/talent_avatar_glow.png");
const talent_check_mark_circle_pngAsset = embedBitmap("window/talent_check_mark_circle.png");
const talent_citizenship_accomplished_pngAsset = embedBitmap("window/talent_citizenship_accomplished.png");
const compass_color_pngAsset = embedBitmap("shared/compass_color.png");
const talent_locked_achievement_pngAsset = embedBitmap("window/talent_locked_achievement.png");
const talent_locked_stripe_pngAsset = embedBitmap("window/talent_locked_stripe.png");
const talent_mask_left_pngAsset = embedBitmap("window/talent_mask_left.png");
const talent_mask_right_pngAsset = embedBitmap("window/talent_mask_right.png");
const talent_progress_lower_pngAsset = embedBitmap("window/talent_progress_lower.png");
const talent_progress_upper_pngAsset = embedBitmap("window/talent_progress_upper.png");
const talent_register_cutout_character_pngAsset = embedBitmap("window/talent_register_cutout_character.png");
const talent_task_progress_bg_pngAsset = embedBitmap("window/talent_task_progress_bg.png");
const talent_task_progress_fg_pngAsset = embedBitmap("window/talent_task_progress_fg.png");
const talent_task_progress_left_pngAsset = embedBitmap("window/talent_task_progress_left.png");
const talent_task_progress_right_pngAsset = embedBitmap("window/talent_task_progress_right.png");
const talent_unachieved_div_pngAsset = embedBitmap("window/talent_unachieved_div.png");
const talent_unachieved_left_pngAsset = embedBitmap("window/talent_unachieved_left.png");
const talent_unachieved_mid_pngAsset = embedBitmap("window/talent_unachieved_mid.png");
const talent_unachieved_right_pngAsset = embedBitmap("window/talent_unachieved_right.png");
const talent_vip_reward_pngAsset = embedBitmap("window/talent_vip_reward.png");
const toolbar_citizenship_icon_pngAsset = embedBitmap("window/toolbar_citizenship_icon.png");
const toolbar_credit_icon_0_pngAsset = embedBitmap("window/toolbar_credit_icon_0.png");
const toolbar_credit_icon_1_pngAsset = embedBitmap("window/toolbar_credit_icon_1.png");
const toolbar_credit_icon_2_pngAsset = embedBitmap("window/toolbar_credit_icon_2.png");
const toolbar_duckat_icon_0_pngAsset = embedBitmap("window/toolbar_duckat_icon_0.png");
const toolbar_duckat_icon_1_pngAsset = embedBitmap("window/toolbar_duckat_icon_1.png");
const toolbar_duckat_icon_2_pngAsset = embedBitmap("window/toolbar_duckat_icon_2.png");
const toolbar_hc_icon_0_pngAsset = embedBitmap("window/toolbar_hc_icon_0.png");
const toolbar_hc_icon_1_pngAsset = embedBitmap("window/toolbar_hc_icon_1.png");
const toolbar_hc_icon_2_pngAsset = embedBitmap("window/toolbar_hc_icon_2.png");
const achievements_white_pngAsset = embedBitmap("shared/achievements_white.png");
const clothes_highlighter_blue_pngAsset = embedBitmap("shared/clothes_highlighter_blue.png");
const clothes_white_pngAsset = embedBitmap("shared/clothes_white.png");
const lighthouse_color_pngAsset = embedBitmap("shared/lighthouse_color.png");
const lighthouse_white_pngAsset = embedBitmap("shared/lighthouse_white.png");
const minimail_color_pngAsset = embedBitmap("shared/minimail_color.png");
const minimail_white_pngAsset = embedBitmap("shared/minimail_white.png");
const profile_color_pngAsset = embedBitmap("shared/profile_color.png");
const profile_white_pngAsset = embedBitmap("shared/profile_white.png");
const gohome_color_pngAsset = embedBitmap("shared/gohome_color.png");
const gohome_white_pngAsset = embedBitmap("shared/gohome_white.png");
const settings_color_pngAsset = embedBitmap("shared/settings_color.png");
const memenu_settings_slider_base_pngAsset = embedBitmap("shared/memenu_settings_slider_base.png");
const memenu_settings_slider_button_pngAsset = embedBitmap("shared/memenu_settings_slider_button.png");
const sounds_off_color_pngAsset = embedBitmap("shared/sounds_off_color.png");
const sounds_off_white_pngAsset = embedBitmap("shared/sounds_off_white.png");
const sounds_on_color_pngAsset = embedBitmap("shared/sounds_on_color.png");
const sounds_on_white_pngAsset = embedBitmap("shared/sounds_on_white.png");
const settings_white_pngAsset = embedBitmap("shared/settings_white.png");
const compass_white_pngAsset = embedBitmap("shared/compass_white.png");
const toolbar_offer_icon_0_pngAsset = embedBitmap("window/toolbar_offer_icon_0.png");
const toolbar_offer_icon_1_pngAsset = embedBitmap("window/toolbar_offer_icon_1.png");
const toolbar_offer_icon_2_pngAsset = embedBitmap("window/toolbar_offer_icon_2.png");
const toolbar_room_icon_0_pngAsset = embedBitmap("window/toolbar_room_icon_0.png");
const toolbar_room_icon_1_pngAsset = embedBitmap("window/toolbar_room_icon_1.png");
const toolbar_room_icon_2_pngAsset = embedBitmap("window/toolbar_room_icon_2.png");
const tools_black_pixel_pngAsset = embedBitmap("window/tools_black_pixel.png");
const tools_file_icon_pngAsset = embedBitmap("window/tools_file_icon.png");
const tools_folder_icon_pngAsset = embedBitmap("window/tools_folder_icon.png");
const tools_tools_download_icon_pngAsset = embedBitmap("window/tools_tools_download_icon.png");
const unique_item_label_1_pngAsset = embedBitmap("window/unique_item_label_1.png");
const unique_item_label_glass_shine_pngAsset = embedBitmap("window/unique_item_label_glass_shine.png");
const unique_item_label_number_glyphs_pngAsset = embedBitmap("window/unique_item_label_number_glyphs.png");
const unique_item_label_plaque_border_pngAsset = embedBitmap("window/unique_item_label_plaque_border.png");
const unique_item_label_plaque_metal_pngAsset = embedBitmap("window/unique_item_label_plaque_metal.png");
const unique_item_label_studs_pngAsset = embedBitmap("window/unique_item_label_studs.png");
const unique_item_large_background_wide_pngAsset = embedBitmap("window/unique_item_large_background_wide.png");
const unique_item_large_glass_bottom_pngAsset = embedBitmap("window/unique_item_large_glass_bottom.png");
const unique_item_large_glass_mid_pngAsset = embedBitmap("window/unique_item_large_glass_mid.png");
const unique_item_large_glass_shine_pngAsset = embedBitmap("window/unique_item_large_glass_shine.png");
const unique_item_large_glass_top_pngAsset = embedBitmap("window/unique_item_large_glass_top.png");
const unique_item_large_iron_pngAsset = embedBitmap("window/unique_item_large_iron.png");
const unique_item_large_na_button_pngAsset = embedBitmap("window/unique_item_large_na_button.png");
const unique_item_large_na_button_wide_pngAsset = embedBitmap("window/unique_item_large_na_button_wide.png");
const if_icon_ltd_png_pngAsset = embedBitmap("shared/if_icon_ltd_png.png");
const unique_item_sold_out_label_pngAsset = embedBitmap("window/unique_item_sold_out_label.png");
const unique_item_sold_out_tile_pngAsset = embedBitmap("window/unique_item_sold_out_tile.png");
const vault_earnings_icon_achievements_pngAsset = embedBitmap("window/vault_earnings_icon_achievements.png");
const vault_earnings_icon_bonusbag_pngAsset = embedBitmap("window/vault_earnings_icon_bonusbag.png");
const vault_earnings_icon_chests_pngAsset = embedBitmap("window/vault_earnings_icon_chests.png");
const vault_earnings_icon_games_pngAsset = embedBitmap("window/vault_earnings_icon_games.png");
const vault_earnings_icon_rpgs_pngAsset = embedBitmap("window/vault_earnings_icon_rpgs.png");
const vault_earnings_icon_dailygift_pngAsset = embedBitmap("window/vault_earnings_icon_dailygift.png");
const vault_earnings_icon_donations_pngAsset = embedBitmap("window/vault_earnings_icon_donations.png");
const vault_earnings_icon_hcpayday_pngAsset = embedBitmap("window/vault_earnings_icon_hcpayday.png");
const vault_earnings_icon_levelprogression_pngAsset = embedBitmap("window/vault_earnings_icon_levelprogression.png");
const vault_earnings_icon_marketplace_pngAsset = embedBitmap("window/vault_earnings_icon_marketplace.png");
const vault_earnings_icon_roombundle_pngAsset = embedBitmap("window/vault_earnings_icon_roombundle.png");
const vault_earnings_icon_snowstorm_pngAsset = embedBitmap("window/vault_earnings_icon_snowstorm.png");
const vault_earnings_icon_surprise_pngAsset = embedBitmap("window/vault_earnings_icon_surprise.png");
const vault_earnings_icon_tutorial_pngAsset = embedBitmap("window/vault_earnings_icon_tutorial.png");
const vault_icon_calendar_pngAsset = embedBitmap("window/vault_icon_calendar.png");
const vault_icon_earnings_cards_pngAsset = embedBitmap("window/vault_icon_earnings_cards.png");
const vault_icon_earnings_refresh_ads_pngAsset = embedBitmap("window/vault_icon_earnings_refresh_ads.png");
const vault_icon_earnings_trading_token_pngAsset = embedBitmap("window/vault_icon_earnings_trading_token.png");
const vault_icon_present_pngAsset = embedBitmap("window/vault_icon_present.png");
const vault_icon_vault_closed_pngAsset = embedBitmap("window/vault_icon_vault_closed.png");
const vault_icon_vault_open_pngAsset = embedBitmap("window/vault_icon_vault_open.png");
const vault_icon_vault_opener_pngAsset = embedBitmap("window/vault_icon_vault_opener.png");
const wired_chests_bell_icon_pngAsset = embedBitmap("window/wired_chests_bell_icon.png");
const wired_chests_gear_icon_pngAsset = embedBitmap("window/wired_chests_gear_icon.png");
const wired_chests_icons_payments_game_entrance_icon_pngAsset = embedBitmap("window/wired_chests_icons_payments_game_entrance_icon.png");
const wired_chests_icons_payments_life_icon_pngAsset = embedBitmap("window/wired_chests_icons_payments_life_icon.png");
const wired_chests_icons_payments_tickets_icon_pngAsset = embedBitmap("window/wired_chests_icons_payments_tickets_icon.png");
const wired_chests_images_classic_furni_chest_empty_pngAsset = embedBitmap("window/wired_chests_images_classic_furni_chest_empty.png");
const wired_chests_images_dark_coins_chest_balance_high_pngAsset = embedBitmap("window/wired_chests_images_dark_coins_chest_balance_high.png");
const wired_chests_images_dark_coins_chest_balance_low_pngAsset = embedBitmap("window/wired_chests_images_dark_coins_chest_balance_low.png");
const wired_chests_images_dark_coins_chest_balance_medium_pngAsset = embedBitmap("window/wired_chests_images_dark_coins_chest_balance_medium.png");
const wired_chests_images_dark_coins_chest_balance_zero_pngAsset = embedBitmap("window/wired_chests_images_dark_coins_chest_balance_zero.png");
const wired_chests_images_games_payments_pngAsset = embedBitmap("window/wired_chests_images_games_payments.png");
const wired_chests_images_generic_payments_pngAsset = embedBitmap("window/wired_chests_images_generic_payments.png");
const wired_chests_images_light_coins_chest_balance_high_pngAsset = embedBitmap("window/wired_chests_images_light_coins_chest_balance_high.png");
const wired_chests_images_light_coins_chest_balance_low_pngAsset = embedBitmap("window/wired_chests_images_light_coins_chest_balance_low.png");
const wired_chests_images_light_coins_chest_balance_medium_pngAsset = embedBitmap("window/wired_chests_images_light_coins_chest_balance_medium.png");
const wired_chests_images_light_coins_chest_balance_zero_pngAsset = embedBitmap("window/wired_chests_images_light_coins_chest_balance_zero.png");
const wired_chests_images_variant_furni_chest_empty_pngAsset = embedBitmap("window/wired_chests_images_variant_furni_chest_empty.png");
const wired_add_pngAsset = embedBitmap("window/wired_add.png");
const wired_delay_standard_pngAsset = embedBitmap("window/wired_delay_standard.png");
const wired_delay_precise_pngAsset = embedBitmap("window/wired_delay_precise.png");
const wired_reference_pngAsset = embedBitmap("window/wired_reference.png");
const wired_reduce_image_pngAsset = embedBitmap("window/wired_reduce_image.png");
const wired_enlarge_image_pngAsset = embedBitmap("window/wired_enlarge_image.png");
const wired_remove_pngAsset = embedBitmap("window/wired_remove.png");
const wired_variablefx_randomize_pngAsset = embedBitmap("window/wired_variablefx_randomize.png");
const wired_volter_uparrow_pngAsset = embedBitmap("window/wired_volter_uparrow.png");
const wired_volter_downarrow_pngAsset = embedBitmap("window/wired_volter_downarrow.png");
const var_picker_all_pngAsset = embedBitmap("window/var_picker_all.png");
const var_picker_internal_pngAsset = embedBitmap("window/var_picker_internal.png");
const var_picker_recent_pngAsset = embedBitmap("window/var_picker_recent.png");
const var_picker_search_pngAsset = embedBitmap("window/var_picker_search.png");
const var_picker_smart_pngAsset = embedBitmap("window/var_picker_smart.png");
const var_picker_usermade_pngAsset = embedBitmap("window/var_picker_usermade.png");
const var_picker_cancel_search_pngAsset = embedBitmap("window/var_picker_cancel_search.png");
const icon_action_png_pngAsset = embedBitmap("shared/icon_action_png.png");
const icon_addon_png_pngAsset = embedBitmap("shared/icon_addon_png.png");
const icon_condition_png_pngAsset = embedBitmap("shared/icon_condition_png.png");
const icon_selector_png_pngAsset = embedBitmap("shared/icon_selector_png.png");
const icon_trigger_png_pngAsset = embedBitmap("shared/icon_trigger_png.png");
const icon_variable_png_pngAsset = embedBitmap("shared/icon_variable_png.png");
const wired_styles_volter_furni_picks_1_pngAsset = embedBitmap("window/wired_styles_volter_furni_picks_1.png");
const wired_styles_volter_furni_picks_2_pngAsset = embedBitmap("window/wired_styles_volter_furni_picks_2.png");
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
const wired_styles_volter_slider_bg_pngAsset = embedBitmap("window/wired_styles_volter_slider_bg.png");
const slider_obj_png_pngAsset = embedBitmap("shared/slider_obj_png.png");
const wired_styles_illumina_slider_obj_pngAsset = embedBitmap("window/wired_styles_illumina_slider_obj.png");
const wired_styles_illumina_furni_picks_1_pngAsset = embedBitmap("window/wired_styles_illumina_furni_picks_1.png");
const wired_styles_illumina_furni_picks_2_pngAsset = embedBitmap("window/wired_styles_illumina_furni_picks_2.png");
const wired_styles_illumina_move_0_pngAsset = embedBitmap("window/wired_styles_illumina_move_0.png");
const wired_styles_illumina_move_1_pngAsset = embedBitmap("window/wired_styles_illumina_move_1.png");
const wired_styles_illumina_move_2_pngAsset = embedBitmap("window/wired_styles_illumina_move_2.png");
const wired_styles_illumina_move_3_pngAsset = embedBitmap("window/wired_styles_illumina_move_3.png");
const wired_styles_illumina_move_4_pngAsset = embedBitmap("window/wired_styles_illumina_move_4.png");
const wired_styles_illumina_move_5_pngAsset = embedBitmap("window/wired_styles_illumina_move_5.png");
const wired_styles_illumina_move_6_pngAsset = embedBitmap("window/wired_styles_illumina_move_6.png");
const wired_styles_illumina_move_7_pngAsset = embedBitmap("window/wired_styles_illumina_move_7.png");
const wired_styles_illumina_move_diag_pngAsset = embedBitmap("window/wired_styles_illumina_move_diag.png");
const wired_styles_illumina_move_rnd_pngAsset = embedBitmap("window/wired_styles_illumina_move_rnd.png");
const wired_styles_illumina_move_vrt_pngAsset = embedBitmap("window/wired_styles_illumina_move_vrt.png");
const wired_styles_illumina_rotate_ccw_pngAsset = embedBitmap("window/wired_styles_illumina_rotate_ccw.png");
const wired_styles_illumina_rotate_cw_pngAsset = embedBitmap("window/wired_styles_illumina_rotate_cw.png");
const wired_styles_illumina_icon_source_furni_pngAsset = embedBitmap("window/wired_styles_illumina_icon_source_furni.png");
const wired_styles_illumina_icon_source_users_pngAsset = embedBitmap("window/wired_styles_illumina_icon_source_users.png");
const wired_styles_illumina_icon_source_global_pngAsset = embedBitmap("window/wired_styles_illumina_icon_source_global.png");
const wired_styles_illumina_icon_source_context_pngAsset = embedBitmap("window/wired_styles_illumina_icon_source_context.png");
const word_quiz_thum_down_pngAsset = embedBitmap("window/word_quiz_thum_down.png");
const word_quiz_thum_down_big_pngAsset = embedBitmap("window/word_quiz_thum_down_big.png");
const word_quiz_thum_up_pngAsset = embedBitmap("window/word_quiz_thum_up.png");
const word_quiz_thum_up_big_pngAsset = embedBitmap("window/word_quiz_thum_up_big.png");
const HabboWindowManagerCom_avatar_image_xml_binAsset = embedBytes("window/HabboWindowManagerCom_avatar_image_xml.bin");
const badge_image_xml_binAsset = embedBytes("window/badge_image_xml.bin");
const balloon_xml_binAsset = embedBytes("window/balloon_xml.bin");
const clock_base_xml_binAsset = embedBytes("window/clock_base_xml.bin");
const hover_bitmap_xml_binAsset = embedBytes("window/hover_bitmap_xml.bin");
const illumina_border_xml_binAsset = embedBytes("window/illumina_border_xml.bin");
const illumina_chat_bubble_xml_binAsset = embedBytes("window/illumina_chat_bubble_xml.bin");
const illumina_input_xml_binAsset = embedBytes("window/illumina_input_xml.bin");
const product_icon_xml_binAsset = embedBytes("window/product_icon_xml.bin");
const product_image_xml_binAsset = embedBytes("window/product_image_xml.bin");
const updating_timestamp_xml_binAsset = embedBytes("window/updating_timestamp_xml.bin");
const progress_indicator_xml_binAsset = embedBytes("window/progress_indicator_xml.bin");
const separator_xml_binAsset = embedBytes("window/separator_xml.bin");
const running_number_xml_binAsset = embedBytes("window/running_number_xml.bin");
const pet_image_xml_binAsset = embedBytes("window/pet_image_xml.bin");
const furniture_image_xml_binAsset = embedBytes("window/furniture_image_xml.bin");
const room_previewer_xml_binAsset = embedBytes("window/room_previewer_xml.bin");
const pixel_limit_xml_binAsset = embedBytes("window/pixel_limit_xml.bin");
const room_usercount_xml_binAsset = embedBytes("window/room_usercount_xml.bin");
const room_thumbnail_xml_binAsset = embedBytes("window/room_thumbnail_xml.bin");
const illumina_chat_bubble_text_xml_binAsset = embedBytes("window/illumina_chat_bubble_text_xml.bin");
const unique_item_overlay_griditem_xml_binAsset = embedBytes("window/unique_item_overlay_griditem_xml.bin");
const unique_item_overlay_supply_xml_binAsset = embedBytes("window/unique_item_overlay_supply_xml.bin");
const unique_item_overlay_preview_xml_binAsset = embedBytes("window/unique_item_overlay_preview_xml.bin");
const rarity_item_overlay_griditem_xml_binAsset = embedBytes("window/rarity_item_overlay_griditem_xml.bin");
const rarity_item_overlay_preview_xml_binAsset = embedBytes("window/rarity_item_overlay_preview_xml.bin");
const table_view_xml_binAsset = embedBytes("window/table_view_xml.bin");
const chest_overlay_griditem_xml_binAsset = embedBytes("window/chest_overlay_griditem_xml.bin");
const icon_wired_variable_user_large_png_pngAsset = embedBitmap("window/icon_wired_variable_user_large_png.png");
const icon_wired_variable_context_large_png_pngAsset = embedBitmap("window/icon_wired_variable_context_large_png.png");
const icon_wired_variable_global_large_png_pngAsset = embedBitmap("window/icon_wired_variable_global_large_png.png");
const icon_wired_variable_furni_large_png_pngAsset = embedBitmap("window/icon_wired_variable_furni_large_png.png");
const icon_wired_error_png_pngAsset = embedBitmap("shared/icon_wired_error_png.png");
const icon_wired_notification_png_pngAsset = embedBitmap("shared/icon_wired_notification_png.png");
const icon_wired_warning_png_pngAsset = embedBitmap("shared/icon_wired_warning_png.png");
const icon_discord_png_pngAsset = embedBitmap("window/icon_discord_png.png");
const wired_box_lines_png_pngAsset = embedBitmap("window/wired_box_lines_png.png");
const wired_global_placeholder_png_pngAsset = embedBitmap("window/wired_global_placeholder_png.png");
const wired_monitor_element1_png_pngAsset = embedBitmap("window/wired_monitor_element1_png.png");
const wired_monitor_element2_png_pngAsset = embedBitmap("window/wired_monitor_element2_png.png");
const wired_misc_directional_system_0_png_pngAsset = embedBitmap("window/wired_misc_directional_system_0_png.png");
const wired_misc_directional_system_1_png_pngAsset = embedBitmap("window/wired_misc_directional_system_1_png.png");
const wired_misc_directional_system_2_png_pngAsset = embedBitmap("window/wired_misc_directional_system_2_png.png");
const wired_misc_directional_system_3_png_pngAsset = embedBitmap("window/wired_misc_directional_system_3_png.png");
const recycler_furnimatic_indicator_pointer_base_pngAsset = embedBitmap("window/recycler_furnimatic_indicator_pointer_base.png");
const recycler_furnimatic_indicator_pointer_arrow_pngAsset = embedBitmap("window/recycler_furnimatic_indicator_pointer_arrow.png");
const recycler_furnimatic_indicator_pngAsset = embedBitmap("window/recycler_furnimatic_indicator.png");
const recycler_furnimatic_container_right_pngAsset = embedBitmap("window/recycler_furnimatic_container_right.png");
const recycler_furnimatic_container_slice_pngAsset = embedBitmap("window/recycler_furnimatic_container_slice.png");
const recycler_furnimatic_container_left_pngAsset = embedBitmap("window/recycler_furnimatic_container_left.png");
const recycler_furnimatic_machine_pngAsset = embedBitmap("window/recycler_furnimatic_machine.png");
const recycler_furnimatic_title_pngAsset = embedBitmap("window/recycler_furnimatic_title.png");
const recycler_recycler_icon_pngAsset = embedBitmap("window/recycler_recycler_icon.png");
const special_items_item_platform_pngAsset = embedBitmap("window/special_items_item_platform.png");
const special_items_spotlight1_pngAsset = embedBitmap("window/special_items_spotlight1.png");
const special_items_spotlight2_pngAsset = embedBitmap("window/special_items_spotlight2.png");
const badge_rarity_badges_emblem_uncommon_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_uncommon.png");
const badge_rarity_badges_emblem_uncommon_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_uncommon_extended.png");
const badge_rarity_badges_emblem_rare_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_rare.png");
const badge_rarity_badges_emblem_rare_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_rare_extended.png");
const badge_rarity_badges_emblem_very_rare_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_very_rare.png");
const badge_rarity_badges_emblem_very_rare_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_very_rare_extended.png");
const badge_rarity_badges_emblem_mythical_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_mythical.png");
const badge_rarity_badges_emblem_mythical_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_mythical_extended.png");
const badge_rarity_badges_emblem_legendary_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_legendary.png");
const badge_rarity_badges_emblem_legendary_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_legendary_extended.png");
const badge_rarity_badges_emblem_unique_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_unique.png");
const badge_rarity_badges_emblem_unique_extended_pngAsset = embedBitmap("window/badge_rarity_badges_emblem_unique_extended.png");
const badges_emblem_achievement_pngAsset = embedBitmap("window/badges_emblem_achievement.png");
const badges_emblem_achievement_extended_pngAsset = embedBitmap("window/badges_emblem_achievement_extended.png");
const badge_leaderboard_entry_even_pngAsset = embedBitmap("window/badge_leaderboard_entry_even.png");
const badge_leaderboard_entry_self_pngAsset = embedBitmap("window/badge_leaderboard_entry_self.png");
const badge_leaderboard_entry_uneven_pngAsset = embedBitmap("window/badge_leaderboard_entry_uneven.png");
const badge_leaderboard_header_pngAsset = embedBitmap("window/badge_leaderboard_header.png");
const badge_leaderboard_dropdown_opener_pngAsset = embedBitmap("window/badge_leaderboard_dropdown_opener.png");
const star_small_grey_pngAsset = embedBitmap("window/star_small_grey.png");
const star_small_green_pngAsset = embedBitmap("window/star_small_green.png");
const star_small_pink_pngAsset = embedBitmap("window/star_small_pink.png");
const star_small_diamond_pngAsset = embedBitmap("window/star_small_diamond.png");
const star_small_ruby_pngAsset = embedBitmap("window/star_small_ruby.png");
const star_small_gold_pngAsset = embedBitmap("window/star_small_gold.png");
const star_small_silver_pngAsset = embedBitmap("window/star_small_silver.png");
const star_small_bronze_pngAsset = embedBitmap("window/star_small_bronze.png");

export class HabboWindowManagerCom extends SimpleApplication {
    static { registerClassName(this, 'HabboWindowManagerCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboWindowManagerCom.#initStatics();
        return HabboWindowManagerCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboWindowManagerCom.#initStatics();
        HabboWindowManagerCom.requiredClasses = value;
    }

    public static manifest = HabboWindowManagerCom_manifest_binAsset;

    public static habbo_element_description_xml = habbo_element_description_xml_binAsset;

    public static habbo_window_layout_alert_xml = habbo_window_layout_alert_xml_binAsset;

    public static habbo_window_layout_bubble_xml = habbo_window_layout_bubble_xml_binAsset;

    public static habbo_window_layout_bubble_7_xml = habbo_window_layout_bubble_7_xml_binAsset;

    public static habbo_window_layout_button_xml = habbo_window_layout_button_xml_binAsset;

    public static habbo_window_layout_button_thick_xml = habbo_window_layout_button_thick_xml_binAsset;

    public static habbo_window_layout_button_black_xml = habbo_window_layout_button_black_xml_binAsset;

    public static habbo_window_layout_button_thick_black_xml = habbo_window_layout_button_thick_black_xml_binAsset;

    public static habbo_window_layout_button_shiny_xml = habbo_window_layout_button_shiny_xml_binAsset;

    public static habbo_window_layout_button_shiny_thick_xml = habbo_window_layout_button_shiny_thick_xml_binAsset;

    public static habbo_window_layout_button_shiny_large_xml = habbo_window_layout_button_shiny_large_xml_binAsset;

    public static habbo_window_layout_button_shiny_large_5_xml = habbo_window_layout_button_shiny_large_5_xml_binAsset;

    public static habbo_window_layout_button_shiny_black_xml = habbo_window_layout_button_shiny_black_xml_binAsset;

    public static habbo_window_layout_button_shiny_thick_black_xml = habbo_window_layout_button_shiny_thick_black_xml_binAsset;

    public static habbo_window_layout_dropmenu_xml = habbo_window_layout_dropmenu_xml_binAsset;

    public static habbo_window_layout_dropmenu_3_xml = habbo_window_layout_dropmenu_3_xml_binAsset;

    public static habbo_window_layout_dropmenu_black_xml = habbo_window_layout_dropmenu_black_xml_binAsset;

    public static habbo_window_layout_dropmenu_item_xml = habbo_window_layout_dropmenu_item_xml_binAsset;

    public static habbo_window_layout_dropmenu_item_3_xml = habbo_window_layout_dropmenu_item_3_xml_binAsset;

    public static habbo_window_layout_dropmenu_item_black_xml = habbo_window_layout_dropmenu_item_black_xml_binAsset;

    public static habbo_window_layout_droplist_xml = habbo_window_layout_droplist_xml_binAsset;

    public static habbo_window_layout_frame_xml = habbo_window_layout_frame_xml_binAsset;

    public static habbo_window_layout_frame_3_xml = habbo_window_layout_frame_3_xml_binAsset;

    public static habbo_window_layout_frame_7_xml = habbo_window_layout_frame_7_xml_binAsset;

    public static habbo_window_layout_frame_leaderboard_xml = habbo_window_layout_frame_leaderboard_xml_binAsset;

    public static habbo_window_layout_header_xml = habbo_window_layout_header_xml_binAsset;

    public static habbo_window_layout_header_black_xml = habbo_window_layout_header_black_xml_binAsset;

    public static habbo_window_layout_header_3_xml = habbo_window_layout_header_3_xml_binAsset;

    public static habbo_window_layout_header_7_xml = habbo_window_layout_header_7_xml_binAsset;

    public static habbo_window_layout_header_leaderboard_xml = habbo_window_layout_header_leaderboard_xml_binAsset;

    public static habbo_window_layout_scaler_xml = habbo_window_layout_scaler_xml_binAsset;

    public static habbo_window_layout_scaler_3_xml = habbo_window_layout_scaler_3_xml_binAsset;

    public static habbo_window_layout_scrollbar_horizontal_xml = habbo_window_layout_scrollbar_horizontal_xml_binAsset;

    public static habbo_window_layout_scrollbar_vertical_xml = habbo_window_layout_scrollbar_vertical_xml_binAsset;

    public static habbo_window_layout_scrollable_itemlist_vertical_xml = habbo_window_layout_scrollable_itemlist_vertical_xml_binAsset;

    public static habbo_window_layout_scrollable_itemgrid_vertical_xml = habbo_window_layout_scrollable_itemgrid_vertical_xml_binAsset;

    public static habbo_window_layout_scrollable_itemlist_vertical_ubuntu_xml = habbo_window_layout_scrollable_itemlist_vertical_ubuntu_xml_binAsset;

    public static habbo_window_layout_scrollable_itemgrid_vertical_ubuntu_xml = habbo_window_layout_scrollable_itemgrid_vertical_ubuntu_xml_binAsset;

    public static habbo_window_layout_simple_xml = habbo_window_layout_simple_xml_binAsset;

    public static habbo_window_layout_tab_button_xml = habbo_window_layout_tab_button_xml_binAsset;

    public static habbo_window_layout_tab_button_black_xml = habbo_window_layout_tab_button_black_xml_binAsset;

    public static habbo_window_layout_tab_button_3_xml = habbo_window_layout_tab_button_3_xml_binAsset;

    public static habbo_window_layout_tab_context_xml = habbo_window_layout_tab_context_xml_binAsset;

    public static habbo_window_layout_tab_context_3_xml = habbo_window_layout_tab_context_3_xml_binAsset;

    public static habbo_window_layout_tooltip_xml = habbo_window_layout_tooltip_xml_binAsset;

    public static habbo_skin_frame_xml = habbo_skin_frame_xml_binAsset;

    public static habbo_skin_frame_3_xml = habbo_skin_frame_3_xml_binAsset;

    public static habbo_skin_frame_7_xml = habbo_skin_frame_7_xml_binAsset;

    public static habbo_skin_frame_leaderboard_all_xml = habbo_skin_frame_leaderboard_all_xml_binAsset;

    public static habbo_skin_frame_leaderboard_ach_xml = habbo_skin_frame_leaderboard_ach_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_uncommon_xml = habbo_skin_frame_leaderboard_rarity_uncommon_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_1_xml = habbo_skin_frame_leaderboard_rarity_1_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_2_xml = habbo_skin_frame_leaderboard_rarity_2_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_3_xml = habbo_skin_frame_leaderboard_rarity_3_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_4_xml = habbo_skin_frame_leaderboard_rarity_4_xml_binAsset;

    public static habbo_skin_frame_leaderboard_rarity_5_xml = habbo_skin_frame_leaderboard_rarity_5_xml_binAsset;

    public static habbo_skin_bubble_xml = habbo_skin_bubble_xml_binAsset;

    public static habbo_skin_bubble_pointer_up_xml = habbo_skin_bubble_pointer_up_xml_binAsset;

    public static habbo_skin_bubble_pointer_right_xml = habbo_skin_bubble_pointer_right_xml_binAsset;

    public static habbo_skin_bubble_pointer_down_xml = habbo_skin_bubble_pointer_down_xml_binAsset;

    public static habbo_skin_frame_pointer_down_xml = habbo_skin_frame_pointer_down_xml_binAsset;

    public static habbo_skin_bubble_pointer_left_xml = habbo_skin_bubble_pointer_left_xml_binAsset;

    public static habbo_skin_bubble_7_xml = habbo_skin_bubble_7_xml_binAsset;

    public static habbo_skin_bubble_pointer_up_7_xml = habbo_skin_bubble_pointer_up_7_xml_binAsset;

    public static habbo_skin_bubble_pointer_right_7_xml = habbo_skin_bubble_pointer_right_7_xml_binAsset;

    public static habbo_skin_bubble_pointer_down_7_xml = habbo_skin_bubble_pointer_down_7_xml_binAsset;

    public static habbo_skin_bubble_pointer_left_7_xml = habbo_skin_bubble_pointer_left_7_xml_binAsset;

    public static habbo_skin_button_default_xml = habbo_skin_button_default_xml_binAsset;

    public static habbo_skin_button_default_black_xml = habbo_skin_button_default_black_xml_binAsset;

    public static habbo_skin_button_default_white_xml = habbo_skin_button_default_white_xml_binAsset;

    public static habbo_skin_button_shiny_default_xml = habbo_skin_button_shiny_default_xml_binAsset;

    public static habbo_skin_button_shiny_black_xml = habbo_skin_button_shiny_black_xml_binAsset;

    public static habbo_skin_button_shiny_thick_xml = habbo_skin_button_shiny_thick_xml_binAsset;

    public static habbo_skin_button_shiny_large_xml = habbo_skin_button_shiny_large_xml_binAsset;

    public static habbo_skin_button_shiny_thick_black_xml = habbo_skin_button_shiny_thick_black_xml_binAsset;

    public static habbo_skin_button_thick_xml = habbo_skin_button_thick_xml_binAsset;

    public static habbo_skin_button_thick_black_xml = habbo_skin_button_thick_black_xml_binAsset;

    public static habbo_skin_button_thick_white_xml = habbo_skin_button_thick_white_xml_binAsset;

    public static habbo_skin_button_group_left_xml = habbo_skin_button_group_left_xml_binAsset;

    public static habbo_skin_button_group_left_black_xml = habbo_skin_button_group_left_black_xml_binAsset;

    public static habbo_skin_button_group_left_white_xml = habbo_skin_button_group_left_white_xml_binAsset;

    public static habbo_skin_button_group_center_xml = habbo_skin_button_group_center_xml_binAsset;

    public static habbo_skin_button_group_center_black_xml = habbo_skin_button_group_center_black_xml_binAsset;

    public static habbo_skin_button_group_center_white_xml = habbo_skin_button_group_center_white_xml_binAsset;

    public static habbo_skin_button_group_right_xml = habbo_skin_button_group_right_xml_binAsset;

    public static habbo_skin_button_group_right_black_xml = habbo_skin_button_group_right_black_xml_binAsset;

    public static habbo_skin_button_group_right_white_xml = habbo_skin_button_group_right_white_xml_binAsset;

    public static habbo_skin_button_checkbox_xml = habbo_skin_button_checkbox_xml_binAsset;

    public static habbo_skin_button_checkbox_black_xml = habbo_skin_button_checkbox_black_xml_binAsset;

    public static habbo_skin_button_checkbox_white_xml = habbo_skin_button_checkbox_white_xml_binAsset;

    public static habbo_skin_button_close_xml = habbo_skin_button_close_xml_binAsset;

    public static habbo_skin_button_close_black_xml = habbo_skin_button_close_black_xml_binAsset;

    public static habbo_skin_button_close_white_xml = habbo_skin_button_close_white_xml_binAsset;

    public static habbo_skin_button_close_3_xml = habbo_skin_button_close_3_xml_binAsset;

    public static habbo_skin_button_close_leaderboard_xml = habbo_skin_button_close_leaderboard_xml_binAsset;

    public static habbo_skin_button_plus_3_xml = habbo_skin_button_plus_3_xml_binAsset;

    public static habbo_skin_button_minus_3_xml = habbo_skin_button_minus_3_xml_binAsset;

    public static habbo_skin_button_help_3_xml = habbo_skin_button_help_3_xml_binAsset;

    public static habbo_skin_button_menu_xml = habbo_skin_button_menu_xml_binAsset;

    public static habbo_skin_button_radio_xml = habbo_skin_button_radio_xml_binAsset;

    public static habbo_skin_button_radio_black_xml = habbo_skin_button_radio_black_xml_binAsset;

    public static habbo_skin_button_radio_white_xml = habbo_skin_button_radio_white_xml_binAsset;

    public static habbo_skin_button_tab_xml = habbo_skin_button_tab_xml_binAsset;

    public static habbo_skin_button_tab_black_xml = habbo_skin_button_tab_black_xml_binAsset;

    public static habbo_skin_button_tab_white_xml = habbo_skin_button_tab_white_xml_binAsset;

    public static habbo_skin_button_tab_3_xml = habbo_skin_button_tab_3_xml_binAsset;

    public static habbo_skin_tab_content_3_xml = habbo_skin_tab_content_3_xml_binAsset;

    public static habbo_skin_scaler_xml = habbo_skin_scaler_xml_binAsset;

    public static habbo_skin_scaler_black_xml = habbo_skin_scaler_black_xml_binAsset;

    public static habbo_skin_scaler_white_xml = habbo_skin_scaler_white_xml_binAsset;

    public static habbo_skin_scaler_3_xml = habbo_skin_scaler_3_xml_binAsset;

    public static habbo_skin_scrollbar_xml = habbo_skin_scrollbar_xml_binAsset;

    public static habbo_skin_scrollbar_black_xml = habbo_skin_scrollbar_black_xml_binAsset;

    public static habbo_skin_scrollbar_3_xml = habbo_skin_scrollbar_3_xml_binAsset;

    public static habbo_skin_header_xml = habbo_skin_header_xml_binAsset;

    public static habbo_skin_header_3_xml = habbo_skin_header_3_xml_binAsset;

    public static habbo_skin_header_7_xml = habbo_skin_header_7_xml_binAsset;

    public static habbo_skin_header_leaderboard_xml = habbo_skin_header_leaderboard_xml_binAsset;

    public static habbo_skin_icon_set_xml = habbo_skin_icon_set_xml_binAsset;

    public static habbo_skin_dropmenu_xml = habbo_skin_dropmenu_xml_binAsset;

    public static habbo_skin_dropmenu_3_xml = habbo_skin_dropmenu_3_xml_binAsset;

    public static habbo_skin_dropmenu_black_xml = habbo_skin_dropmenu_black_xml_binAsset;

    public static habbo_skin_droplist_xml = habbo_skin_droplist_xml_binAsset;

    public static habbo_skin_droplist_thick_xml = habbo_skin_droplist_thick_xml_binAsset;

    public static habbo_skin_tab_context_xml = habbo_skin_tab_context_xml_binAsset;

    public static habbo_skin_border_black_xml = habbo_skin_border_black_xml_binAsset;

    public static habbo_skin_border_colorless_xml = habbo_skin_border_colorless_xml_binAsset;

    public static habbo_skin_border_colorless_dropshadow_xml = habbo_skin_border_colorless_dropshadow_xml_binAsset;

    public static habbo_skin_border_white_xml = habbo_skin_border_white_xml_binAsset;

    public static habbo_skin_border_slot_xml = habbo_skin_border_slot_xml_binAsset;

    public static habbo_skin_border_slot_2_xml = habbo_skin_border_slot_2_xml_binAsset;

    public static habbo_skin_border_4_xml = habbo_skin_border_4_xml_binAsset;

    public static habbo_skin_border_5_xml = habbo_skin_border_5_xml_binAsset;

    public static habbo_skin_border_6_xml = habbo_skin_border_6_xml_binAsset;

    public static habbo_skin_border_7_xml = habbo_skin_border_7_xml_binAsset;

    public static habbo_skin_border_8_xml = habbo_skin_border_8_xml_binAsset;

    public static habbo_skin_border_9_xml = habbo_skin_border_9_xml_binAsset;

    public static habbo_skin_border_12_xml = habbo_skin_border_12_xml_binAsset;

    public static habbo_skin_border_13_xml = habbo_skin_border_13_xml_binAsset;

    public static habbo_skin_border_14_xml = habbo_skin_border_14_xml_binAsset;

    public static habbo_skin_border_15_xml = habbo_skin_border_15_xml_binAsset;

    public static habbo_skin_border_16_xml = habbo_skin_border_16_xml_binAsset;

    public static habbo_skin_text_xml = habbo_skin_text_xml_binAsset;

    public static habbo_skin_tooltip_xml = habbo_skin_tooltip_xml_binAsset;

    public static text_styles_css = text_styles_css_binAsset;

    public static habbo_blue_skin_png = habbo_blue_skin_png_pngAsset;

    public static habbo_skin_ubuntu_png = habbo_skin_ubuntu_png_pngAsset;

    public static habbo_border_hsv_layers_png = habbo_border_hsv_layers_png_pngAsset;

    public static habbo_border_hsv_layers2_png = habbo_border_hsv_layers2_png_pngAsset;

    public static skin_ubuntu_bg_9 = skin_ubuntu_bg_9_pngAsset;

    public static ubuntu_frame_leaderboard_all_png = ubuntu_frame_leaderboard_all_png_pngAsset;

    public static ubuntu_frame_leaderboard_ach_png = ubuntu_frame_leaderboard_ach_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_uncommon_png = ubuntu_frame_leaderboard_rarity_uncommon_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_1_png = ubuntu_frame_leaderboard_rarity_1_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_2_png = ubuntu_frame_leaderboard_rarity_2_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_3_png = ubuntu_frame_leaderboard_rarity_3_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_4_png = ubuntu_frame_leaderboard_rarity_4_png_pngAsset;

    public static ubuntu_frame_leaderboard_rarity_5_png = ubuntu_frame_leaderboard_rarity_5_png_pngAsset;

    public static leaderboard_button_close_png = leaderboard_button_close_png_pngAsset;

    public static habbo_cursor_link_png = habbo_cursor_link_png_pngAsset;

    public static habbo_cursor_drag_png = habbo_cursor_drag_png_pngAsset;

    public static habbo_icons_png = habbo_icons_png_pngAsset;

    public static placeholder_avatar_png = placeholder_avatar_png_pngAsset;

    public static placeholder_avatar_head_png = placeholder_avatar_head_png_pngAsset;

    public static placeholder_avatar_cropped_png = placeholder_avatar_cropped_png_pngAsset;

    public static placeholder_avatar_head_cropped_png = placeholder_avatar_head_cropped_png_pngAsset;

    public static placeholder_avatar_small_png = placeholder_avatar_small_png_pngAsset;

    public static placeholder_avatar_small_head_png = placeholder_avatar_small_head_png_pngAsset;

    public static placeholder_avatar_small_cropped_png = placeholder_avatar_small_cropped_png_pngAsset;

    public static placeholder_avatar_small_head_cropped_png = placeholder_avatar_small_head_cropped_png_pngAsset;

    public static placeholder_pet_png = placeholder_pet_png_pngAsset;

    public static placeholder_pet_small_png = placeholder_pet_small_png_pngAsset;

    public static placeholder_furni_png = placeholder_furni_png_pngAsset;

    public static placeholder_furni_small_png = placeholder_furni_small_png_pngAsset;

    public static sticker_croco = sticker_croco_pngAsset;

    public static volter = volter_ttfAsset;

    public static volterb = volterb_ttfAsset;

    public static ubuntu_regular = HabboWindowManagerCom_ubuntu_regular_ttfAsset;

    public static ubuntu_bold = ubuntu_bold_ttfAsset;

    public static ubuntu_condensed = ubuntu_condensed_ttfAsset;

    public static ubuntuThick_bold = ubuntuThick_bold_ttfAsset;

    public static ubuntu_italic = ubuntu_italic_ttfAsset;

    public static ubuntu_bold_italic = ubuntu_bold_italic_ttfAsset;

    public static ubuntuMedium = ubuntuMedium_ttfAsset;

    public static habbo_window_alert_xml = habbo_window_alert_xml_binAsset;

    public static habbo_window_alert_link_xml = habbo_window_alert_link_xml_binAsset;

    public static habbo_window_confirm_xml = habbo_window_confirm_xml_binAsset;

    public static habbo_crasher_dialog_xml = habbo_crasher_dialog_xml_binAsset;

    public static unseen_item_counter_xml = unseen_item_counter_xml_binAsset;

    public static simple_alert_xml = HabboWindowManagerCom_simple_alert_xml_binAsset;

    public static illumina_alert_illustrations_frank_neutral_png = illumina_alert_illustrations_frank_neutral_png_pngAsset;

    public static habbo_skin_illumina_light_png = habbo_skin_illumina_light_png_pngAsset;

    public static illumina_light_balloon_png = illumina_light_balloon_png_pngAsset;

    public static illumina_light_border_etched_png = illumina_light_border_etched_png_pngAsset;

    public static illumina_light_border_frame_png = frame_png_pngAsset;

    public static illumina_light_border_infobox_png = illumina_light_border_infobox_png_pngAsset;

    public static illumina_light_border_light_png = illumina_light_border_light_png_pngAsset;

    public static illumina_light_border_raised_png = illumina_light_border_raised_png_pngAsset;

    public static illumina_light_border_sunk_png = illumina_light_border_sunk_png_pngAsset;

    public static illumina_light_bubble_chat_arrow_png = illumina_light_bubble_chat_arrow_png_pngAsset;

    public static illumina_light_bubble_chat_bg_png = illumina_light_bubble_chat_bg_png_pngAsset;

    public static illumina_light_button_default_png = illumina_light_button_default_png_pngAsset;

    public static illumina_light_button_multi_png = illumina_light_button_multi_png_pngAsset;

    public static illumina_light_button_frame_close_png = illumina_light_button_frame_close_png_pngAsset;

    public static illumina_light_button_frame_menu_png = illumina_light_button_frame_menu_png_pngAsset;

    public static illumina_light_button_frame_minimize_png = illumina_light_button_frame_minimize_png_pngAsset;

    public static illumina_light_button_unetched_png = illumina_light_button_unetched_png_pngAsset;

    public static illumina_light_button_dark_recolorable_png = illumina_light_button_dark_recolorable_png_pngAsset;

    public static illumina_light_checkbox_basic_png = illumina_light_checkbox_basic_png_pngAsset;

    public static illumina_light_clock_background_png = illumina_light_clock_background_png_pngAsset;

    public static illumina_light_clock_background_left_png = illumina_light_clock_background_left_png_pngAsset;

    public static illumina_light_clock_background_mid_png = illumina_light_clock_background_mid_png_pngAsset;

    public static illumina_light_clock_background_right_png = illumina_light_clock_background_right_png_pngAsset;

    public static illumina_light_icons_png = illumina_light_icons_png_pngAsset;

    public static illumina_light_input_chat_png = illumina_light_input_chat_png_pngAsset;

    public static illumina_light_progress_indicator_etched_png = illumina_light_progress_indicator_etched_png_pngAsset;

    public static illumina_light_progress_indicator_flat_png = illumina_light_progress_indicator_flat_png_pngAsset;

    public static illumina_light_radio_button_png = illumina_light_radio_button_png_pngAsset;

    public static illumina_light_scrollbar_horizontal_png = illumina_light_scrollbar_horizontal_png_pngAsset;

    public static illumina_light_scrollbar_vertical_png = illumina_light_scrollbar_vertical_png_pngAsset;

    public static illumina_light_separator_png = illumina_light_separator_png_pngAsset;

    public static illumina_light_switch_png = illumina_light_switch_png_pngAsset;

    public static illumina_light_skin_border_xml = illumina_light_skin_border_xml_binAsset;

    public static illumina_light_skin_border_sunk_xml = illumina_light_skin_border_sunk_xml_binAsset;

    public static illumina_light_skin_border_light_xml = illumina_light_skin_border_light_xml_binAsset;

    public static illumina_light_skin_border_raised_xml = illumina_light_skin_border_raised_xml_binAsset;

    public static illumina_light_skin_border_input_xml = illumina_light_skin_border_input_xml_binAsset;

    public static illumina_light_skin_border_chat_bubble_xml = illumina_light_skin_border_chat_bubble_xml_binAsset;

    public static illumina_light_skin_border_balloon_xml = illumina_light_skin_border_balloon_xml_binAsset;

    public static illumina_light_skin_border_infobox_xml = illumina_light_skin_border_infobox_xml_binAsset;

    public static illumina_light_frame_xml = illumina_light_frame_xml_binAsset;

    public static illumina_light_frame_modal_xml = illumina_light_frame_modal_xml_binAsset;

    public static illumina_light_frame_wired_xml = illumina_light_frame_wired_xml_binAsset;

    public static illumina_light_skin_frame_xml = illumina_light_skin_frame_xml_binAsset;

    public static illumina_light_skin_button_frame_close_xml = illumina_light_skin_button_frame_close_xml_binAsset;

    public static illumina_light_skin_button_frame_menu_xml = illumina_light_skin_button_frame_menu_xml_binAsset;

    public static illumina_light_skin_button_frame_minimize_xml = illumina_light_skin_button_frame_minimize_xml_binAsset;

    public static illumina_light_button_xml = illumina_light_button_xml_binAsset;

    public static illumina_light_button_plain_xml = illumina_light_button_plain_xml_binAsset;

    public static illumina_light_skin_button_xml = illumina_light_skin_button_xml_binAsset;

    public static illumina_light_skin_button_plain_xml = illumina_light_skin_button_plain_xml_binAsset;

    public static illumina_light_skin_button_multi_left_xml = illumina_light_skin_button_multi_left_xml_binAsset;

    public static illumina_light_skin_button_multi_right_xml = illumina_light_skin_button_multi_right_xml_binAsset;

    public static illumina_light_skin_button_multi_middle_xml = illumina_light_skin_button_multi_middle_xml_binAsset;

    public static illumina_light_skin_button_unetched_xml = illumina_light_skin_button_unetched_xml_binAsset;

    public static illumina_light_skin_button_dark_recolorable_xml = illumina_light_skin_button_dark_recolorable_xml_binAsset;

    public static illumina_light_checkbox_basic_xml = illumina_light_checkbox_basic_xml_binAsset;

    public static illumina_light_skin_checkbox_basic_xml = illumina_light_skin_checkbox_basic_xml_binAsset;

    public static illumina_light_skin_dropmenu_xml = illumina_light_skin_dropmenu_xml_binAsset;

    public static illumina_light_switch_xml = illumina_light_switch_xml_binAsset;

    public static illumina_light_skin_switch_xml = illumina_light_skin_switch_xml_binAsset;

    public static illumina_light_radio_button_xml = illumina_light_radio_button_xml_binAsset;

    public static illumina_light_skin_radio_button_xml = illumina_light_skin_radio_button_xml_binAsset;

    public static illumina_light_scrollbar_horizontal_xml = illumina_light_scrollbar_horizontal_xml_binAsset;

    public static illumina_light_scrollbar_vertical_xml = illumina_light_scrollbar_vertical_xml_binAsset;

    public static illumina_light_skin_scrollbar_xml = illumina_light_skin_scrollbar_xml_binAsset;

    public static illumina_light_scrollable_itemlist_vertical_xml = illumina_light_scrollable_itemlist_vertical_xml_binAsset;

    public static illumina_light_dropmenu_item_xml = illumina_light_dropmenu_item_xml_binAsset;

    public static illumina_light_dropmenu_xml = illumina_light_dropmenu_xml_binAsset;

    public static illumina_purple_border_frame_png = illumina_purple_border_frame_png_pngAsset;

    public static illumina_purple_button_frame_close_png = illumina_purple_button_frame_close_png_pngAsset;

    public static illumina_purple_button_default_png = illumina_purple_button_default_png_pngAsset;

    public static illumina_purple_skin_frame_xml = illumina_purple_skin_frame_xml_binAsset;

    public static illumina_purple_skin_button_frame_close_xml = illumina_purple_skin_button_frame_close_xml_binAsset;

    public static illumina_purple_frame_xml = illumina_purple_frame_xml_binAsset;

    public static illumina_purple_button_xml = illumina_purple_button_xml_binAsset;

    public static illumina_purple_button_plain_xml = illumina_purple_button_plain_xml_binAsset;

    public static illumina_purple_skin_button_xml = illumina_purple_skin_button_xml_binAsset;

    public static illumina_purple_skin_button_plain_xml = illumina_purple_skin_button_plain_xml_binAsset;

    public static habbo_skin_illumina_dark_png = habbo_skin_illumina_dark_png_pngAsset;

    public static illumina_dark_skin_border_xml = illumina_dark_skin_border_xml_binAsset;

    public static illumina_dark_frame_xml = illumina_dark_frame_xml_binAsset;

    public static illumina_dark_skin_frame_xml = illumina_dark_skin_frame_xml_binAsset;

    public static illumina_dark_header_xml = illumina_dark_header_xml_binAsset;

    public static illumina_dark_skin_header_xml = illumina_dark_skin_header_xml_binAsset;

    public static illumina_dark_button_xml = illumina_dark_button_xml_binAsset;

    public static illumina_dark_skin_button_xml = illumina_dark_skin_button_xml_binAsset;

    public static illumina_dark_scrollbar_horizontal_xml = illumina_dark_scrollbar_horizontal_xml_binAsset;

    public static illumina_dark_scrollbar_vertical_xml = illumina_dark_scrollbar_vertical_xml_binAsset;

    public static illumina_dark_skin_scrollbar_xml = illumina_dark_skin_scrollbar_xml_binAsset;

    public static illumina_dark_scrollbar_horizontal_png = illumina_dark_scrollbar_horizontal_png_pngAsset;

    public static illumina_dark_scrollbar_vertical_png = illumina_dark_scrollbar_vertical_png_pngAsset;

    public static achievement_ach_progressbar1 = achievement_ach_progressbar1_pngAsset;

    public static achievement_ach_progressbar2 = achievement_ach_progressbar2_pngAsset;

    public static achievement_ach_progressbar3 = achievement_ach_progressbar3_pngAsset;

    public static achievement_ach_progressbar4 = achievement_ach_progressbar4_pngAsset;

    public static achievement_ach_progressbar5 = achievement_ach_progressbar5_pngAsset;

    public static avatar_editor_avatar_editor_download_icon = avatar_editor_avatar_editor_download_icon_pngAsset;

    public static avatar_editor_editor_clr_13x21_1 = avatar_editor_editor_clr_13x21_1_pngAsset;

    public static avatar_editor_editor_clr_13x21_2 = avatar_editor_editor_clr_13x21_2_pngAsset;

    public static avatar_editor_editor_clr_13x21_3 = avatar_editor_editor_clr_13x21_3_pngAsset;

    public static avatar_editor_editor_clr_40x32_1 = avatar_editor_editor_clr_40x32_1_pngAsset;

    public static avatar_editor_editor_clr_40x32_2 = avatar_editor_editor_clr_40x32_2_pngAsset;

    public static avatar_editor_editor_clr_40x32_3 = avatar_editor_editor_clr_40x32_3_pngAsset;

    public static avatar_editor_generic_platform = avatar_editor_generic_platform_pngAsset;

    public static avatar_editor_generic_remove_selection = avatar_editor_generic_remove_selection_pngAsset;

    public static avatar_editor_parts_hilite = avatar_editor_parts_hilite_pngAsset;

    public static avatar_editor_parts_hilite_with_sd = avatar_editor_parts_hilite_with_sd_pngAsset;

    public static avatar_editor_rotate_avatar_button = avatar_editor_rotate_avatar_button_pngAsset;

    public static avatar_editor_tabs_ae_tabs_effects = avatar_editor_tabs_ae_tabs_effects_pngAsset;

    public static avatar_editor_tabs_ae_tabs_generic = avatar_editor_tabs_ae_tabs_generic_pngAsset;

    public static avatar_editor_tabs_ae_tabs_head = avatar_editor_tabs_ae_tabs_head_pngAsset;

    public static avatar_editor_tabs_ae_tabs_hotlooks = avatar_editor_tabs_ae_tabs_hotlooks_pngAsset;

    public static avatar_editor_tabs_ae_tabs_legs = avatar_editor_tabs_ae_tabs_legs_pngAsset;

    public static avatar_editor_tabs_ae_tabs_misc = avatar_editor_tabs_ae_tabs_misc_pngAsset;

    public static avatar_editor_tabs_ae_tabs_torso = avatar_editor_tabs_ae_tabs_torso_pngAsset;

    public static avatar_editor_tabs_ae_tabs_wardrobe = avatar_editor_tabs_ae_tabs_wardrobe_pngAsset;

    public static avatar_editor_tabs_bottom_accessories = avatar_editor_tabs_bottom_accessories_pngAsset;

    public static avatar_editor_tabs_bottom_accessories_off = avatar_editor_tabs_bottom_accessories_off_pngAsset;

    public static avatar_editor_tabs_bottom_shoes = avatar_editor_tabs_bottom_shoes_pngAsset;

    public static avatar_editor_tabs_bottom_shoes_off = avatar_editor_tabs_bottom_shoes_off_pngAsset;

    public static avatar_editor_tabs_bottom_trousers = avatar_editor_tabs_bottom_trousers_pngAsset;

    public static avatar_editor_tabs_bottom_trousers_off = avatar_editor_tabs_bottom_trousers_off_pngAsset;

    public static avatar_editor_tabs_effects_fx = avatar_editor_tabs_effects_fx_pngAsset;

    public static avatar_editor_tabs_gender_female = avatar_editor_tabs_gender_female_pngAsset;

    public static avatar_editor_tabs_gender_female_off = avatar_editor_tabs_gender_female_off_pngAsset;

    public static avatar_editor_tabs_gender_male = avatar_editor_tabs_gender_male_pngAsset;

    public static avatar_editor_tabs_gender_male_off = avatar_editor_tabs_gender_male_off_pngAsset;

    public static avatar_editor_tabs_head_accessories = avatar_editor_tabs_head_accessories_pngAsset;

    public static avatar_editor_tabs_head_accessories_off = avatar_editor_tabs_head_accessories_off_pngAsset;

    public static avatar_editor_tabs_head_eyewear = avatar_editor_tabs_head_eyewear_pngAsset;

    public static avatar_editor_tabs_head_eyewear_off = avatar_editor_tabs_head_eyewear_off_pngAsset;

    public static avatar_editor_tabs_head_face_accessories = avatar_editor_tabs_head_face_accessories_pngAsset;

    public static avatar_editor_tabs_head_face_accessories_off = avatar_editor_tabs_head_face_accessories_off_pngAsset;

    public static avatar_editor_tabs_head_hair = avatar_editor_tabs_head_hair_pngAsset;

    public static avatar_editor_tabs_head_hair_off = avatar_editor_tabs_head_hair_off_pngAsset;

    public static avatar_editor_tabs_head_hats = avatar_editor_tabs_head_hats_pngAsset;

    public static avatar_editor_tabs_head_hats_off = avatar_editor_tabs_head_hats_off_pngAsset;

    public static avatar_editor_tabs_icon_misc_misc = avatar_editor_tabs_icon_misc_misc_pngAsset;

    public static avatar_editor_tabs_icon_misc_misc_off = avatar_editor_tabs_icon_misc_misc_off_pngAsset;

    public static avatar_editor_tabs_icon_misc_pets = avatar_editor_tabs_icon_misc_pets_pngAsset;

    public static avatar_editor_tabs_icon_misc_pets_off = avatar_editor_tabs_icon_misc_pets_off_pngAsset;

    public static avatar_editor_tabs_top_accessories = avatar_editor_tabs_top_accessories_pngAsset;

    public static avatar_editor_tabs_top_accessories_off = avatar_editor_tabs_top_accessories_off_pngAsset;

    public static avatar_editor_tabs_top_jacket = avatar_editor_tabs_top_jacket_pngAsset;

    public static avatar_editor_tabs_top_jacket_off = avatar_editor_tabs_top_jacket_off_pngAsset;

    public static avatar_editor_tabs_top_prints = avatar_editor_tabs_top_prints_pngAsset;

    public static avatar_editor_tabs_top_prints_off = avatar_editor_tabs_top_prints_off_pngAsset;

    public static avatar_editor_tabs_top_shirt = avatar_editor_tabs_top_shirt_pngAsset;

    public static avatar_editor_tabs_top_shirt_off = avatar_editor_tabs_top_shirt_off_pngAsset;

    public static avatar_editor_wardrobe_select_outfit = avatar_editor_wardrobe_select_outfit_pngAsset;

    public static avatar_editor_wardrobe_select_outfit_over = avatar_editor_wardrobe_select_outfit_over_pngAsset;

    public static avatar_editor_wardrobe_wardrobe_empty_slot = avatar_editor_wardrobe_wardrobe_empty_slot_pngAsset;

    public static bottom_bar_buildersclub = bottom_bar_buildersclub_pngAsset;

    public static bottom_bar_camera = bottom_bar_camera_pngAsset;

    public static bottom_bar_wired_menu = bottom_bar_wired_menu_pngAsset;

    public static bottom_bar_collapse_left = bottom_bar_collapse_left_pngAsset;

    public static bottom_bar_collapse_right = bottom_bar_collapse_right_pngAsset;

    public static bottom_bar_divider_1px = bottom_bar_divider_1px_pngAsset;

    public static bottom_bar_games = bottom_bar_games_pngAsset;

    public static bottom_bar_home = bottom_bar_home_pngAsset;

    public static bottom_bar_inventory = bottom_bar_inventory_pngAsset;

    public static bottom_bar_logo = bottom_bar_logo_pngAsset;

    public static bottom_bar_navigator = bottom_bar_navigator_pngAsset;

    public static bottom_bar_memenu_bg = bottom_bar_memenu_bg_pngAsset;

    public static bottom_bar_memenu_circle = bottom_bar_memenu_circle_pngAsset;

    public static bottom_bar_progression = bottom_bar_progression_pngAsset;

    public static bottom_bar_shop = bottom_bar_shop_pngAsset;

    public static bottom_bar_stories = bottom_bar_stories_pngAsset;

    public static camera_arrow_gray = camera_arrow_gray_pngAsset;

    public static camera_arrow_green = camera_arrow_green_pngAsset;

    public static camera_browse_ffwd = camera_browse_ffwd_pngAsset;

    public static camera_cam_bg = camera_cam_bg_pngAsset;

    public static camera_cam_btn_hi = camera_cam_btn_hi_pngAsset;

    public static camera_cam_close_x = camera_cam_close_x_pngAsset;

    public static camera_camera_btn = camera_camera_btn_pngAsset;

    public static camera_camera_btn_down = camera_camera_btn_down_pngAsset;

    public static camera_camera_edit = camera_camera_edit_pngAsset;

    public static camera_camera_icon = camera_camera_icon_pngAsset;

    public static camera_fx_button_active = camera_photo_border_pngAsset;

    public static camera_fx_button_outline = camera_fx_button_outline_pngAsset;

    public static camera_fx_button_selected = camera_fx_button_selected_pngAsset;

    public static camera_fx_frame_selected = camera_fx_frame_selected_pngAsset;

    public static camera_fx_slider_bottom_active = camera_fx_slider_bottom_active_pngAsset;

    public static camera_fx_slider_button = camera_fx_slider_button_pngAsset;

    public static camera_habbo_camera = camera_habbo_camera_pngAsset;

    public static camera_icon_colorfilter = camera_icon_colorfilter_pngAsset;

    public static camera_icon_compositefilter = camera_icon_compositefilter_pngAsset;

    public static camera_icon_frame = camera_icon_frame_pngAsset;

    public static camera_locked = camera_locked_pngAsset;

    public static camera_photo_border = camera_photo_border_pngAsset;

    public static camera_remove_effect = camera_remove_effect_pngAsset;

    public static camera_retake_button = camera_retake_button_pngAsset;

    public static camera_shadow_outline = camera_shadow_outline_pngAsset;

    public static camera_viewfinder = camera_viewfinder_pngAsset;

    public static camera_zoom_in = camera_zoom_in_pngAsset;

    public static camera_zoom_out = camera_zoom_out_pngAsset;

    public static campaign_calendar_day_generic_activated = campaign_calendar_day_generic_activated_pngAsset;

    public static campaign_calendar_day_generic_bg = campaign_calendar_day_generic_bg_pngAsset;

    public static campaign_calendar_day_generic_button = campaign_calendar_day_generic_button_pngAsset;

    public static campaign_calendar_generic_lock = campaign_calendar_generic_lock_pngAsset;

    public static campaign_calendar_icon_advent = campaign_calendar_icon_advent_pngAsset;

    public static campaign_calendar_opened = campaign_calendar_opened_pngAsset;

    public static catalogue_background = catalogue_background_pngAsset;

    public static catalogue_badge_background = catalogue_badge_background_pngAsset;

    public static catalogue_chatstyle_background = catalogue_chatstyle_background_pngAsset;

    public static catalogue_bundle_star = catalogue_bundle_star_pngAsset;

    public static catalogue_clakboard = catalogue_clakboard_pngAsset;

    public static catalogue_color_picker_27x22_border = ctlg_clr_27x22_1_pngAsset;

    public static catalogue_color_picker_27x22_color = ctlg_clr_27x22_2_pngAsset;

    public static catalogue_color_picker_27x22_selection = ctlg_clr_27x22_3_pngAsset;

    public static catalogue_effects_ninja = fx_icon_108_png_pngAsset;

    public static catalogue_giftcard_blank = giftcard_blank_pngAsset;

    public static catalogue_giftcard_staff = catalogue_giftcard_staff_pngAsset;

    public static catalogue_giftcard_staff_icon = catalogue_giftcard_staff_icon_pngAsset;

    public static catalogue_ui2_checkmark_m = catalogue_ui2_checkmark_m_pngAsset;

    public static catalogue_icon_alert_s = catalogue_icon_alert_s_pngAsset;

    public static catalogue_giftcard_icon_bgstar = catalogue_giftcard_icon_bgstar_pngAsset;

    public static catalogue_ufo_pricebg = catalogue_ufo_pricebg_pngAsset;

    public static chest_overlay_brown_background = chest_overlay_brown_background_pngAsset;

    public static chest_overlay_brown_plaque = chest_overlay_brown_plaque_pngAsset;

    public static chest_overlay_gold_background = chest_overlay_gold_background_pngAsset;

    public static chest_overlay_gold_plaque = chest_overlay_gold_plaque_pngAsset;

    public static chest_overlay_shine = chest_overlay_shine_pngAsset;

    public static chest_overlay_silver_background = chest_overlay_silver_background_pngAsset;

    public static chest_overlay_silver_plaque = chest_overlay_silver_plaque_pngAsset;

    public static common_beta_sign = common_beta_sign_pngAsset;

    public static common_blue_arrow_horizontal = common_blue_arrow_horizontal_pngAsset;

    public static common_blue_arrow_vertical = common_blue_arrow_vertical_pngAsset;

    public static common_chat_indicator = common_chat_indicator_pngAsset;

    public static common_chat_style_block = common_chat_style_block_pngAsset;

    public static common_chat_styles = common_chat_styles_pngAsset;

    public static common_check_mark = common_check_mark_pngAsset;

    public static common_chisel = common_chisel_pngAsset;

    public static common_close_x = common_close_x_pngAsset;

    public static common_cross_mark = common_cross_mark_pngAsset;

    public static common_green_arrow_horizontal = common_green_arrow_horizontal_pngAsset;

    public static common_green_arrow_vertical = common_green_arrow_vertical_pngAsset;

    public static common_hilight_big = common_hilight_big_pngAsset;

    public static common_icon_task_completed_m = common_icon_task_completed_m_pngAsset;

    public static common_icon_task_completed_s = common_icon_task_completed_s_pngAsset;

    public static common_info_icon_grey = common_info_icon_grey_pngAsset;

    public static common_item_selected = common_item_selected_pngAsset;

    public static common_item_unselected = common_item_unselected_pngAsset;

    public static common_loading_icon = loading_icon_pngAsset;

    public static common_maximize = common_maximize_pngAsset;

    public static common_maximize_unetched = common_maximize_unetched_pngAsset;

    public static common_minimize_unetched = common_minimize_unetched_pngAsset;

    public static common_offers_icon = common_offers_icon_pngAsset;

    public static common_promo_arrow_close = common_promo_arrow_close_pngAsset;

    public static common_promo_arrow_top_right = common_promo_arrow_top_right_pngAsset;

    public static common_small_coin = common_small_coin_pngAsset;

    public static common_small_pen = small_pen_pngAsset;

    public static common_star = common_star_pngAsset;

    public static common_trashcan_big = common_trashcan_big_pngAsset;

    public static common_trashcan_small = common_trashcan_small_pngAsset;

    public static common_welcome_screen_arrow = common_welcome_screen_arrow_pngAsset;

    public static craft_craft_bg = craft_craft_bg_pngAsset;

    public static discord_discord_box = discord_discord_box_pngAsset;

    public static discord_collectibles_logo = discord_collectibles_logo_pngAsset;

    public static discord_origins_logo = discord_origins_logo_pngAsset;

    public static discord_wired_logo = discord_wired_logo_pngAsset;

    public static extended_profile_clear_favourite = favourite_png_pngAsset;

    public static extended_profile_icon_level = extended_profile_icon_level_pngAsset;

    public static extended_profile_icon_star_gem = extended_profile_icon_star_gem_pngAsset;

    public static extended_profile_make_favourite = make_favourite_png_pngAsset;

    public static extended_profile_rooms = extended_profile_rooms_pngAsset;

    public static extended_profile_frank_stop = extended_profile_frank_stop_pngAsset;

    public static extended_profile_block_icon = extended_profile_block_icon_pngAsset;

    public static floor_plan_editor_add_tile = floor_plan_editor_add_tile_pngAsset;

    public static floor_plan_editor_enter_tile = floor_plan_editor_enter_tile_pngAsset;

    public static floor_plan_editor_logo = floor_plan_editor_logo_pngAsset;

    public static floor_plan_editor_raise_tile = floor_plan_editor_raise_tile_pngAsset;

    public static floor_plan_editor_remove_tile = floor_plan_editor_remove_tile_pngAsset;

    public static floor_plan_editor_sink_tile = floor_plan_editor_sink_tile_pngAsset;

    public static forum_forum_edit = forum_forum_edit_pngAsset;

    public static forum_forum_hide = forum_forum_hide_pngAsset;

    public static forum_forum_list0 = forum_forum_list0_pngAsset;

    public static forum_forum_list1 = forum_forum_list1_pngAsset;

    public static forum_forum_list2 = forum_forum_list2_pngAsset;

    public static forum_forum_locked = forum_forum_locked_pngAsset;

    public static forum_forum_pinned = forum_forum_pinned_pngAsset;

    public static forum_forum_report = forum_forum_report_pngAsset;

    public static forum_forum_unhide = forum_forum_unhide_pngAsset;

    public static forum_forum_unlocked = forum_forum_unlocked_pngAsset;

    public static forum_forum_unpinned = forum_forum_unpinned_pngAsset;

    public static forum_reply = forum_reply_pngAsset;

    public static franks_emotions_angry = franks_emotions_angry_pngAsset;

    public static franks_emotions_blush = franks_emotions_blush_pngAsset;

    public static franks_emotions_heart = franks_emotions_heart_pngAsset;

    public static franks_emotions_poop = franks_emotions_poop_pngAsset;

    public static franks_emotions_sad = franks_emotions_sad_pngAsset;

    public static friend_bar_all_friends = friend_bar_all_friends_pngAsset;

    public static friend_bar_event_notification_icon = friend_bar_event_notification_icon_pngAsset;

    public static friend_bar_friendlist_chat = friend_bar_friendlist_chat_pngAsset;

    public static friend_bar_friendlist_eye = friend_bar_friendlist_eye_pngAsset;

    public static friend_bar_friendlist_go_room = friend_bar_friendlist_go_room_pngAsset;

    public static friend_bar_friendlist_messenger = friend_bar_friendlist_messenger_pngAsset;

    public static friend_bar_friendlist_messenger_notify_0 = friend_bar_friendlist_messenger_notify_0_pngAsset;

    public static friend_bar_friendlist_messenger_notify_1 = friend_bar_friendlist_messenger_notify_1_pngAsset;

    public static friend_bar_friends_browse_bg = friend_bar_friends_browse_bg_pngAsset;

    public static friend_bar_search_habbos = friend_bar_search_habbos_pngAsset;

    public static game_center_achievement_locked_icon = game_center_achievement_locked_icon_pngAsset;

    public static game_center_loading_icon = game_center_loading_icon_pngAsset;

    public static game_center_snowball_notification_icon = game_center_snowball_notification_icon_pngAsset;

    public static group_guild_color_btm = group_guild_color_btm_pngAsset;

    public static group_guild_color_top = group_guild_color_top_pngAsset;

    public static hc_center_hc_center_cover = hc_center_hc_center_cover_pngAsset;

    public static hc_center_hc_center_icon_credits = hc_center_hc_center_icon_credits_pngAsset;

    public static hc_center_hc_center_illustration = hc_center_hc_center_illustration_pngAsset;

    public static hc_center_hc_center_timer = hc_center_hc_center_timer_pngAsset;

    public static hc_center_hc_postit_bg = hc_center_hc_postit_bg_pngAsset;

    public static hc_center_t0 = hc_center_t0_pngAsset;

    public static hc_center_t1 = hc_center_t1_pngAsset;

    public static hc_center_t2 = hc_center_t2_pngAsset;

    public static hc_center_t3 = hc_center_t3_pngAsset;

    public static hc_center_t4 = hc_center_t4_pngAsset;

    public static hc_center_t5 = hc_center_t5_pngAsset;

    public static hc_center_t6 = hc_center_t6_pngAsset;

    public static hc_center_t7 = hc_center_t7_pngAsset;

    public static hc_center_t8 = hc_center_t8_pngAsset;

    public static hc_center_t9 = hc_center_t9_pngAsset;

    public static bg_star_300x300 = bg_star_300x300_pngAsset;

    public static collectables_level_bg = collectables_level_bg_pngAsset;

    public static collectables_score_element = collectables_score_element_pngAsset;

    public static collectables_score_element2 = collectables_score_element2_pngAsset;

    public static collectables_reward_rarity_flag = collectables_reward_rarity_flag_pngAsset;

    public static collectables_score_background = collectables_score_background_pngAsset;

    public static collectables_score_background_right = collectables_score_background_right_pngAsset;

    public static collectables_score_background_gradient = collectables_score_background_gradient_pngAsset;

    public static collectables_score_background_gradient2 = collectables_score_background_gradient2_pngAsset;

    public static collectables_transfer_safe = collectables_transfer_safe_pngAsset;

    public static collectables_cabinet_element = collectables_cabinet_element_pngAsset;

    public static collectables_collection_default = collectables_collection_default_pngAsset;

    public static collectables_icon_curator_stamp_small = icon_nft_pngAsset;

    public static collectables_icon_curator_stamp_large = icon_curator_stamp_large_png_pngAsset;

    public static collectables_lock_closed = collectables_lock_closed_pngAsset;

    public static collectables_lock_open = collectables_lock_open_pngAsset;

    public static image_connection_problem = image_connection_problem_pngAsset;

    public static image_frank_dont_know = image_frank_dont_know_pngAsset;

    public static icon_checkmark_small = icon_checkmark_small_pngAsset;

    public static icon_habbicon_fav = icon_habbicon_fav_pngAsset;

    public static habbicons_submenu_icon_default = habbicons_submenu_icon_default_pngAsset;

    public static habbicons_submenu_icon_owned = habbicons_submenu_icon_owned_pngAsset;

    public static icon_notification_corner_mid = icon_notification_corner_mid_pngAsset;

    public static bg_pattern_001 = bg_pattern_001_pngAsset;

    public static habbicon_topbar_left = habbicon_topbar_left_pngAsset;

    public static habbicon_topbar_mid = habbicon_topbar_mid_pngAsset;

    public static habbicon_topbar_right = habbicon_topbar_right_pngAsset;

    public static habbicons_clip = habbicons_clip_pngAsset;

    public static habbicons_habbicons_dm = habbicons_habbicons_dm_pngAsset;

    public static habbicons_habbicons_logo = habbicons_habbicons_logo_pngAsset;

    public static habbicons_sticky_note = habbicons_sticky_note_pngAsset;

    public static habbicons_sticky_note2 = habbicons_sticky_note2_pngAsset;

    public static loading = loading_pngAsset;

    public static help_accept_icon = help_accept_icon_pngAsset;

    public static help_bandaid = help_bandaid_pngAsset;

    public static help_chat_review_anonymous = help_chat_review_anonymous_pngAsset;

    public static help_chat_review_avatar_anonymous = help_chat_review_avatar_anonymous_pngAsset;

    public static help_chat_review_avatar_perpetrator = help_chat_review_avatar_perpetrator_pngAsset;

    public static help_chat_review_decision_bad = help_chat_review_decision_bad_pngAsset;

    public static help_chat_review_decision_ok = help_chat_review_decision_ok_pngAsset;

    public static help_chat_review_decision_refused = help_chat_review_decision_refused_pngAsset;

    public static help_chat_review_decision_searching_1 = help_chat_review_decision_searching_1_pngAsset;

    public static help_chat_review_decision_searching_2 = help_chat_review_decision_searching_2_pngAsset;

    public static help_chat_review_decision_undecided = help_chat_review_decision_undecided_pngAsset;

    public static help_chat_review_decision_very_bad = help_chat_review_decision_very_bad_pngAsset;

    public static help_chat_review_decision_waiting_1 = help_chat_review_decision_waiting_1_pngAsset;

    public static help_chat_review_decision_waiting_2 = help_chat_review_decision_waiting_2_pngAsset;

    public static help_chat_review_perpetrator = help_chat_review_perpetrator_pngAsset;

    public static help_chat_review_progress_big_1 = help_chat_review_progress_big_1_pngAsset;

    public static help_chat_review_progress_big_2 = help_chat_review_progress_big_2_pngAsset;

    public static help_chat_review_progress_big_3 = help_chat_review_progress_big_3_pngAsset;

    public static help_chat_review_progress_big_4 = help_chat_review_progress_big_4_pngAsset;

    public static help_chat_review_vote_bad = help_chat_review_vote_bad_pngAsset;

    public static help_chat_review_vote_bad_down = help_chat_review_vote_bad_down_pngAsset;

    public static help_chat_review_vote_bad_over = help_chat_review_vote_bad_over_pngAsset;

    public static help_chat_review_vote_ok = help_chat_review_vote_ok_pngAsset;

    public static help_chat_review_vote_ok_down = help_chat_review_vote_ok_down_pngAsset;

    public static help_chat_review_vote_ok_over = help_chat_review_vote_ok_over_pngAsset;

    public static help_chat_review_vote_very_bad = help_chat_review_vote_very_bad_pngAsset;

    public static help_chat_review_vote_very_bad_down = help_chat_review_vote_very_bad_down_pngAsset;

    public static help_chat_review_vote_very_bad_over = help_chat_review_vote_very_bad_over_pngAsset;

    public static help_citizenship_default = help_citizenship_default_pngAsset;

    public static help_decline_icon = help_decline_icon_pngAsset;

    public static help_error_state = help_error_state_pngAsset;

    public static help_feeling_confused = help_feeling_confused_pngAsset;

    public static help_feeling_confused_coming_up = help_feeling_confused_coming_up_pngAsset;

    public static help_frank_greeting = help_frank_greeting_pngAsset;

    public static help_guide_accept = help_guide_accept_pngAsset;

    public static help_guide_icon = help_guide_icon_pngAsset;

    public static help_habboway_correct = help_habboway_correct_pngAsset;

    public static help_habboway_dove_off = help_habboway_dove_off_pngAsset;

    public static help_habboway_dove_on = help_habboway_dove_on_pngAsset;

    public static help_habboway_dove_quizz = help_habboway_dove_quizz_pngAsset;

    public static help_habboway_next = help_habboway_next_pngAsset;

    public static help_habboway_prev = help_habboway_prev_pngAsset;

    public static help_habboway_wrong = help_habboway_wrong_pngAsset;

    public static help_help_duck = help_help_duck_pngAsset;

    public static help_illustrations_bully = help_illustrations_bully_pngAsset;

    public static help_illustrations_question = help_illustrations_question_pngAsset;

    public static help_illustrations_tour = help_illustrations_tour_pngAsset;

    public static help_need_help = help_need_help_pngAsset;

    public static help_notification = help_notification_pngAsset;

    public static help_poor_frank = help_poor_frank_pngAsset;

    public static help_requester_icon = help_requester_icon_pngAsset;

    public static help_user_create = help_user_create_pngAsset;

    public static help_user_feedback = help_user_feedback_pngAsset;

    public static help_user_pending = help_user_pending_pngAsset;

    public static high_score_highscore_cup = high_score_highscore_cup_pngAsset;

    public static icons_back = icons_back_pngAsset;

    public static icons_back_small = icons_back_small_pngAsset;

    public static icons_builder_error_full = icons_builder_error_full_pngAsset;

    public static icons_builder_error_furnilimit = icons_builder_error_furnilimit_pngAsset;

    public static icons_builder_error_grouproom = icons_builder_error_grouproom_pngAsset;

    public static icons_builder_error_notroom = icons_builder_error_notroom_pngAsset;

    public static icons_builder_error_room = icons_builder_error_room_pngAsset;

    public static icons_builder_error_userinroom = icons_builder_error_userinroom_pngAsset;

    public static icons_close = icons_close_pngAsset;

    public static icons_facebook = icons_facebook_pngAsset;

    public static icons_flag = icons_flag_pngAsset;

    public static icons_forward = icons_forward_pngAsset;

    public static icons_forward_small = icons_forward_small_pngAsset;

    public static icons_go_to_room_icon = icons_go_to_room_icon_pngAsset;

    public static icons_hc_icon_small = icons_hc_icon_small_pngAsset;

    public static icons_hilighter_yellow = icons_hilighter_yellow_pngAsset;

    public static icons_info_grey = icons_info_grey_pngAsset;

    public static icons_link_icon = icons_link_icon_pngAsset;

    public static icons_next = icons_next_pngAsset;

    public static icons_panic = icons_panic_pngAsset;

    public static icons_share = icons_share_pngAsset;

    public static icons_star = icons_star_pngAsset;

    public static icons_tickmark = icons_tickmark_pngAsset;

    public static icons_toolbar_achievements_hover = icons_toolbar_achievements_hover_pngAsset;

    public static icons_toolbar_achievements_normal = achievements_color_pngAsset;

    public static icons_toolbar_builder_hover = icons_toolbar_builder_hover_pngAsset;

    public static icons_toolbar_builder_normal = icons_toolbar_builder_normal_pngAsset;

    public static icons_toolbar_catalogue_hover = icons_toolbar_catalogue_hover_pngAsset;

    public static icons_toolbar_catalogue_normal = icons_toolbar_catalogue_normal_pngAsset;

    public static icons_toolbar_divider = icons_toolbar_divider_pngAsset;

    public static icons_toolbar_games_hover = icons_toolbar_games_hover_pngAsset;

    public static icons_toolbar_games_normal = icons_toolbar_games_normal_pngAsset;

    public static icons_toolbar_home_hover = icons_toolbar_home_hover_pngAsset;

    public static icons_toolbar_home_normal = icons_toolbar_home_normal_pngAsset;

    public static icons_toolbar_inventory_hover = icons_toolbar_inventory_hover_pngAsset;

    public static icons_toolbar_inventory_normal = icons_toolbar_inventory_normal_pngAsset;

    public static icons_toolbar_me_menu_placeholder = icons_toolbar_me_menu_placeholder_pngAsset;

    public static icons_toolbar_minimail_hover = icons_toolbar_minimail_hover_pngAsset;

    public static icons_toolbar_minimail_normal = icons_toolbar_minimail_normal_pngAsset;

    public static icons_toolbar_navigator_hover = icons_toolbar_navigator_hover_pngAsset;

    public static icons_toolbar_navigator_normal = icons_toolbar_navigator_normal_pngAsset;

    public static icons_toolbar_progression_hover = icons_toolbar_progression_hover_pngAsset;

    public static icons_toolbar_progression_normal = icons_toolbar_progression_normal_pngAsset;

    public static icons_toolbar_reception_hover = icons_toolbar_reception_hover_pngAsset;

    public static icons_toolbar_reception_normal = icons_toolbar_reception_normal_pngAsset;

    public static icons_toolbar_stories_hover = icons_toolbar_stories_hover_pngAsset;

    public static icons_toolbar_stories_normal = icons_toolbar_stories_normal_pngAsset;

    public static icons_toolbar_valentines_hover = icons_toolbar_valentines_hover_pngAsset;

    public static icons_toolbar_valentines_normal = icons_toolbar_valentines_normal_pngAsset;

    public static icons_toolbar_xmas_hover = icons_toolbar_xmas_hover_pngAsset;

    public static icons_toolbar_xmas_normal = icons_toolbar_xmas_normal_pngAsset;

    public static icons_twitter = icons_twitter_pngAsset;

    public static icons_wearable = icons_wearable_pngAsset;

    public static illumina_horizontal_separator = illumina_horizontal_separator_pngAsset;

    public static illumina_wired_bg_left_repeating = illumina_wired_bg_left_repeating_pngAsset;

    public static illumina_wired_bg_left = illumina_wired_bg_left_pngAsset;

    public static illumina_wired_bg_right = illumina_wired_bg_right_pngAsset;

    public static infostand_bot_info_bg = infostand_bot_info_bg_pngAsset;

    public static infostand_furni_place = infostand_furni_place_pngAsset;

    public static infostand_furni_shop = infostand_furni_shop_pngAsset;

    public static inventory_download_icon = inventory_download_icon_pngAsset;

    public static inventory_furni_icon_credits = inventory_furni_icon_credits_pngAsset;

    public static inventory_furni_icon_floor = packagecard_icon_floor_pngAsset;

    public static inventory_furni_icon_landscape = packagecard_icon_landscape_pngAsset;

    public static inventory_furni_icon_wallpaper = packagecard_icon_wallpaper_pngAsset;

    public static inventory_furni_no_recycle_icon = inventory_furni_no_recycle_icon_pngAsset;

    public static inventory_furni_no_trade_icon = inventory_furni_no_trade_icon_pngAsset;

    public static inventory_furni_recycle_icon = inventory_furni_recycle_icon_pngAsset;

    public static inventory_furni_trade_icon = inventory_furni_trade_icon_pngAsset;

    public static inventory_inventory_empty = inventory_inventory_empty_pngAsset;

    public static inventory_inventory_icon = inventory_inventory_icon_pngAsset;

    public static inventory_thumb_bg = thumb_bg_pngAsset;

    public static inventory_thumb_bg_selected = thumb_bg_selected_pngAsset;

    public static inventory_thumb_icon_recycle = inventory_thumb_icon_recycle_pngAsset;

    public static inventory_thumb_rent_ending = inventory_thumb_rent_ending_pngAsset;

    public static inventory_thumb_rent_started = inventory_thumb_rent_started_pngAsset;

    public static inventory_thumb_rent_not_started = inventory_thumb_rent_not_started_pngAsset;

    public static inventory_thumb_selected_outline = inventory_thumb_selected_outline_pngAsset;

    public static inventory_trading_trading_arrow_icon = inventory_trading_trading_arrow_icon_pngAsset;

    public static inventory_trading_trading_locked_icon = inventory_trading_trading_locked_icon_pngAsset;

    public static inventory_trading_trading_unlocked_icon = inventory_trading_trading_unlocked_icon_pngAsset;

    public static inventory_trading_trading_split_icon = inventory_trading_trading_split_icon_pngAsset;

    public static inventory_trading_trading_silver_arrow_left = inventory_trading_trading_silver_arrow_left_pngAsset;

    public static inventory_trading_trading_silver_arrow_right = inventory_trading_trading_silver_arrow_right_pngAsset;

    public static landing_view_avatar_info_background = landing_view_avatar_info_background_pngAsset;

    public static landing_view_needle_meter_needle0 = landing_view_needle_meter_needle0_pngAsset;

    public static landing_view_needle_meter_needle1 = landing_view_needle_meter_needle1_pngAsset;

    public static landing_view_needle_meter_needle10 = landing_view_needle_meter_needle10_pngAsset;

    public static landing_view_needle_meter_needle11 = landing_view_needle_meter_needle11_pngAsset;

    public static landing_view_needle_meter_needle12 = landing_view_needle_meter_needle12_pngAsset;

    public static landing_view_needle_meter_needle13 = landing_view_needle_meter_needle13_pngAsset;

    public static landing_view_needle_meter_needle14 = landing_view_needle_meter_needle14_pngAsset;

    public static landing_view_needle_meter_needle15 = landing_view_needle_meter_needle15_pngAsset;

    public static landing_view_needle_meter_needle16 = landing_view_needle_meter_needle16_pngAsset;

    public static landing_view_needle_meter_needle17 = landing_view_needle_meter_needle17_pngAsset;

    public static landing_view_needle_meter_needle18 = landing_view_needle_meter_needle18_pngAsset;

    public static landing_view_needle_meter_needle19 = landing_view_needle_meter_needle19_pngAsset;

    public static landing_view_needle_meter_needle2 = landing_view_needle_meter_needle2_pngAsset;

    public static landing_view_needle_meter_needle20 = landing_view_needle_meter_needle20_pngAsset;

    public static landing_view_needle_meter_needle21 = landing_view_needle_meter_needle21_pngAsset;

    public static landing_view_needle_meter_needle22 = landing_view_needle_meter_needle22_pngAsset;

    public static landing_view_needle_meter_needle23 = landing_view_needle_meter_needle23_pngAsset;

    public static landing_view_needle_meter_needle3 = landing_view_needle_meter_needle3_pngAsset;

    public static landing_view_needle_meter_needle4 = landing_view_needle_meter_needle4_pngAsset;

    public static landing_view_needle_meter_needle5 = landing_view_needle_meter_needle5_pngAsset;

    public static landing_view_needle_meter_needle6 = landing_view_needle_meter_needle6_pngAsset;

    public static landing_view_needle_meter_needle7 = landing_view_needle_meter_needle7_pngAsset;

    public static landing_view_needle_meter_needle8 = landing_view_needle_meter_needle8_pngAsset;

    public static landing_view_needle_meter_needle9 = landing_view_needle_meter_needle9_pngAsset;

    public static landing_view_reception_horizontal = landing_view_reception_horizontal_pngAsset;

    public static me_menu_me_achv = me_menu_me_achv_pngAsset;

    public static me_menu_me_clothing = me_menu_me_clothing_pngAsset;

    public static me_menu_me_forums = me_menu_me_forums_pngAsset;

    public static me_menu_me_cabinet = me_menu_me_cabinet_pngAsset;

    public static me_menu_me_guide = me_menu_me_guide_pngAsset;

    public static me_menu_me_mail = me_menu_me_mail_pngAsset;

    public static me_menu_me_profile = me_menu_me_profile_pngAsset;

    public static me_menu_me_rooms = me_menu_me_rooms_pngAsset;

    public static me_menu_me_talents = me_menu_me_talents_pngAsset;

    public static prog_menu_daily_tasks = icon_daily_tasks_png_pngAsset;

    public static prog_menu_quests = prog_menu_quests_pngAsset;

    public static prog_menu_leaderboards = prog_menu_leaderboards_pngAsset;

    public static prog_menu_introduction = prog_menu_introduction_pngAsset;

    public static messenger_caution = messenger_caution_pngAsset;

    public static messenger_minimize_button = messenger_minimize_button_pngAsset;

    public static messenger_notification_icon = messenger_notification_icon_pngAsset;

    public static messenger_profile_icon = messenger_profile_icon_pngAsset;

    public static messenger_visit_icon = messenger_visit_icon_pngAsset;

    public static missing_image_icon = close_x_pngAsset;

    public static mysterybox_box_base = mysterybox_box_base_pngAsset;

    public static mysterybox_box_overlay = mysterybox_box_overlay_pngAsset;

    public static mysterybox_box_small = mysterybox_box_small_pngAsset;

    public static mysterybox_key_base = mysterybox_key_base_pngAsset;

    public static mysterybox_key_overlay = mysterybox_key_overlay_pngAsset;

    public static mysterybox_key_small = mysterybox_key_small_pngAsset;

    public static mysterybox_tracker_border = mysterybox_tracker_border_pngAsset;

    public static navigation_icon_weblink = icon_weblink_png_pngAsset;

    public static newnavigator_button_back = newnavigator_button_back_pngAsset;

    public static newnavigator_button_category_collapse = newnavigator_button_category_collapse_pngAsset;

    public static newnavigator_button_category_expand = newnavigator_button_category_expand_pngAsset;

    public static newnavigator_button_category_show_more = newnavigator_button_category_show_more_pngAsset;

    public static newnavigator_button_leftpane_hide = newnavigator_button_leftpane_hide_pngAsset;

    public static newnavigator_button_leftpane_show = newnavigator_button_leftpane_show_pngAsset;

    public static newnavigator_button_quicklink_add = newnavigator_button_quicklink_add_pngAsset;

    public static newnavigator_button_quicklink_remove = newnavigator_button_quicklink_remove_pngAsset;

    public static newnavigator_button_rows = newnavigator_button_rows_pngAsset;

    public static newnavigator_button_show_room_info = newnavigator_button_show_room_info_pngAsset;

    public static newnavigator_button_tiles = newnavigator_button_tiles_pngAsset;

    public static newnavigator_create_room = newnavigator_create_room_pngAsset;

    public static newnavigator_default_room = newnavigator_default_room_pngAsset;

    public static newnavigator_doormode_doorbell_small = doormode_doorbell_small_png_pngAsset;

    public static newnavigator_doormode_invisible_small = doormode_invisible_small_png_pngAsset;

    public static newnavigator_doormode_password_small = doormode_password_small_png_pngAsset;

    public static newnavigator_event_icon = newnavigator_event_icon_pngAsset;

    public static newnavigator_group_base_icon = group_base_icon_png_pngAsset;

    public static newnavigator_icon_fav_no = newnavigator_icon_fav_no_pngAsset;

    public static newnavigator_icon_fav_yes = newnavigator_icon_fav_yes_pngAsset;

    public static newnavigator_icon_group = newnavigator_icon_group_pngAsset;

    public static newnavigator_icon_group_admin = newnavigator_icon_group_admin_pngAsset;

    public static newnavigator_icon_group_owner = newnavigator_icon_group_owner_pngAsset;

    public static newnavigator_icon_home_no = newnavigator_icon_home_no_pngAsset;

    public static newnavigator_icon_home_yes = newnavigator_icon_home_yes_pngAsset;

    public static newnavigator_icon_ql_add = newnavigator_icon_ql_add_pngAsset;

    public static newnavigator_icon_ql_remove = newnavigator_icon_ql_remove_pngAsset;

    public static newnavigator_icon_quicklink_plain = newnavigator_icon_quicklink_plain_pngAsset;

    public static newnavigator_icon_usercount = newnavigator_icon_usercount_pngAsset;

    public static newnavigator_nav_view_mini = newnavigator_nav_view_mini_pngAsset;

    public static newnavigator_nav_view_row = newnavigator_nav_view_row_pngAsset;

    public static newnavigator_nav_view_thumbs = newnavigator_nav_view_thumbs_pngAsset;

    public static newnavigator_promote_room = newnavigator_promote_room_pngAsset;

    public static newnavigator_random_room = newnavigator_random_room_pngAsset;

    public static newnavigator_rating_star_off = newnavigator_rating_star_off_pngAsset;

    public static newnavigator_rating_star_on = newnavigator_rating_star_on_pngAsset;

    public static newnavigator_refresh_search_icon = newnavigator_refresh_search_icon_pngAsset;

    public static newnavigator_report_room = newnavigator_report_room_pngAsset;

    public static newnavigator_room_settings_icon = newnavigator_room_settings_icon_pngAsset;

    public static newnavigator_roominfo_temp = newnavigator_roominfo_temp_pngAsset;

    public static newnavigator_roomusercount_dimmer_black = newnavigator_roomusercount_dimmer_black_pngAsset;

    public static nft_icon_pixel_0 = icon_pixel_0_pngAsset;

    public static nft_icon_24x24 = nft_icon_24x24_pngAsset;

    public static notification_friendonline_circle = notification_friendonline_circle_pngAsset;

    public static notification_friendonline_circle_inner = notification_friendonline_circle_inner_pngAsset;

    public static notification_friendonline_left = notification_friendonline_left_pngAsset;

    public static notification_friendonline_middle = notification_friendonline_middle_pngAsset;

    public static notification_friendonline_right = notification_friendonline_right_pngAsset;

    public static notification_friendonline_slide = notification_friendonline_slide_pngAsset;

    public static poll_poll_prompt_frank = poll_poll_prompt_frank_pngAsset;

    public static poll_poll_prompt_question = poll_poll_prompt_question_pngAsset;

    public static pursearea_credits_icon = pursearea_credits_icon_pngAsset;

    public static pursearea_credits_icon2 = icon_credit_0_pngAsset;

    public static pursearea_diamond_icon = pursearea_diamond_icon_pngAsset;

    public static pursearea_duckets_icon = pursearea_duckets_icon_pngAsset;

    public static pursearea_tiny_emerald_icon = pursearea_tiny_emerald_icon_pngAsset;

    public static pursearea_mid_emerald_icon = pursearea_mid_emerald_icon_pngAsset;

    public static pursearea_tiny_silver_icon = pursearea_tiny_silver_icon_pngAsset;

    public static pursearea_mid_silver_icon = pursearea_mid_silver_icon_pngAsset;

    public static pursearea_hc_icon = pursearea_hc_icon_pngAsset;

    public static pursearea_logout_icon = pursearea_logout_icon_pngAsset;

    public static pursearea_loyalty_icon = pursearea_loyalty_icon_pngAsset;

    public static pursearea_settings_icon = pursearea_settings_icon_pngAsset;

    public static pursearea_unseen_indicator = pursearea_unseen_indicator_pngAsset;

    public static pursearea_vault_icon = pursearea_vault_icon_pngAsset;

    public static pursearea_icon_earnings = pursearea_icon_earnings_pngAsset;

    public static rarity_item_rarity_item_plaque = rarity_item_rarity_item_plaque_pngAsset;

    public static rarity_item_rarity_preview_bg = rarity_item_rarity_preview_bg_pngAsset;

    public static reward_track_checkmark = reward_track_checkmark_pngAsset;

    public static reward_track_available_icon = reward_track_available_icon_pngAsset;

    public static reward_track_frank_and_piccolo = reward_track_frank_and_piccolo_pngAsset;

    public static reward_track_frank_tips = reward_track_frank_tips_pngAsset;

    public static reward_track_free_track = reward_track_free_track_pngAsset;

    public static reward_track_locked_large = reward_track_locked_large_pngAsset;

    public static reward_track_locked_reward = reward_track_locked_reward_pngAsset;

    public static reward_track_locked_small = reward_track_locked_small_pngAsset;

    public static reward_track_not_available_icon = reward_track_not_available_icon_pngAsset;

    public static reward_track_point_large = reward_track_point_large_pngAsset;

    public static reward_track_point_small = reward_track_point_small_pngAsset;

    public static reward_track_premium_track = reward_track_premium_track_pngAsset;

    public static reward_track_prizes_background = reward_track_prizes_background_pngAsset;

    public static reward_track_prizes_background_stars = reward_track_prizes_background_stars_pngAsset;

    public static reward_track_reward_gift = reward_track_reward_gift_pngAsset;

    public static reward_track_reward_gift_premium = reward_track_reward_gift_premium_pngAsset;

    public static reward_track_small_icon = reward_track_small_icon_pngAsset;

    public static reward_track_task_list = reward_track_task_list_pngAsset;

    public static reward_track_task_list_complete = reward_track_task_list_complete_pngAsset;

    public static reward_track_tasks_buy_from_catalogue = reward_track_tasks_buy_from_catalogue_pngAsset;

    public static reward_track_tasks_change_figure = reward_track_tasks_change_figure_pngAsset;

    public static reward_track_tasks_change_motto = reward_track_tasks_change_motto_pngAsset;

    public static reward_track_tasks_chat_with_someone = reward_track_tasks_chat_with_someone_pngAsset;

    public static reward_track_tasks_create_room = reward_track_tasks_create_room_pngAsset;

    public static reward_track_tasks_dance = reward_track_tasks_dance_pngAsset;

    public static reward_track_tasks_enter_other_users_room = reward_track_tasks_enter_other_users_room_pngAsset;

    public static reward_track_tasks_find_hand_item = reward_track_tasks_find_hand_item_pngAsset;

    public static reward_track_tasks_follow_friend = reward_track_tasks_follow_friend_pngAsset;

    public static reward_track_tasks_friend_furni_locked = reward_track_tasks_friend_furni_locked_pngAsset;

    public static reward_track_tasks_give_respect = reward_track_tasks_give_respect_pngAsset;

    public static reward_track_tasks_move_item = reward_track_tasks_move_item_pngAsset;

    public static reward_track_tasks_pet_eat = reward_track_tasks_pet_eat_pngAsset;

    public static reward_track_tasks_pet_level = reward_track_tasks_pet_level_pngAsset;

    public static reward_track_tasks_pet_respect = reward_track_tasks_pet_respect_pngAsset;

    public static reward_track_tasks_place_builders_club_furni = reward_track_tasks_place_builders_club_furni_pngAsset;

    public static reward_track_tasks_place_item = reward_track_tasks_place_item_pngAsset;

    public static reward_track_tasks_publish_picture = reward_track_tasks_publish_picture_pngAsset;

    public static reward_track_tasks_replenish_respect = reward_track_tasks_replenish_respect_pngAsset;

    public static reward_track_tasks_request_friend = reward_track_tasks_request_friend_pngAsset;

    public static reward_track_tasks_rotate_item = reward_track_tasks_rotate_item_pngAsset;

    public static reward_track_tasks_send_messenger_invite = reward_track_tasks_send_messenger_invite_pngAsset;

    public static reward_track_tasks_send_messenger_message = reward_track_tasks_send_messenger_message_pngAsset;

    public static reward_track_tasks_set_relationship_status = reward_track_tasks_set_relationship_status_pngAsset;

    public static reward_track_tasks_switch_item_state = reward_track_tasks_switch_item_state_pngAsset;

    public static reward_track_tasks_swim = reward_track_tasks_swim_pngAsset;

    public static reward_track_tasks_teleport = reward_track_tasks_teleport_pngAsset;

    public static reward_track_tasks_use_habbicon = reward_track_tasks_use_habbicon_pngAsset;

    public static reward_track_tasks_wave = reward_track_tasks_wave_pngAsset;

    public static reward_track_tasks_wear_badge = reward_track_tasks_wear_badge_pngAsset;

    public static relationship_status_bobba = relationship_status_bobba_pngAsset;

    public static relationship_status_heart = relationship_status_heart_pngAsset;

    public static relationship_status_none = relationship_status_none_pngAsset;

    public static relationship_status_smile = relationship_status_smile_pngAsset;

    public static roomtools_achievements = roomtools_achievements_pngAsset;

    public static roomtools_camera = roomtools_camera_pngAsset;

    public static roomtools_chat_history = roomtools_chat_history_pngAsset;

    public static roomtools_gear = roomtools_gear_pngAsset;

    public static roomtools_history_back_bg = roomtools_history_back_bg_pngAsset;

    public static roomtools_history_back_icon = roomtools_history_back_icon_pngAsset;

    public static roomtools_history_forward_bg = roomtools_history_forward_bg_pngAsset;

    public static roomtools_history_forward_icon = roomtools_history_forward_icon_pngAsset;

    public static roomtools_history_open_bg = roomtools_history_open_bg_pngAsset;

    public static roomtools_history_open_icon = roomtools_history_open_icon_pngAsset;

    public static roomtools_like = roomtools_like_pngAsset;

    public static roomtools_magnifier = roomtools_magnifier_pngAsset;

    public static roomtools_minimizebutton = roomtools_minimizebutton_pngAsset;

    public static roomtools_photo_icon = roomtools_photo_icon_pngAsset;

    public static roomtools_unlike = roomtools_unlike_pngAsset;

    public static roomtools_zoom_in = roomtools_zoom_in_pngAsset;

    public static roomtools_zoom_out = roomtools_zoom_out_pngAsset;

    public static talent_achieved_div = talent_achieved_div_pngAsset;

    public static talent_achieved_left = talent_achieved_left_pngAsset;

    public static talent_achieved_mid = talent_achieved_mid_pngAsset;

    public static talent_achieved_right = talent_achieved_right_pngAsset;

    public static talent_action_overlay = talent_action_overlay_pngAsset;

    public static talent_avatar_glow = talent_avatar_glow_pngAsset;

    public static talent_check_mark_circle = talent_check_mark_circle_pngAsset;

    public static talent_citizenship_accomplished = talent_citizenship_accomplished_pngAsset;

    public static talent_helper_icon = compass_color_pngAsset;

    public static talent_locked_achievement = talent_locked_achievement_pngAsset;

    public static talent_locked_stripe = talent_locked_stripe_pngAsset;

    public static talent_mask_left = talent_mask_left_pngAsset;

    public static talent_mask_right = talent_mask_right_pngAsset;

    public static talent_progress_lower = talent_progress_lower_pngAsset;

    public static talent_progress_upper = talent_progress_upper_pngAsset;

    public static talent_register_cutout_character = talent_register_cutout_character_pngAsset;

    public static talent_task_progress_bg = talent_task_progress_bg_pngAsset;

    public static talent_task_progress_fg = talent_task_progress_fg_pngAsset;

    public static talent_task_progress_left = talent_task_progress_left_pngAsset;

    public static talent_task_progress_right = talent_task_progress_right_pngAsset;

    public static talent_unachieved_div = talent_unachieved_div_pngAsset;

    public static talent_unachieved_left = talent_unachieved_left_pngAsset;

    public static talent_unachieved_mid = talent_unachieved_mid_pngAsset;

    public static talent_unachieved_right = talent_unachieved_right_pngAsset;

    public static talent_vip_reward = talent_vip_reward_pngAsset;

    public static toolbar_citizenship_icon = toolbar_citizenship_icon_pngAsset;

    public static toolbar_credit_icon_0 = toolbar_credit_icon_0_pngAsset;

    public static toolbar_credit_icon_1 = toolbar_credit_icon_1_pngAsset;

    public static toolbar_credit_icon_2 = toolbar_credit_icon_2_pngAsset;

    public static toolbar_duckat_icon_0 = toolbar_duckat_icon_0_pngAsset;

    public static toolbar_duckat_icon_1 = toolbar_duckat_icon_1_pngAsset;

    public static toolbar_duckat_icon_2 = toolbar_duckat_icon_2_pngAsset;

    public static toolbar_hc_icon_0 = toolbar_hc_icon_0_pngAsset;

    public static toolbar_hc_icon_1 = toolbar_hc_icon_1_pngAsset;

    public static toolbar_hc_icon_2 = toolbar_hc_icon_2_pngAsset;

    public static toolbar_memenu_achievements_color = achievements_color_pngAsset;

    public static toolbar_memenu_achievements_white = achievements_white_pngAsset;

    public static toolbar_memenu_clothes_color = clothes_highlighter_blue_pngAsset;

    public static toolbar_memenu_clothes_white = clothes_white_pngAsset;

    public static toolbar_memenu_guide_color = lighthouse_color_pngAsset;

    public static toolbar_memenu_guide_white = lighthouse_white_pngAsset;

    public static toolbar_memenu_minimail_color = minimail_color_pngAsset;

    public static toolbar_memenu_minimail_white = minimail_white_pngAsset;

    public static toolbar_memenu_profile_color = profile_color_pngAsset;

    public static toolbar_memenu_profile_white = profile_white_pngAsset;

    public static toolbar_memenu_rooms_color = gohome_color_pngAsset;

    public static toolbar_memenu_rooms_white = gohome_white_pngAsset;

    public static toolbar_memenu_settings_color = settings_color_pngAsset;

    public static toolbar_memenu_settings_slider_base = memenu_settings_slider_base_pngAsset;

    public static toolbar_memenu_settings_slider_button = memenu_settings_slider_button_pngAsset;

    public static toolbar_memenu_settings_sounds_off_color = sounds_off_color_pngAsset;

    public static toolbar_memenu_settings_sounds_off_white = sounds_off_white_pngAsset;

    public static toolbar_memenu_settings_sounds_on_color = sounds_on_color_pngAsset;

    public static toolbar_memenu_settings_sounds_on_white = sounds_on_white_pngAsset;

    public static toolbar_memenu_settings_white = settings_white_pngAsset;

    public static toolbar_memenu_talents_color = compass_color_pngAsset;

    public static toolbar_memenu_talents_white = compass_white_pngAsset;

    public static toolbar_offer_icon_0 = toolbar_offer_icon_0_pngAsset;

    public static toolbar_offer_icon_1 = toolbar_offer_icon_1_pngAsset;

    public static toolbar_offer_icon_2 = toolbar_offer_icon_2_pngAsset;

    public static toolbar_room_icon_0 = toolbar_room_icon_0_pngAsset;

    public static toolbar_room_icon_1 = toolbar_room_icon_1_pngAsset;

    public static toolbar_room_icon_2 = toolbar_room_icon_2_pngAsset;

    public static tools_black_pixel = tools_black_pixel_pngAsset;

    public static tools_file_icon = tools_file_icon_pngAsset;

    public static tools_folder_icon = tools_folder_icon_pngAsset;

    public static tools_tools_download_icon = tools_tools_download_icon_pngAsset;

    public static unique_item_label_1 = unique_item_label_1_pngAsset;

    public static unique_item_label_glass_shine = unique_item_label_glass_shine_pngAsset;

    public static unique_item_label_number_glyphs = unique_item_label_number_glyphs_pngAsset;

    public static unique_item_label_plaque_border = unique_item_label_plaque_border_pngAsset;

    public static unique_item_label_plaque_metal = unique_item_label_plaque_metal_pngAsset;

    public static unique_item_label_studs = unique_item_label_studs_pngAsset;

    public static unique_item_large_background_wide = unique_item_large_background_wide_pngAsset;

    public static unique_item_large_glass_bottom = unique_item_large_glass_bottom_pngAsset;

    public static unique_item_large_glass_mid = unique_item_large_glass_mid_pngAsset;

    public static unique_item_large_glass_shine = unique_item_large_glass_shine_pngAsset;

    public static unique_item_large_glass_top = unique_item_large_glass_top_pngAsset;

    public static unique_item_large_iron = unique_item_large_iron_pngAsset;

    public static unique_item_large_na_button = unique_item_large_na_button_pngAsset;

    public static unique_item_large_na_button_wide = unique_item_large_na_button_wide_pngAsset;

    public static unique_item_large_tile_upright = if_icon_ltd_png_pngAsset;

    public static unique_item_sold_out_label = unique_item_sold_out_label_pngAsset;

    public static unique_item_sold_out_tile = unique_item_sold_out_tile_pngAsset;

    public static vault_earnings_icon_achievements = vault_earnings_icon_achievements_pngAsset;

    public static vault_earnings_icon_bonusbag = vault_earnings_icon_bonusbag_pngAsset;

    public static vault_earnings_icon_chests = vault_earnings_icon_chests_pngAsset;

    public static vault_earnings_icon_games = vault_earnings_icon_games_pngAsset;

    public static vault_earnings_icon_rpgs = vault_earnings_icon_rpgs_pngAsset;

    public static vault_earnings_icon_dailygift = vault_earnings_icon_dailygift_pngAsset;

    public static vault_earnings_icon_donations = vault_earnings_icon_donations_pngAsset;

    public static vault_earnings_icon_hcpayday = vault_earnings_icon_hcpayday_pngAsset;

    public static vault_earnings_icon_levelprogression = vault_earnings_icon_levelprogression_pngAsset;

    public static vault_earnings_icon_marketplace = vault_earnings_icon_marketplace_pngAsset;

    public static vault_earnings_icon_roombundle = vault_earnings_icon_roombundle_pngAsset;

    public static vault_earnings_icon_snowstorm = vault_earnings_icon_snowstorm_pngAsset;

    public static vault_earnings_icon_surprise = vault_earnings_icon_surprise_pngAsset;

    public static vault_earnings_icon_tutorial = vault_earnings_icon_tutorial_pngAsset;

    public static vault_icon_calendar = vault_icon_calendar_pngAsset;

    public static vault_icon_earnings_cards = vault_icon_earnings_cards_pngAsset;

    public static vault_icon_earnings_refresh_ads = vault_icon_earnings_refresh_ads_pngAsset;

    public static vault_icon_earnings_trading_token = vault_icon_earnings_trading_token_pngAsset;

    public static vault_icon_present = vault_icon_present_pngAsset;

    public static vault_icon_vault_closed = vault_icon_vault_closed_pngAsset;

    public static vault_icon_vault_open = vault_icon_vault_open_pngAsset;

    public static vault_icon_vault_opener = vault_icon_vault_opener_pngAsset;

    public static wired_chests_bell_icon = wired_chests_bell_icon_pngAsset;

    public static wired_chests_gear_icon = wired_chests_gear_icon_pngAsset;

    public static wired_chests_icons_payments_game_entrance_icon = wired_chests_icons_payments_game_entrance_icon_pngAsset;

    public static wired_chests_icons_payments_life_icon = wired_chests_icons_payments_life_icon_pngAsset;

    public static wired_chests_icons_payments_tickets_icon = wired_chests_icons_payments_tickets_icon_pngAsset;

    public static wired_chests_images_classic_furni_chest_empty = wired_chests_images_classic_furni_chest_empty_pngAsset;

    public static wired_chests_images_dark_coins_chest_balance_high = wired_chests_images_dark_coins_chest_balance_high_pngAsset;

    public static wired_chests_images_dark_coins_chest_balance_low = wired_chests_images_dark_coins_chest_balance_low_pngAsset;

    public static wired_chests_images_dark_coins_chest_balance_medium = wired_chests_images_dark_coins_chest_balance_medium_pngAsset;

    public static wired_chests_images_dark_coins_chest_balance_zero = wired_chests_images_dark_coins_chest_balance_zero_pngAsset;

    public static wired_chests_images_games_payments = wired_chests_images_games_payments_pngAsset;

    public static wired_chests_images_generic_payments = wired_chests_images_generic_payments_pngAsset;

    public static wired_chests_images_light_coins_chest_balance_high = wired_chests_images_light_coins_chest_balance_high_pngAsset;

    public static wired_chests_images_light_coins_chest_balance_low = wired_chests_images_light_coins_chest_balance_low_pngAsset;

    public static wired_chests_images_light_coins_chest_balance_medium = wired_chests_images_light_coins_chest_balance_medium_pngAsset;

    public static wired_chests_images_light_coins_chest_balance_zero = wired_chests_images_light_coins_chest_balance_zero_pngAsset;

    public static wired_chests_images_variant_furni_chest_empty = wired_chests_images_variant_furni_chest_empty_pngAsset;

    public static wired_add = wired_add_pngAsset;

    public static wired_delay_standard = wired_delay_standard_pngAsset;

    public static wired_delay_precise = wired_delay_precise_pngAsset;

    public static wired_reference = wired_reference_pngAsset;

    public static wired_reduce_image = wired_reduce_image_pngAsset;

    public static wired_enlarge_image = wired_enlarge_image_pngAsset;

    public static wired_message_editor_popout = wired_enlarge_image_pngAsset;

    public static wired_remove = wired_remove_pngAsset;

    public static wired_variablefx_randomize = wired_variablefx_randomize_pngAsset;

    public static wired_volter_uparrow = wired_volter_uparrow_pngAsset;

    public static wired_volter_downarrow = wired_volter_downarrow_pngAsset;

    public static var_picker_all = var_picker_all_pngAsset;

    public static var_picker_internal = var_picker_internal_pngAsset;

    public static var_picker_recent = var_picker_recent_pngAsset;

    public static var_picker_search = var_picker_search_pngAsset;

    public static var_picker_smart = var_picker_smart_pngAsset;

    public static var_picker_usermade = var_picker_usermade_pngAsset;

    public static var_picker_cancel_search = var_picker_cancel_search_pngAsset;

    public static wired_type_icons_icon_action = icon_action_png_pngAsset;

    public static wired_type_icons_icon_addon = icon_addon_png_pngAsset;

    public static wired_type_icons_icon_condition = icon_condition_png_pngAsset;

    public static wired_type_icons_icon_selector = icon_selector_png_pngAsset;

    public static wired_type_icons_icon_trigger = icon_trigger_png_pngAsset;

    public static wired_type_icons_icon_variable = icon_variable_png_pngAsset;

    public static wired_styles_volter_furni_picks_1 = wired_styles_volter_furni_picks_1_pngAsset;

    public static wired_styles_volter_furni_picks_2 = wired_styles_volter_furni_picks_2_pngAsset;

    public static wired_styles_volter_move_0 = move_0_png_pngAsset;

    public static wired_styles_volter_move_1 = move_1_png_pngAsset;

    public static wired_styles_volter_move_2 = move_2_png_pngAsset;

    public static wired_styles_volter_move_3 = move_3_png_pngAsset;

    public static wired_styles_volter_move_4 = move_4_png_pngAsset;

    public static wired_styles_volter_move_5 = move_5_png_pngAsset;

    public static wired_styles_volter_move_6 = move_6_png_pngAsset;

    public static wired_styles_volter_move_7 = move_7_png_pngAsset;

    public static wired_styles_volter_move_diag = move_diag_png_pngAsset;

    public static wired_styles_volter_move_rnd = move_rnd_png_pngAsset;

    public static wired_styles_volter_move_vrt = move_vrt_png_pngAsset;

    public static wired_styles_volter_rotate_ccw = rotate_ccw_png_pngAsset;

    public static wired_styles_volter_rotate_cw = rotate_cw_png_pngAsset;

    public static wired_styles_volter_slider_bg = wired_styles_volter_slider_bg_pngAsset;

    public static wired_styles_volter_slider_obj = slider_obj_png_pngAsset;

    public static wired_styles_illumina_slider_obj = wired_styles_illumina_slider_obj_pngAsset;

    public static wired_styles_illumina_furni_picks_1 = wired_styles_illumina_furni_picks_1_pngAsset;

    public static wired_styles_illumina_furni_picks_2 = wired_styles_illumina_furni_picks_2_pngAsset;

    public static wired_styles_illumina_move_0 = wired_styles_illumina_move_0_pngAsset;

    public static wired_styles_illumina_move_1 = wired_styles_illumina_move_1_pngAsset;

    public static wired_styles_illumina_move_2 = wired_styles_illumina_move_2_pngAsset;

    public static wired_styles_illumina_move_3 = wired_styles_illumina_move_3_pngAsset;

    public static wired_styles_illumina_move_4 = wired_styles_illumina_move_4_pngAsset;

    public static wired_styles_illumina_move_5 = wired_styles_illumina_move_5_pngAsset;

    public static wired_styles_illumina_move_6 = wired_styles_illumina_move_6_pngAsset;

    public static wired_styles_illumina_move_7 = wired_styles_illumina_move_7_pngAsset;

    public static wired_styles_illumina_move_diag = wired_styles_illumina_move_diag_pngAsset;

    public static wired_styles_illumina_move_rnd = wired_styles_illumina_move_rnd_pngAsset;

    public static wired_styles_illumina_move_vrt = wired_styles_illumina_move_vrt_pngAsset;

    public static wired_styles_illumina_rotate_ccw = wired_styles_illumina_rotate_ccw_pngAsset;

    public static wired_styles_illumina_rotate_cw = wired_styles_illumina_rotate_cw_pngAsset;

    public static wired_styles_illumina_icon_source_furni = wired_styles_illumina_icon_source_furni_pngAsset;

    public static wired_styles_illumina_icon_source_users = wired_styles_illumina_icon_source_users_pngAsset;

    public static wired_styles_illumina_icon_source_global = wired_styles_illumina_icon_source_global_pngAsset;

    public static wired_styles_illumina_icon_source_context = wired_styles_illumina_icon_source_context_pngAsset;

    public static word_quiz_thum_down = word_quiz_thum_down_pngAsset;

    public static word_quiz_thum_down_big = word_quiz_thum_down_big_pngAsset;

    public static word_quiz_thum_up = word_quiz_thum_up_pngAsset;

    public static word_quiz_thum_up_big = word_quiz_thum_up_big_pngAsset;

    public static avatar_image_xml = HabboWindowManagerCom_avatar_image_xml_binAsset;

    public static badge_image_xml = badge_image_xml_binAsset;

    public static balloon_xml = balloon_xml_binAsset;

    public static clock_base_xml = clock_base_xml_binAsset;

    public static hover_bitmap_xml = hover_bitmap_xml_binAsset;

    public static illumina_border_xml = illumina_border_xml_binAsset;

    public static illumina_chat_bubble_xml = illumina_chat_bubble_xml_binAsset;

    public static illumina_input_xml = illumina_input_xml_binAsset;

    public static product_icon_xml = product_icon_xml_binAsset;

    public static product_image_xml = product_image_xml_binAsset;

    public static updating_timestamp_xml = updating_timestamp_xml_binAsset;

    public static progress_indicator_xml = progress_indicator_xml_binAsset;

    public static separator_xml = separator_xml_binAsset;

    public static running_number_xml = running_number_xml_binAsset;

    public static pet_image_xml = pet_image_xml_binAsset;

    public static furniture_image_xml = furniture_image_xml_binAsset;

    public static room_previewer_xml = room_previewer_xml_binAsset;

    public static pixel_limit_xml = pixel_limit_xml_binAsset;

    public static room_usercount_xml = room_usercount_xml_binAsset;

    public static room_thumbnail_xml = room_thumbnail_xml_binAsset;

    public static illumina_chat_bubble_text_xml = illumina_chat_bubble_text_xml_binAsset;

    public static unique_item_overlay_griditem_xml = unique_item_overlay_griditem_xml_binAsset;

    public static unique_item_overlay_supply_xml = unique_item_overlay_supply_xml_binAsset;

    public static unique_item_overlay_preview_xml = unique_item_overlay_preview_xml_binAsset;

    public static rarity_item_overlay_griditem_xml = rarity_item_overlay_griditem_xml_binAsset;

    public static rarity_item_overlay_preview_xml = rarity_item_overlay_preview_xml_binAsset;

    public static table_view_xml = table_view_xml_binAsset;

    public static chest_overlay_griditem_xml = chest_overlay_griditem_xml_binAsset;

    public static icon_wired_variable_user_large_png = icon_wired_variable_user_large_png_pngAsset;

    public static icon_wired_variable_context_large_png = icon_wired_variable_context_large_png_pngAsset;

    public static icon_wired_variable_global_large_png = icon_wired_variable_global_large_png_pngAsset;

    public static icon_wired_variable_furni_large_png = icon_wired_variable_furni_large_png_pngAsset;

    public static icon_wired_error_png = icon_wired_error_png_pngAsset;

    public static icon_wired_notification_png = icon_wired_notification_png_pngAsset;

    public static icon_wired_warning_png = icon_wired_warning_png_pngAsset;

    public static icon_discord_png = icon_discord_png_pngAsset;

    public static wired_box_lines_png = wired_box_lines_png_pngAsset;

    public static wired_global_placeholder_png = wired_global_placeholder_png_pngAsset;

    public static wired_monitor_element1_png = wired_monitor_element1_png_pngAsset;

    public static wired_monitor_element2_png = wired_monitor_element2_png_pngAsset;

    public static wired_misc_directional_system_0_png = wired_misc_directional_system_0_png_pngAsset;

    public static wired_misc_directional_system_1_png = wired_misc_directional_system_1_png_pngAsset;

    public static wired_misc_directional_system_2_png = wired_misc_directional_system_2_png_pngAsset;

    public static wired_misc_directional_system_3_png = wired_misc_directional_system_3_png_pngAsset;

    public static recycler_furnimatic_indicator_pointer_base = recycler_furnimatic_indicator_pointer_base_pngAsset;

    public static recycler_furnimatic_indicator_pointer_arrow = recycler_furnimatic_indicator_pointer_arrow_pngAsset;

    public static recycler_furnimatic_indicator = recycler_furnimatic_indicator_pngAsset;

    public static recycler_furnimatic_container_right = recycler_furnimatic_container_right_pngAsset;

    public static recycler_furnimatic_container_slice = recycler_furnimatic_container_slice_pngAsset;

    public static recycler_furnimatic_container_left = recycler_furnimatic_container_left_pngAsset;

    public static recycler_furnimatic_machine = recycler_furnimatic_machine_pngAsset;

    public static recycler_furnimatic_title = recycler_furnimatic_title_pngAsset;

    public static recycler_recycler_icon = recycler_recycler_icon_pngAsset;

    public static special_items_item_platform = special_items_item_platform_pngAsset;

    public static special_items_spotlight1 = special_items_spotlight1_pngAsset;

    public static special_items_spotlight2 = special_items_spotlight2_pngAsset;

    public static badge_rarity_badges_emblem = prog_menu_leaderboards_pngAsset;

    public static badge_rarity_badges_emblem_uncommon = badge_rarity_badges_emblem_uncommon_pngAsset;

    public static badge_rarity_badges_emblem_uncommon_extended = badge_rarity_badges_emblem_uncommon_extended_pngAsset;

    public static badge_rarity_badges_emblem_rare = badge_rarity_badges_emblem_rare_pngAsset;

    public static badge_rarity_badges_emblem_rare_extended = badge_rarity_badges_emblem_rare_extended_pngAsset;

    public static badge_rarity_badges_emblem_very_rare = badge_rarity_badges_emblem_very_rare_pngAsset;

    public static badge_rarity_badges_emblem_very_rare_extended = badge_rarity_badges_emblem_very_rare_extended_pngAsset;

    public static badge_rarity_badges_emblem_mythical = badge_rarity_badges_emblem_mythical_pngAsset;

    public static badge_rarity_badges_emblem_mythical_extended = badge_rarity_badges_emblem_mythical_extended_pngAsset;

    public static badge_rarity_badges_emblem_legendary = badge_rarity_badges_emblem_legendary_pngAsset;

    public static badge_rarity_badges_emblem_legendary_extended = badge_rarity_badges_emblem_legendary_extended_pngAsset;

    public static badge_rarity_badges_emblem_unique = badge_rarity_badges_emblem_unique_pngAsset;

    public static badge_rarity_badges_emblem_unique_extended = badge_rarity_badges_emblem_unique_extended_pngAsset;

    public static badges_emblem_achievement = badges_emblem_achievement_pngAsset;

    public static badges_emblem_achievement_extended = badges_emblem_achievement_extended_pngAsset;

    public static badge_leaderboard_entry_even = badge_leaderboard_entry_even_pngAsset;

    public static badge_leaderboard_entry_self = badge_leaderboard_entry_self_pngAsset;

    public static badge_leaderboard_entry_uneven = badge_leaderboard_entry_uneven_pngAsset;

    public static badge_leaderboard_header = badge_leaderboard_header_pngAsset;

    public static badge_leaderboard_dropdown_opener = badge_leaderboard_dropdown_opener_pngAsset;

    public static star_small_grey = star_small_grey_pngAsset;

    public static star_small_green = star_small_green_pngAsset;

    public static star_small_pink = star_small_pink_pngAsset;

    public static star_small_diamond = star_small_diamond_pngAsset;

    public static star_small_ruby = star_small_ruby_pngAsset;

    public static star_small_gold = star_small_gold_pngAsset;

    public static star_small_silver = star_small_silver_pngAsset;

    public static star_small_bronze = star_small_bronze_pngAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboWindowManagerCom.#staticsReady) return;
        HabboWindowManagerCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboWindowManagerCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboWindowManagerComponentBootstrap, IIDHabboWindowManager, IIDCoreWindowManager, HabboWindowManagerComponent, ICoreLocalizationFrameworkLib, ICoreWindowFrameworkLib, CoreWindowFrameworkLib]);
    }
}
