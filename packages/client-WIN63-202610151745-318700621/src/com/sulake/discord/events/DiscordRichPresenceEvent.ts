import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class DiscordRichPresenceEvent extends Event {
    static { registerClassName(this, 'com.sulake.discord.events::DiscordRichPresenceEvent'); }

    public static readonly JOIN: string = "discordActivityJoin";
    public static readonly JOIN_REQUEST: string = "discordActivityJoinRequest";
    public static readonly _SafeStr_8092: string = "discordActivitySpectate";

    declare public secret: string;

    declare public user: any;

    declare public payload: any;

    constructor(param1: string, param2: string, param3: any = null, param4: any = null) {
        super(param1, false, false);
        this.secret = param2;
        this.user = param3;
        this.payload = param4;
    }

    public override clone(): Event {
        return new DiscordRichPresenceEvent(this.type, this.secret, this.user, this.payload);
    }
}
