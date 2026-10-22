import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboGameManagerBootstrap } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboGamesCom_manifest_binAsset = embedBytes("game/HabboGamesCom_manifest.bin");
const explosion0001_pngAsset = embedBitmap("game/explosion0001.png");
const explosion0002_pngAsset = embedBitmap("game/explosion0002.png");
const explosion0003_pngAsset = embedBitmap("game/explosion0003.png");
const explosion0004_pngAsset = embedBitmap("game/explosion0004.png");
const explosion0005_pngAsset = embedBitmap("game/explosion0005.png");
const explosion0006_pngAsset = embedBitmap("game/explosion0006.png");
const explosion0007_pngAsset = embedBitmap("game/explosion0007.png");
const explosion0008_pngAsset = embedBitmap("game/explosion0008.png");
const explosion0009_pngAsset = embedBitmap("game/explosion0009.png");
const explosion0010_pngAsset = embedBitmap("game/explosion0010.png");
const explosion0011_pngAsset = embedBitmap("game/explosion0011.png");
const explosion0012_pngAsset = embedBitmap("game/explosion0012.png");
const hc_icon_pngAsset = embedBitmap("game/hc_icon.png");
const btn_more_games_10_pngAsset = embedBitmap("game/btn_more_games_10.png");
const btn_more_games_10_hi_pngAsset = embedBitmap("game/btn_more_games_10_hi.png");
const btn_more_games_100_pngAsset = embedBitmap("game/btn_more_games_100.png");
const btn_more_games_100_hi_pngAsset = embedBitmap("game/btn_more_games_100_hi.png");
const btn_more_games_300_pngAsset = embedBitmap("game/btn_more_games_300.png");
const btn_more_games_300_hi_pngAsset = embedBitmap("game/btn_more_games_300_hi.png");
const bg_sky_pngAsset = embedBitmap("game/bg_sky.png");
const bg_sunshine_pngAsset = embedBitmap("game/bg_sunshine.png");
const bg_vista_1_pngAsset = embedBitmap("game/bg_vista_1.png");
const bg_vista_2_pngAsset = embedBitmap("game/bg_vista_2.png");
const bg_vista_3_pngAsset = embedBitmap("game/bg_vista_3.png");
const blue_ball_pngAsset = embedBitmap("game/blue_ball.png");
const blue_ball_rematch_pngAsset = embedBitmap("game/blue_ball_rematch.png");
const blue_glove_pngAsset = embedBitmap("game/blue_glove.png");
const blue_infobox_pngAsset = embedBitmap("game/blue_infobox.png");
const blue_square_pngAsset = embedBitmap("game/blue_square.png");
const gray_ball_pngAsset = embedBitmap("game/gray_ball.png");
const gray_infobox_pngAsset = embedBitmap("game/gray_infobox.png");
const gray_square_pngAsset = embedBitmap("game/gray_square.png");
const green_square_pngAsset = embedBitmap("game/green_square.png");
const load_1_pngAsset = embedBitmap("game/load_1.png");
const load_2_pngAsset = embedBitmap("game/load_2.png");
const load_3_pngAsset = embedBitmap("game/load_3.png");
const load_4_pngAsset = embedBitmap("game/load_4.png");
const load_5_pngAsset = embedBitmap("game/load_5.png");
const load_6_pngAsset = embedBitmap("game/load_6.png");
const load_7_pngAsset = embedBitmap("game/load_7.png");
const load_8_pngAsset = embedBitmap("game/load_8.png");
const red_ball_pngAsset = embedBitmap("game/red_ball.png");
const red_ball_rematch_pngAsset = embedBitmap("game/red_ball_rematch.png");
const red_glove_pngAsset = embedBitmap("game/red_glove.png");
const red_infobox_pngAsset = embedBitmap("game/red_infobox.png");
const red_square_pngAsset = embedBitmap("game/red_square.png");
const snowstorm_logo_pngAsset = embedBitmap("game/snowstorm_logo.png");
const ui_ball_indicator_bg_pngAsset = embedBitmap("game/ui_ball_indicator_bg.png");
const ui_ball_pngAsset = embedBitmap("game/ui_ball.png");
const ui_exit_down_pngAsset = embedBitmap("game/ui_exit_down.png");
const ui_exit_up_pngAsset = embedBitmap("game/ui_exit_up.png");
const ui_make_balls_down_pngAsset = embedBitmap("game/ui_make_balls_down.png");
const ui_make_balls_up_pngAsset = embedBitmap("game/ui_make_balls_up.png");
const ui_me_bg_pngAsset = embedBitmap("game/ui_me_bg.png");
const rematch_1_pngAsset = embedBitmap("game/rematch_1.png");
const rematch_2_pngAsset = embedBitmap("game/rematch_2.png");
const rematch_3_pngAsset = embedBitmap("game/rematch_3.png");
const rematch_4_pngAsset = embedBitmap("game/rematch_4.png");
const rematch_5_pngAsset = embedBitmap("game/rematch_5.png");
const rematch_6_pngAsset = embedBitmap("game/rematch_6.png");
const ui_me_health_0_pngAsset = embedBitmap("game/ui_me_health_0.png");
const ui_me_health_1_pngAsset = embedBitmap("game/ui_me_health_1.png");
const ui_me_health_2_pngAsset = embedBitmap("game/ui_me_health_2.png");
const ui_me_health_3_pngAsset = embedBitmap("game/ui_me_health_3.png");
const ui_me_health_4_pngAsset = embedBitmap("game/ui_me_health_4.png");
const ui_me_health_5_pngAsset = embedBitmap("game/ui_me_health_5.png");
const ui_me_minus_1_pngAsset = embedBitmap("game/ui_me_minus_1.png");
const ui_me_minus_2_pngAsset = embedBitmap("game/ui_me_minus_2.png");
const ui_me_minus_3_pngAsset = embedBitmap("game/ui_me_minus_3.png");
const ui_me_minus_4_pngAsset = embedBitmap("game/ui_me_minus_4.png");
const ui_me_plus_1_pngAsset = embedBitmap("game/ui_me_plus_1.png");
const ui_me_plus_2_pngAsset = embedBitmap("game/ui_me_plus_2.png");
const ui_me_plus_3_pngAsset = embedBitmap("game/ui_me_plus_3.png");
const ui_me_plus_4_pngAsset = embedBitmap("game/ui_me_plus_4.png");
const ui_no_balls_1_pngAsset = embedBitmap("game/ui_no_balls_1.png");
const ui_no_balls_2_pngAsset = embedBitmap("game/ui_no_balls_2.png");
const ui_no_balls_3_pngAsset = embedBitmap("game/ui_no_balls_3.png");
const ui_no_balls_4_pngAsset = embedBitmap("game/ui_no_balls_4.png");
const ui_timer_and_points_pngAsset = embedBitmap("game/ui_timer_and_points.png");
const arena_8_preview_pngAsset = embedBitmap("game/arena_8_preview.png");
const arena_9_preview_pngAsset = embedBitmap("game/arena_9_preview.png");
const arena_10_preview_pngAsset = embedBitmap("game/arena_10_preview.png");
const arena_12_preview_pngAsset = embedBitmap("game/arena_12_preview.png");
const star_empty_pngAsset = embedBitmap("game/star_empty.png");
const star_filled_bronze_pngAsset = embedBitmap("game/star_filled_bronze.png");
const star_filled_silver_pngAsset = embedBitmap("game/star_filled_silver.png");
const star_filled_gold_pngAsset = embedBitmap("game/star_filled_gold.png");
const quick_play_background_pngAsset = embedBitmap("game/quick_play_background.png");
const quick_play_instructions_pngAsset = embedBitmap("game/quick_play_instructions.png");
const quick_play_teaser_pngAsset = embedBitmap("game/quick_play_teaser.png");
const free_games_bg_pngAsset = embedBitmap("game/free_games_bg.png");
const leaderboard_bg_pngAsset = embedBitmap("game/leaderboard_bg.png");
const leaderboard_divider_pngAsset = embedBitmap("game/leaderboard_divider.png");
const leaderboard_highlighter_pngAsset = embedBitmap("game/leaderboard_highlighter.png");
const left_black_pngAsset = embedBitmap("game/left_black.png");
const left_blue_pngAsset = embedBitmap("game/left_blue.png");
const right_black_pngAsset = embedBitmap("game/right_black.png");
const right_blue_pngAsset = embedBitmap("game/right_blue.png");
const add_friend_icon_blue_pngAsset = embedBitmap("game/add_friend_icon_blue.png");
const add_friend_icon_red_pngAsset = embedBitmap("game/add_friend_icon_red.png");
const add_friend_icon_green_pngAsset = embedBitmap("game/add_friend_icon_green.png");
const scroll_down_normal_pngAsset = embedBitmap("game/scroll_down_normal.png");
const scroll_down_click_pngAsset = embedBitmap("game/scroll_down_click.png");
const scroll_down_hilite_pngAsset = embedBitmap("game/scroll_down_hilite.png");
const scroll_down_inactive_pngAsset = embedBitmap("game/scroll_down_inactive.png");
const scroll_up_normal_pngAsset = embedBitmap("game/scroll_up_normal.png");
const scroll_up_click_pngAsset = embedBitmap("game/scroll_up_click.png");
const scroll_up_hilite_pngAsset = embedBitmap("game/scroll_up_hilite.png");
const scroll_up_inactive_pngAsset = embedBitmap("game/scroll_up_inactive.png");
const scroll_left_pngAsset = embedBitmap("game/scroll_left.png");
const scroll_right_pngAsset = embedBitmap("game/scroll_right.png");
const throw_1_1_pngAsset = embedBitmap("game/throw_1_1.png");
const throw_1_2_pngAsset = embedBitmap("game/throw_1_2.png");
const throw_1_3_pngAsset = embedBitmap("game/throw_1_3.png");
const throw_1_4_pngAsset = embedBitmap("game/throw_1_4.png");
const throw_2_1_pngAsset = embedBitmap("game/throw_2_1.png");
const throw_2_2_pngAsset = embedBitmap("game/throw_2_2.png");
const throw_2_3_pngAsset = embedBitmap("game/throw_2_3.png");
const throw_2_4_pngAsset = embedBitmap("game/throw_2_4.png");
const throw_2_5_pngAsset = embedBitmap("game/throw_2_5.png");
const throw_3_1_pngAsset = embedBitmap("game/throw_3_1.png");
const throw_3_2_pngAsset = embedBitmap("game/throw_3_2.png");
const throw_3_3_pngAsset = embedBitmap("game/throw_3_3.png");
const throw_3_4_pngAsset = embedBitmap("game/throw_3_4.png");
const throw_3_5_pngAsset = embedBitmap("game/throw_3_5.png");
const balls_1_pngAsset = embedBitmap("game/balls_1.png");
const balls_2_pngAsset = embedBitmap("game/balls_2.png");
const balls_3_pngAsset = embedBitmap("game/balls_3.png");
const balls_4_pngAsset = embedBitmap("game/balls_4.png");
const balls_5_pngAsset = embedBitmap("game/balls_5.png");
const move_1_pngAsset = embedBitmap("game/move_1.png");
const move_2_pngAsset = embedBitmap("game/move_2.png");
const move_3_pngAsset = embedBitmap("game/move_3.png");
const move_4_pngAsset = embedBitmap("game/move_4.png");
const pagination_ball_pngAsset = embedBitmap("game/pagination_ball.png");
const pagination_ball_hilite_pngAsset = embedBitmap("game/pagination_ball_hilite.png");
const games_main_binAsset = embedBytes("game/games_main.bin");
const instructions_list_item_binAsset = embedBytes("game/instructions_list_item.bin");
const counter_binAsset = embedBytes("game/counter.bin");
const figure_binAsset = embedBytes("game/figure.bin");
const snowwar_ending_binAsset = embedBytes("game/snowwar_ending.bin");
const snowwar_exit_binAsset = embedBytes("game/snowwar_exit.bin");
const snowwar_lobby_player_binAsset = embedBytes("game/snowwar_lobby_player.bin");
const snowwar_lobby_player_team_1_binAsset = embedBytes("game/snowwar_lobby_player_team_1.bin");
const snowwar_lobby_player_team_2_binAsset = embedBytes("game/snowwar_lobby_player_team_2.bin");
const snowwar_results_player_team_1_binAsset = embedBytes("game/snowwar_results_player_team_1.bin");
const snowwar_results_player_team_2_binAsset = embedBytes("game/snowwar_results_player_team_2.bin");
const snowwar_own_stats_binAsset = embedBytes("game/snowwar_own_stats.bin");
const snowwar_snowballs_binAsset = embedBytes("game/snowwar_snowballs.bin");
const snowwar_team_scores_binAsset = embedBytes("game/snowwar_team_scores.bin");
const snowwar_timer_binAsset = embedBytes("game/snowwar_timer.bin");
const snowwar_loading_background_xml_binAsset = embedBytes("game/snowwar_loading_background_xml.bin");
const snowwar_exit_confirmation_binAsset = embedBytes("game/snowwar_exit_confirmation.bin");
const snowwar_leaderboard_binAsset = embedBytes("game/snowwar_leaderboard.bin");
const snowwar_leaderboard_entry_binAsset = embedBytes("game/snowwar_leaderboard_entry.bin");

