import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import { RoomSessionPropertyUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPropertyUpdateEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class RoomDataHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomDataHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new GetGuestRoomResultEvent(this.onRoomResult));
    }

    private onRoomResult = (param1: IMessageEvent): void => {
        let _loc5_: GetGuestRoomResultEvent = param1 instanceof GetGuestRoomResultEvent ? param1 : null;
        if (_loc5_ == null) {
            return;
        }
        let _loc2_: GetGuestRoomResultMessageParser = _loc5_.getParser();
        if (_loc2_.roomForward) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: GuestRoomData = _loc2_.data;
        _loc3_.tradeMode = _loc4_.tradeMode;
        _loc3_.isGuildRoom = _loc4_.habboGroupId != 0;
        _loc3_.doorMode = _loc4_.doorMode;
        _loc3_.arePetsAllowed = _loc4_.allowPets;
        _loc3_.roomModerationSettings = _loc2_.roomModerationSettings;
        this.listener.events.dispatchEvent(new RoomSessionPropertyUpdateEvent("RSDUE_ALLOW_PETS", _loc3_));
        this.listener.events.dispatchEvent(new RoomSessionEvent("RSE_ROOM_DATA", _loc3_));
    };
}
