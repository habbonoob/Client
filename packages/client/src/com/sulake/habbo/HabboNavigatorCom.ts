import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboNavigatorBootstrap } from '@/com/sulake/bootstrap/HabboNavigatorBootstrap';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboNavigatorCom_manifest_binAsset = embedBytes("navigator/HabboNavigatorCom_manifest.bin");
const arrow_down_white_png_pngAsset = embedBitmap("shared/arrow_down_white_png.png");
const arrow_right_white_png_pngAsset = embedBitmap("shared/arrow_right_white_png.png");
const create_room_png_pngAsset = embedBitmap("navigator/create_room_png.png");
const doormode_doorbell_png_pngAsset = embedBitmap("navigator/doormode_doorbell_png.png");
const doormode_doorbell_small_png_pngAsset = embedBitmap("shared/doormode_doorbell_small_png.png");
const doormode_password_png_pngAsset = embedBitmap("navigator/doormode_password_png.png");
const doormode_password_small_png_pngAsset = embedBitmap("shared/doormode_password_small_png.png");
const doormode_invisible_png_pngAsset = embedBitmap("navigator/doormode_invisible_png.png");
const doormode_invisible_small_png_pngAsset = embedBitmap("shared/doormode_invisible_small_png.png");
const enter_room_png_pngAsset = embedBitmap("navigator/enter_room_png.png");
const enter_room_l_png_pngAsset = embedBitmap("navigator/enter_room_l_png.png");
const enter_room_m_png_pngAsset = embedBitmap("navigator/enter_room_m_png.png");
const enter_room_r_png_pngAsset = embedBitmap("navigator/enter_room_r_png.png");
const enter_room_a_png_pngAsset = embedBitmap("navigator/enter_room_a_png.png");
const favourite_png_pngAsset = embedBitmap("shared/favourite_png.png");
const facebook_logo_small_png_pngAsset = embedBitmap("navigator/facebook_logo_small_png.png");
const group_base_icon_png_pngAsset = embedBitmap("shared/group_base_icon_png.png");
const make_favourite_png_pngAsset = embedBitmap("shared/make_favourite_png.png");
const home_png_pngAsset = embedBitmap("navigator/home_png.png");
const make_home_png_pngAsset = embedBitmap("navigator/make_home_png.png");
const icon_weblink_png_pngAsset = embedBitmap("shared/icon_weblink_png.png");
const icon_hotelview_png_pngAsset = embedBitmap("navigator/icon_hotelview_png.png");
const icon_hotelview_reactive_png_pngAsset = embedBitmap("navigator/icon_hotelview_reactive_png.png");
const navi_room_favourite_png_pngAsset = embedBitmap("navigator/navi_room_favourite_png.png");
const navi_room_friends_png_pngAsset = embedBitmap("navigator/navi_room_friends_png.png");
const navi_room_icon_png_pngAsset = embedBitmap("navigator/navi_room_icon_png.png");
const navi_room_official_png_pngAsset = embedBitmap("navigator/navi_room_official_png.png");
const navi_room_own_png_pngAsset = embedBitmap("navigator/navi_room_own_png.png");
const navi_room_popular_png_pngAsset = embedBitmap("navigator/navi_room_popular_png.png");
const navi_tag_hot_1_png_pngAsset = embedBitmap("navigator/navi_tag_hot_1_png.png");
const navi_tag_hot_2_png_pngAsset = embedBitmap("navigator/navi_tag_hot_2_png.png");
const navi_tag_hot_3_png_pngAsset = embedBitmap("navigator/navi_tag_hot_3_png.png");
const popup_arrow_down_png_pngAsset = embedBitmap("navigator/popup_arrow_down_png.png");
const popup_arrow_left_png_pngAsset = embedBitmap("shared/popup_arrow_left_png.png");
const popup_arrow_right_png_pngAsset = embedBitmap("shared/popup_arrow_right_png.png");
const trading_allowed_png_pngAsset = embedBitmap("navigator/trading_allowed_png.png");
const rico_rnd_m_png_pngAsset = embedBitmap("navigator/rico_rnd_m_png.png");
const rico_rnd_l_png_pngAsset = embedBitmap("navigator/rico_rnd_l_png.png");
const rico_rnd_l_b_png_pngAsset = embedBitmap("navigator/rico_rnd_l_b_png.png");
const rico_rnd_r_png_pngAsset = embedBitmap("navigator/rico_rnd_r_png.png");
const rico_rnd_r_b_png_pngAsset = embedBitmap("navigator/rico_rnd_r_b_png.png");
const select_arrow_png_pngAsset = embedBitmap("navigator/select_arrow_png.png");
const tag_l_png_pngAsset = embedBitmap("navigator/tag_l_png.png");
const tag_m_png_pngAsset = embedBitmap("navigator/tag_m_png.png");
const tag_r_png_pngAsset = embedBitmap("navigator/tag_r_png.png");
const tag_l_reactive_png_pngAsset = embedBitmap("navigator/tag_l_reactive_png.png");
const tag_m_reactive_png_pngAsset = embedBitmap("navigator/tag_m_reactive_png.png");
const tag_r_reactive_png_pngAsset = embedBitmap("navigator/tag_r_reactive_png.png");
const thumb_up_png_pngAsset = embedBitmap("navigator/thumb_up_png.png");
const tile_icon_black_png_pngAsset = embedBitmap("navigator/tile_icon_black_png.png");
const tile_icon_white_png_pngAsset = embedBitmap("navigator/tile_icon_white_png.png");
const usercount_fixed_b_png_pngAsset = embedBitmap("navigator/usercount_fixed_b_png.png");
const usercount_fixed_g_png_pngAsset = embedBitmap("navigator/usercount_fixed_g_png.png");
const usercount_fixed_o_png_pngAsset = embedBitmap("navigator/usercount_fixed_o_png.png");
const usercount_fixed_r_png_pngAsset = embedBitmap("navigator/usercount_fixed_r_png.png");
const usercount_fixed_y_png_pngAsset = embedBitmap("navigator/usercount_fixed_y_png.png");
const remove_rights_png_pngAsset = embedBitmap("navigator/remove_rights_png.png");
const grs_front_page_search_big_xml_binAsset = embedBytes("navigator/grs_front_page_search_big_xml.bin");
const grs_front_page_search_small_xml_binAsset = embedBytes("navigator/grs_front_page_search_small_xml.bin");
const grs_guest_room_details_short_xml_binAsset = embedBytes("navigator/grs_guest_room_details_short_xml.bin");
const grs_guest_room_details_phase_one_xml_binAsset = embedBytes("navigator/grs_guest_room_details_phase_one_xml.bin");
const grs_guest_room_details_long_xml_binAsset = embedBytes("navigator/grs_guest_room_details_long_xml.bin");
const grs_guest_room_thumbnail_xml_binAsset = embedBytes("navigator/grs_guest_room_thumbnail_xml.bin");
const grs_room_ads_details_short_xml_binAsset = embedBytes("navigator/grs_room_ads_details_short_xml.bin");
const grs_room_ads_details_phase_one_xml_binAsset = embedBytes("navigator/grs_room_ads_details_phase_one_xml.bin");
const grs_hot_room_details_xml_binAsset = embedBytes("navigator/grs_hot_room_details_xml.bin");
const grs_main_window_xml_binAsset = embedBytes("navigator/grs_main_window_xml.bin");
const grs_main_window_new_xml_binAsset = embedBytes("navigator/grs_main_window_new_xml.bin");
const grs_official_room_row_xml_binAsset = embedBytes("navigator/grs_official_room_row_xml.bin");
const grs_official_room_row_phase_one_xml_binAsset = embedBytes("navigator/grs_official_room_row_phase_one_xml.bin");
const grs_popular_tag_row_xml_binAsset = embedBytes("navigator/grs_popular_tag_row_xml.bin");
const grs_promoted_room_category_xml_binAsset = embedBytes("navigator/grs_promoted_room_category_xml.bin");
const grs_category_selector_xml_binAsset = embedBytes("navigator/grs_category_selector_xml.bin");
const grs_usercount_xml_binAsset = embedBytes("navigator/grs_usercount_xml.bin");
const nav_error_popup_xml_binAsset = embedBytes("navigator/nav_error_popup_xml.bin");
const nav_simple_alert_xml_binAsset = embedBytes("navigator/nav_simple_alert_xml.bin");
const nav_promo_alert_xml_binAsset = embedBytes("navigator/nav_promo_alert_xml.bin");
const iro_event_settings_xml_binAsset = embedBytes("navigator/iro_event_settings_xml.bin");
const iro_event_info_xml_binAsset = embedBytes("navigator/iro_event_info_xml.bin");
const iro_room_details_framed_xml_binAsset = embedBytes("navigator/iro_room_details_framed_xml.bin");
const iro_room_filter_framed_xml_binAsset = embedBytes("navigator/iro_room_filter_framed_xml.bin");
const iro_tag_xml_binAsset = embedBytes("navigator/iro_tag_xml.bin");
const roc_create_room_xml_binAsset = embedBytes("navigator/roc_create_room_xml.bin");
const roc_vip_promo_xml_binAsset = embedBytes("navigator/roc_vip_promo_xml.bin");
const roc_room_thumbnail_xml_binAsset = embedBytes("navigator/roc_room_thumbnail_xml.bin");
const ros_flat_controller_xml_binAsset = embedBytes("navigator/ros_flat_controller_xml.bin");
const ros_banned_user_xml_binAsset = embedBytes("navigator/ros_banned_user_xml.bin");
const ros_friend_xml_binAsset = embedBytes("navigator/ros_friend_xml.bin");
const ros_badword_xml_binAsset = embedBytes("navigator/ros_badword_xml.bin");
const ros_room_settings_xml_binAsset = embedBytes("navigator/ros_room_settings_xml.bin");
const ros_confirm_xml_binAsset = embedBytes("navigator/ros_confirm_xml.bin");
const password_input_xml_binAsset = embedBytes("navigator/password_input_xml.bin");
const doorbell_xml_binAsset = embedBytes("navigator/doorbell_xml.bin");
const guild_info_xml_binAsset = embedBytes("navigator/guild_info_xml.bin");
const toolbar_hover_xml_binAsset = embedBytes("navigator/toolbar_hover_xml.bin");
const enforce_category_xml_binAsset = embedBytes("navigator/enforce_category_xml.bin");

