import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboFreeFlowChatBootstrap } from '@/com/sulake/bootstrap/HabboFreeFlowChatBootstrap';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboFreeFlowChatCom_manifest_binAsset = embedBytes("freeflowchat/HabboFreeFlowChatCom_manifest.bin");
const tray_bar_pngAsset = embedBitmap("freeflowchat/tray_bar.png");
const tray_handle_close_pngAsset = embedBitmap("freeflowchat/tray_handle_close.png");
const tray_handle_open_pngAsset = embedBitmap("freeflowchat/tray_handle_open.png");
const close_x_pngAsset = embedBitmap("shared/close_x.png");
const room_change_pngAsset = embedBitmap("freeflowchat/room_change.png");
const scrollbar_back_pngAsset = embedBitmap("freeflowchat/scrollbar_back.png");
const scrollbar_thumb_pngAsset = embedBitmap("freeflowchat/scrollbar_thumb.png");
const chatstyles_xml_binAsset = embedBytes("freeflowchat/chatstyles_xml.bin");
const style_bats_regpoints_binAsset = embedBytes("freeflowchat/style_bats_regpoints.bin");
const style_bats_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_bats_chat_bubble_base.png");
const style_bats_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_bats_chat_bubble_pointer.png");
const style_bats_selector_preview_pngAsset = embedBitmap("freeflowchat/style_bats_selector_preview.png");
const style_bot_regpoints_binAsset = embedBytes("freeflowchat/style_bot_regpoints.bin");
const style_bot_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_bot_chat_bubble_base.png");
const style_bot_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_bot_chat_bubble_pointer.png");
const style_console_regpoints_binAsset = embedBytes("freeflowchat/style_console_regpoints.bin");
const style_console_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_console_chat_bubble_base.png");
const style_console_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_console_chat_bubble_pointer.png");
const style_firingmylazer_regpoints_binAsset = embedBytes("freeflowchat/style_firingmylazer_regpoints.bin");
const style_firingmylazer_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_firingmylazer_chat_bubble_base.png");
const style_firingmylazer_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_firingmylazer_chat_bubble_pointer.png");
const style_firingmylazer_selector_preview_pngAsset = embedBitmap("freeflowchat/style_firingmylazer_selector_preview.png");
const style_fortune_teller_regpoints_binAsset = embedBytes("freeflowchat/style_fortune_teller_regpoints.bin");
const style_fortune_teller_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_fortune_teller_chat_bubble_base.png");
const style_fortune_teller_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_fortune_teller_chat_bubble_pointer.png");
const style_generic_regpoints_binAsset = embedBytes("freeflowchat/style_generic_regpoints.bin");
const style_generic_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_generic_chat_bubble_base.png");
const style_normal_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_chat_bubble_pointer.png");
const style_gothicrose_regpoints_binAsset = embedBytes("freeflowchat/style_gothicrose_regpoints.bin");
const style_gothicrose_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_gothicrose_chat_bubble_base.png");
const style_gothicrose_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_gothicrose_chat_bubble_pointer.png");
const style_gothicrose_selector_preview_pngAsset = embedBitmap("freeflowchat/style_gothicrose_selector_preview.png");
const style_normal_regpoints_binAsset = embedBytes("freeflowchat/style_normal_regpoints.bin");
const style_normal_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_chat_bubble_base.png");
const style_normal_chat_bubble_color_pngAsset = embedBitmap("freeflowchat/style_normal_chat_bubble_color.png");
const style_normal_selector_preview_pngAsset = embedBitmap("freeflowchat/style_normal_selector_preview.png");
const style_normal_blue_regpoints_binAsset = embedBytes("freeflowchat/style_normal_blue_regpoints.bin");
const style_normal_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_blue_chat_bubble_base.png");
const style_normal_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_blue_chat_bubble_pointer.png");
const style_normal_dark_yellow_regpoints_binAsset = embedBytes("freeflowchat/style_normal_dark_yellow_regpoints.bin");
const style_normal_dark_turquoise_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_dark_turquoise_chat_bubble_base.png");
const style_normal_dark_turquoise_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_dark_turquoise_chat_bubble_pointer.png");
const style_normal_dark_yellow_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_dark_yellow_chat_bubble_base.png");
const style_normal_dark_yellow_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_dark_yellow_chat_bubble_pointer.png");
const style_normal_red_regpoints_binAsset = embedBytes("freeflowchat/style_normal_red_regpoints.bin");
const style_normal_green_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_green_chat_bubble_base.png");
const style_normal_green_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_green_chat_bubble_pointer.png");
const style_normal_grey_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_grey_chat_bubble_base.png");
const style_normal_grey_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_grey_chat_bubble_pointer.png");
const style_normal_pink_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_pink_chat_bubble_base.png");
const style_normal_pink_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_pink_chat_bubble_pointer.png");
const style_normal_purple_regpoints_binAsset = embedBytes("freeflowchat/style_normal_purple_regpoints.bin");
const style_normal_purple_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_purple_chat_bubble_base.png");
const style_normal_purple_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_purple_chat_bubble_pointer.png");
const style_normal_red_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_red_chat_bubble_base.png");
const style_normal_red_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_red_chat_bubble_pointer.png");
const style_normal_sky_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_sky_blue_chat_bubble_base.png");
const style_normal_sky_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_sky_blue_chat_bubble_pointer.png");
const style_normal_yellow_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_normal_yellow_chat_bubble_base.png");
const style_normal_yellow_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_normal_yellow_chat_bubble_pointer.png");
const style_skeleton_regpoints_binAsset = embedBytes("freeflowchat/style_skeleton_regpoints.bin");
const style_skeleton_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_skeleton_chat_bubble_base.png");
const style_skeleton_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_skeleton_chat_bubble_pointer.png");
const style_skeleton_selector_preview_pngAsset = embedBitmap("freeflowchat/style_skeleton_selector_preview.png");
const style_staff_regpoints_binAsset = embedBytes("freeflowchat/style_staff_regpoints.bin");
const style_staff_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_staff_chat_bubble_base.png");
const style_staff_chat_bubble_emblem_pngAsset = embedBitmap("freeflowchat/style_staff_chat_bubble_emblem.png");
const style_staff_chat_bubble_emblem_multiline_pngAsset = embedBitmap("freeflowchat/style_staff_chat_bubble_emblem_multiline.png");
const style_staff_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_staff_chat_bubble_pointer.png");
const style_staff_selector_preview_pngAsset = embedBitmap("freeflowchat/style_staff_selector_preview.png");
const style_steampunk_pipe_regpoints_binAsset = embedBytes("freeflowchat/style_steampunk_pipe_regpoints.bin");
const style_steampunk_pipe_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_steampunk_pipe_chat_bubble_base.png");
const style_steampunk_pipe_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_steampunk_pipe_chat_bubble_pointer.png");
const style_steampunk_pipe_selector_preview_pngAsset = embedBitmap("freeflowchat/style_steampunk_pipe_selector_preview.png");
const style_storm_regpoints_binAsset = embedBytes("freeflowchat/style_storm_regpoints.bin");
const style_storm_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_storm_chat_bubble_base.png");
const style_storm_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_storm_chat_bubble_pointer.png");
const style_storm_selector_preview_pngAsset = embedBitmap("freeflowchat/style_storm_selector_preview.png");
const style_zombie_hand_regpoints_binAsset = embedBytes("freeflowchat/style_zombie_hand_regpoints.bin");
const style_zombie_hand_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_zombie_hand_chat_bubble_base.png");
const style_zombie_hand_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_zombie_hand_chat_bubble_pointer.png");
const style_zombie_hand_selector_preview_pngAsset = embedBitmap("freeflowchat/style_zombie_hand_selector_preview.png");
const style_wired_team_red_regpoints_binAsset = embedBytes("freeflowchat/style_wired_team_red_regpoints.bin");
const style_wired_team_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_wired_team_blue_chat_bubble_base.png");
const style_wired_team_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_wired_team_blue_chat_bubble_pointer.png");
const style_wired_team_blue_selector_preview_pngAsset = embedBitmap("freeflowchat/style_wired_team_blue_selector_preview.png");
const style_wired_team_green_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_wired_team_green_chat_bubble_base.png");
const style_wired_team_green_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_wired_team_green_chat_bubble_pointer.png");
const style_wired_team_green_selector_preview_pngAsset = embedBitmap("freeflowchat/style_wired_team_green_selector_preview.png");
const style_wired_team_red_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_wired_team_red_chat_bubble_base.png");
const style_wired_team_red_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_wired_team_red_chat_bubble_pointer.png");
const style_wired_team_red_selector_preview_pngAsset = embedBitmap("freeflowchat/style_wired_team_red_selector_preview.png");
const style_wired_team_yellow_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_wired_team_yellow_chat_bubble_base.png");
const style_wired_team_yellow_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_wired_team_yellow_chat_bubble_pointer.png");
const style_wired_team_yellow_selector_preview_pngAsset = embedBitmap("freeflowchat/style_wired_team_yellow_selector_preview.png");
const style_dragon_regpoints_binAsset = embedBytes("freeflowchat/style_dragon_regpoints.bin");
const style_dragon_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_dragon_chat_bubble_base.png");
const style_dragon_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_dragon_chat_bubble_pointer.png");
const style_dragon_selector_preview_pngAsset = embedBitmap("freeflowchat/style_dragon_selector_preview.png");
const style_hearts_regpoints_binAsset = embedBytes("freeflowchat/style_hearts_regpoints.bin");
const style_hearts_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_hearts_chat_bubble_base.png");
const style_hearts_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_hearts_chat_bubble_pointer.png");
const style_sausagedog_regpoints_binAsset = embedBytes("freeflowchat/style_sausagedog_regpoints.bin");
const style_sausagedog_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_sausagedog_chat_bubble_base.png");
const style_sausagedog_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_sausagedog_chat_bubble_pointer.png");
const style_sausagedog_selector_preview_pngAsset = embedBitmap("freeflowchat/style_sausagedog_selector_preview.png");
const style_piglet_regpoints_binAsset = embedBytes("freeflowchat/style_piglet_regpoints.bin");
const style_piglet_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_piglet_chat_bubble_base.png");
const style_piglet_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_piglet_chat_bubble_pointer.png");
const style_parrot_regpoints_binAsset = embedBytes("freeflowchat/style_parrot_regpoints.bin");
const style_parrot_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_parrot_chat_bubble_base.png");
const style_parrot_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_parrot_chat_bubble_pointer.png");
const style_pirate_regpoints_binAsset = embedBytes("freeflowchat/style_pirate_regpoints.bin");
const style_pirate_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_pirate_chat_bubble_base.png");
const style_pirate_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_pirate_chat_bubble_pointer.png");
const style_pirate_selector_preview_pngAsset = embedBitmap("freeflowchat/style_pirate_selector_preview.png");
const style_bot_guide_regpoints_binAsset = embedBytes("freeflowchat/style_bot_guide_regpoints.bin");
const style_bot_guide_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_bot_guide_chat_bubble_base.png");
const style_bot_guide_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_bot_guide_chat_bubble_pointer.png");
const style_bot_rentable_regpoints_binAsset = embedBytes("freeflowchat/style_bot_rentable_regpoints.bin");
const style_bot_rentable_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_bot_rentable_chat_bubble_base.png");
const style_bot_rentable_icon_pngAsset = embedBitmap("freeflowchat/style_bot_rentable_icon.png");
const style_skelestock_regpoints_binAsset = embedBytes("freeflowchat/style_skelestock_regpoints.bin");
const style_skelestock_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_skelestock_chat_bubble_base.png");
const style_skelestock_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_skelestock_chat_bubble_pointer.png");
const style_bot_frank_large_regpoints_binAsset = embedBytes("freeflowchat/style_bot_frank_large_regpoints.bin");
const style_bot_frank_large_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_bot_frank_large_chat_bubble_base.png");
const style_bot_frank_large_icon_pngAsset = embedBitmap("freeflowchat/style_bot_frank_large_icon.png");
const style_notification_regpoints_binAsset = embedBytes("freeflowchat/style_notification_regpoints.bin");
const style_notification_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_chat_bubble_base.png");
const style_notification_selector_preview_pngAsset = embedBitmap("freeflowchat/style_notification_selector_preview.png");
const style_notification_icon_pngAsset = embedBitmap("freeflowchat/style_notification_icon.png");
const style_notification_red_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_red_chat_bubble_base.png");
const style_notification_red_icon_pngAsset = embedBitmap("freeflowchat/style_notification_red_icon.png");
const style_notification_green_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_green_chat_bubble_base.png");
const style_notification_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_blue_chat_bubble_base.png");
const style_notification_alert_icon_pngAsset = embedBitmap("freeflowchat/style_notification_alert_icon.png");
const style_notification_info_icon_pngAsset = embedBitmap("freeflowchat/style_notification_info_icon.png");
const style_notification_warning_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_warning_chat_bubble_base.png");
const style_notification_warning_icon_pngAsset = embedBitmap("freeflowchat/style_notification_warning_icon.png");
const style_notification_wrong_icon_pngAsset = embedBitmap("freeflowchat/style_notification_wrong_icon.png");
const style_notification_wrong_circle_icon_pngAsset = embedBitmap("freeflowchat/style_notification_wrong_circle_icon.png");
const style_notification_correct_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_correct_chat_bubble_base.png");
const style_notification_correct_icon_pngAsset = embedBitmap("freeflowchat/style_notification_correct_icon.png");
const style_notification_correct_circle_icon_pngAsset = embedBitmap("freeflowchat/style_notification_correct_circle_icon.png");
const style_notification_question_mark_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_question_mark_chat_bubble_base.png");
const style_notification_question_mark_icon_pngAsset = embedBitmap("freeflowchat/style_notification_question_mark_icon.png");
const style_notification_question_mark_circle_icon_pngAsset = embedBitmap("freeflowchat/style_notification_question_mark_circle_icon.png");
const style_notification_arrow_up_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_up_chat_bubble_base.png");
const style_notification_arrow_up_icon_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_up_icon.png");
const style_notification_arrow_up_circle_icon_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_up_circle_icon.png");
const style_notification_arrow_down_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_down_chat_bubble_base.png");
const style_notification_arrow_down_icon_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_down_icon.png");
const style_notification_arrow_down_circle_icon_pngAsset = embedBitmap("freeflowchat/style_notification_arrow_down_circle_icon.png");
const style_notification_skull_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_skull_chat_bubble_base.png");
const style_notification_skull_icon_pngAsset = embedBitmap("freeflowchat/style_notification_skull_icon.png");
const style_notification_skull_2_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_skull_2_chat_bubble_base.png");
const style_notification_magnifier_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_notification_magnifier_chat_bubble_base.png");
const style_notification_magnifier_icon_pngAsset = embedBitmap("freeflowchat/style_notification_magnifier_icon.png");
const style_goat_regpoints_binAsset = embedBytes("freeflowchat/style_goat_regpoints.bin");
const style_goat_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_goat_chat_bubble_base.png");
const style_goat_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_goat_chat_bubble_pointer.png");
const style_radio_regpoints_binAsset = embedBytes("freeflowchat/style_radio_regpoints.bin");
const style_santa_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_santa_chat_bubble_base.png");
const style_santa_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_santa_chat_bubble_pointer.png");
const style_santa_selector_preview_pngAsset = embedBitmap("freeflowchat/style_santa_selector_preview.png");
const style_santa_icon_pngAsset = embedBitmap("freeflowchat/style_santa_icon.png");
const style_ambassador_regpoints_binAsset = embedBytes("freeflowchat/style_ambassador_regpoints.bin");
const style_ambassador_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_ambassador_chat_bubble_base.png");
const style_ambassador_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_ambassador_chat_bubble_pointer.png");
const style_snowstorm_red_regpoints_binAsset = embedBytes("freeflowchat/style_snowstorm_red_regpoints.bin");
const style_snowstorm_red_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_snowstorm_red_chat_bubble_base.png");
const style_snowstorm_red_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_snowstorm_red_chat_bubble_pointer.png");
const style_snowstorm_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_snowstorm_blue_chat_bubble_base.png");
const style_snowstorm_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_snowstorm_blue_chat_bubble_pointer.png");
const style_radio_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_radio_chat_bubble_base.png");
const style_radio_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_radio_chat_bubble_pointer.png");
const style_radio_selector_preview_pngAsset = embedBitmap("freeflowchat/style_radio_selector_preview.png");
const style_radio_icon_pngAsset = embedBitmap("freeflowchat/style_radio_icon.png");
const style_nft_habbo_avatar_bronze_regpoints_binAsset = embedBytes("freeflowchat/style_nft_habbo_avatar_bronze_regpoints.bin");
const style_nft_habbo_avatar_bronze_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_bronze_chat_bubble_base.png");
const style_nft_habbo_avatar_bronze_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_bronze_chat_bubble_pointer.png");
const style_nft_habbo_avatar_bronze_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_bronze_selector_preview.png");
const style_nft_habbo_avatar_gold_regpoints_binAsset = embedBytes("freeflowchat/style_nft_habbo_avatar_gold_regpoints.bin");
const style_nft_habbo_avatar_gold_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_gold_chat_bubble_base.png");
const style_nft_habbo_avatar_gold_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_gold_chat_bubble_pointer.png");
const style_nft_habbo_avatar_gold_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_gold_selector_preview.png");
const style_nft_habbo_avatar_diamond_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_diamond_chat_bubble_base.png");
const style_nft_habbo_avatar_diamond_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_diamond_chat_bubble_pointer.png");
const style_nft_habbo_avatar_diamond_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_diamond_selector_preview.png");
const style_nft_habbo_avatar_rainbow_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_rainbow_chat_bubble_base.png");
const style_nft_habbo_avatar_rainbow_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_rainbow_chat_bubble_pointer.png");
const style_nft_habbo_avatar_rainbow_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_rainbow_selector_preview.png");
const style_nft_habbo_avatar_trippy_regpoints_binAsset = embedBytes("freeflowchat/style_nft_habbo_avatar_trippy_regpoints.bin");
const style_nft_habbo_avatar_trippy_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_trippy_chat_bubble_base.png");
const style_nft_habbo_avatar_trippy_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_trippy_chat_bubble_pointer.png");
const style_nft_habbo_avatar_trippy_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_trippy_selector_preview.png");
const style_nft_habbo_avatar_ultra_trippy_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_ultra_trippy_chat_bubble_base.png");
const style_nft_habbo_avatar_ultra_trippy_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_ultra_trippy_chat_bubble_pointer.png");
const style_nft_habbo_avatar_ultra_trippy_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_habbo_avatar_ultra_trippy_selector_preview.png");
const style_nft_mvhq_regpoints_binAsset = embedBytes("freeflowchat/style_nft_mvhq_regpoints.bin");
const style_nft_mvhq_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_mvhq_chat_bubble_base.png");
const style_nft_mvhq_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_mvhq_chat_bubble_pointer.png");
const style_nft_metakey_regpoints_binAsset = embedBytes("freeflowchat/style_nft_metakey_regpoints.bin");
const style_nft_metakey_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_metakey_chat_bubble_base.png");
const style_nft_metakey_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_metakey_chat_bubble_pointer.png");
const style_nft_metakey_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_metakey_selector_preview.png");
const style_nft_crafted_habbo_avatar_regpoints_binAsset = embedBytes("freeflowchat/style_nft_crafted_habbo_avatar_regpoints.bin");
const style_nft_crafted_habbo_avatar_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_crafted_habbo_avatar_chat_bubble_base.png");
const style_nft_crafted_habbo_avatar_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_crafted_habbo_avatar_chat_bubble_pointer.png");
const style_nft_balloon_blue_regpoints_binAsset = embedBytes("freeflowchat/style_nft_balloon_blue_regpoints.bin");
const style_nft_balloon_orange_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_orange_chat_bubble_base.png");
const style_nft_balloon_orange_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_orange_chat_bubble_pointer.png");
const style_nft_balloon_orange_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_orange_selector_preview.png");
const style_nft_balloon_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_blue_chat_bubble_base.png");
const style_nft_balloon_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_blue_chat_bubble_pointer.png");
const style_nft_balloon_blue_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_balloon_blue_selector_preview.png");
const style_nft_origami_blue_regpoints_binAsset = embedBytes("freeflowchat/style_nft_origami_blue_regpoints.bin");
const style_nft_origami_orange_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_origami_orange_chat_bubble_base.png");
const style_nft_origami_orange_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_origami_orange_chat_bubble_pointer.png");
const style_nft_origami_orange_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_origami_orange_selector_preview.png");
const style_nft_origami_blue_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_origami_blue_chat_bubble_base.png");
const style_nft_origami_blue_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_origami_blue_chat_bubble_pointer.png");
const style_nft_origami_blue_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_origami_blue_selector_preview.png");
const style_nft_chocolate_dark_regpoints_binAsset = embedBytes("freeflowchat/style_nft_chocolate_dark_regpoints.bin");
const style_nft_chocolate_dark_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_dark_chat_bubble_base.png");
const style_nft_chocolate_dark_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_dark_chat_bubble_pointer.png");
const style_nft_chocolate_dark_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_dark_selector_preview.png");
const style_nft_chocolate_white_regpoints_binAsset = embedBytes("freeflowchat/style_nft_chocolate_white_regpoints.bin");
const style_nft_chocolate_white_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_white_chat_bubble_base.png");
const style_nft_chocolate_white_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_white_chat_bubble_pointer.png");
const style_nft_chocolate_white_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_chocolate_white_selector_preview.png");
const style_nft_clay_regpoints_binAsset = embedBytes("freeflowchat/style_nft_clay_regpoints.bin");
const style_nft_clay_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_clay_chat_bubble_base.png");
const style_nft_clay_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_clay_chat_bubble_pointer.png");
const style_nft_clay_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_clay_selector_preview.png");
const style_nft_scroll_regpoints_binAsset = embedBytes("freeflowchat/style_nft_scroll_regpoints.bin");
const style_nft_scroll_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_scroll_chat_bubble_base.png");
const style_nft_scroll_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_scroll_chat_bubble_pointer.png");
const style_nft_scroll_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_scroll_selector_preview.png");
const style_nft_pillow_regpoints_binAsset = embedBytes("freeflowchat/style_nft_pillow_regpoints.bin");
const style_nft_pillow_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_pillow_chat_bubble_base.png");
const style_nft_pillow_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_pillow_chat_bubble_pointer.png");
const style_nft_pillow_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_pillow_selector_preview.png");
const style_nft_bobba_regpoints_binAsset = embedBytes("freeflowchat/style_nft_bobba_regpoints.bin");
const style_nft_bobba_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_bobba_chat_bubble_base.png");
const style_nft_bobba_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_bobba_chat_bubble_pointer.png");
const style_nft_bobba_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_bobba_selector_preview.png");
const style_nft_pinktube_regpoints_binAsset = embedBytes("freeflowchat/style_nft_pinktube_regpoints.bin");
const style_nft_pinktube_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_pinktube_chat_bubble_base.png");
const style_nft_pinktube_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_pinktube_chat_bubble_pointer.png");
const style_nft_pinktube_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_pinktube_selector_preview.png");
const style_nft_keycaps_regpoints_binAsset = embedBytes("freeflowchat/style_nft_keycaps_regpoints.bin");
const style_nft_keycaps_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_keycaps_chat_bubble_base.png");
const style_nft_keycaps_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_keycaps_chat_bubble_pointer.png");
const style_nft_keycaps_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_keycaps_selector_preview.png");
const style_nft_xmas22_regpoints_binAsset = embedBytes("freeflowchat/style_nft_xmas22_regpoints.bin");
const style_nft_xmas22_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_xmas22_chat_bubble_base.png");
const style_nft_xmas22_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_xmas22_chat_bubble_pointer.png");
const style_nft_xmas22_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_xmas22_selector_preview.png");
const style_recycled_regpoints_binAsset = embedBytes("freeflowchat/style_recycled_regpoints.bin");
const style_recycled_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_recycled_chat_bubble_base.png");
const style_recycled_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_recycled_chat_bubble_pointer.png");
const style_recycled_selector_preview_pngAsset = embedBitmap("freeflowchat/style_recycled_selector_preview.png");
const style_paintsplatter_regpoints_binAsset = embedBytes("freeflowchat/style_paintsplatter_regpoints.bin");
const style_paintsplatter_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_paintsplatter_chat_bubble_base.png");
const style_paintsplatter_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_paintsplatter_chat_bubble_pointer.png");
const style_paintsplatter_selector_preview_pngAsset = embedBitmap("freeflowchat/style_paintsplatter_selector_preview.png");
const style_nft_rocky_regpoints_binAsset = embedBytes("freeflowchat/style_nft_rocky_regpoints.bin");
const style_nft_rocky_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_rocky_chat_bubble_base.png");
const style_nft_rocky_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_rocky_chat_bubble_pointer.png");
const style_nft_rocky_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_rocky_selector_preview.png");
const style_nft_ice_regpoints_binAsset = embedBytes("freeflowchat/style_nft_ice_regpoints.bin");
const style_nft_ice_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_ice_chat_bubble_base.png");
const style_nft_ice_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_ice_chat_bubble_pointer.png");
const style_nft_ice_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_ice_selector_preview.png");
const style_nft_aurora_regpoints_binAsset = embedBytes("freeflowchat/style_nft_aurora_regpoints.bin");
const style_nft_aurora_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_aurora_chat_bubble_base.png");
const style_nft_aurora_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_aurora_chat_bubble_pointer.png");
const style_nft_aurora_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_aurora_selector_preview.png");
const style_nft_money_regpoints_binAsset = embedBytes("freeflowchat/style_nft_money_regpoints.bin");
const style_nft_money_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_money_chat_bubble_base.png");
const style_nft_money_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_money_chat_bubble_pointer.png");
const style_nft_money_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_money_selector_preview.png");
const style_nft_goldbar_regpoints_binAsset = embedBytes("freeflowchat/style_nft_goldbar_regpoints.bin");
const style_nft_goldbar_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_nft_goldbar_chat_bubble_base.png");
const style_nft_goldbar_chat_bubble_pointer_pngAsset = embedBitmap("freeflowchat/style_nft_goldbar_chat_bubble_pointer.png");
const style_nft_goldbar_selector_preview_pngAsset = embedBitmap("freeflowchat/style_nft_goldbar_selector_preview.png");
const style_wired_link_speaker_regpoints_binAsset = embedBytes("freeflowchat/style_wired_link_speaker_regpoints.bin");
const style_wired_link_speaker_chat_bubble_base_pngAsset = embedBitmap("freeflowchat/style_wired_link_speaker_chat_bubble_base.png");
const style_wired_link_speaker_icon_pngAsset = embedBitmap("freeflowchat/style_wired_link_speaker_icon.png");
const style_wired_link_speaker_selector_preview_pngAsset = embedBitmap("freeflowchat/style_wired_link_speaker_selector_preview.png");

