import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionErrorMessageParser';

export class GuideSessionErrorMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionErrorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionErrorMessageParser);
    }

    public getParser(): GuideSessionErrorMessageParser {
        return this._parser instanceof GuideSessionErrorMessageParser ? this._parser : null;
    }
}
