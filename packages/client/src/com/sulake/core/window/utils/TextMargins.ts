import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IMargins } from '@/com/sulake/core/window/utils/IMargins';

export class TextMargins implements IMargins, IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.utils::TextMargins'); }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: (...args: any[]) => any) {
        this._left = param1;
        this._top = param2;
        this._right = param3;
        this._bottom = param4;
        this._callback = param5 != null ? param5 : this.nullCallback;
    }

    declare private _left: number;
    static { (this.prototype as any)._left = 0; }

    declare private _right: number;
    static { (this.prototype as any)._right = 0; }

    declare private _bottom: number;
    static { (this.prototype as any)._bottom = 0; }

    declare private _callback: (...args: any[]) => any;

    declare private _top: number;
    static { (this.prototype as any)._top = 0; }

    public get top(): number {
        return this._top;
    }

    public set top(param1: number) {
        this._top = param1;
        this._callback(this);
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get left(): number {
        return this._left;
    }

    public set left(param1: number) {
        this._left = param1;
        this._callback(this);
    }

    public get right(): number {
        return this._right;
    }

    public set right(param1: number) {
        this._right = param1;
        this._callback(this);
    }

    public get bottom(): number {
        return this._bottom;
    }

    public set bottom(param1: number) {
        this._bottom = param1;
        this._callback(this);
    }

    public get isZeroes(): boolean {
        return this._left == 0 && this._right == 0 && this._top == 0 && this._bottom == 0;
    }

    public assign(param1: number, param2: number, param3: number, param4: number, param5: (...args: any[]) => any): void {
        this._left = param1;
        this._top = param2;
        this._right = param3;
        this._bottom = param4;
        this._callback = param5 != null ? param5 : this.nullCallback;
    }

    public clone(param1: (...args: any[]) => any): TextMargins {
        return new TextMargins(this._left, this._top, this._right, this._bottom, param1);
    }

    public dispose(): void {
        this._callback = null;
        this._disposed = true;
    }

    private nullCallback = (param1: IMargins): void => {
    };

    get [IMargins](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
