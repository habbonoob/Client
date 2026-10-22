import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConfigurationItemStatesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/ConfigurationItemStatesMessageParser';

export class ConfigurationItemStatesMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::ConfigurationItemStatesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConfigurationItemStatesMessageParser);
    }

    public getParser(): ConfigurationItemStatesMessageParser {
        return this._parser instanceof ConfigurationItemStatesMessageParser ? this._parser : null;
    }
}
