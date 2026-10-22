import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboRoomSettingsTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.navigator.events::HabboRoomSettingsTrackingEvent'); }

    public static readonly HABBO_ROOM_SETTINGS_TRACKING_EVENT_CLOSED: string = "HABBO_ROOM_SETTINGS_TRACKING_EVENT_CLOSED";
    public static readonly HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT: string = "HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT";
    public static readonly HABBO_ROOM_SETTINGS_TRACKING_EVENT_ADVANCED: string = "HABBO_ROOM_SETTINGS_TRACKING_EVENT_ADVANCED";
    public static readonly HABBO_ROOM_SETTINGS_TRACKING_EVENT_THUMBS: string = "HABBO_ROOM_SETTINGS_TRACKING_EVENT_THUMBS";

    constructor() {
    }
}
