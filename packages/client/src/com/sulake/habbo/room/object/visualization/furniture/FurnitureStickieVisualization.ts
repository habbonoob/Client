import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';

export class FurnitureStickieVisualization extends FurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureStickieVisualization'); }

    constructor() {
        super();
    }

    private _data_FurnitureStickieVisualization: FurnitureVisualizationData = null;

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this._data_FurnitureStickieVisualization = param1 instanceof FurnitureVisualizationData ? param1 : null;
        return super.initialize(param1);
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        if (this._data_FurnitureStickieVisualization == null) {
            return 16777215;
        }
        return this._data_FurnitureStickieVisualization.getColor(param1, param2, param3);
    }
}
