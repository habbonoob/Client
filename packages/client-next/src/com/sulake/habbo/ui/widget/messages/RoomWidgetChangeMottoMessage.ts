import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChangeMottoMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetChangeMottoMessage'); }

    public static readonly CHANGE_MOTTO: string = "RWVM_CHANGE_MOTTO_MESSAGE";

    declare private _motto: string;

    constructor(param1: string) {
        super("RWVM_CHANGE_MOTTO_MESSAGE");
        this._motto = param1;
    }

    public get motto(): string {
        return this._motto;
    }
}
