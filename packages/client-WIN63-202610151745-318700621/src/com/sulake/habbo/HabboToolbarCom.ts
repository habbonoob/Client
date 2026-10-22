import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboToolbarBootstrap } from '@/com/sulake/bootstrap/HabboToolbarBootstrap';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboToolbarCom_manifest_binAsset = embedBytes("toolbar/HabboToolbarCom_manifest.bin");
const toolbar_view_xml_binAsset = embedBytes("toolbar/toolbar_view_xml.bin");
const bottom_bar_left_xml_binAsset = embedBytes("toolbar/bottom_bar_left_xml.bin");
const bottom_background_border_xml_binAsset = embedBytes("toolbar/bottom_background_border_xml.bin");
const me_menu_view_xml_binAsset = embedBytes("toolbar/me_menu_view_xml.bin");
const me_menu_new_view_xml_binAsset = embedBytes("toolbar/me_menu_new_view_xml.bin");
const me_menu_settings_menu_xml_binAsset = embedBytes("toolbar/me_menu_settings_menu_xml.bin");
const me_menu_sound_settings_xml_binAsset = embedBytes("toolbar/me_menu_sound_settings_xml.bin");
const me_menu_other_settings_xml_binAsset = embedBytes("toolbar/me_menu_other_settings_xml.bin");
const toolbar_chat_settings_xml_binAsset = embedBytes("toolbar/toolbar_chat_settings_xml.bin");
const new_items_label_xml_binAsset = embedBytes("toolbar/new_items_label_xml.bin");
const prog_menu_view_xml_binAsset = embedBytes("toolbar/prog_menu_view_xml.bin");
const custom_word_filter_settings_xml_binAsset = embedBytes("toolbar/custom_word_filter_settings_xml.bin");
const custom_word_filter_item_xml_binAsset = embedBytes("toolbar/custom_word_filter_item_xml.bin");
const campaign_calendar_xml_binAsset = embedBytes("toolbar/campaign_calendar_xml.bin");
const logout_xml_binAsset = embedBytes("toolbar/logout_xml.bin");
const logout_confirmation_xml_binAsset = embedBytes("toolbar/logout_confirmation_xml.bin");
const roomtools_xml_binAsset = embedBytes("toolbar/roomtools_xml.bin");
const roominfo_icon_pngAsset = embedBitmap("toolbar/roominfo_icon.png");
const promo_duckets_xml_binAsset = embedBytes("toolbar/promo_duckets_xml.bin");
const purse_xml_binAsset = embedBytes("toolbar/purse_xml.bin");
const settings_xml_binAsset = embedBytes("toolbar/settings_xml.bin");
const setting_category_xml_binAsset = embedBytes("toolbar/setting_category_xml.bin");
const purse_indicator_credits_xml_binAsset = embedBytes("toolbar/purse_indicator_credits_xml.bin");
const purse_indicator_pixels_xml_binAsset = embedBytes("toolbar/purse_indicator_pixels_xml.bin");
const purse_indicator_seasonal_xml_binAsset = embedBytes("toolbar/purse_indicator_seasonal_xml.bin");
const club_discount_promotion_xml_binAsset = embedBytes("toolbar/club_discount_promotion_xml.bin");
const extend_hilite_png_pngAsset = embedBitmap("toolbar/extend_hilite_png.png");
const icon_credit_0_pngAsset = embedBitmap("shared/icon_credit_0.png");
const icon_credit_1_pngAsset = embedBitmap("shared/icon_credit_1.png");
const icon_credit_2_pngAsset = embedBitmap("shared/icon_credit_2.png");
const icon_credit_3_pngAsset = embedBitmap("shared/icon_credit_3.png");
const icon_credit_4_pngAsset = embedBitmap("shared/icon_credit_4.png");
const icon_credit_5_pngAsset = embedBitmap("shared/icon_credit_5.png");
const icon_credit_6_pngAsset = embedBitmap("shared/icon_credit_6.png");
const icon_pixel_0_pngAsset = embedBitmap("shared/icon_pixel_0.png");
const icon_pixel_1_png_pngAsset = embedBitmap("toolbar/icon_pixel_1_png.png");
const icon_pixel_2_png_pngAsset = embedBitmap("toolbar/icon_pixel_2_png.png");
const icon_pixel_3_png_pngAsset = embedBitmap("toolbar/icon_pixel_3_png.png");
const extension_grid_xml_binAsset = embedBytes("toolbar/extension_grid_xml.bin");
const purse_indicator_club_xml_binAsset = embedBytes("toolbar/purse_indicator_club_xml.bin");
const video_offer_promotion_xml_binAsset = embedBytes("toolbar/video_offer_promotion_xml.bin");
const offer_icon_png_pngAsset = embedBitmap("toolbar/offer_icon_png.png");
const vip_discount_promotion_v2_xml_binAsset = embedBytes("toolbar/vip_discount_promotion_v2_xml.bin");
const vip_quests_promo_xml_binAsset = embedBytes("toolbar/vip_quests_promo_xml.bin");
const offer_extension_xml_binAsset = embedBytes("toolbar/offer_extension_xml.bin");
const phonenumber_collect_xml_binAsset = embedBytes("toolbar/phonenumber_collect_xml.bin");
const phonenumber_verify_xml_binAsset = embedBytes("toolbar/phonenumber_verify_xml.bin");
const phonenumber_collect_minimized_xml_binAsset = embedBytes("toolbar/phonenumber_collect_minimized_xml.bin");
const phonenumber_verify_minimized_xml_binAsset = embedBytes("toolbar/phonenumber_verify_minimized_xml.bin");
const phonenumber_country_menu_item_xml_binAsset = embedBytes("toolbar/phonenumber_country_menu_item_xml.bin");
const returnusergifting_miniview_xml_binAsset = embedBytes("toolbar/returnusergifting_miniview_xml.bin");
const nux_offer_old_user_xml_binAsset = embedBytes("toolbar/nux_offer_old_user_xml.bin");
const nux_gift_selection_xml_binAsset = embedBytes("toolbar/nux_gift_selection_xml.bin");
const nux_noob_room_offer_xml_binAsset = embedBytes("toolbar/nux_noob_room_offer_xml.bin");

