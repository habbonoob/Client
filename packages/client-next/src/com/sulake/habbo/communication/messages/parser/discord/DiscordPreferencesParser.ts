import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';

export class DiscordPreferencesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.discord::DiscordPreferencesParser'); }

    declare private _preferences: DiscordPreferences;

    constructor() {
    }

    public get preferences(): DiscordPreferences {
        return this._preferences;
    }

    public flush(): boolean {
        this._preferences = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._preferences = DiscordPreferences.readFromData(param1);
        return true;
    }
}
