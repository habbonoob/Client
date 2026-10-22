import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectFurnitureRegionUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectFurnitureRegionUpdateMessage'); }

    declare private _title: string;

    declare private _description: string;

    declare private _xOffset: number;
    static { (this.prototype as any)._xOffset = 0; }

    declare private _yOffset: number;
    static { (this.prototype as any)._yOffset = 0; }

    declare private _minWidth: number;
    static { (this.prototype as any)._minWidth = 0; }

    declare private _minHeight: number;
    static { (this.prototype as any)._minHeight = 0; }

    declare private _color: string;

    declare private _SafeStr_14797: Rectangle[];

    constructor(param1: string, param2: string = null, param3: number = 0, param4: number = 0, param5: number = 0, param6: number = 0, param7: string = null, param8: Rectangle[] = null) {
        super(null, null);
        this._title = param1;
        this._description = param2;
        this._xOffset = param3;
        this._yOffset = param4;
        this._minWidth = param5;
        this._minHeight = param6;
        this._color = param7;
        this._SafeStr_14797 = param8;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get xOffset(): number {
        return this._xOffset;
    }

    public get yOffset(): number {
        return this._yOffset;
    }

    public get minWidth(): number {
        return this._minWidth;
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    public get color(): string {
        return this._color;
    }

    public get areas(): Rectangle[] {
        return this._SafeStr_14797;
    }
}
