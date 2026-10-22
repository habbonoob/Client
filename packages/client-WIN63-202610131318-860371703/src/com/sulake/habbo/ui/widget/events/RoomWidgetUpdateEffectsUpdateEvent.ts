import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetUpdateEffectsUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetUpdateEffectsUpdateEvent'); }

    public static readonly _SafeStr_8239: string = "RWUEUE_UPDATE_EFFECTS";

    declare private _effects: any[];

    constructor(param1: any[] = null, param2: boolean = false, param3: boolean = false) {
        super("RWUEUE_UPDATE_EFFECTS", param2, param3);
        this._effects = param1;
    }

    public get effects(): any[] {
        return this._effects;
    }
}
