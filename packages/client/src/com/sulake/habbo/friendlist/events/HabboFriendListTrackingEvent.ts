import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboFriendListTrackingEvent {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.events::HabboFriendListTrackingEvent'); }

    public static readonly HABBO_FRIENDLIST_TRACKING_EVENT_CLOSED: string = "HABBO_FRIENDLIST_TRACKING_EVENT_CLOSED";
    public static readonly HABBO_FRIENDLIST_TRACKING_EVENT_FRIENDS: string = "HABBO_FRIENDLIST_TRACKING_EVENT_FRIENDS";
    public static readonly HABBO_FRIENDLIST_TRACKING_EVENT_SEARCH: string = "HABBO_FRIENDLIST_TRACKING_EVENT_SEARCH";
    public static readonly HABBO_FRIENDLIST_TRACKING_EVENT_REQUEST: string = "HABBO_FRIENDLIST_TRACKING_EVENT_REQUEST";
    public static readonly _SafeStr_8348: string = "HABBO_FRIENDLIST_TRACKING_EVENT_MINIMZED";
    public static readonly HABBO_FRIENDLIST_TRACKING_EVENT_MESSENGER: string = "HABBO_FRIENDLIST_TRACKING_EVENT_MESSENGER";

    constructor() {
    }
}
