import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ViewMode {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.enum::ViewMode'); }

    public static readonly DEFAULT: number = 0;
    public static readonly GHOST: number = 1;
    public static readonly INVISIBLE: number = 2;

    constructor() {
    }
}
