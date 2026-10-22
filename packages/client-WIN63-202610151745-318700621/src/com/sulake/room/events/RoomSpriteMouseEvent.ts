import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomSpriteMouseEvent {
    static { registerClassName(this, 'com.sulake.room.events::RoomSpriteMouseEvent'); }

    private _type: string = "";
    private _SafeStr_5881: string = "";
    private _canvasId: string = "";
    private _spriteTag: string = "";
    private _SafeStr_7251: number = 0;
    private _SafeStr_6731: number = 0;
    private _SafeStr_6309: number = 0;
    private _SafeStr_6698: number = 0;
    private _ctrlKey: boolean = false;
    private _altKey: boolean = false;
    private _shiftKey: boolean = false;
    private _buttonDown: boolean = false;
    private _spriteOffsetX: number = 0;
    private _spriteOffsetY: number = 0;

    constructor(param1: string, param2: string, param3: string, param4: string, param5: number, param6: number, param7: number = 0, param8: number = 0, param9: boolean = false, param10: boolean = false, param11: boolean = false, param12: boolean = false) {
        this._type = param1;
        this._SafeStr_5881 = param2;
        this._canvasId = param3;
        this._spriteTag = param4;
        this._SafeStr_7251 = param5;
        this._SafeStr_6731 = param6;
        this._SafeStr_6309 = param7;
        this._SafeStr_6698 = param8;
        this._ctrlKey = param9;
        this._altKey = param10;
        this._shiftKey = param11;
        this._buttonDown = param12;
    }

    public get type(): string {
        return this._type;
    }

    public get eventId(): string {
        return this._SafeStr_5881;
    }

    public get canvasId(): string {
        return this._canvasId;
    }

    public get spriteTag(): string {
        return this._spriteTag;
    }

    public get screenX(): number {
        return this._SafeStr_7251;
    }

    public get screenY(): number {
        return this._SafeStr_6731;
    }

    public get localX(): number {
        return this._SafeStr_6309;
    }

    public get localY(): number {
        return this._SafeStr_6698;
    }

    public get ctrlKey(): boolean {
        return this._ctrlKey;
    }

    public get altKey(): boolean {
        return this._altKey;
    }

    public get shiftKey(): boolean {
        return this._shiftKey;
    }

    public get buttonDown(): boolean {
        return this._buttonDown;
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
