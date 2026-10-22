import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CustomStackingHeightUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/CustomStackingHeightUpdateMessageParser';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { CustomStackHeightWidget } from '@/com/sulake/habbo/ui/widget/furniture/CustomStackHeightWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CustomStackingHeightUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/CustomStackingHeightUpdateMessageEvent';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureCustomStackHeightWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureCustomStackHeightWidgetHandler'); }

    constructor() {
    }

    declare private _widget: CustomStackHeightWidget;

    private _SafeStr_5782: number = -1;

    declare private _container: IRoomWidgetHandlerContainer;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this._container.connection.addMessageEvent(new CustomStackingHeightUpdateMessageEvent(this.onStackHeightUpdate));
    }

    public set widget(param1: CustomStackHeightWidget) {
        this._widget = param1;
    }

    public get type(): string {
        return "RWE_CUSTOM_STACK_HEIGHT";
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public dispose(): void {
        this._container = null;
        this._widget = null;
    }

    private onStackHeightUpdate = (param1: CustomStackingHeightUpdateMessageEvent): void => {
        let _loc2_: CustomStackingHeightUpdateMessageParser = param1.getParser();
        if (this._widget && this.validateRights()) {
            this._widget.updateHeight(_loc2_.furniId, _loc2_.height);
        }
    };

    private validateRights(param1: IRoomObject = null): boolean {
        let _loc2_: boolean = this._container.roomSession.isRoomOwner;
        let _loc3_: any = this._container.roomSession.roomControllerLevel >= 1;
        let _loc4_: boolean = this._container.sessionDataManager.isAnyRoomController;
        let _loc5_: boolean = !!(param1 && this._container.isOwnerOfFurniture(param1));
        return !!(_loc2_ || _loc4_ || _loc3_ || _loc5_);
    }

    public processEvent(param1: Event): void {
        let _loc6_: RoomEngineToWidgetEvent = null;
        let _loc3_: IRoomObject = null;
        let _loc7_: number = 0;
        let _loc5_: IFurnitureData = null;
        let _loc2_: any = false;
        let _loc4_: any = false;
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                _loc6_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                if (param1 != null && this._container.roomEngine != null) {
                    this._SafeStr_5782 = _loc6_.objectId;
                    _loc3_ = this._container.roomEngine.getRoomObject(_loc6_.roomId, _loc6_.objectId, _loc6_.category);
                    if (_loc3_ && this.validateRights(_loc3_)) {
                        if (this._widget) {
                            _loc7_ = _loc3_.getModel().getNumber("furniture_type_id") | 0;
                            _loc5_ = this.container.sessionDataManager.getFloorItemData(_loc7_);
                            _loc2_ = _loc5_.className.indexOf("tile_walkmagic") == 0;
                            _loc4_ = _loc3_.getModel().getNumber("furniture_extra") == 1;
                            this._widget.open(this._SafeStr_5782, _loc3_.getLocation().z, _loc2_, _loc4_);
                        }
                    }
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                _loc6_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                if (param1 != null && this._container.roomEngine != null && this._widget != null) {
                    if (this._SafeStr_5782 == _loc6_.objectId) {
                        this._widget.hide();
                    }
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
