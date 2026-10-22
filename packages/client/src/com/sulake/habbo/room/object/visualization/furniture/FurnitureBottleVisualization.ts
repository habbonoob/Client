import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureBottleVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureBottleVisualization'); }

    private static readonly ANIMATION_ID_OFFSET_SLOW1: number = 20;
    private static readonly ANIMATION_ID_OFFSET_SLOW2: number = 9;
    private static readonly _SafeStr_7668: number = -1;

    constructor() {
        super();
    }

    private _SafeStr_2595: any[] = [];
    private _running: boolean = false;

    protected override setAnimation(param1: number): void {
        if (param1 == -1) {
            if (!this._running) {
                this._running = true;
                this._SafeStr_2595 = [];
                this._SafeStr_2595.push(-1);
                return;
            }
        }
        if (param1 >= 0 && param1 <= 7) {
            if (this._running) {
                this._running = false;
                this._SafeStr_2595 = [];
                this._SafeStr_2595.push(20);
                this._SafeStr_2595.push(9 + param1);
                this._SafeStr_2595.push(param1);
                return;
            }
            super.setAnimation(param1);
        }
    }

    protected override updateAnimation(param1: number): number {
        if (super.getLastFramePlayed(0)) {
            if (this._SafeStr_2595.length > 0) {
                super.setAnimation(this._SafeStr_2595.shift() | 0);
            }
        }
        return super.updateAnimation(param1);
    }
}