export class HabboFreeFlowChatCom extends SimpleApplication {
    static { registerClassName(this, 'HabboFreeFlowChatCom'); }

    static #staticsReady = false;

    public static manifest = HabboFreeFlowChatCom_manifest_binAsset;

    public static tray_bar = tray_bar_pngAsset;

    public static tray_handle_close = tray_handle_close_pngAsset;

    public static tray_handle_open = tray_handle_open_pngAsset;

    public static close_x = close_x_pngAsset;

    public static room_change = room_change_pngAsset;

    public static scrollbar_back = scrollbar_back_pngAsset;

    public static scrollbar_thumb = scrollbar_thumb_pngAsset;

    public static chatstyles_xml = chatstyles_xml_binAsset;

    public static style_bats_regpoints = style_bats_regpoints_binAsset;

    public static style_bats_chat_bubble_base = style_bats_chat_bubble_base_pngAsset;

    public static style_bats_chat_bubble_pointer = style_bats_chat_bubble_pointer_pngAsset;

    public static style_bats_selector_preview = style_bats_selector_preview_pngAsset;

    public static style_bot_regpoints = style_bot_regpoints_binAsset;

    public static style_bot_chat_bubble_base = style_bot_chat_bubble_base_pngAsset;

    public static style_bot_chat_bubble_pointer = style_bot_chat_bubble_pointer_pngAsset;

