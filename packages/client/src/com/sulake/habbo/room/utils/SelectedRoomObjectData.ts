import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class SelectedRoomObjectData implements ISelectedRoomObjectData {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::SelectedRoomObjectData'); }

    constructor(param1: number, param2: number, param3: string, param4: IVector3d, param5: IVector3d, param6: number = 0, param7: string = null, param8: IStuffData = null, param9: number = -1, param10: number = -1, param11: string = null) {
        this._id = param1;
        this._category = param2;
        this._operation = param3;
        this._SafeStr_2291 = new Vector3d();
        this._SafeStr_2291.assign(param4);
        this._dir = new Vector3d();
        this._dir.assign(param5);
        this._typeId = param6;
        this._instanceData = param7;
        this._stuffData = param8;
        this._state = param9;
        this._animFrame = param10;
        this._posture = param11;
    }

    private _id: number = 0;
    private _category: number = 0;
    private _operation: string = "";
    private _SafeStr_2291: Vector3d = null;
    private _dir: Vector3d = null;
    private _typeId: number = 0;
    private _instanceData: string = null;
    private _stuffData: IStuffData = null;
    private _state: number = -1;
    private _posture: string = null;
    private _animFrame: number = -1;

    public get animFrame(): number {
        return this._animFrame;
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get operation(): string {
        return this._operation;
    }

    public get loc(): Vector3d {
        return this._SafeStr_2291;
    }

    public get dir(): Vector3d {
        return this._dir;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get instanceData(): string {
        return this._instanceData;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get state(): number {
        return this._state;
    }

    public get posture(): string {
        return this._posture;
    }

    public dispose(): void {
        this._SafeStr_2291 = null;
        this._dir = null;
    }
}
