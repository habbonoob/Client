import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RentableSpaceRentOkMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RentableSpaceRentOkMessageParser';

export class RentableSpaceRentOkMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RentableSpaceRentOkMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RentableSpaceRentOkMessageParser);
    }

    public getParser(): RentableSpaceRentOkMessageParser {
        return asInstanceOf(this.parser, RentableSpaceRentOkMessageParser);
    }
}
