import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PollContentsParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollContentsParser';

export class PollContentsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.poll::PollContentsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PollContentsParser);
    }

    public getParser(): PollContentsParser {
        return this._parser instanceof PollContentsParser ? this._parser : null;
    }
}
