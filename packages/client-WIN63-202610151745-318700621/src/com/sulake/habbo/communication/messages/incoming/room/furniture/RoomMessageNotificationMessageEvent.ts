import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomMessageNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RoomMessageNotificationMessageParser';

export class RoomMessageNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RoomMessageNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomMessageNotificationMessageParser);
    }

    public getParser(): RoomMessageNotificationMessageParser {
        return this._parser instanceof RoomMessageNotificationMessageParser ? this._parser : null;
    }
}
