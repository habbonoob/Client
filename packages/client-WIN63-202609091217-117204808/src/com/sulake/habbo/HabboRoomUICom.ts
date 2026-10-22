import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomUIBootstrap } from '@/com/sulake/bootstrap/RoomUIBootstrap';
import { RoomWidgetFactory } from '@/com/sulake/habbo/ui/widget/RoomWidgetFactory';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomUICom_manifest_binAsset = embedBytes("ui/HabboRoomUICom_manifest.bin");
const room_desktop_layout_xml_binAsset = embedBytes("ui/room_desktop_layout_xml.bin");
const room_view_container_xml_binAsset = embedBytes("ui/room_view_container_xml.bin");
const spectator_mode_xml_binAsset = embedBytes("ui/spectator_mode_xml.bin");
const spec_top_left_png_pngAsset = embedBitmap("ui/spec_top_left_png.png");
const spec_top_middle_png_pngAsset = embedBitmap("ui/spec_top_middle_png.png");
const spec_top_right_png_pngAsset = embedBitmap("ui/spec_top_right_png.png");
const spec_middle_left_png_pngAsset = embedBitmap("ui/spec_middle_left_png.png");
const spec_middle_right_png_pngAsset = embedBitmap("ui/spec_middle_right_png.png");
const spec_bottom_left_png_pngAsset = embedBitmap("ui/spec_bottom_left_png.png");
const spec_bottom_middle_png_pngAsset = embedBitmap("ui/spec_bottom_middle_png.png");
const spec_bottom_right_png_pngAsset = embedBitmap("ui/spec_bottom_right_png.png");
const chatinput_bubble_left_pngAsset = embedBitmap("ui/chatinput_bubble_left.png");
const chatinput_bubble_middle_pngAsset = embedBitmap("ui/chatinput_bubble_middle.png");
const chatinput_bubble_right_pngAsset = embedBitmap("ui/chatinput_bubble_right.png");
const packagecard_icon_hc_pngAsset = embedBitmap("ui/packagecard_icon_hc.png");
const packagecard_icon_floor_pngAsset = embedBitmap("shared/packagecard_icon_floor.png");
const packagecard_icon_landscape_pngAsset = embedBitmap("shared/packagecard_icon_landscape.png");
const packagecard_icon_wallpaper_pngAsset = embedBitmap("shared/packagecard_icon_wallpaper.png");
const stickie_blanco_pngAsset = embedBitmap("ui/stickie_blanco.png");
const stickie_close_pngAsset = embedBitmap("ui/stickie_close.png");
const stickie_remove_pngAsset = embedBitmap("ui/stickie_remove.png");
const stickie_vd_pngAsset = embedBitmap("ui/stickie_vd.png");
const stickie_xmas_pngAsset = embedBitmap("ui/stickie_xmas.png");
const stickie_dreams_pngAsset = embedBitmap("ui/stickie_dreams.png");
const stickie_juninas_pngAsset = embedBitmap("ui/stickie_juninas.png");
const stickie_shakesp_pngAsset = embedBitmap("ui/stickie_shakesp.png");
const trophy_bg_bronze_pngAsset = embedBitmap("ui/trophy_bg_bronze.png");
const trophy_bg_gold_pngAsset = embedBitmap("ui/trophy_bg_gold.png");
const trophy_bg_silver_pngAsset = embedBitmap("ui/trophy_bg_silver.png");
const dimmer_color_button_pngAsset = embedBitmap("ui/dimmer_color_button.png");
const dimmer_color_frame_pngAsset = embedBitmap("ui/dimmer_color_frame.png");
const dimmer_color_selected_pngAsset = embedBitmap("ui/dimmer_color_selected.png");
const dimmer_slider_base_pngAsset = embedBitmap("ui/dimmer_slider_base.png");
const dimmer_slider_button_pngAsset = embedBitmap("ui/dimmer_slider_button.png");
const dimmer_info_pngAsset = embedBitmap("ui/dimmer_info.png");
const icon_home_pngAsset = embedBitmap("ui/icon_home.png");
const icon_nft_pngAsset = embedBitmap("shared/icon_nft.png");
const badges_color_pngAsset = embedBitmap("ui/badges_color.png");
const badges_white_pngAsset = embedBitmap("ui/badges_white.png");
const clothes_color_pngAsset = embedBitmap("ui/clothes_color.png");
const clothes_highlighter_pngAsset = embedBitmap("ui/clothes_highlighter.png");
const clothes_white_pngAsset = embedBitmap("shared/clothes_white.png");
const clothes_highlighter_blue_pngAsset = embedBitmap("shared/clothes_highlighter_blue.png");
const dance_color_pngAsset = embedBitmap("ui/dance_color.png");
const dance_white_pngAsset = embedBitmap("ui/dance_white.png");
const effects_color_pngAsset = embedBitmap("ui/effects_color.png");
const effects_white_pngAsset = embedBitmap("ui/effects_white.png");
const gohome_color_pngAsset = embedBitmap("shared/gohome_color.png");
const gohome_white_pngAsset = embedBitmap("shared/gohome_white.png");
const compass_color_pngAsset = embedBitmap("shared/compass_color.png");
const compass_white_pngAsset = embedBitmap("shared/compass_white.png");
const memenu_fx_pause_pngAsset = embedBitmap("ui/memenu_fx_pause.png");
const memenu_fx_play_pngAsset = embedBitmap("ui/memenu_fx_play.png");
const wave_color_pngAsset = embedBitmap("ui/wave_color.png");
const wave_white_pngAsset = embedBitmap("ui/wave_white.png");
const settings_color_pngAsset = embedBitmap("shared/settings_color.png");
const settings_white_pngAsset = embedBitmap("shared/settings_white.png");
const sounds_off_color_pngAsset = embedBitmap("shared/sounds_off_color.png");
const sounds_off_white_pngAsset = embedBitmap("shared/sounds_off_white.png");
const sounds_on_color_pngAsset = embedBitmap("shared/sounds_on_color.png");
const sounds_on_white_pngAsset = embedBitmap("shared/sounds_on_white.png");
const achievements_color_pngAsset = embedBitmap("shared/achievements_color.png");
const achievements_white_pngAsset = embedBitmap("shared/achievements_white.png");
const lighthouse_color_pngAsset = embedBitmap("shared/lighthouse_color.png");
const lighthouse_white_pngAsset = embedBitmap("shared/lighthouse_white.png");
const memenu_settings_slider_base_pngAsset = embedBitmap("shared/memenu_settings_slider_base.png");
const memenu_settings_slider_button_pngAsset = embedBitmap("shared/memenu_settings_slider_button.png");
const icon_petrespect_pngAsset = embedBitmap("ui/icon_petrespect.png");
const icon_pet_skill_pngAsset = embedBitmap("ui/icon_pet_skill.png");
const icon_pet_wellbeing_pngAsset = embedBitmap("ui/icon_pet_wellbeing.png");
const jb_icon_composer_pngAsset = embedBitmap("ui/jb_icon_composer.png");
const jb_icon_disc_pngAsset = embedBitmap("ui/jb_icon_disc.png");
const small_pen_pngAsset = embedBitmap("shared/small_pen.png");
const credits_color_pngAsset = embedBitmap("ui/credits_color.png");
const credits_white_pngAsset = embedBitmap("ui/credits_white.png");
const minimail_color_pngAsset = embedBitmap("shared/minimail_color.png");
const minimail_white_pngAsset = embedBitmap("shared/minimail_white.png");
const club_color_pngAsset = embedBitmap("ui/club_color.png");
const club_white_pngAsset = embedBitmap("ui/club_white.png");
const vip_color_pngAsset = embedBitmap("ui/vip_color.png");
const vip_white_pngAsset = embedBitmap("ui/vip_white.png");
const icon_pet_energy_pngAsset = embedBitmap("ui/icon_pet_energy.png");
const icon_pet_experience_pngAsset = embedBitmap("ui/icon_pet_experience.png");
const icon_pet_happiness_pngAsset = embedBitmap("ui/icon_pet_happiness.png");
const edit_pen_icon_pngAsset = embedBitmap("ui/edit_pen_icon.png");
const icon_arrow_pngAsset = embedBitmap("ui/icon_arrow.png");
const icon_arrow_left_pngAsset = embedBitmap("ui/icon_arrow_left.png");
const icon_cd_big_pngAsset = embedBitmap("ui/icon_cd_big.png");
const icon_cd_small_pngAsset = embedBitmap("ui/icon_cd_small.png");
const icon_notes_small_pngAsset = embedBitmap("ui/icon_notes_small.png");
const icon_pause_pngAsset = embedBitmap("ui/icon_pause.png");
const icon_play_pngAsset = embedBitmap("ui/icon_play.png");
const icon_pause_large_pngAsset = embedBitmap("ui/icon_pause_large.png");
const icon_download_pngAsset = embedBitmap("ui/icon_download.png");
const title_fader_pngAsset = embedBitmap("ui/title_fader.png");
const profile_color_pngAsset = embedBitmap("shared/profile_color.png");
const profile_white_pngAsset = embedBitmap("shared/profile_white.png");
const chatinput_window_binAsset = embedBytes("ui/chatinput_window.bin");
const chatinput_window_new_binAsset = embedBytes("ui/chatinput_window_new.bin");
const chooser_item_binAsset = embedBytes("ui/chooser_item.bin");
const chooser_view_binAsset = embedBytes("ui/chooser_view.bin");
const new_furni_chooser_view_binAsset = embedBytes("ui/new_furni_chooser_view.bin");
const new_user_chooser_view_binAsset = embedBytes("ui/new_user_chooser_view.bin");
const doorbell_binAsset = embedBytes("ui/doorbell.bin");
const doorbell_list_entry_binAsset = embedBytes("ui/doorbell_list_entry.bin");
const credit_redeem_binAsset = embedBytes("ui/credit_redeem.bin");
const ecotronbox_card_binAsset = embedBytes("ui/ecotronbox_card.bin");
const ecotronbox_card_furnimatic_binAsset = embedBytes("ui/ecotronbox_card_furnimatic.bin");
const mystery_box_open_dialog_binAsset = embedBytes("ui/mystery_box_open_dialog.bin");
const mystery_box_reward_binAsset = embedBytes("ui/mystery_box_reward.bin");
const mystery_box_toolbar_extension_binAsset = embedBytes("ui/mystery_box_toolbar_extension.bin");
const petpackage_binAsset = embedBytes("ui/petpackage.bin");
const petpackage_new_binAsset = embedBytes("ui/petpackage_new.bin");
const placeholder_binAsset = embedBytes("ui/placeholder.bin");
const packagecard_binAsset = embedBytes("ui/packagecard.bin");
const packagecard_new_binAsset = embedBytes("ui/packagecard_new.bin");
const packagecard_info_binAsset = embedBytes("ui/packagecard_info.bin");
const packagecard_new_opened_binAsset = embedBytes("ui/packagecard_new_opened.bin");
const gift_icon_background_pngAsset = embedBitmap("ui/gift_icon_background.png");
const giftcard_blank_pngAsset = embedBitmap("shared/giftcard_blank.png");
const gift_incognito_pngAsset = embedBitmap("shared/gift_incognito.png");
const stickie_binAsset = embedBytes("ui/stickie.bin");
const notification_teaser_binAsset = embedBytes("ui/notification_teaser.bin");
const notification_gift_locked_binAsset = embedBytes("ui/notification_gift_locked.bin");
const notification_gift_unlocked_binAsset = embedBytes("ui/notification_gift_unlocked.bin");
const notification_gift_unlocked_notify_binAsset = embedBytes("ui/notification_gift_unlocked_notify.bin");
const notification_gift_received_binAsset = embedBytes("ui/notification_gift_received.bin");
const notification_gift_alert_binAsset = embedBytes("ui/notification_gift_alert.bin");
const trophy_binAsset = embedBytes("ui/trophy.bin");
const niko_trophy_binAsset = embedBytes("ui/niko_trophy.bin");
const dimmer_ui_binAsset = embedBytes("ui/dimmer_ui.bin");
const color_chooser_cell_binAsset = embedBytes("shared/color_chooser_cell.bin");
const badge_details_binAsset = embedBytes("ui/badge_details.bin");
const furni_view_binAsset = embedBytes("ui/furni_view.bin");
const furni_view_branding_element_binAsset = embedBytes("ui/furni_view_branding_element.bin");
const user_tag_binAsset = embedBytes("ui/user_tag.bin");
const user_tag_highlighted_binAsset = embedBytes("ui/user_tag_highlighted.bin");
const user_view_binAsset = embedBytes("ui/user_view.bin");
const bot_view_binAsset = embedBytes("ui/bot_view.bin");
const rentable_bot_view_binAsset = embedBytes("ui/rentable_bot_view.bin");
const badge_entity_binAsset = embedBytes("ui/badge_entity.bin");
const room_loading_bar_binAsset = embedBytes("ui/room_loading_bar.bin");
const memenu_binAsset = embedBytes("ui/memenu.bin");
const memenu_dance_binAsset = embedBytes("ui/memenu_dance.bin");
const memenu_dance_button_binAsset = embedBytes("ui/memenu_dance_button.bin");
const memenu_effect_inactive_binAsset = embedBytes("ui/memenu_effect_inactive.bin");
const memenu_effect_selected_binAsset = embedBytes("ui/memenu_effect_selected.bin");
const memenu_effect_unselected_binAsset = embedBytes("ui/memenu_effect_unselected.bin");
const memenu_effects_binAsset = embedBytes("ui/memenu_effects.bin");
const memenu_main_binAsset = embedBytes("ui/memenu_main.bin");
const memenu_main_simple_binAsset = embedBytes("ui/memenu_main_simple.bin");
const memenu_settings_binAsset = embedBytes("ui/memenu_settings.bin");
const memenu_settings_menu_binAsset = embedBytes("ui/memenu_settings_menu.bin");
const notification_binAsset = embedBytes("ui/notification.bin");
const room_queue_binAsset = embedBytes("ui/room_queue.bin");
const poll_offer_binAsset = embedBytes("ui/poll_offer.bin");
const poll_question_binAsset = embedBytes("ui/poll_question.bin");
const poll_answer_text_input_binAsset = embedBytes("ui/poll_answer_text_input.bin");
const poll_answer_checkbox_input_binAsset = embedBytes("ui/poll_answer_checkbox_input.bin");
const poll_answer_radiobutton_input_binAsset = embedBytes("ui/poll_answer_radiobutton_input.bin");
const poll_cancel_confirm_binAsset = embedBytes("ui/poll_cancel_confirm.bin");
const pet_commands_binAsset = embedBytes("ui/pet_commands.bin");
const pet_view_binAsset = embedBytes("ui/pet_view.bin");
const instant_friend_request_binAsset = embedBytes("ui/instant_friend_request.bin");
const boygirl_binAsset = embedBytes("ui/boygirl.bin");
const avatar_info_widget_binAsset = embedBytes("ui/avatar_info_widget.bin");
const avatar_menu_widget_binAsset = embedBytes("ui/avatar_menu_widget.bin");
const own_avatar_menu_binAsset = embedBytes("ui/own_avatar_menu.bin");
const own_avatar_decorating_binAsset = embedBytes("ui/own_avatar_decorating.bin");
const new_user_help_binAsset = embedBytes("ui/new_user_help.bin");
const own_pet_menu_binAsset = embedBytes("ui/own_pet_menu.bin");
const pet_menu_binAsset = embedBytes("ui/pet_menu.bin");
const use_product_menu_binAsset = embedBytes("ui/use_product_menu.bin");
const breed_pet_menu_binAsset = embedBytes("ui/breed_pet_menu.bin");
const breed_pets_confirmation_xml_binAsset = embedBytes("ui/breed_pets_confirmation_xml.bin");
const confirm_pet_breeding_xml_binAsset = embedBytes("ui/confirm_pet_breeding_xml.bin");
const pet_breeding_pet_preview_xml_binAsset = embedBytes("ui/pet_breeding_pet_preview_xml.bin");
const nestBreedingSuccess_xml_binAsset = embedBytes("ui/nestBreedingSuccess_xml.bin");
const breed_pets_result_xml_binAsset = embedBytes("ui/breed_pets_result_xml.bin");
const use_product_widget_frame_xml_binAsset = embedBytes("ui/use_product_widget_frame_xml.bin");
const use_product_controller_custom_part_xml_binAsset = embedBytes("ui/use_product_controller_custom_part_xml.bin");
const use_product_controller_shampoo_xml_binAsset = embedBytes("ui/use_product_controller_shampoo_xml.bin");
const use_product_controller_custom_part_shampoo_xml_binAsset = embedBytes("ui/use_product_controller_custom_part_shampoo_xml.bin");
const use_product_controller_saddle_xml_binAsset = embedBytes("ui/use_product_controller_saddle_xml.bin");
const use_product_widget_frame_monsterplant_xml_binAsset = embedBytes("ui/use_product_widget_frame_monsterplant_xml.bin");
const use_product_widget_frame_monsterplant_rebreed_xml_binAsset = embedBytes("ui/use_product_widget_frame_monsterplant_rebreed_xml.bin");
const use_product_widget_frame_monsterplant_fertilize_xml_binAsset = embedBytes("ui/use_product_widget_frame_monsterplant_fertilize_xml.bin");
const use_product_controller_revive_monsterplant_xml_binAsset = embedBytes("ui/use_product_controller_revive_monsterplant_xml.bin");
const use_product_controller_rebreed_monsterplant_xml_binAsset = embedBytes("ui/use_product_controller_rebreed_monsterplant_xml.bin");
const use_product_controller_fertilize_monsterplant_xml_binAsset = embedBytes("ui/use_product_controller_fertilize_monsterplant_xml.bin");
const breed_pets_preview_bg_png_pngAsset = embedBitmap("ui/breed_pets_preview_bg_png.png");
const plant_seed_preview_png_pngAsset = embedBitmap("ui/plant_seed_preview_png.png");
const minimized_menu_binAsset = embedBytes("ui/minimized_menu.bin");
const jukebox_view_binAsset = embedBytes("ui/jukebox_view.bin");
const crackable_furni_view_binAsset = embedBytes("ui/crackable_furni_view.bin");
const songdisk_view_binAsset = embedBytes("ui/songdisk_view.bin");
const playlisteditor_inventory_subwindow_get_more_music_binAsset = embedBytes("ui/playlisteditor_inventory_subwindow_get_more_music.bin");
const playlisteditor_inventory_subwindow_play_preview_binAsset = embedBytes("ui/playlisteditor_inventory_subwindow_play_preview.bin");
const playlisteditor_main_window_binAsset = embedBytes("ui/playlisteditor_main_window.bin");
const playlisteditor_music_inventory_item_binAsset = embedBytes("ui/playlisteditor_music_inventory_item.bin");
const playlisteditor_playlist_item_binAsset = embedBytes("ui/playlisteditor_playlist_item.bin");
const playlisteditor_playlist_subwindow_add_songs_binAsset = embedBytes("ui/playlisteditor_playlist_subwindow_add_songs.bin");
const playlisteditor_playlist_subwindow_nowplaying_binAsset = embedBytes("ui/playlisteditor_playlist_subwindow_nowplaying.bin");
const playlisteditor_playlist_subwindow_play_now_binAsset = embedBytes("ui/playlisteditor_playlist_subwindow_play_now.bin");
const effects_widget_binAsset = embedBytes("ui/effects_widget.bin");
const effect_selector_binAsset = embedBytes("ui/effect_selector.bin");
const mannequin_widget_frame_xml_binAsset = embedBytes("ui/mannequin_widget_frame_xml.bin");
const mannequin_controller_main_xml_binAsset = embedBytes("ui/mannequin_controller_main_xml.bin");
const mannequin_controller_save_xml_binAsset = embedBytes("ui/mannequin_controller_save_xml.bin");
const mannequin_peer_main_xml_binAsset = embedBytes("ui/mannequin_peer_main_xml.bin");
const mannequin_no_club_xml_binAsset = embedBytes("ui/mannequin_no_club_xml.bin");
const mannequin_wrong_gender_xml_binAsset = embedBytes("ui/mannequin_wrong_gender_xml.bin");
const mannequin_preview_bg_png_pngAsset = embedBitmap("ui/mannequin_preview_bg_png.png");
const guild_furni_menu_binAsset = embedBytes("ui/guild_furni_menu.bin");
const random_teleport_menu_binAsset = embedBytes("ui/random_teleport_menu.bin");
const monsterplant_seed_menu_binAsset = embedBytes("ui/monsterplant_seed_menu.bin");
const mysterybox_menu_binAsset = embedBytes("ui/mysterybox_menu.bin");
const use_product_widget_frame_plant_seed_xml_binAsset = embedBytes("ui/use_product_widget_frame_plant_seed_xml.bin");
const generic_usable_menu_binAsset = embedBytes("ui/generic_usable_menu.bin");
const effectbox_xml_binAsset = embedBytes("ui/effectbox_xml.bin");
const mysterytrophy_xml_binAsset = embedBytes("ui/mysterytrophy_xml.bin");
const use_product_controller_plant_seed_xml_binAsset = embedBytes("ui/use_product_controller_plant_seed_xml.bin");
const use_product_controller_purchasable_clothing_xml_binAsset = embedBytes("ui/use_product_controller_purchasable_clothing_xml.bin");
const sign_icon_heart_pngAsset = embedBitmap("ui/sign_icon_heart.png");
const sign_icon_skull_pngAsset = embedBitmap("ui/sign_icon_skull.png");
const sign_icon_13_pngAsset = embedBitmap("ui/sign_icon_13.png");
const sign_icon_14_pngAsset = embedBitmap("ui/sign_icon_14.png");
const sign_icon_15_pngAsset = embedBitmap("ui/sign_icon_15.png");
const sign_icon_16_pngAsset = embedBitmap("ui/sign_icon_16.png");
const sign_icon_17_pngAsset = embedBitmap("ui/sign_icon_17.png");
const pet_skill_level_0_pngAsset = embedBitmap("ui/pet_skill_level_0.png");
const pet_skill_level_1_pngAsset = embedBitmap("ui/pet_skill_level_1.png");
const pet_skill_level_2_pngAsset = embedBitmap("ui/pet_skill_level_2.png");
const pet_skill_level_3_pngAsset = embedBitmap("ui/pet_skill_level_3.png");
const pet_skill_level_4_pngAsset = embedBitmap("ui/pet_skill_level_4.png");
const camera_interface_xml_binAsset = embedBytes("ui/camera_interface_xml.bin");
const photo_purchase_confirmation_xml_binAsset = embedBytes("ui/photo_purchase_confirmation_xml.bin");
const camera_editor_xml_binAsset = embedBytes("ui/camera_editor_xml.bin");
const camera_filterbutton_xml_binAsset = embedBytes("ui/camera_filterbutton_xml.bin");
const camera_typebutton_xml_binAsset = embedBytes("ui/camera_typebutton_xml.bin");
const background_color_ui_xml_binAsset = embedBytes("ui/background_color_ui_xml.bin");
const area_hide_ui_xml_binAsset = embedBytes("ui/area_hide_ui_xml.bin");
const viprequired_xml_binAsset = embedBytes("ui/viprequired_xml.bin");
const costumehopper_costumerequired_xml_binAsset = embedBytes("ui/costumehopper_costumerequired_xml.bin");
const respect_giving_failed_notification_xml_binAsset = embedBytes("ui/respect_giving_failed_notification_xml.bin");
const chatinput_chatstyle_template_xml_binAsset = embedBytes("ui/chatinput_chatstyle_template_xml.bin");
const chatinput_chatfontsize_template_xml_binAsset = embedBytes("ui/chatinput_chatfontsize_template_xml.bin");
const styleselector_menu_xml_binAsset = embedBytes("ui/styleselector_menu_xml.bin");
const styleselector_menu_new_xml_binAsset = embedBytes("ui/styleselector_menu_new_xml.bin");
const habbiconselector_menu_xml_binAsset = embedBytes("ui/habbiconselector_menu_xml.bin");
const chatter_configuration_xml_binAsset = embedBytes("ui/chatter_configuration_xml.bin");
const name_configuration_xml_binAsset = embedBytes("ui/name_configuration_xml.bin");
const lock_confirm_xml_binAsset = embedBytes("ui/lock_confirm_xml.bin");
const lovelock_engraving_xml_binAsset = embedBytes("ui/lovelock_engraving_xml.bin");
const habboween_engraving_xml_binAsset = embedBytes("ui/habboween_engraving_xml.bin");
const wildwest_engraving_xml_binAsset = embedBytes("ui/wildwest_engraving_xml.bin");
const friendfurni_menu_binAsset = embedBytes("ui/friendfurni_menu.bin");
const high_score_display_xml_binAsset = embedBytes("ui/high_score_display_xml.bin");
const custom_stack_height_xml_binAsset = embedBytes("ui/custom_stack_height_xml.bin");
const video_viewer_xml_binAsset = embedBytes("ui/video_viewer_xml.bin");
const rentablespace_xml_binAsset = embedBytes("ui/rentablespace_xml.bin");
const vimeo_viewer_xml_binAsset = embedBytes("ui/vimeo_viewer_xml.bin");
const room_tools_toolbar_xml_binAsset = embedBytes("ui/room_tools_toolbar_xml.bin");
const room_tools_info_xml_binAsset = embedBytes("ui/room_tools_info_xml.bin");
const stories_image_widget_xml_binAsset = embedBytes("ui/stories_image_widget_xml.bin");
const room_tools_history_xml_binAsset = embedBytes("ui/room_tools_history_xml.bin");
const room_tools_history_item_xml_binAsset = embedBytes("ui/room_tools_history_item_xml.bin");
const share_room_xml_binAsset = embedBytes("ui/share_room_xml.bin");
const report_photo_xml_binAsset = embedBytes("ui/report_photo_xml.bin");
const report_photo_poster_xml_binAsset = embedBytes("ui/report_photo_poster_xml.bin");
const wordquiz_question_xml_binAsset = embedBytes("ui/wordquiz_question_xml.bin");
const wordquiz_result_xml_binAsset = embedBytes("ui/wordquiz_result_xml.bin");
const wordquiz_like_xml_binAsset = embedBytes("ui/wordquiz_like_xml.bin");
const wordquiz_unlike_xml_binAsset = embedBytes("ui/wordquiz_unlike_xml.bin");
const ui_help_bubble_binAsset = embedBytes("ui/ui_help_bubble.bin");
const ui_help_modal_binAsset = embedBytes("ui/ui_help_modal.bin");
const iro_room_thumbnail_camera_xml_binAsset = embedBytes("ui/iro_room_thumbnail_camera_xml.bin");
const craftingwidget_xml_binAsset = embedBytes("ui/craftingwidget_xml.bin");

