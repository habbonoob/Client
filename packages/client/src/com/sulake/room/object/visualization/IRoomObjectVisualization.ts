import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IRoomObjectVisualization {
    get object(): IRoomObject;
    set object(param1: IRoomObject);
    get image(): BitmapData;
    get boundingRectangle(): Rectangle;
    dispose(): void;
    initialize(param1: IRoomObjectVisualizationData): boolean;
    update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void;
    getImage(param1: number, param2: number): BitmapData;
    getInstanceId(): number;
    getUpdateID(): number;
}
