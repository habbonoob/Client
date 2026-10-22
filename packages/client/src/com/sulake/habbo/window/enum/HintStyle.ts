import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HintStyle {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HintStyle'); }

    public static readonly ARROW_HORIZONTAL: number = 0;
    public static readonly ARROW_VERTICAL: number = 1;
}
