import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { PresentOpenedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/PresentOpenedMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { PresentOpenedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/PresentOpenedMessageEvent';
import { RoomSessionPresentEvent } from '@/com/sulake/habbo/session/events/RoomSessionPresentEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class PresentHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::PresentHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new PresentOpenedMessageEvent(this.onPresentOpened));
    }

    private onPresentOpened = (param1: IMessageEvent): void => {
        let _loc2_: PresentOpenedMessageParser = (param1 instanceof PresentOpenedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        if (this.listener && this.listener.events) {
            this.listener.events.dispatchEvent(new RoomSessionPresentEvent("RSPE_PRESENT_OPENED", _loc3_, _loc2_.classId, _loc2_.itemType, _loc2_.productCode, _loc2_.placedItemId, _loc2_.placedItemType, _loc2_.placedInRoom, _loc2_.petFigureString));
        }
    };
}
