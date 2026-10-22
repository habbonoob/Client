import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredClickUserResponseMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredClickUserResponseMessageParser';
import type { WiredEnvironmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredEnvironmentMessageParser';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredClickUserResponseEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredClickUserResponseEvent';
import { WiredEnvironmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredEnvironmentMessageEvent';
import { WiredUserClickHandledEvent } from '@/com/sulake/habbo/roomevents/events/WiredUserClickHandledEvent';

export class WiredEnvironment implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::WiredEnvironment'); }

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._events = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredEnvironmentMessageEvent(this.onWiredEnvironmentEvent));
        this._messageEvents.push(new WiredClickUserResponseEvent(this.onWiredClickUserResponseEvent));
        for (const _loc2_ of this._messageEvents ?? []) {
            this._events.communication.addHabboConnectionMessageEvent(_loc2_);
        }
    }

    declare private _events: HabboUserDefinedRoomEvents;

    declare private _messageEvents: any[];

    private _hasClickUserWired: boolean = false;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get hasClickUserWired(): boolean {
        return this._hasClickUserWired;
    }

    public clear(): void {
        this._hasClickUserWired = false;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._hasClickUserWired = false;
        for (const _loc1_ of this._messageEvents ?? []) {
            this._events.communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._events = null;
    }

    private onWiredEnvironmentEvent = (param1: WiredEnvironmentMessageEvent): void => {
        let _loc2_: WiredEnvironmentMessageParser = param1.getParser();
        this._hasClickUserWired = _loc2_.hasClickUserWired;
    };

    private onWiredClickUserResponseEvent = (param1: WiredClickUserResponseEvent): void => {
        let _loc2_: WiredClickUserResponseMessageParser = param1.getParser();
        this._events.events.dispatchEvent(new WiredUserClickHandledEvent("WIRED_USER_CLICK_HANDLED", _loc2_.index, _loc2_.openMenu));
    };

    get [IDisposable](): true {
        return true;
    }
}
