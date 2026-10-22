import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxVisibilityIds {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxVisibilityIds'); }

    public static readonly ONLY_USER: number = 0;
    public static readonly GAME_TEAM: number = 1;
    public static readonly _SafeStr_14193: number = 2;
    public static readonly _SafeStr_7487: number = 3;
    public static readonly _SafeStr_14493: number = 4;

    constructor() {
    }
}
