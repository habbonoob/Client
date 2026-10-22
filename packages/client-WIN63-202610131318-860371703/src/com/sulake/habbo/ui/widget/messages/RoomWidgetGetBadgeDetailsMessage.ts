import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetBadgeDetailsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetBadgeDetailsMessage'); }

    public static readonly WIDGET_MESSAGE_GET_BADGE_DETAILS: string = "RWGOI_MESSAGE_GET_BADGE_DETAILS";

    declare private _SafeStr_6370: boolean;
    static { (this.prototype as any)._SafeStr_6370 = false; }

    private _groupId: number = 0;

    constructor(param1: boolean, param2: number) {
        super("RWGOI_MESSAGE_GET_BADGE_DETAILS");
        this._SafeStr_6370 = param1;
        this._groupId = param2;
    }

    public get own(): boolean {
        return this._SafeStr_6370;
    }

    public get groupId(): number {
        return this._groupId;
    }
}
