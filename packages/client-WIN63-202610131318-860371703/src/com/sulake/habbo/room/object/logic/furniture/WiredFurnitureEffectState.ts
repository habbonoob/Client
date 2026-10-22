import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { WiredFurnitureHighlightData } from '@/com/sulake/habbo/room/object/data/WiredFurnitureHighlightData';
import { WiredFurnitureTransparencyData } from '@/com/sulake/habbo/room/object/data/WiredFurnitureTransparencyData';

export class WiredFurnitureEffectState {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::WiredFurnitureEffectState'); }

    private static readonly _SafeStr_14786: number = 500;
    private static readonly _SafeStr_14787: number = 1000;
    private _SafeStr_14788: boolean = false;
    private _SafeStr_14789: number = 0;
    private _SafeStr_14790: number = 0;
    private _SafeStr_14791: number = 0;
    private _transparencyChangeTime: number = 0;
    private _transparencyEasingMode: number = 0;
    private _SafeStr_14792: boolean = false;
    private _SafeStr_14428: boolean = false;
    private _SafeStr_14793: boolean = false;
    private _highlightType: number = 0;
    private _currentHighlightStrength: number = 0;
    private _startHighlightStrength: number = 0;
    private _targetHighlightStrength: number = 0;
    private _highlightChangeTime: number = 0;
    private _highlightEasingMode: number = 0;
    private _highlightTransitionActive: boolean = false;
    private _highlightColor: number = 16777215;
    private _highlightAnimationMode: number = 0;
    private _highlightAnimationStartTime: number = 0;
    private _SafeStr_14794: number = NaN;
    private _SafeStr_14795: number = -1;
    private _SafeStr_14796: number = -1;
    private _publishedHighlightStrength: number = NaN;
    private _publishedHighlightColor: number = -1;

    constructor() {
    }

    private static ease(param1: number, param2: number): number {
        switch (param2 - 2) {
            case 0:
                return param1 * param1;
            case 1:
                return 1 - (1 - param1) * (1 - param1);
            case 2:
                return param1 < 0.5 ? 2 * param1 * param1 : 1 - Math.pow(-2 * param1 + 2, 2) / 2;
            default:
                return param1;
        }
    }

    private static clampPercentage(param1: number): number {
        return Math.max(0, Math.min(param1, 100)) | 0;
    }

    public setTransparency(param1: number, param2: boolean, param3: number, param4: boolean, param5: number, param6: IRoomObjectModelController): void {
        if (this._SafeStr_14788 && this._SafeStr_14792) {
            this.updateTransparency(param5, param6);
        }
        this._SafeStr_14788 = true;
        this._SafeStr_14791 = WiredFurnitureEffectState.clampPercentage(param1);
        this._SafeStr_14428 = param2;
        this._transparencyEasingMode = param3;
        param6.setObject("furniture_wired_transparency_data", new WiredFurnitureTransparencyData(this._SafeStr_14791 | 0, this._SafeStr_14428, this._transparencyEasingMode));
        if (param4 || param3 == 0 || this._SafeStr_14789 == this._SafeStr_14791) {
            this._SafeStr_14789 = this._SafeStr_14791;
            this._SafeStr_14792 = false;
        } else {
            this._SafeStr_14790 = this._SafeStr_14789;
            this._transparencyChangeTime = param5;
            this._SafeStr_14792 = true;
        }
        this.publishTransparency(param6);
        this.publishClickThrough(param6);
    }

    public setHighlight(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: IRoomObjectModelController): void {
        if (this._SafeStr_14793) {
            if (this._highlightTransitionActive) {
                this.updateHighlightStrength(param7, param8);
            } else {
                this._currentHighlightStrength = this.calculateHighlightStrength(param7);
            }
        }
        if (!this._SafeStr_14793 || !param6) {
            this._highlightAnimationStartTime = param7;
        }
        this._SafeStr_14793 = true;
        this._highlightType = param1;
        this._targetHighlightStrength = WiredFurnitureEffectState.clampPercentage(param2);
        this._highlightColor = param3 & 0xFFFFFF;
        this._highlightAnimationMode = Math.max(0, Math.min(param4, 1)) | 0;
        this._highlightEasingMode = (this._highlightAnimationMode == 0 ? Math.max(0, Math.min(param5, 4)) : 0) | 0;
        param8.setObject("furniture_wired_highlight_data", new WiredFurnitureHighlightData(this._highlightType, this._targetHighlightStrength, this._highlightColor, this._highlightAnimationMode, this._highlightEasingMode));
        if (this._highlightAnimationMode != 0) {
            this._currentHighlightStrength = this.calculateHighlightStrength(param7);
            this._highlightTransitionActive = false;
        } else if (param6 || this._highlightEasingMode == 0 || this._currentHighlightStrength == this._targetHighlightStrength) {
            this._currentHighlightStrength = this._targetHighlightStrength;
            this._highlightTransitionActive = false;
        } else {
            this._startHighlightStrength = this._currentHighlightStrength;
            this._highlightChangeTime = param7;
            this._highlightTransitionActive = true;
        }
        this.publishHighlightType(param8);
        this.publishHighlightColor(param8);
        this.publishHighlightStrength(this.calculateHighlightStrength(param7), param8);
    }

