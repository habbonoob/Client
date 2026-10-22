import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChangePostureMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetChangePostureMessage'); }

    public static readonly WIDGET_MESSAGE_CHANGE_POSTURE: string = "RWCPM_MESSAGE_CHANGE_POSTURE";
    public static readonly POSTURE_STAND: number = 0;
    public static readonly POSTURE_SIT: number = 1;
    private _posture: number = 0;

    constructor(param1: number) {
        super("RWCPM_MESSAGE_CHANGE_POSTURE");
        this._posture = param1;
    }

    public get posture(): number {
        return this._posture;
    }
}
