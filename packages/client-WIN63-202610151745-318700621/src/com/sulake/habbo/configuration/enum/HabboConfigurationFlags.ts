import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboConfigurationFlags {
    static { registerClassName(this, 'com.sulake.habbo.configuration.enum::HabboConfigurationFlags'); }

    public static readonly DEFAULT: number = 0;
    public static readonly SKIP_EXTERNAL_VARIABLES: number = 268435456;
    public static readonly SKIP_LOCALIZATIONS: number = 16777216;

    constructor() {
    }
}
