import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetFigureUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetFigureUpdateEvent'); }

    public static readonly PET_FIGURE_UPDATE: string = "RSPFUE_PET_FIGURE_UPDATE";

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _figure: string;

    constructor(param1: IRoomSession, param2: number, param3: string, param4: boolean = false, param5: boolean = false) {
        super("RSPFUE_PET_FIGURE_UPDATE", param1, param4, param5);
        this._petId = param2;
        this._figure = param3;
    }

    public get petId(): number {
        return this._petId;
    }

    public get figure(): string {
        return this._figure;
    }
}
