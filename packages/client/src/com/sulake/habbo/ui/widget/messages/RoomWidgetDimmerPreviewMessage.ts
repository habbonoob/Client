import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetDimmerPreviewMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetDimmerPreviewMessage'); }

    public static readonly PREVIEW: string = "RWDPM_PREVIEW_DIMMER_PRESET";

    constructor(param1: number, param2: number, param3: boolean) {
        super("RWDPM_PREVIEW_DIMMER_PRESET");
        this._color = param1;
        this._brightness = param2;
        this._bgOnly = param3;
    }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _bgOnly: boolean;
    static { (this.prototype as any)._bgOnly = false; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get brightness(): number {
        return this._brightness;
    }

    public get bgOnly(): boolean {
        return this._bgOnly;
    }
}
