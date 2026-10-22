import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetDanceMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetDanceMessage'); }

    public static readonly _SafeStr_7909: string = "RWCM_MESSAGE_DANCE";
    public static readonly _SafeStr_8480: number = 0;
    public static readonly _SafeStr_6564: any[] = [2, 3, 4];
    private _style: number = 0;

    constructor(param1: number) {
        super("RWCM_MESSAGE_DANCE");
        this._style = param1;
    }

    public get style(): number {
        return this._style;
    }
}
