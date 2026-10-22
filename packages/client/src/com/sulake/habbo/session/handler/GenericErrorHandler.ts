import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GenericErrorParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/GenericErrorParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { GenericErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/GenericErrorEvent';
import { RoomSessionErrorMessageEvent } from '@/com/sulake/habbo/session/events/RoomSessionErrorMessageEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class GenericErrorHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::GenericErrorHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new GenericErrorEvent(this.onGenericError));
    }

    private onGenericError = (param1: IMessageEvent): void => {
        let _loc4_: string = null;
        let _loc2_: GenericErrorParser = (param1 instanceof GenericErrorEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        switch (_loc2_.errorCode - 4008) {
            case 0:
                _loc4_ = "RSEME_KICKED";
                if (this.listener && this.listener.events) {
                    this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(_loc4_, _loc3_));
                }
                return;
            default:
                return;
        }
    };
}
