import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetSelectEffectMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetSelectEffectMessage'); }

    public static readonly _SafeStr_8200: string = "RWCM_MESSAGE_SELECT_EFFECT";
    public static readonly _SafeStr_8661: string = "RWCM_MESSAGE_UNSELECT_EFFECT";
    public static readonly _SafeStr_8452: string = "RWCM_MESSAGE_UNSELECT_ALL_EFFECTS";

    constructor(param1: string, param2: number = -1) {
        super(param1);
        this._effectType = param2;
    }

    declare private _effectType: number;
    static { (this.prototype as any)._effectType = 0; }

    public get effectType(): number {
        return this._effectType;
    }
}
