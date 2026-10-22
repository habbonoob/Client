import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboFriendBarBootstrap } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { IIDHabboFriendBar } from '@/com/sulake/iid/IIDHabboFriendBar';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboFriendBarCom_manifest_binAsset = embedBytes("friendbar/HabboFriendBarCom_manifest.bin");
const bar_xml_binAsset = embedBytes("friendbar/bar_xml.bin");
const new_bar_xml_binAsset = embedBytes("friendbar/new_bar_xml.bin");
const entity_xml_binAsset = embedBytes("friendbar/entity_xml.bin");
const new_friend_entity_xml_binAsset = embedBytes("friendbar/new_friend_entity_xml.bin");
const add_friends_tab_xml_binAsset = embedBytes("friendbar/add_friends_tab_xml.bin");
const friend_requests_tab_xml_binAsset = embedBytes("friendbar/friend_requests_tab_xml.bin");
const friend_request_tab_xml_binAsset = embedBytes("friendbar/friend_request_tab_xml.bin");
const toggle_xml_binAsset = embedBytes("friendbar/toggle_xml.bin");
const facebook_piece_xml_binAsset = embedBytes("friendbar/facebook_piece_xml.bin");
const controls_piece_xml_binAsset = embedBytes("friendbar/controls_piece_xml.bin");
const new_controls_piece_xml_binAsset = embedBytes("friendbar/new_controls_piece_xml.bin");
const message_piece_xml_binAsset = embedBytes("friendbar/message_piece_xml.bin");
const search_friends_tab_xml_binAsset = embedBytes("friendbar/search_friends_tab_xml.bin");
const new_search_friends_tab_xml_binAsset = embedBytes("friendbar/new_search_friends_tab_xml.bin");
const all_friends_tab_xml_binAsset = embedBytes("friendbar/all_friends_tab_xml.bin");
const new_all_friends_tab_xml_binAsset = embedBytes("friendbar/new_all_friends_tab_xml.bin");
const new_open_messenger_tab_xml_binAsset = embedBytes("friendbar/new_open_messenger_tab_xml.bin");
const ach_notification_icon_png_pngAsset = embedBitmap("friendbar/ach_notification_icon_png.png");
const plus_friend_icon_png_pngAsset = embedBitmap("friendbar/plus_friend_icon_png.png");
const add_friends_icon_png_pngAsset = embedBitmap("friendbar/add_friends_icon_png.png");
const find_friends_icon_png_pngAsset = embedBitmap("friendbar/find_friends_icon_png.png");
const fb_icon_small_png_pngAsset = embedBitmap("friendbar/fb_icon_small_png.png");
const friends_icon_png_pngAsset = embedBitmap("friendbar/friends_icon_png.png");
const icon_friendlist_png_pngAsset = embedBitmap("friendbar/icon_friendlist_png.png");
const icon_friendlist_notify_1_png_pngAsset = embedBitmap("friendbar/icon_friendlist_notify_1_png.png");
const icon_friendlist_hover_0_png_pngAsset = embedBitmap("friendbar/icon_friendlist_hover_0_png.png");
const icon_friendlist_hover_1_png_pngAsset = embedBitmap("friendbar/icon_friendlist_hover_1_png.png");
const icon_friendlist_hover_2_png_pngAsset = embedBitmap("friendbar/icon_friendlist_hover_2_png.png");
const icon_friendlist_hover_3_png_pngAsset = embedBitmap("friendbar/icon_friendlist_hover_3_png.png");
const icon_messenger_png_pngAsset = embedBitmap("friendbar/icon_messenger_png.png");
const icon_messenger_notify_0_png_pngAsset = embedBitmap("friendbar/icon_messenger_notify_0_png.png");
const icon_messenger_notify_1_png_pngAsset = embedBitmap("friendbar/icon_messenger_notify_1_png.png");
const search_friends_icon_png_pngAsset = embedBitmap("friendbar/search_friends_icon_png.png");
const all_friends_icon_png_pngAsset = embedBitmap("friendbar/all_friends_icon_png.png");
const user_list_xml_binAsset = embedBytes("friendbar/user_list_xml.bin");
const user_entry_xml_binAsset = embedBytes("friendbar/user_entry_xml.bin");
const competition_user_popup_xml_binAsset = embedBytes("friendbar/competition_user_popup_xml.bin");
const on_duty_guide_user_popup_xml_binAsset = embedBytes("friendbar/on_duty_guide_user_popup_xml.bin");
const achievement_competition_prizes_xml_binAsset = embedBytes("friendbar/achievement_competition_prizes_xml.bin");
const HabboFriendBarCom_avatar_image_xml_binAsset = embedBytes("friendbar/HabboFriendBarCom_avatar_image_xml.bin");
const community_goal_xml_binAsset = embedBytes("friendbar/community_goal_xml.bin");
const community_goal_voting_xml_binAsset = embedBytes("friendbar/community_goal_voting_xml.bin");
const daily_quest_xml_binAsset = embedBytes("friendbar/daily_quest_xml.bin");
const element_dailyquest_xml_binAsset = embedBytes("friendbar/element_dailyquest_xml.bin");
const expiring_catalog_page_xml_binAsset = embedBytes("friendbar/expiring_catalog_page_xml.bin");
const expiring_catalog_page_small_xml_binAsset = embedBytes("friendbar/expiring_catalog_page_small_xml.bin");
const landing_view_generic_reception_xml_binAsset = embedBytes("friendbar/landing_view_generic_reception_xml.bin");
const catalog_promo_xml_binAsset = embedBytes("friendbar/catalog_promo_xml.bin");
const catalog_promo_small_xml_binAsset = embedBytes("friendbar/catalog_promo_small_xml.bin");
const campaign_promo_xml_binAsset = embedBytes("friendbar/campaign_promo_xml.bin");
const moving_object_xml_binAsset = embedBytes("friendbar/moving_object_xml.bin");
const moving_object_floating_xml_binAsset = embedBytes("friendbar/moving_object_floating_xml.bin");
const next_ltd_available_xml_binAsset = embedBytes("friendbar/next_ltd_available_xml.bin");
const safety_quiz_promo_xml_binAsset = embedBytes("friendbar/safety_quiz_promo_xml.bin");
const citizenship_welcome_xml_binAsset = embedBytes("friendbar/citizenship_welcome_xml.bin");
const level_up_xml_binAsset = embedBytes("friendbar/level_up_xml.bin");
const talent_track_xml_binAsset = embedBytes("friendbar/talent_track_xml.bin");
const track_promo_xml_binAsset = embedBytes("friendbar/track_promo_xml.bin");
const task_progress_dialog_xml_binAsset = embedBytes("friendbar/task_progress_dialog_xml.bin");
const tour_task_progress_dialog_xml_binAsset = embedBytes("friendbar/tour_task_progress_dialog_xml.bin");
const landing_view_default_dynamic_layout_xml_binAsset = embedBytes("friendbar/landing_view_default_dynamic_layout_xml.bin");
const habbo_moderation_promo_xml_binAsset = embedBytes("friendbar/habbo_moderation_promo_xml.bin");
const habbo_talents_promo_xml_binAsset = embedBytes("friendbar/habbo_talents_promo_xml.bin");
const habbo_way_promo_xml_binAsset = embedBytes("friendbar/habbo_way_promo_xml.bin");
const dynamic_widget_grid_xml_binAsset = embedBytes("friendbar/dynamic_widget_grid_xml.bin");
const pixel_removal_credit_promo_xml_binAsset = embedBytes("friendbar/pixel_removal_credit_promo_xml.bin");
const pixel_removal_promo_xml_binAsset = embedBytes("friendbar/pixel_removal_promo_xml.bin");
const fast_food_game_promo_xml_binAsset = embedBytes("friendbar/fast_food_game_promo_xml.bin");
const room_hopper_network_xml_binAsset = embedBytes("friendbar/room_hopper_network_xml.bin");
const landing_view_jetset_xml_binAsset = embedBytes("friendbar/landing_view_jetset_xml.bin");
const generic_widget_xml_binAsset = embedBytes("friendbar/generic_widget_xml.bin");
const widget_container_widget_xml_binAsset = embedBytes("friendbar/widget_container_widget_xml.bin");
const element_bodytext_xml_binAsset = embedBytes("friendbar/element_bodytext_xml.bin");
const element_button_xml_binAsset = embedBytes("friendbar/element_button_xml.bin");
const element_caption_xml_binAsset = embedBytes("friendbar/element_caption_xml.bin");
const element_image_xml_binAsset = embedBytes("friendbar/element_image_xml.bin");
const element_link_xml_binAsset = embedBytes("friendbar/element_link_xml.bin");
const element_spacing_xml_binAsset = embedBytes("friendbar/element_spacing_xml.bin");
const element_subcaption_xml_binAsset = embedBytes("friendbar/element_subcaption_xml.bin");
const element_timer_xml_binAsset = embedBytes("friendbar/element_timer_xml.bin");
const element_title_xml_binAsset = embedBytes("friendbar/element_title_xml.bin");
const element_rewardbadge_xml_binAsset = embedBytes("friendbar/element_rewardbadge_xml.bin");
const element_concurrentusersmeter_xml_binAsset = embedBytes("friendbar/element_concurrentusersmeter_xml.bin");
const element_concurrentusersinfo_xml_binAsset = embedBytes("friendbar/element_concurrentusersinfo_xml.bin");
const dynamic_widget_grid_separator_xml_binAsset = embedBytes("friendbar/dynamic_widget_grid_separator_xml.bin");
const epic_popup_frame_xml_binAsset = embedBytes("friendbar/epic_popup_frame_xml.bin");
const landing_view_furnimatic_xml_binAsset = embedBytes("friendbar/landing_view_furnimatic_xml.bin");
const initialization_error_xml_binAsset = embedBytes("friendbar/initialization_error_xml.bin");
const element_community_goal_score_xml_binAsset = embedBytes("friendbar/element_community_goal_score_xml.bin");
const promo_article_xml_binAsset = embedBytes("friendbar/promo_article_xml.bin");
const bonus_rare_promo_xml_binAsset = embedBytes("friendbar/bonus_rare_promo_xml.bin");
const groupforum_thread_list_item_xml_binAsset = embedBytes("friendbar/groupforum_thread_list_item_xml.bin");
const groupforum_forum_list_item_xml_binAsset = embedBytes("friendbar/groupforum_forum_list_item_xml.bin");
const groupforum_main_view_xml_binAsset = embedBytes("friendbar/groupforum_main_view_xml.bin");
const groupforum_message_list_item_xml_binAsset = embedBytes("friendbar/groupforum_message_list_item_xml.bin");
const groupforum_compose_message_xml_binAsset = embedBytes("friendbar/groupforum_compose_message_xml.bin");
const groupforum_forum_settings_xml_binAsset = embedBytes("friendbar/groupforum_forum_settings_xml.bin");

