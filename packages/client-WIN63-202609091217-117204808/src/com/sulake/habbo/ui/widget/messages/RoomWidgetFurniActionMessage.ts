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
    private _furniId: number = 0;
    private _SafeStr_6337: number = 0;

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _SafeStr_7306: string;

    constructor(param1: string, param2: number, param3: number, param4: number = -1, param5: string = null) {
        super(param1);
        this._furniId = param2;
        this._SafeStr_6337 = param3;
        this._offerId = param4;
        this._SafeStr_7306 = param5;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get furniCategory(): number {
        return this._SafeStr_6337;
    }

    public get objectData(): string {
        return this._SafeStr_7306;
    }

    public get offerId(): number {
        return this._offerId;
    }
}
