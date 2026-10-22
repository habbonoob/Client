import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NativeApplicationEvents {
    static { registerClassName(this, 'com.sulake.habbo.utils.air::NativeApplicationEvents'); }

    public static readonly APPLICATION_DEACTIVE: string = "NAE_application_deactive";
    public static readonly APPLICATION_ACTIVE: string = "NAE_application_active";
    public static readonly _SafeStr_8050: string = "NAE_application_suspend";

    constructor() {
    }
}
