import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { AreaHideFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/areahide/AreaHideFurniWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineAreaHideStateWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineAreaHideStateWidgetEvent';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureAreaHideWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureAreaHideWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;

    declare private _widget: AreaHideFurniWidget;

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
        return "RWE_AREA_HIDE";
    }

    public set widget(param1: AreaHideFurniWidget) {
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
        _loc1_.push("RETWE_REQUEST_AREA_HIDE");
        _loc1_.push("RETWE_UPDATE_STATE_AREA_HIDE");
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
        let _loc4_: RoomEngineObjectEvent = null;
        let _loc9_: IRoomObject = null;
        let _loc13_: IRoomObjectModel = null;
        let _loc11_: boolean = false;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc12_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: any = false;
        let _loc10_: any = false;
        let _loc3_: any = false;
        let _loc6_: RoomEngineAreaHideStateWidgetEvent = null;
        switch (param1.type) {
            case "RETWE_REQUEST_AREA_HIDE":
                if (this.validateRights()) {
                    _loc4_ = param1 instanceof RoomEngineObjectEvent ? param1 : null;
                    _loc9_ = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
                    _loc13_ = _loc9_.getModel();
                    _loc11_ = Boolean(_loc9_.getState(0));
                    _loc7_ = _loc13_.getNumber("furniture_area_hide_root_x") | 0;
                    _loc8_ = _loc13_.getNumber("furniture_area_hide_root_y") | 0;
                    _loc12_ = _loc13_.getNumber("furniture_area_hide_width") | 0;
                    _loc5_ = _loc13_.getNumber("furniture_area_hide_length") | 0;
                    _loc2_ = _loc13_.getNumber("furniture_area_hide_invisibility") == 1;
                    _loc10_ = _loc13_.getNumber("furniture_area_hide_wallitems") == 1;
                    _loc3_ = _loc13_.getNumber("furniture_area_hide_invert") == 1;
                    this._widget.open(_loc9_.getId(), _loc11_, _loc7_, _loc8_, _loc12_, _loc5_, _loc2_, _loc10_, _loc3_);
                }
                break;
            case "RETWE_UPDATE_STATE_AREA_HIDE":
                _loc6_ = param1 instanceof RoomEngineAreaHideStateWidgetEvent ? param1 : null;
                this._widget.updateStatus(_loc6_.objectId, _loc6_.isOn);
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
