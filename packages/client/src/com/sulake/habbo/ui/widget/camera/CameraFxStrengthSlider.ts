import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CameraPhotoLab } from '@/com/sulake/habbo/ui/widget/camera/CameraPhotoLab';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class CameraFxStrengthSlider {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraFxStrengthSlider'); }

    constructor(param1: CameraPhotoLab, param2: IWindowContainer, param3: IAssetLibrary) {
        this._view = param1;
        this._SafeStr_2940 = param2;
        this.storeAssets(param3);
        this.displaySlider();
    }

    declare private _view: CameraPhotoLab;

    declare private _SafeStr_2940: IWindowContainer;

    declare private _SafeStr_3371: BitmapData;

    declare private _SafeStr_3365: BitmapData;

    declare private _activeBaseArea: IBitmapWrapperWindow;

    declare private _sliderBaseWidth: number;
    static { (this.prototype as any)._sliderBaseWidth = 0; }

    declare private _referenceWidth: number;
    static { (this.prototype as any)._referenceWidth = 0; }

    private _SafeStr_6022: number = 0;

    public dispose(): void {
        this._view = null;
        this._SafeStr_2940 = null;
        this._SafeStr_3371 = null;
        this._SafeStr_3365 = null;
    }

    public disable(): void {
        this._SafeStr_2940.visible = false;
    }

    public enable(): void {
        this._SafeStr_2940.visible = true;
    }

    public getScale(): number {
        return this._referenceWidth;
    }

    public setValue(param1: number): void {
        let _loc2_: IWindow = null;
        if (this._SafeStr_2940 != null) {
            _loc2_ = this._SafeStr_2940.findChildByName("slider_button");
            if (_loc2_ != null) {
                _loc2_.x = param1;
            }
        }
    }

    private buttonProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_RELOCATED") {
            if (this._activeBaseArea) {
                this._activeBaseArea.width = param2.x / this._referenceWidth * this._sliderBaseWidth | 0;
            }
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            this._view.setSelectedFxValue(param2.x);
        }
    };

    private shaftProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WME_DOWN" && param2.name == "shaft_click_area") {
            _loc3_ = castTo(param1, WindowMouseEvent).localX - this._SafeStr_6022 | 0;
            this.setValue(_loc3_);
            this._view.setSelectedFxValue(_loc3_);
        }
    };

    private displaySlider(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: IBitmapWrapperWindow = null;
        if (this._SafeStr_2940 == null) {
            return;
        }
        let _loc1_: IRegionWindow = asGuarded(this._SafeStr_2940.findChildByName("shaft_click_area"), isIRegionWindow);
        if (_loc1_) {
            _loc1_.procedure = this.shaftProcedure;
        }
        _loc2_ = asGuarded(this._SafeStr_2940.findChildByName("slider_base"), isIBitmapWrapperWindow);
        if (_loc2_ != null && this._SafeStr_3371 != null) {
            this._sliderBaseWidth = _loc2_.width;
            _loc2_.bitmap = new BitmapData(this._SafeStr_3371.width, this._SafeStr_3371.height, true, 16777215);
            _loc2_.bitmap.copyPixels(this._SafeStr_3371, this._SafeStr_3371.rect, new Point(0, 0), null, null, true);
            this._activeBaseArea = _loc2_;
        }
        _loc3_ = asGuarded(this._SafeStr_2940.findChildByName("slider_movement_area"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc2_ = asGuarded(_loc3_.findChildByName("slider_button"), isIBitmapWrapperWindow);
            if (_loc2_ != null && this._SafeStr_3365 != null) {
                _loc2_.bitmap = new BitmapData(this._SafeStr_3365.width, this._SafeStr_3365.height, true, 16777215);
                _loc2_.bitmap.copyPixels(this._SafeStr_3365, this._SafeStr_3365.rect, new Point(0, 0), null, null, true);
                _loc2_.procedure = this.buttonProcedure;
                this._referenceWidth = _loc3_.width - _loc2_.width;
                this._SafeStr_6022 = (this._sliderBaseWidth - this._referenceWidth) / 2 | 0;
            }
        }
    }

    private storeAssets(param1: IAssetLibrary): void {
        let _loc2_: BitmapDataAsset = null;
        if (param1 == null) {
            return;
        }
        _loc2_ = castTo(param1.getAssetByName("camera_fx_slider_bottom_active"), BitmapDataAsset);
        this._SafeStr_3371 = castTo(_loc2_.content, BitmapData);
        _loc2_ = castTo(param1.getAssetByName("camera_fx_slider_button"), BitmapDataAsset);
        this._SafeStr_3365 = castTo(_loc2_.content, BitmapData);
    }
}