export class HabboGamesCom extends SimpleApplication {
    static { registerClassName(this, 'HabboGamesCom'); }

    static #staticsReady = false;

    private static _logEnabled: boolean = true;

    public static manifest = HabboGamesCom_manifest_binAsset;

    public static readonly explosion0001 = explosion0001_pngAsset;

    public static readonly explosion0002 = explosion0002_pngAsset;

    public static readonly explosion0003 = explosion0003_pngAsset;

    public static readonly explosion0004 = explosion0004_pngAsset;

    public static readonly explosion0005 = explosion0005_pngAsset;

    public static readonly explosion0006 = explosion0006_pngAsset;

    public static readonly explosion0007 = explosion0007_pngAsset;

    public static readonly explosion0008 = explosion0008_pngAsset;

    public static readonly explosion0009 = explosion0009_pngAsset;

    public static readonly explosion0010 = explosion0010_pngAsset;

    public static readonly explosion0011 = explosion0011_pngAsset;

    public static readonly explosion0012 = explosion0012_pngAsset;

    public static readonly hc_icon = hc_icon_pngAsset;

    public static readonly btn_more_games_10 = btn_more_games_10_pngAsset;

    public static readonly btn_more_games_10_hi = btn_more_games_10_hi_pngAsset;

    public static readonly btn_more_games_100 = btn_more_games_100_pngAsset;

