import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class NumberBubble implements IAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::NumberBubble'); }

    private _id: number = -1;

    declare private _avatar: AvatarVisualization;

    declare private _asset: BitmapDataAsset;

    declare private _scale: number;
    static { (this.prototype as any)._scale = NaN; }

    private _number: number = 0;
    private _SafeStr_3074: number = 0;
    private _SafeStr_5477: boolean = false;
    private _SafeStr_4109: number = 0;

    constructor(param1: number, param2: number, param3: AvatarVisualization) {
        this._id = param1;
        this._number = param2;
        this._avatar = param3;
    }

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

    public update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (!param1) {
            return;
        }
        this._scale = param2;
        if (this._number > 0) {
            _loc5_ = 64;
            if (param2 < 48) {
                this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset("number_" + this._number + "_small_png"), BitmapDataAsset);
                _loc3_ = -6;
                _loc4_ = -52;
                _loc5_ = 32;
            } else {
                this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset("number_" + this._number + "_png"), BitmapDataAsset);
                _loc3_ = -8;
                _loc4_ = -105;
            }
            if (this._avatar.posture == "sit") {
                _loc4_ = _loc4_ + _loc5_ / 2 | 0;
            } else if (this._avatar.posture == "lay") {
                _loc4_ += _loc5_;
            }
            if (this._asset != null) {
                param1.visible = true;
                param1.asset = asInstanceOf(this._asset.content, BitmapData);
                param1.offsetX = _loc3_;
                param1.offsetY = _loc4_;
                param1.relativeDepth = -0.01;
                this._SafeStr_3074 = 1;
                this._SafeStr_5477 = true;
                this._SafeStr_4109 = 0;
                param1.alpha = 0;
            } else {
                param1.visible = false;
            }
        } else if (param1.visible) {
            this._SafeStr_3074 = -1;
        }
    }

    public animate(param1: IRoomObjectSprite): boolean {
        let _loc2_: number = 0;
        if (!param1) {
            return false;
        }
        if (this._asset) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
        }
        let _loc3_: number = param1.alpha;
        let _loc4_: boolean = false;
        if (this._SafeStr_5477) {
            this._SafeStr_4109 = this._SafeStr_4109 + 1;
            if (this._SafeStr_4109 < 10) {
                return false;
            }
            if (this._SafeStr_3074 < 0) {
                if (this._scale < 48) {
                    param1.offsetY -= 2;
                } else {
                    param1.offsetY -= 4;
                }
            } else {
                _loc2_ = 4;
                if (this._scale < 48) {
                    _loc2_ = 8;
                }
                if (this._SafeStr_4109 % _loc2_ == 0) {
                    param1.offsetY -= 1;
                    _loc4_ = true;
                }
            }
        }
        if (this._SafeStr_3074 > 0) {
            if (_loc3_ < 255) {
                _loc3_ += 32;
            }
            if (_loc3_ >= 255) {
                _loc3_ = 255;
                this._SafeStr_3074 = 0;
            }
            param1.alpha = _loc3_;
            return true;
        }
        if (this._SafeStr_3074 < 0) {
            if (_loc3_ >= 0) {
                _loc3_ -= 32;
            }
            if (_loc3_ <= 0) {
                this._SafeStr_3074 = 0;
                this._SafeStr_5477 = false;
                _loc3_ = 0;
                param1.visible = false;
            }
            param1.alpha = _loc3_;
            return true;
        }
        return _loc4_;
    }

    get [IDisposable](): true {
        return true;
    }
}