export class HabboNavigatorCom extends SimpleApplication {
    static { registerClassName(this, 'HabboNavigatorCom'); }

    static #staticsReady = false;

    public static manifest = HabboNavigatorCom_manifest_binAsset;

    public static arrow_down_white_png = arrow_down_white_png_pngAsset;

    public static arrow_right_white_png = arrow_right_white_png_pngAsset;

    public static create_room_png = create_room_png_pngAsset;

    public static doormode_doorbell_png = doormode_doorbell_png_pngAsset;

    public static doormode_doorbell_small_png = doormode_doorbell_small_png_pngAsset;

    public static doormode_password_png = doormode_password_png_pngAsset;

    public static doormode_password_small_png = doormode_password_small_png_pngAsset;

    public static doormode_invisible_png = doormode_invisible_png_pngAsset;

    public static doormode_invisible_small_png = doormode_invisible_small_png_pngAsset;

    public static enter_room_png = enter_room_png_pngAsset;

    public static enter_room_l_png = enter_room_l_png_pngAsset;

    public static enter_room_m_png = enter_room_m_png_pngAsset;

    public static enter_room_r_png = enter_room_r_png_pngAsset;

    public static enter_room_a_png = enter_room_a_png_pngAsset;

    public static favourite_png = favourite_png_pngAsset;