    public static readonly btn_more_games_100_hi = btn_more_games_100_hi_pngAsset;

    public static readonly btn_more_games_300 = btn_more_games_300_pngAsset;

    public static readonly btn_more_games_300_hi = btn_more_games_300_hi_pngAsset;

    public static readonly bg_sky = bg_sky_pngAsset;

    public static readonly bg_sunshine = bg_sunshine_pngAsset;

    public static readonly bg_vista_1 = bg_vista_1_pngAsset;

    public static readonly bg_vista_2 = bg_vista_2_pngAsset;

    public static readonly bg_vista_3 = bg_vista_3_pngAsset;

    public static readonly blue_ball = blue_ball_pngAsset;

    public static readonly blue_ball_rematch = blue_ball_rematch_pngAsset;

    public static readonly blue_glove = blue_glove_pngAsset;

    public static readonly blue_infobox = blue_infobox_pngAsset;

    public static readonly blue_square = blue_square_pngAsset;

    public static readonly gray_ball = gray_ball_pngAsset;

    public static readonly gray_infobox = gray_infobox_pngAsset;

    public static readonly gray_square = gray_square_pngAsset;

    public static readonly green_square = green_square_pngAsset;

    public static readonly load_1 = load_1_pngAsset;

    public static readonly load_2 = load_2_pngAsset;

