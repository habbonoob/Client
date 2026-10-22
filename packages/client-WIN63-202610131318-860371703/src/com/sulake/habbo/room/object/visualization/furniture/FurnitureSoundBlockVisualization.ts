import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureSoundBlockVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureSoundBlockVisualization'); }

    private _frameIncrease_FurnitureSoundBlockVisualization: number = 1;
    private _SafeStr_3995: number = 0;

    constructor() {
        super();
    }

    protected override get frameIncrease(): number {
        return this._frameIncrease_FurnitureSoundBlockVisualization;
    }

    protected override updateAnimations(param1: number): number {
        this._SafeStr_3995 += this.object.getModel().getNumber("furniture_soundblock_relative_animation_speed");
        this._frameIncrease_FurnitureSoundBlockVisualization = this._SafeStr_3995 | 0;
        this._SafeStr_3995 -= this._frameIncrease_FurnitureSoundBlockVisualization;
        return super.updateAnimations(param1);
    }
}
