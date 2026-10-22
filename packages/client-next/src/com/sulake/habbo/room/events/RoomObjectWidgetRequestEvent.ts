import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectWidgetRequestEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectWidgetRequestEvent'); }

    public static readonly OPEN_WIDGET: string = "ROWRE_OPEN_WIDGET";
    public static readonly CLOSE_WIDGET: string = "ROWRE_CLOSE_WIDGET";
    public static readonly OPEN_FURNI_CONTEXT_MENU: string = "ROWRE_OPEN_FURNI_CONTEXT_MENU";
    public static readonly CLOSE_FURNI_CONTEXT_MENU: string = "ROWRE_CLOSE_FURNI_CONTEXT_MENU";
    public static readonly PLACEHOLDER: string = "ROWRE_PLACEHOLDER";
    public static readonly CREDITFURNI: string = "ROWRE__CREDITFURNI";
    public static readonly STICKIE: string = "ROWRE__STICKIE";
    public static readonly PRESENT: string = "ROWRE_PRESENT";
    public static readonly TROPHY: string = "ROWRE_TROPHY";
    public static readonly TEASER: string = "ROWRE_TEASER";
    public static readonly ECOTRONBOX: string = "ROWRE_ECOTRONBOX";
    public static readonly DIMMER: string = "ROWRE_DIMMER";
    public static readonly REMOVE_DIMMER: string = "ROWRE_WIDGET_REMOVE_DIMMER";
    public static readonly CLOTHING_CHANGE: string = "ROWRE_CLOTHING_CHANGE";
    public static readonly PLAYLIST_EDITOR: string = "ROWRE_JUKEBOX_PLAYLIST_EDITOR";
    public static readonly MANNEQUIN: string = "ROWRE_MANNEQUIN";
    public static readonly PET_PRODUCT_MENU: string = "ROWRE_PET_PRODUCT_MENU";
    public static readonly GUILD_FURNI_CONTEXT_MENU: string = "ROWRE_GUILD_FURNI_CONTEXT_MENU";
    public static readonly MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string = "ROWRE_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG";
    public static readonly _SafeStr_7818: string = "ROWRE_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG";
    public static readonly BACKGROUND_COLOR: string = "ROWRE_BACKGROUND_COLOR";
    public static readonly _SafeStr_8675: string = "ROWRE_HIDE_AREA";
    public static readonly MYSTERYBOX_OPEN_DIALOG: string = "ROWRE_MYSTERYBOX_OPEN_DIALOG";
    public static readonly _SafeStr_7693: string = "ROWRE_EFFECTBOX_OPEN_DIALOG";
    public static readonly MYSTERYTROPHY_OPEN_DIALOG: string = "ROWRE_MYSTERYTROPHY_OPEN_DIALOG";
    public static readonly ACHIEVEMENT_RESOLUTION_OPEN: string = "ROWRE_ACHIEVEMENT_RESOLUTION_OPEN";
    public static readonly ACHIEVEMENT_RESOLUTION_ENGRAVING: string = "ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING";
    public static readonly ACHIEVEMENT_RESOLUTION_FAILED: string = "ROWRE_ACHIEVEMENT_RESOLUTION_FAILED";
    public static readonly FRIEND_FURNITURE_CONFIRM: string = "ROWRE_FRIEND_FURNITURE_CONFIRM";
    public static readonly FRIEND_FURNITURE_ENGRAVING: string = "ROWRE_FRIEND_FURNITURE_ENGRAVING";
    public static readonly BADGE_DISPLAY_ENGRAVING: string = "ROWRE_BADGE_DISPLAY_ENGRAVING";
    public static readonly _SafeStr_7575: string = "ROWRE_HIGH_SCORE_DISPLAY";
    public static readonly _SafeStr_8071: string = "ROWRE_HIDE_HIGH_SCORE_DISPLAY";
    public static readonly INTERNAL_LINK: string = "ROWRE_INTERNAL_LINK";
    public static readonly ROOM_LINK: string = "ROWRE_ROOM_LINK";

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
