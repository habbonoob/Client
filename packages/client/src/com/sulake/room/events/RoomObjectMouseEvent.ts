import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectMouseEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.room.events::RoomObjectMouseEvent'); }

    public static readonly ROOM_OBJECT_MOUSE_CLICK: string = "ROE_MOUSE_CLICK";
    public static readonly ROOM_OBJECT_MOUSE_ENTER: string = "ROE_MOUSE_ENTER";
    public static readonly ROOM_OBJECT_MOUSE_MOVE: string = "ROE_MOUSE_MOVE";
    public static readonly ROOM_OBJECT_MOUSE_LEAVE: string = "ROE_MOUSE_LEAVE";
    public static readonly ROOM_OBJECT_MOUSE_DOUBLE_CLICK: string = "ROE_MOUSE_DOUBLE_CLICK";
    public static readonly ROOM_OBJECT_MOUSE_DOWN: string = "ROE_MOUSE_DOWN";

    constructor(param1: string, param2: IRoomObject, param3: string, param4: boolean = false, param5: boolean = false, param6: boolean = false, param7: boolean = false, param8: boolean = false, param9: boolean = false) {
        super(param1, param2, param8, param9);
        this._eventId = param3;
        this._altKey = param4;
        this._ctrlKey = param5;
        this._shiftKey = param6;
        this._buttonDown = param7;
    }

    private _eventId: string = "";

    declare private _buttonDown: boolean;
    static { (this.prototype as any)._buttonDown = false; }

    declare private _localX: number;
    static { (this.prototype as any)._localX = 0; }

    declare private _localY: number;
    static { (this.prototype as any)._localY = 0; }

    declare private _spriteOffsetX: number;
    static { (this.prototype as any)._spriteOffsetX = 0; }

    declare private _spriteOffsetY: number;
    static { (this.prototype as any)._spriteOffsetY = 0; }

    declare private _altKey: boolean;
    static { (this.prototype as any)._altKey = false; }

    public get altKey(): boolean {
        return this._altKey;
    }

    declare private _ctrlKey: boolean;
    static { (this.prototype as any)._ctrlKey = false; }

    public get ctrlKey(): boolean {
        return this._ctrlKey;
    }

    declare private _shiftKey: boolean;
    static { (this.prototype as any)._shiftKey = false; }

    public get shiftKey(): boolean {
        return this._shiftKey;
    }

    public get eventId(): string {
        return this._eventId;
    }

    public get buttonDown(): boolean {
        return this._buttonDown;
    }

    public get localX(): number {
        return this._localX;
    }

    public set localX(param1: number) {
        this._localX = param1;
    }

    public get localY(): number {
        return this._localY;
    }

    public set localY(param1: number) {
        this._localY = param1;
    }

    public get spriteOffsetX(): number {
        return this._spriteOffsetX;
    }

    public set spriteOffsetX(param1: number) {
        this._spriteOffsetX = param1;
    }

    public get spriteOffsetY(): number {
        return this._spriteOffsetY;
    }

    public set spriteOffsetY(param1: number) {
        this._spriteOffsetY = param1;
    }
}
