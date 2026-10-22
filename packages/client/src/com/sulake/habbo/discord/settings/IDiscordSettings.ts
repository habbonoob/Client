import type { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';

export interface IDiscordSettings {
    get preferences(): DiscordPreferences;
    onDiscordConnected(): void;
}
