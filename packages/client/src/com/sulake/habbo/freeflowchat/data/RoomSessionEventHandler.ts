import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class RoomSessionEventHandler implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.data::RoomSessionEventHandler'); }

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
        this._component.roomSessionManager.events.addEventListener("RSE_CREATED", this.onRoomSessionCreated);
        this._component.roomSessionManager.events.addEventListener("RSE_ENDED", this.onRoomSessionEnded);
    }

    declare private _component: HabboFreeFlowChat;

    public get disposed(): boolean {
        return this._component == null;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._component) {
                this._component.roomSessionManager.events.removeEventListener("RSE_CREATED", this.onRoomSessionCreated);
                this._component.roomSessionManager.events.removeEventListener("RSE_ENDED", this.onRoomSessionEnded);
                this._component = null;
            }
        }
    }

    private onRoomSessionCreated = (param1: RoomSessionEvent): void => {
        this._component.roomEntered();
    };

    private onRoomSessionEnded = (param1: RoomSessionEvent): void => {
        this._component.roomLeft();
    };

    get [IDisposable](): true {
        return true;
    }
}
