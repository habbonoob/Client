import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RentableSpaceStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RentableSpaceStatusMessageParser';

export class RentableSpaceStatusMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RentableSpaceStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RentableSpaceStatusMessageParser);
    }

    public getParser(): RentableSpaceStatusMessageParser {
        return asInstanceOf(this.parser, RentableSpaceStatusMessageParser);
    }
}
