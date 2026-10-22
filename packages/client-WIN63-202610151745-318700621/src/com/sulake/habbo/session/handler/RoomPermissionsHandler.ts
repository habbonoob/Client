import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { YouAreControllerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/permissions/YouAreControllerMessageParser';
import type { YouAreNotControllerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/permissions/YouAreNotControllerMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { YouAreControllerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/permissions/YouAreControllerMessageEvent';
import { YouAreNotControllerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/permissions/YouAreNotControllerMessageEvent';
import { YouAreOwnerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/permissions/YouAreOwnerMessageEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class RoomPermissionsHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomPermissionsHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new YouAreControllerMessageEvent(this.onYouAreController));
        param1.addMessageEvent(new YouAreNotControllerMessageEvent(this.onYouAreNotController));
        param1.addMessageEvent(new YouAreOwnerMessageEvent(this.onYouAreOwner));
    }

    private onYouAreController = (param1: IMessageEvent): void => {
        let _loc4_: YouAreControllerMessageEvent = param1 instanceof YouAreControllerMessageEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: YouAreControllerMessageParser = _loc4_.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(_loc2_.flatId);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.roomControllerLevel = _loc2_.roomControllerLevel;
    };

    private onYouAreNotController = (param1: IMessageEvent): void => {
        let _loc4_: YouAreNotControllerMessageEvent = param1 instanceof YouAreNotControllerMessageEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: YouAreNotControllerMessageParser = _loc4_.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(_loc2_.flatId);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.roomControllerLevel = 0;
    };

    private onYouAreOwner = (param1: IMessageEvent): void => {
        let _loc3_: YouAreOwnerMessageEvent = param1 instanceof YouAreOwnerMessageEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.isRoomOwner = true;
    };
}
