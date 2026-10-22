import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CarryObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/CarryObjectMessageParser';

export class CarryObjectMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::CarryObjectMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CarryObjectMessageParser);
    }

    public getParser(): CarryObjectMessageParser {
        return this._parser instanceof CarryObjectMessageParser ? this._parser : null;
    }
}
