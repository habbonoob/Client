import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableExtraSourceTypes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common::VariableExtraSourceTypes'); }

    public static GLOBAL_SOURCE: number = -10;
    public static CONTEXT_SOURCE: number = -20;

    constructor() {
    }
}
