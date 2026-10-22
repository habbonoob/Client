import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboAlertDialogFlag {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboAlertDialogFlag'); }

    public static readonly NULL: number = 0;
    public static readonly TEXT_TITLE: number = 1;
    public static readonly _SafeStr_7917: number = 2;
    public static readonly TEXT_HTML: number = 4;
    public static readonly _SafeStr_8361: number = 8;
    public static readonly _SafeStr_7897: number = 16;
    public static readonly _SafeStr_8007: number = 32;
    public static readonly BUTTON_CUSTOM: number = 64;
    public static readonly _SafeStr_8535: number = 128;
    public static readonly BITMAP_ICON: number = 256;
    public static readonly BITMAP_RESERVED_1: number = 512;
    public static readonly BITMAP_RESERVED_2: number = 1024;
    public static readonly BITMAP_RESERVED_3: number = 2048;

    constructor() {
    }
}
