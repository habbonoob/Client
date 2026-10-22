import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class NewMessageEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::NewMessageEvent'); }

    public static readonly NEW_INSTANT_MESSAGE: string = "FBE_MESSAGE";

    declare public notify: boolean;
    static { (this.prototype as any).notify = false; }

    declare public senderId: number;
    static { (this.prototype as any).senderId = 0; }

    constructor(param1: boolean, param2: number) {
        super("FBE_MESSAGE", false, false);
        this.notify = param1;
        this.senderId = param2;
    }
}
