import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetChooserContentEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetChooserContentEvent'); }

    public static readonly USER_CHOOSER_CONTENT: string = "RWCCE_USER_CHOOSER_CONTENT";
    public static readonly FURNI_CHOOSER_CONTENT: string = "RWCCE_FURNI_CHOOSER_CONTENT";
    public static readonly FURNI_CHOOSER_CONTENT_ADD: string = "RWCCE_FURNI_CHOOSER_CONTENT_ADD";

    declare private _items: any[];

    declare private _isAnyRoomController: boolean;
    static { (this.prototype as any)._isAnyRoomController = false; }

    constructor(param1: string, param2: any[], param3: boolean = false, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._items = param2.slice();
        this._isAnyRoomController = param3;
    }

    public get items(): any[] {
        return this._items;
    }

    public get isAnyRoomController(): boolean {
        return this._isAnyRoomController;
    }
}
