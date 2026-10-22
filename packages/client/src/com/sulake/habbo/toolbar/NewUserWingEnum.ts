import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NewUserWingEnum {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::NewUserWingEnum'); }

    public static readonly SOCIAL: string = "social";
    public static readonly GROUP: string = "group";
    public static readonly QUEST: string = "quest";
    public static readonly GAME: string = "game";
}
