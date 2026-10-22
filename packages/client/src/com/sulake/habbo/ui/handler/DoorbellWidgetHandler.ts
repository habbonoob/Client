import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomSessionDoorbellEvent } from '@/com/sulake/habbo/session/events/RoomSessionDoorbellEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetDoorbellEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDoorbellEvent';
import { RoomWidgetLetUserInMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetLetUserInMessage';

export class DoorbellWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::DoorbellWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_DOORBELL";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWLUIM_LET_USER_IN"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetLetUserInMessage = null;
        let _loc3_: any = param1.type;
        if ("RWLUIM_LET_USER_IN" === _loc3_) {
            _loc2_ = param1 instanceof RoomWidgetLetUserInMessage ? param1 : null;
            this._container.roomSession.letUserIn(_loc2_.userName, _loc2_.canEnter);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSDE_DOORBELL", "RSDE_REJECTED", "RSDE_ACCEPTED"];
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomSessionDoorbellEvent = null;
        switch (param1.type) {
            case "RSDE_DOORBELL":
                _loc2_ = param1 instanceof RoomSessionDoorbellEvent ? param1 : null;
                if (_loc2_ == null) {
                    return;
                }
                this._container.events.dispatchEvent(new RoomWidgetDoorbellEvent("RWDE_RINGING", _loc2_.userName));
                break;
            case "RSDE_REJECTED":
                _loc2_ = param1 instanceof RoomSessionDoorbellEvent ? param1 : null;
                if (_loc2_ == null) {
                    return;
                }
                this._container.events.dispatchEvent(new RoomWidgetDoorbellEvent("RWDE_REJECTED", _loc2_.userName));
                break;
            case "RSDE_ACCEPTED":
                _loc2_ = param1 instanceof RoomSessionDoorbellEvent ? param1 : null;
                if (_loc2_ == null) {
                    return;
                }
                this._container.events.dispatchEvent(new RoomWidgetDoorbellEvent("RWDE_ACCEPTED", _loc2_.userName));
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
