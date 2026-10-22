import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LoginFailedHotelClosedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/LoginFailedHotelClosedMessageParser';

export class LoginFailedHotelClosedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::LoginFailedHotelClosedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LoginFailedHotelClosedMessageParser);
    }

    public getParser(): LoginFailedHotelClosedMessageParser {
        return this._parser instanceof LoginFailedHotelClosedMessageParser ? this._parser : null;
    }
}
