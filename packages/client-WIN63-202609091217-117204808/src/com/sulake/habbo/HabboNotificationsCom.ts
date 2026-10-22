import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboNotificationsBootstrap } from '@/com/sulake/bootstrap/HabboNotificationsBootstrap';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboNotificationsCom_manifest_binAsset = embedBytes("notifications/HabboNotificationsCom_manifest.bin");
const habbo_notifications_config_xml_binAsset = embedBytes("notifications/habbo_notifications_config_xml.bin");
const if_icon_temp_png_pngAsset = embedBitmap("notifications/if_icon_temp_png.png");
const if_icon_hc_png_pngAsset = embedBitmap("notifications/if_icon_hc_png.png");
const if_icon_vip_png_pngAsset = embedBitmap("notifications/if_icon_vip_png.png");
const if_icon_recycler_png_pngAsset = embedBitmap("notifications/if_icon_recycler_png.png");
const if_icon_friend_bg_blue_png_pngAsset = embedBitmap("notifications/if_icon_friend_bg_blue_png.png");
const if_icon_duckets_png_pngAsset = embedBitmap("notifications/if_icon_duckets_png.png");
const if_icon_earning_png_pngAsset = embedBitmap("notifications/if_icon_earning_png.png");
const if_icon_loyalty_png_pngAsset = embedBitmap("notifications/if_icon_loyalty_png.png");
const if_icon_ltd_png_pngAsset = embedBitmap("shared/if_icon_ltd_png.png");
const if_icon_diamond_png_pngAsset = embedBitmap("notifications/if_icon_diamond_png.png");
const icon_curator_stamp_large_png_pngAsset = embedBitmap("shared/icon_curator_stamp_large_png.png");
const icon_daily_tasks_png_pngAsset = embedBitmap("shared/icon_daily_tasks_png.png");
const icon_wired_error_png_pngAsset = embedBitmap("shared/icon_wired_error_png.png");
const icon_wired_notification_png_pngAsset = embedBitmap("shared/icon_wired_notification_png.png");
const icon_wired_warning_png_pngAsset = embedBitmap("shared/icon_wired_warning_png.png");
const chests_icon_chest_full_pngAsset = embedBitmap("notifications/chests_icon_chest_full.png");
const chests_icon_chest_empty_pngAsset = embedBitmap("notifications/chests_icon_chest_empty.png");
const chests_icon_chest_wired_transaction_pngAsset = embedBitmap("notifications/chests_icon_chest_wired_transaction.png");
const chests_icon_rejected_pngAsset = embedBitmap("notifications/chests_icon_rejected.png");
const chests_icon_successful_pngAsset = embedBitmap("notifications/chests_icon_successful.png");
const chests_icon_trading_error_pngAsset = embedBitmap("notifications/chests_icon_trading_error.png");
const motd_notification_xml_binAsset = embedBytes("notifications/motd_notification_xml.bin");
const motd_notification_item_xml_binAsset = embedBytes("notifications/motd_notification_item_xml.bin");
const layout_notification_xml_binAsset = embedBytes("notifications/layout_notification_xml.bin");
const layout_notification_friendonline_xml_binAsset = embedBytes("notifications/layout_notification_friendonline_xml.bin");
const layout_notification_nft_opening_xml_binAsset = embedBytes("notifications/layout_notification_nft_opening_xml.bin");
const layout_notification_treasurehunt_xml_binAsset = embedBytes("notifications/layout_notification_treasurehunt_xml.bin");
const layout_notification_wired_xml_binAsset = embedBytes("notifications/layout_notification_wired_xml.bin");
const layout_notifications_browser_xml_binAsset = embedBytes("notifications/layout_notifications_browser_xml.bin");
const new_feature_notification_xml_binAsset = embedBytes("notifications/new_feature_notification_xml.bin");
const new_feature_notification_promo_xml_binAsset = embedBytes("notifications/new_feature_notification_promo_xml.bin");
const new_feature_notification_countdown_xml_binAsset = embedBytes("notifications/new_feature_notification_countdown_xml.bin");
const club_gift_notification_xml_binAsset = embedBytes("notifications/club_gift_notification_xml.bin");
const safety_locked_notification_xml_binAsset = embedBytes("notifications/safety_locked_notification_xml.bin");
const layout_notification_popup_xml_binAsset = embedBytes("notifications/layout_notification_popup_xml.bin");
const moderation_badge_png_pngAsset = embedBitmap("notifications/moderation_badge_png.png");

