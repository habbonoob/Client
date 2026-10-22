import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IRectLimiter } from '@/com/sulake/core/window/utils/IRectLimiter';

export class WindowRectLimits implements IRectLimiter {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowRectLimits'); }

    constructor(param1: IWindow) {
        this._target = param1;
    }

    private _minHeight: number = -2147483648;
    private _maxHeight: number = 2147483647;

    declare private _target: IWindow;

    private _minWidth: number = -2147483648;

    public get minWidth(): number {
        return this._minWidth;
    }

    public set minWidth(param1: number) {
        this._minWidth = param1;
        if (this._minWidth > -2147483648 && !this._target.disposed && this._target.width < this._minWidth) {
            this._target.width = this._minWidth;
        }
    }

    private _maxWidth: number = 2147483647;

    public get maxWidth(): number {
        return this._maxWidth;
    }

    public set maxWidth(param1: number) {
        this._maxWidth = param1;
        if (this._maxWidth < 2147483647 && !this._target.disposed && this._target.width > this._maxWidth) {
            this._target.width = this._maxWidth;
        }
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    public set minHeight(param1: number) {
        this._minHeight = param1;
        if (this._minHeight > -2147483648 && !this._target.disposed && this._target.height < this._minHeight) {
            this._target.height = this._minHeight;
        }
    }

    public get maxHeight(): number {
        return this._maxHeight;
    }

    public set maxHeight(param1: number) {
        this._maxHeight = param1;
        if (this._maxHeight < 2147483647 && !this._target.disposed && this._target.height > this._maxHeight) {
            this._target.height = this._maxHeight;
        }
    }

    public get isEmpty(): boolean {
        return this._minWidth == -2147483648 && this._maxWidth == 2147483647 && this._minHeight == -2147483648 && this._maxHeight == 2147483647;
    }

    public setEmpty(): void {
        this._minWidth = -2147483648;
        this._maxWidth = 2147483647;
        this._minHeight = -2147483648;
        this._maxHeight = 2147483647;
    }

    public limit(): void {
        if (!this.isEmpty && this._target) {
            if (this._target.width < this._minWidth) {
                this._target.width = this._minWidth;
            } else if (this._target.width > this._maxWidth) {
                this._target.width = this._maxWidth;
            }
            if (this._target.height < this._minHeight) {
                this._target.height = this._minHeight;
            } else if (this._target.height > this._maxHeight) {
                this._target.height = this._maxHeight;
            }
        }
    }

    public assign(param1: number, param2: number, param3: number, param4: number): void {
        this._minWidth = param1;
        this._maxWidth = param2;
        this._minHeight = param3;
        this._maxHeight = param4;
        this.limit();
    }

    public clone(param1: IWindow): WindowRectLimits {
        let _loc2_: WindowRectLimits = new WindowRectLimits(param1);
        _loc2_._minWidth = this._minWidth;
        _loc2_._maxWidth = this._maxWidth;
        _loc2_._minHeight = this._minHeight;
        _loc2_._maxHeight = this._maxHeight;
        return _loc2_;
    }
}
