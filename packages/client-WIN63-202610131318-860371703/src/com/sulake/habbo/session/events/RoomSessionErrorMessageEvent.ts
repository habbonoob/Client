import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionErrorMessageEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionErrorMessageEvent'); }

    public static readonly KICKED_BY_OWNER: string = "RSEME_KICKED";
    public static readonly PETS_FORBIDDEN_IN_HOTEL: string = "RSEME_PETS_FORBIDDEN_IN_HOTEL";
    public static readonly PETS_FORBIDDEN_IN_FLAT: string = "RSEME_PETS_FORBIDDEN_IN_FLAT";
    public static readonly MAX_NUMBER_OF_PETS: string = "RSEME_MAX_PETS";
    public static readonly MAX_NUMBER_OF_OWN_PETS: string = "RSEME_MAX_NUMBER_OF_OWN_PETS";
    public static readonly NO_FREE_TILES_FOR_PET: string = "RSEME_NO_FREE_TILES_FOR_PET";
    public static readonly SELECTED_TILE_NOT_FREE_FOR_PET: string = "RSEME_SELECTED_TILE_NOT_FREE_FOR_PET";
    public static readonly BOTS_FORBIDDEN_IN_HOTEL: string = "RSEME_BOTS_FORBIDDEN_IN_HOTEL";
    public static readonly BOTS_FORBIDDEN_IN_FLAT: string = "RSEME_BOTS_FORBIDDEN_IN_FLAT";
    public static readonly BOT_LIMIT_REACHED: string = "RSEME_BOT_LIMIT_REACHED";
    public static readonly _SafeStr_8316: string = "RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT";
    public static readonly BOT_NAME_NOT_ACCEPTED: string = "RSEME_BOT_NAME_NOT_ACCEPTED";

    declare private _message: string;

    constructor(param1: string, param2: IRoomSession, param3: string = null, param4: boolean = false, param5: boolean = false) {
        super(param1, param2, param4, param5);
        this._message = param3;
    }

    public get message(): string {
        return this._message;
    }
}
