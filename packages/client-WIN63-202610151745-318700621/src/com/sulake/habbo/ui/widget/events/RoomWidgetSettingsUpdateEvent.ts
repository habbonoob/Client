import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetSettingsUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetSettingsUpdateEvent'); }

    public static readonly _SafeStr_8404: string = "RWSUE_SETTINGS";

    declare private _uiVolume: number;
    static { (this.prototype as any)._uiVolume = NaN; }

    declare private _furniVolume: number;
    static { (this.prototype as any)._furniVolume = NaN; }

    declare private _traxVolume: number;
    static { (this.prototype as any)._traxVolume = NaN; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._uiVolume = param4;
        this._furniVolume = param3;
        this._traxVolume = param2;
    }

    public get uiVolume(): number {
        return this._uiVolume;
    }

    public get furniVolume(): number {
        return this._furniVolume;
    }

    public get traxVolume(): number {
        return this._traxVolume;
    }
}
