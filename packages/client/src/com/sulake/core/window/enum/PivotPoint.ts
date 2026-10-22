import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PivotPoint {
    static { registerClassName(this, 'com.sulake.core.window.enum::PivotPoint'); }

    public static readonly TOP_LEFT: number = 0;
    public static readonly TOP_CENTER: number = 1;
    public static readonly TOP_RIGHT: number = 2;
    public static readonly _SafeStr_8441: number = 3;
    public static readonly CENTER: number = 4;
    public static readonly CENTER_RIGHT: number = 5;
    public static readonly BOTTOM_LEFT: number = 6;
    public static readonly BOTTOM_CENTER: number = 7;
    public static readonly BOTTOM_RIGHT: number = 8;
    public static readonly PIVOT_NAMES: any[] = ["top left", "top center", "top right", "center left", "center", "center right", "bottom left", "bottom center", "bottom right"];

    public static pivotFromName(param1: string): number {
        return PivotPoint.PIVOT_NAMES.indexOf(param1) >>> 0;
    }

    constructor() {
    }
}
