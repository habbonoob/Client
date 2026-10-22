import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HideRoomWidgetEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::HideRoomWidgetEvent'); }

    public static readonly HIDE_ROOM_WIDGET: string = "hrwe_hide_room_widget";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("hrwe_hide_room_widget", param2, param3);
        this._widgetType = param1;
    }

    declare private _widgetType: string;

    public get widgetType(): string {
        return this._widgetType;
    }
}
