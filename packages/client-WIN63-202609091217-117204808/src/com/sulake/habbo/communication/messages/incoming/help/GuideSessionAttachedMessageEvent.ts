import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionAttachedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionAttachedMessageParser';

export class GuideSessionAttachedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionAttachedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionAttachedMessageParser);
    }

    public getParser(): GuideSessionAttachedMessageParser {
        return this._parser instanceof GuideSessionAttachedMessageParser ? this._parser : null;
    }
}
