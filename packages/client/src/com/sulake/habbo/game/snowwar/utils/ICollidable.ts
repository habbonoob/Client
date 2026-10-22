import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';

export interface ICollidable extends IDisposable {
    get boundingType(): number;
    get boundingData(): any[];
    get location3D(): Location3D;
    get direction360(): Direction360;
}
