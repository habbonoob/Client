import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class NotificationEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::NotificationEvent'); }

    public static readonly FRIEND_NOTIFICATION_EVENT: string = "FBE_NOTIFICATION_EVENT";

    declare public friendId: number;
    static { (this.prototype as any).friendId = 0; }

    declare public notification: IFriendNotification;

    constructor(param1: number, param2: IFriendNotification) {
        super("FBE_NOTIFICATION_EVENT");
        this.friendId = param1;
        this.notification = param2;
    }
}
