import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxShowModeIds {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxShowModeIds'); }

    public static readonly ALWAYS: number = 0;
    public static readonly WHEN_VARIABLE_CHANGES: number = 1;
    public static readonly NEVER: number = 2;

    constructor() {
    }
}
