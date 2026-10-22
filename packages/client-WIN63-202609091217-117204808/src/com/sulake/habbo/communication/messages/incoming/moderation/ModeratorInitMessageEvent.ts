import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorInitMessageParser';

export class ModeratorInitMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorInitMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorInitMessageParser);
    }

    public getParser(): ModeratorInitMessageParser {
        return this._parser instanceof ModeratorInitMessageParser ? this._parser : null;
    }
}
