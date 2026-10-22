import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RentableSpaceRentFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RentableSpaceRentFailedMessageParser';

export class RentableSpaceRentFailedMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RentableSpaceRentFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RentableSpaceRentFailedMessageParser);
    }

    public getParser(): RentableSpaceRentFailedMessageParser {
        return asInstanceOf(this.parser, RentableSpaceRentFailedMessageParser);
    }
}
