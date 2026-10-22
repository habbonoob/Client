import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetTrophyDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetTrophyDataUpdateEvent'); }

    public static readonly UPDATE_TROPHY_DATA: string = "RWTDUE_TROPHY_DATA";

    declare private _color: number;
    static { (this.prototype as any)._color = NaN; }

    declare private _name: string;

    declare private _date: string;

    declare private _message: string;

    declare private _viewType: number;
    static { (this.prototype as any)._viewType = 0; }

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string, param6: number, param7: boolean = false, param8: boolean = false) {
        super(param1, param7, param8);
        this._color = param2;
        this._name = param3;
        this._date = param4;
        this._message = param5;
        this._viewType = param6;
    }

    public get color(): number {
        return this._color;
    }

    public get name(): string {
        return this._name;
    }

    public get date(): string {
        return this._date;
    }

    public get message(): string {
        return this._message;
    }

    public get viewType(): number {
        return this._viewType;
    }
}
