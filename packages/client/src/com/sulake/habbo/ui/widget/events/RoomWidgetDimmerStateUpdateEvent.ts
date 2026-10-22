import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetDimmerStateUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetDimmerStateUpdateEvent'); }

    public static readonly _SafeStr_7397: string = "RWDSUE_DIMMER_STATE";

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: boolean = false, param8: boolean = false) {
        super("RWDSUE_DIMMER_STATE", param7, param8);
        this._objectId = param1;
        this._state = param2;
        this._presetId = param3;
        this._effectId = param4;
        this._color = param5;
        this._brightness = param6 | 0;
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _presetId: number;
    static { (this.prototype as any)._presetId = 0; }

    declare private _effectId: number;
    static { (this.prototype as any)._effectId = 0; }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get state(): number {
        return this._state;
    }

    public get presetId(): number {
        return this._presetId;
    }

    public get effectId(): number {
        return this._effectId;
    }

    public get brightness(): number {
        return this._brightness >>> 0;
    }

    public get objectId(): number {
        return this._objectId >>> 0;
    }
}
