import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BadgeImageType {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::BadgeImageType'); }

    public static readonly NORMAL: string = "normal";
    public static readonly GROUP: string = "group";
    public static readonly PERK: string = "perk";
    public static readonly ALL: any[] = ["normal", "group", "perk"];

    constructor() {
    }
}