    public static style_bot_selector_preview = style_bot_chat_bubble_base_pngAsset;

    public static style_console_regpoints = style_console_regpoints_binAsset;

    public static style_console_chat_bubble_base = style_console_chat_bubble_base_pngAsset;

    public static style_console_chat_bubble_pointer = style_console_chat_bubble_pointer_pngAsset;

    public static style_console_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_firingmylazer_regpoints = style_firingmylazer_regpoints_binAsset;

    public static style_firingmylazer_chat_bubble_base = style_firingmylazer_chat_bubble_base_pngAsset;

    public static style_firingmylazer_chat_bubble_pointer = style_firingmylazer_chat_bubble_pointer_pngAsset;

    public static style_firingmylazer_selector_preview = style_firingmylazer_selector_preview_pngAsset;

    public static style_fortune_teller_regpoints = style_fortune_teller_regpoints_binAsset;

    public static style_fortune_teller_chat_bubble_base = style_fortune_teller_chat_bubble_base_pngAsset;

    public static style_fortune_teller_chat_bubble_pointer = style_fortune_teller_chat_bubble_pointer_pngAsset;

    public static style_fortune_teller_selector_preview = style_fortune_teller_chat_bubble_base_pngAsset;

    public static style_generic_regpoints = style_generic_regpoints_binAsset;

