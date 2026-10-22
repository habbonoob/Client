import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { AnimationFrame } from '@/com/sulake/habbo/avatar/structure/animation/AnimationFrame';
import { Logger } from '@/com/sulake/habbo/Logger';

export class AvatarImagePartContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarImagePartContainer'); }

    declare private _SafeStr_5917: string;

    declare private _partType: string;

    declare private _SafeStr_6557: string;

    declare private _partId: string;

    declare private _color: IPartColor;

    declare private _frames: any[];

    declare private _action: IActionDefinition;

    declare private _isColorable: boolean;
    static { (this.prototype as any)._isColorable = false; }

    declare private _SafeStr_5981: boolean;
    static { (this.prototype as any)._SafeStr_5981 = false; }

    declare private _SafeStr_6983: ColorTransform;

    declare private _SafeStr_6580: number;
    static { (this.prototype as any)._SafeStr_6580 = 0; }

    constructor(param1: string, param2: string, param3: string, param4: IPartColor, param5: any[], param6: IActionDefinition, param7: boolean, param8: number, param9: string = "", param10: boolean = false, param11: number = 1) {
        this._SafeStr_5917 = param1;
        this._partType = param2;
        this._partId = param3;
        this._color = param4;
        this._frames = param5;
        this._action = param6;
        this._isColorable = param7;
        this._SafeStr_6580 = param8;
        this._SafeStr_6557 = param9;
        this._SafeStr_5981 = param10;
        this._SafeStr_6983 = new ColorTransform(1, 1, 1, param11);
        if (this._frames == null) {
            Logger.log("Null frame list");
        }
        if (this._partType == "ey") {
            this._isColorable = false;
        }
    }

    public getFrameIndex(param1: number): number {
        let _loc3_: AnimationFrame = null;
        if (!this._frames || this._frames.length == 0) {
            return 0;
        }
        let _loc2_: number = param1 % this._frames.length;
        if (this._frames[_loc2_] instanceof AnimationFrame) {
            _loc3_ = this._frames[_loc2_];
            return _loc3_.number;
        }
        return _loc2_;
    }

    public getFrameDefinition(param1: number): AnimationFrame {
        let _loc2_: number = param1 % this._frames.length;
        if (this._frames && this._frames.length > _loc2_) {
            if (this._frames[_loc2_] instanceof AnimationFrame) {
                return asInstanceOf(this._frames[_loc2_], AnimationFrame);
            }
        }
        return null;
    }

    public getCacheableKey(param1: number): string {
        let _loc3_: AnimationFrame = null;
        let _loc2_: number = param1 % this._frames.length;
        if (this._frames && this._frames.length > _loc2_) {
            if (this._frames[_loc2_] instanceof AnimationFrame) {
                _loc3_ = asInstanceOf(this._frames[_loc2_], AnimationFrame);
                return this.partId + ":" + _loc3_.assetPartDefinition + ":" + _loc3_.number;
            }
        }
        return this.partId + ":" + _loc2_;
    }

    public get bodyPartId(): string {
        return this._SafeStr_5917;
    }

    public get partType(): string {
        return this._partType;
    }

    public get partId(): string {
        return this._partId;
    }

    public get color(): IPartColor {
        return this._color;
    }

    public get action(): IActionDefinition {
        return this._action;
    }

    public set isColorable(param1: boolean) {
        this._isColorable = param1;
    }

    public get isColorable(): boolean {
        return this._isColorable;
    }

    public get paletteMapId(): number {
        return this._SafeStr_6580;
    }

    public get flippedPartType(): string {
        return this._SafeStr_6557;
    }

    public get isBlendable(): boolean {
        return this._SafeStr_5981;
    }

    public get blendTransform(): ColorTransform {
        return this._SafeStr_6983;
    }

    public toString(): string {
        return [this._SafeStr_5917, this._partType, this._partId].join(":");
    }
}
