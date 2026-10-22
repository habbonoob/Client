import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WiredWallItemMoveMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::WiredWallItemMoveMessageData'); }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number) {
        this._itemId = param1;
        this._isDirectionRight = param2;
        this._oldWallX = param3;
        this._oldWallY = param4;
        this._oldOffsetX = param5;
        this._oldOffsetY = param6;
        this._newWallX = param7;
        this._newWallY = param8;
        this._newOffsetX = param9;
        this._newOffsetY = param10;
        this._animationTime = param11;
    }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _isDirectionRight: boolean;
    static { (this.prototype as any)._isDirectionRight = false; }

    declare private _oldWallX: number;
    static { (this.prototype as any)._oldWallX = 0; }

    declare private _oldWallY: number;
    static { (this.prototype as any)._oldWallY = 0; }

    declare private _oldOffsetX: number;
    static { (this.prototype as any)._oldOffsetX = 0; }

    declare private _oldOffsetY: number;
    static { (this.prototype as any)._oldOffsetY = 0; }

    declare private _newWallX: number;
    static { (this.prototype as any)._newWallX = 0; }

    declare private _newWallY: number;
    static { (this.prototype as any)._newWallY = 0; }

    declare private _newOffsetX: number;
    static { (this.prototype as any)._newOffsetX = 0; }

    declare private _newOffsetY: number;
    static { (this.prototype as any)._newOffsetY = 0; }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    public get animationTime(): number {
        return this._animationTime;
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get isDirectionRight(): boolean {
        return this._isDirectionRight;
    }

    public get oldWallX(): number {
        return this._oldWallX;
    }

    public get oldWallY(): number {
        return this._oldWallY;
    }

    public get oldOffsetX(): number {
        return this._oldOffsetX;
    }

    public get oldOffsetY(): number {
        return this._oldOffsetY;
    }

    public get newWallX(): number {
        return this._newWallX;
    }

    public get newWallY(): number {
        return this._newWallY;
    }

    public get newOffsetX(): number {
        return this._newOffsetX;
    }

    public get newOffsetY(): number {
        return this._newOffsetY;
    }
}