    public static style_generic_chat_bubble_base = style_generic_chat_bubble_base_pngAsset;

    public static style_generic_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_generic_selector_preview = style_generic_chat_bubble_base_pngAsset;

    public static style_gothicrose_regpoints = style_gothicrose_regpoints_binAsset;

    public static style_gothicrose_chat_bubble_base = style_gothicrose_chat_bubble_base_pngAsset;

    public static style_gothicrose_chat_bubble_pointer = style_gothicrose_chat_bubble_pointer_pngAsset;

    public static style_gothicrose_selector_preview = style_gothicrose_selector_preview_pngAsset;

    public static style_normal_regpoints = style_normal_regpoints_binAsset;

    public static style_normal_chat_bubble_base = style_normal_chat_bubble_base_pngAsset;

    public static style_normal_chat_bubble_color = style_normal_chat_bubble_color_pngAsset;

    public static style_normal_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_normal_selector_preview = style_normal_selector_preview_pngAsset;

    public static style_normal_blue_regpoints = style_normal_blue_regpoints_binAsset;

    public static style_normal_blue_chat_bubble_base = style_normal_blue_chat_bubble_base_pngAsset;

    public static style_normal_blue_chat_bubble_pointer = style_normal_blue_chat_bubble_pointer_pngAsset;

    public static style_normal_blue_selector_preview = style_normal_blue_chat_bubble_base_pngAsset;

    public static style_normal_dark_turquoise_regpoints = style_normal_dark_yellow_regpoints_binAsset;

    public static style_normal_dark_turquoise_chat_bubble_base = style_normal_dark_turquoise_chat_bubble_base_pngAsset;

    public static style_normal_dark_turquoise_chat_bubble_pointer = style_normal_dark_turquoise_chat_bubble_pointer_pngAsset;

    public static style_normal_dark_turquoise_selector_preview = style_normal_dark_turquoise_chat_bubble_base_pngAsset;

    public static style_normal_dark_yellow_regpoints = style_normal_dark_yellow_regpoints_binAsset;

    public static style_normal_dark_yellow_chat_bubble_base = style_normal_dark_yellow_chat_bubble_base_pngAsset;

    public static style_normal_dark_yellow_chat_bubble_pointer = style_normal_dark_yellow_chat_bubble_pointer_pngAsset;

    public static style_normal_dark_yellow_selector_preview = style_normal_dark_yellow_chat_bubble_base_pngAsset;

    public static style_normal_green_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_green_chat_bubble_base = style_normal_green_chat_bubble_base_pngAsset;

