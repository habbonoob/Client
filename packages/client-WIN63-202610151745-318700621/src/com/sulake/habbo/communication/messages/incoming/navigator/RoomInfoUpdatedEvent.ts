import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomInfoUpdatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomInfoUpdatedMessageParser';

export class RoomInfoUpdatedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomInfoUpdatedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomInfoUpdatedMessageParser);
    }

    public getParser(): RoomInfoUpdatedMessageParser {
        return this._parser instanceof RoomInfoUpdatedMessageParser ? this._parser : null;
    }
}
