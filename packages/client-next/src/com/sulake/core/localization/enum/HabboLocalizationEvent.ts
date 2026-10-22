import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboLocalizationEvent {
    static { registerClassName(this, 'com.sulake.core.localization.enum::HabboLocalizationEvent'); }

    public static readonly LANGUAGE_CHANGED: string = "LOCALIZATION_EVENT_LANGUAGE_CHANGED";
    public static readonly LOCALIZATION_LOADED: string = "LOCALIZATION_EVENT_LOCALIZATION_LOADED";
    public static readonly LOCALIZATION_FAILED: string = "LOCALIZATION_EVENT_LOCALIZATION_FAILED";

    constructor() {
    }
}
