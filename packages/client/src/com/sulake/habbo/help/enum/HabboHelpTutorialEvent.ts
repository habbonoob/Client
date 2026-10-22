import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboHelpTutorialEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.help.enum::HabboHelpTutorialEvent'); }

    public static readonly _SafeStr_7543: string = "HHTPNUFWE_AVATAR_TUTORIAL_START";
    public static readonly _SafeStr_8498: string = "HHTPNUFWE_LIGHT_CLOTHES_ICON";
    public static readonly DONE_AVATAR_EDITOR_OPENING: string = "HHTE_DONE_AVATAR_EDITOR_OPENING";
    public static readonly DONE_AVATAR_EDITOR_CLOSING: string = "HHTE_DONE_AVATAR_EDITOR_CLOSING";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
