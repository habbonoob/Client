import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineToWidgetEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineToWidgetEvent'); }

    public static readonly REQUEST_OPEN_WIDGET: string = "RETWE_OPEN_WIDGET";
    public static readonly REQUEST_CLOSE_WIDGET: string = "RETWE_CLOSE_WIDGET";
    public static readonly REQUEST_OPEN_FURNI_CONTEXT_MENU: string = "RETWE_OPEN_FURNI_CONTEXT_MENU";
    public static readonly REQUEST_CLOSE_FURNI_CONTEXT_MENU: string = "RETWE_CLOSE_FURNI_CONTEXT_MENU";
    public static readonly REQUEST_PLACEHOLDER: string = "RETWE_REQUEST_PLACEHOLDER";
    public static readonly REQUEST_CREDITFURNI: string = "RETWE_REQUEST_CREDITFURNI";
    public static readonly REQUEST_STICKIE: string = "RETWE_REQUEST_STICKIE";
    public static readonly REQUEST_PRESENT: string = "RETWE_REQUEST_PRESENT";
    public static readonly REQUEST_TROPHY: string = "RETWE_REQUEST_TROPHY";
    public static readonly REQUEST_TEASER: string = "RETWE_REQUEST_TEASER";
    public static readonly REQUEST_ECOTRONBOX: string = "RETWE_REQUEST_ECOTRONBOX";
    public static readonly REQUEST_DIMMER: string = "RETWE_REQUEST_DIMMER";
    public static readonly REMOVE_DIMMER: string = "RETWE_REMOVE_DIMMER";
    public static readonly REQUEST_CLOTHING_CHANGE: string = "RETWE_REQUEST_CLOTHING_CHANGE";
    public static readonly REQUEST_PLAYLIST_EDITOR: string = "RETWE_REQUEST_PLAYLIST_EDITOR";
    public static readonly REQUEST_MANNEQUIN: string = "RETWE_REQUEST_MANNEQUIN";
    public static readonly REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string = "ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG";
    public static readonly REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG: string = "ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG";
    public static readonly REQUEST_BACKGROUND_COLOR: string = "RETWE_REQUEST_BACKGROUND_COLOR";
    public static readonly REQUEST_AREA_HIDE: string = "RETWE_REQUEST_AREA_HIDE";
    public static readonly REQUEST_MYSTERYBOX_OPEN_DIALOG: string = "RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG";
    public static readonly REQUEST_EFFECTBOX_OPEN_DIALOG: string = "RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG";
    public static readonly REQUEST_MYSTERYTROPHY_OPEN_DIALOG: string = "RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG";
    public static readonly REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING: string = "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING";
    public static readonly REQUEST_ACHIEVEMENT_RESOLUTION_FAILED: string = "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED";
    public static readonly REQUEST_FRIEND_FURNITURE_CONFIRM: string = "RETWE_REQUEST_FRIEND_FURNITURE_CONFIRM";
    public static readonly REQUEST_FRIEND_FURNITURE_ENGRAVING: string = "RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING";
    public static readonly REQUEST_BADGE_DISPLAY_ENGRAVING: string = "RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING";
    public static readonly REQUEST_HIGH_SCORE_DISPLAY: string = "RETWE_REQUEST_HIGH_SCORE_DISPLAY";
    public static readonly REQUEST_HIDE_HIGH_SCORE_DISPLAY: string = "RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY";
    public static readonly REQUEST_INTERNAL_LINK: string = "RETWE_REQUEST_INTERNAL_LINK";
    public static readonly REQUEST_ROOM_LINK: string = "RETWE_REQUEST_ROOM_LINK";

    declare private _SafeStr_2147: string;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: string = null, param6: boolean = false, param7: boolean = false) {
        super(param1, param2, param3, param4, param6, param7);
        this._SafeStr_2147 = param5;
    }

    public get widget(): string {
        return this._SafeStr_2147;
    }

    public get contextMenu(): string {
        return this._SafeStr_2147;
    }
}
