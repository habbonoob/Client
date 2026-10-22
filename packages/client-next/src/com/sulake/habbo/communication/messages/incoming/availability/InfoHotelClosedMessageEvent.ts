import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InfoHotelClosedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/InfoHotelClosedMessageParser';

export class InfoHotelClosedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::InfoHotelClosedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InfoHotelClosedMessageParser);
    }

    public getParser(): InfoHotelClosedMessageParser {
        return this._parser instanceof InfoHotelClosedMessageParser ? this._parser : null;
    }
}
