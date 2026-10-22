import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { BackgroundColorFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/backgroundcolor/BackgroundColorFurniWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureBackgroundColorWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureBackgroundColorWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;

    declare private _widget: BackgroundColorFurniWidget;

    declare private _container: IRoomWidgetHandlerContainer;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_ROOM_BACKGROUND_COLOR";
    }

    public set widget(param1: BackgroundColorFurniWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.container = null;
            this._disposed = true;
        }
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RETWE_REQUEST_BACKGROUND_COLOR");
        return _loc1_;
    }

    public update(): void {
    }

    private validateRights(): boolean {
        let _loc1_: boolean = this._container.roomSession.isRoomOwner;
        let _loc2_: any = this._container.roomSession.roomControllerLevel >= 1;
        let _loc3_: boolean = this._container.sessionDataManager.isAnyRoomController;
        return !!(_loc1_ || _loc3_ || _loc2_);
    }

    public processEvent(param1: Event): void {
        let _loc3_: RoomEngineObjectEvent = null;
        let _loc4_: IRoomObject = null;
        let _loc6_: IRoomObjectModel = null;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: any = param1.type;
        if ("RETWE_REQUEST_BACKGROUND_COLOR" === _loc8_) {
            if (this.validateRights()) {
                _loc3_ = param1 instanceof RoomEngineObjectEvent ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc3_.roomId, _loc3_.objectId, _loc3_.category);
                _loc6_ = _loc4_.getModel();
                _loc5_ = _loc6_.getNumber("furniture_room_background_color_hue") | 0;
                _loc2_ = _loc6_.getNumber("furniture_room_background_color_saturation") | 0;
                _loc7_ = _loc6_.getNumber("furniture_room_background_color_lightness") | 0;
                this._widget.open(_loc4_.getId(), _loc5_, _loc2_, _loc7_);
            }
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
