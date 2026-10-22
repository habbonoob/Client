import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HasClaimedProductResponseParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/HasClaimedProductResponseParser';

export class HasClaimedProductResponseMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.peerservice::HasClaimedProductResponseMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HasClaimedProductResponseParser);
    }

    public getParser(): HasClaimedProductResponseParser {
        return this._parser instanceof HasClaimedProductResponseParser ? this._parser : null;
    }
}
