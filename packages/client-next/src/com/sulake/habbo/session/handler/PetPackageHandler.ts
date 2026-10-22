import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { OpenPetPackageRequestedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OpenPetPackageRequestedMessageParser';
import type { OpenPetPackageResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OpenPetPackageResultMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { OpenPetPackageRequestedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/OpenPetPackageRequestedMessageEvent';
import { OpenPetPackageResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/OpenPetPackageResultMessageEvent';
import { RoomSessionPetPackageEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetPackageEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class PetPackageHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::PetPackageHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new OpenPetPackageRequestedMessageEvent(this.onOpenPetPackageRequested));
        param1.addMessageEvent(new OpenPetPackageResultMessageEvent(this.onOpenPetPackageResult));
    }

    private onOpenPetPackageRequested = (param1: IMessageEvent): void => {
        let _loc2_: OpenPetPackageRequestedMessageParser = (param1 instanceof OpenPetPackageRequestedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        if (this.listener && this.listener.events) {
            this.listener.events.dispatchEvent(new RoomSessionPetPackageEvent("RSOPPE_OPEN_PET_PACKAGE_REQUESTED", _loc3_, _loc2_.objectId, _loc2_.figureData, 0, null));
        }
    };

    private onOpenPetPackageResult = (param1: IMessageEvent): void => {
        let _loc2_: OpenPetPackageResultMessageParser = (param1 instanceof OpenPetPackageResultMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        if (this.listener && this.listener.events) {
            this.listener.events.dispatchEvent(new RoomSessionPetPackageEvent("RSOPPE_OPEN_PET_PACKAGE_RESULT", _loc3_, _loc2_.objectId, null, _loc2_.nameValidationStatus, _loc2_.nameValidationInfo));
        }
    };
}
