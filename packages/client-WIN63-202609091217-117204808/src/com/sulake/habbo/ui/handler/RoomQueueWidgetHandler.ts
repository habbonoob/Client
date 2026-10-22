import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomSessionQueueEvent } from '@/com/sulake/habbo/session/events/RoomSessionQueueEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetRoomQueueUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomQueueUpdateEvent';
import { RoomWidgetRoomQueueMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomQueueMessage';

export class RoomQueueWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::RoomQueueWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_ROOM_QUEUE";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWRQM_EXIT_QUEUE");
        _loc1_.push("RWRQM_CHANGE_TO_SPECTATOR_QUEUE");
        _loc1_.push("RWRQM_CHANGE_TO_VISITOR_QUEUE");
        _loc1_.push("RWRQM_CLUB_LINK");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        if (this._container == null || this._container.roomSession == null) {
            return null;
        }
        let _loc2_: RoomWidgetRoomQueueMessage = param1 instanceof RoomWidgetRoomQueueMessage ? param1 : null;
        if (_loc2_ == null) {
            return null;
        }
        switch (param1.type) {
            case "RWRQM_EXIT_QUEUE":
                this._container.roomSession.quit();
                break;
            case "RWRQM_CHANGE_TO_SPECTATOR_QUEUE":
                this._container.roomSession.changeQueue(1);
                break;
            case "RWRQM_CHANGE_TO_VISITOR_QUEUE":
                this._container.roomSession.changeQueue(2);
                break;
            case "RWRQM_CLUB_LINK":
                if (this._container.catalog != null) {
                    this._container.catalog.openClubCenter();
                }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSQE_QUEUE_STATUS"];
    }

    public processEvent(param1: Event): void {
        let _loc5_: RoomSessionQueueEvent = null;
        let _loc8_: string = null;
        let _loc2_: boolean = false;
        let _loc6_: any[] = null;
        let _loc7_: number = 0;
        let _loc3_: boolean = false;
        let _loc4_: RoomWidgetRoomQueueUpdateEvent = null;
        if (this._container == null || this._container.events == null) {
            return;
        }
        let _loc9_: string = param1.type;
        if ("RSQE_QUEUE_STATUS" === _loc9_) {
            _loc5_ = param1 instanceof RoomSessionQueueEvent ? param1 : null;
            if (_loc5_ == null) {
                return;
            }
            switch (_loc5_.queueSetTarget - 1) {
                case 0:
                    _loc8_ = "RWRQUE_SPECTATOR_QUEUE_STATUS";
                    break;
                case 1:
                    _loc8_ = "RWRQUE_VISITOR_QUEUE_STATUS";
            }
            if (_loc8_ == null) {
                return;
            }
            _loc2_ = true;
            if (this._container.inventory != null) {
                _loc2_ = this._container.inventory.clubDays > 0;
            }
            _loc6_ = _loc5_.queueTypes;
            _loc3_ = false;
            if (_loc6_.length > 1) {
                if (_loc2_ && _loc5_.queueTypes.indexOf("c") != -1) {
                    _loc7_ = _loc5_.getQueueSize("c") + 1;
                    _loc3_ = true;
                } else {
                    _loc7_ = _loc5_.getQueueSize("d") + 1;
                }
            } else {
                _loc7_ = _loc5_.getQueueSize(stringOrNull(_loc6_[0])) + 1;
            }
            _loc4_ = new RoomWidgetRoomQueueUpdateEvent(_loc8_, _loc7_, _loc2_, _loc5_.isActive, _loc3_);
            this._container.events.dispatchEvent(_loc4_);
        }
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
