import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BotSkillEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo.botskills::BotSkillEnum'); }

    public static readonly GENERIC_SKILL: number = 0;
    public static readonly FIGURE_STRING: number = 1;
    public static readonly CHATTER_MARKOV: number = 2;
    public static readonly RANDOM_WALK: number = 3;
    public static readonly _SafeStr_7408: number = 4;
    public static readonly CHANGE_NAME: number = 5;
    public static readonly SERVE_BEVERAGE: number = 6;
    public static readonly INCLIENT_LINK: number = 7;
    public static readonly NUX_PROCEED: number = 8;
    public static readonly NUX_TAKE_TOUR: number = 10;
    public static readonly NO_PICK_UP: number = 12;
    public static readonly NAVIGATOR_SEARCH: number = 14;
    public static readonly DONATE_FURNITURE_TO_USER: number = 24;
    public static readonly DONATE_FURNITURE_TO_ALL: number = 25;

    constructor() {
    }
}
