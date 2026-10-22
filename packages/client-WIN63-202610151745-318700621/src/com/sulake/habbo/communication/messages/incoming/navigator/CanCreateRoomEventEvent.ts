import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CanCreateRoomEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CanCreateRoomEventMessageParser';

export class CanCreateRoomEventEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CanCreateRoomEventEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CanCreateRoomEventMessageParser);
    }

    public getParser(): CanCreateRoomEventMessageParser {
        return this._parser instanceof CanCreateRoomEventMessageParser ? this._parser : null;
    }
}