export class HabboFriendBarCom extends SimpleApplication {
    static { registerClassName(this, 'HabboFriendBarCom'); }

    static #staticsReady = false;

    public static manifest = HabboFriendBarCom_manifest_binAsset;

    public static bar_xml = bar_xml_binAsset;

    public static new_bar_xml = new_bar_xml_binAsset;

    public static entity_xml = entity_xml_binAsset;

    public static new_friend_entity_xml = new_friend_entity_xml_binAsset;

    public static add_friends_tab_xml = add_friends_tab_xml_binAsset;

    public static friend_requests_tab_xml = friend_requests_tab_xml_binAsset;

    public static friend_request_tab_xml = friend_request_tab_xml_binAsset;

    public static toggle_xml = toggle_xml_binAsset;

    public static facebook_piece_xml = facebook_piece_xml_binAsset;

    public static controls_piece_xml = controls_piece_xml_binAsset;

    public static new_controls_piece_xml = new_controls_piece_xml_binAsset;

    public static message_piece_xml = message_piece_xml_binAsset;

    public static search_friends_tab_xml = search_friends_tab_xml_binAsset;

    public static new_search_friends_tab_xml = new_search_friends_tab_xml_binAsset;

    public static all_friends_tab_xml = all_friends_tab_xml_binAsset;

