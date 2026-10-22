import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InterstitialMessageParser } from '@/com/sulake/habbo/communication/messages/parser/advertisement/InterstitialMessageParser';

export class InterstitialMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.advertisement::InterstitialMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InterstitialMessageParser);
    }

    public getParser(): InterstitialMessageParser {
        return this._parser instanceof InterstitialMessageParser ? this._parser : null;
    }
}
