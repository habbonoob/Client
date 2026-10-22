import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomDimmerPresetsMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RoomDimmerPresetsMessageData'); }

    constructor(param1: number) {
        this._id = param1;
    }

    private _id: number = 0;
    private _type: number = 0;
    private _light: number = 0;
    private _SafeStr_2237: boolean = false;
    private _color: number = 0;

    public get color(): number {
        return this._color;
    }

    public set color(param1: number) {
        if (!this._SafeStr_2237) {
            this._color = param1;
        }
    }

    public get id(): number {
        return this._id;
    }

    public get type(): number {
        return this._type;
    }

    public set type(param1: number) {
        if (!this._SafeStr_2237) {
            this._type = param1;
        }
    }

    public get light(): number {
        return this._light | 0;
    }

    public set light(param1: number) {
        if (!this._SafeStr_2237) {
            this._light = param1 >>> 0;
        }
    }

    public setReadOnly(): void {
        this._SafeStr_2237 = true;
    }
}