    public static new_all_friends_tab_xml = new_all_friends_tab_xml_binAsset;

    public static new_open_messenger_tab_xml = new_open_messenger_tab_xml_binAsset;

    public static ach_notification_icon_png = ach_notification_icon_png_pngAsset;

    public static plus_friend_icon_png = plus_friend_icon_png_pngAsset;

    public static add_friends_icon_png = add_friends_icon_png_pngAsset;

    public static find_friends_icon_png = find_friends_icon_png_pngAsset;

    public static fb_icon_small_png = fb_icon_small_png_pngAsset;

    public static friends_icon_png = friends_icon_png_pngAsset;

    public static icon_friendlist_png = icon_friendlist_png_pngAsset;

    public static icon_friendlist_notify_0_png = icon_friendlist_png_pngAsset;

    public static icon_friendlist_notify_1_png = icon_friendlist_notify_1_png_pngAsset;

    public static icon_friendlist_hover_0_png = icon_friendlist_hover_0_png_pngAsset;

    public static icon_friendlist_hover_1_png = icon_friendlist_hover_1_png_pngAsset;

    public static icon_friendlist_hover_2_png = icon_friendlist_hover_2_png_pngAsset;

    public static icon_friendlist_hover_3_png = icon_friendlist_hover_3_png_pngAsset;

