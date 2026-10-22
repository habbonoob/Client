import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class SliderWindowControllerNew extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common::SliderWindowControllerNew'); }

    private _SafeStr_3673: number = 0;

    declare private _SafeStr_2940: IWindowContainer;

    private _SafeStr_3253: boolean = false;
    private _SafeStr_3464: number = 0;
    private _SafeStr_4059: number = 1;
    private _SafeStr_3417: number = 0;

    constructor(param1: IWindowContainer, param2: number = 0, param3: number = 1, param4: number = 0) {
        super();
        this._SafeStr_2940 = param1;
        this._SafeStr_3464 = param2;
        this._SafeStr_4059 = param3;
        this._SafeStr_3417 = param4;
        this._SafeStr_3673 = 0;
        this.sliderButton.procedure = this.sliderProcedure;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2940.dispose();
        this._SafeStr_2940 = null;
    }

    public setValue(param1: number, param2: boolean = true, param3: boolean = true): void {
        param1 = Math.max(this._SafeStr_3464, param1);
        param1 = Math.min(this._SafeStr_4059, param1);
        this._SafeStr_3673 = param1;
        if (param2) {
            this.updateSliderPosition();
        }
        if (param3) {
            this.dispatchEvent(new Event("change"));
        }
    }

    public getValue(): number {
        return this._SafeStr_3673;
    }

    public set min(param1: number) {
        this._SafeStr_3464 = param1;
    }

    public set max(param1: number) {
        this._SafeStr_4059 = param1;
    }

    private updateSliderPosition(): void {
        if (this._SafeStr_2940 == null) {
            return;
        }
        let _loc1_: IWindow = this._SafeStr_2940.findChildByName("slider_button");
        if (_loc1_ != null) {
            _loc1_.x = this.getSliderPosition(this._SafeStr_3673);
        }
        _loc1_.parent.invalidate();
    }

    private getSliderPosition(param1: number): number {
        return this.referenceWidth * ((param1 - this._SafeStr_3464) / (this._SafeStr_4059 - this._SafeStr_3464)) | 0;
    }

    private getValueAtPosition(param1: number): number {
        return param1 / this.referenceWidth * (this._SafeStr_4059 - this._SafeStr_3464) + this._SafeStr_3464;
    }

    private sliderProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: number = NaN;
        let _loc3_: number = NaN;
        if (param1.type == "WME_DOWN") {
            this._SafeStr_3253 = true;
        }
        if (this._SafeStr_3253) {
            if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
                this._SafeStr_3253 = false;
            }
        }
        if (!this._SafeStr_3253 || param1.type != "WE_RELOCATED") {
            return;
        }
        if (this._SafeStr_3417 != 0) {
            _loc4_ = this.getValueAtPosition(param2.x);
            _loc3_ = Math.round(_loc4_ / this._SafeStr_3417) * this._SafeStr_3417;
            this.setValue(_loc3_, false);
        }
    };

    public moveSliderToRight = (): void => {
        let _loc1_: number = NaN;
        this._SafeStr_3253 = false;
        if (this._SafeStr_3417 != 0) {
            _loc1_ = this._SafeStr_3673 + this._SafeStr_3417;
            this.setValue(_loc1_);
        }
    };

    public moveSliderToLeft = (): void => {
        let _loc1_: number = NaN;
        this._SafeStr_3253 = false;
        if (this._SafeStr_3417 != 0) {
            _loc1_ = this._SafeStr_3673 - this._SafeStr_3417;
            this.setValue(_loc1_);
        }
    };

    private get referenceWidth(): number {
        return this.sliderMovementArea.width - this.sliderButton.width;
    }

    private get sliderBase(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2940.findChildByName("slider_base"), isIStaticBitmapWrapperWindow);
    }

    private get sliderMovementArea(): IWindowContainer {
        return asGuarded(this._SafeStr_2940.findChildByName("slider_movement_area"), isIWindowContainer);
    }

    private get sliderButton(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2940.findChildByName("slider_button"), isIStaticBitmapWrapperWindow);
    }
}
