import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetRequestWidgetMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetRequestWidgetMessage'); }

    public static readonly REQUEST_USER_CHOOSER: string = "RWRWM_USER_CHOOSER";
    public static readonly REQUEST_FURNI_CHOOSER: string = "RWRWM_FURNI_CHOOSER";
    public static readonly REQUEST_FURNI_CHOOSER_ADD: string = "RWRWM_FURNI_CHOOSER_ADD";
    public static readonly REQUEST_ME_MENU: string = "RWRWM_ME_MENU";
    public static readonly REQUEST_EFFECTS: string = "RWRWM_EFFECTS";

    constructor(param1: string, param2: number = 0, param3: number = 0) {
        super(param1);
        this._id = param2;
        this._category = param3;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }
}
