import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FriendBarUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::FriendBarUpdateEvent'); }

    public static readonly FRIEND_LIST_UPDATED: string = "FBE_UPDATED";

    constructor() {
        super("FBE_UPDATED", false, false);
    }
}
