import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabbiconTabMode {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconTabMode'); }

    public static readonly ALL_SETS: string = "all_sets";
    public static readonly _SafeStr_14132: string = "owned";
    public static readonly _SafeStr_14135: string = "favourited";

    constructor() {
    }
}