export class HabboNotificationsCom extends SimpleApplication {
    static { registerClassName(this, 'HabboNotificationsCom'); }

    static #staticsReady = false;

    public static manifest = HabboNotificationsCom_manifest_binAsset;

    public static habbo_notifications_config_xml = habbo_notifications_config_xml_binAsset;

    public static if_icon_temp_png = if_icon_temp_png_pngAsset;

    public static if_icon_hc_png = if_icon_hc_png_pngAsset;

    public static if_icon_vip_png = if_icon_vip_png_pngAsset;

    public static if_icon_recycler_png = if_icon_recycler_png_pngAsset;

    public static if_icon_friend_bg_blue_png = if_icon_friend_bg_blue_png_pngAsset;

    public static if_icon_duckets_png = if_icon_duckets_png_pngAsset;

    public static if_icon_earning_png = if_icon_earning_png_pngAsset;

    public static if_icon_loyalty_png = if_icon_loyalty_png_pngAsset;

    public static if_icon_ltd_png = if_icon_ltd_png_pngAsset;

    public static if_icon_diamond_png = if_icon_diamond_png_pngAsset;

    public static icon_curator_stamp_large_png = icon_curator_stamp_large_png_pngAsset;

    public static icon_daily_tasks_png = icon_daily_tasks_png_pngAsset;

    public static icon_wired_error_png = icon_wired_error_png_pngAsset;

    public static icon_wired_notification_png = icon_wired_notification_png_pngAsset;

    public static icon_wired_warning_png = icon_wired_warning_png_pngAsset;

    public static chests_icon_chest_capacity_exceeds = chests_icon_chest_full_pngAsset;

    public static chests_icon_chest_donation = chests_icon_chest_full_pngAsset;

    public static chests_icon_chest_empty = chests_icon_chest_empty_pngAsset;

    public static chests_icon_chest_full = chests_icon_chest_full_pngAsset;

    public static chests_icon_chest_wired_transaction = chests_icon_chest_wired_transaction_pngAsset;

    public static chests_icon_chest_withdraw = chests_icon_chest_full_pngAsset;

    public static chests_icon_rejected = chests_icon_rejected_pngAsset;

    public static chests_icon_successful = chests_icon_successful_pngAsset;

    public static chests_icon_trading_error = chests_icon_trading_error_pngAsset;

    public static motd_notification_xml = motd_notification_xml_binAsset;

    public static motd_notification_item_xml = motd_notification_item_xml_binAsset;

    public static layout_notification_xml = layout_notification_xml_binAsset;

    public static layout_notification_friendonline_xml = layout_notification_friendonline_xml_binAsset;

    public static layout_notification_nft_opening_xml = layout_notification_nft_opening_xml_binAsset;

    public static layout_notification_treasurehunt_xml = layout_notification_treasurehunt_xml_binAsset;

    public static layout_notification_wired_xml = layout_notification_wired_xml_binAsset;

    public static layout_notifications_browser_xml = layout_notifications_browser_xml_binAsset;

    public static new_feature_notification_xml = new_feature_notification_xml_binAsset;

    public static new_feature_notification_promo_xml = new_feature_notification_promo_xml_binAsset;

    public static new_feature_notification_countdown_xml = new_feature_notification_countdown_xml_binAsset;

    public static club_gift_notification_xml = club_gift_notification_xml_binAsset;

    public static safety_locked_notification_xml = safety_locked_notification_xml_binAsset;

    public static layout_notification_popup_xml = layout_notification_popup_xml_binAsset;

    public static moderation_badge_png = moderation_badge_png_pngAsset;

    public static get requiredClasses(): any[] {
        HabboNotificationsCom.#initStatics();
        return HabboNotificationsCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboNotificationsCom.#initStatics();
        HabboNotificationsCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboNotificationsCom.#staticsReady) return;
        HabboNotificationsCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboNotificationsCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboNotificationsBootstrap, IIDHabboNotifications]);
    }
}
