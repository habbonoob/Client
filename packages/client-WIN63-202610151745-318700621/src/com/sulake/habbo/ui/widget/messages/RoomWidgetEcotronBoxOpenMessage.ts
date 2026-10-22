import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetEcotronBoxOpenMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetEcotronBoxOpenMessage'); }

    public static readonly _SafeStr_8771: string = "RWEBOM_OPEN_ECOTRONBOX";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    constructor(param1: string, param2: number) {
        super(param1);
        this._objectId = param2;
    }

    public get objectId(): number {
        return this._objectId;
    }
}
