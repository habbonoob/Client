import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboHelpTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.help.enum::HabboHelpTrackingEvent'); }

    public static readonly HABBO_HELP_TRACKING_EVENT_CLOSED: string = "HABBO_HELP_TRACKING_EVENT_CLOSED";
    public static readonly HABBO_HELP_TRACKING_EVENT_DEFAULT: string = "HABBO_HELP_TRACKING_EVENT_DEFAULT";

    constructor() {
    }
}
