import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HotLooksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/hotlooks/HotLooksMessageParser';

export class HotLooksMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.hotlooks::HotLooksMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HotLooksMessageParser);
    }

    public getParser(): HotLooksMessageParser {
        return this._parser instanceof HotLooksMessageParser ? this._parser : null;
    }
}
