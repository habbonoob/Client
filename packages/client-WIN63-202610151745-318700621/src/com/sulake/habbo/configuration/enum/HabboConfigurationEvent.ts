import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboConfigurationEvent {
    static { registerClassName(this, 'com.sulake.habbo.configuration.enum::HabboConfigurationEvent'); }

    public static readonly CONFIGURATION_LOADED: string = "HCE_CONFIGURATION_LOADED";
    public static readonly CONFIGURATION_ERROR: string = "HCE_CONFIGURATION_ERROR";

    constructor() {
    }
}