    public static readonly load_3 = load_3_pngAsset;

    public static readonly load_4 = load_4_pngAsset;

    public static readonly load_5 = load_5_pngAsset;

    public static readonly load_6 = load_6_pngAsset;

    public static readonly load_7 = load_7_pngAsset;

    public static readonly load_8 = load_8_pngAsset;

    public static readonly red_ball = red_ball_pngAsset;

    public static readonly red_ball_rematch = red_ball_rematch_pngAsset;

    public static readonly red_glove = red_glove_pngAsset;

    public static readonly red_infobox = red_infobox_pngAsset;

    public static readonly red_square = red_square_pngAsset;

    public static readonly snowstorm_logo = snowstorm_logo_pngAsset;

    public static readonly ui_ball_indicator_bg = ui_ball_indicator_bg_pngAsset;

    public static readonly ui_ball = ui_ball_pngAsset;

    public static readonly ui_exit_down = ui_exit_down_pngAsset;

    public static readonly ui_exit_up = ui_exit_up_pngAsset;

    public static readonly ui_make_balls_down = ui_make_balls_down_pngAsset;

    public static readonly ui_make_balls_up = ui_make_balls_up_pngAsset;

    public static readonly ui_me_bg = ui_me_bg_pngAsset;

    public static readonly rematch_1 = rematch_1_pngAsset;