    public static style_normal_green_chat_bubble_pointer = style_normal_green_chat_bubble_pointer_pngAsset;

    public static style_normal_green_selector_preview = style_normal_green_chat_bubble_base_pngAsset;

    public static style_normal_grey_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_grey_chat_bubble_base = style_normal_grey_chat_bubble_base_pngAsset;

    public static style_normal_grey_chat_bubble_pointer = style_normal_grey_chat_bubble_pointer_pngAsset;

    public static style_normal_grey_selector_preview = style_normal_grey_chat_bubble_base_pngAsset;

    public static style_normal_pink_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_pink_chat_bubble_base = style_normal_pink_chat_bubble_base_pngAsset;

    public static style_normal_pink_chat_bubble_pointer = style_normal_pink_chat_bubble_pointer_pngAsset;

    public static style_normal_pink_selector_preview = style_normal_pink_chat_bubble_base_pngAsset;

    public static style_normal_purple_regpoints = style_normal_purple_regpoints_binAsset;

    public static style_normal_purple_chat_bubble_base = style_normal_purple_chat_bubble_base_pngAsset;

    public static style_normal_purple_chat_bubble_pointer = style_normal_purple_chat_bubble_pointer_pngAsset;

    public static style_normal_purple_selector_preview = style_normal_purple_chat_bubble_base_pngAsset;

    public static style_normal_red_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_red_chat_bubble_base = style_normal_red_chat_bubble_base_pngAsset;

    public static style_normal_red_chat_bubble_pointer = style_normal_red_chat_bubble_pointer_pngAsset;

    public static style_normal_red_selector_preview = style_normal_red_chat_bubble_base_pngAsset;

    public static style_normal_sky_blue_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_sky_blue_chat_bubble_base = style_normal_sky_blue_chat_bubble_base_pngAsset;

    public static style_normal_sky_blue_chat_bubble_pointer = style_normal_sky_blue_chat_bubble_pointer_pngAsset;

    public static style_normal_sky_blue_selector_preview = style_normal_sky_blue_chat_bubble_base_pngAsset;

    public static style_normal_yellow_regpoints = style_normal_red_regpoints_binAsset;

    public static style_normal_yellow_chat_bubble_base = style_normal_yellow_chat_bubble_base_pngAsset;

    public static style_normal_yellow_chat_bubble_pointer = style_normal_yellow_chat_bubble_pointer_pngAsset;

    public static style_normal_yellow_selector_preview = style_normal_yellow_chat_bubble_base_pngAsset;

    public static style_skeleton_regpoints = style_skeleton_regpoints_binAsset;

    public static style_skeleton_chat_bubble_base = style_skeleton_chat_bubble_base_pngAsset;

    public static style_skeleton_chat_bubble_pointer = style_skeleton_chat_bubble_pointer_pngAsset;

    public static style_skeleton_selector_preview = style_skeleton_selector_preview_pngAsset;

    public static style_staff_regpoints = style_staff_regpoints_binAsset;

    public static style_staff_chat_bubble_base = style_staff_chat_bubble_base_pngAsset;

    public static style_staff_chat_bubble_emblem = style_staff_chat_bubble_emblem_pngAsset;

    public static style_staff_chat_bubble_emblem_multiline = style_staff_chat_bubble_emblem_multiline_pngAsset;

    public static style_staff_chat_bubble_pointer = style_staff_chat_bubble_pointer_pngAsset;

    public static style_staff_selector_preview = style_staff_selector_preview_pngAsset;

    public static style_steampunk_pipe_regpoints = style_steampunk_pipe_regpoints_binAsset;

    public static style_steampunk_pipe_chat_bubble_base = style_steampunk_pipe_chat_bubble_base_pngAsset;

    public static style_steampunk_pipe_chat_bubble_pointer = style_steampunk_pipe_chat_bubble_pointer_pngAsset;

    public static style_steampunk_pipe_selector_preview = style_steampunk_pipe_selector_preview_pngAsset;

    public static style_storm_regpoints = style_storm_regpoints_binAsset;

    public static style_storm_chat_bubble_base = style_storm_chat_bubble_base_pngAsset;

    public static style_storm_chat_bubble_pointer = style_storm_chat_bubble_pointer_pngAsset;

    public static style_storm_selector_preview = style_storm_selector_preview_pngAsset;

    public static style_zombie_hand_regpoints = style_zombie_hand_regpoints_binAsset;

    public static style_zombie_hand_chat_bubble_base = style_zombie_hand_chat_bubble_base_pngAsset;

    public static style_zombie_hand_chat_bubble_pointer = style_zombie_hand_chat_bubble_pointer_pngAsset;

    public static style_zombie_hand_selector_preview = style_zombie_hand_selector_preview_pngAsset;

    public static style_wired_team_blue_regpoints = style_wired_team_red_regpoints_binAsset;

    public static style_wired_team_blue_chat_bubble_base = style_wired_team_blue_chat_bubble_base_pngAsset;

    public static style_wired_team_blue_chat_bubble_pointer = style_wired_team_blue_chat_bubble_pointer_pngAsset;

    public static style_wired_team_blue_selector_preview = style_wired_team_blue_selector_preview_pngAsset;

    public static style_wired_team_green_regpoints = style_wired_team_red_regpoints_binAsset;

    public static style_wired_team_green_chat_bubble_base = style_wired_team_green_chat_bubble_base_pngAsset;

    public static style_wired_team_green_chat_bubble_pointer = style_wired_team_green_chat_bubble_pointer_pngAsset;

    public static style_wired_team_green_selector_preview = style_wired_team_green_selector_preview_pngAsset;

    public static style_wired_team_red_regpoints = style_wired_team_red_regpoints_binAsset;

    public static style_wired_team_red_chat_bubble_base = style_wired_team_red_chat_bubble_base_pngAsset;

    public static style_wired_team_red_chat_bubble_pointer = style_wired_team_red_chat_bubble_pointer_pngAsset;

    public static style_wired_team_red_selector_preview = style_wired_team_red_selector_preview_pngAsset;

    public static style_wired_team_yellow_regpoints = style_wired_team_red_regpoints_binAsset;

    public static style_wired_team_yellow_chat_bubble_base = style_wired_team_yellow_chat_bubble_base_pngAsset;

    public static style_wired_team_yellow_chat_bubble_pointer = style_wired_team_yellow_chat_bubble_pointer_pngAsset;

    public static style_wired_team_yellow_selector_preview = style_wired_team_yellow_selector_preview_pngAsset;

    public static style_dragon_regpoints = style_dragon_regpoints_binAsset;

    public static style_dragon_chat_bubble_base = style_dragon_chat_bubble_base_pngAsset;

    public static style_dragon_chat_bubble_pointer = style_dragon_chat_bubble_pointer_pngAsset;

    public static style_dragon_selector_preview = style_dragon_selector_preview_pngAsset;

    public static style_hearts_regpoints = style_hearts_regpoints_binAsset;

    public static style_hearts_chat_bubble_base = style_hearts_chat_bubble_base_pngAsset;

    public static style_hearts_chat_bubble_pointer = style_hearts_chat_bubble_pointer_pngAsset;

    public static style_hearts_selector_preview = style_hearts_chat_bubble_base_pngAsset;

    public static style_sausagedog_regpoints = style_sausagedog_regpoints_binAsset;

    public static style_sausagedog_chat_bubble_base = style_sausagedog_chat_bubble_base_pngAsset;

    public static style_sausagedog_chat_bubble_pointer = style_sausagedog_chat_bubble_pointer_pngAsset;

    public static style_sausagedog_selector_preview = style_sausagedog_selector_preview_pngAsset;

    public static style_piglet_regpoints = style_piglet_regpoints_binAsset;

    public static style_piglet_chat_bubble_base = style_piglet_chat_bubble_base_pngAsset;

    public static style_piglet_chat_bubble_pointer = style_piglet_chat_bubble_pointer_pngAsset;

    public static style_piglet_selector_preview = style_piglet_chat_bubble_base_pngAsset;

    public static style_parrot_regpoints = style_parrot_regpoints_binAsset;

