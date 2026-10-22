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
    private _SafeStr_5881: string = "";

    declare private _altKey: boolean;
    static { (this.prototype as any)._altKey = false; }

    declare private _ctrlKey: boolean;
    static { (this.prototype as any)._ctrlKey = false; }

    declare private _shiftKey: boolean;
    static { (this.prototype as any)._shiftKey = false; }

    declare private _buttonDown: boolean;
    static { (this.prototype as any)._buttonDown = false; }

    declare private _SafeStr_6309: number;
    static { (this.prototype as any)._SafeStr_6309 = 0; }

    declare private _SafeStr_6698: number;
    static { (this.prototype as any)._SafeStr_6698 = 0; }

    declare private _spriteOffsetX: number;
    static { (this.prototype as any)._spriteOffsetX = 0; }

    declare private _spriteOffsetY: number;
    static { (this.prototype as any)._spriteOffsetY = 0; }

    constructor(param1: string, param2: IRoomObject, param3: string, param4: boolean = false, param5: boolean = false, param6: boolean = false, param7: boolean = false, param8: boolean = false, param9: boolean = false) {
        super(param1, param2, param8, param9);
        this._SafeStr_5881 = param3;
        this._altKey = param4;
        this._ctrlKey = param5;
        this._shiftKey = param6;
        this._buttonDown = param7;
    }

    public get eventId(): string {
        return this._SafeStr_5881;
    }

    public get altKey(): boolean {
        return this._altKey;
    }

    public get ctrlKey(): boolean {
        return this._ctrlKey;
    }

    public get shiftKey(): boolean {
        return this._shiftKey;
    }

    public get buttonDown(): boolean {
        return this._buttonDown;
    }

    public get localX(): number {
        return this._SafeStr_6309;
    }

    public get localY(): number {
        return this._SafeStr_6698;
    }

    public get spriteOffsetX(): number {
        return this._spriteOffsetX;
    }

    public get spriteOffsetY(): number {
        return this._spriteOffsetY;
    }

    public set localX(param1: number) {
        this._SafeStr_6309 = param1;
    }

    public set localY(param1: number) {
        this._SafeStr_6698 = param1;
    }

    public set spriteOffsetX(param1: number) {
        this._spriteOffsetX = param1;
    }

    public set spriteOffsetY(param1: number) {
        this._spriteOffsetY = param1;
    }
}
