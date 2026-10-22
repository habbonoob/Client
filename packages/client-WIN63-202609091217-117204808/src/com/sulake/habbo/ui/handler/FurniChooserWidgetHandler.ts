import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import { RoomWidgetChooserContentEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChooserContentEvent';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';

export class FurniChooserWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurniChooserWidgetHandler'); }

    private _container: IRoomWidgetHandlerContainer = null;
    private _disposed: boolean = false;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_CHOOSER";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWRWM_FURNI_CHOOSER");
        _loc1_.push("RWRWM_FURNI_CHOOSER_ADD");
        _loc1_.push("RWROM_SELECT_OBJECT");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetRequestWidgetMessage = null;
        let _loc4_: IRoomObject = null;
        let _loc5_: ChooserItem = null;
        let _loc3_: RoomWidgetRoomObjectMessage = null;
        if (param1 == null) {
            return null;
        }
        switch (param1.type) {
            case "RWRWM_FURNI_CHOOSER":
                this.handleFurniChooserRequest();
                break;
            case "RWRWM_FURNI_CHOOSER_ADD":
                _loc2_ = param1 instanceof RoomWidgetRequestWidgetMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(this._container.roomEngine.activeRoomId, _loc2_.id, _loc2_.category);
                _loc5_ = this.getChooserItemFor(_loc4_, _loc2_.category);
                if (_loc5_ != null) {
                    this._container.events.dispatchEvent(new RoomWidgetChooserContentEvent("RWCCE_FURNI_CHOOSER_CONTENT_ADD", [_loc5_], this._container.sessionDataManager.isAnyRoomController));
                }
                break;
            case "RWROM_SELECT_OBJECT":
                _loc3_ = param1 instanceof RoomWidgetRoomObjectMessage ? param1 : null;
                if (_loc3_ == null) {
                    return null;
                }
                if (_loc3_.category == 10 || _loc3_.category == 20) {
                    this._container.roomEngine.selectRoomObject(this._container.roomSession.roomId, _loc3_.id, _loc3_.category);
                }
        }
        return null;
    }

    public getChooserItemFor(param1: IRoomObject, param2: number): ChooserItem {
        let _loc6_: number = 0;
        let _loc5_: IFurnitureData = null;
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc8_: number = 0;
        if (param1 != null) {
            if (param2 == 10) {
                _loc6_ = param1.getModel().getNumber("furniture_type_id") | 0;
                _loc5_ = this._container.sessionDataManager.getFloorItemData(_loc6_);
                if (_loc5_ != null) {
                    _loc7_ = _loc5_.localizedName;
                } else {
                    _loc7_ = param1.getType();
                }
                _loc3_ = param1.getModel().getString("furniture_owner_name");
                return new ChooserItem(param1.getId(), 10, _loc7_, _loc3_);
            }
            if (param2 == 20) {
                _loc4_ = param1.getType();
                if (_loc4_.indexOf("poster") == 0) {
                    _loc8_ = Number(_loc4_.replace("poster", "")) | 0;
                    _loc7_ = this._container.localization.getLocalization("poster_" + _loc8_ + "_name", "poster_" + _loc8_ + "_name");
                } else {
                    _loc6_ = param1.getModel().getNumber("furniture_type_id") | 0;
                    _loc5_ = this._container.sessionDataManager.getWallItemData(_loc6_);
                    if (_loc5_ != null && _loc5_.localizedName.length > 0) {
                        _loc7_ = _loc5_.localizedName;
                    } else {
                        _loc7_ = _loc4_;
                    }
                }
                _loc3_ = param1.getModel().getString("furniture_owner_name");
                return new ChooserItem(param1.getId(), 20, _loc7_, _loc3_);
            }
        }
        return null;
    }

    private handleFurniChooserRequest(): void {
        let _loc4_: number = 0;
        let _loc1_: IRoomObject = null;
        let _loc5_: ChooserItem = null;
        let _loc2_: any = null;
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null) {
            return;
        }
        if (this._container.roomSession.userDataManager == null) {
            return;
        }
        let _loc7_: number = this._container.roomSession.roomId;
        let _loc6_: any[] = [];
        let _loc3_: number = this._container.roomEngine.getRoomObjectCount(_loc7_, 10);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc1_ = this._container.roomEngine.getRoomObjectWithIndex(_loc7_, _loc4_, 10);
            _loc5_ = this.getChooserItemFor(_loc1_, 10);
            if (_loc5_ != null) {
                _loc6_.push(_loc5_);
            }
            _loc4_++;
        }
        _loc3_ = this._container.roomEngine.getRoomObjectCount(_loc7_, 20);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc1_ = this._container.roomEngine.getRoomObjectWithIndex(_loc7_, _loc4_, 20);
            _loc5_ = this.getChooserItemFor(_loc1_, 20);
            if (_loc5_ != null) {
                _loc6_.push(_loc5_);
            }
            _loc4_++;
        }
        this._container.events.dispatchEvent(new RoomWidgetChooserContentEvent("RWCCE_FURNI_CHOOSER_CONTENT", _loc6_, this._container.sessionDataManager.isAnyRoomController));
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public processEvent(param1: Event): void {
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
