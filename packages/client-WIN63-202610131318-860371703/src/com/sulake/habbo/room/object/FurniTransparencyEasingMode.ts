import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniTransparencyEasingMode {
    static { registerClassName(this, 'com.sulake.habbo.room.object::FurniTransparencyEasingMode'); }

    public static readonly INSTANT: number = 0;
    public static readonly LINEAR: number = 1;
    public static readonly EASE_IN: number = 2;
    public static readonly _SafeStr_8099: number = 3;
    public static readonly _SafeStr_8601: number = 4;

    constructor() {
    }
}
