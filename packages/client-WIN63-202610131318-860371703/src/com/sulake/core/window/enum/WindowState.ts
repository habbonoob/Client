import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WindowState {
    static { registerClassName(this, 'com.sulake.core.window.enum::WindowState'); }

    public static readonly WINDOW_STATE_DEFAULT: number = 0;
    public static readonly WINDOW_STATE_ACTIVE: number = 1;
    public static readonly _SafeStr_7500: number = 2;
    public static readonly WINDOW_STATE_HOVERING: number = 4;
    public static readonly _SafeStr_7527: number = 8;
    public static readonly _SafeStr_7547: number = 16;
    public static readonly _SafeStr_7564: number = 32;
    public static readonly _SafeStr_7514: number = 64;
    public static readonly WINDOW_STATE_DESTROYING: number = 1073741824;

    constructor() {
    }
}
