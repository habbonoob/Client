import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NoobnessLevelEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::NoobnessLevelEnum'); }

    public static readonly _SafeStr_8351: number = 0;
    public static readonly NEW_IDENTITY: number = 1;
    public static readonly REAL_NOOB: number = 2;

    constructor() {
    }
}
