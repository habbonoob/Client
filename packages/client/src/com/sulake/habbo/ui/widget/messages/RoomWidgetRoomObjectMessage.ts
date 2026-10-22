import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetRoomObjectMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetRoomObjectMessage'); }

    public static readonly GET_OBJECT_INFO: string = "RWROM_GET_OBJECT_INFO";
    public static readonly GET_OBJECT_NAME: string = "RWROM_GET_OBJECT_NAME";
    public static readonly _SafeStr_8505: string = "RWROM_SELECT_OBJECT";
    public static readonly GET_OWN_CHARACTER_INFO: string = "RWROM_GET_OWN_CHARACTER_INFO";
    public static readonly GET_AVATAR_LIST: string = "RWROM_GET_AVATAR_LIST";

    constructor(param1: string, param2: number, param3: number) {
        super(param1);
        this._id = param2;
        this._category = param3;
    }

    private _id: number = 0;
    private _category: number = 0;

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }
}
