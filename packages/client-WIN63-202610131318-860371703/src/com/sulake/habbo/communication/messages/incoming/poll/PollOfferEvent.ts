import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PollOfferParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollOfferParser';

export class PollOfferEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.poll::PollOfferEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PollOfferParser);
    }

    public getParser(): PollOfferParser {
        return this._parser instanceof PollOfferParser ? this._parser : null;
    }
}
