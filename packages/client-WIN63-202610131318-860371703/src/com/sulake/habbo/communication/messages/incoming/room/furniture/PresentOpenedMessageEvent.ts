import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PresentOpenedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/PresentOpenedMessageParser';

export class PresentOpenedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::PresentOpenedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PresentOpenedMessageParser);
    }

    public getParser(): PresentOpenedMessageParser {
        return this._parser instanceof PresentOpenedMessageParser ? this._parser : null;
    }
}
