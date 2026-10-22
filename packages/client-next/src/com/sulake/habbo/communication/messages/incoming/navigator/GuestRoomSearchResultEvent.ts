import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuestRoomSearchResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GuestRoomSearchResultMessageParser';

export class GuestRoomSearchResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::GuestRoomSearchResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuestRoomSearchResultMessageParser);
    }

    public getParser(): GuestRoomSearchResultMessageParser {
        return this._parser instanceof GuestRoomSearchResultMessageParser ? this._parser : null;
    }
}
