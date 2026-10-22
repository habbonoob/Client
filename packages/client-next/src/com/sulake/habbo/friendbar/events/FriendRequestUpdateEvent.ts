import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FriendRequestUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::FriendRequestUpdateEvent'); }

    public static readonly FRIEND_REQUEST_UPDATE: string = "FBE_REQUESTS";

    constructor() {
        super("FBE_REQUESTS", false, false);
    }
}
