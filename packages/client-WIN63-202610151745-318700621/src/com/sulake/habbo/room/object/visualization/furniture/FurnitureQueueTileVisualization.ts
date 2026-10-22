import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureQueueTileVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureQueueTileVisualization'); }

    private static readonly _SafeStr_7668: number = 3;
    private static readonly _SafeStr_8723: number = 2;
    private static readonly ANIMATION_ID_NORMAL: number = 1;
    private static readonly _SafeStr_8767: number = 15;
    private _SafeStr_2595: any[] = [];

    declare private _SafeStr_2746: number;
    static { (this.prototype as any)._SafeStr_2746 = 0; }

    constructor() {
        super();
    }

    protected override setAnimation(param1: number): void {
        if (param1 == 2) {
            this._SafeStr_2595 = [];
            this._SafeStr_2595.push(1);
            this._SafeStr_2746 = 15;
        }
        super.setAnimation(param1);
    }

    protected override updateAnimation(param1: number): number {
        if (this._SafeStr_2746 > 0) {
            this._SafeStr_2746 = this._SafeStr_2746 - 1;
        }
        if (this._SafeStr_2746 == 0) {
            if (this._SafeStr_2595.length > 0) {
                super.setAnimation(this._SafeStr_2595.shift() | 0);
            }
        }
        return super.updateAnimation(param1);
    }

    protected override usesAnimationResetting(): boolean {
        return true;
    }
}
