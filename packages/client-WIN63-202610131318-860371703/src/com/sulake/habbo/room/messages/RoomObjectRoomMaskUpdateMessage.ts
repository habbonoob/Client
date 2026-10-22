import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomObjectRoomMaskUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectRoomMaskUpdateMessage'); }

    public static readonly ADD_MASK: string = "RORMUM_ADD_MASK";
    public static readonly REMOVE_MASK: string = "RORMUM_REMOVE_MASK";
    public static readonly MASK_TYPE_DOOR: string = "door";
    public static readonly MASK_CATEGORY_WINDOW: string = "window";
    public static readonly MASK_CATEGORY_HOLE: string = "hole";
    private _type: string = "";
    private _maskId: string = "";
    private _maskType: string = "";
    private _maskLocation: Vector3d = null;
    private _maskCategory: string = "window";

    constructor(param1: string, param2: string, param3: string = null, param4: IVector3d = null, param5: string = "window") {
        super(null, null);
        this._type = param1;
        this._maskId = param2;
        this._maskType = param3;
        if (param4 != null) {
            this._maskLocation = new Vector3d(param4.x, param4.y, param4.z);
        }
        this._maskCategory = param5;
    }

    public get type(): string {
        return this._type;
    }

    public get maskId(): string {
        return this._maskId;
    }

    public get maskType(): string {
        return this._maskType;
    }

    public get maskLocation(): IVector3d {
        return this._maskLocation;
    }

    public get maskCategory(): string {
        return this._maskCategory;
    }
}
