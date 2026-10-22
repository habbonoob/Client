import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredClickSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredClickSettingsMessageParser';

export class WiredClickSettingsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredClickSettingsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredClickSettingsMessageParser);
    }

    public getParser(): WiredClickSettingsMessageParser {
        return this._parser instanceof WiredClickSettingsMessageParser ? this._parser : null;
    }
}
