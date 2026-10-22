import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPresentOpenMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPresentOpenMessage'); }

    public static readonly _SafeStr_8749: string = "RWPOM_OPEN_PRESENT";

    constructor(param1: string, param2: number) {
        super(param1);
        this._objectId = param2;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    public get objectId(): number {
        return this._objectId;
    }
}
