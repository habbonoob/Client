import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomSpriteMouseEvent {
    static { registerClassName(this, 'com.sulake.room.events::RoomSpriteMouseEvent'); }

    constructor(param1: string, param2: string, param3: string, param4: string, param5: number, param6: number, param7: number = 0, param8: number = 0, param9: boolean = false, param10: boolean = false, param11: boolean = false, param12: boolean = false) {
        this._type = param1;
        this._eventId = param2;
        this._canvasId = param3;
        this._spriteTag = param4;
        this._screenX = param5;
        this._screenY = param6;
        this._localX = param7;
        this._localY = param8;
        this._ctrlKey = param9;
        this._altKey = param10;
        this._shiftKey = param11;
        this._buttonDown = param12;
    }

    private _type: string = "";
    private _eventId: string = "";
    private _canvasId: string = "";
    private _spriteTag: string = "";
    private _screenX: number = 0;
    private _screenY: number = 0;
    private _localX: number = 0;
    private _localY: number = 0;
    private _buttonDown: boolean = false;
    private _spriteOffsetX: number = 0;
    private _spriteOffsetY: number = 0;
    private _ctrlKey: boolean = false;

    public get ctrlKey(): boolean {
        return this._ctrlKey;
    }

    private _altKey: boolean = false;

    public get altKey(): boolean {
        return this._altKey;
    }

    private _shiftKey: boolean = false;

    public get shiftKey(): boolean {
        return this._shiftKey;
    }

    public get type(): string {
        return this._type;
    }

    public get eventId(): string {
        return this._eventId;
    }

    public get canvasId(): string {
        return this._canvasId;
    }

    public get spriteTag(): string {
        return this._spriteTag;
    }

    public get screenX(): number {
        return this._screenX;
    }

    public get screenY(): number {
        return this._screenY;
    }

    public get localX(): number {
        return this._localX;
    }

    public get localY(): number {
        return this._localY;
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
