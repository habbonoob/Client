import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ItemMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemMessageData'); }

    constructor(param1: number, param2: number, param3: boolean) {
        this._id = param1;
        this._type = param2;
        this._isOldFormat = param3;
    }

    private _id: number = 0;
    private _isOldFormat: boolean = false;
    private _wallX: number = 0;
    private _wallY: number = 0;
    private _localX: number = 0;
    private _localY: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _dir: string = "";
    private _type: number = 0;
    private _state: number = 0;
    private _data: string = "";
    private _SafeStr_2237: boolean = false;
    private _usagePolicy: number = 0;
    private _ownerId: number = 0;

    declare private _secondsToExpiration: number;
    static { (this.prototype as any)._secondsToExpiration = 0; }

    private _ownerName: string = "";

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        if (!this._SafeStr_2237) {
            this._ownerName = param1;
        }
    }

    public get id(): number {
        return this._id;
    }

    public get isOldFormat(): boolean {
        return this._isOldFormat;
    }

    public get wallX(): number {
        return this._wallX;
    }

    public set wallX(param1: number) {
        if (!this._SafeStr_2237) {
            this._wallX = param1 | 0;
        }
    }

    public get wallY(): number {
        return this._wallY;
    }

    public set wallY(param1: number) {
        if (!this._SafeStr_2237) {
            this._wallY = param1 | 0;
        }
    }

    public get localX(): number {
        return this._localX;
    }

    public set localX(param1: number) {
        if (!this._SafeStr_2237) {
            this._localX = param1 | 0;
        }
    }

    public get localY(): number {
        return this._localY;
    }

    public set localY(param1: number) {
        if (!this._SafeStr_2237) {
            this._localY = param1 | 0;
        }
    }

    public get y(): number {
        return this._y;
    }

    public set y(param1: number) {
        if (!this._SafeStr_2237) {
            this._y = param1;
        }
    }

    public get z(): number {
        return this._z;
    }

    public set z(param1: number) {
        if (!this._SafeStr_2237) {
            this._z = param1;
        }
    }

    public get dir(): string {
        return this._dir;
    }

    public set dir(param1: string) {
        if (!this._SafeStr_2237) {
            this._dir = param1;
        }
    }

    public get type(): number {
        return this._type;
    }

    public set type(param1: number) {
        if (!this._SafeStr_2237) {
            this._type = param1;
        }
    }

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        if (!this._SafeStr_2237) {
            this._state = param1;
        }
    }

    public get data(): string {
        return this._data;
    }

    public set data(param1: string) {
        if (!this._SafeStr_2237) {
            this._data = param1;
        }
    }

    public get usagePolicy(): number {
        return this._usagePolicy;
    }

    public set usagePolicy(param1: number) {
        if (!this._SafeStr_2237) {
            this._usagePolicy = param1;
        }
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        if (!this._SafeStr_2237) {
            this._ownerId = param1;
        }
    }

    public get secondsToExpiration(): number {
        return this._secondsToExpiration;
    }

    public set secondsToExpiration(param1: number) {
        if (!this._SafeStr_2237) {
            this._secondsToExpiration = param1;
        }
    }

    public setReadOnly(): void {
        this._SafeStr_2237 = true;
    }
}
