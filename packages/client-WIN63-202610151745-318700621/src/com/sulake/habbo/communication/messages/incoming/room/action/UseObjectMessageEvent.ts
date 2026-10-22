import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UseObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/UseObjectMessageParser';

export class UseObjectMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::UseObjectMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UseObjectMessageParser);
    }

    public getParser(): UseObjectMessageParser {
        return this._parser instanceof UseObjectMessageParser ? this._parser : null;
    }
}
