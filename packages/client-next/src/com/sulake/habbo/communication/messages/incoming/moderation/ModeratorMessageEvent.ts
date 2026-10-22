import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorMessageParser';

export class ModeratorMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorMessageParser);
    }

    public getParser(): ModeratorMessageParser {
        return this._parser instanceof ModeratorMessageParser ? this._parser : null;
    }
}
