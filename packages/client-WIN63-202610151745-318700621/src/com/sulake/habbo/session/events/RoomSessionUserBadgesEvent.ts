import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionUserBadgesEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionUserBadgesEvent'); }

    public static readonly USER_BADGES: string = "RSUBE_BADGES";
    private _userId: number = 0;
    private _selectedBadges: any[] = [];

    constructor(param1: IRoomSession, param2: number, param3: any[] = null, param4: boolean = false, param5: boolean = false) {
        super("RSUBE_BADGES", param1, param4, param5);
        this._userId = param2;
        this._selectedBadges = param3 == null ? [] : param3;
    }

    public get userId(): number {
        return this._userId;
    }

    public get selectedBadges(): any[] {
        return this._selectedBadges;
    }
}
