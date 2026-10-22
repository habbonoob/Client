import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetClothingChangeMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetClothingChangeMessage'); }

    public static readonly REQUEST_EDITOR: string = "RWCCM_REQUEST_EDITOR";
    private _objectId: number = 0;
    private _objectCategory: number = 0;
    private _roomId: number = 0;
    private _gender: string = "";

    constructor(param1: string, param2: string, param3: number, param4: number, param5: number) {
        super(param1);
        this._gender = param2;
        this._objectId = param3;
        this._objectCategory = param4;
        this._roomId = param5;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectCategory(): number {
        return this._objectCategory;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get gender(): string {
        return this._gender;
    }
}
