import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetDimmerChangeStateMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetDimmerChangeStateMessage'); }

    public static readonly CHANGE_STATE: string = "RWCDSM_CHANGE_STATE";

    constructor(param1: number) {
        super("RWCDSM_CHANGE_STATE");
        this._objectId = param1;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    public get objectId(): number {
        return this._objectId;
    }
}
