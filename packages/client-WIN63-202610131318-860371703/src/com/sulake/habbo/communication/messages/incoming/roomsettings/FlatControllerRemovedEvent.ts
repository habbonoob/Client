import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatControllerRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllerRemovedMessageParser';

export class FlatControllerRemovedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::FlatControllerRemovedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatControllerRemovedMessageParser);
    }

    public getParser(): FlatControllerRemovedMessageParser {
        return this._parser instanceof FlatControllerRemovedMessageParser ? this._parser : null;
    }
}
