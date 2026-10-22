import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class InvalidationFlag {
    static { registerClassName(this, 'com.sulake.core.window.graphics::InvalidationFlag'); }

    public static readonly UNKNOWN: number = 0;
    public static readonly REDRAW: number = 1;
    public static readonly RESIZE: number = 2;
    public static readonly RELOCATE: number = 4;
    public static readonly STATE: number = 8;
    public static readonly BLEND: number = 16;
    public static readonly CASCADE: number = 32;

    constructor() {
    }
}
