import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AnimatedColor } from '@/com/sulake/habbo/window/utils/AnimatedColor';
import { AnimatedScalar } from '@/com/sulake/habbo/window/utils/AnimatedScalar';

export class HabbiconProgressBarView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconProgressBarView'); }

    private static readonly ACCELERATION_PER_MS: number = 0.00001;
    private static readonly MAX_SPEED_PER_MS: number = 0.003;
    private static readonly _SafeStr_14118: number = 0.0001;
    private static readonly FILL_COLOR_TRANSITION_MS: number = 250;
    private static readonly INCOMPLETE_COLOR: number = 5548264;
    private static readonly COMPLETE_COLOR: number = 7915868;
    private static readonly CAP_OVERSHOOT: number = 4;

    declare private _container: IWindowContainer;

    declare private _SafeStr_4425: IWindowContainer;

    declare private _fill: IWindow;

    declare private _highlight: IWindow;

    declare private _SafeStr_14119: AnimatedScalar;

    declare private _fillColor: AnimatedColor;

    private _SafeStr_3280: number = 0;

    declare private _maxWidth: number;
    static { (this.prototype as any)._maxWidth = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._container = param1;
        this._SafeStr_4425 = asGuarded(this._container.findChildByName("progress"), isIWindowContainer);
        this._fill = this._SafeStr_4425.findChildByName("fill");
        this._highlight = this._SafeStr_4425.findChildByName("highlight");
        this._maxWidth = this._container.width;
        this._SafeStr_14119 = new AnimatedScalar(0.00001, 0.003, 0.0001);
        this._fillColor = new AnimatedColor(250);
        this._fillColor.snapTo(5548264, this._SafeStr_3280);
        this.render();
    }

    public setRatio(param1: number, param2: boolean): void {
        let _loc3_: number = Math.max(0, Math.min(1, param1));
        if (param2) {
            this._SafeStr_14119.setTarget(_loc3_, this._SafeStr_3280);
        } else {
            this._SafeStr_14119.snapTo(_loc3_, this._SafeStr_3280);
        }
        this.syncCompletionColor(param2);
        this.render();
    }

    public update(param1: number): void {
        this._SafeStr_3280 += param1;
        let _loc2_: boolean = this._SafeStr_14119.update(this._SafeStr_3280);
        this.syncCompletionColor(true);
        _loc2_ = this._fillColor.update(this._SafeStr_3280) || _loc2_;
        if (_loc2_) {
            this.render();
        }
    }

    private render(): void {
        let _loc1_: number = Math.max(0, Math.min(this._maxWidth, Math.round(this._maxWidth * this._SafeStr_14119.value))) | 0;
        let _loc2_: number = _loc1_ >= this._maxWidth - 4 ? this._maxWidth : _loc1_ + 4;
        this._SafeStr_4425.width = _loc1_;
        this._SafeStr_4425.visible = _loc1_ > 0;
        this._fill.width = Math.max(0, _loc2_) | 0;
        this._fill.color = this._fillColor.value;
        this._highlight.width = Math.max(0, _loc2_ - 2) | 0;
        this._container.invalidate();
    }

    private syncCompletionColor(param1: boolean): void {
        let _loc2_: number = (this._SafeStr_14119.value >= 1 ? 7915868 : 5548264) >>> 0;
        if (param1) {
            this._fillColor.setTarget(_loc2_, this._SafeStr_3280);
        } else {
            this._fillColor.snapTo(_loc2_, this._SafeStr_3280);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._container = null;
        this._SafeStr_4425 = null;
        this._fill = null;
        this._highlight = null;
        this._SafeStr_14119 = null;
        this._fillColor = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
