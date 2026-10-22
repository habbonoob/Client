import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WindowStyle {
    static { registerClassName(this, 'com.sulake.core.window.enum::WindowStyle'); }

    public static readonly WINDOW_STYLE_DEFAULT: number = 0;

    constructor() {
    }
}
