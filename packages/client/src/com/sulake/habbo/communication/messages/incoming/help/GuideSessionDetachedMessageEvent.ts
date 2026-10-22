import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionDetachedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionDetachedMessageParser';

export class GuideSessionDetachedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionDetachedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionDetachedMessageParser);
    }

    public getParser(): GuideSessionDetachedMessageParser {
        return this._parser instanceof GuideSessionDetachedMessageParser ? this._parser : null;
    }
}
