import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableCodes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::VariableCodes'); }

    public static _SafeStr_7501: number = 0;
    public static USER_VARIABLE: number = 1;
    public static GLOBAL_VARIABLE: number = 2;
    public static CONTEXT_VARIABLE: number = 3;
    public static REFERENCE_VARIABLE: number = 4;
    public static _SafeStr_7482: number = 5;
    public static _SafeStr_7457: number = 6;
    public static ECHO_VARIABLE: number = 7;
    public static _SafeStr_7455: number = 8;

    constructor() {
    }
}
