import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SelectInitialRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nux/SelectInitialRoomMessageParser';

export class SelectInitialRoomEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::SelectInitialRoomEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SelectInitialRoomMessageParser);
    }

    public getParser(): SelectInitialRoomMessageParser {
        return this._parser instanceof SelectInitialRoomMessageParser ? this._parser : null;
    }
}
