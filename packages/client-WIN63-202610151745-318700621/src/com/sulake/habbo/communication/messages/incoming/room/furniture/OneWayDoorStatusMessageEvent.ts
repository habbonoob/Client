import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OneWayDoorStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OneWayDoorStatusMessageParser';

export class OneWayDoorStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::OneWayDoorStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OneWayDoorStatusMessageParser);
    }

    public getParser(): OneWayDoorStatusMessageParser {
        return this._parser instanceof OneWayDoorStatusMessageParser ? this._parser : null;
    }
}
