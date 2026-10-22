import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/PingMessageParser';

export class PingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::PingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PingMessageParser);
    }
}
