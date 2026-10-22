import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomSessionPresentEvent } from '@/com/sulake/habbo/session/events/RoomSessionPresentEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetEcotronBoxDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetEcotronBoxDataUpdateEvent';
import { RoomWidgetEcotronBoxOpenMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetEcotronBoxOpenMessage';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureEcotronBoxWidgetHandler implements IRoomWidgetHandler, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureEcotronBoxWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _objectId: number = -1;
    private _name: string = "";

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_ECOTRONBOX_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_ECOTRONBOX", "RWEBOM_OPEN_ECOTRONBOX", "RWEBOM_ECOTRONBOX_OPENED"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc7_: RoomWidgetFurniToWidgetMessage = null;
        let _loc5_: IRoomObject = null;
        let _loc11_: IRoomObjectModel = null;
        let _loc10_: string = null;
        let _loc6_: number = 0;
        let _loc9_: IFurnitureData = null;
        let _loc8_: string = null;
        let _loc2_: boolean = false;
        let _loc3_: RoomWidgetEcotronBoxDataUpdateEvent = null;
        let _loc4_: RoomWidgetEcotronBoxOpenMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_ECOTRONBOX":
                _loc7_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc5_ = this._container.roomEngine.getRoomObject(_loc7_.roomId, _loc7_.id, _loc7_.category);
                if (_loc5_ != null) {
                    _loc11_ = _loc5_.getModel();
                    if (_loc11_ != null) {
                        this._objectId = _loc7_.id;
                        _loc10_ = _loc11_.getString("furniture_data");
                        if (_loc10_ == null) {
                            return null;
                        }
                        _loc6_ = _loc11_.getNumber("furniture_type_id") | 0;
                        _loc9_ = this._container.sessionDataManager.getFloorItemData(_loc6_);
                        _loc8_ = _loc9_ != null ? _loc9_.className : "";
                        _loc2_ = this._container.roomSession.isRoomOwner || this._container.sessionDataManager.isAnyRoomController;
                        _loc3_ = new RoomWidgetEcotronBoxDataUpdateEvent("RWEBDUE_PACKAGEINFO", _loc7_.id, _loc10_, _loc8_, _loc2_);
                        this._container.events.dispatchEvent(_loc3_);
                    }
                }
                break;
            case "RWEBOM_OPEN_ECOTRONBOX":
                _loc4_ = param1 instanceof RoomWidgetEcotronBoxOpenMessage ? param1 : null;
                if (_loc4_.objectId != this._objectId) {
                    return null;
                }
                if (this._container != null && this._container.roomSession != null) {
                    this._container.roomSession.sendPresentOpenMessage(_loc4_.objectId);
                }
        }
        return null;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        let _loc3_: RoomWidgetEcotronBoxDataUpdateEvent = new RoomWidgetEcotronBoxDataUpdateEvent("RWEBDUE_CONTENTS", 0, this._name, "", false, param2);
        this._container.events.dispatchEvent(_loc3_);
    }

    public imageFailed(param1: number): void {
    }

    public getProcessedEvents(): any[] {
        return ["RSPE_PRESENT_OPENED"];
    }

    public processEvent(param1: Event): void {
        let _loc5_: RoomSessionPresentEvent = null;
        let _loc4_: ImageResult = null;
        let _loc2_: IFurnitureData = null;
        let _loc3_: RoomWidgetEcotronBoxDataUpdateEvent = null;
        if (param1 == null) {
            return;
        }
        if (this._container != null && this._container.events != null && param1 != null) {
            let _loc6_: string = param1.type;
            if ("RSPE_PRESENT_OPENED" === _loc6_) {
                _loc5_ = param1 instanceof RoomSessionPresentEvent ? param1 : null;
                if (_loc5_ != null) {
                    _loc4_ = null;
                    this._name = "";
                    if (_loc5_.itemType == "s") {
                        _loc4_ = this._container.roomEngine.getFurnitureIcon(_loc5_.classId, this);
                        _loc2_ = this._container.sessionDataManager.getFloorItemData(_loc5_.classId);
                    } else if (_loc5_.itemType == "i") {
                        _loc4_ = this._container.roomEngine.getWallItemIcon(_loc5_.classId, this);
                        _loc2_ = this._container.sessionDataManager.getWallItemData(_loc5_.classId);
                    }
                    if (_loc2_ != null) {
                        this._name = _loc2_.localizedName;
                    }
                    if (_loc4_ != null) {
                        _loc3_ = new RoomWidgetEcotronBoxDataUpdateEvent("RWEBDUE_CONTENTS", 0, this._name, "", false, _loc4_.data);
                        this._container.events.dispatchEvent(_loc3_);
                    }
                }
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

    get [IGetImageListener](): true {
        return true;
    }
}
