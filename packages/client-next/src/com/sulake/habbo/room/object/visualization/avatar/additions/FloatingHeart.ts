import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { ExpressionAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/ExpressionAddition';

export class FloatingHeart extends ExpressionAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::FloatingHeart'); }

    private static readonly DELAY_BEFORE_ANIMATION: number = 300;
    private static readonly STATE_DELAY: number = 0;
    private static readonly STATE_FADE_IN: number = 1;
    private static readonly STATE_FLOAT: number = 2;
    private static readonly STATE_COMPLETE: number = 3;

    declare private _asset: BitmapDataAsset;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    private _SafeStr_2472: number = 0;

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare private _scale: number;
    static { (this.prototype as any)._scale = NaN; }

    private _state: number = -1;

    constructor(param1: number, param2: number, param3: AvatarVisualization) {
        super(param1, param2, param3);
        this._startTime = getTimer();
        this._state = 0;
    }

    public override animate(param1: IRoomObjectSprite): boolean {
        let _loc3_: number = NaN;
        let _loc2_: number = 0;
        if (!param1) {
            return false;
        }
        if (this._asset) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
        }
        if (this._state == 0) {
            if (getTimer() - this._startTime < 300) {
                return false;
            }
            this._state = 1;
            param1.alpha = 0;
            param1.visible = true;
            this._SafeStr_2472 = 0;
            return true;
        }
        if (this._state == 1) {
            this._SafeStr_2472 += 0.1;
            param1.offsetY = this._offsetY;
            param1.alpha = Math.pow(this._SafeStr_2472, 0.9) * 255 | 0;
            if (this._SafeStr_2472 >= 1) {
                this._SafeStr_2472 = 0;
                param1.alpha = 255;
                this._state = 2;
            }
            return true;
        }
        if (this._state == 2) {
            _loc3_ = Math.pow(this._SafeStr_2472, 0.9);
            this._SafeStr_2472 += 0.05;
            _loc2_ = this._scale < 48 ? -30 : -40;
            param1.offsetY = this._offsetY + (this._SafeStr_2472 < 1 ? _loc3_ : 1) * _loc2_ | 0;
            param1.alpha = (1 - _loc3_) * 255 | 0;
            if (param1.alpha <= 0) {
                param1.visible = false;
                this._state = 3;
            }
            return true;
        }
        return false;
    }

    public override update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = 0;
        let _loc5_: number = NaN;
        if (!param1) {
            return;
        }
        this._scale = param2;
        let _loc4_: number = 64;
        if (param2 < 48) {
            this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset("user_blowkiss_small_png"), BitmapDataAsset);
            if (this._avatar.angle == 90 || this._avatar.angle == 270) {
                _loc3_ = 0;
            } else if (this._avatar.angle == 135 || this._avatar.angle == 180 || this._avatar.angle == 225) {
                _loc3_ = 6;
            } else {
                _loc3_ = -6;
            }
            this._offsetY = -38;
            _loc4_ = 32;
        } else {
            this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset("user_blowkiss_png"), BitmapDataAsset);
            if (this._avatar.angle == 90 || this._avatar.angle == 270) {
                _loc3_ = -3;
            } else if (this._avatar.angle == 135 || this._avatar.angle == 180 || this._avatar.angle == 225) {
                _loc3_ = 22;
            } else {
                _loc3_ = -30;
            }
            this._offsetY = -70;
        }
        if (this._avatar.posture == "sit") {
            this._offsetY = this._offsetY + _loc4_ / 2 | 0;
        } else if (this._avatar.posture == "lay") {
            this._offsetY += _loc4_;
        }
        if (this._asset != null) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
            param1.offsetX = _loc3_;
            param1.offsetY = this._offsetY;
            param1.relativeDepth = -0.02;
            param1.alpha = 0;
            _loc5_ = this._SafeStr_2472;
            this.animate(param1);
            this._SafeStr_2472 = _loc5_;
        }
    }
}
