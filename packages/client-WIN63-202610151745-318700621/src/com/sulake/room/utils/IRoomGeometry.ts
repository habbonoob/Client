import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IRoomGeometry {
    get scale(): number;
    get directionAxis(): IVector3d;
    get direction(): IVector3d;
    getCoordinatePosition(param1: IVector3d): IVector3d;
    getScreenPoint(param1: IVector3d): Point;
    getScreenPosition(param1: IVector3d): IVector3d;
    getPlanePosition(param1: Point, param2: IVector3d, param3: IVector3d, param4: IVector3d): Point;
    setDisplacement(param1: IVector3d, param2: IVector3d): void;
    adjustLocation(param1: IVector3d, param2: number): void;
    performZoom(): void;
    performZoomOut(): void;
    performZoomIn(): void;
    isZoomedIn(): boolean;
    get updateId(): number;
    set z_scale(param1: number);
}
