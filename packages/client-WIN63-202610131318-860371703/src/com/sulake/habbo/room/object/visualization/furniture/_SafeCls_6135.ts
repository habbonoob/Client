import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class _SafeCls_6135 extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::_SafeCls_6135'); }

    private static readonly RECOLORABLE_SPRITE_TAG: string = "recolorable";
    private _color: number = 16777215;

    constructor() {
        super();
    }

    protected override updateModel(param1: number): boolean {
        let _loc3_: boolean = super.updateModel(param1);
        let _loc2_: number = this.object.getModel().getNumber("furniture_recolorable_color");
        this._color = isNaN(_loc2_) ? 16777215 : _loc2_ | 0;
        return _loc3_;
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        if (this.getSpriteTag(param1, this.direction, param2) == "recolorable") {
            return this._color;
        }
        return super.getSpriteColor(param1, param2, param3);
    }
}
