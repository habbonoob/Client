import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { PathResetEvent } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/events/PathResetEvent';
import type { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { BackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/BackgroundObject';

export class StaticAnimatedBackgroundObject extends BackgroundObject {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects::StaticAnimatedBackgroundObject'); }

    private _SafeStr_4602: number = 0;

    declare private _imageBaseUri: string;

    declare private _frameCount: number;
    static { (this.prototype as any)._frameCount = 0; }

    declare private _fps: number;
    static { (this.prototype as any)._fps = 0; }

    declare private _SafeStr_3600: number;
    static { (this.prototype as any)._SafeStr_3600 = 0; }

    declare private _SafeStr_3586: number;
    static { (this.prototype as any)._SafeStr_3586 = 0; }

    declare private _SafeStr_5740: any[];

    private _SafeStr_7222: number = 0;

    constructor(param1: number, param2: IWindowContainer, param3: EventDispatcher, param4: HabboLandingView, param5: string) {
        super(param1, param2, param3, param4, param5);
        let _loc6_: any[] = param5.split(";");
        this._imageBaseUri = "${image.library.url}reception/" + _loc6_[0];
        this._frameCount = _loc6_[2] | 0;
        this._fps = _loc6_[3] | 0;
        this._SafeStr_3600 = _loc6_[4] | 0;
        this._SafeStr_3586 = _loc6_[5] | 0;
        this._SafeStr_5740 = String(_loc6_[6]).split(",");
        param3.addEventListener("LWMOPRE_MOVING_OBJECT_PATH_RESET", this.onPathResetEvent);
        this.sprite.x = this._SafeStr_3600;
        this.sprite.y = this._SafeStr_3586;
    }

    public override dispose(): void {
        this.events.removeEventListener("LWMOPRE_MOVING_OBJECT_PATH_RESET", this.onPathResetEvent);
        super.dispose();
    }

    public override update(param1: number): void {
        super.update(param1);
        let _loc4_: number = 1000 / this._fps | 0;
        let _loc2_: number = this._SafeStr_4602 - this._SafeStr_7222 >>> 0;
        let _loc3_: number = this._frameCount - 1;
        if (this._SafeStr_5740.length > 0) {
            if (_loc2_ < this._frameCount * _loc4_) {
                _loc3_ = _loc2_ / _loc4_ | 0;
            }
        } else {
            _loc3_ = this._SafeStr_4602 % _loc4_;
        }
        this.sprite.assetUri = this._imageBaseUri + (_loc3_ + 1) + ".png";
        this._SafeStr_4602 += param1;
    }

    private onPathResetEvent = (param1: PathResetEvent): void => {
        if (this._SafeStr_5740.indexOf(param1.objectId.toString()) != -1) {
            this._SafeStr_7222 = this._SafeStr_4602;
        }
    };
}