    public static style_parrot_chat_bubble_base = style_parrot_chat_bubble_base_pngAsset;

    public static style_parrot_chat_bubble_pointer = style_parrot_chat_bubble_pointer_pngAsset;

    public static style_parrot_selector_preview = style_parrot_chat_bubble_base_pngAsset;

    public static style_pirate_regpoints = style_pirate_regpoints_binAsset;

    public static style_pirate_chat_bubble_base = style_pirate_chat_bubble_base_pngAsset;

    public static style_pirate_chat_bubble_pointer = style_pirate_chat_bubble_pointer_pngAsset;

    public static style_pirate_selector_preview = style_pirate_selector_preview_pngAsset;

    public static style_bot_guide_regpoints = style_bot_guide_regpoints_binAsset;

    public static style_bot_guide_chat_bubble_base = style_bot_guide_chat_bubble_base_pngAsset;

    public static style_bot_guide_chat_bubble_pointer = style_bot_guide_chat_bubble_pointer_pngAsset;

    public static style_bot_guide_selector_preview = style_bot_guide_chat_bubble_base_pngAsset;

    public static style_bot_rentable_regpoints = style_bot_rentable_regpoints_binAsset;

    public static style_bot_rentable_chat_bubble_base = style_bot_rentable_chat_bubble_base_pngAsset;

    public static style_bot_rentable_chat_bubble_pointer = style_bot_chat_bubble_pointer_pngAsset;

    public static style_bot_rentable_selector_preview = style_bot_chat_bubble_base_pngAsset;

    public static style_bot_rentable_icon = style_bot_rentable_icon_pngAsset;

    public static style_skelestock_regpoints = style_skelestock_regpoints_binAsset;

    public static style_skelestock_chat_bubble_base = style_skelestock_chat_bubble_base_pngAsset;

    public static style_skelestock_chat_bubble_pointer = style_skelestock_chat_bubble_pointer_pngAsset;

    public static style_skelestock_selector_preview = style_skelestock_chat_bubble_base_pngAsset;

    public static style_bot_frank_large_regpoints = style_bot_frank_large_regpoints_binAsset;

    public static style_bot_frank_large_chat_bubble_base = style_bot_frank_large_chat_bubble_base_pngAsset;

    public static style_bot_frank_large_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_bot_frank_large_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_bot_frank_large_icon = style_bot_frank_large_icon_pngAsset;

    public static style_notification_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_chat_bubble_base = style_notification_chat_bubble_base_pngAsset;

    public static style_notification_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_selector_preview = style_notification_selector_preview_pngAsset;

    public static style_notification_icon = style_notification_icon_pngAsset;

    public static style_notification_red_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_red_chat_bubble_base = style_notification_red_chat_bubble_base_pngAsset;

    public static style_notification_red_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_red_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_red_icon = style_notification_red_icon_pngAsset;

    public static style_notification_green_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_green_chat_bubble_base = style_notification_green_chat_bubble_base_pngAsset;

    public static style_notification_green_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_green_selector_preview = style_notification_selector_preview_pngAsset;

    public static style_notification_green_icon = style_notification_icon_pngAsset;

    public static style_notification_blue_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_blue_chat_bubble_base = style_notification_blue_chat_bubble_base_pngAsset;

    public static style_notification_blue_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_blue_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_blue_icon = style_notification_red_icon_pngAsset;

    public static style_notification_alert_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_alert_chat_bubble_base = style_notification_red_chat_bubble_base_pngAsset;

    public static style_notification_alert_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_alert_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_alert_icon = style_notification_alert_icon_pngAsset;

    public static style_notification_info_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_info_chat_bubble_base = style_notification_blue_chat_bubble_base_pngAsset;

    public static style_notification_info_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_info_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_info_icon = style_notification_info_icon_pngAsset;

    public static style_notification_warning_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_warning_chat_bubble_base = style_notification_warning_chat_bubble_base_pngAsset;

    public static style_notification_warning_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_warning_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_warning_icon = style_notification_warning_icon_pngAsset;

    public static style_notification_wrong_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_wrong_chat_bubble_base = style_notification_red_chat_bubble_base_pngAsset;

    public static style_notification_wrong_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_wrong_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_wrong_icon = style_notification_wrong_icon_pngAsset;

    public static style_notification_wrong_circle_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_wrong_circle_chat_bubble_base = style_notification_red_chat_bubble_base_pngAsset;

    public static style_notification_wrong_circle_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_wrong_circle_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_wrong_circle_icon = style_notification_wrong_circle_icon_pngAsset;

    public static style_notification_correct_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_correct_chat_bubble_base = style_notification_correct_chat_bubble_base_pngAsset;

    public static style_notification_correct_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_correct_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_correct_icon = style_notification_correct_icon_pngAsset;

    public static style_notification_correct_circle_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_correct_circle_chat_bubble_base = style_notification_correct_chat_bubble_base_pngAsset;

    public static style_notification_correct_circle_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_correct_circle_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_correct_circle_icon = style_notification_correct_circle_icon_pngAsset;

    public static style_notification_question_mark_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_question_mark_chat_bubble_base = style_notification_question_mark_chat_bubble_base_pngAsset;

    public static style_notification_question_mark_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_question_mark_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_question_mark_icon = style_notification_question_mark_icon_pngAsset;

    public static style_notification_question_mark_circle_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_question_mark_circle_chat_bubble_base = style_notification_question_mark_chat_bubble_base_pngAsset;

    public static style_notification_question_mark_circle_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_question_mark_circle_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_question_mark_circle_icon = style_notification_question_mark_circle_icon_pngAsset;

    public static style_notification_arrow_up_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_arrow_up_chat_bubble_base = style_notification_arrow_up_chat_bubble_base_pngAsset;

    public static style_notification_arrow_up_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_arrow_up_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_arrow_up_icon = style_notification_arrow_up_icon_pngAsset;

    public static style_notification_arrow_up_circle_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_arrow_up_circle_chat_bubble_base = style_notification_arrow_up_chat_bubble_base_pngAsset;

    public static style_notification_arrow_up_circle_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_arrow_up_circle_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_arrow_up_circle_icon = style_notification_arrow_up_circle_icon_pngAsset;

    public static style_notification_arrow_down_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_arrow_down_chat_bubble_base = style_notification_arrow_down_chat_bubble_base_pngAsset;

    public static style_notification_arrow_down_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_arrow_down_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_arrow_down_icon = style_notification_arrow_down_icon_pngAsset;

    public static style_notification_arrow_down_circle_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_arrow_down_circle_chat_bubble_base = style_notification_arrow_down_chat_bubble_base_pngAsset;

    public static style_notification_arrow_down_circle_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_arrow_down_circle_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_arrow_down_circle_icon = style_notification_arrow_down_circle_icon_pngAsset;

    public static style_notification_skull_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_skull_chat_bubble_base = style_notification_skull_chat_bubble_base_pngAsset;

    public static style_notification_skull_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_skull_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_skull_icon = style_notification_skull_icon_pngAsset;

    public static style_notification_skull_2_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_skull_2_chat_bubble_base = style_notification_skull_2_chat_bubble_base_pngAsset;

    public static style_notification_skull_2_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_skull_2_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_skull_2_icon = style_notification_skull_icon_pngAsset;

    public static style_notification_magnifier_regpoints = style_notification_regpoints_binAsset;

    public static style_notification_magnifier_chat_bubble_base = style_notification_magnifier_chat_bubble_base_pngAsset;

    public static style_notification_magnifier_chat_bubble_pointer = style_normal_chat_bubble_pointer_pngAsset;

    public static style_notification_magnifier_selector_preview = style_console_chat_bubble_base_pngAsset;

    public static style_notification_magnifier_icon = style_notification_magnifier_icon_pngAsset;

    public static style_goat_regpoints = style_goat_regpoints_binAsset;

    public static style_goat_chat_bubble_base = style_goat_chat_bubble_base_pngAsset;

    public static style_goat_chat_bubble_pointer = style_goat_chat_bubble_pointer_pngAsset;

    public static style_goat_selector_preview = style_goat_chat_bubble_base_pngAsset;

