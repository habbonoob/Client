import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPlayListModificationMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPlayListModificationMessage'); }

    public static readonly ADD_TO_PLAYLIST: string = "RWPLAM_ADD_TO_PLAYLIST";
    public static readonly REMOVE_FROM_PLAYLIST: string = "RWPLAM_REMOVE_FROM_PLAYLIST";

    declare private _SafeStr_6249: number;
    static { (this.prototype as any)._SafeStr_6249 = 0; }

    declare private _slotNumber: number;
    static { (this.prototype as any)._slotNumber = 0; }

    constructor(param1: string, param2: number = -1, param3: number = -1) {
        super(param1);
        this._slotNumber = param2;
        this._SafeStr_6249 = param3;
    }

    public get diskId(): number {
        return this._SafeStr_6249;
    }

    public get slotNumber(): number {
        return this._slotNumber;
    }
}
