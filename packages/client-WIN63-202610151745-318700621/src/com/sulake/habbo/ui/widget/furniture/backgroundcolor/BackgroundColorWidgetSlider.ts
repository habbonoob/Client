import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BackgroundColorFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/backgroundcolor/BackgroundColorFurniWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class BackgroundColorWidgetSlider {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.backgroundcolor::BackgroundColorWidgetSlider'); }

    private static readonly _minValue: number = 0;
    private static readonly _maxValue: number = 255;

    declare private _widget: BackgroundColorFurniWidget;

    declare private _SafeStr_2940: IWindowContainer;

    declare private _parameter: string;

    declare private _SafeStr_3371: BitmapData;

    declare private _SafeStr_3365: BitmapData;

    declare private _referenceWidth: number;
    static { (this.prototype as any)._referenceWidth = 0; }

    declare private _SafeStr_6022: number;
    static { (this.prototype as any)._SafeStr_6022 = 0; }

    constructor(param1: BackgroundColorFurniWidget, param2: string, param3: IWindowContainer, param4: number = 0) {
        let _loc5_: BitmapDataAsset = null;
        this._widget = param1;
        this._parameter = param2;
        this._SafeStr_2940 = param3;
        _loc5_ = castTo(param1.assets.getAssetByName("dimmer_slider_base"), BitmapDataAsset);
        this._SafeStr_3371 = castTo(_loc5_.content, BitmapData);
        _loc5_ = castTo(param1.assets.getAssetByName("dimmer_slider_button"), BitmapDataAsset);
        this._SafeStr_3365 = castTo(_loc5_.content, BitmapData);
        this.displaySlider();
        this.setValue(param4);
    }

    public dispose(): void {
        this._widget = null;
        this._SafeStr_2940 = null;
        this._SafeStr_3371 = null;
        this._SafeStr_3365 = null;
    }

    public setValue(param1: number): void {
        if (this._SafeStr_2940 == null) {
            return;
        }
        let _loc2_: IWindow = this._SafeStr_2940.findChildByName("slider_button");
        if (_loc2_ != null) {
            _loc2_.x = this.getSliderPosition(param1);
        }
    }

    private getSliderPosition(param1: number): number {
        return this._referenceWidth * ((param1 - 0) / (255 - 0)) | 0;
    }

    private getValue(param1: number): number {
        return (param1 / this._referenceWidth * (255 - 0) | 0) + 0;
    }

    private buttonProcedure = (param1: WindowEvent, param2: IWindow): void => {
        this._widget.setParameterCallback(this._parameter, this.getValue(param2.x));
    };

    private displaySlider(): void {
        let _loc2_: IWindowContainer = null;
        let _loc1_: IBitmapWrapperWindow = null;
        if (this._SafeStr_2940 == null) {
            return;
        }
        _loc1_ = asGuarded(this._SafeStr_2940.findChildByName("slider_base"), isIBitmapWrapperWindow);
        if (_loc1_ != null && this._SafeStr_3371 != null) {
            _loc1_.bitmap = new BitmapData(this._SafeStr_3371.width, this._SafeStr_3371.height, true, 16777215);
            _loc1_.bitmap.copyPixels(this._SafeStr_3371, this._SafeStr_3371.rect, new Point(0, 0), null, null, true);
        }
        _loc2_ = asGuarded(this._SafeStr_2940.findChildByName("slider_movement_area"), isIWindowContainer);
        if (_loc2_ != null) {
            _loc1_ = asGuarded(_loc2_.findChildByName("slider_button"), isIBitmapWrapperWindow);
            if (_loc1_ != null && this._SafeStr_3365 != null) {
                _loc1_.bitmap = new BitmapData(this._SafeStr_3365.width, this._SafeStr_3365.height, true, 16777215);
                _loc1_.bitmap.copyPixels(this._SafeStr_3365, this._SafeStr_3365.rect, new Point(0, 0), null, null, true);
                _loc1_.procedure = this.buttonProcedure;
                this._referenceWidth = _loc2_.width - _loc1_.width;
            }
        }
    }
}
