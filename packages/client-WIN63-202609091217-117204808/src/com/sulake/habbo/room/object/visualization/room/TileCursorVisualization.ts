import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class TileCursorVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::TileCursorVisualization'); }

    private _tileHeight: number = 0;

    constructor() {
        super();
    }

    public get tileHeight(): number {
        return this._tileHeight;
    }

    public set tileHeight(param1: number) {
        this._tileHeight = param1;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        if (param3 == 1) {
            this.tileHeight = this.object.getModel().getNumber("tile_cursor_height");
            return -this.tileHeight * (param1 / 2) | 0;
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }
}
