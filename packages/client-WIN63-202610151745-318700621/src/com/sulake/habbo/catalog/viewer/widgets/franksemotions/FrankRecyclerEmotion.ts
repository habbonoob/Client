import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class FrankRecyclerEmotion {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.franksemotions::FrankRecyclerEmotion'); }

    private static _SafeStr_5512: any[] = [];

    declare private _bitmap: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2458: Timer;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    declare private _SafeStr_5579: number;
    static { (this.prototype as any)._SafeStr_5579 = NaN; }

    declare private _SafeStr_6904: number;
    static { (this.prototype as any)._SafeStr_6904 = NaN; }

    constructor(param1: IStaticBitmapWrapperWindow) {
        if (FrankRecyclerEmotion._SafeStr_5512.length > 0) {
            this._bitmap = asGuarded(FrankRecyclerEmotion._SafeStr_5512.pop(), isIStaticBitmapWrapperWindow);
            this._bitmap.y = param1.y;
        } else {
            this._bitmap = asGuarded(param1.clone(), isIStaticBitmapWrapperWindow);
        }
        let _loc3_: any[] = ["franks_emotions_blush", "franks_emotions_heart"];
        let _loc4_: number = Math.floor(Math.random() * _loc3_.length) | 0;
        let _loc2_: string = stringOrNull(_loc3_[_loc4_]);
        this._bitmap.assetUri = _loc2_;
        this._bitmap.x += Math.floor(Math.random() * 70) - 20;
        this._SafeStr_6904 = -(Math.random() * 80 + 30);
        this._bitmap.blend = 0;
    }

    public start(param1: IWindowContainer): void {
        param1.addChild(this._bitmap);
        this._startTime = getTimer();
        this._SafeStr_5579 = this._bitmap.y;
        this._SafeStr_2458 = new Timer(16.666666666666668);
        this._SafeStr_2458.addEventListener("timer", this.onTick);
        this._SafeStr_2458.start();
    }

    private onTick = (param1: TimerEvent): void => {
        if (this._bitmap.disposed) {
            this._SafeStr_2458.stop();
            this._SafeStr_2458.removeEventListener("timer", this.onTick);
            this._SafeStr_2458 = null;
            this._bitmap = null;
        }
        let _loc2_: number = (getTimer() - this._startTime) / 1000;
        let _loc3_: number = Number(Math.min(1, _loc2_ * 1.25));
        if (_loc3_ > this._bitmap.blend + 0.1 || this._bitmap.blend < 1 && _loc3_ == 1) {
            this._bitmap.blend = _loc3_;
        }
        this._bitmap.y = this._SafeStr_5579 + this._SafeStr_6904 * _loc2_ | 0;
        if (this._bitmap.y < -50) {
            this._SafeStr_2458.stop();
            this._SafeStr_2458.removeEventListener("timer", this.onTick);
            this._SafeStr_2458 = null;
            if (this._bitmap.parent) {
                this._bitmap.parent = null;
            }
            FrankRecyclerEmotion._SafeStr_5512.push(this._bitmap);
        }
    };
}
