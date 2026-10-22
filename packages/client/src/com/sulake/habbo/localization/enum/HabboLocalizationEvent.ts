import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboLocalizationEvent {
    static { registerClassName(this, 'com.sulake.habbo.localization.enum::HabboLocalizationEvent'); }

    public static readonly HABBO_LOCALIZATION_LOADED: string = "HABBO_LOCALIZATION_EVENT_LOCALIZATION_LOADED";
    public static readonly LOCALIZATION_FAILED: string = "LOCALIZATION_EVENT_LOCALIZATION_FAILED";
    public static readonly LOCALIZATION_OVERRIDE_FAILED: string = "LOCALIZATION_EVENT_LOCALIZATION_OVERRIDE_FAILED";
}
