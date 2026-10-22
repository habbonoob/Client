import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FriendBarResizeEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::FriendBarResizeEvent'); }

    public static readonly FRIENDBAR_RESIZE_EVENT: string = "FBE_BAR_RESIZE_EVENT";

    constructor() {
        super("FBE_BAR_RESIZE_EVENT");
    }
}
