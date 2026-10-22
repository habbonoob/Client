import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatControllerAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerAddedMessageParser';

export class FlatControllerAddedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::FlatControllerAddedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatControllerAddedMessageParser);
    }

    public getParser(): FlatControllerAddedMessageParser {
        return this._parser instanceof FlatControllerAddedMessageParser ? this._parser : null;
    }
}
