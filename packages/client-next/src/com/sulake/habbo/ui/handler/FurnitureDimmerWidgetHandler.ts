import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSessionDimmerPresetsEventPresetItem } from '@/com/sulake/habbo/session/events/RoomSessionDimmerPresetsEventPresetItem';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineDimmerStateEvent } from '@/com/sulake/habbo/room/events/RoomEngineDimmerStateEvent';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { RoomSessionDimmerPresetsEvent } from '@/com/sulake/habbo/session/events/RoomSessionDimmerPresetsEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetDimmerStateUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerStateUpdateEvent';
import { RoomWidgetDimmerUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerUpdateEvent';
import { RoomWidgetDimmerChangeStateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerChangeStateMessage';
import { RoomWidgetDimmerPreviewMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerPreviewMessage';
import { RoomWidgetDimmerSavePresetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerSavePresetMessage';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureDimmerWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureDimmerWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_ROOM_DIMMER";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_DIMMER", "RWSDPM_SAVE_PRESET", "RWCDSM_CHANGE_STATE", "RWDPM_PREVIEW_DIMMER_PRESET"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc4_: RoomWidgetFurniToWidgetMessage = null;
        let _loc2_: RoomWidgetDimmerSavePresetMessage = null;
        let _loc5_: RoomWidgetDimmerChangeStateMessage = null;
        let _loc6_: number = 0;
        let _loc3_: RoomWidgetDimmerPreviewMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_DIMMER":
                if (this.validateRights()) {
                    _loc4_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                    this._container.roomSession.sendRoomDimmerGetPresetsMessage(_loc4_.id);
                }
                break;
            case "RWSDPM_SAVE_PRESET":
                if (this.validateRights()) {
                    _loc2_ = param1 instanceof RoomWidgetDimmerSavePresetMessage ? param1 : null;
                    this._container.roomSession.sendRoomDimmerSavePresetMessage(_loc2_.presetNumber, _loc2_.effectTypeId, _loc2_.color, _loc2_.brightness, _loc2_.apply, _loc2_.objectId);
                }
                break;
            case "RWCDSM_CHANGE_STATE":
                if (this.validateRights()) {
                    _loc5_ = param1 instanceof RoomWidgetDimmerChangeStateMessage ? param1 : null;
                    this._container.roomSession.sendRoomDimmerChangeStateMessage(_loc5_.objectId);
                }
                break;
            case "RWDPM_PREVIEW_DIMMER_PRESET":
                _loc6_ = this._container.roomSession.roomId;
                _loc3_ = param1 instanceof RoomWidgetDimmerPreviewMessage ? param1 : null;
                if (_loc3_ == null || this._container.roomEngine == null) {
                    return null;
                }
                this._container.roomEngine.updateObjectRoomColor(_loc6_, _loc3_.color, _loc3_.brightness, _loc3_.bgOnly);
        }
        return null;
    }

    private validateRights(): boolean {
        let _loc1_: boolean = this._container.roomSession.isRoomOwner;
        let _loc2_: boolean = this._container.roomSession.roomControllerLevel >= 1;
        let _loc3_: boolean = this._container.sessionDataManager.isAnyRoomController;
        return _loc1_ || _loc3_ || _loc2_;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RSDPE_PRESETS");
        _loc1_.push("REDSE_ROOM_COLOR");
        _loc1_.push("RETWE_REMOVE_DIMMER");
        return _loc1_;
    }

    public processEvent(param1: Event): void {
        let _loc6_: RoomSessionDimmerPresetsEvent = null;
        let _loc2_: RoomWidgetDimmerUpdateEvent = null;
        let _loc7_: number = 0;
        let _loc8_: RoomSessionDimmerPresetsEventPresetItem = null;
        let _loc3_: RoomEngineDimmerStateEvent = null;
        let _loc4_: RoomWidgetDimmerStateUpdateEvent = null;
        let _loc9_: RoomEngineToWidgetEvent = null;
        let _loc5_: RoomWidgetDimmerUpdateEvent = null;
        if (this._container == null || this._container.events == null) {
            return;
        }
        switch (param1.type) {
            case "RSDPE_PRESETS":
                _loc6_ = param1 instanceof RoomSessionDimmerPresetsEvent ? param1 : null;
                _loc2_ = new RoomWidgetDimmerUpdateEvent("RWDUE_PRESETS");
                _loc2_.selectedPresetId = _loc6_.selectedPresetId;
                _loc2_.itemId = _loc6_.itemId;
                _loc2_.isOn = _loc6_.isOn;
                _loc7_ = 0;
                while (_loc7_ < _loc6_.presetCount) {
                    _loc8_ = _loc6_.getPreset(_loc7_);
                    if (_loc8_ != null) {
                        _loc2_.storePreset(_loc8_.id, _loc8_.type, _loc8_.color | 0, _loc8_.light);
                    }
                    _loc7_++;
                }
                this._container.events.dispatchEvent(_loc2_);
                break;
            case "REDSE_ROOM_COLOR":
                _loc3_ = param1 instanceof RoomEngineDimmerStateEvent ? param1 : null;
                _loc4_ = new RoomWidgetDimmerStateUpdateEvent(_loc3_.objectId, _loc3_.state, _loc3_.presetId, _loc3_.effectId, _loc3_.color, _loc3_.brightness);
                this._container.events.dispatchEvent(_loc4_);
                break;
            case "RETWE_REMOVE_DIMMER":
                _loc9_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                _loc5_ = new RoomWidgetDimmerUpdateEvent("RWDUE_HIDE");
                _loc5_.itemId = _loc9_.objectId;
                this._container.events.dispatchEvent(_loc5_);
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
