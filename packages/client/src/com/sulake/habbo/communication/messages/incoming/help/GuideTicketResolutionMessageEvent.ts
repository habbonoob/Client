import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideTicketResolutionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideTicketResolutionMessageParser';

export class GuideTicketResolutionMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideTicketResolutionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideTicketResolutionMessageParser);
    }

    public getParser(): GuideTicketResolutionMessageParser {
        return this._parser instanceof GuideTicketResolutionMessageParser ? this._parser : null;
    }
}
