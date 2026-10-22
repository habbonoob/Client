import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FloodControlMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/FloodControlMessageParser';

export class FloodControlMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::FloodControlMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FloodControlMessageParser);
    }

    public getParser(): FloodControlMessageParser {
        return this._parser instanceof FloodControlMessageParser ? this._parser : null;
    }
}
