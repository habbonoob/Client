import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWindowStyle {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboWindowStyle'); }

    public static readonly NULL: number = 0;
    public static readonly DEFAULT: number = 0;
    public static readonly BLACK: number = 1;
    public static readonly SHINY: number = 3;

    constructor() {
    }
}
