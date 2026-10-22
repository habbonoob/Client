import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class FloatingIdleZ implements IAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::FloatingIdleZ'); }

    private static readonly DELAY_BEFORE_ANIMATION: number = 2000;
    private static readonly DELAY_PER_FRAME: number = 2000;
    private static readonly STATE_DELAY: number = 0;
    private static readonly STATE_FRAME_A: number = 1;
    private static readonly STATE_FRAME_B: number = 2;

    constructor(param1: number, param2: AvatarVisualization) {
        this._id = param1;
        this._avatar = param2;
        this._startTime = getTimer();
        this._state = 0;
    }

    declare protected _id: number;
    static { (this.prototype as any)._id = 0; }

    declare protected _avatar: AvatarVisualization;

    declare private _asset: BitmapDataAsset;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare private _scale: number;
    static { (this.prototype as any)._scale = NaN; }

    private _state: number = -1;

    public get id(): number {
        return this._id;
    }

    public get disposed(): boolean {
        return this._avatar == null;
    }

    public dispose(): void {
        this._avatar = null;
        this._asset = null;
    }

    public animate(param1: IRoomObjectSprite): boolean {
        if (!param1) {
            return false;
        }
        if (this._state == 0) {
            if (getTimer() - this._startTime >= 2000) {
                this._state = 1;
                this._startTime = getTimer();
                this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(this.getAssetNameForFrame(1)), BitmapDataAsset);
            }
        }
        if (this._state == 1) {
            if (getTimer() - this._startTime >= 2000) {
                this._state = 2;
                this._startTime = getTimer();
                this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(this.getAssetNameForFrame(2)), BitmapDataAsset);
            }
        }
        if (this._state == 2) {
            if (getTimer() - this._startTime >= 2000) {
                this._state = 1;
                this._startTime = getTimer();
                this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(this.getAssetNameForFrame(1)), BitmapDataAsset);
            }
        }
        if (this._asset) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
            param1.alpha = 255;
            param1.visible = true;
        } else {
            param1.visible = false;
        }
        return false;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = 0;
        if (!param1) {
            return;
        }
        this._scale = param2;
        this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(this.getAssetNameForFrame(this._state == 1 ? 1 : 2)), BitmapDataAsset);
        let _loc4_: number = 64;
        if (param2 < 48) {
            if (this._avatar.angle == 135 || this._avatar.angle == 180 || this._avatar.angle == 225 || this._avatar.angle == 270) {
                _loc3_ = 10;
            } else {
                _loc3_ = -16;
            }
            this._offsetY = -38;
            _loc4_ = 32;
        } else {
            if (this._avatar.angle == 135 || this._avatar.angle == 180 || this._avatar.angle == 225 || this._avatar.angle == 270) {
                _loc3_ = 22;
            } else {
                _loc3_ = -30;
            }
            this._offsetY = -70;
        }
        if (this._avatar.posture == "sit") {
            this._offsetY = this._offsetY + _loc4_ / 2 | 0;
        } else if (this._avatar.posture == "lay") {
            this._offsetY = this._offsetY + (_loc4_ - 0.3 * _loc4_) | 0;
        }
        if (this._asset != null) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
            param1.offsetX = _loc3_;
            param1.offsetY = this._offsetY;
            param1.relativeDepth = -0.02;
            param1.alpha = 0;
        }
    }

    protected getAssetNameForFrame(param1: number): string {
        let _loc2_: string = "left";
        if (this._avatar.angle == 135 || this._avatar.angle == 180 || this._avatar.angle == 225 || this._avatar.angle == 270) {
            _loc2_ = "right";
        }
        return "user_idle_" + _loc2_ + "_" + param1 + (this._scale < 48 ? "_small" : "") + "_png";
    }

    get [IDisposable](): true {
        return true;
    }
}
