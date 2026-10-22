import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetCommandsUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetCommandsUpdateEvent'); }

    public static readonly PET_COMMANDS: string = "RSPIUE_ENABLED_PET_COMMANDS";

    constructor(param1: IRoomSession, param2: number, param3: any[], param4: any[], param5: boolean = false, param6: boolean = false) {
        super("RSPIUE_ENABLED_PET_COMMANDS", param1, param5, param6);
        this._petId = param2;
        this._SafeStr_6224 = param3;
        this._SafeStr_6055 = param4;
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _SafeStr_6224: any[];

    declare private _SafeStr_6055: any[];

    public get petId(): number {
        return this._petId;
    }

    public get allCommands(): any[] {
        return this._SafeStr_6224;
    }

    public get enabledCommands(): any[] {
        return this._SafeStr_6055;
    }
}
