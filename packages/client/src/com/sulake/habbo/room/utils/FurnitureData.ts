import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurnitureData {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::FurnitureData'); }

    constructor(param1: number, param2: number, param3: string, param4: IVector3d, param5: IVector3d, param6: number, param7: IStuffData, param8: number = NaN, param9: number = -1, param10: number = 0, param11: number = 0, param12: string = "", param13: boolean = true, param14: boolean = true, param15: number = -1) {
        this._id = param1;
        this._typeId = param2;
        this._type = param3;
        this._SafeStr_2291.assign(param4);
        this._dir.assign(param5);
        this._state = param6;
        this._data = param7;
        this._extra = param8;
        this._expiryTime = param9;
        this._usagePolicy = param10;
        this._ownerId = param11;
        this._ownerName = param12;
        this._SafeStr_6506 = param13;
        this._realRoomObject = param14;
        this._sizeZ = param15;
    }

    private _id: number = 0;
    private _typeId: number = 0;
    private _type: string = null;
    private _SafeStr_2291: Vector3d = new Vector3d();
    private _dir: Vector3d = new Vector3d();
    private _state: number = 0;
    private _data: IStuffData = null;
    private _extra: number = NaN;
    private _usagePolicy: number = 0;
    private _ownerId: number = 0;
    private _SafeStr_6506: boolean = true;

    declare private _sizeZ: number;
    static { (this.prototype as any)._sizeZ = NaN; }

    private _expiryTime: number = -1;

    public get expiryTime(): number {
        return this._expiryTime;
    }

    private _ownerName: string = "";

    public get ownerName(): string {
        return this._ownerName;
    }

    private _realRoomObject: boolean = true;

    public get realRoomObject(): boolean {
        return this._realRoomObject;
    }

    public get id(): number {
        return this._id;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get type(): string {
        return this._type;
    }

    public get loc(): IVector3d {
        return this._SafeStr_2291;
    }

    public get dir(): IVector3d {
        return this._dir;
    }

    public get state(): number {
        return this._state;
    }

    public get data(): IStuffData {
        return this._data;
    }

    public get extra(): number {
        return this._extra;
    }

    public get usagePolicy(): number {
        return this._usagePolicy;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get synchronized(): boolean {
        return this._SafeStr_6506;
    }

    public get sizeZ(): number {
        return this._sizeZ;
    }
}
