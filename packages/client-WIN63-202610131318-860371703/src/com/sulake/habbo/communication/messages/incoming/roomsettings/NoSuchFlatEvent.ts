import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NoSuchFlatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/NoSuchFlatMessageParser';

export class NoSuchFlatEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::NoSuchFlatEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NoSuchFlatMessageParser);
    }

    public getParser(): NoSuchFlatMessageParser {
        return this._parser instanceof NoSuchFlatMessageParser ? this._parser : null;
    }
}
