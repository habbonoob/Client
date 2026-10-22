import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWindowTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::HabboWindowTrackingEvent'); }

    public static readonly HABBO_WINDOW_TRACKING_EVENT_INPUT: string = "HABBO_WINDOW_TRACKING_EVENT_INPUT";
    public static readonly HABBO_WINDOW_TRACKING_EVENT_RENDER: string = "HABBO_WINDOW_TRACKING_EVENT_RENDER";
    public static readonly HABBO_WINDOW_TRACKING_EVENT_SLEEP: string = "HABBO_WINDOW_TRACKING_EVENT_SLEEP";

    constructor() {
    }
}
