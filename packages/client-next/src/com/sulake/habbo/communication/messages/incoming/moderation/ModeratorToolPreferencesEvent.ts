import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorToolPreferencesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorToolPreferencesMessageParser';

export class ModeratorToolPreferencesEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorToolPreferencesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorToolPreferencesMessageParser);
    }

    public getParser(): ModeratorToolPreferencesMessageParser {
        return asInstanceOf(this.parser, ModeratorToolPreferencesMessageParser);
    }
}