    public update(param1: number, param2: IRoomObjectModelController): void {
        if (this._SafeStr_14788 && this._SafeStr_14792) {
            this.updateTransparency(param1, param2);
        }
        if (this._SafeStr_14793) {
            if (this._highlightTransitionActive) {
                this.updateHighlightStrength(param1, param2);
            } else if (this._targetHighlightStrength > 0 && this._highlightAnimationMode != 0) {
                this.publishHighlightStrength(this.calculateHighlightStrength(param1), param2);
            }
        }
    }

    public dispose(): void {
        this._SafeStr_14788 = false;
        this._SafeStr_14792 = false;
        this._SafeStr_14793 = false;
        this._highlightTransitionActive = false;
    }

    private updateTransparency(param1: number, param2: IRoomObjectModelController): void {
        let _loc3_: number = param1 - this._transparencyChangeTime;
        if (_loc3_ < 0) {
            _loc3_ = 0;
        }
        let _loc5_: number = Number(Math.min(_loc3_ / 500, 1));
        let _loc4_: number = WiredFurnitureEffectState.ease(_loc5_, this._transparencyEasingMode);
        this._SafeStr_14789 = this._SafeStr_14790 + (this._SafeStr_14791 - this._SafeStr_14790) * _loc4_;
        if (_loc5_ >= 1) {
            this._SafeStr_14789 = this._SafeStr_14791;
            this._SafeStr_14792 = false;
        }
        this.publishTransparency(param2);
    }

    private updateHighlightStrength(param1: number, param2: IRoomObjectModelController): void {
        let _loc3_: number = param1 - this._highlightChangeTime;
        if (_loc3_ < 0) {
            _loc3_ = 0;
        }
        let _loc5_: number = Number(Math.min(_loc3_ / 500, 1));
        let _loc4_: number = WiredFurnitureEffectState.ease(_loc5_, this._highlightEasingMode);
        this._currentHighlightStrength = this._startHighlightStrength + (this._targetHighlightStrength - this._startHighlightStrength) * _loc4_;
        if (_loc5_ >= 1) {
            this._currentHighlightStrength = this._targetHighlightStrength;
            this._highlightTransitionActive = false;
        }
        this.publishHighlightStrength(this._currentHighlightStrength, param2);
    }

    private calculateHighlightStrength(param1: number): number {
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc2_: number = param1 - this._highlightAnimationStartTime;
        if (_loc2_ < 0) {
            _loc2_ = 0;
        }
        switch (this._highlightAnimationMode - 1) {
            case 0:
                _loc3_ = _loc2_ % 1000 / 1000;
                _loc4_ = (1 - Math.cos(_loc3_ * 3.141592653589793 * 2)) / 2;
                return Math.round(this._targetHighlightStrength * _loc4_);
            default:
                return this._currentHighlightStrength;
        }
    }

    private publishTransparency(param1: IRoomObjectModelController): void {
        if (this._SafeStr_14794 != this._SafeStr_14789) {
            this._SafeStr_14794 = this._SafeStr_14789;
            param1.setNumber("furniture_wired_transparency", this._SafeStr_14789);
        }
    }

    private publishClickThrough(param1: IRoomObjectModelController): void {
        let _loc2_: number = this._SafeStr_14428 ? 1 : 0;
        if (this._SafeStr_14795 != _loc2_) {
            this._SafeStr_14795 = _loc2_;
            param1.setNumber("furniture_wired_click_through", _loc2_);
        }
    }

    private publishHighlightType(param1: IRoomObjectModelController): void {
        if (this._SafeStr_14796 != this._highlightType) {
            this._SafeStr_14796 = this._highlightType;
            param1.setNumber("furniture_wired_highlight_type", this._highlightType);
        }
    }

    private publishHighlightStrength(param1: number, param2: IRoomObjectModelController): void {
        if (this._publishedHighlightStrength != param1) {
            this._publishedHighlightStrength = param1;
            param2.setNumber("furniture_wired_highlight_strength", param1);
        }
    }

    private publishHighlightColor(param1: IRoomObjectModelController): void {
        if (this._publishedHighlightColor != this._highlightColor) {
            this._publishedHighlightColor = this._highlightColor;
            param1.setNumber("furniture_wired_highlight_color", this._highlightColor);
        }
    }
}
