import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';

export interface IRoomPlane {
    get uniqueId(): number;
    get location(): IVector3d;
    get leftSide(): IVector3d;
    get rightSide(): IVector3d;
    get color(): number;
    getDrawingDatas(param1: IRoomGeometry): any[];
}
