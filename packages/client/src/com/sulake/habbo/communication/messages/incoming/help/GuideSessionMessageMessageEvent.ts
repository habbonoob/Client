import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionMessageMessageParser';

export class GuideSessionMessageMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionMessageMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionMessageMessageParser);
    }

    public getParser(): GuideSessionMessageMessageParser {
        return this._parser instanceof GuideSessionMessageMessageParser ? this._parser : null;
    }
}
