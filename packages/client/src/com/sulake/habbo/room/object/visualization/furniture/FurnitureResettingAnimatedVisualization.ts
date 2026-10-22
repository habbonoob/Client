import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureResettingAnimatedVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureResettingAnimatedVisualization'); }

    protected override usesAnimationResetting(): boolean {
        return true;
    }
}
