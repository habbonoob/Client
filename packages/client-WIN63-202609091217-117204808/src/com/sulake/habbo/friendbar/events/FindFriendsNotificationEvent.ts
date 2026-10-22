import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FindFriendsNotificationEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::FindFriendsNotificationEvent'); }

    public static readonly TYPE: string = "FIND_FRIENDS_RESULT";

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    constructor(param1: boolean) {
        super("FIND_FRIENDS_RESULT");
        this._success = param1;
    }

    public get success(): boolean {
        return this._success;
    }
}
