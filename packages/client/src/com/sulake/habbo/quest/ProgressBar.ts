import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ProgressBar implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::ProgressBar'); }

    private static readonly PROGRESS_TEXT_X_OFFSET: number = 3;
    private static readonly CONTAINER_SPACING: number = 10;

    constructor(param1: HabboQuestEngine, param2: IWindowContainer, param3: number, param4: string, param5: boolean, param6: Point, param7: boolean = false) {
        this._questEngine = param1;
        this._window = param2;
        this._progressBarWidth = param3;
        this._progressKey = param4;
        this._hasFrame = param5;
        this._SafeStr_6508 = param7;
        let _loc8_: IWindowContainer = castGuarded(this._window.findChildByName("progress_bar_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc8_ == null) {
            _loc8_ = castGuarded(this._questEngine.getXmlWindow("ProgressBar"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._window.addChild(_loc8_);
            _loc8_.x = param6.x | 0;
            _loc8_.y = param6.y | 0;
            _loc8_.width = this._progressBarWidth + 10;
        }
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IWindowContainer;

    declare private _progressBarWidth: number;
    static { (this.prototype as any)._progressBarWidth = 0; }

    declare private _progressKey: string;

    declare private _hasFrame: boolean;
    static { (this.prototype as any)._hasFrame = false; }

    declare private _currentAmount: number;
    static { (this.prototype as any)._currentAmount = 0; }

    declare private _maxAmount: number;
    static { (this.prototype as any)._maxAmount = 0; }

    declare private _scoreAtStartOfLevel: number;
    static { (this.prototype as any)._scoreAtStartOfLevel = 0; }

    declare private _SafeStr_7145: number;
    static { (this.prototype as any)._SafeStr_7145 = 0; }

    declare private _startProgressWidth: number;
    static { (this.prototype as any)._startProgressWidth = 0; }

    declare private _currentProgressWidth: number;
    static { (this.prototype as any)._currentProgressWidth = 0; }

    declare private _SafeStr_4253: boolean;
    static { (this.prototype as any)._SafeStr_4253 = false; }

    declare private _SafeStr_6508: boolean;
    static { (this.prototype as any)._SafeStr_6508 = false; }

    public set visible(param1: boolean) {
        let _loc2_: IWindowContainer = castGuarded(this._window.findChildByName("progress_bar_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc2_ != null) {
            _loc2_.visible = param1;
        }
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public get isUpdating(): boolean {
        return this._SafeStr_4253;
    }

    public refresh(param1: number, param2: number, param3: number, param4: number): void {
        let _loc5_: boolean = param3 != this._SafeStr_7145 || param2 != this._maxAmount;
        this._maxAmount = param2;
        this._currentAmount = param1;
        this._startProgressWidth = this._currentProgressWidth;
        this._SafeStr_7145 = param3;
        this._scoreAtStartOfLevel = param4;
        if (_loc5_) {
            this._currentProgressWidth = this.getProgressWidth(this._currentAmount);
        }
        this._SafeStr_4253 = true;
        this.updateView();
    }

    public updateView(param1: number = 0): void {
        let _loc4_: number = NaN;
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        if (!this._SafeStr_4253) {
            return;
        }
        let _loc12_: IWindow = this._window.findChildByName("bar_a_bkg");
        let _loc14_: IWindow = this._window.findChildByName("bar_a_c");
        let _loc13_: IWindow = this._window.findChildByName("bar_a_r");
        let _loc6_: IWindow = this._window.findChildByName("bar_l");
        let _loc2_: IWindow = this._window.findChildByName("bar_c");
        let _loc3_: IWindow = this._window.findChildByName("bar_r");
        _loc6_.visible = this._hasFrame;
        _loc2_.visible = this._hasFrame;
        _loc3_.visible = this._hasFrame;
        if (this._hasFrame) {
            _loc2_.width = this._progressBarWidth;
            _loc3_.x = this._progressBarWidth + _loc14_.x;
        }
        let _loc9_: number = this.getProgressWidth(this._currentAmount);
        if (this._currentProgressWidth != _loc9_) {
            _loc4_ = param1 / 32;
            _loc7_ = _loc9_ - this._currentProgressWidth;
            _loc5_ = Math.max(1, _loc4_ * Math.round(Math.sqrt(Math.abs(_loc7_)))) | 0;
            if (this._currentProgressWidth < _loc9_) {
                this._currentProgressWidth = Math.min(_loc9_, this._currentProgressWidth + _loc5_) | 0;
            } else {
                this._currentProgressWidth = Math.max(_loc9_, this._currentProgressWidth - _loc5_) | 0;
            }
        }
        let _loc8_: any = this._currentProgressWidth >= 0;
        _loc12_.visible = _loc8_;
        _loc14_.visible = _loc8_;
        _loc13_.visible = _loc8_;
        if (_loc8_) {
            _loc14_.blend = 1 - (_loc9_ - this._currentProgressWidth) / (_loc9_ - this._startProgressWidth);
            _loc14_.width = this._currentProgressWidth;
            _loc13_.x = this._currentProgressWidth + _loc14_.x;
            _loc12_.width = _loc13_.right - _loc14_.left;
        }
        this._SafeStr_4253 = this._currentProgressWidth != _loc9_;
        let _loc11_: IWindow = this._window.findChildByName("progress_txt");
        let _loc10_: number = (this._SafeStr_4253 ? Math.round(this._currentProgressWidth / this._progressBarWidth * this._maxAmount) : this._currentAmount) | 0;
        if (this._SafeStr_6508) {
            this._questEngine.localization.registerParameter(this._progressKey, "progress", "" + (Math.floor(_loc10_ * 1 / this._maxAmount * 100) | 0));
        } else {
            this._questEngine.localization.registerParameter(this._progressKey, "progress", "" + (_loc10_ + this._scoreAtStartOfLevel));
            this._questEngine.localization.registerParameter(this._progressKey, "limit", "" + (this._maxAmount + this._scoreAtStartOfLevel));
        }
        _loc11_.caption = this._questEngine.localization.getLocalization(this._progressKey, this._progressKey);
        _loc11_.x = 3 + _loc14_.x + (this._progressBarWidth - _loc11_.width) / 2 | 0;
    }

    public dispose(): void {
        this._questEngine = null;
        this._window = null;
    }

    private getProgressWidth(param1: number): number {
        return Math.max(0, Math.round(this._progressBarWidth * param1 / this._maxAmount)) | 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
