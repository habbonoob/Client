import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionUserFigureUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionUserFigureUpdateEvent'); }

    public static readonly USER_FIGURE: string = "RSUBE_FIGURE";
    private _userId: number = 0;
    private _figure: string = "";
    private _gender: string = "";
    private _customInfo: string = "";

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    private _SafeStr_14035: number = -1;

    constructor(param1: IRoomSession, param2: number, param3: string, param4: string, param5: string, param6: number, param7: number = -1, param8: boolean = false, param9: boolean = false) {
        super("RSUBE_FIGURE", param1, param8, param9);
        this._userId = param2;
        this._figure = param3;
        this._gender = param4;
        this._customInfo = param5;
        this._achievementScore = param6;
        this._SafeStr_14035 = param7;
    }

    public get userId(): number {
        return this._userId;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public get customInfo(): string {
        return this._customInfo;
    }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public get badgesRank(): number {
        return this._SafeStr_14035;
    }
}
