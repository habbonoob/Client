import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { AnimationAction } from '@/com/sulake/habbo/avatar/structure/animation/AnimationAction';
import { IStructureData } from '@/com/sulake/habbo/avatar/structure/IStructureData';

export class AnimationData implements IStructureData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure::AnimationData'); }

    declare private _SafeStr_2403: Map<any, any>;

    constructor() {
        this._SafeStr_2403 = new Dictionary();
    }

    public parse(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of param1.child("action") ?? []) {
            this._SafeStr_2403.set(String(_loc2_.attribute("id")), new AnimationAction(_loc2_));
        }
        return true;
    }

    public appendXML(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of param1.child("action") ?? []) {
            this._SafeStr_2403.set(String(_loc2_.attribute("id")), new AnimationAction(_loc2_));
        }
        return true;
    }

    public getAction(param1: IActionDefinition): AnimationAction {
        return this._SafeStr_2403.get(param1.id);
    }

    public getFrameCount(param1: IActionDefinition): number {
        let _loc2_: AnimationAction = this.getAction(param1);
        if (!_loc2_) {
            return 0;
        }
        return _loc2_.frameCount;
    }

    get [IStructureData](): true {
        return true;
    }
}
