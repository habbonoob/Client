import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPetInfo } from '@/com/sulake/habbo/session/IPetInfo';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetInfoUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetInfoUpdateEvent'); }

    public static readonly PET_INFO: string = "RSPIUE_PET_INFO";

    constructor(param1: IRoomSession, param2: IPetInfo, param3: boolean = false, param4: boolean = false) {
        super("RSPIUE_PET_INFO", param1, param3, param4);
        this._petInfo = param2;
    }

    declare private _petInfo: IPetInfo;

    public get petInfo(): IPetInfo {
        return this._petInfo;
    }
}
