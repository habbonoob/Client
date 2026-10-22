import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectTileCursorUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectTileCursorUpdateMessage'); }

    declare private _height: number;
    static { (this.prototype as any)._height = NaN; }

    declare private _sourceEventId: string;

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    declare private _toggleVisibility: boolean;
    static { (this.prototype as any)._toggleVisibility = false; }

    constructor(param1: Vector3d, param2: number, param3: boolean, param4: string, param5: boolean = false) {
        super(param1, null);
        this._height = param2;
        this._visible = param3;
        this._sourceEventId = param4;
        this._toggleVisibility = param5;
    }

    public get height(): number {
        return this._height;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get sourceEventId(): string {
        return this._sourceEventId;
    }

    public get toggleVisibility(): boolean {
        return this._toggleVisibility;
    }
}
