import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DiceValueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/DiceValueMessageParser';

export class DiceValueMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::DiceValueMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DiceValueMessageParser);
    }

    public getParser(): DiceValueMessageParser {
        return this._parser instanceof DiceValueMessageParser ? this._parser : null;
    }
}
