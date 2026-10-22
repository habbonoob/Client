import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureValRandomizerVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureValRandomizerVisualization'); }

    private static readonly ANIMATION_ID_OFFSET_SLOW1: number = 20;
    private static readonly ANIMATION_ID_OFFSET_SLOW2: number = 10;
    private static readonly _SafeStr_8231: number = 31;
    private static readonly _SafeStr_7668: number = 32;
    private static readonly _SafeStr_8699: number = 30;

    constructor() {
        super();
        super.setAnimation(30);
    }

    private _SafeStr_2595: any[] = [];
    private _running: boolean = false;

    protected override setAnimation(param1: number): void {
        if (param1 == 0) {
            if (!this._running) {
                this._running = true;
                this._SafeStr_2595 = [];
                this._SafeStr_2595.push(31);
                this._SafeStr_2595.push(32);
                return;
            }
        }
        if (param1 > 0 && param1 <= 10) {
            if (this._running) {
                this._running = false;
                this._SafeStr_2595 = [];
                if (this.direction == 2) {
                    this._SafeStr_2595.push(20 + 5 - param1);
                    this._SafeStr_2595.push(10 + 5 - param1);
                } else {
                    this._SafeStr_2595.push(20 + param1);
                    this._SafeStr_2595.push(10 + param1);
                }
                this._SafeStr_2595.push(30);
                return;
            }
            super.setAnimation(30);
        }
    }

    protected override updateAnimation(param1: number): number {
        if (super.getLastFramePlayed(11)) {
            if (this._SafeStr_2595.length > 0) {
                super.setAnimation(this._SafeStr_2595.shift() | 0);
            }
        }
        return super.updateAnimation(param1);
    }
}