    public static style_santa_regpoints = style_radio_regpoints_binAsset;

    public static style_santa_chat_bubble_base = style_santa_chat_bubble_base_pngAsset;

    public static style_santa_chat_bubble_pointer = style_santa_chat_bubble_pointer_pngAsset;

    public static style_santa_selector_preview = style_santa_selector_preview_pngAsset;

    public static style_santa_icon = style_santa_icon_pngAsset;

    public static style_ambassador_regpoints = style_ambassador_regpoints_binAsset;

    public static style_ambassador_chat_bubble_base = style_ambassador_chat_bubble_base_pngAsset;

    public static style_ambassador_chat_bubble_pointer = style_ambassador_chat_bubble_pointer_pngAsset;

    public static style_ambassador_selector_preview = style_ambassador_chat_bubble_base_pngAsset;

    public static style_snowstorm_red_regpoints = style_snowstorm_red_regpoints_binAsset;

    public static style_snowstorm_red_chat_bubble_base = style_snowstorm_red_chat_bubble_base_pngAsset;

    public static style_snowstorm_red_chat_bubble_pointer = style_snowstorm_red_chat_bubble_pointer_pngAsset;

    public static style_snowstorm_red_selector_preview = style_snowstorm_red_chat_bubble_base_pngAsset;

    public static style_snowstorm_blue_regpoints = style_snowstorm_red_regpoints_binAsset;

    public static style_snowstorm_blue_chat_bubble_base = style_snowstorm_blue_chat_bubble_base_pngAsset;

    public static style_snowstorm_blue_chat_bubble_pointer = style_snowstorm_blue_chat_bubble_pointer_pngAsset;

    public static style_snowstorm_blue_selector_preview = style_snowstorm_blue_chat_bubble_base_pngAsset;

    public static style_radio_regpoints = style_radio_regpoints_binAsset;

    public static style_radio_chat_bubble_base = style_radio_chat_bubble_base_pngAsset;

    public static style_radio_chat_bubble_pointer = style_radio_chat_bubble_pointer_pngAsset;

    public static style_radio_selector_preview = style_radio_selector_preview_pngAsset;

    public static style_radio_icon = style_radio_icon_pngAsset;

    public static style_nft_habbo_avatar_bronze_regpoints = style_nft_habbo_avatar_bronze_regpoints_binAsset;

    public static style_nft_habbo_avatar_bronze_chat_bubble_base = style_nft_habbo_avatar_bronze_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_bronze_chat_bubble_pointer = style_nft_habbo_avatar_bronze_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_bronze_selector_preview = style_nft_habbo_avatar_bronze_selector_preview_pngAsset;

    public static style_nft_habbo_avatar_gold_regpoints = style_nft_habbo_avatar_gold_regpoints_binAsset;

    public static style_nft_habbo_avatar_gold_chat_bubble_base = style_nft_habbo_avatar_gold_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_gold_chat_bubble_pointer = style_nft_habbo_avatar_gold_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_gold_selector_preview = style_nft_habbo_avatar_gold_selector_preview_pngAsset;

    public static style_nft_habbo_avatar_diamond_regpoints = style_nft_habbo_avatar_gold_regpoints_binAsset;

    public static style_nft_habbo_avatar_diamond_chat_bubble_base = style_nft_habbo_avatar_diamond_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_diamond_chat_bubble_pointer = style_nft_habbo_avatar_diamond_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_diamond_selector_preview = style_nft_habbo_avatar_diamond_selector_preview_pngAsset;

    public static style_nft_habbo_avatar_rainbow_regpoints = style_nft_habbo_avatar_gold_regpoints_binAsset;

    public static style_nft_habbo_avatar_rainbow_chat_bubble_base = style_nft_habbo_avatar_rainbow_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_rainbow_chat_bubble_pointer = style_nft_habbo_avatar_rainbow_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_rainbow_selector_preview = style_nft_habbo_avatar_rainbow_selector_preview_pngAsset;

    public static style_nft_habbo_avatar_trippy_regpoints = style_nft_habbo_avatar_trippy_regpoints_binAsset;

    public static style_nft_habbo_avatar_trippy_chat_bubble_base = style_nft_habbo_avatar_trippy_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_trippy_chat_bubble_pointer = style_nft_habbo_avatar_trippy_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_trippy_selector_preview = style_nft_habbo_avatar_trippy_selector_preview_pngAsset;

    public static style_nft_habbo_avatar_ultra_trippy_regpoints = style_nft_habbo_avatar_trippy_regpoints_binAsset;

    public static style_nft_habbo_avatar_ultra_trippy_chat_bubble_base = style_nft_habbo_avatar_ultra_trippy_chat_bubble_base_pngAsset;

    public static style_nft_habbo_avatar_ultra_trippy_chat_bubble_pointer = style_nft_habbo_avatar_ultra_trippy_chat_bubble_pointer_pngAsset;

    public static style_nft_habbo_avatar_ultra_trippy_selector_preview = style_nft_habbo_avatar_ultra_trippy_selector_preview_pngAsset;

    public static style_nft_mvhq_regpoints = style_nft_mvhq_regpoints_binAsset;

    public static style_nft_mvhq_chat_bubble_base = style_nft_mvhq_chat_bubble_base_pngAsset;

    public static style_nft_mvhq_chat_bubble_pointer = style_nft_mvhq_chat_bubble_pointer_pngAsset;

    public static style_nft_mvhq_selector_preview = style_nft_mvhq_chat_bubble_base_pngAsset;

    public static style_nft_metakey_regpoints = style_nft_metakey_regpoints_binAsset;

    public static style_nft_metakey_chat_bubble_base = style_nft_metakey_chat_bubble_base_pngAsset;

    public static style_nft_metakey_chat_bubble_pointer = style_nft_metakey_chat_bubble_pointer_pngAsset;

    public static style_nft_metakey_selector_preview = style_nft_metakey_selector_preview_pngAsset;

    public static style_nft_crafted_habbo_avatar_regpoints = style_nft_crafted_habbo_avatar_regpoints_binAsset;

    public static style_nft_crafted_habbo_avatar_chat_bubble_base = style_nft_crafted_habbo_avatar_chat_bubble_base_pngAsset;

    public static style_nft_crafted_habbo_avatar_chat_bubble_pointer = style_nft_crafted_habbo_avatar_chat_bubble_pointer_pngAsset;

    public static style_nft_crafted_habbo_avatar_selector_preview = style_nft_crafted_habbo_avatar_chat_bubble_base_pngAsset;

    public static style_nft_balloon_orange_regpoints = style_nft_balloon_blue_regpoints_binAsset;

    public static style_nft_balloon_orange_chat_bubble_base = style_nft_balloon_orange_chat_bubble_base_pngAsset;

    public static style_nft_balloon_orange_chat_bubble_pointer = style_nft_balloon_orange_chat_bubble_pointer_pngAsset;

    public static style_nft_balloon_orange_selector_preview = style_nft_balloon_orange_selector_preview_pngAsset;

    public static style_nft_balloon_blue_regpoints = style_nft_balloon_blue_regpoints_binAsset;

    public static style_nft_balloon_blue_chat_bubble_base = style_nft_balloon_blue_chat_bubble_base_pngAsset;

    public static style_nft_balloon_blue_chat_bubble_pointer = style_nft_balloon_blue_chat_bubble_pointer_pngAsset;

    public static style_nft_balloon_blue_selector_preview = style_nft_balloon_blue_selector_preview_pngAsset;

    public static style_nft_origami_orange_regpoints = style_nft_origami_blue_regpoints_binAsset;

    public static style_nft_origami_orange_chat_bubble_base = style_nft_origami_orange_chat_bubble_base_pngAsset;

    public static style_nft_origami_orange_chat_bubble_pointer = style_nft_origami_orange_chat_bubble_pointer_pngAsset;

    public static style_nft_origami_orange_selector_preview = style_nft_origami_orange_selector_preview_pngAsset;

    public static style_nft_origami_blue_regpoints = style_nft_origami_blue_regpoints_binAsset;

    public static style_nft_origami_blue_chat_bubble_base = style_nft_origami_blue_chat_bubble_base_pngAsset;

