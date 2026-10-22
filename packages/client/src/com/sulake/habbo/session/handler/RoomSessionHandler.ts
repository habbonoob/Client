import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { FlatAccessDeniedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatAccessDeniedMessageParser';
import type { FlatAccessibleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/FlatAccessibleMessageParser';
import type { OpenConnectionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/OpenConnectionMessageParser';
import type { RoomQueueSet } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomQueueSet';
import type { RoomQueueStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomQueueStatusMessageParser';
import type { RoomReadyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomReadyMessageParser';
import type { YouAreSpectatorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouAreSpectatorMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { FlatAccessDeniedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatAccessDeniedMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { FlatAccessibleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/FlatAccessibleMessageEvent';
import { OpenConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/OpenConnectionMessageEvent';
import { RoomQueueStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomQueueStatusMessageEvent';
import { RoomReadyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomReadyMessageEvent';
import { YouAreSpectatorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/YouAreSpectatorMessageEvent';
import { RoomSessionDoorbellEvent } from '@/com/sulake/habbo/session/events/RoomSessionDoorbellEvent';
import { RoomSessionQueueEvent } from '@/com/sulake/habbo/session/events/RoomSessionQueueEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class RoomSessionHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomSessionHandler'); }

    public static readonly _SafeStr_8475: string = "RS_CONNECTED";
    public static readonly _SafeStr_7628: string = "RS_READY";
    public static readonly _SafeStr_8678: string = "RS_DISCONNECTED";

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new OpenConnectionMessageEvent(this.onRoomConnected));
        param1.addMessageEvent(new FlatAccessibleMessageEvent(this.onFlatAccessible));
        param1.addMessageEvent(new RoomReadyMessageEvent(this.onRoomReady));
        param1.addMessageEvent(new CloseConnectionMessageEvent(this.onRoomDisconnected));
        param1.addMessageEvent(new FlatAccessDeniedMessageEvent(this.onFlatAccessDenied));
        param1.addMessageEvent(new RoomQueueStatusMessageEvent(this.onRoomQueueStatus));
        param1.addMessageEvent(new YouAreSpectatorMessageEvent(this.onYouAreSpectator));
    }

    private onRoomConnected = (param1: OpenConnectionMessageEvent): void => {
        let _loc2_: OpenConnectionMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        if (this.listener) {
            this.listener.sessionUpdate(_loc2_.flatId, "RS_CONNECTED");
        }
    };

    private onFlatAccessible = (param1: FlatAccessibleMessageEvent): void => {
        let _loc3_: IRoomSession = null;
        let _loc2_: FlatAccessibleMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: string = _loc2_.userName;
        if (_loc4_ != null && _loc4_.length > 0) {
            if (this.listener && this.listener.events) {
                _loc3_ = this.listener.getSession(_loc2_.flatId);
                if (_loc3_ != null) {
                    this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent("RSDE_ACCEPTED", _loc3_, _loc4_));
                }
            }
        }
    };

    private onRoomReady = (param1: RoomReadyMessageEvent): void => {
        let _loc2_: RoomReadyMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: number = _loc2_.roomId;
        ErrorReportStorage.addDebugData("RoomID", "Room id: " + _loc3_);
        if (this.listener) {
            this.listener.sessionReinitialize(_loc3_, _loc3_);
            this.listener.sessionUpdate(_loc3_, "RS_READY");
        }
    };

    private onFlatAccessDenied = (param1: FlatAccessDeniedMessageEvent): void => {
        let _loc3_: IRoomSession = null;
        let _loc2_: FlatAccessDeniedMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: string = _loc2_.userName;
        if (_loc4_ == null || _loc4_.length == 0) {
            if (this.listener) {
                this.listener.sessionUpdate(_loc2_.flatId, "RS_DISCONNECTED");
            }
        } else if (this.listener && this.listener.events) {
            _loc3_ = this.listener.getSession(_loc2_.flatId);
            if (_loc3_ != null) {
                this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent("RSDE_REJECTED", _loc3_, _loc4_));
            }
        }
    };

    private onRoomDisconnected = (param1: IMessageEvent): void => {
        let _loc2_: number = this._SafeStr_2161;
        ErrorReportStorage.addDebugData("RoomID", "");
        if (this.listener) {
            this.listener.sessionUpdate(_loc2_, "RS_DISCONNECTED");
        }
    };

    private onRoomQueueStatus = (param1: RoomQueueStatusMessageEvent): void => {
        let _loc7_: any;
        let _loc5_: RoomQueueSet = null;
        let _loc6_: RoomSessionQueueEvent = null;
        let _loc2_: any[] = null;
        if (this.listener == null || this.listener.events == null) {
            return;
        }
        let _loc3_: RoomQueueStatusMessageParser = param1.getParser();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IRoomSession = this.listener.getSession(_loc3_.flatId);
        if (_loc4_ == null) {
            return;
        }
        let _loc8_: any[] = _loc3_.getQueueSetTargets();
        let _loc9_: number = _loc3_.activeTarget;
        for (const _loc10_ of _loc8_ ?? []) {
            _loc5_ = _loc3_.getQueueSet(_loc10_ | 0);
            _loc6_ = new RoomSessionQueueEvent(_loc4_, _loc5_.name, _loc5_.target, _loc5_.target == _loc9_);
            _loc2_ = _loc5_.queueTypes;
            for (_loc7_ of _loc2_ ?? []) {
                _loc6_.addQueue(stringOrNull(_loc7_), _loc5_.getQueueSize(stringOrNull(_loc7_)));
            }
            this.listener.events.dispatchEvent(_loc6_);
        }
    };

    private onYouAreSpectator = (param1: YouAreSpectatorMessageEvent): void => {
        if (this.listener == null) {
            return;
        }
        let _loc2_: YouAreSpectatorMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(_loc2_.flatId);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.isSpectatorMode = true;
    };
}
