import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetDimmerSavePresetMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetDimmerSavePresetMessage'); }

    public static readonly WIDGET_MESSAGE_SAVE_DIMMER_PRESET: string = "RWSDPM_SAVE_PRESET";

    declare private _presetNumber: number;
    static { (this.prototype as any)._presetNumber = 0; }

    declare private _effectTypeId: number;
    static { (this.prototype as any)._effectTypeId = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _apply: boolean;
    static { (this.prototype as any)._apply = false; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: boolean, param6: number) {
        super("RWSDPM_SAVE_PRESET");
        this._presetNumber = param1;
        this._effectTypeId = param2;
        this._color = param3;
        this._brightness = param4;
        this._apply = param5;
        this._objectId = param6;
    }

    public get presetNumber(): number {
        return this._presetNumber;
    }

    public get effectTypeId(): number {
        return this._effectTypeId;
    }

    public get color(): number {
        return this._color;
    }

    public get brightness(): number {
        return this._brightness;
    }

    public get apply(): boolean {
        return this._apply;
    }

    public get objectId(): number {
        return this._objectId;
    }
}
