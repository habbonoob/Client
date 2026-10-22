import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BanInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/BanInfoMessageParser';

export class BanInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::BanInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BanInfoMessageParser);
    }

    public getParser(): BanInfoMessageParser {
        return this._parser instanceof BanInfoMessageParser ? this._parser : null;
    }
}
