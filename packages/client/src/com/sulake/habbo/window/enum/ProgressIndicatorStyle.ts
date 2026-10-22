import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ProgressIndicatorStyle {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::ProgressIndicatorStyle'); }

    public static readonly FLAT: string = "flat";
    public static readonly ETCHED: string = "etched";
    public static readonly ALL: any[] = ["flat", "etched"];

    constructor() {
    }
}
