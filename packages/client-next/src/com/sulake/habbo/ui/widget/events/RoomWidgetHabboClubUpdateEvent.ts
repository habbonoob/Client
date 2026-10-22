import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetHabboClubUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetHabboClubUpdateEvent'); }

    public static readonly _SafeStr_7456: string = "RWBIUE_HABBO_CLUB";
    private _SafeStr_6821: number = 0;
    private _SafeStr_7295: number = 0;
    private _SafeStr_6757: number = 0;
    private _allowClubDances: boolean = false;

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    constructor(param1: number, param2: number, param3: number, param4: boolean, param5: number, param6: boolean = false, param7: boolean = false) {
        super("RWBIUE_HABBO_CLUB", param6, param7);
        this._SafeStr_6821 = param1;
        this._SafeStr_7295 = param2;
        this._SafeStr_6757 = param3;
        this._allowClubDances = param4;
        this._clubLevel = param5;
    }

    public get daysLeft(): number {
        return this._SafeStr_6821;
    }

    public get periodsLeft(): number {
        return this._SafeStr_7295;
    }

    public get pastPeriods(): number {
        return this._SafeStr_6757;
    }

    public get allowClubDances(): boolean {
        return this._allowClubDances;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }
}
