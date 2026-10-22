import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class ActiveConversationEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.messenger.events::ActiveConversationEvent'); }

    public static readonly ACTIVE_CONVERSATION_COUNT_CHANGED: string = "ACCE_changed";

    constructor(param1: string, param2: number, param3: boolean) {
        super(param1);
        this._activeConversationsCount = param2;
        this._hasUnread = param3;
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
