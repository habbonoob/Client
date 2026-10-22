import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { CustomStackHeightWidget } from '@/com/sulake/habbo/ui/widget/furniture/CustomStackHeightWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureCustomStackHeightWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureCustomStackHeightWidgetHandler'); }

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: CustomStackHeightWidget;

    private _SafeStr_14561: number = -1;
    private _SafeStr_5782: number = -1;
    private _SafeStr_14562: number = NaN;

    constructor() {
    }

    public set widget(param1: CustomStackHeightWidget) {
        this._widget = param1;
    }

    public get type(): string {
        return "RWE_CUSTOM_STACK_HEIGHT";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container != null) {
            this._container.removeUpdateListener(this);
        }
        this._container = param1;
        if (this._container != null) {
            this._container.addUpdateListener(this);
        }
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
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

    public processEvent(param1: Event): void {
        let _loc6_: RoomEngineToWidgetEvent = null;
        let _loc3_: IRoomObject = null;
        let _loc7_: number = 0;
        let _loc5_: IFurnitureData = null;
        let _loc2_: boolean = false;
        let _loc4_: boolean = false;
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                _loc6_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                if (param1 != null && this._container.roomEngine != null) {
                    this._SafeStr_14561 = _loc6_.roomId;
                    this._SafeStr_5782 = _loc6_.objectId;
                    _loc3_ = this._container.roomEngine.getRoomObject(_loc6_.roomId, _loc6_.objectId, _loc6_.category);
                    if (_loc3_ && this.validateRights(_loc3_)) {
                        if (this._widget) {
                            _loc7_ = _loc3_.getModel().getNumber("furniture_type_id") | 0;
                            _loc5_ = this.container.sessionDataManager.getFloorItemData(_loc7_);
                            _loc2_ = _loc5_.className.indexOf("tile_walkmagic") == 0;
                            _loc4_ = _loc3_.getModel().getNumber("furniture_extra") == 1;
                            this._widget.open(this._SafeStr_5782, this.getCurrentStackHeight(_loc3_), _loc2_, _loc4_);
                            this._SafeStr_14562 = this.getCurrentStackHeight(_loc3_);
                        }
                    }
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                _loc6_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                if (param1 != null && this._container.roomEngine != null && this._widget != null) {
                    if (this._SafeStr_5782 == _loc6_.objectId) {
                        this._widget.hide();
                        this.resetTrackedFurni();
                    }
                }
        }
    }

    public update(): void {
        if (this._container == null || this._container.roomEngine == null || this._widget == null || this._widget.mainWindow == null || !this._widget.mainWindow.visible) {
            return;
        }
        if (this._SafeStr_14561 < 0 || this._SafeStr_5782 < 0) {
            return;
        }
        let _loc1_: IRoomObject = this._container.roomEngine.getRoomObject(this._SafeStr_14561, this._SafeStr_5782, 10);
        if (_loc1_ == null || !this.validateRights(_loc1_)) {
            return;
        }
        let _loc2_: number = this.getCurrentStackHeight(_loc1_);
        if (isNaN(this._SafeStr_14562) || this._SafeStr_14562 != _loc2_) {
            this._SafeStr_14562 = _loc2_;
            this._widget.updateHeight(_loc1_.getId(), _loc2_);
        }
    }

    public dispose(): void {
        if (this._container != null) {
            this._container.removeUpdateListener(this);
        }
        this.resetTrackedFurni();
        this._container = null;
        this._widget = null;
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    private getCurrentStackHeight(param1: IRoomObject): number {
        if (param1 == null || param1.getLocation() == null) {
            return 0;
        }
        let _loc2_: number = param1.getLocation().z;
        return isNaN(_loc2_) ? 0 : _loc2_;
    }

    private validateRights(param1: IRoomObject = null): boolean {
        let _loc2_: boolean = this._container.roomSession.isRoomOwner;
        let _loc3_: boolean = this._container.roomSession.roomControllerLevel >= 1;
        let _loc4_: boolean = this._container.sessionDataManager.isAnyRoomController;
        let _loc5_: boolean = !!(param1 && this._container.isOwnerOfFurniture(param1));
        return _loc2_ || _loc4_ || _loc3_ || _loc5_;
    }

    private resetTrackedFurni(): void {
        this._SafeStr_14561 = -1;
        this._SafeStr_5782 = -1;
        this._SafeStr_14562 = NaN;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
