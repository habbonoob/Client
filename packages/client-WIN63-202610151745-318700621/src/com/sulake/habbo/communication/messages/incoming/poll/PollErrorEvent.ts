import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PollErrorParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollErrorParser';

export class PollErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.poll::PollErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PollErrorParser);
    }

    public getParser(): PollErrorParser {
        return this._parser instanceof PollErrorParser ? this._parser : null;
    }
}
