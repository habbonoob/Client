import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxWidth {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxWidth'); }

    public static readonly NOT_APPLICABLE: string = "not_applicable";
    public static readonly _SafeStr_14501: string = "extra_small";
    public static readonly SMALL: string = "small";
    public static readonly MEDIUM: string = "medium";
    public static readonly LARGE: string = "large";
    public static readonly EXTRA_LARGE: string = "extra_large";
    public static readonly BIG_MAHOOSIVE_CHONKY: string = "big_mahoosive_chonky";

    constructor() {
    }
}
