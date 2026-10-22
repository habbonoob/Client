import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import type { SizeData } from '@/com/sulake/habbo/room/object/visualization/data/SizeData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { AnimationSizeData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationSizeData';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';

export class AnimatedFurnitureVisualizationData extends FurnitureVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::AnimatedFurnitureVisualizationData'); }

    constructor() {
        super();
    }

    protected override createSizeData(param1: number, param2: number, param3: number): SizeData {
        let _loc4_: SizeData = null;
        return new AnimationSizeData(param2, param3);
    }

    protected override processVisualizationElement(param1: SizeData, param2: XML): boolean {
        let _loc3_: AnimationSizeData = null;
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc4_: string = String(param2.name());
        if ("animations" !== _loc4_) {
            if (!super.processVisualizationElement(param1, param2)) {
                return false;
            }
        } else {
            _loc3_ = param1 instanceof AnimationSizeData ? param1 : null;
            if (_loc3_ != null) {
                if (!_loc3_.defineAnimations(param2)) {
                    return false;
                }
            }
        }
        return true;
    }

    public hasAnimation(param1: number, param2: number): boolean {
        let _loc3_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.hasAnimation(param2);
        }
        return false;
    }

    public getAnimationCount(param1: number): number {
        let _loc2_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc2_ != null) {
            return _loc2_.getAnimationCount();
        }
        return 0;
    }

    public getAnimationId(param1: number, param2: number): number {
        let _loc3_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc3_ != null) {
            return _loc3_.getAnimationId(param2);
        }
        return 0;
    }

    public isImmediateChange(param1: number, param2: number, param3: number): boolean {
        let _loc4_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc4_ != null) {
            return _loc4_.isImmediateChange(param2, param3);
        }
        return false;
    }

    public getStartFrame(param1: number, param2: number, param3: number): number {
        let _loc4_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc4_ != null) {
            return _loc4_.getStartFrame(param2, param3);
        }
        return 0;
    }

    public getFrame(param1: number, param2: number, param3: number, param4: number, param5: number): AnimationFrame {
        let _loc6_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc6_ != null) {
            return _loc6_.getFrame(param2, param3, param4, param5);
        }
        return null;
    }

    public getFrameFromSequence(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number): AnimationFrame {
        let _loc8_: AnimationSizeData = asInstanceOf(this.getSizeData(param1), AnimationSizeData);
        if (_loc8_ != null) {
            return _loc8_.getFrameFromSequence(param2, param3, param4, param5, param6, param7);
        }
        return null;
    }
}
