import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorUserInfoMessageParser';

export class ModeratorUserInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorUserInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorUserInfoMessageParser);
    }

    public getParser(): ModeratorUserInfoMessageParser {
        return this._parser instanceof ModeratorUserInfoMessageParser ? this._parser : null;
    }
}
