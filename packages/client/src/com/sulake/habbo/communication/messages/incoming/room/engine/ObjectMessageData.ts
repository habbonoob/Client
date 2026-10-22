import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';

export class ObjectMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectMessageData'); }

    constructor(param1: number) {
        this._id = param1;
    }

    private _id: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _dir: number = 0;
    private _sizeX: number = 0;
    private _sizeY: number = 0;
    private _sizeZ: number = 0;
    private _type: number = 0;
    private _extra: number = -1;
    private _state: number = 0;
    private _data: IStuffData = new LegacyStuffData();

    declare private _usagePolicy: number;
    static { (this.prototype as any)._usagePolicy = 0; }

    private _ownerId: number = 0;
    private _staticClass: string = null;
    private _SafeStr_2237: boolean = false;
    private _trustedSender: boolean = false;
    private _expiryTime: number = 0;

    public get expiryTime(): number {
        return this._expiryTime;
    }

    public set expiryTime(param1: number) {
        if (!this._SafeStr_2237) {
            this._expiryTime = param1;
        }
    }

    private _ownerName: string = "";

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    public get id(): number {
        return this._id;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public set x(param1: number) {
        if (!this._SafeStr_2237) {
            this._SafeStr_2126 = param1;
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

    public get dir(): number {
        return this._dir;
    }

    public set dir(param1: number) {
        if (!this._SafeStr_2237) {
            this._dir = param1;
        }
    }

    public get sizeX(): number {
        return this._sizeX;
    }

    public set sizeX(param1: number) {
        if (!this._SafeStr_2237) {
            this._sizeX = param1;
        }
    }

    public get sizeY(): number {
        return this._sizeY;
    }

    public set sizeY(param1: number) {
        if (!this._SafeStr_2237) {
            this._sizeY = param1;
        }
    }

    public get sizeZ(): number {
        return this._sizeZ;
    }

    public set sizeZ(param1: number) {
        if (!this._SafeStr_2237) {
            this._sizeZ = param1;
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

    public get data(): IStuffData {
        return this._data;
    }

    public set data(param1: IStuffData) {
        if (!this._SafeStr_2237) {
            this._data = param1;
        }
    }

    public get staticClass(): string {
        return this._staticClass;
    }

    public set staticClass(param1: string) {
        if (!this._SafeStr_2237) {
            this._staticClass = param1;
        }
    }

    public get extra(): number {
        return this._extra;
    }

    public set extra(param1: number) {
        if (!this._SafeStr_2237) {
            this._extra = param1;
        }
    }

    public get usagePolicy(): number {
        return this._usagePolicy;
    }

    public set usagePolicy(param1: number) {
        this._usagePolicy = param1;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        this._ownerId = param1;
    }

    public get trustedSender(): boolean {
        return this._trustedSender;
    }

    public set trustedSender(param1: boolean) {
        this._trustedSender = param1;
    }

    public setReadOnly(): void {
        this._SafeStr_2237 = true;
    }
}
