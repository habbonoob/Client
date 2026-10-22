import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetUserLocationUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserLocationUpdateEvent';
import { RoomWidgetGetObjectLocationMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetObjectLocationMessage';

export class ObjectLocationRequestHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::ObjectLocationRequestHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get type(): string {
        return null;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWGOI_MESSAGE_GET_OBJECT_LOCATION");
        _loc1_.push("RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: Rectangle = null;
        let _loc7_: Point = null;
        let _loc5_: Rectangle = null;
        let _loc3_: IUserData = null;
        if (!param1 || !this._container) {
            return null;
        }
        let _loc4_: RoomWidgetGetObjectLocationMessage = param1 instanceof RoomWidgetGetObjectLocationMessage ? param1 : null;
        if (!_loc4_) {
            return null;
        }
        let _loc6_: IRoomSession = this._container.roomSession;
        switch (param1.type) {
            case "RWGOI_MESSAGE_GET_OBJECT_LOCATION":
                if (!_loc6_ || !_loc6_.userDataManager) {
                    return null;
                }
                _loc3_ = _loc6_.userDataManager.getUserDataByType(_loc4_.objectId, _loc4_.objectType);
                if (_loc3_) {
                    _loc2_ = this._container.roomEngine.getRoomObjectBoundingRectangle(_loc6_.roomId, _loc3_.roomObjectId, 100, this._container.getFirstCanvasId());
                    _loc7_ = this._container.roomEngine.getRoomObjectScreenLocation(_loc6_.roomId, _loc3_.roomObjectId, 100, this._container.getFirstCanvasId());
                    _loc5_ = this._container.getRoomViewRect();
                    if (_loc2_ && _loc5_ && _loc7_) {
                        _loc2_.offset(_loc5_.x, _loc5_.y);
                        _loc7_.offset(_loc5_.x, _loc5_.y);
                    }
                }
                return new RoomWidgetUserLocationUpdateEvent(_loc4_.objectId, _loc2_, _loc7_);
                break;
            case "RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION":
                _loc2_ = this._container.roomEngine.getRoomObjectBoundingRectangle(_loc6_.roomId, _loc4_.objectId, 100, this._container.getFirstCanvasId());
                _loc7_ = this._container.roomEngine.getRoomObjectScreenLocation(_loc6_.roomId, _loc4_.objectId, 100, this._container.getFirstCanvasId());
                _loc5_ = this._container.getRoomViewRect();
                if (_loc2_ && _loc5_ && _loc7_) {
                    _loc2_.offset(_loc5_.x, _loc5_.y);
                    _loc7_.offset(_loc5_.x, _loc5_.y);
                }
                return new RoomWidgetUserLocationUpdateEvent(_loc4_.objectId, _loc2_, _loc7_);
            default:
                return null;
        }
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
