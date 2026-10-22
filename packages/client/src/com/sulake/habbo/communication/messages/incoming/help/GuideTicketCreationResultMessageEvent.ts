import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideTicketCreationResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideTicketCreationResultMessageParser';

export class GuideTicketCreationResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideTicketCreationResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideTicketCreationResultMessageParser);
    }

    public getParser(): GuideTicketCreationResultMessageParser {
        return this._parser instanceof GuideTicketCreationResultMessageParser ? this._parser : null;
    }
}
