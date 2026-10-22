import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InfoHotelClosingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/InfoHotelClosingMessageParser';

export class InfoHotelClosingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::InfoHotelClosingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InfoHotelClosingMessageParser);
    }

    public getParser(): InfoHotelClosingMessageParser {
        return this._parser instanceof InfoHotelClosingMessageParser ? this._parser : null;
    }
}
