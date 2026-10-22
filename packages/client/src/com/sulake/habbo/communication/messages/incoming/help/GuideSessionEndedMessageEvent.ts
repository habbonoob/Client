import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionEndedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionEndedMessageParser';

export class GuideSessionEndedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionEndedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionEndedMessageParser);
    }

    public getParser(): GuideSessionEndedMessageParser {
        return this._parser instanceof GuideSessionEndedMessageParser ? this._parser : null;
    }
}
