import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetClothingChangeUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetClothingChangeUpdateEvent'); }

    public static readonly SHOW_GENDER_SELECTION: string = "RWCCUE_SHOW_GENDER_SELECTION";
    public static readonly SHOW_CLOTHING_EDITOR: string = "RWCCUE_SHOW_CLOTHING_EDITOR";
    private _objectId: number = -1;
    private _objectCategory: number = -1;
    private _roomId: number = -1;

    constructor(param1: string, param2: number = 0, param3: number = 0, param4: number = 0, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._objectId = param2;
        this._objectCategory = param3;
        this._roomId = param4;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectCategory(): number {
        return this._objectCategory;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
