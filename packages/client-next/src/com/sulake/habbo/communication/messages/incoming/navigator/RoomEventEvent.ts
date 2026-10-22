import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomEventMessageParser';

export class RoomEventEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomEventEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomEventMessageParser);
    }

    public getParser(): RoomEventMessageParser {
        return this._parser instanceof RoomEventMessageParser ? this._parser : null;
    }
}