    public static icon_messenger_png = icon_messenger_png_pngAsset;

    public static icon_messenger_notify_0_png = icon_messenger_notify_0_png_pngAsset;

    public static icon_messenger_notify_1_png = icon_messenger_notify_1_png_pngAsset;

    public static search_friends_icon_png = search_friends_icon_png_pngAsset;

    public static all_friends_icon_png = all_friends_icon_png_pngAsset;

    public static user_list_xml = user_list_xml_binAsset;

    public static user_entry_xml = user_entry_xml_binAsset;

    public static competition_user_popup_xml = competition_user_popup_xml_binAsset;

    public static on_duty_guide_user_popup_xml = on_duty_guide_user_popup_xml_binAsset;

    public static achievement_competition_prizes_xml = achievement_competition_prizes_xml_binAsset;

    public static avatar_image_xml = HabboFriendBarCom_avatar_image_xml_binAsset;

    public static community_goal_xml = community_goal_xml_binAsset;

    public static community_goal_voting_xml = community_goal_voting_xml_binAsset;

    public static daily_quest_xml = daily_quest_xml_binAsset;

    public static element_dailyquest_xml = element_dailyquest_xml_binAsset;

    public static expiring_catalog_page_xml = expiring_catalog_page_xml_binAsset;

    public static expiring_catalog_page_small_xml = expiring_catalog_page_small_xml_binAsset;

    public static landing_view_generic_reception_xml = landing_view_generic_reception_xml_binAsset;

    public static catalog_promo_xml = catalog_promo_xml_binAsset;

    public static catalog_promo_small_xml = catalog_promo_small_xml_binAsset;

    public static campaign_promo_xml = campaign_promo_xml_binAsset;

    public static moving_object_xml = moving_object_xml_binAsset;

    public static moving_object_floating_xml = moving_object_floating_xml_binAsset;

    public static next_ltd_available_xml = next_ltd_available_xml_binAsset;

