import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionDanceEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionDanceEvent'); }

    public static readonly _SafeStr_7408: string = "RSDE_DANCE";

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _danceStyle: number;
    static { (this.prototype as any)._danceStyle = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super("RSDE_DANCE", param1, param4, param5);
        this._userId = param2;
        this._danceStyle = param3;
    }

    public get userId(): number {
        return this._userId;
    }

    public get danceStyle(): number {
        return this._danceStyle;
    }
}
