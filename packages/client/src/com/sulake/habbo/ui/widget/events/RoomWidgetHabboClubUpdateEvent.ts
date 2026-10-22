import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetHabboClubUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetHabboClubUpdateEvent'); }

    public static readonly _SafeStr_7456: string = "RWBIUE_HABBO_CLUB";

    constructor(param1: number, param2: number, param3: number, param4: boolean, param5: number, param6: boolean = false, param7: boolean = false) {
        super("RWBIUE_HABBO_CLUB", param6, param7);
        this._daysLeft = param1;
        this._periodsLeft = param2;
        this._pastPeriods = param3;
        this._allowClubDances = param4;
        this._clubLevel = param5;
    }

    private _daysLeft: number = 0;
    private _periodsLeft: number = 0;
    private _pastPeriods: number = 0;

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    private _allowClubDances: boolean = false;

    public get allowClubDances(): boolean {
        return this._allowClubDances;
    }

    public get daysLeft(): number {
        return this._daysLeft;
    }

    public get periodsLeft(): number {
        return this._periodsLeft;
    }

    public get pastPeriods(): number {
        return this._pastPeriods;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }
}
