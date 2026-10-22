import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ActiveActionData } from '@/com/sulake/habbo/avatar/actions/ActiveActionData';

export class AnimationLayerData implements IAnimationLayerData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::AnimationLayerData'); }

    public static readonly _SafeStr_8027: string = "bodypart";
    public static readonly _SafeStr_8625: string = "fx";

    constructor(param1: XML, param2: string, param3: IActionDefinition) {
        this._id = String(param1.attribute("id"));
        this._animationFrame = parseInt(param1.attribute("frame").toString()) | 0;
        this._dx = parseInt(param1.attribute("dx").toString()) | 0;
        this._dy = parseInt(param1.attribute("dy").toString()) | 0;
        this._dz = parseInt(param1.attribute("dz").toString()) | 0;
        this._directionOffset = parseInt(param1.attribute("dd").toString()) | 0;
        this._type = param2;
        this._base = String(param1.attribute("base"));
        for (const _loc5_ of param1.child("item") ?? []) {
            this._items[String(_loc5_.attribute("id"))] = String(_loc5_.attribute("base"));
        }
        let _loc4_: string = "";
        if (this._base != "") {
            _loc4_ = String(this.baseAsInt());
        }
        if (param3 != null) {
            this._action = new ActiveActionData(param3.state, this.base);
            this._action.definition = param3;
        }
    }

    declare private _id: string;

    declare private _dx: number;
    static { (this.prototype as any)._dx = 0; }

    declare private _dy: number;
    static { (this.prototype as any)._dy = 0; }

    declare private _dz: number;
    static { (this.prototype as any)._dz = 0; }

    declare private _type: string;

    declare private _base: string;

    declare private _action: IActiveActionData;

    public get action(): IActiveActionData {
        return this._action;
    }

    declare private _animationFrame: number;
    static { (this.prototype as any)._animationFrame = 0; }

    public get animationFrame(): number {
        return this._animationFrame;
    }

    declare private _directionOffset: number;
    static { (this.prototype as any)._directionOffset = 0; }

    public get directionOffset(): number {
        return this._directionOffset;
    }

    private _items: UtilsMap = new UtilsMap();

    public get items(): UtilsMap {
        return this._items;
    }

    public get id(): string {
        return this._id;
    }

    public get dx(): number {
        return this._dx;
    }

    public get dy(): number {
        return this._dy;
    }

    public get dz(): number {
        return this._dz;
    }

    public get type(): string {
        return this._type;
    }

    public get base(): string {
        return this._base;
    }

    private baseAsInt(): number {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._base.length) {
            _loc2_ = _loc2_ + this._base.charCodeAt(_loc1_) | 0;
            _loc1_++;
        }
        return _loc2_;
    }
}
