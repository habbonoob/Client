import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetObjectLocationMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetObjectLocationMessage'); }

    public static readonly _SafeStr_7785: string = "RWGOI_MESSAGE_GET_OBJECT_LOCATION";
    public static readonly _SafeStr_8499: string = "RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION";

    constructor(param1: string, param2: number, param3: number) {
        super(param1);
        this._objectId = param2;
        this._objectType = param3;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _objectType: number;
    static { (this.prototype as any)._objectType = 0; }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectType(): number {
        return this._objectType;
    }
}
