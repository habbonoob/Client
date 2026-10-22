import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { FriendFurniEngravingWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FriendFurniEngravingWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FriendFurniEngravingWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _widget: FriendFurniEngravingWidget = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FRIEND_FURNI_ENGRAVING";
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set widget(param1: FriendFurniEngravingWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
        this._widget = null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING"];
    }

    public processEvent(param1: Event): void {
        let _loc4_: RoomEngineObjectEvent = null;
        let _loc2_: IRoomObject = null;
        let _loc5_: IRoomObjectModel = null;
        let _loc3_: StringArrayStuffData = null;
        if (this.disposed || param1 == null) {
            return;
        }
        let _loc6_: any = param1.type;
        if ("RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING" === _loc6_) {
            _loc4_ = castTo(param1, RoomEngineObjectEvent);
            _loc2_ = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
            if (_loc2_ != null) {
                _loc5_ = _loc2_.getModel();
                if (_loc5_ != null) {
                    _loc3_ = new StringArrayStuffData();
                    _loc3_.initializeFromRoomObjectModel(_loc5_);
                    this._widget.open(_loc2_.getId(), _loc5_.getNumber("furniture_friendfurni_engraving_type") | 0, _loc3_);
                }
            }
        }
    }

    public update(): void {
    }

    public getWidgetMessages(): any[] {
        return [];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
