import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboToolbarEnum {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::HabboToolbarEnum'); }

    public static readonly TOOLBAR_STATE_HOTEL_VIEW: string = "HTE_STATE_HOTEL_VIEW";
    public static readonly TOOLBAR_STATE_GAME_CENTER_VIEW: string = "HTE_STATE_GAME_CENTER_VIEW";
    public static readonly TOOLBAR_STATE_ROOM_VIEW: string = "HTE_STATE_ROOM_VIEW";
    public static readonly TOOLBAR_STATE_HIDDEN: string = "HTE_STATE_HIDDEN";
    public static readonly TOOLBAR_STATE_COLLAPSED: string = "HTE_STATE_COLLAPSED";
    public static readonly TOOLBAR_EXTENSION_EXTRA_MARGIN_CHAT_HISTORY: number = 20;
    public static readonly TOOLBAR_EXTENSION_EXTRA_MARGIN_LANDING_VIEW: number = 10;
    public static readonly TOOLBAR_STATE_NOOB_NOT_HOME: string = "HTE_STATE_NOOB_NOT_HOME";
    public static readonly TOOLBAR_STATE_NOOB_HOME: string = "HETE_STATE_NOOB_HOME";

    constructor() {
    }
}
