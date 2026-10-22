import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboIconType {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboIconType'); }

    public static readonly ARROW_DOWN: number = 0;
    public static readonly ARROW_UP: number = 1;
    public static readonly ARROW_LEFT: number = 2;
    public static readonly ARROW_RIGHT: number = 3;
    public static readonly TRIANGLE_LEFT: number = 4;
    public static readonly TRIANGLE_RIGHT: number = 5;
    public static readonly TRIANGLE_UP: number = 6;
    public static readonly TRIANGLE_DOWN: number = 7;
    public static readonly SYMBOL_ACCEPT: number = 8;
    public static readonly SYMBOL_DECLINE: number = 9;
    public static readonly COIN: number = 10;
    public static readonly CLUB_ICON_SMALL: number = 11;
    public static readonly VIP_ICON_SMALL: number = 12;
    public static readonly CLUB_ICON_SQUARE: number = 13;
    public static readonly VIP_ICON_SQUARE: number = 14;
    public static readonly CLUB_ICON_SQUARE_BIG: number = 15;
    public static readonly VIP_ICON_SQUARE_BIG: number = 16;
    public static readonly CLUB_ICON_GIGANTIC: number = 17;
    public static readonly VIP_ICON_GIGANTIC: number = 18;

    constructor() {
    }
}
