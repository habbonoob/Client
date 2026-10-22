import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SnowWarGameTokensMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/SnowWarGameTokensMessageParser';

export class SnowWarGameTokensMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::SnowWarGameTokensMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SnowWarGameTokensMessageParser);
    }

    public getParser(): SnowWarGameTokensMessageParser {
        return this._parser instanceof SnowWarGameTokensMessageParser ? this._parser : null;
    }
}
