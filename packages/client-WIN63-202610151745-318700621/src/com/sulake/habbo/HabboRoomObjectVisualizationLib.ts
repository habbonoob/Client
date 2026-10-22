import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomObjectVisualizationFactoryBootstrap } from '@/com/sulake/bootstrap/RoomObjectVisualizationFactoryBootstrap';
import { IIDRoomObjectVisualizationFactory } from '@/com/sulake/iid/IIDRoomObjectVisualizationFactory';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomObjectVisualizationLib_manifest_binAsset = embedBytes("room/HabboRoomObjectVisualizationLib_manifest.bin");
const pet_experience_bubble_png_pngAsset = embedBitmap("shared/pet_experience_bubble_png.png");
const snowball_small_png_pngAsset = embedBitmap("room/snowball_small_png.png");
const snowball_small_shadow_png_pngAsset = embedBitmap("room/snowball_small_shadow_png.png");
const snowball_big_png_pngAsset = embedBitmap("room/snowball_big_png.png");
const snowball_splash_1_pngAsset = embedBitmap("room/snowball_splash_1.png");
const snowball_splash_2_pngAsset = embedBitmap("room/snowball_splash_2.png");
const snowball_splash_3_pngAsset = embedBitmap("room/snowball_splash_3.png");
const variablefx_arrow_bar_background_pngAsset = embedBitmap("room/variablefx_arrow_bar_background.png");
const variablefx_arrow_bar_chunk_pngAsset = embedBitmap("room/variablefx_arrow_bar_chunk.png");
const variablefx_arrow_bar_darkening_pngAsset = embedBitmap("room/variablefx_arrow_bar_darkening.png");
const variablefx_arrow_bar_lighting_pngAsset = embedBitmap("room/variablefx_arrow_bar_lighting.png");
const variablefx_arrow_bar_metallic_pngAsset = embedBitmap("room/variablefx_arrow_bar_metallic.png");
const variablefx_arrow_bar_splitter_pngAsset = embedBitmap("room/variablefx_arrow_bar_splitter.png");
const variablefx_arrow_bar_splitter_left_pngAsset = embedBitmap("room/variablefx_arrow_bar_splitter_left.png");
const variablefx_block_bar_background_pngAsset = embedBitmap("room/variablefx_block_bar_background.png");
const variablefx_block_bar_darkening_pngAsset = embedBitmap("room/variablefx_block_bar_darkening.png");
const variablefx_block_bar_fill_pngAsset = embedBitmap("room/variablefx_block_bar_fill.png");
const variablefx_block_bar_lighting_pngAsset = embedBitmap("room/variablefx_block_bar_lighting.png");
const variablefx_block_bar_metallic_pngAsset = embedBitmap("room/variablefx_block_bar_metallic.png");
const variablefx_block_bar_splitters_pngAsset = embedBitmap("room/variablefx_block_bar_splitters.png");
const variablefx_boss_health_bar_background_pngAsset = embedBitmap("room/variablefx_boss_health_bar_background.png");
const variablefx_boss_health_bar_darkening_pngAsset = embedBitmap("room/variablefx_boss_health_bar_darkening.png");
const variablefx_boss_health_bar_fill_pngAsset = embedBitmap("room/variablefx_boss_health_bar_fill.png");
const variablefx_boss_health_bar_lighting_pngAsset = embedBitmap("room/variablefx_boss_health_bar_lighting.png");
const variablefx_boss_health_bar_metallic_pngAsset = embedBitmap("room/variablefx_boss_health_bar_metallic.png");
const variablefx_classic_mini_bar_background_pngAsset = embedBitmap("room/variablefx_classic_mini_bar_background.png");
const variablefx_classic_mini_bar_darkening_pngAsset = embedBitmap("room/variablefx_classic_mini_bar_darkening.png");
const variablefx_classic_mini_bar_fill_pngAsset = embedBitmap("room/variablefx_classic_mini_bar_fill.png");
const variablefx_classic_mini_bar_lighting_pngAsset = embedBitmap("room/variablefx_classic_mini_bar_lighting.png");
const variablefx_classic_mini_bar_metallic_pngAsset = embedBitmap("room/variablefx_classic_mini_bar_metallic.png");
const variablefx_classic_bar_background_pngAsset = embedBitmap("room/variablefx_classic_bar_background.png");
const variablefx_classic_bar_darkening_pngAsset = embedBitmap("room/variablefx_classic_bar_darkening.png");
const variablefx_classic_bar_lighting_pngAsset = embedBitmap("room/variablefx_classic_bar_lighting.png");
const variablefx_classic_bar_metallic_pngAsset = embedBitmap("room/variablefx_classic_bar_metallic.png");
const variablefx_health_bar_background_pngAsset = embedBitmap("room/variablefx_health_bar_background.png");
const variablefx_health_bar_darkening_pngAsset = embedBitmap("room/variablefx_health_bar_darkening.png");
const variablefx_health_bar_fill_pngAsset = embedBitmap("room/variablefx_health_bar_fill.png");
const variablefx_health_bar_lighting_pngAsset = embedBitmap("room/variablefx_health_bar_lighting.png");
const variablefx_icon_battery_pngAsset = embedBitmap("room/variablefx_icon_battery.png");
const variablefx_icon_burning_pngAsset = embedBitmap("room/variablefx_icon_burning.png");
const variablefx_icon_cash_pngAsset = embedBitmap("room/variablefx_icon_cash.png");
const variablefx_icon_cooldown_pngAsset = embedBitmap("room/variablefx_icon_cooldown.png");
const variablefx_icon_droplet_pngAsset = embedBitmap("room/variablefx_icon_droplet.png");
const variablefx_icon_energy_pngAsset = embedBitmap("room/variablefx_icon_energy.png");
const variablefx_icon_eye_pngAsset = embedBitmap("room/variablefx_icon_eye.png");
const variablefx_icon_fish_pngAsset = embedBitmap("room/variablefx_icon_fish.png");
const variablefx_icon_food_pngAsset = embedBitmap("room/variablefx_icon_food.png");
const variablefx_icon_freezing_pngAsset = embedBitmap("room/variablefx_icon_freezing.png");
const variablefx_icon_gems_pngAsset = embedBitmap("room/variablefx_icon_gems.png");
const variablefx_icon_gold_pngAsset = embedBitmap("room/variablefx_icon_gold.png");
const variablefx_icon_health_pngAsset = embedBitmap("room/variablefx_icon_health.png");
const variablefx_icon_honor_pngAsset = embedBitmap("room/variablefx_icon_honor.png");
const variablefx_icon_metadata_binAsset = embedBytes("room/variablefx_icon_metadata.bin");
const variablefx_icon_magic_pngAsset = embedBitmap("room/variablefx_icon_magic.png");
const variablefx_icon_mana_pngAsset = embedBitmap("room/variablefx_icon_mana.png");
const variablefx_icon_misc_heart_pngAsset = embedBitmap("room/variablefx_icon_misc_heart.png");
const variablefx_icon_misc_skull_pngAsset = embedBitmap("room/variablefx_icon_misc_skull.png");
const variablefx_icon_poison_pngAsset = embedBitmap("room/variablefx_icon_poison.png");
const variablefx_icon_ranch_aubergine_pngAsset = embedBitmap("room/variablefx_icon_ranch_aubergine.png");
const variablefx_icon_ranch_carrot_pngAsset = embedBitmap("room/variablefx_icon_ranch_carrot.png");
const variablefx_icon_ranch_corn_pngAsset = embedBitmap("room/variablefx_icon_ranch_corn.png");
const variablefx_icon_ranch_egg_pngAsset = embedBitmap("room/variablefx_icon_ranch_egg.png");
const variablefx_icon_ranch_grape_pngAsset = embedBitmap("room/variablefx_icon_ranch_grape.png");
const variablefx_icon_ranch_potato_pngAsset = embedBitmap("room/variablefx_icon_ranch_potato.png");
const variablefx_icon_ranch_pumpkin_pngAsset = embedBitmap("room/variablefx_icon_ranch_pumpkin.png");
const variablefx_icon_ranch_sapling_pngAsset = embedBitmap("room/variablefx_icon_ranch_sapling.png");
const variablefx_icon_ranch_tomato_pngAsset = embedBitmap("room/variablefx_icon_ranch_tomato.png");
const variablefx_icon_ranch_wheat_pngAsset = embedBitmap("room/variablefx_icon_ranch_wheat.png");
const variablefx_icon_repairing_pngAsset = embedBitmap("room/variablefx_icon_repairing.png");
const variablefx_icon_reputation_pngAsset = embedBitmap("room/variablefx_icon_reputation.png");
const variablefx_icon_shield_pngAsset = embedBitmap("room/variablefx_icon_shield.png");
const variablefx_icon_stamina_pngAsset = embedBitmap("room/variablefx_icon_stamina.png");
const variablefx_icon_star_power_pngAsset = embedBitmap("room/variablefx_icon_star_power.png");
const variablefx_icon_stealth_pngAsset = embedBitmap("room/variablefx_icon_stealth.png");
const variablefx_icon_timeleft_pngAsset = embedBitmap("room/variablefx_icon_timeleft.png");
const variablefx_icon_upgrading_pngAsset = embedBitmap("room/variablefx_icon_upgrading.png");
const variablefx_icon_wooden_logs_pngAsset = embedBitmap("room/variablefx_icon_wooden_logs.png");
const variablefx_level_details_background_pngAsset = embedBitmap("room/variablefx_level_details_background.png");
const variablefx_level_details_darkening_pngAsset = embedBitmap("room/variablefx_level_details_darkening.png");
const variablefx_level_details_darkening_metallic_pngAsset = embedBitmap("room/variablefx_level_details_darkening_metallic.png");
const variablefx_level_details_frame_pngAsset = embedBitmap("room/variablefx_level_details_frame.png");
const variablefx_level_details_lighting_pngAsset = embedBitmap("room/variablefx_level_details_lighting.png");
const variablefx_level_details_lighting_metallic_pngAsset = embedBitmap("room/variablefx_level_details_lighting_metallic.png");
const variablefx_level_with_progress_background_pngAsset = embedBitmap("room/variablefx_level_with_progress_background.png");
const variablefx_level_with_progress_darkening_pngAsset = embedBitmap("room/variablefx_level_with_progress_darkening.png");
const variablefx_level_with_progress_darkening_metallic_pngAsset = embedBitmap("room/variablefx_level_with_progress_darkening_metallic.png");
const variablefx_level_with_progress_frame_pngAsset = embedBitmap("room/variablefx_level_with_progress_frame.png");
const variablefx_level_with_progress_lighting_pngAsset = embedBitmap("room/variablefx_level_with_progress_lighting.png");
const variablefx_level_with_progress_lighting_metallic_pngAsset = embedBitmap("room/variablefx_level_with_progress_lighting_metallic.png");
const variablefx_masked_heart_fill_background_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_background.png");
const variablefx_masked_heart_fill_bar_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_bar.png");
const variablefx_masked_heart_fill_darkening_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_darkening.png");
const variablefx_masked_heart_fill_darkening_metallic_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_darkening_metallic.png");
const variablefx_masked_heart_fill_end_pointer_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_end_pointer.png");
const variablefx_masked_heart_fill_lighting_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_lighting.png");
const variablefx_masked_heart_fill_lighting_metallic_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_lighting_metallic.png");
const variablefx_masked_heart_fill_mask_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_mask.png");
const variablefx_masked_heart_fill_metallic_pngAsset = embedBitmap("room/variablefx_masked_heart_fill_metallic.png");
const variablefx_number_blocky_darkening_pngAsset = embedBitmap("room/variablefx_number_blocky_darkening.png");
const variablefx_number_blocky_lighting_pngAsset = embedBitmap("room/variablefx_number_blocky_lighting.png");
const variablefx_number_blocky_numbers_pngAsset = embedBitmap("room/variablefx_number_blocky_numbers.png");
const variablefx_number_freeze_style_numbers_pngAsset = embedBitmap("room/variablefx_number_freeze_style_numbers.png");
const variablefx_number_shalimar_darkening_pngAsset = embedBitmap("room/variablefx_number_shalimar_darkening.png");
const variablefx_number_shalimar_lighting_pngAsset = embedBitmap("room/variablefx_number_shalimar_lighting.png");
const variablefx_number_shalimar_number_lines_pngAsset = embedBitmap("room/variablefx_number_shalimar_number_lines.png");
const variablefx_number_shalimar_numbers_pngAsset = embedBitmap("room/variablefx_number_shalimar_numbers.png");
const variablefx_numbers_large_pngAsset = embedBitmap("room/variablefx_numbers_large.png");
const variablefx_numbers_small_pngAsset = embedBitmap("room/variablefx_numbers_small.png");
const variablefx_renderer_mapping_binAsset = embedBytes("room/variablefx_renderer_mapping.bin");
const variablefx_stacked_health_points_background_pngAsset = embedBitmap("room/variablefx_stacked_health_points_background.png");
const variablefx_stacked_health_points_darkening_pngAsset = embedBitmap("room/variablefx_stacked_health_points_darkening.png");
const variablefx_stacked_health_points_darkening_metallic_pngAsset = embedBitmap("room/variablefx_stacked_health_points_darkening_metallic.png");
const variablefx_stacked_health_points_lighting_pngAsset = embedBitmap("room/variablefx_stacked_health_points_lighting.png");
const variablefx_stacked_health_points_lighting_metallic_pngAsset = embedBitmap("room/variablefx_stacked_health_points_lighting_metallic.png");
const variablefx_stacked_health_points_metallic_pngAsset = embedBitmap("room/variablefx_stacked_health_points_metallic.png");
const variablefx_striped_bar_background_pngAsset = embedBitmap("room/variablefx_striped_bar_background.png");
const variablefx_striped_bar_darkening_pngAsset = embedBitmap("room/variablefx_striped_bar_darkening.png");
const variablefx_striped_bar_darkening_metallic_pngAsset = embedBitmap("room/variablefx_striped_bar_darkening_metallic.png");
const variablefx_striped_bar_fill_pngAsset = embedBitmap("room/variablefx_striped_bar_fill.png");
const variablefx_striped_bar_lighting_pngAsset = embedBitmap("room/variablefx_striped_bar_lighting.png");
const variablefx_striped_bar_lighting_metallic_pngAsset = embedBitmap("room/variablefx_striped_bar_lighting_metallic.png");
const variablefx_striped_bar_metallic_pngAsset = embedBitmap("room/variablefx_striped_bar_metallic.png");
const variablefx_striped_bar_stripe_pngAsset = embedBitmap("room/variablefx_striped_bar_stripe.png");
const variablefx_thermometer_health_points_background_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_background.png");
const variablefx_thermometer_health_points_darkening_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_darkening.png");
const variablefx_thermometer_health_points_fill_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_fill.png");
const variablefx_thermometer_health_points_lighting_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_lighting.png");
const variablefx_thermometer_health_points_splitters_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_splitters.png");
const variablefx_thermometer_health_points_top_pngAsset = embedBitmap("room/variablefx_thermometer_health_points_top.png");

