import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { BackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/BackgroundObject';
import { PathResetEvent } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/events/PathResetEvent';

export class SpiralMovingBackgroundObject extends BackgroundObject {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects::SpiralMovingBackgroundObject'); }

    declare private _startRadius: number;
    static { (this.prototype as any)._startRadius = 0; }

    declare private _SafeStr_7004: number;
    static { (this.prototype as any)._SafeStr_7004 = 0; }

    declare private _posRadius: number;
    static { (this.prototype as any)._posRadius = NaN; }

    declare private _SafeStr_2755: number;
    static { (this.prototype as any)._SafeStr_2755 = NaN; }

    declare private _speedRadius: number;
    static { (this.prototype as any)._speedRadius = NaN; }

    declare private _SafeStr_6219: number;
    static { (this.prototype as any)._SafeStr_6219 = NaN; }

    declare private _SafeStr_6000: number;
    static { (this.prototype as any)._SafeStr_6000 = NaN; }

    declare private _SafeStr_6485: number;
    static { (this.prototype as any)._SafeStr_6485 = NaN; }

    constructor(param1: number, param2: IWindowContainer, param3: EventDispatcher, param4: HabboLandingView, param5: string) {
        super(param1, param2, param3, param4, param5);
        let _loc7_: any[] = param5.split(";");
        let _loc6_: string = stringOrNull(_loc7_[0]);
        this._startRadius = _loc7_[2] | 0;
        this._SafeStr_7004 = _loc7_[3] | 0;
        this._speedRadius = Number(_loc7_[4]);
        this._SafeStr_6219 = Number(_loc7_[5]);
        this._SafeStr_6000 = Number(_loc7_[6]);
        this._SafeStr_6485 = Number(_loc7_[7]);
        this._posRadius = this._startRadius;
        this._SafeStr_2755 = this._SafeStr_7004;
        this.sprite.assetUri = "${image.library.url}reception/" + _loc6_ + ".png";
    }

    public override update(param1: number): void {
        super.update(param1);
        let _loc2_: number = this._startRadius / this._posRadius;
        let _loc3_: number = 1 + this._startRadius / this._posRadius / 8;
        this._posRadius += param1 * this._speedRadius;
        this._SafeStr_2755 += param1 * this._SafeStr_6219 * _loc2_;
        if (this.sprite.bitmapData) {
            if (this._posRadius <= 0) {
                this._posRadius = this._startRadius;
                this.sprite.width = this.sprite.bitmapData.width;
                this.sprite.height = this.sprite.bitmapData.height;
                this.events.dispatchEvent(new PathResetEvent("LWMOPRE_MOVING_OBJECT_PATH_RESET", this.id));
            }
        }
        if (this._posRadius > this._startRadius) {
            this._posRadius = 0;
            this.sprite.width = 0;
            this.sprite.height = 0;
            this.events.dispatchEvent(new PathResetEvent("LWMOPRE_MOVING_OBJECT_PATH_RESET", this.id));
        }
        if (this._SafeStr_2755 < 0) {
            this._SafeStr_2755 = 3.141592653589793 * 2;
        }
        if (this._SafeStr_2755 > 3.141592653589793 * 2) {
            this._SafeStr_2755 = 0;
        }
        this.sprite.x = this._SafeStr_6000 + Math.sin(this._SafeStr_2755) * this._posRadius | 0;
        this.sprite.y = this._SafeStr_6485 + Math.cos(this._SafeStr_2755) * this._posRadius | 0;
        if (this.sprite.bitmapData) {
            this.sprite.pivotPoint = 4;
            this.sprite.stretchedX = true;
            this.sprite.stretchedY = true;
            this.sprite.width = this.sprite.bitmapData.width / _loc3_ | 0;
            this.sprite.height = this.sprite.bitmapData.height / _loc3_ | 0;
        }
    }
}
