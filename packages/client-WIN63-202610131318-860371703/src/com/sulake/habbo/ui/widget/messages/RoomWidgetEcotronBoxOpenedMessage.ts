import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetEcotronBoxOpenedMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetEcotronBoxOpenedMessage'); }

    public static readonly _SafeStr_8279: string = "RWEBOM_ECOTRONBOX_OPENED";

    declare private _itemType: string;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    constructor(param1: string, param2: string, param3: number) {
        super(param1);
        this._itemType = param2;
        this._classId = param3;
    }

    public get itemType(): string {
        return this._itemType;
    }

    public get classId(): number {
        return this._classId;
    }
}
