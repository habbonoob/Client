import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class SlideObjectMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::SlideObjectMessageData'); }

    public static readonly _SafeStr_8254: string = "mv";
    public static readonly _SafeStr_8446: string = "sld";

    constructor(param1: number, param2: Vector3d, param3: Vector3d, param4: string = null) {
        this._id = param1;
        this._SafeStr_2291 = param2;
        this._target = param3;
        this._moveType = param4;
    }

    private _id: number = 0;

    declare private _SafeStr_2291: Vector3d;

    declare private _target: Vector3d;

    declare private _moveType: string;

    private _SafeStr_2237: boolean = false;

    public get id(): number {
        return this._id;
    }

    public get loc(): Vector3d {
        return this._SafeStr_2291;
    }

    public set loc(param1: Vector3d) {
        if (!this._SafeStr_2237) {
            this._SafeStr_2291 = param1;
        }
    }

    public get target(): Vector3d {
        return this._target;
    }

    public set target(param1: Vector3d) {
        if (!this._SafeStr_2237) {
            this._target = param1;
        }
    }

    public get moveType(): string {
        return this._moveType;
    }

    public set moveType(param1: string) {
        if (!this._SafeStr_2237) {
            this._moveType = param1;
        }
    }

    public setReadOnly(): void {
        this._SafeStr_2237 = true;
    }
}
