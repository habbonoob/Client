import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CfhChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/CfhChatlogMessageParser';

export class CfhChatlogEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::CfhChatlogEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CfhChatlogMessageParser);
    }

    public getParser(): CfhChatlogMessageParser {
        return this._parser instanceof CfhChatlogMessageParser ? this._parser : null;
    }
}
