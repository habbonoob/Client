import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomControllerLevelEnum {
    static { registerClassName(this, 'com.sulake.habbo.session.enum::RoomControllerLevelEnum'); }

    public static readonly NOT_CONTROLLER: number = 0;
    public static readonly ROOM_CONTROLLER: number = 1;
    public static readonly GUILD_MEMBER: number = 2;
    public static readonly GUILD_ADMIN: number = 3;
    public static readonly ROOM_OWNER: number = 4;
    public static readonly MODERATOR: number = 5;

    constructor() {
    }
}
