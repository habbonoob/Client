import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { AnimationFrame } from '@/com/sulake/habbo/avatar/structure/animation/AnimationFrame';

export class AnimationActionPart {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.animation::AnimationActionPart'); }

    declare private _frames: any[];

    constructor(param1: XML) {
        let _loc2_: number = 0;
        this._frames = [];
        for (const _loc3_ of param1.child("frame") ?? []) {
            this._frames.push(new AnimationFrame(_loc3_));
            _loc2_ = parseInt(_loc3_.attribute("repeats").toString()) | 0;
            if (_loc2_ > 1) {
                while (--_loc2_ > 0) {
                    this._frames.push(this._frames[this._frames.length - 1]);
                }
            }
        }
    }

    public get frames(): any[] {
        return this._frames;
    }
}
