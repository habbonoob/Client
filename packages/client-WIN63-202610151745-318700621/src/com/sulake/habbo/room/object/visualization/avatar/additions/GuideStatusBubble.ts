import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GuideStatusBubble implements IAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::GuideStatusBubble'); }

    private _id: number = -1;

    declare private _asset: BitmapDataAsset;

    declare private _avatar: AvatarVisualization;

    private _relativeDepth: number = 0;

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    constructor(param1: number, param2: AvatarVisualization, param3: number) {
        this._id = param1;
        this._avatar = param2;
        this._status = param3;
    }

    public set relativeDepth(param1: number) {
        this._relativeDepth = param1;
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

    public animate(param1: IRoomObjectSprite): boolean {
        if (this._asset && param1) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
        }
        return false;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (!param1) {
            return;
        }
        param1.visible = true;
        param1.relativeDepth = this._relativeDepth;
        param1.alpha = 255;
        let _loc5_: number = 64;
        let _loc6_: string = this._status == 1 ? "user_guide_bubble_png" : "user_guide_requester_bubble_png";
        if (param2 < 48) {
            this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(_loc6_), BitmapDataAsset);
            _loc3_ = -19;
            _loc4_ = -80;
            _loc5_ = 32;
        } else {
            this._asset = asInstanceOf(this._avatar.getAvatarRendererAsset(_loc6_), BitmapDataAsset);
            _loc3_ = -19;
            _loc4_ = -120;
        }
        if (this._avatar.posture == "sit") {
            _loc4_ = _loc4_ + _loc5_ / 2 | 0;
        } else if (this._avatar.posture == "lay") {
            _loc4_ += _loc5_;
        }
        if (this._asset != null) {
            param1.asset = asInstanceOf(this._asset.content, BitmapData);
            param1.offsetX = _loc3_;
            param1.offsetY = _loc4_;
            param1.relativeDepth = -0.02;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
