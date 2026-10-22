import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MouseCursorType {
    static { registerClassName(this, 'com.sulake.core.window.enum::MouseCursorType'); }

    public static readonly DEFAULT: number = 0;
    public static readonly ARROW: number = 1;
    public static readonly ARROW_LINK: number = 2;
    public static readonly ARROW_BUSY: number = 3;
    public static readonly ARROW_HELP: number = 4;
    public static readonly DRAG: number = 5;
    public static readonly MOVE: number = 6;
    public static readonly MOVE_VERTICAL: number = 7;
    public static readonly MOVE_HORIZONTAL: number = 8;
    public static readonly RESIZE_VERTICAL: number = 9;
    public static readonly RESIZE_HORIZONTAL: number = 10;
    public static readonly RESIZE_DIAGONAL: number = 11;
    public static readonly DENIED: number = 12;
    public static readonly BUSY: number = 13;
    public static readonly IBEAM: number = 14;
    public static readonly NONE: number = 4294967294;
    public static readonly CUSTOM: number = 4294967295;
}
