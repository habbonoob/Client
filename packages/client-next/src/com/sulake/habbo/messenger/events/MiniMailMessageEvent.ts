import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class MiniMailMessageEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.messenger.events::MiniMailMessageEvent'); }

    public static readonly NEW_MESSAGE_NOTIFICATION: string = "MMME_new";
    public static readonly _SafeStr_8209: string = "MMME_unread";

    declare private _unreadCount: number;
    static { (this.prototype as any)._unreadCount = 0; }

    constructor(param1: string, param2: number = -1) {
        super(param1);
        this._unreadCount = param2;
    }

    public get unreadCount(): number {
        return this._unreadCount;
    }
}