    public static readonly rematch_2 = rematch_2_pngAsset;

    public static readonly rematch_3 = rematch_3_pngAsset;

    public static readonly rematch_4 = rematch_4_pngAsset;

    public static readonly rematch_5 = rematch_5_pngAsset;

    public static readonly rematch_6 = rematch_6_pngAsset;

    public static readonly ui_me_health_0 = ui_me_health_0_pngAsset;

    public static readonly ui_me_health_1 = ui_me_health_1_pngAsset;

    public static readonly ui_me_health_2 = ui_me_health_2_pngAsset;

    public static readonly ui_me_health_3 = ui_me_health_3_pngAsset;

    public static readonly ui_me_health_4 = ui_me_health_4_pngAsset;

    public static readonly ui_me_health_5 = ui_me_health_5_pngAsset;

    public static readonly ui_me_minus_1 = ui_me_minus_1_pngAsset;

    public static readonly ui_me_minus_2 = ui_me_minus_2_pngAsset;

    public static readonly ui_me_minus_3 = ui_me_minus_3_pngAsset;

    public static readonly ui_me_minus_4 = ui_me_minus_4_pngAsset;

    public static readonly ui_me_plus_1 = ui_me_plus_1_pngAsset;

    public static readonly ui_me_plus_2 = ui_me_plus_2_pngAsset;

    public static readonly ui_me_plus_3 = ui_me_plus_3_pngAsset;

    public static readonly ui_me_plus_4 = ui_me_plus_4_pngAsset;

    public static readonly ui_no_balls_1 = ui_no_balls_1_pngAsset;

    public static readonly ui_no_balls_2 = ui_no_balls_2_pngAsset;

    public static readonly ui_no_balls_3 = ui_no_balls_3_pngAsset;

    public static readonly ui_no_balls_4 = ui_no_balls_4_pngAsset;

    public static readonly ui_timer_and_points = ui_timer_and_points_pngAsset;

    public static readonly arena_8_preview = arena_8_preview_pngAsset;

    public static readonly arena_9_preview = arena_9_preview_pngAsset;

    public static readonly arena_10_preview = arena_10_preview_pngAsset;

    public static readonly arena_11_preview = arena_10_preview_pngAsset;

    public static readonly arena_12_preview = arena_12_preview_pngAsset;

    public static readonly star_empty = star_empty_pngAsset;

    public static readonly star_filled_bronze = star_filled_bronze_pngAsset;

    public static readonly star_filled_silver = star_filled_silver_pngAsset;

    public static readonly star_filled_gold = star_filled_gold_pngAsset;

    public static readonly quick_play_background = quick_play_background_pngAsset;

    public static readonly quick_play_instructions = quick_play_instructions_pngAsset;

    public static readonly quick_play_teaser = quick_play_teaser_pngAsset;

    public static readonly free_games_bg = free_games_bg_pngAsset;

    public static readonly leaderboard_bg = leaderboard_bg_pngAsset;

    public static readonly leaderboard_divider = leaderboard_divider_pngAsset;

    public static readonly leaderboard_highlighter = leaderboard_highlighter_pngAsset;

    public static readonly left_black = left_black_pngAsset;

    public static readonly left_blue = left_blue_pngAsset;

    public static readonly right_black = right_black_pngAsset;

    public static readonly right_blue = right_blue_pngAsset;

    public static readonly add_friend_icon_blue = add_friend_icon_blue_pngAsset;

    public static readonly add_friend_icon_red = add_friend_icon_red_pngAsset;

    public static readonly add_friend_icon_green = add_friend_icon_green_pngAsset;

    public static readonly scroll_down_normal = scroll_down_normal_pngAsset;

    public static readonly scroll_down_click = scroll_down_click_pngAsset;

    public static readonly scroll_down_hilite = scroll_down_hilite_pngAsset;

