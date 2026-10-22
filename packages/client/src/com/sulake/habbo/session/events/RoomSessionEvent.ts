import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomSessionEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionEvent'); }

    public static readonly _SafeStr_7841: string = "RSE_CREATED";
    public static readonly _SafeStr_8766: string = "RSE_STARTED";
    public static readonly _SafeStr_7857: string = "RSE_ENDED";
    public static readonly SESSION_ROOM_DATA: string = "RSE_ROOM_DATA";

    constructor(param1: string, param2: IRoomSession, param3: boolean = true, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._SafeStr_2171 = param2;
        this._openLandingPage = param3;
    }

    declare private _SafeStr_2171: IRoomSession;

    declare private _openLandingPage: boolean;
    static { (this.prototype as any)._openLandingPage = false; }

    public get session(): IRoomSession {
        return this._SafeStr_2171;
    }

    public get openLandingPage(): boolean {
        return this._openLandingPage;
    }
}
