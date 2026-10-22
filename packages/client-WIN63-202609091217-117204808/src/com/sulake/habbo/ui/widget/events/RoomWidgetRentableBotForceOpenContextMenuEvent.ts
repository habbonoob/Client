import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRentableBotForceOpenContextMenuEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRentableBotForceOpenContextMenuEvent'); }

    public static readonly OPEN: string = "RWRBFOCME_OPEN";

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    constructor(param1: number) {
        super("RWRBFOCME_OPEN");
        this._botId = param1;
    }

    public get botId(): number {
        return this._botId;
    }
}
