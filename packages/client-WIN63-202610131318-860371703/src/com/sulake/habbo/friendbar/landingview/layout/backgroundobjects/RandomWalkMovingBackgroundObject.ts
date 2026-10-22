import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { BackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/BackgroundObject';
import { PathResetEvent } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/events/PathResetEvent';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

export class RandomWalkMovingBackgroundObject extends BackgroundObject {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects::RandomWalkMovingBackgroundObject'); }

    declare private _SafeStr_5559: number;
    static { (this.prototype as any)._SafeStr_5559 = 0; }

    declare private _SafeStr_5579: number;
    static { (this.prototype as any)._SafeStr_5579 = 0; }

    declare private _randomX: number;
    static { (this.prototype as any)._randomX = NaN; }

    declare private _randomY: number;
    static { (this.prototype as any)._randomY = NaN; }

    declare private _SafeStr_4408: number;
    static { (this.prototype as any)._SafeStr_4408 = NaN; }

    declare private _SafeStr_4630: number;
    static { (this.prototype as any)._SafeStr_4630 = NaN; }

    declare private _SafeStr_5905: number;
    static { (this.prototype as any)._SafeStr_5905 = NaN; }

    private _SafeStr_2458: number = 0;

    declare private _SafeStr_3600: number;
    static { (this.prototype as any)._SafeStr_3600 = NaN; }

    declare private _SafeStr_3586: number;
    static { (this.prototype as any)._SafeStr_3586 = NaN; }

    private _SafeStr_5604: number = 0;
    private _SafeStr_5848: number = 0;
    private _SafeStr_7028: number = 0;
    private _SafeStr_6049: number = 0;

    declare private _SafeStr_5830: number;
    static { (this.prototype as any)._SafeStr_5830 = 0; }

    constructor(param1: number, param2: IWindowContainer, param3: EventDispatcher, param4: HabboLandingView, param5: string) {
        super(param1, param2, param3, param4, param5, false);
        let _loc7_: any[] = param5.split(";");
        let _loc6_: string = stringOrNull(_loc7_[0]);
        this._SafeStr_5559 = _loc7_[2] | 0;
        this._SafeStr_5579 = _loc7_[3] | 0;
        this._SafeStr_4408 = Number(_loc7_[4]);
        this._SafeStr_4630 = Number(_loc7_[5]);
        this._randomX = Number(_loc7_[6]);
        this._randomY = Number(_loc7_[7]);
        this._SafeStr_5905 = _loc7_[8] | 0;
        this._SafeStr_3600 = this._SafeStr_5559;
        this._SafeStr_3586 = this._SafeStr_5579;
        this.sprite.assetUri = "${image.library.url}" + _loc6_ + ".png";
    }

    public override update(param1: number): void {
        super.update(param1);
        if (!this.sprite) {
            return;
        }
        this._SafeStr_2458 += param1;
        if (this._SafeStr_2458 - this._SafeStr_5830 > this._SafeStr_5905) {
            this._SafeStr_7028 = this._SafeStr_5604;
            this._SafeStr_6049 = this._SafeStr_5848;
            this._SafeStr_5604 = (Math.random() * 2 - 1) * this._randomX;
            this._SafeStr_5848 = (Math.random() * 2 - 1) * this._randomY;
            this._SafeStr_5830 = this._SafeStr_2458;
        }
        let _loc4_: number = this.window.width;
        let _loc2_: number = this.window.height;
        let _loc3_: number = (this._SafeStr_2458 - this._SafeStr_5830) / this._SafeStr_5905;
        this._SafeStr_3600 += param1 / 1000 * (this._SafeStr_4408 + MathUtils.lerp(_loc3_, this._SafeStr_7028, this._SafeStr_5604));
        this._SafeStr_3586 += param1 / 1000 * (this._SafeStr_4630 + MathUtils.lerp(_loc3_, this._SafeStr_6049, this._SafeStr_5848));
        this.sprite.x = this._SafeStr_3600 | 0;
        this.sprite.y = this._SafeStr_3586 | 0;
        if (this._SafeStr_4408 > 0 && this.sprite.x > _loc4_ || this._SafeStr_4408 < 0 && this.sprite.x + this.sprite.width < 0 || this._SafeStr_4630 > 0 && this.sprite.y > _loc2_ || this._SafeStr_4630 < 0 && this.sprite.y + this.sprite.height < 0) {
            this._SafeStr_3600 = this._SafeStr_5559;
            this._SafeStr_3586 = this._SafeStr_5579;
            this.events.dispatchEvent(new PathResetEvent("LWMOPRE_MOVING_OBJECT_PATH_RESET", this.id));
        }
    }
}
