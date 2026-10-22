import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomEventCancelMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomEventCancelMessageParser';

export class RoomEventCancelEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomEventCancelEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomEventCancelMessageParser);
    }
}
