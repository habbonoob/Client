import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetBadgeDetailsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetBadgeDetailsMessage'); }

    public static readonly WIDGET_MESSAGE_GET_BADGE_DETAILS: string = "RWGOI_MESSAGE_GET_BADGE_DETAILS";

    constructor(param1: boolean, param2: number) {
        super("RWGOI_MESSAGE_GET_BADGE_DETAILS");
        this._own = param1;
        this._groupId = param2;
    }

    declare private _own: boolean;
    static { (this.prototype as any)._own = false; }

    private _groupId: number = 0;

    public get groupId(): number {
        return this._groupId;
    }

    public get own(): boolean {
        return this._own;
    }
}
