import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/ChatMessageParser';
import type { FloodControlMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/FloodControlMessageParser';
import type { SpecialSystemChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/SpecialSystemChatMessageParser';
import type { PetRespectNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/users/PetRespectNotificationParser';
import type { PetSupplementedNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/users/PetSupplementedNotificationParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { ChatMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/ChatMessageEvent';
import { FloodControlMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/FloodControlMessageEvent';
import { RemainingMutePeriodEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/RemainingMutePeriodEvent';
import { ShoutMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/ShoutMessageEvent';
import { SpecialSystemChatMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/SpecialSystemChatMessageEvent';
import { WhisperMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/WhisperMessageEvent';
import { HandItemReceivedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HandItemReceivedMessageEvent';
import { PetRespectNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/PetRespectNotificationEvent';
import { PetSupplementedNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/PetSupplementedNotificationEvent';
import { RespectNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/RespectNotificationMessageEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class RoomChatHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomChatHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new ChatMessageEvent(this.onRoomChat));
        param1.addMessageEvent(new WhisperMessageEvent(this.onRoomWhisper));
        param1.addMessageEvent(new ShoutMessageEvent(this.onRoomShout));
        param1.addMessageEvent(new SpecialSystemChatMessageEvent(this.onSpecialSystemChat));
        param1.addMessageEvent(new RespectNotificationMessageEvent(this.onRespectNotification));
        param1.addMessageEvent(new PetRespectNotificationEvent(this.onPetRespectNotification));
        param1.addMessageEvent(new PetSupplementedNotificationEvent(this.onPetSupplementedNotification));
        param1.addMessageEvent(new FloodControlMessageEvent(this.onFloodControl));
        param1.addMessageEvent(new HandItemReceivedMessageEvent(this.onHandItemNotification));
        param1.addMessageEvent(new RemainingMutePeriodEvent(this.onRemainingMutePeriod));
    }

    private onRoomChat = (param1: IMessageEvent): void => {
        let _loc2_: ChatMessageEvent = null;
        let _loc4_: IRoomSession = null;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc3_: ChatMessageParser = null;
        if (this.listener && this.listener.events) {
            _loc2_ = param1 instanceof ChatMessageEvent ? param1 : null;
            if (_loc2_ && _loc2_.getParser()) {
                _loc4_ = this.listener.getSession(this._SafeStr_2161);
                if (_loc4_ == null) {
                    return;
                }
                _loc5_ = "RSCE_CHAT_EVENT";
                _loc6_ = 0;
                _loc3_ = _loc2_.getParser();
                if (_loc3_.trackingId != -1) {
                    _loc4_.receivedChatWithTrackingId(_loc3_.trackingId);
                }
                this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc5_, _loc4_, _loc3_.userId, _loc3_.text, _loc6_, _loc3_.styleId, _loc3_.links, -1, _loc3_.chatBubbleWidthOverride, _loc3_.hideUsername, _loc3_.location));
            }
        }
    };

    private onSpecialSystemChat = (param1: IMessageEvent): void => {
        if (param1 == null || this.listener == null || this.listener.events == null) {
            return;
        }
        let _loc2_: SpecialSystemChatMessageEvent = param1 instanceof SpecialSystemChatMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: SpecialSystemChatMessageParser = _loc2_.getParser();
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: IUserData = _loc5_.userDataManager.getUserDataByIndex(_loc4_.userIndex);
        if (_loc3_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionChatEvent("RSCE_CHAT_EVENT", _loc5_, _loc3_.roomObjectId, "", 12, 1, null, _loc4_.specialSystemType));
    };

    private onRespectNotification = (param1: IMessageEvent): void => {
        let _loc4_: IRoomSession = null;
        let _loc5_: string = null;
        let _loc7_: number = 0;
        let _loc3_: IUserData = null;
        let _loc6_: string = null;
        let _loc2_: RespectNotificationMessageEvent = param1 instanceof RespectNotificationMessageEvent ? param1 : null;
        if (this.listener && this.listener.events) {
            _loc4_ = this.listener.getSession(this._SafeStr_2161);
            if (_loc4_ == null) {
                return;
            }
            _loc5_ = "RSCE_CHAT_EVENT";
            _loc7_ = 3;
            _loc3_ = _loc4_.userDataManager.getUserData(_loc2_.userId);
            if (_loc3_ == null) {
                return;
            }
            _loc6_ = "";
            this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc5_, _loc4_, _loc3_.roomObjectId, _loc6_, _loc7_, 1));
        }
    };

    private onPetRespectNotification = (param1: PetRespectNotificationEvent): void => {
        if (param1 == null || this.listener == null || this.listener.events == null) {
            return;
        }
        let _loc3_: PetRespectNotificationParser = param1.getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: string = "RSCE_CHAT_EVENT";
        let _loc6_: number = 4;
        if (_loc3_.isTreat()) {
            _loc6_ = 6;
        }
        let _loc2_: IUserData = _loc4_.userDataManager.getPetUserData(_loc3_.petData.id);
        if (_loc2_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc5_, _loc4_, _loc2_.roomObjectId, "", _loc6_, 1));
    };

    private onPetSupplementedNotification = (param1: PetSupplementedNotificationEvent): void => {
        if (param1 == null || this.listener == null || this.listener.events == null) {
            return;
        }
        let _loc3_: PetSupplementedNotificationParser = param1.getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        let _loc7_: string = "RSCE_CHAT_EVENT";
        let _loc8_: number = 7;
        switch (_loc3_.supplementType - 2) {
            case 0:
                _loc8_ = 7;
                break;
            case 1:
                _loc8_ = 8;
                break;
            case 2:
                _loc8_ = 9;
        }
        let _loc2_: IUserData = _loc4_.userDataManager.getPetUserData(_loc3_.petId);
        if (_loc2_ == null) {
            return;
        }
        let _loc6_: number = -1;
        let _loc5_: IUserData = _loc4_.userDataManager.getUserData(_loc3_.userId);
        if (_loc5_ != null) {
            _loc6_ = _loc5_.roomObjectId;
        }
        this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc7_, _loc4_, _loc2_.roomObjectId, "", _loc8_, 1, null, _loc6_));
    };

    private onHandItemNotification = (param1: HandItemReceivedMessageEvent): void => {
        let _loc2_: IRoomSession = null;
        if (this.listener && this.listener.events) {
            _loc2_ = this.listener.getSession(this._SafeStr_2161);
            if (_loc2_) {
                this.listener.events.dispatchEvent(new RoomSessionChatEvent("RSCE_CHAT_EVENT", _loc2_, param1.giverUserId, "", 5, 1, null, param1.handItemType));
            }
        }
    };

    private onRemainingMutePeriod = (param1: RemainingMutePeriodEvent): void => {
        let _loc2_: IRoomSession = null;
        if (this.listener && this.listener.events) {
            _loc2_ = this.listener.getSession(this._SafeStr_2161);
            if (_loc2_) {
                this.listener.events.dispatchEvent(new RoomSessionChatEvent("RSCE_CHAT_EVENT", _loc2_, _loc2_.ownUserRoomId, "", 10, 1, null, param1.secondsRemaining));
            }
        }
    };

    private onRoomWhisper = (param1: IMessageEvent): void => {
        let _loc2_: WhisperMessageEvent = null;
        let _loc4_: IRoomSession = null;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc3_: ChatMessageParser = null;
        if (this.listener && this.listener.events) {
            _loc2_ = param1 instanceof WhisperMessageEvent ? param1 : null;
            if (_loc2_ && _loc2_.getParser()) {
                _loc4_ = this.listener.getSession(this._SafeStr_2161);
                if (_loc4_ == null) {
                    return;
                }
                _loc5_ = "RSCE_CHAT_EVENT";
                _loc6_ = 1;
                _loc3_ = _loc2_.getParser();
                this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc5_, _loc4_, _loc3_.userId, _loc3_.text, _loc6_, _loc3_.styleId, _loc3_.links, -1, _loc3_.chatBubbleWidthOverride, _loc3_.hideUsername, _loc3_.location));
            }
        }
    };

    private onRoomShout = (param1: IMessageEvent): void => {
        let _loc2_: ShoutMessageEvent = null;
        let _loc4_: IRoomSession = null;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc3_: ChatMessageParser = null;
        if (this.listener && this.listener.events) {
            _loc2_ = param1 instanceof ShoutMessageEvent ? param1 : null;
            if (_loc2_ && _loc2_.getParser()) {
                _loc4_ = this.listener.getSession(this._SafeStr_2161);
                if (_loc4_ == null) {
                    return;
                }
                _loc5_ = "RSCE_CHAT_EVENT";
                _loc6_ = 2;
                _loc3_ = _loc2_.getParser();
                this.listener.events.dispatchEvent(new RoomSessionChatEvent(_loc5_, _loc4_, _loc3_.userId, _loc3_.text, _loc6_, _loc3_.styleId, _loc3_.links, -1, _loc3_.chatBubbleWidthOverride, _loc3_.hideUsername, _loc3_.location));
            }
        }
    };

    private onFloodControl = (param1: IMessageEvent): void => {
        let _loc3_: FloodControlMessageParser = null;
        let _loc4_: IRoomSession = null;
        let _loc2_: number = 0;
        if (this.listener && this.listener.events) {
            _loc3_ = (param1 instanceof FloodControlMessageEvent ? param1 : null).getParser();
            _loc4_ = this.listener.getSession(this._SafeStr_2161);
            if (_loc4_ == null) {
                return;
            }
            _loc2_ = _loc3_.seconds;
            Logger.log("received flood control event for " + _loc2_ + " seconds");
            this.listener.events.dispatchEvent(new RoomSessionChatEvent("RSCE_FLOOD_EVENT", _loc4_, -1, "" + _loc2_, 0, 0, null));
        }
    };
}
