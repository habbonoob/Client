import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPresentEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPresentEvent'); }

    public static readonly ROOM_SESSION_PRESENT_OPENED: string = "RSPE_PRESENT_OPENED";
    private _classId: number = 0;
    private _itemType: string = "";

    declare private _productCode: string;

    private _placedItemId: number = 0;
    private _placedItemType: string = "";

    declare private _placedInRoom: boolean;
    static { (this.prototype as any)._placedInRoom = false; }

    declare private _petFigureString: string;

    constructor(param1: string, param2: IRoomSession, param3: number, param4: string, param5: string, param6: number, param7: string, param8: boolean, param9: string, param10: boolean = false, param11: boolean = false) {
        super(param1, param2, param10, param11);
        this._classId = param3;
        this._itemType = param4;
        this._productCode = param5;
        this._placedItemId = param6;
        this._placedItemType = param7;
        this._placedInRoom = param8;
        this._petFigureString = param9;
    }

    public get classId(): number {
        return this._classId;
    }

    public get itemType(): string {
        return this._itemType;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get placedItemId(): number {
        return this._placedItemId;
    }

    public get placedInRoom(): boolean {
        return this._placedInRoom;
    }

    public get placedItemType(): string {
        return this._placedItemType;
    }

    public get petFigureString(): string {
        return this._petFigureString;
    }
}
