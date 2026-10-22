import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class RoomData {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomData'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _data: XML;

    private _floorType: string = null;
    private _wallType: string = null;
    private _landscapeType: string = null;

    declare private _cameraInitPosition: IVector3d;

    constructor(param1: number, param2: XML) {
        this._roomId = param1;
        this._data = param2;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get data(): XML {
        return this._data;
    }

    public get floorType(): string {
        return this._floorType;
    }

    public set floorType(param1: string) {
        this._floorType = param1;
    }

    public get wallType(): string {
        return this._wallType;
    }

    public set wallType(param1: string) {
        this._wallType = param1;
    }

    public get landscapeType(): string {
        return this._landscapeType;
    }

    public set landscapeType(param1: string) {
        this._landscapeType = param1;
    }

    public get cameraInitPosition(): IVector3d {
        return this._cameraInitPosition;
    }

    public set cameraInitPosition(param1: IVector3d) {
        this._cameraInitPosition = param1;
    }
}
