import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WaitIndicator extends Sprite implements IDisposable {
    static { registerClassName(this, 'onBoardingHcUi::WaitIndicator'); }

    private static readonly DOT_COUNT: number = 8;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    constructor(param1: number) {
        let _loc4_: number = 0;
        let _loc5_: Bitmap = null;
        let _loc6_: number = NaN;
        super();
        this._style = param1;
        let _loc3_: number = 4294967295;
        let _loc2_: BitmapData = new BitmapData(4, 4, true, 0);
        _loc2_.setVector(new Rectangle(0, 0, 4, 4), [0, _loc3_ >>> 0, _loc3_ >>> 0, 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, _loc3_ >>> 0, 0, _loc3_ >>> 0, _loc3_ >>> 0, 0]);
        _loc4_ = 0;
        while (_loc4_ < 8) {
            _loc5_ = new Bitmap(_loc2_);
            this.addChild(_loc5_);
            _loc6_ = param1 == 1 ? 12 : 8;
            _loc5_.x = (_loc6_ * Math.sin(_loc4_ * 3.141592653589793 * 2 / 8) | 0) - 3;
            _loc5_.y = (_loc6_ * Math.cos(_loc4_ * 3.141592653589793 * 2 / 8) | 0) - 3;
            _loc4_++;
        }
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    private circleShade(param1: number): ColorTransform {
        let _loc2_: number = param1 / 8 - getTimer() * 0.001;
        _loc2_ -= Math.floor(_loc2_);
        _loc2_ = this._style == 1 ? 48 + 192 * _loc2_ / 255 : _loc2_;
        return this._style == 1 ? new ColorTransform(_loc2_, _loc2_, _loc2_) : new ColorTransform(1, 1, 1, _loc2_);
    }

    private onAddedToStage = (param1: Event): void => {
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this.stage.addEventListener("enterFrame", this.onEnterFrame);
    };

    private onEnterFrame = (param1: Event): void => {
        let _loc2_: number = 0;
        this.graphics.clear();
        _loc2_ = 0;
        while (_loc2_ < 8) {
            this.getChildAt(_loc2_).transform.colorTransform = this.circleShade(_loc2_);
            _loc2_++;
        }
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this.stage != null) {
            this.stage.removeEventListener("enterFrame", this.onEnterFrame);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