    public static readonly scroll_down_inactive = scroll_down_inactive_pngAsset;

    public static readonly scroll_up_normal = scroll_up_normal_pngAsset;

    public static readonly scroll_up_click = scroll_up_click_pngAsset;

    public static readonly scroll_up_hilite = scroll_up_hilite_pngAsset;

    public static readonly scroll_up_inactive = scroll_up_inactive_pngAsset;

    public static readonly scroll_left = scroll_left_pngAsset;

    public static readonly scroll_right = scroll_right_pngAsset;

    public static readonly throw_1_1 = throw_1_1_pngAsset;

    public static readonly throw_1_2 = throw_1_2_pngAsset;

    public static readonly throw_1_3 = throw_1_3_pngAsset;

    public static readonly throw_1_4 = throw_1_4_pngAsset;

    public static readonly throw_2_1 = throw_2_1_pngAsset;

    public static readonly throw_2_2 = throw_2_2_pngAsset;

    public static readonly throw_2_3 = throw_2_3_pngAsset;

    public static readonly throw_2_4 = throw_2_4_pngAsset;

    public static readonly throw_2_5 = throw_2_5_pngAsset;

    public static readonly throw_3_1 = throw_3_1_pngAsset;

    public static readonly throw_3_2 = throw_3_2_pngAsset;

    public static readonly throw_3_3 = throw_3_3_pngAsset;

    public static readonly throw_3_4 = throw_3_4_pngAsset;

    public static readonly throw_3_5 = throw_3_5_pngAsset;

    public static readonly balls_1 = balls_1_pngAsset;

    public static readonly balls_2 = balls_2_pngAsset;

    public static readonly balls_3 = balls_3_pngAsset;

    public static readonly balls_4 = balls_4_pngAsset;

    public static readonly balls_5 = balls_5_pngAsset;

    public static readonly move_1 = move_1_pngAsset;

    public static readonly move_2 = move_2_pngAsset;

    public static readonly move_3 = move_3_pngAsset;

    public static readonly move_4 = move_4_pngAsset;

    public static readonly pagination_ball = pagination_ball_pngAsset;

    public static readonly pagination_ball_hilite = pagination_ball_hilite_pngAsset;

    public static readonly games_main = games_main_binAsset;

    public static readonly instructions_list_item = instructions_list_item_binAsset;

    public static readonly counter = counter_binAsset;

    public static readonly figure = figure_binAsset;

    public static readonly snowwar_ending = snowwar_ending_binAsset;

    public static readonly snowwar_exit = snowwar_exit_binAsset;

    public static readonly snowwar_lobby_player = snowwar_lobby_player_binAsset;

    public static readonly snowwar_lobby_player_team_1 = snowwar_lobby_player_team_1_binAsset;

    public static readonly snowwar_lobby_player_team_2 = snowwar_lobby_player_team_2_binAsset;

    public static readonly snowwar_results_player_team_1 = snowwar_results_player_team_1_binAsset;

    public static readonly snowwar_results_player_team_2 = snowwar_results_player_team_2_binAsset;

    public static readonly snowwar_own_stats = snowwar_own_stats_binAsset;

    public static readonly snowwar_snowballs = snowwar_snowballs_binAsset;

    public static readonly snowwar_team_scores = snowwar_team_scores_binAsset;

    public static readonly snowwar_timer = snowwar_timer_binAsset;

    public static snowwar_loading_background_xml = snowwar_loading_background_xml_binAsset;

    public static snowwar_exit_confirmation = snowwar_exit_confirmation_binAsset;

    public static snowwar_leaderboard = snowwar_leaderboard_binAsset;

    public static snowwar_leaderboard_entry = snowwar_leaderboard_entry_binAsset;

    public static get requiredClasses(): any[] {
        HabboGamesCom.#initStatics();
        return HabboGamesCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboGamesCom.#initStatics();
        HabboGamesCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    public static set logEnabled(param1: boolean) {
        HabboGamesCom._logEnabled = param1;
    }

    public static get logEnabled(): boolean {
        return false;
    }

    public static log(...rest: any[]): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboGamesCom.#staticsReady) return;
        HabboGamesCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboGamesCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboGameManagerBootstrap, IIDHabboGameManager]);
    }
}
