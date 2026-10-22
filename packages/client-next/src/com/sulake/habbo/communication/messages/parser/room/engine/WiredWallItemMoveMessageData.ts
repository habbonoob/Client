import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WiredWallItemMoveMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::WiredWallItemMoveMessageData'); }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _SafeStr_6729: boolean;
    static { (this.prototype as any)._SafeStr_6729 = false; }

    declare private _SafeStr_6925: number;
    static { (this.prototype as any)._SafeStr_6925 = 0; }

    declare private _SafeStr_6735: number;
    static { (this.prototype as any)._SafeStr_6735 = 0; }

    declare private _SafeStr_6108: number;
    static { (this.prototype as any)._SafeStr_6108 = 0; }

    declare private _SafeStr_6353: number;
    static { (this.prototype as any)._SafeStr_6353 = 0; }

    declare private _SafeStr_6052: number;
    static { (this.prototype as any)._SafeStr_6052 = 0; }

    declare private _SafeStr_6352: number;
    static { (this.prototype as any)._SafeStr_6352 = 0; }

    declare private _SafeStr_6785: number;
    static { (this.prototype as any)._SafeStr_6785 = 0; }

    declare private _SafeStr_6087: number;
    static { (this.prototype as any)._SafeStr_6087 = 0; }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number) {
        this._itemId = param1;
        this._SafeStr_6729 = param2;
        this._SafeStr_6925 = param3;
        this._SafeStr_6735 = param4;
        this._SafeStr_6108 = param5;
        this._SafeStr_6353 = param6;
        this._SafeStr_6052 = param7;
        this._SafeStr_6352 = param8;
        this._SafeStr_6785 = param9;
        this._SafeStr_6087 = param10;
        this._animationTime = param11;
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get isDirectionRight(): boolean {
        return this._SafeStr_6729;
    }

    public get oldWallX(): number {
        return this._SafeStr_6925;
    }

    public get oldWallY(): number {
        return this._SafeStr_6735;
    }

    public get oldOffsetX(): number {
        return this._SafeStr_6108;
    }

    public get oldOffsetY(): number {
        return this._SafeStr_6353;
    }

    public get newWallX(): number {
        return this._SafeStr_6052;
    }

    public get newWallY(): number {
        return this._SafeStr_6352;
    }

    public get newOffsetX(): number {
        return this._SafeStr_6785;
    }

    public get newOffsetY(): number {
        return this._SafeStr_6087;
    }

    public get animationTime(): number {
        return this._animationTime;
    }
}
