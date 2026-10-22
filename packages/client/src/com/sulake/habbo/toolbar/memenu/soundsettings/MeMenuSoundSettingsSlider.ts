import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MeMenuSoundSettingsSlider {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu.soundsettings::MeMenuSoundSettingsSlider'); }

    constructor(param1: any, param2: IWindowContainer, param3: IAssetLibrary, param4: number = 0, param5: number = 1) {
        this._SafeStr_4787 = param1;
        this._SafeStr_2940 = param2;
        this._SafeStr_3464 = param4;
        this._SafeStr_4059 = param5;
        this.displaySlider();
    }

    declare private _SafeStr_4787: any;

    declare private _SafeStr_2940: IWindowContainer;

    declare private _referenceWidth: number;
    static { (this.prototype as any)._referenceWidth = 0; }

    private _SafeStr_3464: number = 0;
    private _SafeStr_4059: number = 1;

    public dispose(): void {
        this._SafeStr_4787 = null;
        this._SafeStr_2940 = null;
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
        let _loc2_: IWindowContainer = null;
        let _loc1_: IWindowContainer = null;
        if (this._SafeStr_2940 == null) {
            return;
        }
        _loc2_ = asGuarded(this._SafeStr_2940.findChildByName("slider_movement_area"), isIWindowContainer);
        if (_loc2_ != null) {
            _loc1_ = asGuarded(_loc2_.findChildByName("slider_button"), isIWindowContainer);
            if (_loc1_ != null) {
                _loc1_.procedure = this.buttonProcedure;
                this._referenceWidth = _loc2_.width - _loc1_.width;
            }
        }
    }
}
