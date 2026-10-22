import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CanCreateRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CanCreateRoomMessageParser';

export class CanCreateRoomEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CanCreateRoomEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CanCreateRoomMessageParser);
    }

    public getParser(): CanCreateRoomMessageParser {
        return this._parser instanceof CanCreateRoomMessageParser ? this._parser : null;
    }
}
