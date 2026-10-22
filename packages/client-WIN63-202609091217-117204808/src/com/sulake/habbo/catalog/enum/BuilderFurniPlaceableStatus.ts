import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BuilderFurniPlaceableStatus {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::BuilderFurniPlaceableStatus'); }

    public static readonly _SafeStr_7852: number = 0;
    public static readonly MISSING_OFFER: number = 1;
    public static readonly _SafeStr_7664: number = 2;
    public static readonly NOT_IN_ROOM: number = 3;
    public static readonly NOT_ROOM_OWNER_OR_GROUP_ADMIN: number = 4;
    public static readonly GUILD_ROOM: number = 5;
    public static readonly VISITORS_IN_ROOM: number = 6;

    constructor() {
    }
}
