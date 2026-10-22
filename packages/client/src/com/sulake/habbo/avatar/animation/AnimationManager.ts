import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAnimation } from '@/com/sulake/habbo/avatar/animation/IAnimation';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAnimationManager } from '@/com/sulake/habbo/avatar/animation/IAnimationManager';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Animation } from '@/com/sulake/habbo/avatar/animation/Animation';

export class AnimationManager implements IAnimationManager {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::AnimationManager'); }

    constructor() {
        this._animations = new Dictionary();
    }

    declare private _animations: Map<any, any>;

    public get animations(): Map<any, any> {
        return this._animations;
    }

    public registerAnimation(param1: AvatarStructure, param2: XML): boolean {
        let _loc3_: string = String(param2.attribute("name"));
        this._animations.set(_loc3_, new Animation(param1, param2));
        return true;
    }

    public getAnimation(param1: string): IAnimation {
        return this._animations.get(param1);
    }

    public getLayerData(param1: string, param2: number, param3: string): IAnimationLayerData {
        let _loc4_: Animation = asInstanceOf(this._animations.get(param1), Animation);
        if (_loc4_ != null) {
            return _loc4_.getLayerData(param2, param3);
        }
        return null;
    }
}
