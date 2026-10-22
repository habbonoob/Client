import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionDoorbellEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionDoorbellEvent'); }

    public static readonly DOORBELL: string = "RSDE_DOORBELL";
    public static readonly REJECTED: string = "RSDE_REJECTED";
    public static readonly ACCEPTED: string = "RSDE_ACCEPTED";
    private _userName: string = "";

    constructor(param1: string, param2: IRoomSession, param3: string, param4: boolean = false, param5: boolean = false) {
        super(param1, param2, param4, param5);
        this._userName = param3;
    }

    public get userName(): string {
        return this._userName;
    }
}
