import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetStickieDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetStickieDataUpdateEvent';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';
import { RoomWidgetStickieSendUpdateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetStickieSendUpdateMessage';

export class FurnitureStickieWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureStickieWidgetHandler'); }

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
        return "RWE_FURNI_STICKIE_WIDGET";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_STICKIE", "RWSUM_STICKIE_SEND_DELETE", "RWSUM_STICKIE_SEND_UPDATE"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc6_: RoomWidgetFurniToWidgetMessage = null;
        let _loc4_: IRoomObject = null;
        let _loc10_: IRoomObjectModel = null;
        let _loc2_: string = null;
        let _loc5_: any = null;
        let _loc8_: string = null;
        let _loc3_: boolean = false;
        let _loc9_: RoomWidgetStickieDataUpdateEvent = null;
        let _loc11_: RoomWidgetStickieSendUpdateMessage = null;
        let _loc7_: RoomWidgetStickieSendUpdateMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_STICKIE":
                _loc6_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc6_.roomId, _loc6_.id, _loc6_.category);
                if (_loc4_ != null) {
                    _loc10_ = _loc4_.getModel();
                    if (_loc10_ != null) {
                        _loc2_ = _loc10_.getString("furniture_itemdata");
                        if (_loc2_.length < 6) {
                            return null;
                        }
                        _loc8_ = "";
                        if (_loc2_.indexOf(" ") > 0) {
                            _loc5_ = _loc2_.slice(0, _loc2_.indexOf(" "));
                            _loc8_ = _loc2_.slice(_loc2_.indexOf(" ") + 1, _loc2_.length);
                        } else {
                            _loc5_ = _loc2_;
                        }
                        _loc3_ = this._container.roomSession.isRoomOwner || this._container.sessionDataManager.isAnyRoomController;
                        _loc9_ = new RoomWidgetStickieDataUpdateEvent("RWSDUE_STICKIE_DATA", _loc6_.id, _loc4_.getType(), _loc8_, stringOrNull(_loc5_), _loc3_);
                        this._container.events.dispatchEvent(_loc9_);
                    }
                }
                break;
            case "RWSUM_STICKIE_SEND_UPDATE":
                _loc11_ = param1 instanceof RoomWidgetStickieSendUpdateMessage ? param1 : null;
                if (_loc11_ == null) {
                    return null;
                }
                if (this._container != null && this._container.roomEngine != null) {
                    this._container.roomEngine.modifyRoomObjectData(_loc11_.objectId, 20, _loc11_.colorHex, _loc11_.text);
                }
                break;
            case "RWSUM_STICKIE_SEND_DELETE":
                _loc7_ = param1 instanceof RoomWidgetStickieSendUpdateMessage ? param1 : null;
                if (_loc7_ == null) {
                    return null;
                }
                if (this._container != null && this._container.roomEngine != null) {
                    this._container.roomEngine.deleteRoomObject(_loc7_.objectId, 20);
                }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
        let _loc2_: Event = null;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
