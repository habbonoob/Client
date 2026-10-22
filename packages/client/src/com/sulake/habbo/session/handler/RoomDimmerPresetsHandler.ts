import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { RoomDimmerPresetsMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RoomDimmerPresetsMessageData';
import type { RoomDimmerPresetsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RoomDimmerPresetsMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomDimmerPresetsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RoomDimmerPresetsMessageEvent';
import { RoomSessionDimmerPresetsEvent } from '@/com/sulake/habbo/session/events/RoomSessionDimmerPresetsEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class RoomDimmerPresetsHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomDimmerPresetsHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new RoomDimmerPresetsMessageEvent(this.onRoomDimmerPresets));
    }

    private onRoomDimmerPresets = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc6_: RoomDimmerPresetsMessageData = null;
        let _loc5_: RoomDimmerPresetsMessageEvent = param1 instanceof RoomDimmerPresetsMessageEvent ? param1 : null;
        if (_loc5_ == null || _loc5_.getParser() == null) {
            return;
        }
        let _loc2_: RoomDimmerPresetsMessageParser = _loc5_.getParser();
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc7_: RoomSessionDimmerPresetsEvent = new RoomSessionDimmerPresetsEvent("RSDPE_PRESETS", _loc3_);
        _loc7_.selectedPresetId = _loc2_.selectedPresetId;
        _loc7_.itemId = _loc2_.itemId;
        _loc7_.isOn = _loc2_.isOn;
        _loc4_ = 0;
        while (_loc4_ < _loc2_.presetCount) {
            _loc6_ = _loc2_.getPreset(_loc4_);
            if (_loc6_ != null) {
                _loc7_.storePreset(_loc6_.id, _loc6_.type, _loc6_.color | 0, _loc6_.light);
            }
            _loc4_++;
        }
        if (this.listener && this.listener.events) {
            this.listener.events.dispatchEvent(_loc7_);
        }
    };
}
