import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetAchievementResolutionTrophyDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetAchievementResolutionTrophyDataUpdateEvent'); }

    public static readonly UPDATE_TROPHY_DATA: string = "RWARTDUE_TROPHY_DATA";

    declare private _color: number;
    static { (this.prototype as any)._color = NaN; }

    declare private _name: string;

    declare private _date: string;

    declare private _message: string;

    declare private _viewType: number;
    static { (this.prototype as any)._viewType = 0; }

    declare private _frameTitle: string;

    declare private _headerColor: number;
    static { (this.prototype as any)._headerColor = 0; }

    declare private _backgroundTheme: number;
    static { (this.prototype as any)._backgroundTheme = 0; }

    declare private _backgroundColor: number;
    static { (this.prototype as any)._backgroundColor = 0; }

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string, param6: number, param7: string = "", param8: number = 0, param9: number = -1, param10: number = 0, param11: boolean = false, param12: boolean = false) {
        super(param1, param11, param12);
        this._color = param2;
        this._name = param3;
        this._date = param4;
        this._message = param5;
        this._viewType = param6;
        this._frameTitle = param7;
        this._headerColor = param8;
        this._backgroundTheme = param9;
        this._backgroundColor = param10;
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

    public get frameTitle(): string {
        return this._frameTitle;
    }

    public get headerColor(): number {
        return this._headerColor;
    }

    public get backgroundTheme(): number {
        return this._backgroundTheme;
    }

    public get backgroundColor(): number {
        return this._backgroundColor;
    }
}
