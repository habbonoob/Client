import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class ActiveConversationsCountEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::ActiveConversationsCountEvent'); }

    public static readonly ACTIVE_MESSENGER_CONVERSATION_EVENT: string = "AMC_EVENT";

    constructor(param1: number, param2: boolean) {
        super("AMC_EVENT");
        this._activeConversationsCount = param1;
        this._hasUnread = param2;
    }

    declare private _activeConversationsCount: number;
    static { (this.prototype as any)._activeConversationsCount = 0; }

    declare private _hasUnread: boolean;
    static { (this.prototype as any)._hasUnread = false; }

    public get hasUnread(): boolean {
        return this._hasUnread;
    }

    public get activeConversationsCount(): number {
        return this._activeConversationsCount;
    }
}
