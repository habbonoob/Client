import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurnitureChestVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureChestVisualization';

export class FurnitureCoinsChestVisualization extends FurnitureChestVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureCoinsChestVisualization'); }

    constructor() {
        super();
    }
}
