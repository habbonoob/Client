import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';

export class GetGuestRoomResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::GetGuestRoomResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GetGuestRoomResultMessageParser);
    }

    public getParser(): GetGuestRoomResultMessageParser {
        return this._parser instanceof GetGuestRoomResultMessageParser ? this._parser : null;
    }
}