export class HabboRoomObjectVisualizationLib extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomObjectVisualizationLib'); }

    static #staticsReady = false;

    public static manifest = HabboRoomObjectVisualizationLib_manifest_binAsset;

    public static pet_experience_bubble_png = pet_experience_bubble_png_pngAsset;

    public static snowball_small_png = snowball_small_png_pngAsset;

    public static snowball_small_shadow_png = snowball_small_shadow_png_pngAsset;

    public static snowball_big_png = snowball_big_png_pngAsset;

    public static snowball_splash_1 = snowball_splash_1_pngAsset;

    public static snowball_splash_2 = snowball_splash_2_pngAsset;

    public static snowball_splash_3 = snowball_splash_3_pngAsset;

    public static variablefx_arrow_bar_background = variablefx_arrow_bar_background_pngAsset;

    public static variablefx_arrow_bar_chunk = variablefx_arrow_bar_chunk_pngAsset;

    public static variablefx_arrow_bar_darkening = variablefx_arrow_bar_darkening_pngAsset;

    public static variablefx_arrow_bar_lighting = variablefx_arrow_bar_lighting_pngAsset;

    public static variablefx_arrow_bar_metallic = variablefx_arrow_bar_metallic_pngAsset;

    public static variablefx_arrow_bar_splitter = variablefx_arrow_bar_splitter_pngAsset;

    public static variablefx_arrow_bar_splitter_left = variablefx_arrow_bar_splitter_left_pngAsset;

    public static variablefx_block_bar_background = variablefx_block_bar_background_pngAsset;

    public static variablefx_block_bar_darkening = variablefx_block_bar_darkening_pngAsset;

    public static variablefx_block_bar_fill = variablefx_block_bar_fill_pngAsset;

    public static variablefx_block_bar_lighting = variablefx_block_bar_lighting_pngAsset;

    public static variablefx_block_bar_metallic = variablefx_block_bar_metallic_pngAsset;

    public static variablefx_block_bar_splitters = variablefx_block_bar_splitters_pngAsset;

    public static variablefx_boss_health_bar_background = variablefx_boss_health_bar_background_pngAsset;

    public static variablefx_boss_health_bar_darkening = variablefx_boss_health_bar_darkening_pngAsset;

    public static variablefx_boss_health_bar_fill = variablefx_boss_health_bar_fill_pngAsset;

    public static variablefx_boss_health_bar_lighting = variablefx_boss_health_bar_lighting_pngAsset;

    public static variablefx_boss_health_bar_metallic = variablefx_boss_health_bar_metallic_pngAsset;

    public static variablefx_classic_mini_bar_background = variablefx_classic_mini_bar_background_pngAsset;

    public static variablefx_classic_mini_bar_darkening = variablefx_classic_mini_bar_darkening_pngAsset;

    public static variablefx_classic_mini_bar_fill = variablefx_classic_mini_bar_fill_pngAsset;

    public static variablefx_classic_mini_bar_lighting = variablefx_classic_mini_bar_lighting_pngAsset;

    public static variablefx_classic_mini_bar_metallic = variablefx_classic_mini_bar_metallic_pngAsset;

    public static variablefx_classic_bar_background = variablefx_classic_bar_background_pngAsset;

    public static variablefx_classic_bar_darkening = variablefx_classic_bar_darkening_pngAsset;

    public static variablefx_classic_bar_fill = variablefx_block_bar_fill_pngAsset;

    public static variablefx_classic_bar_lighting = variablefx_classic_bar_lighting_pngAsset;

    public static variablefx_classic_bar_metallic = variablefx_classic_bar_metallic_pngAsset;

    public static variablefx_health_bar_background = variablefx_health_bar_background_pngAsset;

    public static variablefx_health_bar_darkening = variablefx_health_bar_darkening_pngAsset;

    public static variablefx_health_bar_fill = variablefx_health_bar_fill_pngAsset;

    public static variablefx_health_bar_lighting = variablefx_health_bar_lighting_pngAsset;

    public static variablefx_icon_battery = variablefx_icon_battery_pngAsset;

    public static variablefx_icon_burning = variablefx_icon_burning_pngAsset;

    public static variablefx_icon_cash = variablefx_icon_cash_pngAsset;

    public static variablefx_icon_cooldown = variablefx_icon_cooldown_pngAsset;

    public static variablefx_icon_droplet = variablefx_icon_droplet_pngAsset;

    public static variablefx_icon_energy = variablefx_icon_energy_pngAsset;

    public static variablefx_icon_eye = variablefx_icon_eye_pngAsset;

    public static variablefx_icon_fish = variablefx_icon_fish_pngAsset;

    public static variablefx_icon_food = variablefx_icon_food_pngAsset;

    public static variablefx_icon_freezing = variablefx_icon_freezing_pngAsset;

    public static variablefx_icon_gems = variablefx_icon_gems_pngAsset;

    public static variablefx_icon_gold = variablefx_icon_gold_pngAsset;

    public static variablefx_icon_health = variablefx_icon_health_pngAsset;

    public static variablefx_icon_honor = variablefx_icon_honor_pngAsset;

    public static variablefx_icon_metadata = variablefx_icon_metadata_binAsset;

    public static variablefx_icon_magic = variablefx_icon_magic_pngAsset;

    public static variablefx_icon_mana = variablefx_icon_mana_pngAsset;

    public static variablefx_icon_misc_heart = variablefx_icon_misc_heart_pngAsset;

    public static variablefx_icon_misc_skull = variablefx_icon_misc_skull_pngAsset;

    public static variablefx_icon_poison = variablefx_icon_poison_pngAsset;

    public static variablefx_icon_ranch_aubergine = variablefx_icon_ranch_aubergine_pngAsset;

    public static variablefx_icon_ranch_carrot = variablefx_icon_ranch_carrot_pngAsset;

    public static variablefx_icon_ranch_corn = variablefx_icon_ranch_corn_pngAsset;

    public static variablefx_icon_ranch_egg = variablefx_icon_ranch_egg_pngAsset;

    public static variablefx_icon_ranch_grape = variablefx_icon_ranch_grape_pngAsset;

    public static variablefx_icon_ranch_potato = variablefx_icon_ranch_potato_pngAsset;

    public static variablefx_icon_ranch_pumpkin = variablefx_icon_ranch_pumpkin_pngAsset;

    public static variablefx_icon_ranch_sapling = variablefx_icon_ranch_sapling_pngAsset;

    public static variablefx_icon_ranch_tomato = variablefx_icon_ranch_tomato_pngAsset;

    public static variablefx_icon_ranch_wheat = variablefx_icon_ranch_wheat_pngAsset;

    public static variablefx_icon_repairing = variablefx_icon_repairing_pngAsset;

    public static variablefx_icon_reputation = variablefx_icon_reputation_pngAsset;

    public static variablefx_icon_shield = variablefx_icon_shield_pngAsset;

    public static variablefx_icon_stamina = variablefx_icon_stamina_pngAsset;

    public static variablefx_icon_star_power = variablefx_icon_star_power_pngAsset;

    public static variablefx_icon_stealth = variablefx_icon_stealth_pngAsset;

    public static variablefx_icon_timeleft = variablefx_icon_timeleft_pngAsset;

    public static variablefx_icon_upgrading = variablefx_icon_upgrading_pngAsset;

    public static variablefx_icon_wooden_logs = variablefx_icon_wooden_logs_pngAsset;

    public static variablefx_level_details_background = variablefx_level_details_background_pngAsset;

    public static variablefx_level_details_darkening = variablefx_level_details_darkening_pngAsset;

    public static variablefx_level_details_darkening_metallic = variablefx_level_details_darkening_metallic_pngAsset;

    public static variablefx_level_details_frame = variablefx_level_details_frame_pngAsset;

    public static variablefx_level_details_lighting = variablefx_level_details_lighting_pngAsset;

    public static variablefx_level_details_lighting_metallic = variablefx_level_details_lighting_metallic_pngAsset;

    public static variablefx_level_with_progress_background = variablefx_level_with_progress_background_pngAsset;

    public static variablefx_level_with_progress_darkening = variablefx_level_with_progress_darkening_pngAsset;

    public static variablefx_level_with_progress_darkening_metallic = variablefx_level_with_progress_darkening_metallic_pngAsset;

    public static variablefx_level_with_progress_frame = variablefx_level_with_progress_frame_pngAsset;

    public static variablefx_level_with_progress_lighting = variablefx_level_with_progress_lighting_pngAsset;

    public static variablefx_level_with_progress_lighting_metallic = variablefx_level_with_progress_lighting_metallic_pngAsset;

    public static variablefx_masked_heart_fill_background = variablefx_masked_heart_fill_background_pngAsset;

    public static variablefx_masked_heart_fill_bar = variablefx_masked_heart_fill_bar_pngAsset;

    public static variablefx_masked_heart_fill_darkening = variablefx_masked_heart_fill_darkening_pngAsset;

    public static variablefx_masked_heart_fill_darkening_metallic = variablefx_masked_heart_fill_darkening_metallic_pngAsset;

    public static variablefx_masked_heart_fill_end_pointer = variablefx_masked_heart_fill_end_pointer_pngAsset;

    public static variablefx_masked_heart_fill_lighting = variablefx_masked_heart_fill_lighting_pngAsset;

    public static variablefx_masked_heart_fill_lighting_metallic = variablefx_masked_heart_fill_lighting_metallic_pngAsset;

    public static variablefx_masked_heart_fill_mask = variablefx_masked_heart_fill_mask_pngAsset;

    public static variablefx_masked_heart_fill_metallic = variablefx_masked_heart_fill_metallic_pngAsset;

    public static variablefx_number_blocky_darkening = variablefx_number_blocky_darkening_pngAsset;

    public static variablefx_number_blocky_lighting = variablefx_number_blocky_lighting_pngAsset;

    public static variablefx_number_blocky_numbers = variablefx_number_blocky_numbers_pngAsset;

    public static variablefx_number_freeze_style_numbers = variablefx_number_freeze_style_numbers_pngAsset;

    public static variablefx_number_shalimar_darkening = variablefx_number_shalimar_darkening_pngAsset;

    public static variablefx_number_shalimar_lighting = variablefx_number_shalimar_lighting_pngAsset;

    public static variablefx_number_shalimar_number_lines = variablefx_number_shalimar_number_lines_pngAsset;

    public static variablefx_number_shalimar_numbers = variablefx_number_shalimar_numbers_pngAsset;

    public static variablefx_numbers_large = variablefx_numbers_large_pngAsset;

    public static variablefx_numbers_small = variablefx_numbers_small_pngAsset;

    public static variablefx_renderer_mapping = variablefx_renderer_mapping_binAsset;

    public static variablefx_stacked_health_points_background = variablefx_stacked_health_points_background_pngAsset;

    public static variablefx_stacked_health_points_darkening = variablefx_stacked_health_points_darkening_pngAsset;

    public static variablefx_stacked_health_points_darkening_metallic = variablefx_stacked_health_points_darkening_metallic_pngAsset;

    public static variablefx_stacked_health_points_lighting = variablefx_stacked_health_points_lighting_pngAsset;

    public static variablefx_stacked_health_points_lighting_metallic = variablefx_stacked_health_points_lighting_metallic_pngAsset;

    public static variablefx_stacked_health_points_metallic = variablefx_stacked_health_points_metallic_pngAsset;

    public static variablefx_striped_bar_background = variablefx_striped_bar_background_pngAsset;

    public static variablefx_striped_bar_darkening = variablefx_striped_bar_darkening_pngAsset;

    public static variablefx_striped_bar_darkening_metallic = variablefx_striped_bar_darkening_metallic_pngAsset;

    public static variablefx_striped_bar_fill = variablefx_striped_bar_fill_pngAsset;

    public static variablefx_striped_bar_lighting = variablefx_striped_bar_lighting_pngAsset;

    public static variablefx_striped_bar_lighting_metallic = variablefx_striped_bar_lighting_metallic_pngAsset;

    public static variablefx_striped_bar_metallic = variablefx_striped_bar_metallic_pngAsset;

    public static variablefx_striped_bar_stripe = variablefx_striped_bar_stripe_pngAsset;

    public static variablefx_thermometer_health_points_background = variablefx_thermometer_health_points_background_pngAsset;

    public static variablefx_thermometer_health_points_darkening = variablefx_thermometer_health_points_darkening_pngAsset;

    public static variablefx_thermometer_health_points_fill = variablefx_thermometer_health_points_fill_pngAsset;

    public static variablefx_thermometer_health_points_lighting = variablefx_thermometer_health_points_lighting_pngAsset;

    public static variablefx_thermometer_health_points_splitters = variablefx_thermometer_health_points_splitters_pngAsset;

    public static variablefx_thermometer_health_points_top = variablefx_thermometer_health_points_top_pngAsset;

    public static get requiredClasses(): any[] {
        HabboRoomObjectVisualizationLib.#initStatics();
        return HabboRoomObjectVisualizationLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomObjectVisualizationLib.#initStatics();
        HabboRoomObjectVisualizationLib.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomObjectVisualizationLib.#staticsReady) return;
        HabboRoomObjectVisualizationLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomObjectVisualizationLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomObjectVisualizationFactoryBootstrap, IIDRoomObjectVisualizationFactory]);
    }
}
