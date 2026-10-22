import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorActionResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorActionResultMessageParser';

export class ModeratorActionResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorActionResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorActionResultMessageParser);
    }

    public getParser(): ModeratorActionResultMessageParser {
        return this._parser instanceof ModeratorActionResultMessageParser ? this._parser : null;
    }
}
