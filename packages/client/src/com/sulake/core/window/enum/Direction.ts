import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Direction {
    static { registerClassName(this, 'com.sulake.core.window.enum::Direction'); }

    public static readonly _SafeStr_7416: string = "up";
    public static readonly DOWN: string = "down";
    public static readonly _SafeStr_6016: string = "left";
    public static readonly RIGHT: string = "right";
}
