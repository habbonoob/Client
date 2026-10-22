import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineObjectPlacedEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineObjectPlacedEvent'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: string, param6: number, param7: number, param8: number, param9: number, param10: boolean, param11: boolean, param12: boolean, param13: string, param14: string, param15: boolean = false, param16: boolean = false) {
        super(param1, param2, param3, param4, param15, param16);
        this._wallLocation = param5;
        this._SafeStr_2126 = param6;
        this._y = param7;
        this._z = param8;
        this._direction = param9;
        this._placedInRoom = param10;
        this._placedOnFloor = param11;
        this._placedOnWall = param12;
        this._instanceData = param13;
        this._placementSource = param14;
    }

    private _wallLocation: string = "";
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _direction: number = 0;
    private _instanceData: string = null;
    private _placementSource: string = null;
    private _placedInRoom: boolean = false;

    public get placedInRoom(): boolean {
        return this._placedInRoom;
    }

    private _placedOnFloor: boolean = false;

    public get placedOnFloor(): boolean {
        return this._placedOnFloor;
    }

    private _placedOnWall: boolean = false;

    public get placedOnWall(): boolean {
        return this._placedOnWall;
    }

    public get wallLocation(): string {
        return this._wallLocation;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public get direction(): number {
        return this._direction;
    }

    public get instanceData(): string {
        return this._instanceData;
    }

    public get placementSource(): string {
        return this._placementSource;
    }
}
