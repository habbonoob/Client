import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboLocalizationFlags {
    static { registerClassName(this, 'com.sulake.habbo.localization.enum::HabboLocalizationFlags'); }

    public static readonly DEFAULT: number = 0;
    public static readonly SKIP_EXTERNAL_LOCALIZATIONS: number = 268435456;

    constructor() {
    }
}
