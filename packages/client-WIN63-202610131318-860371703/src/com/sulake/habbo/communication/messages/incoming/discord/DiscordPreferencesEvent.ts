import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DiscordPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferencesParser';

export class DiscordPreferencesEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.discord::DiscordPreferencesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DiscordPreferencesParser);
    }

    public getParser(): DiscordPreferencesParser {
        return this._parser instanceof DiscordPreferencesParser ? this._parser : null;
    }

    public get preferences(): DiscordPreferences {
        return this.getParser().preferences;
    }
}
