import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionStartedMessageParser';

export class GuideSessionStartedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionStartedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionStartedMessageParser);
    }

    public getParser(): GuideSessionStartedMessageParser {
        return this._parser instanceof GuideSessionStartedMessageParser ? this._parser : null;
    }
}
