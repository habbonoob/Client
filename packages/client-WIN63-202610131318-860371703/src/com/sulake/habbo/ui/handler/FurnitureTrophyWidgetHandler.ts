import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetTrophyDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetTrophyDataUpdateEvent';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureTrophyWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureTrophyWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_TROPHY_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_TROPHY"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc6_: RoomWidgetFurniToWidgetMessage = null;
        let _loc3_: IRoomObject = null;
        let _loc11_: IRoomObjectModel = null;
        let _loc4_: number = NaN;
        let _loc5_: string = null;
        let _loc7_: number = 0;
        let _loc8_: string = null;
        let _loc2_: string = null;
        let _loc9_: string = null;
        let _loc10_: RoomWidgetTrophyDataUpdateEvent = null;
        if (this.disposed || param1 == null) {
            return null;
        }
        let _loc12_: string = param1.type;
        if ("RWFWM_MESSAGE_REQUEST_TROPHY" === _loc12_) {
            _loc6_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
            _loc3_ = this._container.roomEngine.getRoomObject(_loc6_.roomId, _loc6_.id, _loc6_.category);
            if (_loc3_ != null) {
                _loc11_ = _loc3_.getModel();
                if (_loc11_ != null) {
                    _loc4_ = _loc11_.getNumber("furniture_color");
                    _loc5_ = _loc11_.getString("furniture_data");
                    _loc7_ = parseInt(_loc11_.getString("furniture_extras")) | 0;
                    _loc8_ = _loc5_.substring(0, _loc5_.indexOf("\t"));
                    _loc5_ = _loc5_.substring(_loc8_.length + 1, _loc5_.length);
                    _loc2_ = _loc5_.substring(0, _loc5_.indexOf("\t"));
                    _loc9_ = _loc5_.substring(_loc2_.length + 1, _loc5_.length);
                    _loc10_ = new RoomWidgetTrophyDataUpdateEvent("RWTDUE_TROPHY_DATA", _loc4_, _loc8_, _loc2_, _loc9_, _loc7_);
                    this._container.events.dispatchEvent(_loc10_);
                }
            }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
        let _loc2_: Event = null;
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
