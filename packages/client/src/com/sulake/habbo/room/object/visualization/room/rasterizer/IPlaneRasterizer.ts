import type { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IPlaneRasterizer {
    initializeDimensions(param1: number, param2: number): boolean;
    render(param1: BitmapData, param2: string, param3: number, param4: number, param5: number, param6: IVector3d, param7: boolean, param8?: number, param9?: number, param10?: number, param11?: number, param12?: number): PlaneBitmapData;
    getTextureIdentifier(param1: number, param2: IVector3d): string;
    getLayers(param1: string): any[];
    reinitialize(): void;
}
