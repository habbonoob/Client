import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class ActiveConversationsCountEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::ActiveConversationsCountEvent'); }

    public static readonly ACTIVE_MESSENGER_CONVERSATION_EVENT: string = "AMC_EVENT";

    declare private _SafeStr_6704: number;
    static { (this.prototype as any)._SafeStr_6704 = 0; }

    declare private _hasUnread: boolean;
    static { (this.prototype as any)._hasUnread = false; }

    constructor(param1: number, param2: boolean) {
        super("AMC_EVENT");
        this._SafeStr_6704 = param1;
        this._hasUnread = param2;
    }

    public get activeConversationsCount(): number {
        return this._SafeStr_6704;
    }

    public get hasUnread(): boolean {
        return this._hasUnread;
    }
}
