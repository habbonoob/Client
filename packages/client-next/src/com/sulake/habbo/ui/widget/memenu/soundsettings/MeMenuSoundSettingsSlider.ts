import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuSoundSettingsItem } from '@/com/sulake/habbo/ui/widget/memenu/soundsettings/MeMenuSoundSettingsItem';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MeMenuSoundSettingsSlider {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu.soundsettings::MeMenuSoundSettingsSlider'); }

    declare private _SafeStr_4787: MeMenuSoundSettingsItem;

    declare private _SafeStr_2940: IWindowContainer;

    declare private _SafeStr_3371: BitmapData;

    declare private _SafeStr_3365: BitmapData;

    declare private _referenceWidth: number;
    static { (this.prototype as any)._referenceWidth = 0; }

    private _SafeStr_3464: number = 0;
    private _SafeStr_4059: number = 1;

    constructor(param1: MeMenuSoundSettingsItem, param2: IWindowContainer, param3: IAssetLibrary, param4: number = 0, param5: number = 1) {
        this._SafeStr_4787 = param1;
        this._SafeStr_2940 = param2;
        this._SafeStr_3464 = param4;
        this._SafeStr_4059 = param5;
        this.storeAssets(param3);
        this.displaySlider();
    }

    public dispose(): void {
        this._SafeStr_4787 = null;
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
        return this._referenceWidth * ((param1 - this._SafeStr_3464) / (this._SafeStr_4059 - this._SafeStr_3464)) | 0;
    }

    private getValue(param1: number): number {
        return param1 / this._referenceWidth * (this._SafeStr_4059 - this._SafeStr_3464) + this._SafeStr_3464;
    }

    private buttonProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_RELOCATED") {
            return;
        }
        this._SafeStr_4787.saveVolume(this.getValue(param2.x), false);
    };

    private displaySlider(): void {
        let _loc3_: IWindowContainer = null;
        let _loc1_: IWindowContainer = null;
        let _loc2_: IBitmapWrapperWindow = null;
        if (this._SafeStr_2940 == null) {
            return;
        }
        _loc2_ = asGuarded(this._SafeStr_2940.findChildByName("slider_base"), isIBitmapWrapperWindow);
        if (_loc2_ != null && this._SafeStr_3371 != null) {
            _loc2_.bitmap = new BitmapData(this._SafeStr_3371.width, this._SafeStr_3371.height, true, 16777215);
            _loc2_.bitmap.copyPixels(this._SafeStr_3371, this._SafeStr_3371.rect, new Point(0, 0), null, null, true);
        }
        _loc3_ = asGuarded(this._SafeStr_2940.findChildByName("slider_movement_area"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc1_ = asGuarded(_loc3_.findChildByName("slider_button"), isIWindowContainer);
            if (_loc1_ != null) {
                _loc2_ = asGuarded(_loc1_.findChildByName("slider_bitmap"), isIBitmapWrapperWindow);
                if (_loc2_ != null && this._SafeStr_3365 != null) {
                    _loc2_.bitmap = new BitmapData(this._SafeStr_3365.width, this._SafeStr_3365.height, true, 16777215);
                    _loc2_.bitmap.copyPixels(this._SafeStr_3365, this._SafeStr_3365.rect, new Point(0, 0), null, null, true);
                    _loc1_.procedure = this.buttonProcedure;
                    this._referenceWidth = _loc3_.width - _loc2_.width;
                }
            }
        }
    }

    private storeAssets(param1: IAssetLibrary): void {
        let _loc2_: BitmapDataAsset = null;
        if (param1 == null) {
            return;
        }
        _loc2_ = castTo(param1.getAssetByName("memenu_settings_slider_base"), BitmapDataAsset);
        this._SafeStr_3371 = castTo(_loc2_.content, BitmapData);
        _loc2_ = castTo(param1.getAssetByName("memenu_settings_slider_button"), BitmapDataAsset);
        this._SafeStr_3365 = castTo(_loc2_.content, BitmapData);
    }
}
