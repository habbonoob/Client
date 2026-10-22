import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredEnvironmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredEnvironmentMessageParser';

export class WiredEnvironmentMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredEnvironmentMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredEnvironmentMessageParser);
    }

    public getParser(): WiredEnvironmentMessageParser {
        return this._parser instanceof WiredEnvironmentMessageParser ? this._parser : null;
    }
}
