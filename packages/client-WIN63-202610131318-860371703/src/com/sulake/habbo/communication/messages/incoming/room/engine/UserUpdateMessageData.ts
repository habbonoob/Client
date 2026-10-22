import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserUpdateMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UserUpdateMessageData'); }

    private _id: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _localZ: number = 0;
    private _targetX: number = 0;
    private _targetY: number = 0;
    private _targetZ: number = 0;
    private _dir: number = 0;
    private _dirHead: number = 0;
    private _SafeStr_2403: any[] = [];
    private _isMoving: boolean = false;
    private _SafeStr_14037: boolean = false;
    private _skipPositionUpdate: boolean = false;
    private _SafeStr_14038: number = 0;

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: boolean, param12: boolean, param13: any[], param14: boolean, param15: number) {
        this._id = param1;
        this._SafeStr_2126 = param2;
        this._y = param3;
        this._z = param4;
        this._localZ = param5;
        this._dir = param6;
        this._dirHead = param7;
        this._targetX = param8;
        this._targetY = param9;
        this._targetZ = param10;
        this._isMoving = param11;
        this._SafeStr_14037 = param12;
        this._SafeStr_2403 = param13;
        this._skipPositionUpdate = param14;
        this._SafeStr_14038 = param15;
    }

    public get id(): number {
        return this._id;
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

    public get localZ(): number {
        return this._localZ;
    }

    public get targetX(): number {
        return this._targetX;
    }

    public get targetY(): number {
        return this._targetY;
    }

    public get targetZ(): number {
        return this._targetZ;
    }

    public get dir(): number {
        return this._dir;
    }

    public get dirHead(): number {
        return this._dirHead;
    }

    public get isMoving(): boolean {
        return this._isMoving;
    }

    public get canStandUp(): boolean {
        return this._SafeStr_14037;
    }

    public get actions(): any[] {
        return this._SafeStr_2403.slice();
    }

    public get skipPositionUpdate(): boolean {
        return this._skipPositionUpdate;
    }

    public get jumpingPower(): number {
        return this._SafeStr_14038;
    }
}
