import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboGroupsManagerBootstrap } from '@/com/sulake/bootstrap/HabboGroupsManagerBootstrap';
import { IIDHabboGroupsManager } from '@/com/sulake/iid/IIDHabboGroupsManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboGroupsCom_manifest_binAsset = embedBytes("groups/HabboGroupsCom_manifest.bin");
const group_binAsset = embedBytes("groups/group.bin");
const guild_members_window_binAsset = embedBytes("groups/guild_members_window.bin");
const group_entry_binAsset = embedBytes("groups/group_entry.bin");
const member_entry_binAsset = embedBytes("groups/member_entry.bin");
const group_info_window_binAsset = embedBytes("groups/group_info_window.bin");
const group_management_window_binAsset = embedBytes("groups/group_management_window.bin");
const new_extended_profile_binAsset = embedBytes("groups/new_extended_profile.bin");
const club_required_binAsset = embedBytes("groups/club_required.bin");
const group_created_window_binAsset = embedBytes("groups/group_created_window.bin");
const group_room_info_binAsset = embedBytes("groups/group_room_info.bin");
const no_groups_binAsset = embedBytes("groups/no_groups.bin");
const extended_profile_badge_details_binAsset = embedBytes("groups/extended_profile_badge_details.bin");
const badge_color_item_binAsset = embedBytes("groups/badge_color_item.bin");
const badge_editor_binAsset = embedBytes("groups/badge_editor.bin");
const badge_layer_binAsset = embedBytes("groups/badge_layer.bin");
const badge_part_item_binAsset = embedBytes("groups/badge_part_item.bin");
const badge_leaderboard_view_binAsset = embedBytes("groups/badge_leaderboard_view.bin");
const color_chooser_bg_pngAsset = embedBitmap("groups/color_chooser_bg.png");
const color_chooser_fg_pngAsset = embedBitmap("groups/color_chooser_fg.png");
const color_chooser_selected_pngAsset = embedBitmap("groups/color_chooser_selected.png");
const part_preview_bg_pngAsset = embedBitmap("groups/part_preview_bg.png");
const position_grid_pngAsset = embedBitmap("groups/position_grid.png");
const position_picker_pngAsset = embedBitmap("groups/position_picker.png");
const badge_part_add_pngAsset = embedBitmap("groups/badge_part_add.png");
const badge_part_empty_pngAsset = embedBitmap("groups/badge_part_empty.png");
const badge_part_picker_pngAsset = embedBitmap("groups/badge_part_picker.png");

export class HabboGroupsCom extends SimpleApplication {
    static { registerClassName(this, 'HabboGroupsCom'); }

    static #staticsReady = false;

    public static manifest = HabboGroupsCom_manifest_binAsset;

    public static group = group_binAsset;

    public static guild_members_window = guild_members_window_binAsset;

    public static group_entry = group_entry_binAsset;

    public static member_entry = member_entry_binAsset;

    public static group_info_window = group_info_window_binAsset;

    public static group_management_window = group_management_window_binAsset;

    public static new_extended_profile = new_extended_profile_binAsset;

    public static club_required = club_required_binAsset;

    public static group_created_window = group_created_window_binAsset;

    public static group_room_info = group_room_info_binAsset;

    public static no_groups = no_groups_binAsset;

    public static extended_profile_badge_details = extended_profile_badge_details_binAsset;

    public static badge_color_item = badge_color_item_binAsset;

    public static badge_editor = badge_editor_binAsset;

    public static badge_layer = badge_layer_binAsset;

    public static badge_part_item = badge_part_item_binAsset;

    public static badge_leaderboard_view = badge_leaderboard_view_binAsset;

    public static color_chooser_bg = color_chooser_bg_pngAsset;

    public static color_chooser_fg = color_chooser_fg_pngAsset;

    public static color_chooser_selected = color_chooser_selected_pngAsset;

    public static part_preview_bg = part_preview_bg_pngAsset;

    public static position_grid = position_grid_pngAsset;

    public static position_picker = position_picker_pngAsset;

    public static badge_part_add = badge_part_add_pngAsset;

    public static badge_part_empty = badge_part_empty_pngAsset;

    public static badge_part_picker = badge_part_picker_pngAsset;

    public static get requiredClasses(): any[] {
        HabboGroupsCom.#initStatics();
        return HabboGroupsCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboGroupsCom.#initStatics();
        HabboGroupsCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboGroupsCom.#staticsReady) return;
        HabboGroupsCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboGroupsCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboGroupsManagerBootstrap, IIDHabboGroupsManager]);
    }
}
