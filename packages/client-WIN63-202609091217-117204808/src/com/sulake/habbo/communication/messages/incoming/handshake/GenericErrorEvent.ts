import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GenericErrorParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/GenericErrorParser';

export class GenericErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::GenericErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GenericErrorParser);
    }

    public getParser(): GenericErrorParser {
        return this._parser instanceof GenericErrorParser ? this._parser : null;
    }
}