    public static safety_quiz_promo_xml = safety_quiz_promo_xml_binAsset;

    public static citizenship_welcome_xml = citizenship_welcome_xml_binAsset;

    public static level_up_xml = level_up_xml_binAsset;

    public static talent_track_xml = talent_track_xml_binAsset;

    public static track_promo_xml = track_promo_xml_binAsset;

    public static task_progress_dialog_xml = task_progress_dialog_xml_binAsset;

    public static tour_task_progress_dialog_xml = tour_task_progress_dialog_xml_binAsset;

    public static landing_view_default_dynamic_layout_xml = landing_view_default_dynamic_layout_xml_binAsset;

    public static habbo_moderation_promo_xml = habbo_moderation_promo_xml_binAsset;

    public static habbo_talents_promo_xml = habbo_talents_promo_xml_binAsset;

    public static habbo_way_promo_xml = habbo_way_promo_xml_binAsset;

    public static dynamic_widget_grid_xml = dynamic_widget_grid_xml_binAsset;

    public static pixel_removal_credit_promo_xml = pixel_removal_credit_promo_xml_binAsset;

    public static pixel_removal_promo_xml = pixel_removal_promo_xml_binAsset;

    public static fast_food_game_promo_xml = fast_food_game_promo_xml_binAsset;

    public static room_hopper_network_xml = room_hopper_network_xml_binAsset;

    public static landing_view_jetset_xml = landing_view_jetset_xml_binAsset;

    public static generic_widget_xml = generic_widget_xml_binAsset;

    public static widget_container_widget_xml = widget_container_widget_xml_binAsset;

    public static element_bodytext_xml = element_bodytext_xml_binAsset;

    public static element_button_xml = element_button_xml_binAsset;

    public static element_caption_xml = element_caption_xml_binAsset;

    public static element_image_xml = element_image_xml_binAsset;

    public static element_link_xml = element_link_xml_binAsset;

    public static element_spacing_xml = element_spacing_xml_binAsset;

    public static element_subcaption_xml = element_subcaption_xml_binAsset;

    public static element_timer_xml = element_timer_xml_binAsset;

    public static element_title_xml = element_title_xml_binAsset;

    public static element_rewardbadge_xml = element_rewardbadge_xml_binAsset;

    public static element_concurrentusersmeter_xml = element_concurrentusersmeter_xml_binAsset;

    public static element_concurrentusersinfo_xml = element_concurrentusersinfo_xml_binAsset;

    public static dynamic_widget_grid_separator_xml = dynamic_widget_grid_separator_xml_binAsset;

    public static epic_popup_frame_xml = epic_popup_frame_xml_binAsset;

    public static landing_view_furnimatic_xml = landing_view_furnimatic_xml_binAsset;

    public static initialization_error_xml = initialization_error_xml_binAsset;

    public static element_community_goal_score_xml = element_community_goal_score_xml_binAsset;

    public static promo_article_xml = promo_article_xml_binAsset;

    public static bonus_rare_promo_xml = bonus_rare_promo_xml_binAsset;

    public static groupforum_thread_list_item_xml = groupforum_thread_list_item_xml_binAsset;

    public static groupforum_forum_list_item_xml = groupforum_forum_list_item_xml_binAsset;

    public static groupforum_main_view_xml = groupforum_main_view_xml_binAsset;

    public static groupforum_message_list_item_xml = groupforum_message_list_item_xml_binAsset;

    public static groupforum_compose_message_xml = groupforum_compose_message_xml_binAsset;

    public static groupforum_forum_settings_xml = groupforum_forum_settings_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboFriendBarCom.#initStatics();
        return HabboFriendBarCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboFriendBarCom.#initStatics();
        HabboFriendBarCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboFriendBarCom.#staticsReady) return;
        HabboFriendBarCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboFriendBarCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboFriendBarBootstrap, IIDHabboFriendBar]);
    }
}