    public static facebook_logo_small_png = facebook_logo_small_png_pngAsset;

    public static group_base_icon_png = group_base_icon_png_pngAsset;

    public static make_favourite_png = make_favourite_png_pngAsset;

    public static home_png = home_png_pngAsset;

    public static make_home_png = make_home_png_pngAsset;

    public static icon_weblink_png = icon_weblink_png_pngAsset;

    public static icon_hotelview_png = icon_hotelview_png_pngAsset;

    public static icon_hotelview_reactive_png = icon_hotelview_reactive_png_pngAsset;

    public static navi_room_favourite_png = navi_room_favourite_png_pngAsset;

    public static navi_room_friends_png = navi_room_friends_png_pngAsset;

    public static navi_room_icon_png = navi_room_icon_png_pngAsset;

    public static navi_room_official_png = navi_room_official_png_pngAsset;

    public static navi_room_own_png = navi_room_own_png_pngAsset;

    public static navi_room_popular_png = navi_room_popular_png_pngAsset;

    public static navi_tag_hot_1_png = navi_tag_hot_1_png_pngAsset;

    public static navi_tag_hot_2_png = navi_tag_hot_2_png_pngAsset;

    public static navi_tag_hot_3_png = navi_tag_hot_3_png_pngAsset;

    public static popup_arrow_down_png = popup_arrow_down_png_pngAsset;

    public static popup_arrow_left_png = popup_arrow_left_png_pngAsset;

    public static popup_arrow_right_png = popup_arrow_right_png_pngAsset;

    public static trading_allowed_png = trading_allowed_png_pngAsset;

    public static rico_rnd_m_png = rico_rnd_m_png_pngAsset;

    public static rico_rnd_l_png = rico_rnd_l_png_pngAsset;

    public static rico_rnd_l_b_png = rico_rnd_l_b_png_pngAsset;

    public static rico_rnd_r_png = rico_rnd_r_png_pngAsset;

    public static rico_rnd_r_b_png = rico_rnd_r_b_png_pngAsset;

    public static select_arrow_png = select_arrow_png_pngAsset;

    public static tag_l_png = tag_l_png_pngAsset;

