import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { MannequinWidget } from '@/com/sulake/habbo/ui/widget/furniture/mannequin/MannequinWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class MannequinWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::MannequinWidgetHandler'); }

    private _disposed: boolean = false;

    declare private _widget: MannequinWidget;

    declare private _container: IRoomWidgetHandlerContainer;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.container = null;
            this._disposed = true;
        }
    }

    public get type(): string {
        return "RWE_MANNEQUIN";
    }

    public set widget(param1: MannequinWidget) {
        this._widget = param1;
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RETWE_REQUEST_MANNEQUIN");
        return _loc1_;
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomEngineObjectEvent = null;
        let _loc3_: IRoomObject = null;
        let _loc5_: IRoomObjectModel = null;
        let _loc4_: string = null;
        let _loc6_: string = null;
        let _loc7_: string = null;
        let _loc8_: any = param1.type;
        if ("RETWE_REQUEST_MANNEQUIN" === _loc8_) {
            _loc2_ = param1 instanceof RoomEngineObjectEvent ? param1 : null;
            _loc3_ = this._container.roomEngine.getRoomObject(_loc2_.roomId, _loc2_.objectId, _loc2_.category);
            _loc5_ = _loc3_.getModel();
            _loc4_ = _loc5_.getString("furniture_mannequin_figure");
            _loc6_ = _loc5_.getString("furniture_mannequin_gender");
            _loc7_ = _loc5_.getString("furniture_mannequin_name");
            if (_loc4_ != null && _loc6_ != null) {
                this._widget.open(_loc3_.getId(), _loc4_, _loc6_, _loc7_);
            }
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
