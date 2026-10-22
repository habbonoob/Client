import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetFurniActionMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetFurniActionMessage'); }

    public static readonly ROTATE: string = "RWFUAM_ROTATE";
    public static readonly MOVE: string = "RWFAM_MOVE";
    public static readonly _SafeStr_8273: string = "RWFAM_PICKUP";
    public static readonly _SafeStr_8784: string = "RWFAM_EJECT";
    public static readonly USE: string = "RWFAM_USE";
    public static readonly SAVE_STUFF_DATA: string = "RWFAM_SAVE_STUFF_DATA";
    public static readonly _SafeStr_7537: string = "RWFAM_WIRED_INSPECT";

    constructor(param1: string, param2: number, param3: number, param4: number = -1, param5: string = null) {
        super(param1);
        this._furniId = param2;
        this._furniCategory = param3;
        this._offerId = param4;
        this._objectData = param5;
    }

    private _furniId: number = 0;
    private _furniCategory: number = 0;

    declare private _objectData: string;

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get furniCategory(): number {
        return this._furniCategory;
    }

    public get objectData(): string {
        return this._objectData;
    }
}