    public static style_nft_origami_blue_chat_bubble_pointer = style_nft_origami_blue_chat_bubble_pointer_pngAsset;

    public static style_nft_origami_blue_selector_preview = style_nft_origami_blue_selector_preview_pngAsset;

    public static style_nft_chocolate_dark_regpoints = style_nft_chocolate_dark_regpoints_binAsset;

    public static style_nft_chocolate_dark_chat_bubble_base = style_nft_chocolate_dark_chat_bubble_base_pngAsset;

    public static style_nft_chocolate_dark_chat_bubble_pointer = style_nft_chocolate_dark_chat_bubble_pointer_pngAsset;

    public static style_nft_chocolate_dark_selector_preview = style_nft_chocolate_dark_selector_preview_pngAsset;

    public static style_nft_chocolate_white_regpoints = style_nft_chocolate_white_regpoints_binAsset;

    public static style_nft_chocolate_white_chat_bubble_base = style_nft_chocolate_white_chat_bubble_base_pngAsset;

    public static style_nft_chocolate_white_chat_bubble_pointer = style_nft_chocolate_white_chat_bubble_pointer_pngAsset;

    public static style_nft_chocolate_white_selector_preview = style_nft_chocolate_white_selector_preview_pngAsset;

    public static style_nft_clay_regpoints = style_nft_clay_regpoints_binAsset;

    public static style_nft_clay_chat_bubble_base = style_nft_clay_chat_bubble_base_pngAsset;

    public static style_nft_clay_chat_bubble_pointer = style_nft_clay_chat_bubble_pointer_pngAsset;

    public static style_nft_clay_selector_preview = style_nft_clay_selector_preview_pngAsset;

    public static style_nft_scroll_regpoints = style_nft_scroll_regpoints_binAsset;

    public static style_nft_scroll_chat_bubble_base = style_nft_scroll_chat_bubble_base_pngAsset;

    public static style_nft_scroll_chat_bubble_pointer = style_nft_scroll_chat_bubble_pointer_pngAsset;

    public static style_nft_scroll_selector_preview = style_nft_scroll_selector_preview_pngAsset;

    public static style_nft_pillow_regpoints = style_nft_pillow_regpoints_binAsset;

    public static style_nft_pillow_chat_bubble_base = style_nft_pillow_chat_bubble_base_pngAsset;

    public static style_nft_pillow_chat_bubble_pointer = style_nft_pillow_chat_bubble_pointer_pngAsset;

    public static style_nft_pillow_selector_preview = style_nft_pillow_selector_preview_pngAsset;

    public static style_nft_bobba_regpoints = style_nft_bobba_regpoints_binAsset;

    public static style_nft_bobba_chat_bubble_base = style_nft_bobba_chat_bubble_base_pngAsset;

    public static style_nft_bobba_chat_bubble_pointer = style_nft_bobba_chat_bubble_pointer_pngAsset;

    public static style_nft_bobba_selector_preview = style_nft_bobba_selector_preview_pngAsset;

    public static style_nft_pinktube_regpoints = style_nft_pinktube_regpoints_binAsset;

    public static style_nft_pinktube_chat_bubble_base = style_nft_pinktube_chat_bubble_base_pngAsset;

    public static style_nft_pinktube_chat_bubble_pointer = style_nft_pinktube_chat_bubble_pointer_pngAsset;

    public static style_nft_pinktube_selector_preview = style_nft_pinktube_selector_preview_pngAsset;

    public static style_nft_keycaps_regpoints = style_nft_keycaps_regpoints_binAsset;

    public static style_nft_keycaps_chat_bubble_base = style_nft_keycaps_chat_bubble_base_pngAsset;

    public static style_nft_keycaps_chat_bubble_pointer = style_nft_keycaps_chat_bubble_pointer_pngAsset;

    public static style_nft_keycaps_selector_preview = style_nft_keycaps_selector_preview_pngAsset;

    public static style_nft_xmas22_regpoints = style_nft_xmas22_regpoints_binAsset;

    public static style_nft_xmas22_chat_bubble_base = style_nft_xmas22_chat_bubble_base_pngAsset;

    public static style_nft_xmas22_chat_bubble_pointer = style_nft_xmas22_chat_bubble_pointer_pngAsset;

    public static style_nft_xmas22_selector_preview = style_nft_xmas22_selector_preview_pngAsset;

    public static style_recycled_regpoints = style_recycled_regpoints_binAsset;

    public static style_recycled_chat_bubble_base = style_recycled_chat_bubble_base_pngAsset;

    public static style_recycled_chat_bubble_pointer = style_recycled_chat_bubble_pointer_pngAsset;

    public static style_recycled_selector_preview = style_recycled_selector_preview_pngAsset;

    public static style_paintsplatter_regpoints = style_paintsplatter_regpoints_binAsset;

    public static style_paintsplatter_chat_bubble_base = style_paintsplatter_chat_bubble_base_pngAsset;

    public static style_paintsplatter_chat_bubble_pointer = style_paintsplatter_chat_bubble_pointer_pngAsset;

    public static style_paintsplatter_selector_preview = style_paintsplatter_selector_preview_pngAsset;

    public static style_nft_rocky_regpoints = style_nft_rocky_regpoints_binAsset;

    public static style_nft_rocky_chat_bubble_base = style_nft_rocky_chat_bubble_base_pngAsset;

    public static style_nft_rocky_chat_bubble_pointer = style_nft_rocky_chat_bubble_pointer_pngAsset;

    public static style_nft_rocky_selector_preview = style_nft_rocky_selector_preview_pngAsset;

    public static style_nft_ice_regpoints = style_nft_ice_regpoints_binAsset;

    public static style_nft_ice_chat_bubble_base = style_nft_ice_chat_bubble_base_pngAsset;

    public static style_nft_ice_chat_bubble_pointer = style_nft_ice_chat_bubble_pointer_pngAsset;

    public static style_nft_ice_selector_preview = style_nft_ice_selector_preview_pngAsset;

    public static style_nft_aurora_regpoints = style_nft_aurora_regpoints_binAsset;

    public static style_nft_aurora_chat_bubble_base = style_nft_aurora_chat_bubble_base_pngAsset;

    public static style_nft_aurora_chat_bubble_pointer = style_nft_aurora_chat_bubble_pointer_pngAsset;

    public static style_nft_aurora_selector_preview = style_nft_aurora_selector_preview_pngAsset;

    public static style_nft_money_regpoints = style_nft_money_regpoints_binAsset;

    public static style_nft_money_chat_bubble_base = style_nft_money_chat_bubble_base_pngAsset;

    public static style_nft_money_chat_bubble_pointer = style_nft_money_chat_bubble_pointer_pngAsset;

    public static style_nft_money_selector_preview = style_nft_money_selector_preview_pngAsset;

    public static style_nft_goldbar_regpoints = style_nft_goldbar_regpoints_binAsset;

    public static style_nft_goldbar_chat_bubble_base = style_nft_goldbar_chat_bubble_base_pngAsset;

    public static style_nft_goldbar_chat_bubble_pointer = style_nft_goldbar_chat_bubble_pointer_pngAsset;

    public static style_nft_goldbar_selector_preview = style_nft_goldbar_selector_preview_pngAsset;

    public static style_wired_link_speaker_regpoints = style_wired_link_speaker_regpoints_binAsset;

    public static style_wired_link_speaker_chat_bubble_base = style_wired_link_speaker_chat_bubble_base_pngAsset;

    public static style_wired_link_speaker_icon = style_wired_link_speaker_icon_pngAsset;

    public static style_wired_link_speaker_selector_preview = style_wired_link_speaker_selector_preview_pngAsset;

    public static get requiredClasses(): any[] {
        HabboFreeFlowChatCom.#initStatics();
        return HabboFreeFlowChatCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboFreeFlowChatCom.#initStatics();
        HabboFreeFlowChatCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboFreeFlowChatCom.#staticsReady) return;
        HabboFreeFlowChatCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboFreeFlowChatCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboFreeFlowChatBootstrap, IIDHabboFreeFlowChat]);
    }
}
