import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NoobnessLevelMessageEventMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/NoobnessLevelMessageEventMessageParser';

export class NoobnessLevelMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::NoobnessLevelMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NoobnessLevelMessageEventMessageParser);
    }

    public get noobnessLevel(): number {
        return (this._parser instanceof NoobnessLevelMessageEventMessageParser ? this._parser : null).noobnessLevel;
    }
}