export class HabboRoomUICom extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomUICom'); }

    static #staticsReady = false;

    public static manifest = HabboRoomUICom_manifest_binAsset;

    public static room_desktop_layout_xml = room_desktop_layout_xml_binAsset;

    public static room_view_container_xml = room_view_container_xml_binAsset;

    public static spectator_mode_xml = spectator_mode_xml_binAsset;

    public static spec_top_left_png = spec_top_left_png_pngAsset;

    public static spec_top_middle_png = spec_top_middle_png_pngAsset;

    public static spec_top_right_png = spec_top_right_png_pngAsset;

    public static spec_middle_left_png = spec_middle_left_png_pngAsset;

    public static spec_middle_right_png = spec_middle_right_png_pngAsset;

    public static spec_bottom_left_png = spec_bottom_left_png_pngAsset;

    public static spec_bottom_middle_png = spec_bottom_middle_png_pngAsset;

    public static spec_bottom_right_png = spec_bottom_right_png_pngAsset;

    public static get requiredClasses(): any[] {
        HabboRoomUICom.#initStatics();
        return HabboRoomUICom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomUICom.#initStatics();
        HabboRoomUICom.requiredClasses = value;
    }

    public static chatinput_bubble_left = chatinput_bubble_left_pngAsset;

    public static chatinput_bubble_middle = chatinput_bubble_middle_pngAsset;

    public static chatinput_bubble_right = chatinput_bubble_right_pngAsset;

    public static packagecard_icon_hc = packagecard_icon_hc_pngAsset;

    public static packagecard_icon_floor = packagecard_icon_floor_pngAsset;

    public static packagecard_icon_landscape = packagecard_icon_landscape_pngAsset;

    public static packagecard_icon_wallpaper = packagecard_icon_wallpaper_pngAsset;

    public static stickie_blanco = stickie_blanco_pngAsset;

    public static stickie_close = stickie_close_pngAsset;

    public static stickie_remove = stickie_remove_pngAsset;

    public static stickie_vd = stickie_vd_pngAsset;

    public static stickie_xmas = stickie_xmas_pngAsset;

    public static stickie_dreams = stickie_dreams_pngAsset;

    public static stickie_juninas = stickie_juninas_pngAsset;

    public static stickie_shakesp = stickie_shakesp_pngAsset;

    public static trophy_bg_bronze = trophy_bg_bronze_pngAsset;

    public static trophy_bg_gold = trophy_bg_gold_pngAsset;

    public static trophy_bg_silver = trophy_bg_silver_pngAsset;

    public static dimmer_color_button = dimmer_color_button_pngAsset;

    public static dimmer_color_frame = dimmer_color_frame_pngAsset;

    public static dimmer_color_selected = dimmer_color_selected_pngAsset;

    public static dimmer_slider_base = dimmer_slider_base_pngAsset;

    public static dimmer_slider_button = dimmer_slider_button_pngAsset;

    public static dimmer_info = dimmer_info_pngAsset;

    public static icon_home = icon_home_pngAsset;

    public static icon_nft = icon_nft_pngAsset;

    public static badges_color = badges_color_pngAsset;

    public static badges_white = badges_white_pngAsset;

    public static clothes_color = clothes_color_pngAsset;

    public static clothes_highlighter = clothes_highlighter_pngAsset;

    public static clothes_white = clothes_white_pngAsset;

    public static clothes_highlighter_blue = clothes_highlighter_blue_pngAsset;

    public static dance_color = dance_color_pngAsset;

    public static dance_white = dance_white_pngAsset;

    public static effects_color = effects_color_pngAsset;

    public static effects_white = effects_white_pngAsset;

    public static gohome_color = gohome_color_pngAsset;

    public static gohome_white = gohome_white_pngAsset;

    public static compass_color = compass_color_pngAsset;

    public static compass_white = compass_white_pngAsset;

    public static memenu_fx_pause = memenu_fx_pause_pngAsset;

    public static memenu_fx_play = memenu_fx_play_pngAsset;

    public static wave_color = wave_color_pngAsset;

    public static wave_white = wave_white_pngAsset;

    public static settings_color = settings_color_pngAsset;

    public static settings_white = settings_white_pngAsset;

    public static sounds_off_color = sounds_off_color_pngAsset;

    public static sounds_off_white = sounds_off_white_pngAsset;

    public static sounds_on_color = sounds_on_color_pngAsset;

    public static sounds_on_white = sounds_on_white_pngAsset;

    public static achievements_color = achievements_color_pngAsset;

    public static achievements_white = achievements_white_pngAsset;

    public static lighthouse_color = lighthouse_color_pngAsset;

    public static lighthouse_white = lighthouse_white_pngAsset;

    public static memenu_settings_slider_base = memenu_settings_slider_base_pngAsset;

    public static memenu_settings_slider_button = memenu_settings_slider_button_pngAsset;

    public static icon_petrespect = icon_petrespect_pngAsset;

    public static icon_pet_skill = icon_pet_skill_pngAsset;

    public static icon_pet_wellbeing = icon_pet_wellbeing_pngAsset;

    public static jb_icon_composer = jb_icon_composer_pngAsset;

    public static jb_icon_disc = jb_icon_disc_pngAsset;

    public static small_pen = small_pen_pngAsset;

    public static credits_color = credits_color_pngAsset;

    public static credits_white = credits_white_pngAsset;

    public static minimail_color = minimail_color_pngAsset;

    public static minimail_white = minimail_white_pngAsset;

    public static club_color = club_color_pngAsset;

    public static club_white = club_white_pngAsset;

    public static vip_color = vip_color_pngAsset;

    public static vip_white = vip_white_pngAsset;

    public static icon_pet_energy = icon_pet_energy_pngAsset;

    public static icon_pet_experience = icon_pet_experience_pngAsset;

    public static icon_pet_happiness = icon_pet_happiness_pngAsset;

    public static edit_pen_icon = edit_pen_icon_pngAsset;

    public static icon_arrow = icon_arrow_pngAsset;

    public static icon_arrow_left = icon_arrow_left_pngAsset;

    public static icon_cd_big = icon_cd_big_pngAsset;

    public static icon_cd_small = icon_cd_small_pngAsset;

    public static icon_notes_small = icon_notes_small_pngAsset;

    public static icon_pause = icon_pause_pngAsset;

    public static icon_play = icon_play_pngAsset;

    public static icon_pause_large = icon_pause_large_pngAsset;

    public static icon_download = icon_download_pngAsset;

    public static title_fader = title_fader_pngAsset;

    public static profile_color = profile_color_pngAsset;

    public static profile_white = profile_white_pngAsset;

    public static chatinput_window = chatinput_window_binAsset;

    public static chatinput_window_new = chatinput_window_new_binAsset;

    public static chooser_item = chooser_item_binAsset;

    public static chooser_view = chooser_view_binAsset;

    public static new_furni_chooser_view = new_furni_chooser_view_binAsset;

    public static new_user_chooser_view = new_user_chooser_view_binAsset;

    public static doorbell = doorbell_binAsset;

    public static doorbell_list_entry = doorbell_list_entry_binAsset;

    public static credit_redeem = credit_redeem_binAsset;

    public static ecotronbox_card = ecotronbox_card_binAsset;

    public static ecotronbox_card_furnimatic = ecotronbox_card_furnimatic_binAsset;

    public static mystery_box_open_dialog = mystery_box_open_dialog_binAsset;

    public static mystery_box_reward = mystery_box_reward_binAsset;

    public static mystery_box_toolbar_extension = mystery_box_toolbar_extension_binAsset;

    public static petpackage = petpackage_binAsset;

    public static petpackage_new = petpackage_new_binAsset;

    public static placeholder = placeholder_binAsset;

    public static packagecard = packagecard_binAsset;

    public static packagecard_new = packagecard_new_binAsset;

    public static packagecard_info = packagecard_info_binAsset;

    public static packagecard_new_opened = packagecard_new_opened_binAsset;

    public static readonly gift_icon_background = gift_icon_background_pngAsset;

    public static readonly giftcard_blank = giftcard_blank_pngAsset;

    public static readonly gift_incognito = gift_incognito_pngAsset;

    public static stickie = stickie_binAsset;

    public static notification_teaser = notification_teaser_binAsset;

    public static notification_gift_locked = notification_gift_locked_binAsset;

    public static notification_gift_unlocked = notification_gift_unlocked_binAsset;

    public static notification_gift_unlocked_notify = notification_gift_unlocked_notify_binAsset;

    public static notification_gift_received = notification_gift_received_binAsset;

    public static notification_gift_alert = notification_gift_alert_binAsset;

    public static trophy = trophy_binAsset;

    public static niko_trophy = niko_trophy_binAsset;

    public static dimmer_ui = dimmer_ui_binAsset;

    public static dimmer_color_chooser_cell = color_chooser_cell_binAsset;

    public static badge_details = badge_details_binAsset;

    public static furni_view = furni_view_binAsset;

    public static furni_view_branding_element = furni_view_branding_element_binAsset;

    public static user_tag = user_tag_binAsset;

    public static user_tag_highlighted = user_tag_highlighted_binAsset;

    public static user_view = user_view_binAsset;

    public static bot_view = bot_view_binAsset;

    public static rentable_bot_view = rentable_bot_view_binAsset;

    public static badge_entity = badge_entity_binAsset;

    public static room_loading_bar = room_loading_bar_binAsset;

    public static memenu = memenu_binAsset;

    public static memenu_dance = memenu_dance_binAsset;

    public static memenu_dance_button = memenu_dance_button_binAsset;

    public static memenu_effect_inactive = memenu_effect_inactive_binAsset;

    public static memenu_effect_selected = memenu_effect_selected_binAsset;

    public static memenu_effect_unselected = memenu_effect_unselected_binAsset;

    public static memenu_effects = memenu_effects_binAsset;

    public static memenu_main = memenu_main_binAsset;

    public static memenu_main_simple = memenu_main_simple_binAsset;

    public static memenu_settings = memenu_settings_binAsset;

    public static memenu_settings_menu = memenu_settings_menu_binAsset;

    public static notification = notification_binAsset;

    public static room_queue = room_queue_binAsset;

    public static poll_offer = poll_offer_binAsset;

    public static poll_question = poll_question_binAsset;

    public static poll_answer_text_input = poll_answer_text_input_binAsset;

    public static poll_answer_checkbox_input = poll_answer_checkbox_input_binAsset;

    public static poll_answer_radiobutton_input = poll_answer_radiobutton_input_binAsset;

    public static poll_cancel_confirm = poll_cancel_confirm_binAsset;

    public static pet_commands = pet_commands_binAsset;

    public static pet_view = pet_view_binAsset;

    public static instant_friend_request = instant_friend_request_binAsset;

    public static boygirl = boygirl_binAsset;

    public static avatar_info_widget = avatar_info_widget_binAsset;

    public static avatar_menu_widget = avatar_menu_widget_binAsset;

    public static own_avatar_menu = own_avatar_menu_binAsset;

    public static own_avatar_decorating = own_avatar_decorating_binAsset;

    public static new_user_help = new_user_help_binAsset;

    public static own_pet_menu = own_pet_menu_binAsset;

    public static pet_menu = pet_menu_binAsset;

    public static use_product_menu = use_product_menu_binAsset;

    public static breed_pet_menu = breed_pet_menu_binAsset;

    public static breed_pets_confirmation_xml = breed_pets_confirmation_xml_binAsset;

    public static confirm_pet_breeding_xml = confirm_pet_breeding_xml_binAsset;

    public static pet_breeding_pet_preview_xml = pet_breeding_pet_preview_xml_binAsset;

    public static nestBreedingSuccess_xml = nestBreedingSuccess_xml_binAsset;

    public static breed_pets_result_xml = breed_pets_result_xml_binAsset;

    public static use_product_widget_frame_xml = use_product_widget_frame_xml_binAsset;

    public static use_product_controller_custom_part_xml = use_product_controller_custom_part_xml_binAsset;

    public static use_product_controller_shampoo_xml = use_product_controller_shampoo_xml_binAsset;

    public static use_product_controller_custom_part_shampoo_xml = use_product_controller_custom_part_shampoo_xml_binAsset;

    public static use_product_controller_saddle_xml = use_product_controller_saddle_xml_binAsset;

    public static use_product_widget_frame_monsterplant_xml = use_product_widget_frame_monsterplant_xml_binAsset;

    public static use_product_widget_frame_monsterplant_rebreed_xml = use_product_widget_frame_monsterplant_rebreed_xml_binAsset;

    public static use_product_widget_frame_monsterplant_fertilize_xml = use_product_widget_frame_monsterplant_fertilize_xml_binAsset;

    public static use_product_controller_revive_monsterplant_xml = use_product_controller_revive_monsterplant_xml_binAsset;

    public static use_product_controller_rebreed_monsterplant_xml = use_product_controller_rebreed_monsterplant_xml_binAsset;

    public static use_product_controller_fertilize_monsterplant_xml = use_product_controller_fertilize_monsterplant_xml_binAsset;

    public static use_product_preview_bg_png = breed_pets_preview_bg_png_pngAsset;

    public static breed_pets_preview_bg_png = breed_pets_preview_bg_png_pngAsset;

    public static plant_seed_preview_bg_png = breed_pets_preview_bg_png_pngAsset;

    public static plant_seed_preview_png = plant_seed_preview_png_pngAsset;

    public static minimized_menu = minimized_menu_binAsset;

    public static jukebox_view = jukebox_view_binAsset;

    public static crackable_furni_view = crackable_furni_view_binAsset;

    public static songdisk_view = songdisk_view_binAsset;

    public static playlisteditor_inventory_subwindow_get_more_music = playlisteditor_inventory_subwindow_get_more_music_binAsset;

    public static playlisteditor_inventory_subwindow_play_preview = playlisteditor_inventory_subwindow_play_preview_binAsset;

    public static playlisteditor_main_window = playlisteditor_main_window_binAsset;

    public static playlisteditor_music_inventory_item = playlisteditor_music_inventory_item_binAsset;

    public static playlisteditor_playlist_item = playlisteditor_playlist_item_binAsset;

    public static playlisteditor_playlist_subwindow_add_songs = playlisteditor_playlist_subwindow_add_songs_binAsset;

    public static playlisteditor_playlist_subwindow_nowplaying = playlisteditor_playlist_subwindow_nowplaying_binAsset;

    public static playlisteditor_playlist_subwindow_play_now = playlisteditor_playlist_subwindow_play_now_binAsset;

    public static effects_widget = effects_widget_binAsset;

    public static effect_selector = effect_selector_binAsset;

    public static mannequin_widget_frame_xml = mannequin_widget_frame_xml_binAsset;

    public static mannequin_controller_main_xml = mannequin_controller_main_xml_binAsset;

    public static mannequin_controller_save_xml = mannequin_controller_save_xml_binAsset;

    public static mannequin_peer_main_xml = mannequin_peer_main_xml_binAsset;

    public static mannequin_no_club_xml = mannequin_no_club_xml_binAsset;

    public static mannequin_wrong_gender_xml = mannequin_wrong_gender_xml_binAsset;

    public static mannequin_preview_bg_png = mannequin_preview_bg_png_pngAsset;

    public static guild_furni_menu = guild_furni_menu_binAsset;

    public static random_teleport_menu = random_teleport_menu_binAsset;

    public static monsterplant_seed_menu = monsterplant_seed_menu_binAsset;

    public static mysterybox_menu = mysterybox_menu_binAsset;

    public static use_product_widget_frame_plant_seed_xml = use_product_widget_frame_plant_seed_xml_binAsset;

    public static generic_usable_menu = generic_usable_menu_binAsset;

    public static effectbox_xml = effectbox_xml_binAsset;

    public static mysterytrophy_xml = mysterytrophy_xml_binAsset;

    public static use_product_controller_plant_seed_xml = use_product_controller_plant_seed_xml_binAsset;

    public static use_product_controller_purchasable_clothing_xml = use_product_controller_purchasable_clothing_xml_binAsset;

    public static sign_icon_heart = sign_icon_heart_pngAsset;

    public static sign_icon_skull = sign_icon_skull_pngAsset;

    public static sign_icon_13 = sign_icon_13_pngAsset;

    public static sign_icon_14 = sign_icon_14_pngAsset;

    public static sign_icon_15 = sign_icon_15_pngAsset;

    public static sign_icon_16 = sign_icon_16_pngAsset;

    public static sign_icon_17 = sign_icon_17_pngAsset;

    public static readonly pet_skill_level_0 = pet_skill_level_0_pngAsset;

    public static readonly pet_skill_level_1 = pet_skill_level_1_pngAsset;

    public static readonly pet_skill_level_2 = pet_skill_level_2_pngAsset;

    public static readonly pet_skill_level_3 = pet_skill_level_3_pngAsset;

    public static readonly pet_skill_level_4 = pet_skill_level_4_pngAsset;

    public static camera_interface_xml = camera_interface_xml_binAsset;

    public static photo_purchase_confirmation_xml = photo_purchase_confirmation_xml_binAsset;

    public static camera_editor_xml = camera_editor_xml_binAsset;

    public static camera_filterbutton_xml = camera_filterbutton_xml_binAsset;

    public static camera_typebutton_xml = camera_typebutton_xml_binAsset;

    public static background_color_ui_xml = background_color_ui_xml_binAsset;

    public static area_hide_ui_xml = area_hide_ui_xml_binAsset;

    public static viprequired_xml = viprequired_xml_binAsset;

    public static costumehopper_costumerequired_xml = costumehopper_costumerequired_xml_binAsset;

    public static respect_giving_failed_notification_xml = respect_giving_failed_notification_xml_binAsset;

    public static chatinput_chatstyle_template_xml = chatinput_chatstyle_template_xml_binAsset;

    public static chatinput_chatfontsize_template_xml = chatinput_chatfontsize_template_xml_binAsset;

    public static styleselector_menu_xml = styleselector_menu_xml_binAsset;

    public static styleselector_menu_new_xml = styleselector_menu_new_xml_binAsset;

    public static habbiconselector_menu_xml = habbiconselector_menu_xml_binAsset;

    public static chatter_configuration_xml = chatter_configuration_xml_binAsset;

    public static name_configuration_xml = name_configuration_xml_binAsset;

    public static lock_confirm_xml = lock_confirm_xml_binAsset;

    public static lovelock_engraving_xml = lovelock_engraving_xml_binAsset;

    public static habboween_engraving_xml = habboween_engraving_xml_binAsset;

    public static wildwest_engraving_xml = wildwest_engraving_xml_binAsset;

    public static friendfurni_menu = friendfurni_menu_binAsset;

    public static high_score_display_xml = high_score_display_xml_binAsset;

    public static custom_stack_height_xml = custom_stack_height_xml_binAsset;

    public static video_viewer_xml = video_viewer_xml_binAsset;

    public static rentablespace_xml = rentablespace_xml_binAsset;

    public static vimeo_viewer_xml = vimeo_viewer_xml_binAsset;

    public static room_tools_toolbar_xml = room_tools_toolbar_xml_binAsset;

    public static room_tools_info_xml = room_tools_info_xml_binAsset;

    public static stories_image_widget_xml = stories_image_widget_xml_binAsset;

    public static room_tools_history_xml = room_tools_history_xml_binAsset;

    public static room_tools_history_item_xml = room_tools_history_item_xml_binAsset;

    public static share_room_xml = share_room_xml_binAsset;

    public static report_photo_xml = report_photo_xml_binAsset;

    public static report_photo_poster_xml = report_photo_poster_xml_binAsset;

    public static wordquiz_question_xml = wordquiz_question_xml_binAsset;

    public static wordquiz_result_xml = wordquiz_result_xml_binAsset;

    public static wordquiz_like_xml = wordquiz_like_xml_binAsset;

    public static wordquiz_unlike_xml = wordquiz_unlike_xml_binAsset;

    public static ui_help_bubble = ui_help_bubble_binAsset;

    public static ui_help_modal = ui_help_modal_binAsset;

    public static iro_room_thumbnail_camera_xml = iro_room_thumbnail_camera_xml_binAsset;

    public static craftingwidget_xml = craftingwidget_xml_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomUICom.#staticsReady) return;
        HabboRoomUICom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomUICom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomUIBootstrap, RoomWidgetFactory, IIDHabboRoomUI]);
    }
}