    public static tag_m_png = tag_m_png_pngAsset;

    public static tag_r_png = tag_r_png_pngAsset;

    public static tag_l_reactive_png = tag_l_reactive_png_pngAsset;

    public static tag_m_reactive_png = tag_m_reactive_png_pngAsset;

    public static tag_r_reactive_png = tag_r_reactive_png_pngAsset;

    public static thumb_up_png = thumb_up_png_pngAsset;

    public static tile_icon_black_png = tile_icon_black_png_pngAsset;

    public static tile_icon_white_png = tile_icon_white_png_pngAsset;

    public static usercount_fixed_b_png = usercount_fixed_b_png_pngAsset;

    public static usercount_fixed_g_png = usercount_fixed_g_png_pngAsset;

    public static usercount_fixed_o_png = usercount_fixed_o_png_pngAsset;

    public static usercount_fixed_r_png = usercount_fixed_r_png_pngAsset;

    public static usercount_fixed_y_png = usercount_fixed_y_png_pngAsset;

    public static remove_rights_png = remove_rights_png_pngAsset;

    public static grs_front_page_search_big_xml = grs_front_page_search_big_xml_binAsset;

    public static grs_front_page_search_small_xml = grs_front_page_search_small_xml_binAsset;

    public static grs_guest_room_details_short_xml = grs_guest_room_details_short_xml_binAsset;

    public static grs_guest_room_details_phase_one_xml = grs_guest_room_details_phase_one_xml_binAsset;

    public static grs_guest_room_details_long_xml = grs_guest_room_details_long_xml_binAsset;

    public static grs_guest_room_thumbnail_xml = grs_guest_room_thumbnail_xml_binAsset;

    public static grs_room_ads_details_short_xml = grs_room_ads_details_short_xml_binAsset;

    public static grs_room_ads_details_phase_one_xml = grs_room_ads_details_phase_one_xml_binAsset;

    public static grs_hot_room_details_xml = grs_hot_room_details_xml_binAsset;

    public static grs_main_window_xml = grs_main_window_xml_binAsset;

    public static grs_main_window_new_xml = grs_main_window_new_xml_binAsset;

    public static grs_official_room_row_xml = grs_official_room_row_xml_binAsset;

    public static grs_official_room_row_phase_one_xml = grs_official_room_row_phase_one_xml_binAsset;

    public static grs_popular_tag_row_xml = grs_popular_tag_row_xml_binAsset;

    public static grs_promoted_room_category_xml = grs_promoted_room_category_xml_binAsset;

    public static grs_category_selector_xml = grs_category_selector_xml_binAsset;

    public static grs_usercount_xml = grs_usercount_xml_binAsset;

    public static nav_error_popup_xml = nav_error_popup_xml_binAsset;

    public static nav_simple_alert_xml = nav_simple_alert_xml_binAsset;

    public static nav_promo_alert_xml = nav_promo_alert_xml_binAsset;

    public static iro_event_settings_xml = iro_event_settings_xml_binAsset;

    public static iro_event_info_xml = iro_event_info_xml_binAsset;

    public static iro_room_details_framed_xml = iro_room_details_framed_xml_binAsset;

    public static iro_room_filter_framed_xml = iro_room_filter_framed_xml_binAsset;

    public static iro_tag_xml = iro_tag_xml_binAsset;

    public static roc_create_room_xml = roc_create_room_xml_binAsset;

    public static roc_vip_promo_xml = roc_vip_promo_xml_binAsset;

    public static roc_room_thumbnail_xml = roc_room_thumbnail_xml_binAsset;

    public static ros_flat_controller_xml = ros_flat_controller_xml_binAsset;

    public static ros_banned_user_xml = ros_banned_user_xml_binAsset;

    public static ros_friend_xml = ros_friend_xml_binAsset;

    public static ros_badword_xml = ros_badword_xml_binAsset;

    public static ros_room_settings_xml = ros_room_settings_xml_binAsset;

    public static ros_confirm_xml = ros_confirm_xml_binAsset;

    public static password_input_xml = password_input_xml_binAsset;

    public static doorbell_xml = doorbell_xml_binAsset;

    public static guild_info_xml = guild_info_xml_binAsset;

    public static toolbar_hover_xml = toolbar_hover_xml_binAsset;

    public static enforce_category_xml = enforce_category_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboNavigatorCom.#initStatics();
        return HabboNavigatorCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboNavigatorCom.#initStatics();
        HabboNavigatorCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboNavigatorCom.#staticsReady) return;
        HabboNavigatorCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboNavigatorCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboNavigatorBootstrap, IIDHabboNavigator]);
    }
}