export class HabboToolbarCom extends SimpleApplication {
    static { registerClassName(this, 'HabboToolbarCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboToolbarCom.#initStatics();
        return HabboToolbarCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboToolbarCom.#initStatics();
        HabboToolbarCom.requiredClasses = value;
    }

    public static manifest = HabboToolbarCom_manifest_binAsset;

    public static toolbar_view_xml = toolbar_view_xml_binAsset;

    public static bottom_bar_left_xml = bottom_bar_left_xml_binAsset;

    public static bottom_background_border_xml = bottom_background_border_xml_binAsset;

    public static me_menu_view_xml = me_menu_view_xml_binAsset;

    public static me_menu_new_view_xml = me_menu_new_view_xml_binAsset;

    public static me_menu_settings_menu_xml = me_menu_settings_menu_xml_binAsset;

    public static me_menu_sound_settings_xml = me_menu_sound_settings_xml_binAsset;

    public static me_menu_other_settings_xml = me_menu_other_settings_xml_binAsset;

    public static toolbar_chat_settings_xml = toolbar_chat_settings_xml_binAsset;

    public static new_items_label_xml = new_items_label_xml_binAsset;

    public static prog_menu_view_xml = prog_menu_view_xml_binAsset;

    public static custom_word_filter_settings_xml = custom_word_filter_settings_xml_binAsset;

    public static custom_word_filter_item_xml = custom_word_filter_item_xml_binAsset;

    public static campaign_calendar_xml = campaign_calendar_xml_binAsset;

    public static logout_xml = logout_xml_binAsset;

    public static logout_confirmation_xml = logout_confirmation_xml_binAsset;

    public static roomtools_xml = roomtools_xml_binAsset;

    public static roominfo_icon = roominfo_icon_pngAsset;

    public static promo_duckets_xml = promo_duckets_xml_binAsset;

    public static purse_xml = purse_xml_binAsset;

    public static settings_xml = settings_xml_binAsset;

    public static setting_category_xml = setting_category_xml_binAsset;

    public static purse_indicator_credits_xml = purse_indicator_credits_xml_binAsset;

    public static purse_indicator_pixels_xml = purse_indicator_pixels_xml_binAsset;

    public static purse_indicator_seasonal_xml = purse_indicator_seasonal_xml_binAsset;

    public static club_discount_promotion_xml = club_discount_promotion_xml_binAsset;

    public static extend_hilite_png = extend_hilite_png_pngAsset;

    public static icon_credit_0_png = icon_credit_0_pngAsset;

    public static icon_credit_1_png = icon_credit_1_pngAsset;

    public static icon_credit_2_png = icon_credit_2_pngAsset;

    public static icon_credit_3_png = icon_credit_3_pngAsset;

    public static icon_credit_4_png = icon_credit_4_pngAsset;

    public static icon_credit_5_png = icon_credit_5_pngAsset;

    public static icon_credit_6_png = icon_credit_6_pngAsset;

    public static icon_pixel_0_png = icon_pixel_0_pngAsset;

    public static icon_pixel_1_png = icon_pixel_1_png_pngAsset;

    public static icon_pixel_2_png = icon_pixel_2_png_pngAsset;

    public static icon_pixel_3_png = icon_pixel_3_png_pngAsset;

    public static extension_grid_xml = extension_grid_xml_binAsset;

    public static purse_indicator_club_xml = purse_indicator_club_xml_binAsset;

    public static video_offer_promotion_xml = video_offer_promotion_xml_binAsset;

    public static offer_icon_png = offer_icon_png_pngAsset;

    public static vip_discount_promotion_v2_xml = vip_discount_promotion_v2_xml_binAsset;

    public static vip_quests_promo_xml = vip_quests_promo_xml_binAsset;

    public static offer_extension_xml = offer_extension_xml_binAsset;

    public static phonenumber_collect_xml = phonenumber_collect_xml_binAsset;

    public static phonenumber_verify_xml = phonenumber_verify_xml_binAsset;

    public static phonenumber_collect_minimized_xml = phonenumber_collect_minimized_xml_binAsset;

    public static phonenumber_verify_minimized_xml = phonenumber_verify_minimized_xml_binAsset;

    public static phonenumber_country_menu_item_xml = phonenumber_country_menu_item_xml_binAsset;

    public static returnusergifting_miniview_xml = returnusergifting_miniview_xml_binAsset;

    public static nux_offer_old_user_xml = nux_offer_old_user_xml_binAsset;

    public static nux_gift_selection_xml = nux_gift_selection_xml_binAsset;

    public static nux_noob_room_offer_xml = nux_noob_room_offer_xml_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboToolbarCom.#staticsReady) return;
        HabboToolbarCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboToolbarCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboToolbarBootstrap, IIDHabboToolbar]);
    }
}
